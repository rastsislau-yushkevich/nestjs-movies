/*
  Warnings:

  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MoviesOnUsers" DROP CONSTRAINT "MoviesOnUsers_movieId_fkey";

-- DropTable
DROP TABLE "posts";

-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "director" TEXT NOT NULL,
    "cover" TEXT NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_id_key" ON "movies"("id");

-- AddForeignKey
ALTER TABLE "MoviesOnUsers" ADD CONSTRAINT "MoviesOnUsers_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
