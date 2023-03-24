'use strict';

const AWS = require('aws-sdk');

const fetchTodo = async (event) => {
  // Connect to DynamoDB
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;
  let todo;

  try {
    let result = await dynamodb
      .get({ TableName: 'TodoTable', Key: { id } })
      .promise();
    todo = result.Item;
  } catch (error) {
    console.log(error);
  }

  // CloudWatch logs
  console.log('Fetching todo', todo);

  return {
    statusCode: 200,
    body: JSON.stringify(todo),
  };
};

module.exports = {
  handler: fetchTodo,
};
