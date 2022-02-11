const User = require('./User');
const Profile = require('./Profile');
const Review = require('./Review');
// user profile : one to one 
User.hasOne(Profile, {
  foreignKey: 'user_id',

  onDelete: 'CASCADE',
});


Profile.belongsTo(User, {
  foreignKey: 'user_id',
});
// user review: one to many 
User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Review.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Profile, Review };
