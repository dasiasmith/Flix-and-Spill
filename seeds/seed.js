const sequelize = require("../config/connection");
// const { User, Review, Profile, Comment } = require("../models");
const { User, Review, Comment } = require("../models");

const userData = require("./userData.json");
// const profileData = require("./profileData.json");
const reviewData = require("./reviewData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // for (const profile of profileData) {
  //   await Profile.create({
  //     ...profile,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }

  // const profiles = await Profile.findAll();
  for (const review of reviewData) {
    await Review.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  const reviews = await Review.findAll();
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      review_id: reviews[Math.floor(Math.random() * reviews.length)].id,
    });
  }
  process.exit(0);
};

seedDatabase();
