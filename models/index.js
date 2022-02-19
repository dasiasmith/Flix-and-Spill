const User = require("./user");
const Review = require("./review");
const Comment = require("./comment");
User.hasMany(Review, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Review.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
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
});

Review.hasMany(Comment, {
  foreignKey: "review_id",
  onDelete: "CASCADE",
});

module.exports = { User, Review, Comment };
