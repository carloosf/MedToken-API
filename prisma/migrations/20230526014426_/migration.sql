-- CreateTable
CREATE TABLE `tokendb` (
    `token` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `prioridade` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tokendb_token_key`(`token`),
    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
