-- AlterTable
ALTER TABLE `lessons` ADD COLUMN `lat` DOUBLE NULL,
    ADD COLUMN `lng` DOUBLE NULL;

-- AlterTable
ALTER TABLE `schools` ADD COLUMN `lat` DOUBLE NULL,
    ADD COLUMN `lng` DOUBLE NULL;
