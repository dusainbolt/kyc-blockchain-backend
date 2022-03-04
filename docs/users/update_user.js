module.exports = {
  patch: {
    tags: ['Users'],
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    summary: 'Update info of user',
    operationId: 'updateUser',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UserUpdate',
          },
        },
      },
    },
    responses: {
      201: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserResponse',
            },
          },
        },
      },
      500: {
        description: 'Server error',
      },
    },
  },
};
