const Sequelize = require("sequelize");

module.exports = class OrderClass extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                orderClassNum: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                orderClassDate: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                orderClassCreated: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
                orderQty: {
                    type: Sequelize.INTEGER(45),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "OrderClass",
                tableName: "orderClasses",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.OrderClass.belongsTo(db.Oclass, {
            foreignKey: "classNum",
            targetKey: "classNum",
        });
        db.OrderClass.belongsTo(db.User, {
            foreignKey: "userId",
            targetKey: "userId",
        });
        // db.OrderClass.hasMany(db.OrderClassDetail, {
        //     foreignKey: "orderClassNum",
        //     sourceKey: "orderClassNum",
        // });
    }
};
