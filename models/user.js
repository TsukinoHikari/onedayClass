const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userid: {
          type: Sequelize.STRING(30),
          primaryKey: true,
          allowNull: false,
        },
        userpwd: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        usertel: {
          type: Sequelize.STRING(14),
          allowNull: false,
        },
        usermail: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        useraddr: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        level: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        usercreated: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        // provider: {
        //     type: Sequelize.STRING(10),
        //     allowNull: false,
        //     defaultValue: 'local',
        // },
        // snsId: {
        //     type: Sequelize.STRING(30),
        //     allowNull: true,
        // },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_bin",
      }
    );
  }

  static associate(db) {}
};
