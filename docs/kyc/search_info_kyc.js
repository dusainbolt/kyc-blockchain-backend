module.exports = {
  get: {
    tags: ['Kyc'],
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    summary: 'search data KYC',
    operationId: 'searchKycInfo',
    parameters: [
      {
        name: 'email',
        in: 'query',
        description: 'kyc email',
        example: 'dulh181199@gmail.com',
      },
      {
        name: 'page',
        in: 'query',
        required: false,
        description: 'current page want to show',
      },
      {
        name: 'pageSize',
        in: 'query',
        required: false,
        description: 'Amount record on one page',
      },
      {
        name: 'sortBy',
        in: 'query',
        required: false,
        description: 'sort condition',
        example: '-updatedAt,+createdAt',
      },
    ],
    responses: {
      200: {
        description: 'Get kyc info successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/kyc_Response',
            },
          },
        },
      },
    },
  },
};
