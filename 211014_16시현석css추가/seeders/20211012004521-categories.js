"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        let datas = [];

        let obj1 = {
            categoryName: "공예DIY",
        };
        datas.push(obj1);

        let obj2 = {
            categoryName: "문화예술",
        };
        datas.push(obj2);

        let obj3 = {
            categoryName: "뷰티",
        };
        datas.push(obj3);

        let obj4 = {
            categoryName: "스포츠",
        };
        datas.push(obj4);

        let obj5 = {
            categoryName: "요리",
        };
        datas.push(obj5);

        let obj6 = {
            categoryName: "자기계발",
        };
        datas.push(obj6);

        let obj7 = {
            categoryName: "기타",
        };
        datas.push(obj7);

        return queryInterface.bulkInsert("categories", datas, {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("categories", null, {});
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
