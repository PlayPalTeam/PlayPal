-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'lister');

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);
