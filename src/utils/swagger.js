const swaggerJsdoc = require("swagger-jsdoc");
const { version } = require("../../package.json");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Api for Blog website",
      version,
    },
  },
  apis: ["./src/routes/*.route.js", "./src/controllers/*.controller.js"],
};

module.exports.swaggerSpec = swaggerJsdoc(options);
