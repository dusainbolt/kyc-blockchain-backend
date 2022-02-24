module.exports = {
  post: {
    tags: ["Users"],
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    summary: "Create a new user",
    operationId: "createUser",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UserCreate",
          },
        },
      },
    },
    responses: {
      201: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserResponse",
            },
          },
        },
      },
      500: {
        description: "Server error",
      },
    },
  },
};
