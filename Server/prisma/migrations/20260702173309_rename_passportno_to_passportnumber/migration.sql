-- Sync the database with schema.prisma: the `passportNo` column was previously
-- renamed to `passportNumber` in schema.prisma but never migrated in the database.
ALTER TABLE `users` CHANGE `passportNo` `passportNumber` VARCHAR(191) NOT NULL;
