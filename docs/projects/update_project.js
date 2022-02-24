module.exports = {
  patch: {
    tags: ["Projects"],
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    summary: "Update info of project",
    operationId: "updateProject",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ProjectUpdate",
          },
        },
      },
    },
    responses: {
      201: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ProjectResponse",
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
