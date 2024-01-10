import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { sendReview } from '../src/postReview';
import AppError from '../components/error';

describe('createDocumentAndFile', () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);

  beforeEach(() => {
    ddbMock.reset();
  });

  describe('sendReview Function', () => {
    const data = {
      companyName: 'Company XYZ',
      deadlineExperience: 'Good',
      communicationExperience: 'Excellent',
      uiExperience: 'Good',
      expectationsMet: 'Yes',
      recommendation: 'Yes',
    };

    it('Successfully creates a review', async () => {
      ddbMock.on(UpdateCommand);

      expect(sendReview(data)).resolves.satisfies;
    });

    it('Throws an AppError if docClient.update fails', async () => {
      ddbMock.rejects();

      await expect(sendReview(data)).rejects.toThrow(AppError);
    });
  });
});
