DELETE FROM REL_FORNECEDOR_EMPRESA;

DELETE FROM EMPRESA;

DELETE FROM FORNECEDOR;

-- deve falhar por conter letra no CNPJ
INSERT INTO FORNECEDOR (`NOME`, `EMAIL`, `CNPJ`) VALUES ('John Doe', 'john@gmail.com', '1234567820D023');

-- deve falhar por faltar dígito no CNPJ
INSERT INTO FORNECEDOR (`NOME`, `EMAIL`, `CNPJ`) VALUES ('John Doe', 'john@gmail.com', '1234567820022');

-- deve falhar por não possuir CPF nem CNPJ
INSERT INTO FORNECEDOR (`NOME`, `EMAIL`) VALUES ('John Doe', 'john@gmail.com');

-- deve falhar por possuir CPF e CNPJ
INSERT INTO FORNECEDOR (`NOME`, `EMAIL`, `CPF`, `RG`, `DATA_NASC`, `CNPJ`) VALUES ('John Doe', 'john@gmail.com', '12345678200', '1234567840', '1997-11-10', '12457845447500');

-- deve falhar por não possuir email
INSERT INTO FORNECEDOR (`NOME`, `CNPJ`) VALUES ('John Doe', '12345678202024');

-- deve falhar por não possuir nome
INSERT INTO FORNECEDOR (`EMAIL`, `CNPJ`) VALUES ('john@gmail.com', '12345678202024');

-- deve inserir normalmente
INSERT INTO FORNECEDOR (`NOME`, `EMAIL`, `CNPJ`) VALUES ('John Doe', 'john@gmail.com', '12345678202024');

-- deve falhar por faltar rg e data nasc
INSERT INTO FORNECEDOR (`NOME`, `EMAIL`, `CPF`) VALUES ('John Doe', 'john@gmail.com', '12345678900');

-- deve falhar por faltar rg
INSERT INTO FORNECEDOR (`NOME`, `EMAIL`, `CPF`, `DATA_NASC`) VALUES ('John Doe', 'john@gmail.com', '12345678900', '1997-11-10');

-- deve falhar por faltar data nasc
INSERT INTO FORNECEDOR (`NOME`, `EMAIL`, `CPF`, `RG`) VALUES ('John Doe', 'john@gmail.com', '12345678900', '1234567890');

-- deve falhar por faltar dígito do RG
INSERT INTO FORNECEDOR (`NOME`, `EMAIL`, `CPF`, `RG`, `DATA_NASC`) VALUES ('John Doe', 'john@gmail.com', '12345678900', '123456789', '1997-11-10');

-- deve falhar por ter letra no RG
INSERT INTO FORNECEDOR (`NOME`, `EMAIL`, `CPF`, `RG`, `DATA_NASC`) VALUES ('John Doe', 'john@gmail.com', '12345678900', '123456789D', '1997-11-10');

-- deve falhar por faltar dígito no CPF
INSERT INTO FORNECEDOR (`NOME`, `EMAIL`, `CPF`, `RG`, `DATA_NASC`) VALUES ('John Doe', 'john@gmail.com', '1234567890', '1234567890', '1997-11-10');

-- deve falhar por conter letra no CPF
INSERT INTO FORNECEDOR (`NOME`, `EMAIL`, `CPF`, `RG`, `DATA_NASC`) VALUES ('John Doe', 'john@gmail.com', '1234567890d', '1234567890', '1997-11-10');

-- deve inserir normalmente
INSERT INTO FORNECEDOR (`NOME`, `EMAIL`, `CPF`, `RG`, `DATA_NASC`) VALUES ('John Doe', 'john@gmail.com', '12345678200', '1234567840', '1997-11-10');
