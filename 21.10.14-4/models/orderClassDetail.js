const Sequelize = require("sequelize");

module.exports = class OrderClassDetail extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                orderClassDetailNum: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                orderName: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
                orderTel: {
                    type: Sequelize.STRING(14),
                    allowNull: false,
                },
                orderPrice: {
                    type: Sequelize.INTEGER(45),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "OrderClassDetail",
                tableName: "orderClassDetails",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.OrderClassDetail.belongsTo(db.Oclass, {
            foreignKey: "classNum",
            targetKey: "classNum",
        });
        db.OrderClassDetail.belongsTo(db.User, {
            foreignKey: "userId",
            targetKey: "userId",
        });
    }
};
