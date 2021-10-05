const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Auth = require('./emailauth');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Auth = Auth;

User.init(sequelize);
Auth.init(sequelize);

User.associate(db);
Auth.associate(db);

module.exports = db;
