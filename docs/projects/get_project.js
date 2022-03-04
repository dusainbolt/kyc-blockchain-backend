module.exports = {
  get: {
    tags: ['Projects'],
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    summary: 'Get info of a project',
    operationId: 'getProjectInfo',
    parameters: [
      {
        name: 'id',
        in: 'query',
        schema: {
          $ref: '#/components/schemas/IdProject',
        },
        required: true,
        description: 'A single project id',
      },
    ],
    responses: {
      200: {
        description: 'Get project successfuly',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ProjectResponse',
            },
          },
        },
      },
      404: {
        description: 'Project is not found',
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
