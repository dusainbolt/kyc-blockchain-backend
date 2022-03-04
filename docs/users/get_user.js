module.exports = {
  get: {
    tags: ['Users'],
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    summary: 'Get info of a user',
    operationId: 'getUserInfo',
    parameters: [
      {
        name: 'id',
        in: 'query',
        schema: {
          $ref: '#/components/schemas/Id',
        },
        required: true,
        description: 'A single user id',
      },
    ],
    responses: {
      200: {
        description: 'Get user successfuly',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserResponse',
            },
          },
        },
      },
      404: {
        description: 'User is not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
              example: {
                message: "We can't find the user",
                internal_code: 'Invalid id',
              },
            },
          },
        },
      },
    },
  },
};
