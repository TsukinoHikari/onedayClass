"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let datas = [];
        for (let i = 1; i < 26; i++) {
            let obj = {
                noticeTitle: "공지" + i,
                noticeContent: "공지내용" + i,
                adminId: "admin",
                noticeCreated: Sequelize.literal("current_timestamp"),
            };
            datas.push(obj);
        }

        return queryInterface.bulkInsert("notices", datas, {});
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
