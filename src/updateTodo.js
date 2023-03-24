'use strict';

const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');

const addTodo = async (event) => {
  // Connect to DynamoDB
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { completed } = event.body;
  const { id } = event.pathParameters;

  await dynamodb
    .update({
      TableName: 'TodoTable',
      Key: { id },
      UpdateExpression: 'set completed = :completed',
      ExpressionAttributeValues: {
        ':completed': completed,
      },
      ReturnValues: 'ALL_NEW',
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Todo updated successfully',
    }),
  };
};

module.exports = {
  handler: middy(addTodo).use(httpJsonBodyParser()),
};
