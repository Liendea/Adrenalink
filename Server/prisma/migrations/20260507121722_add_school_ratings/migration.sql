-- CreateTable
CREATE TABLE `ratings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `school_id` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ratings_school_id_user_id_key`(`school_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `schools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
