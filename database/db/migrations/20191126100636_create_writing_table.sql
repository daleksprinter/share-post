
-- +goose Up
create table writing(
    id int primary key auto_increment,
    content text not null,
    created_user int not null,
    room_id int not null,
    foreign key (created_user) references user(id),
    foreign key (room_id) references room(id)
);


-- +goose Down
drop table if exists writing;

