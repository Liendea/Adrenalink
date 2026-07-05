-- Sync the database with schema.prisma: the `priceEuro` column was renamed to
-- `price` in schema.prisma but never migrated in the database.
ALTER TABLE `lessons` CHANGE `price_euro` `price` DOUBLE NOT NULL;
