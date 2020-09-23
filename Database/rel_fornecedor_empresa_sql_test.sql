-- os casos de teste abaixo se aplicam apenas

DELETE FROM REL_FORNECEDOR_EMPRESA;

DELETE FROM EMPRESA;

DELETE FROM FORNECEDOR;

INSERT INTO EMPRESA (`ID`, `NOME`, `CNPJ`, `UF_ID`) VALUES (1, 'Sony Brasil', '12455784124501', 1);

INSERT INTO EMPRESA (`ID`, `NOME`, `CNPJ`, `UF_ID`) VALUES (2, 'LG Eletronicos do Brasil', '12455784224501', 2);

INSERT INTO FORNECEDOR (`ID`, `NOME`, `EMAIL`, `RG`, `DATA_NASC`, `CPF`) VALUES (8, 'João', 'joao@gmail.com', '4154874571', '2005-05-07', '12445178455');

INSERT INTO FORNECEDOR (`ID`, `NOME`, `EMAIL`, `RG`, `DATA_NASC`, `CPF`) VALUES (9, 'João', 'joao@gmail.com', '4154877571', '1995-05-07', '12445178453');

-- deve falhar pois a empresa cujo id é 2 se situa no estado do Paraná e o fornecedor cujo id é 8 tem menos de 18 anos
INSERT INTO REL_FORNECEDOR_EMPRESA (`FORNECEDOR_ID`, `EMPRESA_ID`) VALUES (8, 2);

-- deve inserir normalmente pois a empresa de id 1 não fica no Paraná
INSERT INTO REL_FORNECEDOR_EMPRESA (`FORNECEDOR_ID`, `EMPRESA_ID`) VALUES (8, 1);

-- deve inserir normalmente
INSERT INTO REL_FORNECEDOR_EMPRESA (`FORNECEDOR_ID`, `EMPRESA_ID`) VALUES (9, 2);

-- deve inserir normalmente
INSERT INTO REL_FORNECEDOR_EMPRESA (`FORNECEDOR_ID`, `EMPRESA_ID`) VALUES (9, 1);