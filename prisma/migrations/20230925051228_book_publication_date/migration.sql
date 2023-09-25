/*
  Warnings:

  - Changed the type of `publicationDate` on the `books` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "publicationDate",
ADD COLUMN     "publicationDate" TIMESTAMP(3) NOT NULL;
