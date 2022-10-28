const express = require("express");
const mongoose = require("mongoose");
const { ErrorHandler } = require("./libs/error-handler.lib");
const { authMiddleware } = require("./middlewares/auth.middleware");
require("dotenv").config();
require("./models/user.model");
require("./models/article.model");
require("./models/categories.model");
require("./models/papers.model");
require("./models/video-series.model");
require("./models/video.model");

const app = express();

app.use(authMiddleware);

require("./routes/articles.route")(app);
require("./routes/api.route")(app);

app.use(() => {
  throw new ErrorHandler("Not Found", 404);
});

// error handler
app.use((error, req, res, next) => {
  res.status(error.status).json({ error: error.message });
});

(async function main() {
  const { PORT = 5500, DB_URL } = process.env;

  await mongoose.connect(DB_URL).catch((err) => console.error(err.message));

  app.listen(PORT, (err) => {
    console.log(`Server running on ${PORT}`);
  });
})();
