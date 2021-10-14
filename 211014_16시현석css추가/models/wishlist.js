const Sequelize = require("sequelize");

module.exports = class WishList extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                wishNum: {
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
                modelName: "WishList",
                tableName: "WishLists",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.WishList.belongsTo(db.User, {
            foreignKey: "userId",
            targetKey: "userId",
        });
        db.WishList.belongsTo(db.Oclass, {
            foreignKey: "classNum",
            targetKey: "classNum",
        });
    }
};
