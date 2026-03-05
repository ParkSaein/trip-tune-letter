package com.example.triptuneletter.category.travel

enum class City(
    val description: String,
    val country: Country
) {
    // KOREA
    SEOUL("서울", Country.KOREA),
    BUSAN("부산", Country.KOREA),
    JEJU("제주", Country.KOREA),
    INCHEON("인천", Country.KOREA),
    GYEONGJU("경주", Country.KOREA),
    GANGNEUNG("강릉", Country.KOREA),
    SOKCHO("속초", Country.KOREA),
    YEOSU("여수", Country.KOREA),
    JEONJU("전주", Country.KOREA),
    CHUNCHEON("춘천", Country.KOREA),
    POHANG("포항", Country.KOREA),
    TONGYEONG("통영", Country.KOREA),

    // JAPAN
    TOKYO("도쿄", Country.JAPAN),
    OSAKA("오사카", Country.JAPAN),
    FUKUOKA("후쿠오카", Country.JAPAN),
    SAPPORO("삿포로", Country.JAPAN),
    OKINAWA("오키나와", Country.JAPAN),
    KYOTO("교토", Country.JAPAN),
    NAGOYA("나고야", Country.JAPAN),
    HIROSHIMA("히로시마", Country.JAPAN),
    NARA("나라", Country.JAPAN),
    TAKAMATSU("다카마쓰", Country.JAPAN),

    // CHINA / HONG KONG / MACAU
    BEIJING("베이징", Country.CHINA),
    SHANGHAI("상하이", Country.CHINA),
    QINGDAO("칭다오", Country.CHINA),
    GUANGZHOU("광저우", Country.CHINA),
    CHENGDU("청두", Country.CHINA),
    HONG_KONG_CITY("홍콩", Country.HONG_KONG),
    MACAU_CITY("마카오", Country.MACAU),

    // VIETNAM
    DANANG("다낭", Country.VIETNAM),
    HANOI("하노이", Country.VIETNAM),
    HO_CHI_MINH("호치민", Country.VIETNAM),
    NHA_TRANG("나트랑", Country.VIETNAM),
    PHU_QUOC("푸꾸옥", Country.VIETNAM),
    DALAT("달랏", Country.VIETNAM),
    SAPA("사파", Country.VIETNAM),

    // THAILAND
    BANGKOK("방콕", Country.THAILAND),
    CHIANG_MAI("치앙마이", Country.THAILAND),
    PHUKET("푸켓", Country.THAILAND),
    PATTAYA("파타야", Country.THAILAND),
    KOH_SAMUI("코사무이", Country.THAILAND),
    KRABI("끄라비", Country.THAILAND),

    // TAIWAN / SINGAPORE
    TAIPEI("타이베이", Country.TAIWAN),
    KAOHSIUNG("가오슝", Country.TAIWAN),
    SINGAPORE_CITY("싱가포르", Country.SINGAPORE),

    // PHILIPPINES / MALAYSIA / INDONESIA
    MANILA("마닐라", Country.PHILIPPINES),
    CEBU("세부", Country.PHILIPPINES),
    BORACAY("보라카이", Country.PHILIPPINES),
    BOHOL("보홀", Country.PHILIPPINES),
    KUALA_LUMPUR("쿠알라룸푸르", Country.MALAYSIA),
    KOTA_KINABALU("코타키나발루", Country.MALAYSIA),
    PENANG("페낭", Country.MALAYSIA),
    BALI("발리", Country.INDONESIA),
    JAKARTA("자카르타", Country.INDONESIA),

    // USA / CANADA
    NEW_YORK("뉴욕", Country.USA),
    LA("LA", Country.USA),
    SAN_FRANCISCO("샌프란시스코", Country.USA),
    LAS_VEGAS("라스베이거스", Country.USA),
    HAWAII("하와이", Country.USA),
    CHICAGO("시카고", Country.USA),
    SEATTLE("시애틀", Country.USA),
    BOSTON("보스턴", Country.USA),
    GUAM("괌", Country.USA),
    SAIPAN("사이판", Country.USA),
    TORONTO("토론토", Country.CANADA),
    VANCOUVER("밴쿠버", Country.CANADA),
    MONTREAL("몬트리올", Country.CANADA),

    // EUROPE
    PARIS("파리", Country.FRANCE),
    NICE("니스", Country.FRANCE),
    STRASBOURG("스트라스부르", Country.FRANCE),
    LONDON("런던", Country.UK),
    EDINBURGH("에든버러", Country.UK),
    ROME("로마", Country.ITALY),
    FLORENCE("피렌체", Country.ITALY),
    VENICE("베네치아", Country.ITALY),
    MILAN("밀라노", Country.ITALY),
    NAPLES("나폴리", Country.ITALY),
    BARCELONA("바르셀로나", Country.SPAIN),
    MADRID("마드리드", Country.SPAIN),
    SEVILLE("세비야", Country.SPAIN),
    GRANADA("그라나다", Country.SPAIN),
    FRANKFURT("프랑크푸르트", Country.GERMANY),
    MUNICH("뮌헨", Country.GERMANY),
    BERLIN("베를린", Country.GERMANY),
    ZURICH("취리히", Country.SWITZERLAND),
    INTERLAKEN("인터라켄", Country.SWITZERLAND),
    LUCERNE("루체른", Country.SWITZERLAND),
    VIENNA("비엔나", Country.AUSTRIA),
    SALZBURG("잘츠부르크", Country.AUSTRIA),
    PRAGUE("프라하", Country.CZECH),
    LISBON("리스본", Country.PORTUGAL),
    PORTO("포르투", Country.PORTUGAL),
    AMSTERDAM("암스테르담", Country.NETHERLANDS),
    BRUSSELS("브뤼셀", Country.BELGIUM),
    ATHENS("아테네", Country.GREECE),
    SANTORINI("산토리니", Country.GREECE),

    // MIDDLE EAST / AFRICA
    ISTANBUL("이스탄불", Country.TURKEY),
    CAPPADOCIA("카파도키아", Country.TURKEY),
    CAIRO("카이로", Country.EGYPT),
    DUBAI("두바이", Country.UAE),
    ABU_DHABI("아부다비", Country.UAE),

    // AMERICA
    MEXICO_CITY("멕시코시티", Country.MEXICO),
    CANCUN("칸쿤", Country.MEXICO),
    RIO_DE_JANEIRO("리우데자네이루", Country.BRAZIL),
    SAO_PAULO("상파울루", Country.BRAZIL),
    BUENOS_AIRES("부이에노스아이레스", Country.ARGENTINA),

    // OCEANIA
    SYDNEY("시드니", Country.AUSTRALIA),
    MELBOURNE("멜버른", Country.AUSTRALIA),
    BRISBANE("브리즈번", Country.AUSTRALIA),
    PERTH("퍼스", Country.AUSTRALIA),
    AUCKLAND("오클랜드", Country.NEW_ZEALAND),
    QUEENSTOWN("퀸즈타운", Country.NEW_ZEALAND),

    OTHERS("기타", Country.OTHERS)
}
