import { APIGatewayProxyEvent } from 'aws-lambda';
import { AppError } from 'components/error';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, UpdateCommandInput } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

const tableName = process.env.TABLE_NAME ?? '';
const region = process.env.REGION ?? '';

const client = new DynamoDBClient({ region });
const docClient = DynamoDBDocument.from(client);

function validateData(data: { [x: string]: string }) {
  // Define the list of properties to check
  const requiredProperties = [
    'companyName',
    'deadlineExperience',
    'communicationExperience',
    'uiExperience',
    'expectationsMet',
    'recommendation',
  ];

  // Loop through the properties and validate each one
  for (const prop of requiredProperties) {
    if (
      !data.hasOwnProperty(prop) ||
      data[prop] === null ||
      data[prop] === ''
    ) {
      throw new AppError(
        `Invalid Data - "${prop}" is missing, null, or empty`,
        400,
      );
    }
  }
}

async function sendReview(data: { [x: string]: string }) {
  const {
    companyName,
    deadlineExperience,
    communicationExperience,
    uiExperience,
    expectationsMet,
    recommendation,
  } = data;

  const reviewId: String = uuidv4();

  const reviewParams: UpdateCommandInput = {
    TableName: tableName,
    Key: {
      _pk: `REVIEW#${reviewId}`,
      _sk: `COMPANY#${companyName}`,
    },
    UpdateExpression: `set deadlineExperience = :de, communicationExperience = :ce, uiExperience = :ue, expectationsMet = :em, recommendation = :r`,
    ExpressionAttributeValues: {
      ':de': deadlineExperience,
      ':ce': communicationExperience,
      ':ue': uiExperience,
      ':em': expectationsMet,
      ':r': recommendation,
    },
  };
  console.log(reviewParams);
  try {
    await docClient.update(reviewParams);
  } catch (e) {
    throw new AppError(`${e}`);
  }
}

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const { data } = JSON.parse(event.body || '');

    validateData(data);

    await sendReview(data);

    return {
      statusCode: 200,
      body: JSON.stringify('Review Successfully Submitted'),
    };
  } catch (e) {
    if (e instanceof AppError) {
      return {
        statusCode: e.statusCode,
        body: JSON.stringify(`Error ${e.message}`),
      };
    }
  }
};
