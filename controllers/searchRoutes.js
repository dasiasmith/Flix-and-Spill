const router = require("express").Router();
const sequelize = require("sequelize");
const { Review, User, Comment } = require("../models");
// const { Op } = require("sequelize");
const Op = sequelize.Op;

// search by movie name
router.get("/:search", async (req, res) => {
  try {
    const search = req.params.search;
    const reviewData = await Review.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            review: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["id", "comment", "review_id", "user_id", "date_created"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });
    console.log("review data---->", JSON.stringify(reviewData, null, 2));
    if (reviewData.length === 0) {
      res.status(404).json({ message: "No review match the search criteria" });
      return;
    }
    const reviews = reviewData.map((review) => review.get({ plain: true }));
    res.render("searchedreviews", {
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
