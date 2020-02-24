-- +goose Up
insert into user(email, nickname) values("sprinter@gmail.com", "らぴお");


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

