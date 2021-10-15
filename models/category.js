const Sequelize = require("sequelize");

module.exports = class Category extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                categoryNum: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                categoryName: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "Category",
                tableName: "categories",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.Category.hasMany(db.Oclass, {
            foreignKey: "categoryNum",
            sourceKey: "categoryNum",
        });
    }
};
