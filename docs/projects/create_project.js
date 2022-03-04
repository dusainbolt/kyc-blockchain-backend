module.exports = {
  post: {
    tags: ['Projects'],
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    summary: 'Create a new project',
    operationId: 'createProject',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ProjectCreate',
          },
        },
      },
    },
    responses: {
      201: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ProjectResponse',
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
