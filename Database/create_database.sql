-- MySQL Script generated by MySQL Workbench
-- Wed Sep 23 02:52:41 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema u514786799_e2eapp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema u514786799_e2eapp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `u514786799_e2eapp` DEFAULT CHARACTER SET utf8 ;
USE `u514786799_e2eapp` ;

-- -----------------------------------------------------
-- Table `u514786799_e2eapp`.`UF`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `u514786799_e2eapp`.`UF` ;

CREATE TABLE IF NOT EXISTS `u514786799_e2eapp`.`UF` (
  `ID` INT NOT NULL AUTO_INCREMENT COMMENT 'Armazena o ID do estado',
  `NOME` VARCHAR(250) NOT NULL COMMENT 'Armazena o nome do estado',
  `SIGLA` VARCHAR(2) NOT NULL COMMENT 'Armazena a sigla do estado',
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
COMMENT = 'Armazena os estados disponíveis';


-- -----------------------------------------------------
-- Table `u514786799_e2eapp`.`EMPRESA`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `u514786799_e2eapp`.`EMPRESA` ;

CREATE TABLE IF NOT EXISTS `u514786799_e2eapp`.`EMPRESA` (
  `ID` INT NOT NULL AUTO_INCREMENT COMMENT 'Armazena o ID da empresa',
  `NOME` VARCHAR(250) NOT NULL COMMENT 'Armazena o nome da empresa',
  `CNPJ` VARCHAR(14) NOT NULL COMMENT 'Armazena o CNPJ da empresa',
  `UF_ID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `CNPJ_UNIQUE` (`CNPJ` ASC),
  INDEX `fk_EMPRESA_UF1_idx` (`UF_ID` ASC),
  CONSTRAINT `fk_EMPRESA_UF1`
    FOREIGN KEY (`UF_ID`)
    REFERENCES `u514786799_e2eapp`.`UF` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
COMMENT = 'Armazena as empresas';


-- -----------------------------------------------------
-- Table `u514786799_e2eapp`.`FORNECEDOR`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `u514786799_e2eapp`.`FORNECEDOR` ;

CREATE TABLE IF NOT EXISTS `u514786799_e2eapp`.`FORNECEDOR` (
  `ID` INT NOT NULL AUTO_INCREMENT COMMENT 'Armazena o ID do fornecedor',
  `NOME` VARCHAR(250) NOT NULL COMMENT 'Armazena o nome do fornecedor',
  `EMAIL` VARCHAR(250) NOT NULL COMMENT 'Armazena o email de contato do fornecedor',
  `RG` VARCHAR(10) NULL COMMENT 'Armazena o RG quando o fornecedor é uma pessoa física',
  `DATA_NASC` DATE NULL COMMENT 'Armazena a data de nascimento quando o fornecedor é uma pessoa física',
  `CPF` VARCHAR(11) NULL COMMENT 'Armazena o CPF do fornecedor quando o mesmo é uma pessoa física',
  `CNPJ` VARCHAR(14) NULL COMMENT 'Armazena o CNPJ do fornecedor quando o mesmo é uma pessoa jurídica',
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `RG_UNIQUE` (`RG` ASC),
  UNIQUE INDEX `CPF_UNIQUE` (`CPF` ASC),
  UNIQUE INDEX `CNPJ_UNIQUE` (`CNPJ` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 1
COMMENT = 'Armazena os fornecedores';


-- -----------------------------------------------------
-- Table `u514786799_e2eapp`.`REL_FORNECEDOR_EMPRESA`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `u514786799_e2eapp`.`REL_FORNECEDOR_EMPRESA` ;

CREATE TABLE IF NOT EXISTS `u514786799_e2eapp`.`REL_FORNECEDOR_EMPRESA` (
  `FORNECEDOR_ID` INT NOT NULL,
  `EMPRESA_ID` INT NOT NULL,
  PRIMARY KEY (`FORNECEDOR_ID`, `EMPRESA_ID`),
  INDEX `fk_FORNECEDOR_has_EMPRESA_EMPRESA1_idx` (`EMPRESA_ID` ASC),
  INDEX `fk_FORNECEDOR_has_EMPRESA_FORNECEDOR_idx` (`FORNECEDOR_ID` ASC),
  CONSTRAINT `fk_FORNECEDOR_has_EMPRESA_FORNECEDOR`
    FOREIGN KEY (`FORNECEDOR_ID`)
    REFERENCES `u514786799_e2eapp`.`FORNECEDOR` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_FORNECEDOR_has_EMPRESA_EMPRESA1`
    FOREIGN KEY (`EMPRESA_ID`)
    REFERENCES `u514786799_e2eapp`.`EMPRESA` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Armazena as relações entre o fornecedor e a empresa';

USE `u514786799_e2eapp`;

DELIMITER $$

USE `u514786799_e2eapp`$$
DROP TRIGGER IF EXISTS `u514786799_e2eapp`.`EMPRESA_BEFORE_INSERT_CHECK_CNPJ` $$
USE `u514786799_e2eapp`$$
CREATE DEFINER = CURRENT_USER TRIGGER `u514786799_e2eapp`.`EMPRESA_BEFORE_INSERT_CHECK_CNPJ` BEFORE INSERT ON `EMPRESA` FOR EACH ROW
BEGIN
	IF NEW.CNPJ IS NOT NULL AND REGEXP_REPLACE(NEW.CNPJ, '\D', '') != NEW.CNPJ THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O CNPJ da empresa deve conter apenas dígitos!';
	ELSEIF NEW.CNPJ IS NOT NULL AND LENGTH(NEW.CNPJ) < 14 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O CNPJ da empresa precisa ter 14 dígitos!';
	END IF;
END$$


USE `u514786799_e2eapp`$$
DROP TRIGGER IF EXISTS `u514786799_e2eapp`.`EMPRESA_BEFORE_UPDATE_CHECK_CNPJ` $$
USE `u514786799_e2eapp`$$
CREATE DEFINER = CURRENT_USER TRIGGER `u514786799_e2eapp`.`EMPRESA_BEFORE_UPDATE_CHECK_CNPJ` BEFORE UPDATE ON `EMPRESA` FOR EACH ROW
BEGIN
	IF NEW.CNPJ IS NOT NULL AND REGEXP_REPLACE(NEW.CNPJ, '\D', '') != NEW.CNPJ THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O CNPJ da empresa deve conter apenas dígitos!';
	ELSEIF NEW.CNPJ IS NOT NULL AND LENGTH(NEW.CNPJ) < 14 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O CNPJ da empresa precisa ter 14 dígitos!';
	END IF;
END$$


USE `u514786799_e2eapp`$$
DROP TRIGGER IF EXISTS `u514786799_e2eapp`.`FORNECEDOR_BEFORE_INSERT_CHECK_CADASTRO` $$
USE `u514786799_e2eapp`$$
CREATE DEFINER = CURRENT_USER TRIGGER `u514786799_e2eapp`.`FORNECEDOR_BEFORE_INSERT_CHECK_CADASTRO` BEFORE INSERT ON `FORNECEDOR` FOR EACH ROW
BEGIN
	IF NEW.CPF IS NULL AND NEW.CNPJ IS NULL THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O fornecedor precisa ter um CPF ou um CNPJ!';
    ELSEIF NEW .CPF IS NOT NULL AND NEW.CNPJ IS NOT NULL THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O fornecedor não pode ter um CPF e um CNPJ!';
	ELSEIF REGEXP_REPLACE(NEW.CPF, '\D', '') != NEW.CPF THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O CPF do fornecedor deve conter apenas dígitos!';
    ELSEIF NEW.CPF IS NOT NULL AND LENGTH(NEW.CPF) < 11 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O CPF do fornecedor precisa ter 11 dígitos!';
	ELSEIF NEW.CPF IS NOT NULL AND NEW.RG IS NOT NULL AND REGEXP_REPLACE(NEW.RG, '\D', '') != NEW.RG THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O RG do fornecedor deve conter apenas dígitos!';
    ELSEIF NEW.CPF IS NOT NULL AND NEW.RG IS NOT NULL AND LENGTH(NEW.RG) < 10 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O RG do fornecedor precisa ter 10 dígitos!';        
	ELSEIF NEW.CNPJ IS NOT NULL AND REGEXP_REPLACE(NEW.CNPJ, '\D', '') != NEW.CNPJ THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O CNPJ do fornecedor deve conter apenas dígitos!';
	ELSEIF NEW.CNPJ IS NOT NULL AND LENGTH(NEW.CNPJ) < 14 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O CNPJ do fornecedor precisa ter 14 dígitos!';
    END IF;
END$$


USE `u514786799_e2eapp`$$
DROP TRIGGER IF EXISTS `u514786799_e2eapp`.`FORNECEDOR_BEFORE_INSERT_CHECK_CPF` $$
USE `u514786799_e2eapp`$$
CREATE DEFINER = CURRENT_USER TRIGGER `u514786799_e2eapp`.`FORNECEDOR_BEFORE_INSERT_CHECK_CPF` BEFORE INSERT ON `FORNECEDOR` FOR EACH ROW
BEGIN
	IF NEW.CPF IS NOT NULL AND (NEW.RG IS NULL OR NEW.DATA_NASC IS NULL) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Um fornecedor pessoa física precisa informar seu RG e sua data de nascimento!';
	END IF;
END$$


USE `u514786799_e2eapp`$$
DROP TRIGGER IF EXISTS `u514786799_e2eapp`.`FORNECEDOR_BEFORE_UPDATE_CHECK_CADASTRO` $$
USE `u514786799_e2eapp`$$
CREATE DEFINER = CURRENT_USER TRIGGER `u514786799_e2eapp`.`FORNECEDOR_BEFORE_UPDATE_CHECK_CADASTRO` BEFORE UPDATE ON `FORNECEDOR` FOR EACH ROW
BEGIN
	IF NEW.CPF IS NULL AND NEW.CNPJ IS NULL THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O fornecedor precisa ter um CPF ou um CNPJ!';
    ELSEIF NEW .CPF IS NOT NULL AND NEW.CNPJ IS NOT NULL THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O fornecedor não pode ter um CPF e um CNPJ!';
	ELSEIF REGEXP_REPLACE(NEW.CPF, '\D', '') != NEW.CPF THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O CPF do fornecedor deve conter apenas dígitos!';
    ELSEIF NEW.CPF IS NOT NULL AND LENGTH(NEW.CPF) < 11 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O CPF do fornecedor precisa ter 11 dígitos!';
	ELSEIF NEW.CPF IS NOT NULL AND NEW.RG IS NOT NULL AND REGEXP_REPLACE(NEW.RG, '\D', '') != NEW.RG THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O RG do fornecedor deve conter apenas dígitos!';
    ELSEIF NEW.CPF IS NOT NULL AND NEW.RG IS NOT NULL AND LENGTH(NEW.RG) < 10 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O RG do fornecedor precisa ter 10 dígitos!';        
	ELSEIF NEW.CNPJ IS NOT NULL AND REGEXP_REPLACE(NEW.CNPJ, '\D', '') != NEW.CNPJ THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O CNPJ do fornecedor deve conter apenas dígitos!';
	ELSEIF NEW.CNPJ IS NOT NULL AND LENGTH(NEW.CNPJ) < 14 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O CNPJ do fornecedor precisa ter 14 dígitos!';
    END IF;
END$$


USE `u514786799_e2eapp`$$
DROP TRIGGER IF EXISTS `u514786799_e2eapp`.`FORNECEDOR_BEFORE_UPDATE_CHECK_CPF` $$
USE `u514786799_e2eapp`$$
CREATE DEFINER = CURRENT_USER TRIGGER `u514786799_e2eapp`.`FORNECEDOR_BEFORE_UPDATE_CHECK_CPF` BEFORE UPDATE ON `FORNECEDOR` FOR EACH ROW
BEGIN
	IF NEW.CPF IS NOT NULL AND (NEW.RG IS NULL OR NEW.DATA_NASC IS NULL) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Um fornecedor pessoa física precisa informar seu RG e sua data de nascimento!';
	END IF;
END$$


USE `u514786799_e2eapp`$$
DROP TRIGGER IF EXISTS `u514786799_e2eapp`.`REL_FORNECEDOR_EMPRESA_BEFORE_INSERT_CHECK_IDADE` $$
USE `u514786799_e2eapp`$$
CREATE DEFINER = CURRENT_USER TRIGGER `u514786799_e2eapp`.`REL_FORNECEDOR_EMPRESA_BEFORE_INSERT_CHECK_IDADE` BEFORE INSERT ON `REL_FORNECEDOR_EMPRESA` FOR EACH ROW
BEGIN
	DECLARE ID_PARANA INT;
    DECLARE ID_UF INT;
    DECLARE CPF_FORNEC VARCHAR(11);
    DECLARE DATA_NASCIMENTO DATE;
	DECLARE IDADE INT;
    SELECT ID INTO ID_PARANA FROM UF WHERE UF.SIGLA = "PR";
    SELECT UF_ID INTO ID_UF FROM EMPRESA WHERE EMPRESA.ID = NEW.EMPRESA_ID;
    SELECT CPF INTO CPF_FORNEC FROM FORNECEDOR WHERE FORNECEDOR.ID = NEW.FORNECEDOR_ID;
    IF ID_PARANA = ID_UF AND CPF_FORNEC IS NOT NULL THEN
		SELECT DATA_NASC INTO DATA_NASCIMENTO FROM FORNECEDOR WHERE FORNECEDOR.ID = NEW.FORNECEDOR_ID;
		SELECT TIMESTAMPDIFF(YEAR, DATA_NASCIMENTO, CURDATE()) INTO IDADE;
        IF IDADE < 18 THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Fornecedores que são pessoas físicas menores de 18 anos não podem ser associados a empresas que residam no Paraná';
        END IF;
    END IF;    
END$$


USE `u514786799_e2eapp`$$
DROP TRIGGER IF EXISTS `u514786799_e2eapp`.`REL_FORNECEDOR_EMPRESA_BEFORE_UPDATE_CHECK_IDADE` $$
USE `u514786799_e2eapp`$$
CREATE DEFINER = CURRENT_USER TRIGGER `u514786799_e2eapp`.`REL_FORNECEDOR_EMPRESA_BEFORE_UPDATE_CHECK_IDADE` BEFORE UPDATE ON `REL_FORNECEDOR_EMPRESA` FOR EACH ROW
BEGIN
DECLARE ID_PARANA INT;
    DECLARE ID_UF INT;
    DECLARE CPF_FORNEC VARCHAR(11);
    DECLARE DATA_NASCIMENTO DATE;
	DECLARE IDADE INT;
    SELECT ID INTO ID_PARANA FROM UF WHERE UF.SIGLA = "PR";
    SELECT UF_ID INTO ID_UF FROM EMPRESA WHERE EMPRESA.ID = NEW.EMPRESA_ID;
    SELECT CPF INTO CPF_FORNEC FROM FORNECEDOR WHERE FORNECEDOR.ID = NEW.FORNECEDOR_ID;
    IF ID_PARANA = ID_UF AND CPF_FORNEC IS NOT NULL THEN
		SELECT DATA_NASC INTO DATA_NASCIMENTO FROM FORNECEDOR WHERE FORNECEDOR.ID = NEW.FORNECEDOR_ID;
		SELECT TIMESTAMPDIFF(YEAR, DATA_NASCIMENTO, CURDATE()) INTO IDADE;
        IF IDADE < 18 THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Fornecedores que são pessoas físicas menores de 18 anos não podem ser associados a empresas que residam no Paraná';
        END IF;
    END IF;
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `u514786799_e2eapp`.`UF`
-- -----------------------------------------------------
START TRANSACTION;
USE `u514786799_e2eapp`;
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('São Paulo', 'SP');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Paraná', 'PR');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Santa Catarina', 'SC');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Rio Grande do Sul', 'RS');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Mato Grosso do Sul', 'MS');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Rondônia', 'RO');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Acre', 'AC');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Amazonas', 'AM');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Roraima', 'RR');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Pará', 'PA');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Amapá', 'AP');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Tocantins', 'TO');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Maranhão', 'MA');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Rio Grande do Norte', 'RN');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Paraíba', 'PB');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Pernambuco', 'PE');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Alagoas', 'AL');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Sergipe', 'SE');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Bahia', 'BA');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Minas Gerais', 'MG');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Rio de Janeiro', 'RJ');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Mato Grosso', 'MT');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Goiás', 'GO');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Distrito Federal', 'DF');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Piauí', 'PI');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Ceará', 'CE');
INSERT INTO `u514786799_e2eapp`.`UF` (`NOME`, `SIGLA`) VALUES ('Espírito Santo', 'ES');

COMMIT;
