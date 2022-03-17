module.exports = {
  put: {
    tags: ['Kyc'],
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    summary: 'Update info of kyc',
    operationId: 'updateKyc',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/KycUpdate',
          },
        },
      },
    },
    responses: {
      201: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/KycResponse',
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
