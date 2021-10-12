const Sequelize = require("sequelize");
const User = require("./user");
const Oclass = require("./oclass");
const Admin = require("./admin");
const Notice = require("./notice");
const Auth = require("./emailauth");
const UrlPath = require("./urlPath");
const WishList = require("./wishlist");
const OrderClass = require("./orderClass");
const OrderClassDetail = require("./orderClassDetail");

const bcrypt = require("bcrypt");

const a = () => {
    const password = 1234;
    const hash = bcrypt.hash(password, 12);
    Admin.create({
        adminId: "admin",
        adminPwd: hash,
        adminName: "비대면수업",
        adminTel: "010-1234-4567",
        adminMail: "gg@naver.com",
    });
};
a;

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
    }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Oclass = Oclass;
db.Admin = Admin;
db.Notice = Notice;
db.Auth = Auth;
db.UrlPath = UrlPath;
db.WishList = WishList;
db.OrderClass = OrderClass;
db.OrderClassDetail = OrderClassDetail;

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

User.associate(db);
Oclass.associate(db);
Admin.associate(db);
Notice.associate(db);
Auth.associate(db);
UrlPath.associate(db);
WishList.associate(db);
OrderClass.associate(db);
OrderClassDetail.associate(db);

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

Oclass.belongsToMany(UrlPath, { through: oClassPath });
UrlPath.belongsToMany(Oclass, { through: oClassPath });

module.exports = db;
