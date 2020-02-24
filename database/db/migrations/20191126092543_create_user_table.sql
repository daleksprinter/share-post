
-- +goose Up
create table user(
    id int primary key auto_increment,
    email varchar(255) unique not null,
    icon varchar(255),
    nickname varchar(255)
);


-- +goose Down
drop table if exists user;

