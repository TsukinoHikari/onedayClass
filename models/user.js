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
          type: Sequelize.STRING(200),
          allowNull: true, //(김)false
        },
        userName: {
          type: Sequelize.STRING(45),
          allowNull: true, //(김)false
        },
        userTel: {
          type: Sequelize.STRING(14),
          allowNull: true, //(김)false
        },
        userMail: {
          type: Sequelize.STRING(100),
          allowNull: true, //(김)false
        },
        userAddr: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        level: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: "1",
        },
        userCreated: {
          type: Sequelize.DATE,
          allowNull: true,
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
        underscored: false, //(김)true
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
