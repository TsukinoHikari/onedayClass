"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let datas = [];

        let i1 = {
            path: "DIY1.png",
        };
        let i2 = {
            path: "DIY2.jpg",
        };
        let i3 = {
            path: "DIY3.png",
        };
        let i4 = {
            path: "DIY4.jpg",
        };
        let i5 = { path: "culture1.jpeg" };
        let i6 = { path: "culture2.jpg" };
        let i7 = { path: "beauty1.jpg" };
        let i8 = { path: "beauty2.jpg" };
        let i9 = { path: "beauty3.png" };
        let i10 = { path: "beauty4.jpg" };
        let i11 = { path: "soccer1.jpeg" };
        let i12 = { path: "soccer2.jpg" };
        let i13 = { path: "baseball1.png" };
        let i14 = { path: "baseball2.jpg" };
        let i15 = { path: "cooking1.png" };
        let i16 = { path: "cooking2.png" };
        let i17 = { path: "cooking3.jpg" };
        let i18 = { path: "cooking4.png" };
        let i19 = { path: "cooking5.jpg" };
        let i20 = { path: "study1.jpg" };
        let i21 = { path: "study2.jpg" };
        let i22 = { path: "study3.png" };
        let i23 = { path: "study4.jpg" };
        let i24 = { path: "surfing1.jpg" };
        let i25 = { path: "surfing2.png" };
        let i26 = { path: "etc1.png" };
        let i27 = { path: "etc2.jpg" };
        datas.push(
            i1,
            i2,
            i3,
            i4,
            i5,
            i6,
            i7,
            i8,
            i9,
            i10,
            i11,
            i12,
            i13,
            i14,
            i15,
            i16,
            i17,
            i18,
            i19,
            i20,
            i21,
            i22,
            i23,
            i24,
            i25,
            i26,
            i27
        );

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
