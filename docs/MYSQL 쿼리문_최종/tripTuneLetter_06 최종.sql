CREATE DATABASE IF NOT EXISTS trip_tune_letter;
USE trip_tune_letter;


CREATE TABLE Member(
	member_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_email VARCHAR(100) UNIQUE NOT NULL,
    member_password VARCHAR(255) NOT NULL,
    member_name VARCHAR(50) NOT NULL,
    member_nickname VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_date DATETIME NULL
);

CREATE TABLE Newsletter(
	newsletter_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    newsletter_title VARCHAR(200) NOT NULL,
    newsletter_content TEXT NOT NULL,
    news_keyword VARCHAR(100) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    news_url VARCHAR(500) NOT NULL,
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ai_or_you_post BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Music(
	music_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    music_title VARCHAR(200) NOT NULL,
    music_artist VARCHAR(200) NOT NULL,
    music_url VARCHAR(500) NOT NULL,
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Board(
	board_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    newsletter_id BIGINT NOT NULL,
    FOREIGN KEY (newsletter_id) REFERENCES Newsletter(newsletter_id) ON DELETE CASCADE,
    UNIQUE (newsletter_id),
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NULL
);

CREATE TABLE Board_Music(
	board_music_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    board_id BIGINT NOT NULL,
    music_id BIGINT NOT NULL,
    FOREIGN KEY (board_id) REFERENCES Board(board_id) ON DELETE CASCADE,
    FOREIGN KEY (music_id) REFERENCES Music(music_id) ON DELETE CASCADE,
    UNIQUE (board_id, music_id),
    order_no VARCHAR(20) NOT NULL
);

CREATE TABLE Scrap(
	scrap_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT NOT NULL,
    board_id BIGINT NOT NULL,
    FOREIGN KEY (member_id) REFERENCES Member(member_id) ON DELETE CASCADE,
    FOREIGN KEY (board_id) REFERENCES Board(board_id) ON DELETE CASCADE,
    UNIQUE (member_id, board_id),
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Likeit(
	like_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT NOT NULL,
    board_id BIGINT NOT NULL,
    FOREIGN KEY (member_id) REFERENCES Member(member_id) ON DELETE CASCADE,
    FOREIGN KEY (board_id) REFERENCES Board(board_id) ON DELETE CASCADE,
    UNIQUE (member_id, board_id),
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);