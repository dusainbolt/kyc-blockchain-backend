module.exports = {
  get: {
    tags: ['Projects'],
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    summary: 'Search info of a project',
    operationId: 'searchProjectInfo',
    parameters: [
      {
        name: 'name',
        in: 'query',
        description: 'projectname of project',
      },
      {
        name: 'note',
        in: 'query',
        description: 'note of project',
      },
      {
        name: 'page',
        in: 'query',
        description: 'current page want to show',
      },
      {
        name: 'pageSize',
        in: 'query',
        description: 'Amount record on one page',
      },
    ],
    responses: {
      200: {
        description: 'Search user successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ProjectResponse',
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
                message: `We can't find the user`,
                internal_code: 'Invalid id',
              },
            },
          },
        },
      },
    },
  },
};
