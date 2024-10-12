-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_team_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "discord" DROP NOT NULL,
ALTER COLUMN "phone_no" DROP NOT NULL,
ALTER COLUMN "team_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
