const { Router } = require("express");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("../utils/swagger");

const router = Router();

router.use(swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = (app) => {
  app.use("/api", router);
};
