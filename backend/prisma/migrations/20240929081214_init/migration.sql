/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `labreport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `patient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `patienthistory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `discord` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pass` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_no` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "labreport" DROP CONSTRAINT "labreport_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "labreport" DROP CONSTRAINT "labreport_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "patienthistory" DROP CONSTRAINT "patienthistory_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "patienthistory" DROP CONSTRAINT "patienthistory_patient_id_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "password",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "discord" TEXT NOT NULL,
ADD COLUMN     "pass" TEXT NOT NULL,
ADD COLUMN     "phone_no" INTEGER NOT NULL,
ADD COLUMN     "team_id" INTEGER NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "appointment";

-- DropTable
DROP TABLE "doctor";

-- DropTable
DROP TABLE "labreport";

-- DropTable
DROP TABLE "patient";

-- DropTable
DROP TABLE "patienthistory";

-- CreateTable
CREATE TABLE "Host" (
    "id" SERIAL NOT NULL,
    "pass" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Host_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tourny" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "rules" TEXT NOT NULL,
    "host_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "team_size" INTEGER NOT NULL,
    "prize_pool" INTEGER NOT NULL,

    CONSTRAINT "Tourny_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "tourny_id" INTEGER NOT NULL,
    "match_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegTeams" (
    "id" SERIAL NOT NULL,
    "team_id" INTEGER NOT NULL,
    "tourny_id" INTEGER NOT NULL,

    CONSTRAINT "RegTeams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchTeams" (
    "id" SERIAL NOT NULL,
    "match_id" INTEGER NOT NULL,
    "team_id" INTEGER NOT NULL,
    "results" INTEGER NOT NULL,

    CONSTRAINT "MatchTeams_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tourny" ADD CONSTRAINT "Tourny_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_tourny_id_fkey" FOREIGN KEY ("tourny_id") REFERENCES "Tourny"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegTeams" ADD CONSTRAINT "RegTeams_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegTeams" ADD CONSTRAINT "RegTeams_tourny_id_fkey" FOREIGN KEY ("tourny_id") REFERENCES "Tourny"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchTeams" ADD CONSTRAINT "MatchTeams_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchTeams" ADD CONSTRAINT "MatchTeams_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
