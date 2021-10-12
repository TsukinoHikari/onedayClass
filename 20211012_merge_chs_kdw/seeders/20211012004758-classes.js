"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let datas = [];
        let obj1 = {
            classTitle: "야구배우러 오세요~~",
            classAddr: "서울 천호로 23길 51, 천호체육관",
            classPrice: 15000,
            classQty: 18,
            classContent:
                "야구를 배우고 싶으신가요?? 천호 체육관으로 오세요! 전문 강사들이 당신의 야구 실력을 증진시켜 드립니다!!",
            categoryNum: 4,
            classDate: "2021-10-18",
            userId: "abc123",
        };
        datas.push(obj1);

        return queryInterface.bulkInsert("oclasses", datas, {});
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
