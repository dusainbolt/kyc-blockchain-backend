module.exports = {
  get: {
    tags: ['Kyc'],
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    summary: 'Get info of kyc',
    operationId: 'getKycInfo',
    // parameters: [
    //   {
    //     name: 'id',
    //     in: 'query',
    //     schema: {
    //       $ref: '#/components/schemas/Id',
    //     },
    //     required: true,
    //     description: 'A single user id',
    //   },
    // ],
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
