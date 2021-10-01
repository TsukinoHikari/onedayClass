const Sequelize = require("sequelize");
const User = require("./user");
const Oclass = require("./oclass");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Oclass = Oclass;

User.init(sequelize);
Oclass.init(sequelize);

User.associate(db);
Oclass.associate(db);

module.exports = db;
