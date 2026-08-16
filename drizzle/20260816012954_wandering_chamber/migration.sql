ALTER TABLE "holds" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "holds" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
DROP TYPE "holdsStatus";--> statement-breakpoint
CREATE TYPE "holdsStatus" AS ENUM('WAITING', 'FULFILLED', 'CANCELLED');--> statement-breakpoint
ALTER TABLE "holds" ALTER COLUMN "status" SET DATA TYPE "holdsStatus" USING "status"::"holdsStatus";--> statement-breakpoint
ALTER TABLE "holds" ALTER COLUMN "status" SET DEFAULT 'WAITING'::"holdsStatus";