module.exports = {
  securitySchemes: {
    ApiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "x-access-token",
    },
  },
};
