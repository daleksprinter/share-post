
-- +goose Up
insert into room(room_name, created_user, is_private, hashed_password) values ("testroom2", 1, false, "");


-- +goose Down


