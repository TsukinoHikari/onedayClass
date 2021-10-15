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
            let sql = `SELECT oclasses.classNum, urlpaths.path, oclasses.classTitle FROM oclasspaths INNER JOIN urlpaths ON oclasspaths.UrlPathId = urlpaths.id INNER JOIN oclasses ON oclasses.classNum=oclasspaths.OclassClassNum WHERE OclassClassNum=${searchClass[i].classNum} GROUP BY OclassClassNum;`;
            let classImage = await sequelize.query(sql, {
                type: QueryTypes.SELECT,
            });
            classImages.push(classImage);
        }

        let mapTheList = function (list) {
            // list 형식이야 어쨌든 전체를 순회하면서
            return list.map(function (item) {
                for (let i = 0; i < item.length; i++) {
                    let attr = item[i];
                    return attr;
                }

                // 반환한다.
            });
        };

        // // 객체들의 배열(array of objects)은 정렬, 필터링 등의 방법이 이미 인터넷에 많이 있습니다.
        const searchClasses = mapTheList(classImages);

        return res.render("search", { searchClasses ,keyword});
    } catch (err) {
        console.error(err);
        next(err);
    }
});
module.exports = router;
