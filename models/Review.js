const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Review extends Model {
  // static upvote(body, models) {
  //   return models.Vote.create({
  //     user_id: body.user_id,
  //     review_id: body.review_id,
  //   }).then(() => {
  //     return Review.findOne({
  //       where: {
  //         id: body.review_id,
  //       },
  //       attributes: [
  //         "id",
  //         "post_text",
  //         "created_at",
  //         [
  //           sequelize.literal(
  //             "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
  //           ),
  //           "vote_count",
  //         ],
  //       ],
  //     });
  //   });
  // }
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "review",
  }
);

module.exports = Review;
