module.exports = {
  get: {
    tags: ['Kyc'],
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    summary: 'request kyc confirm',
    operationId: 'requestKycConfirm',
    parameters: [],
    responses: {
      200: {
        description: 'request success',
      },
      500: {
        description: 'Server error',
      },
    },
  },
};
