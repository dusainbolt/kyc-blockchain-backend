module.exports = {
  delete: {
    tags: ['Users'],
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    summary: 'Deleting a user',
    operationId: 'deleteUser',
    parameters: [
      {
        name: 'id',
        in: 'query',
        schema: {
          $ref: '#/components/schemas/Id',
        },
        required: true,
        description: 'Deleting a user',
      },
    ],
    responses: {
      200: {
        description: 'User deleted successfully',
      },
      404: {
        description: 'User not found',
      },
      500: {
        description: 'Server error',
      },
    },
  },
};
