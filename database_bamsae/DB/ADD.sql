alter table member add mem_sanc boolean; 
alter table movie add movie_release date; 
INSERT INTO `member`
VALUES('two','two1','Lv.3','������','010-4444-5555','two@naver.com','2000-03-02',2,'����Ư����','�Ѿ���б�',2000,'2020-01-23',1);
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
(3,'A-001','SE203',2,'������ ���������Դϴ�','���ķ� ���� �ް�','2021-12-03',null);

update notice_board
set theater_id = 'BU102'
where post_no = 2;
