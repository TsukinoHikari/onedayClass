const Sequelize = require("sequelize");

module.exports = class Auth extends Sequelize.Model {
static init(sequelize) {
return super.init(
    {
    token: {
            type: Sequelize.STRING(20),
            allowNull: false,
    },
    userid: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    ttl: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    },
    {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "AUTH",
    tableName: "authemail",
    paranoid: false,
    charset: "utf8",
    collate: "utf8_bin",
    }
);
}

static associate(db) {}
};