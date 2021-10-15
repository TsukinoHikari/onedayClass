"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let datas = [];
        // baseball1,2
        let c1 = {
            classTitle: "야구배우러 오세요~~",
            classAddr: "서울 천호로 23길 51, 천호체육관",
            classPrice: 1000,
            classQty: 18,
            classContent:
                "야구를 배우고 싶으신가요?? 천호 체육관으로 오세요! 전문 강사들이 당신의 야구 실력을 증진시켜 드립니다!!",
            categoryNum: 4,
            classDate: "2021-10-18",
            userId: "abc123",
        };
        //beauty1,2
        let c2 = {
            classTitle: "뷰티, 배워보고 싶었다면?",
            classAddr: "서울 신용산로 45길 아모레퍼시픽건물 4층",
            classPrice: 2000,
            classQty: 20,
            classContent:
                "원데이클래스 책 무료 제공! 하루만에 배우는 헤어, 피부, 메이크업, 네일아트! 와서 배워가세요!!",
            categoryNum: 3,
            classDate: "2021-10-22",
            userId: "abc123",
        };
        //cooking1,2
        let c3 = {
            classTitle: "배우GO싶다! 요리를!",
            classAddr: "한솥요리학원 서울 종로점",
            classPrice: 3000,
            classQty: 30,
            classContent:
                "고르는 재미 느껴봐! 8개 직영점 운영중! 교육, 시연 실습 시식까지! 한솔요리학원에서 맛있는 요리를 배워가세요~",
            categoryNum: 5,
            classDate: "2021-10-16",
            userId: "bbc123",
        };
        // DIY1,2
        let c4 = {
            classTitle: "봄맞이 DIY 원데이 클래스",
            classAddr: "서울 강남구 학동로 134 LG하우시스 지인스퀘어",
            classPrice: 100,
            classQty: 40,
            classContent:
                "마크라메, 라탄공예 가르쳐드려요. 화분행잉, 우든볼 키링, 소형 채반 겸 컵받침 만들러 오세요",
            categoryNum: 1,
            classDate: "2021-11-10",
            userId: "kakao",
        };
        //etc1,2
        let c5 = {
            classTitle: "재태크, 처음 시작하는 너에게 들려주고 싶은 이야기",
            classAddr: "서울 강남구 영동대로 513 ",
            classPrice: 3400,
            classQty: 100,
            classContent:
                "초보 예비 투자자를 위해 생각담장이 준비한 월급관리 재테크 강연",
            categoryNum: 7,
            classDate: "2021-10-18",
            userId: "qweqwe",
        };
        //soccer 1,2
        let c6 = {
            classTitle: "리버풀FC 아카데미 원데이 클래스",
            classAddr: "경기 남양주 어딘가",
            classPrice: 1500,
            classQty: 22,
            classContent:
                "안녕하세요. 리버풀 FC 아카데미 코리아 총감독 피터 포드햄입니다. 어렸을 때 축구 배워야 친구들과 재밌게 놀 수 있어요. 빨리 배우러 오세요. 늦게오면 자리없어요",
            categoryNum: 4,
            classDate: "2021-10-25",
            userId: "abc123",
        };
        // study 1,2
        let c7 = {
            classTitle: "초등 로봇 프로그래밍",
            classAddr: "한동대학교 뉴턴홀 220호",
            classPrice: 1300,
            classQty: 20,
            classContent: "치즈스틱 코딩으로 재미있게 배우는 로봇 프로그래밍",
            categoryNum: 6,
            classDate: "2021-10-24",
            userId: "bbc123",
        };
        //surfing 1,2
        let c8 = {
            classTitle: "서핑 원데이클래스",
            classAddr: "강원 양양 양리단길",
            classPrice: 1500,
            classQty: 50,
            classContent:
                "여름날엔 서핑이지! 무더위를 싹 날리는 서핑 클래스. 아이더 클래스 참가자 모집",
            categoryNum: 7,
            classDate: "2021-10-30",
            userId: "kakao",
        };
        // study 3,4
        let c10 = {
            classTitle: "Making 원데이 클래스",
            classAddr: "서울 종로구 후미진 골목",
            classPrice: 1200,
            classQty: 3,
            classContent:
                "ICT 단기 특강 - 산출물 제작. 비밀 프로젝트. 소수 정예 인원 모집",
            categoryNum: 6,
            classDate: "2021-10-27",
            userId: "qweqwe",
        };
        // DIY 3,4
        let c11 = {
            classTitle: "가죽공예 원데이 클래스",
            classAddr: "창업스쿨 3층",
            classPrice: 4500,
            classQty: 10,
            classContent:
                "가죽공예 창업스쿨. 포인트만 알아도 돈이 되는 가죽공예 원데이 클래스!",
            categoryNum: 1,
            classDate: "2021-11-01",
            userId: "abc123",
        };
        // culture 1,2
        let c12 = {
            classTitle: "너의 감성을 사랑해",
            classAddr: "서울 양재로 31길 44",
            classPrice: 1200,
            classQty: 20,
            classContent:
                "꽃꽃이를 좋아하는 분들 모셔요~ 쉽고 빠르게 가르쳐드려요~~ 꽃감성을 즐겨봐요",
            categoryNum: 2,
            classDate: "2021-11-02",
            userId: "bbc123",
        };
        // beauty 3,4
        let c13 = {
            classTitle: "뷰티 클래스",
            classAddr: "명동성당 맞은편 PAGE 3층",
            classPrice: 1500,
            classQty: 15,
            classContent:
                "K-뷰티 체험 홍보관에서 뷰티 원데이 클래스 합니다. 현장에서는 이벤트 부스에서 신청 가능합니다.",
            categoryNum: 3,
            classDate: "2021-11-24",
            userId: "kakao",
        };
        // cooking3,4,5
        let c9 = {
            classTitle: "쿠킹클래스",
            classAddr: "CJ제일제당건물 5층",
            classPrice: 10000,
            classQty: 30,
            classContent:
                "홈피크닉 캐릭터 도시락을 만들어 봅시다! 캐릭터 두부볼 샐러드, 펭귄 김밥을 만들거에요~ CJ더키친 쿠킹 스튜디오 이강원 강사님과 함께해요!",
            categoryNum: 5,
            classDate: "2021-11-11",
            userId: "qweqwe",
        };

        // let c2={
        //     classTitle:"",
        //     classAddr:"",
        //     classPrice: ,
        //     classQty: ,
        //     classContent:"",
        //     categoryNum: ,
        //     classDate:"",
        //     userId: ,
        // };

        datas.push(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13);

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
