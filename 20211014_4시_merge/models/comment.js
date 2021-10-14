const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                commentNum: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                commentContent: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "Comment",
                tableName: "comments",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.Comment.belongsTo(db.User, {
            foreignKey: "userId",
            targetKey: "userId",
        });
        db.Comment.belongsTo(db.Oclass, {
            foreignKey: "classNum",
            targetKey: "classNum",
        });
    }
};
