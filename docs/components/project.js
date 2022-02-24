module.exports = {
  IdProject: {
    type: "string",
    description: "An id of a project",
    example: "620dcd1d5041cd381360c186",
  },
  ProjectResponse: {
    type: "object",
    properties: {
      _id: {
        type: "integer",
        description: "The Auto-generated id of a project",
      },
      name: {
        type: "string",
        description: "name of project",
      },
      note: {
        type: "string",
        description: "note of project",
      },
      addressId: {
        type: "string",
        description: "Id of admin create project",
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
  ProjectCreate: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "name of project",
        example: "project 1",
      },
      note: {
        type: "string",
        description: "note of project",
        example: "description of project",
      },
    },
    required: ["name", "note"],
  },
  ProjectUpdate: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "id of user",
        example: "620dcd1d5041cd381360c186",
      },
      note: {
        type: "string",
        description: "note of project",
        example: "note user",
      },
    },
    required: ["id"],
  },
};
