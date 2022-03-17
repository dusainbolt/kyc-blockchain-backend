module.exports = {
  post: {
    tags: ['Users'],
    summary: 'User Login',
    operationId: 'Login',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/user_LoginBody',
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/user_LoginResponse',
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
