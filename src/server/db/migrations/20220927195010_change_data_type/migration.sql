/*
  Warnings:

  - You are about to alter the column `salary` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `income` on the `incomes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `total_price` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `total_income` on the `organizations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `employees` MODIFY `salary` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `incomes` MODIFY `income` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `total_price` INTEGER NULL;

-- AlterTable
ALTER TABLE `organizations` MODIFY `total_income` INTEGER NULL;
