
-- +goose Up
create table user(
    id int primary key auto_increment,
    username varchar(255) not null,
    hashed_password varchar(255) not null,
    nickname varchar(255) not null
);


-- +goose Down
drop table if exists user;

