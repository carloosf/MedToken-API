-- CreateTable
CREATE TABLE `tokendb` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `prioridade` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,

    UNIQUE INDEX `tokendb_id_key`(`id`),
    UNIQUE INDEX `tokendb_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
