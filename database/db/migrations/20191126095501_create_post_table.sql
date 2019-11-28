
-- +goose Up
create table post(
    id int primary key auto_increment,
    content text not null,
    color_code varchar(255) not null,
    room_id int not null,
    category_id int not null,
    created_user int not null,
    foreign key (room_id) references room(id),
    foreign key (category_id) references category(id),
    foreign key (created_user) references user(id)
);


-- +goose Down
drop table if exists post;
