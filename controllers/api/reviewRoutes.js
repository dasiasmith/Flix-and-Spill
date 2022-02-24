const router = require("express").Router();
const { Review, Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    console.log("delete review----->", reviewData);
    if (!reviewData) {
      res.status(404).json({ message: "No review found with this id!" });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------PUT /api/reviews/upvote
// router.put("/upvote", withAuth, (req, res) => {
//   // make sure the session exists first

//   // pass session.passport id along with all destructured properties on req.body
//   Review.upvote(
//     { ...req.body, logged_in: req.session.logged_in },
//     { Vote, Comment, User }
//   )
//     .then((updatedVoteData) => res.json(updatedVoteData))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
