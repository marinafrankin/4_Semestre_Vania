-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `perfil` ENUM('MORADOR', 'GESTOR') NOT NULL DEFAULT 'MORADOR',
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lixeiras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid_sensor` VARCHAR(191) NOT NULL,
    `tipo` ENUM('Plastico', 'Vidro', 'Papel', 'Metal', 'Organico') NOT NULL,
    `latitude` VARCHAR(191) NOT NULL,
    `longitude` VARCHAR(191) NOT NULL,
    `nivel_cheio` INTEGER NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notificacoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lixeira_id` INTEGER NOT NULL,
    `mensagem` VARCHAR(191) NOT NULL,
    `lida` BOOLEAN NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `notificacoes` ADD CONSTRAINT `notificacoes_lixeira_id_fkey` FOREIGN KEY (`lixeira_id`) REFERENCES `lixeiras`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
