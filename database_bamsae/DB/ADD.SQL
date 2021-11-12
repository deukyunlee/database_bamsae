ALTER TABLE `movie` ADD `movie_release` DATE;

UPDATE `movie`
SET
`movie_release` = CURDATE()
WHERE `movie_id` = 1;

UPDATE `movie`
SET
`movie_release` = CURDATE()+100
WHERE `movie_id` = 2;