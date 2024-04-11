create database Atividade01;
use Atividade01;
create table AGENTE(CODIGO_AGENTE int not null, NOME_AGENTE varchar(100), CPF int(11) not null, TIPO_AGENTE varchar(60), EMAIL_AGENTE varchar(60));
create table DIRIGENTES(CODIGO_DIRIGENTES int not null, CNPJ int(14), RAZAO_SOCIAL varchar(100), CARGO varchar(60), JUNTA_COMERCIAL int(11) not null, DATA_DE_ABERTURA DATE);
create table ENDERECOS (CODIGO_ENDERECO int not null, ENDERECO varchar(100), CEP varchar(20), BAIRRO varchar(45), NUMERO integer, COMPLEMENTO varchar(60));
create table CARGO (CODIGO_CARGO int not null, NOME_CARGO varchar(60));
