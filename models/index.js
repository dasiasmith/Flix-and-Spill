const User = require("./User");
// const Profile = require('./Profile');
const Review = require("./Review");
const Comment = require("./Comment");
// user profile : one to one
// User.hasOne(Profile, {
//   foreignKey: 'user_id',

//   onDelete: 'CASCADE',
// });

// Profile.belongsTo(User, {
//   foreignKey: 'user_id',
// });
// user review: one to many
User.hasMany(Review, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Review.belongsTo(User, {
  foreignKey: "user_id",
});
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Review, {
  foreignKey: "review_id",
  // onDelete: "CASCADE",
});
Review.hasMany(Comment, {
  foreignKey: "review_id",
  onDelete: "CASCADE",
});

// module.exports = { User, Profile, Review, Comment };
module.exports = { User, Review, Comment };
