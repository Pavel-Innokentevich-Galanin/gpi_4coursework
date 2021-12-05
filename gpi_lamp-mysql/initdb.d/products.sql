CREATE TABLE `database`.`products` (
    `ID` INT NOT NULL AUTO_INCREMENT ,
    `Model` VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
    `Name` VARCHAR(220) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
    `Img` VARCHAR(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
    `CostBYN` DECIMAL(6,2) NOT NULL,
    `OnBox` INT NOT NULL ,
    `KG` DECIMAL(6,3) NOT NULL,
    `M3` DECIMAL(7,4) NOT NULL,
    `Company` VARCHAR(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
    `Category` VARCHAR(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
    UNIQUE (`ID`)
) ENGINE = MyISAM;