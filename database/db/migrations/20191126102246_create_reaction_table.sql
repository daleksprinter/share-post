
-- +goose Up
create table reaction(
    id int primary key auto_increment,
    created_user int not null,
    post_id int not null,
    foreign key (created_user) references user(id),
    foreign key (post_id) references post(id)

);


-- +goose Down
drop table if exists reaction;

