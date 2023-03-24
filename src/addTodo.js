'use strict';

const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');

const addTodo = async (event) => {
  // Connect to DynamoDB
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { todo } = event.body;
  const createdAt = new Date().toISOString();
  const id = v4();
  const newTodo = {
    id,
    todo,
    createdAt,
    completed: false,
  };

  // CloudWatch logs
  console.log(newTodo);

  await dynamodb
    .put({
      TableName: 'TodoTable',
      Item: newTodo,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
  handler: middy(addTodo).use(httpJsonBodyParser()),
};
