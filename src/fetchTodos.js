'use strict';

const AWS = require('aws-sdk');

const fetchTodos = async () => {
  // Connect to DynamoDB
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let todos;

  try {
    let results = await dynamodb.scan({ TableName: 'TodoTable' }).promise();
    todos = results.Items;
    // CloudWatch logs
    console.log('Fetching todos', todos);
  } catch (error) {
    console.log(error);
  }
  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};

module.exports = {
  handler: fetchTodos,
};
