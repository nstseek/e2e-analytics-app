DELETE FROM REL_FORNECEDOR_EMPRESA;

DELETE FROM EMPRESA;

DELETE FROM FORNECEDOR;

-- deve falhar por não ter UF
INSERT INTO EMPRESA (`NOME`, `CNPJ`) VALUES ('Sony Brasil', '12345678999900');

-- deve falhar por não ter CNPJ
INSERT INTO EMPRESA (`NOME`, `UF_ID`) VALUES ('Sony Brasil', 1);

-- deve falhar por não ter nome
INSERT INTO EMPRESA (`CNPJ`, `UF_ID`) VALUES ('12345678999900', 1);

-- deve falhar por conter letra no CNPJ
INSERT INTO EMPRESA (`NOME`, `CNPJ`, `UF_ID`) VALUES ('Sony Brasil', '1234567899990D', 1);

-- deve falhar por faltar dígito no CNPJ
INSERT INTO EMPRESA (`NOME`, `CNPJ`, `UF_ID`) VALUES ('Sony Brasil', '1234567899990', 1);

-- deve inserir normalmente
INSERT INTO EMPRESA (`NOME`, `CNPJ`, `UF_ID`) VALUES ('Sony Brasil', '12345678999900', 1);