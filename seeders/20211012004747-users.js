"use strict";
const bcrypt = require("bcrypt");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let datas = [];

        const hash = await bcrypt.hash("c123123!", 12);

        let obj = {
            userId: "abc123",
            userPwd: hash,
            userName: "최현석",
            userMail: "chs@naver.com",
            userTel: "010-1234-4567",
            userAddr: "서울 성북구",
            userCreated: Sequelize.literal("current_timestamp"),
        };
        datas.push(obj);

        const hash2 = await bcrypt.hash("c123123!", 12);
        let obj2 = {
            userId: "bbc123",
            userPwd: hash2,
            userName: "홍길동",
            userMail: "bbc@naver.com",
            userTel: "010-4567-4567",
            userAddr: "서울 중구",
            userCreated: Sequelize.literal("current_timestamp"),
        };
        datas.push(obj2);

        const hash3 = await bcrypt.hash("qweqweqwe!", 12);
        let obj3 = {
            userId: "qweqwe",
            userPwd: hash3,
            userName: "김동욱",
            userMail: "hihi@naver.com",
            userTel: "010-9874-6541",
            userAddr: "경기 수원",
            userCreated: Sequelize.literal("current_timestamp"),
        };
        datas.push(obj3);

        const hash4 = await bcrypt.hash("qweqweqwe!", 12);
        let obj4 = {
            userId: "kakao",
            userPwd: hash4,
            userName: "카아카아오",
            userMail: "kakao@naver.com",
            userTel: "010-4561-2876",
            userAddr: "부산",
            userCreated: Sequelize.literal("current_timestamp"),
        };
        datas.push(obj4);

        const hash5 = await bcrypt.hash("asdasd!", 12);
        let obj5 = {
            userId: "onedayclass",
            userPwd: hash5,
            userName: "원데이클래스",
            userMail: "onedayclasstest@gmail.com",
            userTel: "010-4561-2876",
            userAddr: "서어울",
            userCreated: Sequelize.literal("current_timestamp"),
        };
        datas.push(obj5);

        return queryInterface.bulkInsert("users", datas, {});
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("users", null, {});
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
