-- AlterTable
ALTER TABLE `profiles` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `birthday` DATETIME(3) NULL,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE', 'OTHER') NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NULL;
