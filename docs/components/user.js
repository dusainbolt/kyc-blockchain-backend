module.exports = {
  Id: {
    type: "string",
    description: "An id of a user",
    example: "620dcd1d5041cd381360c186",
  },
  UserResponse: {
    type: "object",
    properties: {
      _id: {
        type: "integer",
        description: "The Auto-generated id of a user",
      },
      username: {
        type: "string",
        description: "name of user",
      },
      email: {
        type: "string",
        description: "email of user",
      },
      address: {
        type: "string",
        description: "address of user",
      },
      projects: {
        type: "array",
        items: {
          type: "string",
          properties: {
            id: {
              type: "string",
            },
          },
        },
      },
      token: {
        type: "string",
        description: "token verify when access main function",
      },
      isAdmin: {
        type: "boolean",
        description: "permission of supper admin",
      },
      createdAt: {
        type: "string",
        description: "times create record database",
      },
      updatedAt: {
        type: "string",
        description: "times change record database recently",
      },
    },
  },
  UserCreate: {
    type: "object",
    properties: {
      email: {
        type: "string",
        description: "email of user",
        example: "admin@gmail.com",
      },
      username: {
        type: "string",
        description: "username of user",
        example: "admin",
      },
      password: {
        type: "string",
        description: "password create user",
        example: "123456",
      },
      address: {
        type: "string",
        description: "address of user",
        example: "address example",
      },
    },
    required: ["email", "username", "password"],
  },
  UserLogin: {
    type: "object",
    properties: {
      email: {
        type: "string",
        description: "email of user",
        example: "admin@gmail.com",
      },
      password: {
        type: "string",
        description: "password create user",
        example: "123456",
      },
    },
    required: ["email", "password"],
  },
  UserUpdate: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "id of user",
        example: "620dcd1d5041cd381360c186",
      },
      password: {
        type: "string",
        description: "password of user",
        example: "123456",
      },
      address: {
        type: "string",
        description: "address of user",
        example: "address user",
      },
    },
    required: ["id"],
  },
  Error: {
    type: "object",
    properties: {
      message: {
        type: "string",
      },
      internal_code: {
        type: "string",
      },
    },
  },
};
