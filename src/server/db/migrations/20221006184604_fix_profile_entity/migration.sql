/*
  Warnings:

  - You are about to drop the column `emloyee_id` on the `profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employee_id]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_emloyee_id_fkey`;

-- AlterTable
ALTER TABLE `profiles` DROP COLUMN `emloyee_id`,
    ADD COLUMN `employee_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `profiles_employee_id_key` ON `profiles`(`employee_id`);

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
