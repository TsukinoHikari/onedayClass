const Sequelize = require("sequelize");
const User = require("./user");
const Oclass = require("./oclass");
const Admin = require("./admin");
const Qna = require("./qna");
const Answer = require("./answer");
const Notice = require("./notice");
const Auth = require("./emailauth");
const UrlPath = require("./urlPath");
const WishList = require("./wishlist");
const OrderClass = require("./orderClass");
const OrderClassDetail = require("./orderClassDetail");
const Category = require("./category");
const Comment = require("./comment");

const bcrypt = require("bcrypt");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,

    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASS,
    {
        host: process.env.MYSQL_URL,
        dialect: "mysql",
        timezone: "+09:00", // DB에 저장할 때 시간 설정
        dialectOptions: {
            timezone: "+09:00", // DB에서 가져올 때 시간 설정
        },
        define: {
            timestamps: false,
            supportBigNumbers: true,
        },
    }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const oClassPath = sequelize.define(
    "oClassPath",
    {
        oClassPathNum: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "oClassPath",
        tableName: "oClassPaths",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
    }
);

db.User = User;
db.Oclass = Oclass;
db.Admin = Admin;
db.Notice = Notice;
db.Auth = Auth;
db.UrlPath = UrlPath;
db.WishList = WishList;
db.OrderClass = OrderClass;
db.OrderClassDetail = OrderClassDetail;
db.Qna = Qna;
db.Comment = Comment;
db.Category = Category;
db.Answer = Answer;

// db.images = require("./image.model.js")(sequelize, Sequelize);

User.init(sequelize);
Oclass.init(sequelize);
Admin.init(sequelize);
Notice.init(sequelize);
Auth.init(sequelize);
UrlPath.init(sequelize);
WishList.init(sequelize);
OrderClass.init(sequelize);
OrderClassDetail.init(sequelize);
Comment.init(sequelize);
Category.init(sequelize);
Qna.init(sequelize);
Answer.init(sequelize);

User.associate(db);
Oclass.associate(db);
Admin.associate(db);
Notice.associate(db);
Auth.associate(db);
UrlPath.associate(db);
WishList.associate(db);
OrderClass.associate(db);
OrderClassDetail.associate(db);
Comment.associate(db);
Category.associate(db);
Qna.associate(db);
Answer.associate(db);

Oclass.belongsToMany(UrlPath, { through: oClassPath });
UrlPath.belongsToMany(Oclass, { through: oClassPath });

module.exports = db;

// Oclass.prototype.dateFormat = (date) => {
//     moment(date).format("YYYY년 MM월 DD일");
// };
