create table packages (
    id bigint not null auto_increment,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    punctuation int,
    duration int,
    active boolean NOT NULL DEFAULT true,
    primary key (id)
);
