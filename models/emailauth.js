const Sequelize = require("sequelize");

module.exports = class Auth extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                token: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                userid: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                ttl: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
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
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {}
};
