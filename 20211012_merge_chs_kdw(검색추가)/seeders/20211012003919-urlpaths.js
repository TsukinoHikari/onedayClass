"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let datas = [];
        let obj1 = {
            path: "baseball1.png",
        };
        let obj2 = {
            path: "baseball2.jpg",
        };
        datas.push(obj1, obj2);

        return queryInterface.bulkInsert("urlpaths", datas, {});
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
