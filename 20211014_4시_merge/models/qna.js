const Sequelize = require("sequelize");
//Sequelize require 불러오기

//module.exports 내보내기
module.exports = class Qna extends Sequelize.Model {
    static init(sequelize) {
        //init 매서드에서는 테이블에 대한 관계를 설정
        return super.init(
            {
                //qnaNum 이라는 컬럼
                qnaNum: {
                    //colume 안의 값들
                    //type : sequelize.INTEGER.UNSIGNED(타입은 sequelize.값은 INT 숫자다)
                    type: Sequelize.INTEGER.UNSIGNED,
                    //기본키다
                    primaryKey: true,
                    //MYSQL에서는 NOTNULL이라는 값이 sequelize=allowNull false
                    allowNull: false,
                    autoIncrement: true,
                },
                qnaTitle: {
                    //type : sequelize.STRING(타입은 sequelize 값은 STRING = MYSQL VARCHAR와같다)
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                qnaContent: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                qnaCreate: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    //defaultValue : Sequelize.NOW(현재시간을 기본값으로 사용할 수 있다.)
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                /*//sequelize static init 메서드의 매개변수와 연결되는 옵션//으로 db
                db.sequelize객체를 넣어야 합니다 나중에 model/index.js에서 연결해야함
                */
                sequelize,

                /*timestamps 현재 false로 되어있으며 이 속성값ㅇ이 true면 시퀄라이즈는 createdAt와
                updateAt컬럼을 추가합니다. 각각 로우가 생성될 때와 수정될 때의 시간이 자동으로 입력됩니다.
                */
                timestamps: false,

                /*
                underscored: 시퀄라이즈는 기본적으로 테이블명과 컬러명을
                camel case = 카멜레온기업 카멜케이스
                snake case = 스네이크케이스 언더바기법?? 
                값이 false 
                */
                underscored: false,

                //modelName: 모델네임을 설정합니다 = qna.js ??라고생각하는데
                modelName: "qna",
                /*
                tableName : mysql에 생성되거나 db에 생성되는 table name이다.
                */
                tableName: "qnas",
                /*
                paranoid : true 설정시 deleteAt 컬럼 생성 row 제거시 row데이터보존후
                제거 후 deleteAt기록 남음 row 조회및 복원을 위해서 남겨둔것
                복원을 원할시 true 설정하면됨
                */
                paranoid: false,
                //입력값 스타일?? utf8 및 utf8_general_ci로 입력해야 한글값나옴
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
    //associate 메서드에서는 다른 모델과의 관계를 적는다.
    static associate(db) {
        //db.User.hasMany(db,qna) : 데이터베이스의
        db.Qna.belongsTo(db.User, {
            foreignKey: "userId",
            targetKey: "userId",
        });
        db.Qna.belongsTo(db.Admin, {
            foreignKey: "adminId",
            targetKey: "adminId",
        });
        db.Qna.belongsTo(db.Answer, {
            foreignKey: "answerContent",
            sourceKey: "qnaNum",
        });
    }
};
