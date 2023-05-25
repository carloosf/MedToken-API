-- CreateTable
CREATE TABLE `TokenDB` (
    `token` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `prioridade` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TokenDB_token_key`(`token`),
    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
