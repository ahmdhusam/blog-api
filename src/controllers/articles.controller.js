const { Types } = require("mongoose");
const { ErrorHandler } = require("../libs/error-handler.lib");
const { Article } = require("../models/article.model");

module.exports.getArticle = async (req, res, next) => {
  const { articleId } = req.params;

  const article = await Article.findById(articleId).catch(() => null);
  if (!article) return next(new ErrorHandler("Article Not Found", 404));

  req.article = article;
  next();
};

/**
 * @openapi
 * components:
 *  models:
 *    article:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        authorId:
 *          type: string
 *        square_cover:
 *          type: string
 *        rectangle_cover:
 *          type: string
 *        categoriesId:
 *          type: string
 *        createdAt:
 *          type: string
 *        readsCount:
 *          type: number
 *        shareCount:
 *          type: number
 *        priority:
 *          type: number
 */
module.exports.getArticleSuggestions = async (req, res, next) => {
  const { article, suggestionsOptions } = req;
  const { skip, limit } = suggestionsOptions;

  const suggestions = await Article.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [
              {
                categories: { $in: article.categories },
                author: article.author,
              },
              { categories: { $in: article.categories } },
              { author: article.author },
            ],
          },
          {
            $nor: [
              { author: new Types.ObjectId(req.user.id) },
              { _id: new Types.ObjectId(article.id) },
            ],
          },
        ],
      },
    },
    {
      $addFields: {
        hasSameCategory: {
          $anyElementTrue: [
            {
              $map: {
                input: "$categories",
                as: "category",
                in: { $in: ["$$category", article.categories] },
              },
            },
          ],
        },
      },
    },
    {
      $project: {
        _id: 0,
        id: "$_id",
        name: 1,
        square_cover: 1,
        rectangle_cover: 1,
        readsCount: 1,
        shareCount: 1,
        authorId: "$author",
        categoriesId: "$categories",
        createdAt: 1,
        priority: {
          $switch: {
            branches: [
              {
                case: {
                  $and: [
                    "$hasSameCategory",
                    { $eq: ["$author", article.author] },
                  ],
                },
                then: 3,
              },
              {
                case: "$hasSameCategory",
                then: 2,
              },
              {
                case: { $eq: ["$author", article.author] },
                then: 1,
              },
            ],
            default: 0,
          },
        },
      },
    },
    { $sort: { priority: -1, id: 1 } },
    { $skip: skip },
    { $limit: limit },
  ]);

  res.status(200).json({ data: suggestions });
};
