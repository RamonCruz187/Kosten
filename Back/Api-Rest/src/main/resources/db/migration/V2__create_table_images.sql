create table images (
    id bigint not null auto_increment,
    url varchar(255) NOT NULL,
    public_id varchar(255) NOT NULL,
    package_id bigint,
    primary key (id),
    foreign key (package_id) references packages(id)
);