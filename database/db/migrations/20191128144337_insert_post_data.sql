
-- +goose Up
insert into post(content, color_code, room_id, category_id, created_user) 
values 
("hogehogetest", "FFFFFF", 1, 1, 1),
("hogehogetest2", "FFFFFF", 1, 1, 1),
("hogehogetest3", "FFFFFF", 1, 1, 1),
("hogehogetest4", "FFFFFF", 1, 2, 1),
("hogehogetest5", "FFFFFF", 1, 2, 1),
("hogehogetest6", "FFFFFF", 1, 2, 1);


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

