--DROP DATABASE IF EXISTS "MyDatabase";
/*Primero ejecutar la creacion de la base de datos */
--CREATE DATABASE biblioteca ENCODING = 'UTF8';


CREATE SEQUENCE public.carrera_id_carrera_seq_1;

CREATE TABLE public.carrera (
                id_carrera SMALLINT NOT NULL DEFAULT nextval('public.carrera_id_carrera_seq_1'),
                nombre VARCHAR(150) NOT NULL,
                CONSTRAINT id_carrera PRIMARY KEY (id_carrera)
);


ALTER SEQUENCE public.carrera_id_carrera_seq_1 OWNED BY public.carrera.id_carrera;

CREATE SEQUENCE public.deuda_id_deuda_seq_1;

CREATE TABLE public.deuda (
                id_deuda SMALLINT NOT NULL DEFAULT nextval('public.deuda_id_deuda_seq_1'),
                descripcion_deuda VARCHAR(255) NOT NULL,
                costo NUMERIC(5,2) NOT NULL,
                CONSTRAINT id_deuda PRIMARY KEY (id_deuda)
);


ALTER SEQUENCE public.deuda_id_deuda_seq_1 OWNED BY public.deuda.id_deuda;

CREATE SEQUENCE public.admi_id_admi_seq;

CREATE TABLE public.admi (
                id_admi SMALLINT NOT NULL DEFAULT nextval('public.admi_id_admi_seq'),
                usuario VARCHAR(150) NOT NULL,
                password VARCHAR(150) NOT NULL,
                CONSTRAINT id_admi PRIMARY KEY (id_admi)
);


ALTER SEQUENCE public.admi_id_admi_seq OWNED BY public.admi.id_admi;

CREATE TABLE public.estudiante (
                matricula VARCHAR(150) NOT NULL,
                nombre VARCHAR(255) NOT NULL,
                apePaterno VARCHAR(255) NOT NULL,
                apeMaterno VARCHAR(255) NOT NULL,
                activo BOOLEAN NOT NULL,
                vigencia BOOLEAN NOT NULL,
                id_carrera SMALLINT NOT NULL,
                CONSTRAINT matricula PRIMARY KEY (matricula)
);


/*Comentarios*/
COMMENT ON COLUMN public.estudiante.activo IS '0 = deudor 1= valido';
COMMENT ON COLUMN public.estudiante.vigencia IS '0 = no vigente 1= vigente';

CREATE TABLE public.libro (
                ISBN VARCHAR(15) NOT NULL,
                titulo VARCHAR(255) NOT NULL,
                autor VARCHAR(100) NOT NULL,
                num_page SMALLINT NOT NULL,
                encuadernacion VARCHAR(150) NOT NULL,
                editorial VARCHAR(150) NOT NULL,
                lengua VARCHAR(150) NOT NULL,
                portada VARCHAR(255) NOT NULL,
                cantidad SMALLINT NOT NULL,
                CONSTRAINT isbn PRIMARY KEY (ISBN)
);


CREATE TABLE public.prestamo (
                matricula VARCHAR(150) NOT NULL,
                ISBN VARCHAR(15) NOT NULL,
                fechaini DATE NOT NULL,
                refrendo SMALLINT NOT NULL,
                fechaFin DATE NOT NULL,
                estado SMALLINT NOT NULL,
                id_deuda SMALLINT,
                tipo BOOLEAN NOT NULL,
                CONSTRAINT id_prestamo PRIMARY KEY (matricula, ISBN, fechaini)
);
COMMENT ON COLUMN public.prestamo.estado IS '0 = sin expirar 1= expiro';

ALTER TABLE public.estudiante ADD CONSTRAINT carrera_estudiante_fk
FOREIGN KEY (id_carrera)
REFERENCES public.carrera (id_carrera)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.prestamo ADD CONSTRAINT deuda_prestamo_fk
FOREIGN KEY (id_deuda)
REFERENCES public.deuda (id_deuda)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.prestamo ADD CONSTRAINT estudiante_prestamo_fk
FOREIGN KEY (matricula)
REFERENCES public.estudiante (matricula)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.prestamo ADD CONSTRAINT libro_prestamo_fk
FOREIGN KEY (ISBN)
REFERENCES public.libro (ISBN)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;
/*
-- solo crear usuario una vez 
CREATE USER bibliotecario WITH PASSWORD 'biblioteca1';
-- asignacion de permisos al usuario 
GRANT select, insert, delete, update ON libro TO bibliotecario;
GRANT select, insert, delete, update ON prestamo TO bibliotecario;
GRANT select, insert, delete, update ON estudiante TO bibliotecario;
GRANT select, insert, delete, update ON deuda TO bibliotecario;
GRANT select, insert, delete, update ON admi TO bibliotecario;
GRANT select, insert, delete, update ON carrera TO bibliotecario;

GRANT all ON deuda_id_deuda_seq_1 TO bibliotecario;
GRANT all ON admi_id_admi_seq TO bibliotecario;
GRANT all ON carrera_id_carrera_seq_1 TO bibliotecario;*/






