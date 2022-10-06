/*
  Warnings:

  - You are about to drop the column `employee_id` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `profile_id` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_employee_id_fkey`;

-- AlterTable
ALTER TABLE `employees` ADD COLUMN `profile_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `profiles` DROP COLUMN `employee_id`;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
