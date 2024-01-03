import { APIGatewayProxyEvent } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, UpdateCommandInput } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import AppError from '../components/error';

const tableName = process.env.TABLE_NAME ?? '';
const region = process.env.REGION ?? '';

const client = new DynamoDBClient({ region });
const docClient = DynamoDBDocument.from(client);

function validateData(data: { [x: string]: string }) {
  // Loop through the properties and validate each one
  Object.entries(data).forEach(([key, value]) => {
    if (!value || value.trim().length === 0) {
      throw new AppError(
        `Invalid Data - "${key}" is missing, null, or empty`,
        400,
      );
    }
  });
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

  const reviewId: string = uuidv4();

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
