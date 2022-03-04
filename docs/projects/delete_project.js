module.exports = {
  delete: {
    tags: ['Projects'],
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    summary: 'Deleting a project',
    operationId: 'deleteProject',
    parameters: [
      {
        name: 'id',
        in: 'query',
        schema: {
          $ref: '#/components/schemas/IdProject',
        },
        required: true,
        description: 'Deleting a project',
      },
    ],
    responses: {
      200: {
        description: 'Project deleted successfully',
      },
      404: {
        description: 'Project not found',
      },
      500: {
        description: 'Server error',
      },
    },
  },
};
