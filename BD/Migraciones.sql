    alter table usuarios
    add apellido varchar(255) null;

    alter table usuarios
    add edad int null;

    alter table usuarios
    add celular varchar(255) null;

    alter table usuarios
    add categoria varchar(255) null;

    alter table usuarios
    add date date null;
	
    alter table usuarios
    add time time null;

alter table usuarios
    modify email varchar(50) not null;

create unique index usuarios_email_uindex
    on usuarios (email);

alter table usuarios
    add estado char default 'A' null;


INSERT INTO tesis.usuarios (id, name, password, idrol, token, apellido, celular, categoria, edad, date, time, email, estado) VALUES (1, 'jorgito', 'fcsM0keqlIluZlwzdpanvhjTh6eNbVW0hUt/99WSUEI=', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJwYXNzd29yZCI6ImZjc00wa2VxbElsdVpsd3pkcGFudmhqVGg2ZU5iVlcwaFV0Lzk5V1NVRUk9IiwiaWF0IjoxNjY2ODkyODQ0LCJleHAiOjE2NjY4OTI5MDR9.XIi-FV2MCVW02O0o16ofj7DZeOSdvCnkeM05DdGOf1k', '', '', '', '', '', '', 'a@a.com', 'A');
INSERT INTO tesis.usuarios (id, name, password, idrol, token, apellido, celular, categoria, edad, date, time, email, estado) VALUES (2, 'iakita', 'fcsM0keqlIluZlwzdpanvhjTh6eNbVW0hUt/99WSUEI=', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYi5jb20iLCJwYXNzd29yZCI6ImZjc00wa2VxbElsdVpsd3pkcGFudmhqVGg2ZU5iVlcwaFV0Lzk5V1NVRUk9IiwiaWF0IjoxNjY0NTM5NjI2LCJleHAiOjE2NjQ1Mzk2ODZ9.Crx7mn4WQf6gNidiL4H-HEio0_NVD1xS28UtJzLGyI0', 'otalorita', '3234941412', '', '22', '2022-10-05', '00:00:00', 'a@b.com', 'A');
INSERT INTO tesis.usuarios (id, name, password, idrol, token, apellido, celular, categoria, edad, date, time, email, estado) VALUES (3, 'janiercito', '', 3, '', 'zapatita', '3125986352', 'novato', '23', '2022-10-05', '00:00:00', 'a@c.com', 'A');
INSERT INTO tesis.usuarios (id, name, password, idrol, token, apellido, celular, categoria, edad, date, time, email, estado) VALUES (4, 'mateito', '', 3, '', 'celicito', '3156963548', 'experto', '24', '2022-10-05', '00:00:00', 'a@d.com', 'A');
INSERT INTO tesis.usuarios (id, name, password, idrol, token, apellido, celular, categoria, edad, date, time, email, estado) VALUES (5, 'estebanquito', 'fcsM0keqlIluZlwzdpanvhjTh6eNbVW0hUt/99WSUEI=', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZy5jb20iLCJwYXNzd29yZCI6ImZjc00wa2VxbElsdVpsd3pkcGFudmhqVGg2ZU5iVlcwaFV0Lzk5V1NVRUk9IiwiaWF0IjoxNjY2OTY0NTk3LCJleHAiOjE2NjY5NjQ2NTd9.M3o2SA1SqpjnAHHcLtKjNlen7_HLvK9hWmz4bhxWaqo', 'lopecito', '3162546932', ' ', '25', '2022-10-05', '00:00:00', 'a@e.com', 'A');
INSERT INTO tesis.usuarios (id, name, password, idrol, token, apellido, celular, categoria, edad, date, time, email, estado) VALUES (6, 'miguelito', '', 3, '', '', '', '', '', '', '', 'a@f.com', 'A');
INSERT INTO tesis.usuarios (id, name, password, idrol, token, apellido, celular, categoria, edad, date, time, email, estado) VALUES (11, 'Carlitos', '', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZy5jb20iLCJwYXNzd29yZCI6ImZjc00wa2VxbElsdVpsd3pkcGFudmhqVGg2ZU5iVlcwaFV0Lzk5V1NVRUk9IiwiaWF0IjoxNjY2ODkzMTkxLCJleHAiOjE2NjY4OTMyNTF9.rIcyvHu5ZZZ5tQKay63F4KtgHCrPuBCNS7KsvO4KBUc', 'Coloradito', '3006629947', 'Intermedio', '30', '2022-91-27', '', 'a@g.com', 'A');
INSERT INTO tesis.usuarios (id, name, password, idrol, token, apellido, celular, categoria, edad, date, time, email, estado) VALUES (12, 'Nancycita', '', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZy5jb20iLCJwYXNzd29yZCI6ImZjc00wa2VxbElsdVpsd3pkcGFudmhqVGg2ZU5iVlcwaFV0Lzk5V1NVRUk9IiwiaWF0IjoxNjY2ODkzMTkxLCJleHAiOjE2NjY4OTMyNTF9.rIcyvHu5ZZZ5tQKay63F4KtgHCrPuBCNS7KsvO4KBUc', 'Barrientocita', '3006629947', 'Intermedio', '30', '2022-91-27', 'a@h.com', '', 'A');
INSERT INTO tesis.usuarios (id, name, password, idrol, token, apellido, celular, categoria, edad, date, time, email, estado) VALUES (24, 'Carlitos', '', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZy5jb20iLCJwYXNzd29yZCI6ImZjc00wa2VxbElsdVpsd3pkcGFudmhqVGg2ZU5iVlcwaFV0Lzk5V1NVRUk9IiwiaWF0IjoxNjY2ODkzMTkxLCJleHAiOjE2NjY4OTMyNTF9.rIcyvHu5ZZZ5tQKay63F4KtgHCrPuBCNS7KsvO4KBUc', 'Coloradito', '3006629947', 'Intermedio', '30', '2022-91-27', '', 'a@i.com', 'A');
INSERT INTO tesis.usuarios (id, name, password, idrol, token, apellido, celular, categoria, edad, date, time, email, estado) VALUES (31, 'jorgito', '', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZy5jb20iLCJwYXNzd29yZCI6ImZjc00wa2VxbElsdVpsd3pkcGFudmhqVGg2ZU5iVlcwaFV0Lzk5V1NVRUk9IiwiaWF0IjoxNjY2OTY0NTk3LCJleHAiOjE2NjY5NjQ2NTd9.M3o2SA1SqpjnAHHcLtKjNlen7_HLvK9hWmz4bhxWaqo', 'Vazquecito', '3006629947', 'Intermedio', '20', '1998-12-30', '', 'a@j.com', 'A');


INSERT INTO usuarios (id, name, email, password, idrol, token, apellido, celular, categoria, edad, date, time) VALUES (11, 'Carlitos', 'a@j.com', '', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZy5jb20iLCJwYXNzd29yZCI6ImZjc00wa2VxbElsdVpsd3pkcGFudmhqVGg2ZU5iVlcwaFV0Lzk5V1NVRUk9IiwiaWF0IjoxNjY2ODkzMTkxLCJleHAiOjE2NjY4OTMyNTF9.rIcyvHu5ZZZ5tQKay63F4KtgHCrPuBCNS7KsvO4KBUc', 'Coloradito', '3006629947', 'Intermedio', '30', '2022-91-27', '');


create table entrenador_deportista
(
    identrenador int null,
    iddeportista int null,
    constraint entrenador_deportista_pk
        primary key (identrenador, iddeportista)
);
alter table entrenador_deportista
    add constraint deportista_usuario_id_fk
        foreign key (iddeportista) references usuarios (id);

alter table entrenador_deportista
    add constraint entrenador_usuario_id_fk
        foreign key (identrenador) references usuarios (id);

insert tesis.entrenador_deportista SET  WHERE identrenador = 5 AND iddeportista = 4;
insert tesis.entrenador_deportista SET  WHERE identrenador = 5 AND iddeportista = 6;
insert tesis.entrenador_deportista SET  WHERE identrenador = 5 AND iddeportista = 11;
insert tesis.entrenador_deportista SET  WHERE identrenador = 5 AND iddeportista = 12;
insert tesis.entrenador_deportista SET  WHERE identrenador = 5 AND iddeportista = 24;
insert tesis.entrenador_deportista SET  WHERE identrenador = 5 AND iddeportista = 31;



--2023/01/07
create table time_deportista
(
    id_deportista  int          null,
    fecha_registro timestamp    null,
    banderas       varchar(255) null,
    time           varchar(255) null,
    id             int auto_increment,
    constraint time_deportista_pk
        primary key (id)
);

create index time_deportista_id_deportista_index
    on time_deportista (id_deportista);



--2023/01/11
create table estilos_nado
(
    id          int          null,
    descripcion varchar(255) null,
    metros      int          null
);

alter table estilos_nado
    add constraint estilos_nado_pk
        primary key (id);

INSERT INTO estilos_nado (id, descripcion, metros) VALUES (1, 'Libre', null);
INSERT INTO estilos_nado (id, descripcion, metros) VALUES (2, 'Mariposa', null);
INSERT INTO estilos_nado (id, descripcion, metros) VALUES (3, 'Espalda', null);

alter table time_deportista
    add id_estilos int null;

alter table time_deportista
    add constraint time_deportista_estilos_nado_id_fk
        foreign key (id_estilos) references estilos_nado (id);


--2023/01/11 Jorgito <3
DROP TABLE time_deportista;
create table time_deportista
(
    id             int auto_increment
        primary key,
    id_deportista  int                    not null,
    id_estilos     int                    not null,
    fecha_registro date default curdate() not null,
    hora_registro  time default curtime() not null,
    time           varchar(255)           not null,
    banderas       varchar(255)           not null

);

 
--2023/01/11 smorales 
alter table usuarios
    alter column estado set default 'A';

--2023/01/13
create table task
(
    id                int auto_increment,
    id_usuario        int     not null,
    titulo_tarea      varchar(255)  not null,
    descripcion_tarea varchar(255)    null,
    fecha_registro    date    null,
    constraint task_pk
        primary key (id)
);

create unique index task_id_uindex
    on task (id);

alter table task
    alter column fecha_registro set default current_date;

alter table task
    add constraint task_usuarios_id_fk
        foreign key (id_usuario) references usuarios (id);

--2023/01/13 smorales
    alter table time_deportista
    add constraint time_deportista_usuarios_id_fk
        foreign key (id_deportista) references usuarios (id);

        alter table time_deportista
    add constraint time_deportista_estilos_nado_id_fk
        foreign key (id_estilos) references estilos_nado (id);


        alter table entrenador_deportista
    add constraint entrenador_deportista_usuarios_id_fk
        foreign key (identrenador) references usuarios (id);

alter table entrenador_deportista
    add constraint entrenador_deportista_usuarios_id_fk_2
        foreign key (iddeportista) references usuarios (id);

        alter table usuarios
    add constraint usuarios_rol_idrol_fk
        foreign key (idrol) references rol (idrol);

        drop table deportista;

        drop table swimmer;
        
        drop table rol_usuario;

--2023/01/13 Jorgito <3


alter table usuarios
    drop column time;

alter table usuarios
    drop column date;

alter table usuarios
    add fecha_nacimiento varchar(255) not null;

alter table usuarios
    modify name varchar(255) not null after idrol;

alter table usuarios
    modify celular varchar(255) not null after categoria;

alter table usuarios
    modify email varchar(255) not null after celular;

alter table usuarios
    modify password varchar(255) not null after email;

alter table usuarios
    modify token varchar(255) not null after password;

alter table usuarios
    modify fecha_nacimiento varchar(255) not null after edad;


alter table usuarios
    drop column categoria;

alter table usuarios
    add id_categoria int null after celular;


create table categorias
(
    id                    int auto_increment,
    descripcion_categoria varchar(255) not null,
    constraint categorias_pk
        primary key (id)
);

create unique index categorias_id_uindex
    on categorias (id);

alter table usuarios
    add constraint usuarios_categorias_id_fk
        foreign key (id_categoria) references categorias (id);

alter table usuarios
    alter column estado set default 'A';

alter table usuarios
    modify id_categoria int null;