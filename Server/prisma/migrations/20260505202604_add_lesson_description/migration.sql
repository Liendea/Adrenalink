/*
  Warnings:

  - You are about to drop the `lesson_packages` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `lessons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `lesson_packages` DROP FOREIGN KEY `lesson_packages_school_id_fkey`;

-- AlterTable
ALTER TABLE `lessons` ADD COLUMN `description` TEXT NOT NULL;

-- DropTable
DROP TABLE `lesson_packages`;
