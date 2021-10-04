"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        let datas = [];
        for (let i = 0; i < 30; i++) {
            let obj = {
                noticeTitle: "test" + i + "@example.com",
                noticeContent: "testUser" + i,
                // password: "1234",
                //   createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                //   updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            };
            datas.push(obj);
        }

        return queryInterface.bulkInsert("notices", datas, {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("notices", null, {});
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
