const Sequelize = require("sequelize");

module.exports = class UrlPath extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                path: {
                    // 우리는 프론트에서 보내준 이미지를 Blob 타입으로 변환하여 서버에 저장합니다.
                    type: Sequelize.STRING(300),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "UrlPath",
                tableName: "urlPaths",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {}
};
