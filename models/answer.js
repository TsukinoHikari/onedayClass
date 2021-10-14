const Sequelize = require("sequelize");

module.exports = class Answer extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                answerNum: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                },
                answerContent: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                answerCreated: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "answer",
                tableName: "answers",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.Answer.belongsTo(db.Admin, {
            foreignKey: "adminId",
            targetKey: "adminId",
        });
        db.Answer.hasOne(db.Qna, {
            foreignKey: "answerContent",
            targetKey: "qnaNum",
        });
    }
};
