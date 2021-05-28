-- Table: public.category

-- DROP TABLE public.category;

CREATE TABLE public.category
(
    id integer NOT NULL DEFAULT nextval('category_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT category_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.category
    OWNER to postgres;

-- Table: public.speciality

-- DROP TABLE public.speciality;

CREATE TABLE public.speciality
(
    id integer NOT NULL DEFAULT nextval('speciality_id_seq'::regclass),
    id_category integer NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT speciality_pkey PRIMARY KEY (id),
    CONSTRAINT speciality_id_category_foreign FOREIGN KEY (id_category)
        REFERENCES public.category (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.speciality
    OWNER to postgres;

-- Table: public.provider_category_speciality

-- DROP TABLE public.provider_category_speciality;

CREATE TABLE public.provider_category_speciality
(
    id integer NOT NULL DEFAULT nextval('provider_category_speciality_id_seq'::regclass),
    id_provider integer NOT NULL,
    id_category integer NOT NULL,
    id_speciality integer NOT NULL,
    CONSTRAINT provider_category_speciality_pkey PRIMARY KEY (id),
    CONSTRAINT provider_category_speciality_id_category_foreign FOREIGN KEY (id_category)
        REFERENCES public.category (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT provider_category_speciality_id_provider_foreign FOREIGN KEY (id_provider)
        REFERENCES public.provider (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT provider_category_speciality_id_speciality_foreign FOREIGN KEY (id_speciality)
        REFERENCES public.speciality (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.provider_category_speciality
    OWNER to postgres;

-- Table: public.provider

-- DROP TABLE public.provider;

CREATE TABLE public.provider
(
    id integer NOT NULL DEFAULT nextval('provider_id_seq'::regclass),
    name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    address character varying(60) COLLATE pg_catalog."default" NOT NULL,
    "number" character varying(10) COLLATE pg_catalog."default" NOT NULL,
    complement character varying(20) COLLATE pg_catalog."default",
    district character varying(30) COLLATE pg_catalog."default" NOT NULL,
    city character varying(60) COLLATE pg_catalog."default" NOT NULL,
    state character varying(2) COLLATE pg_catalog."default" NOT NULL,
    zip_code character varying(8) COLLATE pg_catalog."default" NOT NULL,
    whatsapp character varying(15) COLLATE pg_catalog."default" NOT NULL,
    obs character varying(255) COLLATE pg_catalog."default",
    photo character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(30) COLLATE pg_catalog."default",
    latitude character varying COLLATE pg_catalog."default",
    longitude character varying COLLATE pg_catalog."default",
    prefix_whatsapp character varying COLLATE pg_catalog."default" DEFAULT '+55'::character varying,
    CONSTRAINT provider_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.provider
    OWNER to postgres;

-- Table: public.provider_user

-- DROP TABLE public.provider_user;

CREATE TABLE public.provider_user
(
    id integer NOT NULL DEFAULT nextval('provider_user_id_seq'::regclass),
    id_provider integer NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT provider_user_pkey PRIMARY KEY (id),
    CONSTRAINT provider_user_id_provider_foreign FOREIGN KEY (id_provider)
        REFERENCES public.provider (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.provider_user
    OWNER to postgres;

-- Table: public.provider_category_speciality

-- DROP TABLE public.provider_category_speciality;

CREATE TABLE public.provider_category_speciality
(
    id integer NOT NULL DEFAULT nextval('provider_category_speciality_id_seq'::regclass),
    id_provider integer NOT NULL,
    id_category integer NOT NULL,
    id_speciality integer NOT NULL,
    CONSTRAINT provider_category_speciality_pkey PRIMARY KEY (id),
    CONSTRAINT provider_category_speciality_id_category_foreign FOREIGN KEY (id_category)
        REFERENCES public.category (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT provider_category_speciality_id_provider_foreign FOREIGN KEY (id_provider)
        REFERENCES public.provider (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT provider_category_speciality_id_speciality_foreign FOREIGN KEY (id_speciality)
        REFERENCES public.speciality (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.provider_category_speciality
    OWNER to postgres;
    
create table customer(
	id serial primary key not null,
	first_name character varying(30),
	last_name character varying(30),
   	whatsapp character varying(15) NOT null,
   	prefix_whatsapp character varying DEFAULT '+55'::character varying,
   	photo character varying(255) COLLATE pg_catalog."default" NOT NULL
)

create table customer_user(
	id serial primary key not null,
	id_customer integer not null,
	email character varying(100) not null,
	password character varying(30) not null,
	constraint fk_customer foreign key (id_customer)
		references customer (id)
)


ALTER TABLE customer_user add constraint un_email unique (email)

