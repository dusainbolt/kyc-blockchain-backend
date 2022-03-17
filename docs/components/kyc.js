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

  KycUpdate: {
    type: 'object',
    properties: {
      gender: {
        type: 'string',
        description: 'gender of user',
        example: 'Male',
      },
      email: {
        type: 'string',
        description: 'email of user',
        example: 'cuong@gmail.com',
      },
      firstName: {
        type: 'string',
        description: 'firstName of user',
        example: 'firstName of user',
      },
      lastName: {
        type: 'string',
        description: 'lastName of user',
        example: 'lastName of user',
      },
      fullName: {
        type: 'string',
        description: 'fullName of user',
        example: 'fullName of user',
      },
      birthday: {
        type: 'string',
        description: 'birthday of user',
        example: '2000-01-24',
      },
      phoneNumber: {
        type: 'string',
        description: 'phoneNumber of user',
        example: '09258247293',
      },
      address: {
        type: 'string',
        description: 'address of user',
        example: 'address user',
      },
      nowAddress: {
        type: 'string',
        description: 'nowAddress of user',
        example: 'nowAddress user',
      },
    },
  },

  requestApprove: {
    
  }
};
