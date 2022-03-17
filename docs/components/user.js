module.exports = {
  user_LoginResponse: {
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
  // UserCreate: {
  //   type: 'object',
  //   properties: {
  //     email: {
  //       type: 'string',
  //       description: 'email of user',
  //       example: 'admin@gmail.com',
  //     },
  //     username: {
  //       type: 'string',
  //       description: 'username of user',
  //       example: 'admin',
  //     },
  //     password: {
  //       type: 'string',
  //       description: 'password create user',
  //       example: '123456',
  //     },
  //     address: {
  //       type: 'string',
  //       description: 'address of user',
  //       example: 'address example',
  //     },
  //   },
  //   required: ['email', 'username', 'password'],
  // },
  user_LoginBody: {
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
        example:
          '0xf0fda856ca72b02027149501b8019a381c60bd9040f84aff1c7ddd242681ca6a710bdac17b7516b436ffec75fa0ec11a0384c2467ec56789b668179e23bf52d21c',
      },
      messageHash: {
        type: 'string',
        description: 'message hash',
        example:
          'U2FsdGVkX195KLMFJn/yB9a91TNdxVwTkKXk5XP/DYi7PP1QYkO2vUNmd2/1mUL46ShChfglNvARkBobN46BCwHwCMJeUPAI5IOVk8OlYmW+E+G63a6Y1CEYGXsqJ95w',
      },
      role: {
        type: 'number',
        description: 'role of user',
        enum: { USER: 0, ADMIN: 1, PROJECT_ADMIN: 2 },
        example: 1,
      },
    },
    required: ['address', 'signature', 'messageHash'],
  },
  // UserUpdate: {
  //   type: 'object',
  //   properties: {
  //     id: {
  //       type: 'string',
  //       description: 'id of user',
  //       example: '620dcd1d5041cd381360c186',
  //     },
  //     password: {
  //       type: 'string',
  //       description: 'password of user',
  //       example: '123456',
  //     },
  //     address: {
  //       type: 'string',
  //       description: 'address of user',
  //       example: 'address user',
  //     },
  //   },
  //   required: ['id'],
  // },
  // Error: {
  //   type: 'object',
  //   properties: {
  //     message: {
  //       type: 'string',
  //     },
  //     internal_code: {
  //       type: 'string',
  //     },
  //   },
  // },
};
