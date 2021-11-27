ALTER TABLE diligence ADD dil_id INT PRIMARY_KEY AUTO_INCREMENT FIRST;
ALTER TABLE order_history MODIFY COLUMN payment_id INT auto_increment;

CREATE TABLE reservation (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_count INT,
    reservation_price INT,
    pay_method VARCHAR(20),
    sched_id INT,
    seat_no VARCHAR(3) NOT NULL,
    audience_type VARCHAR(30),
    auditorium_id INT,
    FOREIGN KEY(sched_id) REFERENCES schedule(sched_id),
    FOREIGN KEY(auditorium_id) REFERENCES auditorium(audit_id));
/* seats 테이블도 참조해야하지만 참조가 불가능함*/

ALTER TABLE reservation ADD mem_id VARCHAR(10);
ALTER TABLE reservation ADD FOREIGN KEY (mem_id) REFERENCES member(mem_id);

alter table reservation add theater_id VHARCHAR(20);
alter table reservation add foreign key (theater_id) references theater(theater_id);