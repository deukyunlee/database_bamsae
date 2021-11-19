ALTER TABLE `sales` 
DROP PRIMARY KEY,
ADD PRIMARY KEY (`theater_id`, `sales_date`);


ALTER TABLE `diligence` 
ADD COLUMN `dil_id` INT NOT NULL FIRST,
ADD PRIMARY KEY (`dil_id`);


ALTER TABLE `diligence` 
CHANGE COLUMN `dil_id` `dil_id` INT NOT NULL AUTO_INCREMENT ;