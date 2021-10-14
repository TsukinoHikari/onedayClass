"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let datas = [];
        let obj1 = {
            OclassClassNum: 4,
            UrlPathId: 1,
        };
        let obj2 = {
            OclassClassNum: 4,
            UrlPathId: 2,
        };
        let obj3 = { OclassClassNum: 11, UrlPathId: 3 };
        let obj4 = { OclassClassNum: 11, UrlPathId: 4 };
        let obj5 = { OclassClassNum: 12, UrlPathId: 5 };
        let obj6 = { OclassClassNum: 12, UrlPathId: 6 };
        let obj7 = { OclassClassNum: 2, UrlPathId: 7 };
        let obj8 = { OclassClassNum: 2, UrlPathId: 8 };
        let obj9 = { OclassClassNum: 13, UrlPathId: 9 };
        let obj10 = { OclassClassNum: 13, UrlPathId: 10 };
        let obj11 = { OclassClassNum: 6, UrlPathId: 11 };
        let obj12 = { OclassClassNum: 6, UrlPathId: 12 };
        let obj13 = { OclassClassNum: 1, UrlPathId: 13 };
        let obj14 = { OclassClassNum: 1, UrlPathId: 14 };
        let obj15 = { OclassClassNum: 3, UrlPathId: 15 };
        let obj16 = { OclassClassNum: 3, UrlPathId: 16 };
        let obj17 = { OclassClassNum: 9, UrlPathId: 17 };
        let obj18 = { OclassClassNum: 9, UrlPathId: 18 };
        let obj19 = { OclassClassNum: 9, UrlPathId: 19 };
        let obj20 = { OclassClassNum: 7, UrlPathId: 20 };
        let obj21 = { OclassClassNum: 7, UrlPathId: 21 };
        let obj22 = { OclassClassNum: 10, UrlPathId: 22 };
        let obj23 = { OclassClassNum: 10, UrlPathId: 23 };
        let obj24 = { OclassClassNum: 8, UrlPathId: 24 };
        let obj25 = { OclassClassNum: 8, UrlPathId: 25 };
        let obj26 = { OclassClassNum: 5, UrlPathId: 26 };
        let obj27 = { OclassClassNum: 5, UrlPathId: 27 };

        datas.push(
            obj1,
            obj2,
            obj3,
            obj4,
            obj5,
            obj6,
            obj7,
            obj8,
            obj9,
            obj10,
            obj11,
            obj12,
            obj13,
            obj14,
            obj15,
            obj16,
            obj17,
            obj18,
            obj19,
            obj20,
            obj21,
            obj22,
            obj23,
            obj24,
            obj25,
            obj26,
            obj27
        );
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
