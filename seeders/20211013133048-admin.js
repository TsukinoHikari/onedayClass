"use strict";
const bcrypt = require("bcrypt");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let datas = [];
        const hash = await bcrypt.hash("a1234", 12);
        let obj = {
            adminId: "admin",
            adminPwd: hash,
            adminName: "관리자",
            adminTel: "010-1234-5678",
            adminMail: "admin@onedayclass.com",
        };
        datas.push(obj);

        return queryInterface.bulkInsert("admins", datas, {});
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
