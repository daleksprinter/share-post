
-- +goose Up
create table emotion(
    id int primary key not null,
    title varchar(255) not null
);


-- +goose Down
drop table if exists emotion;

