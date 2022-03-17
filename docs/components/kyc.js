module.exports = {
  KycResponse: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
      },
      userId: {
        type: 'string',
      },
      gender: {
        type: 'string',
      },
      status: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      fullName: {
        type: 'string',
      },
      birthday: {
        type: 'string',
      },
      phoneNumber: {
        type: 'string',
      },
      address: {
        type: 'string',
      },
      nowAddress: {
        type: 'string',
      },
      identifierImage: {
        type: 'array',
        items: {
          type: 'string',
          properties: {
            id: {
              type: 'string',
            },
          },
        },
      },
      createdAt: {
        type: 'string',
      },
      updatedAt: {
        type: 'string',
      },
    },
  },
};
