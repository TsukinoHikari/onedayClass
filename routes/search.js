const express = require("express");
const Oclass = require("../models/oclass");
const UrlPath = require("../models/urlPath");
const Op = require("sequelize").Op;
const { QueryTypes } = require("sequelize");
const Oclasspath = require("../models/index");

const { sequelize } = require("../models");
//검색

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

//검색추가본
router.get("/", async (req, res) => {
    try {
        let keyword = req.query.query;

        const searchClass = await Oclass.findAll({
            where: {
                [Op.or]: [
                    {
                        classTitle: {
                            [Op.like]: `%${keyword}%`,
                        },
                    },
                    {
                        classAddr: {
                            [Op.like]: `%${keyword}%`,
                        },
                    },
                ],
            },
        });
        let classImages = [];
        for (let i = 0; i < searchClass.length; i++) {
            let sql = `SELECT urlpaths.path, oclasses.classTitle FROM oclasspaths INNER JOIN urlpaths ON oclasspaths.UrlPathId = urlpaths.id INNER JOIN oclasses ON oclasses.classNum=oclasspaths.OclassClassNum WHERE OclassClassNum=${searchClass[i].classNum} GROUP BY OclassClassNum;`;
            let classImage = await sequelize.query(sql, {
                type: QueryTypes.SELECT,
            });
            classImages.push(classImage);
        }
        console.log(classImages);

        let mapTheList = function (list) {
            // list 형식이야 어쨌든 전체를 순회하면서
            return list.map(function (item) {
                // 하나의 객체로 만들기로 한다.
                let obj = {};
                // 모두 길이가 2인 배열들로 이루어져 있다고 간주하고 전체를 돌면서 객체에 바로 넣고
                for (let i = 0; i < item.length; i++) {
                    let attr = item[i];
                    obj[attr[0]] = attr[1];
                    obj[attr[1]] = attr[2];
                    obj[attr[2]] = attr[3];
                }

                // 반환한다.
                return obj;
            });
        };

        // 객체들의 배열(array of objects)은 정렬, 필터링 등의 방법이 이미 인터넷에 많이 있습니다.
        console.log(mapTheList(classImages));

        res.json(classImages);
        //return res.json("search", { classImages });
    } catch (err) {
        console.error(err);
        next(err);
    }
});
module.exports = router;
