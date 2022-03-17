module.exports = {
  get: {
    tags: ['Kyc'],
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    summary: 'request approve kyc',
    operationId: 'requestApprove',
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
