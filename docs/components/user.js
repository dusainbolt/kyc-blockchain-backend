module.exports = {
  UserResponse: {
    type: 'object',
    properties: {
      address: {
        type: 'string',
        description: 'metamask address of user',
      },
      token: {
        type: 'string',
        description: 'token verify when access main function',
      },
    },
  },
  UserCreate: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'email of user',
        example: 'admin@gmail.com',
      },
      username: {
        type: 'string',
        description: 'username of user',
        example: 'admin',
      },
      password: {
        type: 'string',
        description: 'password create user',
        example: '123456',
      },
      address: {
        type: 'string',
        description: 'address of user',
        example: 'address example',
      },
    },
    required: ['email', 'username', 'password'],
  },
  UserLogin: {
    type: 'object',
    properties: {
      address: {
        type: 'string',
        description: 'metamask address of user',
        example: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
      },
      signature: {
        type: 'string',
        description: 'signature',
        example: '123456',
      },
      messageHash: {
        type: 'string',
        description: 'message hash',
        example: '123456',
      },
    },
    required: ['address', 'signature', 'messageHash'],
  },
  UserUpdate: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'id of user',
        example: '620dcd1d5041cd381360c186',
      },
      password: {
        type: 'string',
        description: 'password of user',
        example: '123456',
      },
      address: {
        type: 'string',
        description: 'address of user',
        example: 'address user',
      },
    },
    required: ['id'],
  },
  Error: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
      },
      internal_code: {
        type: 'string',
      },
    },
  },
};
