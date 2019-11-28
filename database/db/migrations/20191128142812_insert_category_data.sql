
-- +goose Up
insert into category(title, created_user, room_id) values("test_categ_1", 1, 1), ("test_categ_2", 1, 1);



-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

