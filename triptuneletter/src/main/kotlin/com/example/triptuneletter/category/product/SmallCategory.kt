package com.example.triptuneletter.category.product

enum class SmallCategory(
    val description: String,
    val largeCategory: LargeCategory,
    val middleCategory: MiddleCategory
) {
    // ELECTRONICS -> HOME_APPLIANCES
    REFRIGERATOR("냉장고", LargeCategory.ELECTRONICS, MiddleCategory.HOME_APPLIANCES),
    WASHING_MACHINE("세탁기", LargeCategory.ELECTRONICS, MiddleCategory.HOME_APPLIANCES),
    VACUUM_CLEANER("청소기", LargeCategory.ELECTRONICS, MiddleCategory.HOME_APPLIANCES),
    AIR_CONDITIONER("에어컨", LargeCategory.ELECTRONICS, MiddleCategory.HOME_APPLIANCES),

    // ELECTRONICS -> KITCHEN_APPLIANCES
    MICROWAVE("전자레인지", LargeCategory.ELECTRONICS, MiddleCategory.KITCHEN_APPLIANCES),
    RICE_COOKER("밥솥", LargeCategory.ELECTRONICS, MiddleCategory.KITCHEN_APPLIANCES),
    COFFEE_MACHINE("커피머신", LargeCategory.ELECTRONICS, MiddleCategory.KITCHEN_APPLIANCES),
    AIR_FRYER("에어프라이어", LargeCategory.ELECTRONICS, MiddleCategory.KITCHEN_APPLIANCES),

    // ELECTRONICS -> DIGITAL_COMPUTER
    LAPTOP("노트북", LargeCategory.ELECTRONICS, MiddleCategory.DIGITAL_COMPUTER),
    MONITOR("모니터", LargeCategory.ELECTRONICS, MiddleCategory.DIGITAL_COMPUTER),
    KEYBOARD("키보드", LargeCategory.ELECTRONICS, MiddleCategory.DIGITAL_COMPUTER),

    // ELECTRONICS -> MOBILE
    SMARTPHONE("스마트폰", LargeCategory.ELECTRONICS, MiddleCategory.MOBILE),
    SMARTWATCH("스마트워치", LargeCategory.ELECTRONICS, MiddleCategory.MOBILE),
    TABLET("태블릿", LargeCategory.ELECTRONICS, MiddleCategory.MOBILE),
    POWER_BANK("보조배터리", LargeCategory.ELECTRONICS, MiddleCategory.MOBILE),
    CHARGING_CABLE("충전케이블", LargeCategory.ELECTRONICS, MiddleCategory.MOBILE),

    // ELECTRONICS -> AUDIO
    HEADPHONE("헤드폰", LargeCategory.ELECTRONICS, MiddleCategory.AUDIO),
    SPEAKER("스피커", LargeCategory.ELECTRONICS, MiddleCategory.AUDIO),
    EARBUDS("이어폰", LargeCategory.ELECTRONICS, MiddleCategory.AUDIO),
    MICROPHONE("마이크", LargeCategory.ELECTRONICS, MiddleCategory.AUDIO),

    // FASHION -> MEN_CLOTHING
    MEN_TSHIRT("남성 티셔츠", LargeCategory.FASHION, MiddleCategory.MEN_CLOTHING),
    MEN_PANTS("남성 바지", LargeCategory.FASHION, MiddleCategory.MEN_CLOTHING),
    MEN_SHIRT("남성 셔츠", LargeCategory.FASHION, MiddleCategory.MEN_CLOTHING),
    MEN_OUTER("남성 아우터", LargeCategory.FASHION, MiddleCategory.MEN_CLOTHING),
    MEN_UNDERWEAR("남성 속옷", LargeCategory.FASHION, MiddleCategory.MEN_CLOTHING),
    MEN_SUIT("남성 정장", LargeCategory.FASHION, MiddleCategory.MEN_CLOTHING),

    // FASHION -> WOMEN_CLOTHING
    WOMEN_DRESS("여성 원피스", LargeCategory.FASHION, MiddleCategory.WOMEN_CLOTHING),
    WOMEN_SKIRT("여성 스커트", LargeCategory.FASHION, MiddleCategory.WOMEN_CLOTHING),
    WOMEN_BLOUSE("여성 블라우스", LargeCategory.FASHION, MiddleCategory.WOMEN_CLOTHING),
    WOMEN_OUTER("여성 아우터", LargeCategory.FASHION, MiddleCategory.WOMEN_CLOTHING),
    WOMEN_UNDERWEAR("여성 속옷", LargeCategory.FASHION, MiddleCategory.WOMEN_CLOTHING),

    // FASHION -> ACCESSORIES
    HAT("모자", LargeCategory.FASHION, MiddleCategory.ACCESSORIES),
    BELT("벨트", LargeCategory.FASHION, MiddleCategory.ACCESSORIES),
    WALLET("지갑", LargeCategory.FASHION, MiddleCategory.ACCESSORIES),
    SCARF("목도리/스카프", LargeCategory.FASHION, MiddleCategory.ACCESSORIES),
    SOCKS("양말", LargeCategory.FASHION, MiddleCategory.ACCESSORIES),
    JEWELRY("쥬얼리", LargeCategory.FASHION, MiddleCategory.ACCESSORIES),
    WATCH("시계", LargeCategory.FASHION, MiddleCategory.ACCESSORIES),

    // FASHION -> SHOES
    SNEAKERS("운동화", LargeCategory.FASHION, MiddleCategory.SHOES),
    DRESS_SHOES("구두", LargeCategory.FASHION, MiddleCategory.SHOES),
    SANDALS("샌들/슬리퍼", LargeCategory.FASHION, MiddleCategory.SHOES),
    BOOTS("부츠", LargeCategory.FASHION, MiddleCategory.SHOES),

    // FOOD -> FRESH_FOOD
    FRUITS("과일", LargeCategory.FOOD, MiddleCategory.FRESH_FOOD),
    VEGETABLES("채소", LargeCategory.FOOD, MiddleCategory.FRESH_FOOD),
    MEAT("육류", LargeCategory.FOOD, MiddleCategory.FRESH_FOOD),
    SEAFOOD("수산물", LargeCategory.FOOD, MiddleCategory.FRESH_FOOD),
    EGGS("계란/유제품", LargeCategory.FOOD, MiddleCategory.FRESH_FOOD),
    MILK("우유", LargeCategory.FOOD, MiddleCategory.FRESH_FOOD),

    // FOOD -> PROCESSED_FOOD
    RAMEN("라면", LargeCategory.FOOD, MiddleCategory.PROCESSED_FOOD),
    CANNED_FOOD("통조림", LargeCategory.FOOD, MiddleCategory.PROCESSED_FOOD),
    SNACK("과자", LargeCategory.FOOD, MiddleCategory.PROCESSED_FOOD),
    BREAD("빵/베이커리", LargeCategory.FOOD, MiddleCategory.PROCESSED_FOOD),
    KIMCHI("김치/반찬", LargeCategory.FOOD, MiddleCategory.PROCESSED_FOOD),
    ICE_CREAM("아이스크림", LargeCategory.FOOD, MiddleCategory.PROCESSED_FOOD),

    // FOOD -> BEVERAGE
    COFFEE_BEAN("원두", LargeCategory.FOOD, MiddleCategory.BEVERAGE),
    BOTTLED_WATER("생수", LargeCategory.FOOD, MiddleCategory.BEVERAGE),
    JUICE("주스", LargeCategory.FOOD, MiddleCategory.BEVERAGE),
    CARBONATED_DRINK("탄산음료", LargeCategory.FOOD, MiddleCategory.BEVERAGE),
    TEA("차(Tea)", LargeCategory.FOOD, MiddleCategory.BEVERAGE),
    ALCOHOL("주류", LargeCategory.FOOD, MiddleCategory.BEVERAGE),

    // HOME -> FURNITURE
    BED("침대", LargeCategory.HOME, MiddleCategory.FURNITURE),
    SOFA("소파", LargeCategory.HOME, MiddleCategory.FURNITURE),
    TABLE("식탁", LargeCategory.HOME, MiddleCategory.FURNITURE),
    DESK("책상", LargeCategory.HOME, MiddleCategory.FURNITURE),
    CHAIR("의자", LargeCategory.HOME, MiddleCategory.FURNITURE),
    CLOSET("옷장/서랍장", LargeCategory.HOME, MiddleCategory.FURNITURE),
    SHELF("선반/책장", LargeCategory.HOME, MiddleCategory.FURNITURE),

    // HOME -> FABRIC
    CURTAIN("커튼", LargeCategory.HOME, MiddleCategory.FABRIC),
    CARPET("카펫", LargeCategory.HOME, MiddleCategory.FABRIC),
    BEDDING("침구세트", LargeCategory.HOME, MiddleCategory.FABRIC),
    TOWEL("수건", LargeCategory.HOME, MiddleCategory.FABRIC),
    CUSHION("쿠션/방석", LargeCategory.HOME, MiddleCategory.FABRIC),

    // HOME -> DECOR
    LIGHTING("조명", LargeCategory.HOME, MiddleCategory.DECOR),
    FLOWER_VASE("화병", LargeCategory.HOME, MiddleCategory.DECOR),
    CLOCK("벽시계", LargeCategory.HOME, MiddleCategory.DECOR),

    // HOME -> KITCHEN_WARE
    POT("냄비/프라이팬", LargeCategory.HOME, MiddleCategory.KITCHEN_WARE),
    DISH("식기/그릇", LargeCategory.HOME, MiddleCategory.KITCHEN_WARE),
    CUP("컵/텀블러", LargeCategory.HOME, MiddleCategory.KITCHEN_WARE),

    // BEAUTY -> SKIN_CARE
    TONER("토너", LargeCategory.BEAUTY, MiddleCategory.SKIN_CARE),
    LOTION("로션", LargeCategory.BEAUTY, MiddleCategory.SKIN_CARE),
    SUNSCREEN("선크림", LargeCategory.BEAUTY, MiddleCategory.SKIN_CARE),
    ESSENCE("에센스/세럼", LargeCategory.BEAUTY, MiddleCategory.SKIN_CARE),
    FACIAL_MASK("마스크팩", LargeCategory.BEAUTY, MiddleCategory.SKIN_CARE),
    CLEANSING("클렌징", LargeCategory.BEAUTY, MiddleCategory.SKIN_CARE),

    // BEAUTY -> MAKE_UP
    FOUNDATION("파운데이션/쿠션", LargeCategory.BEAUTY, MiddleCategory.MAKE_UP),
    LIPSTICK("립스틱/틴트", LargeCategory.BEAUTY, MiddleCategory.MAKE_UP),
    EYE_SHADOW("아이섀도우", LargeCategory.BEAUTY, MiddleCategory.MAKE_UP),
    BLUSHER("블러셔", LargeCategory.BEAUTY, MiddleCategory.MAKE_UP),

    // BEAUTY -> HAIR_BODY
    SHAMPOO("샴푸/린스", LargeCategory.BEAUTY, MiddleCategory.HAIR_BODY),
    BODY_WASH("바디워시", LargeCategory.BEAUTY, MiddleCategory.HAIR_BODY),
    HAIR_WAX("헤어왁스/스프레이", LargeCategory.BEAUTY, MiddleCategory.HAIR_BODY),
    BODY_LOTION("바디로션", LargeCategory.BEAUTY, MiddleCategory.HAIR_BODY),

    // SPORTS -> CAMPING
    TENT("텐트", LargeCategory.SPORTS, MiddleCategory.CAMPING),
    SLEEPING_BAG("침낭", LargeCategory.SPORTS, MiddleCategory.CAMPING),
    CAMPING_CHAIR("캠핑의자", LargeCategory.SPORTS, MiddleCategory.CAMPING),
    LANTERN("랜턴", LargeCategory.SPORTS, MiddleCategory.CAMPING),
    CAMPING_COOKWARE("코헬/식기", LargeCategory.SPORTS, MiddleCategory.CAMPING),
    CAMPING_MAT("자충매트", LargeCategory.SPORTS, MiddleCategory.CAMPING),

    // SPORTS -> FITNESS
    DUMBBELL("덤벨", LargeCategory.SPORTS, MiddleCategory.FITNESS),
    YOGA_MAT("요가매트", LargeCategory.SPORTS, MiddleCategory.FITNESS),
    PROTEIN_POWDER("단백질 보충제", LargeCategory.SPORTS, MiddleCategory.FITNESS),
    FOAM_ROLLER("폼롤러", LargeCategory.SPORTS, MiddleCategory.FITNESS),

    // SPORTS -> GOLF
    GOLF_CLUB("골프채", LargeCategory.SPORTS, MiddleCategory.GOLF),
    GOLF_BALL("골프공", LargeCategory.SPORTS, MiddleCategory.GOLF),
    GOLF_WEAR("골프의류", LargeCategory.SPORTS, MiddleCategory.GOLF),

    // BOOKS -> FICTION
    FANTASY("판타지/무협", LargeCategory.BOOKS, MiddleCategory.FICTION),
    ROMANCE("로맨스", LargeCategory.BOOKS, MiddleCategory.FICTION),
    THRILLER("추리/스릴러", LargeCategory.BOOKS, MiddleCategory.FICTION),

    // BOOKS -> SELF_IMPROVEMENT
    MOTIVATION("자기계발서", LargeCategory.BOOKS, MiddleCategory.SELF_IMPROVEMENT),
    TIME_MANAGEMENT("시간관리", LargeCategory.BOOKS, MiddleCategory.SELF_IMPROVEMENT),

    // BOOKS -> ECONOMY_BUSINESS
    STOCK_INVESTMENT("주식/투자", LargeCategory.BOOKS, MiddleCategory.ECONOMY_BUSINESS),
    MARKETING("마케팅", LargeCategory.BOOKS, MiddleCategory.ECONOMY_BUSINESS),

    // HEALTH -> SUPPLEMENTS
    VITAMIN("비타민", LargeCategory.HEALTH, MiddleCategory.SUPPLEMENTS),
    OMEGA3("오메가3", LargeCategory.HEALTH, MiddleCategory.SUPPLEMENTS),
    PROBIOTICS("유산균", LargeCategory.HEALTH, MiddleCategory.SUPPLEMENTS),

    // HEALTH -> HEALTH_GEAR
    MASSAGER("안마기", LargeCategory.HEALTH, MiddleCategory.HEALTH_GEAR),
    SCALES("체중계", LargeCategory.HEALTH, MiddleCategory.HEALTH_GEAR),

    // LIFE -> CLEANING_SUPPLIES
    DETERGENT("세탁세제", LargeCategory.LIFE, MiddleCategory.CLEANING_SUPPLIES),
    FABRIC_SOFTENER("섬유유연제", LargeCategory.LIFE, MiddleCategory.CLEANING_SUPPLIES),

    // LIFE -> BATH_SUPPLIES
    TOILET_PAPER("화장지", LargeCategory.LIFE, MiddleCategory.BATH_SUPPLIES),
    TOOTHBRUSH("칫솔/치약", LargeCategory.LIFE, MiddleCategory.BATH_SUPPLIES),

    // LIFE -> HOUSEHOLD_ITEMS
    UMBRELLA("우산", LargeCategory.LIFE, MiddleCategory.HOUSEHOLD_ITEMS),
    MOP("청소도구", LargeCategory.LIFE, MiddleCategory.HOUSEHOLD_ITEMS),

    // PET -> DOG_SUPPLIES
    DOG_FOOD("강아지 사료", LargeCategory.PET, MiddleCategory.DOG_SUPPLIES),
    DOG_SNACK("강아지 간식", LargeCategory.PET, MiddleCategory.DOG_SUPPLIES),
    DOG_TOY("강아지 장난감", LargeCategory.PET, MiddleCategory.DOG_SUPPLIES),
    DOG_LEASH("강아지 목줄", LargeCategory.PET, MiddleCategory.DOG_SUPPLIES),
    DOG_CLOTHING("강아지 의류", LargeCategory.PET, MiddleCategory.DOG_SUPPLIES),
    DOG_HOUSE("강아지 집", LargeCategory.PET, MiddleCategory.DOG_SUPPLIES),

    // PET -> CAT_SUPPLIES
    CAT_FOOD("고양이 사료", LargeCategory.PET, MiddleCategory.CAT_SUPPLIES),
    CAT_LITTER("고양이 모래", LargeCategory.PET, MiddleCategory.CAT_SUPPLIES),
    CAT_TOWER("캣타워", LargeCategory.PET, MiddleCategory.CAT_SUPPLIES),
    CAT_SNACK("고양이 간식", LargeCategory.PET, MiddleCategory.CAT_SUPPLIES),
    CAT_TOY("고양이 장난감", LargeCategory.PET, MiddleCategory.CAT_SUPPLIES),

    // PET -> AQUARIUM_SUPPLIES
    FISH_TANK("어항", LargeCategory.PET, MiddleCategory.AQUARIUM_SUPPLIES),
    FISH_FOOD("물고기 먹이", LargeCategory.PET, MiddleCategory.AQUARIUM_SUPPLIES),

    // KIDS -> BABY_CLOTHING
    BABY_BODYSUIT("내의/바디슈트", LargeCategory.KIDS, MiddleCategory.BABY_CLOTHING),
    KIDS_JACKET("아동 외투", LargeCategory.KIDS, MiddleCategory.BABY_CLOTHING),

    // KIDS -> BABY_CARE
    DIAPER("기저귀", LargeCategory.KIDS, MiddleCategory.BABY_CARE),
    BABY_WIPES("물티슈", LargeCategory.KIDS, MiddleCategory.BABY_CARE),
    BABY_BOTTLE("젖병", LargeCategory.KIDS, MiddleCategory.BABY_CARE),

    // HOBBY -> GAME_CONSOLE
    PLAYSTATION("플레이스테이션", LargeCategory.HOBBY, MiddleCategory.GAME_CONSOLE),
    NINTENDO_SWITCH("닌텐도 스위치", LargeCategory.HOBBY, MiddleCategory.GAME_CONSOLE),
    XBOX("엑스박스", LargeCategory.HOBBY, MiddleCategory.GAME_CONSOLE),

    // HOBBY -> COLLECTIBLES
    FIGURE("피규어", LargeCategory.HOBBY, MiddleCategory.COLLECTIBLES),
    PLAMODEL("프라모델", LargeCategory.HOBBY, MiddleCategory.COLLECTIBLES),

    // HOBBY -> MUSIC_INSTRUMENT
    GUITAR("기타", LargeCategory.HOBBY, MiddleCategory.MUSIC_INSTRUMENT),
    PIANO("피아노/키보드", LargeCategory.HOBBY, MiddleCategory.MUSIC_INSTRUMENT),

    // STATIONERY -> OFFICE_SUPPLIES
    STAPLER("스테이플러", LargeCategory.STATIONERY, MiddleCategory.OFFICE_SUPPLIES),
    SCISSORS("가위/칼", LargeCategory.STATIONERY, MiddleCategory.OFFICE_SUPPLIES),

    // AUTOMOTIVE -> CAR_EXTERIOR
    CAR_WAX("자동차 왁스", LargeCategory.AUTOMOTIVE, MiddleCategory.CAR_EXTERIOR),
    CAR_COVER("차량 커버", LargeCategory.AUTOMOTIVE, MiddleCategory.CAR_EXTERIOR),

    OTHERS("기타", LargeCategory.OTHERS, MiddleCategory.OTHERS)
}
