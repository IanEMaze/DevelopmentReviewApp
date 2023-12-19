# Dev-Review-App

This application is an API designed to handle the submission of reviews using OpenAPI specifications. It's built using AWS Serverless Stack Toolkit (SST) and TypeScript.

## OpenAPI Specification

### Endpoint
- **POST** `/review`: Submit a review

### Request Body
```json
{
  "companyName": "Company XYZ",
  "deadlineExperience": "Great",
  "communicationExperience": "Excellent",
  "uiExperience": "Good",
  "expectationsMet": "Yes",
  "recommendation": "Yes"
}
```

## Responses

### 200
```json
"Review Successfully Submitted"
```

### 400
```json
"Error Invalid Data - 'property' is missing, null, or empty"
```

### 500
```json
"Internal Server Error"
```

## Deployment and Setup

### Prerequisites
- AWS account with permissions to create resources like DynamoDB tables.
- Install AWS CLI and configure credentials.

### Steps
1. **Clone this repository.**
2. **Install dependencies using** `npm install`.
3. **Set up AWS environment variables (`TABLE_NAME`, `REGION`).**
4. **Deploy the application using SST.**

## Usage
After deployment, use the specified API endpoint (`/review`) to submit review data in the specified format.

