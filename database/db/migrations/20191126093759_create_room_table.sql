
-- +goose Up
create table room(
    id int primary key auto_increment,
    created_user int not null,
    is_private boolean not null,
    hashed_password varchar(255),
    foreign key (created_user) references user(id)
);


-- +goose Down
drop table if exists room;

