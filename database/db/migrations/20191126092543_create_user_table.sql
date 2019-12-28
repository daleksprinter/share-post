
-- +goose Up
create table user(
    id int primary key auto_increment,
    email varchar(255) not null,
    nickname varchar(255)
);


-- +goose Down
drop table if exists user;

