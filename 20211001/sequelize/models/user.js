const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                userId: {
                    type: Sequelize.STRING(30),
                    primaryKey: true,
                    allowNull: false,
                },
                userPwd: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                userName: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
                userTel: {
                    type: Sequelize.STRING(14),
                    allowNull: false,
                },
                userMail: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                userAddress: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                level: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: "1",
                },
                userCreated: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "user",
                tableName: "users",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.User.hasMany(db.Oclass, {
            foreignKey: "userId",
            sourceKey: "userId",
        });
    }
};
