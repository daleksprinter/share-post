
-- +goose Up
insert into user(username) values("daleksprinter");


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

