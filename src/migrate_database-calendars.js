module.exports = [
	'CREATE TABLE IF NOT EXISTS "store" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT);', 
	'ALTER TABLE "store" ADD "unique_hash" text(256) NULL;', 
	'ALTER TABLE "store" ADD "json" NULL;'
];
