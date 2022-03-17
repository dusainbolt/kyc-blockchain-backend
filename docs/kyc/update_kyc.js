module.exports = {
  put: {
    tags: ['Kyc'],
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    summary: 'Update info of kyc',
    operationId: 'kycUpdate',
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
      200: {
        description: 'Update successful',
      },
      500: {
        description: 'Server error',
      },
    },
  },
};
