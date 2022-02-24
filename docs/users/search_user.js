module.exports = {
  get: {
    tags: ["Users"],
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    summary: "Search info of a user",
    operationId: "searchUserInfo",
    parameters: [
      {
        name: "username",
        in: "query",
        description: "username of user",
      },
      {
        name: "email",
        in: "query",
        description: "Email of user",
      },
      {
        name: "address",
        in: "query",
        description: "Address of user",
      },
      {
        name: "page",
        in: "query",
        description: "current page want to show",
      },
      {
        name: "pageSize",
        in: "query",
        description: "Amount record on one page",
      },
    ],
    responses: {
      200: {
        description: "Search user successfuly",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserResponse",
            },
          },
        },
      },
      404: {
        description: "User is not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
              example: {
                message: "We can't find the user",
                internal_code: "Invalid id",
              },
            },
          },
        },
      },
    },
  },
};
