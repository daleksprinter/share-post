
-- +goose Up
create table emotion(
    id int primary key auto_increment,
    title varchar(255) not null
);


-- +goose Down
drop table if exists emotion;

