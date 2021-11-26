alter table member add mem_sanc boolean; 
alter table movie add movie_release date; 
alter table qna add contact_way integer; 
INSERT INTO `member`
VALUES('two','two1','Lv.3','박투썸','010-4444-5555','two@naver.com','2000-03-02',2,'서울특별시','한양대학교',2000,'2020-01-23',1);
update notice_board set post_type = 1 where post_no = 1;
update notice_board set post_type = 2 where post_no = 2;
INSERT INTO `notice_board`
(`post_no`,
`emp_id`,
`theater_id`,
`post_type`,
`post_title`,
`post_content`,
`posted_date`,
`modified_date`)
VALUES
(3,'A-001','SE203',2,'서울점 공지사항입니다','한파로 인한 휴관','2021-12-03',null);

update notice_board
set theater_id = 'BU102'
where post_no = 2;

ALTER TABLE `review` 
CHANGE COLUMN `review_id` `review_id` INT NOT NULL AUTO_INCREMENT ;

update qna
set qna_category = 1
where qna_id = 1;

update qna
set qna_category = 2
where qna_id = 2;

ALTER TABLE `point` 
CHANGE COLUMN `point_id` `point_id` INT NOT NULL AUTO_INCREMENT ;

ALTER TABLE `qna` 
CHANGE COLUMN `qna_id` `qna_id` INT NOT NULL AUTO_INCREMENT ;

update qna
set contact_way = 1
where qna_id = 1;

update qna
set contact_way = 2
where qna_id = 2;