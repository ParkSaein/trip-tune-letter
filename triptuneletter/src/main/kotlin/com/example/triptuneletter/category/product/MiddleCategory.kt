package com.example.triptuneletter.category.product

enum class MiddleCategory(
    val description: String,
    val largeCategory: LargeCategory
) {
    // ELECTRONICS
    HOME_APPLIANCES("가전제품", LargeCategory.ELECTRONICS),
    KITCHEN_APPLIANCES("주방가전", LargeCategory.ELECTRONICS),
    DIGITAL_COMPUTER("디지털/컴퓨터", LargeCategory.ELECTRONICS),
    MOBILE("모바일", LargeCategory.ELECTRONICS),
    AUDIO("음향기기", LargeCategory.ELECTRONICS),

    // FASHION
    MEN_CLOTHING("남성의류", LargeCategory.FASHION),
    WOMEN_CLOTHING("여성의류", LargeCategory.FASHION),
    ACCESSORIES("잡화/소품", LargeCategory.FASHION),
    SHOES("신발", LargeCategory.FASHION),

    // FOOD
    FRESH_FOOD("신선식품", LargeCategory.FOOD),
    PROCESSED_FOOD("가공식품", LargeCategory.FOOD),
    BEVERAGE("음료/커피", LargeCategory.FOOD),
    CONVENIENCE_FOOD("간편조리식", LargeCategory.FOOD),

    // HOME
    FURNITURE("가구", LargeCategory.HOME),
    FABRIC("침구/패브릭", LargeCategory.HOME),
    DECOR("인테리어소품", LargeCategory.HOME),
    KITCHEN_WARE("주방용품", LargeCategory.HOME),

    // BEAUTY
    SKIN_CARE("스킨케어", LargeCategory.BEAUTY),
    MAKE_UP("메이크업", LargeCategory.BEAUTY),
    HAIR_BODY("헤어/바디", LargeCategory.BEAUTY),

    // SPORTS
    CAMPING("캠핑/아웃도어", LargeCategory.SPORTS),
    FITNESS("헬스/요가", LargeCategory.SPORTS),
    GOLF("골프", LargeCategory.SPORTS),

    // BOOKS
    FICTION("소설", LargeCategory.BOOKS),
    SELF_IMPROVEMENT("자기계발", LargeCategory.BOOKS),
    ECONOMY_BUSINESS("경제경영", LargeCategory.BOOKS),
    TRAVEL_BOOKS("여행도서", LargeCategory.BOOKS),

    // HEALTH
    SUPPLEMENTS("영양제", LargeCategory.HEALTH),
    HEALTH_GEAR("건강측정용품", LargeCategory.HEALTH),

    // LIFE
    CLEANING_SUPPLIES("세탁/세제", LargeCategory.LIFE),
    BATH_SUPPLIES("욕실용품", LargeCategory.LIFE),
    HOUSEHOLD_ITEMS("생활잡화", LargeCategory.LIFE),

    // PET
    DOG_SUPPLIES("강아지용품", LargeCategory.PET),
    CAT_SUPPLIES("고양이용품", LargeCategory.PET),
    AQUARIUM_SUPPLIES("관상어용품", LargeCategory.PET),

    // KIDS
    BABY_CLOTHING("아동의류", LargeCategory.KIDS),
    TOYS("완구/교구", LargeCategory.KIDS),
    BABY_CARE("유아용품", LargeCategory.KIDS),

    // HOBBY
    GAME_CONSOLE("게임기", LargeCategory.HOBBY),
    COLLECTIBLES("피규어/수집품", LargeCategory.HOBBY),
    MUSIC_INSTRUMENT("악기", LargeCategory.HOBBY),
    ART_SUPPLIES("미술용품", LargeCategory.HOBBY),

    // STATIONERY
    OFFICE_SUPPLIES("사무용품", LargeCategory.STATIONERY),
    WRITING_INSTRUMENTS("필기구", LargeCategory.STATIONERY),
    NOTEBOOKS("지류/노트", LargeCategory.STATIONERY),

    // AUTOMOTIVE
    CAR_INTERIOR("차량내장/소품", LargeCategory.AUTOMOTIVE),
    CAR_EXTERIOR("차량외장", LargeCategory.AUTOMOTIVE),
    CAR_WASH("세차용품", LargeCategory.AUTOMOTIVE),

    // TRAVEL
    TRAVEL_LUGGAGE("여행가방/캐리어", LargeCategory.TRAVEL),
    TRAVEL_ACCESSORIES("여행소품", LargeCategory.TRAVEL),

    OTHERS("기타", LargeCategory.OTHERS)
}

