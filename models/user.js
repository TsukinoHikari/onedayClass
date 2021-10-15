const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                userId: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                    primaryKey: true,
                },
                userPwd: {
                    type: Sequelize.STRING(200),
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
                userAddr: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                level: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 1,
                },
                userCreated: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
                provider: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                    defaultValue: "local",
                },
                snsId: {
                    type: Sequelize.STRING(30),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "User",
                tableName: "users",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.User.hasMany(db.WishList, {
            foreignKey: "userId",
            sourceKey: "userId",
        });
        db.User.hasMany(db.Oclass, {
            foreignKey: "userId",
            sourceKey: "userId",
        });
        db.User.hasMany(db.OrderClass, {
            foreignKey: "userId",
            sourceKey: "userId",
        });
        db.User.hasMany(db.Comment, {
            foreignKey: "userId",
            sourceKey: "userId",
        });
        db.User.hasMany(db.OrderClassDetail, {
            foreignKey: "userId",
            sourceKey: "userId",
        });
        db.User.hasMany(db.Qna, {
            foreignKey: "userId",
            targetKey: "userId",
        });
    }
};
