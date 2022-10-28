const { Router } = require("express");
const ArticleController = require("../controllers/articles.controller");
const {
  suggestionsOptionsMiddleware,
} = require("../middlewares/suggestions-options.middleware");

const router = Router();
/**
 * @openapi
 * '/api/v1/articles/{articleId}/suggestions':
 *  get:
 *     tags:
 *     - Articles
 *     description: Retrieve a list of suggestions
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: The number of items to skip
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The numbers of items to return
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/models/article'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Article Not Found
 */
router.get(
  "/:articleId/suggestions",
  ArticleController.getArticle,
  suggestionsOptionsMiddleware,
  ArticleController.getArticleSuggestions
);

module.exports = function (app) {
  app.use("/api/v1/articles", router);
};
