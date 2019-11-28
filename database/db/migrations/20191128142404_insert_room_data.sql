
-- +goose Up
insert into room(created_user, is_private) values (1, false);


-- +goose Down


