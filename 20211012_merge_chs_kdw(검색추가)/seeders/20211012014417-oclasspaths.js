"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let datas = [];
        let obj1 = {
            OclassClassNum: 1,
            UrlPathId: 1,
        };
        let obj2 = {
            OclassClassNum: 1,
            UrlPathId: 2,
        };
        datas.push(obj1, obj2);
        return queryInterface.bulkInsert("oclasspaths", datas, {});
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
