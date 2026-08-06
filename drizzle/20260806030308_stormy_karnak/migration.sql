CREATE TYPE "holdsStatus" AS ENUM('WAITING', 'FULFILED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "userStatus" AS ENUM('ACTIVE', 'SUSPENDED');--> statement-breakpoint
CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"totalCopies" integer NOT NULL,
	"availableCopies" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "holds" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"requestedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"status" "holdsStatus" DEFAULT 'WAITING'::"holdsStatus" NOT NULL,
	"userId" uuid NOT NULL,
	"bookId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "loans" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"loanDate" timestamp with time zone DEFAULT now() NOT NULL,
	"dueDate" timestamp with time zone NOT NULL,
	"returnDate" timestamp with time zone,
	"overDue" boolean DEFAULT false NOT NULL,
	"userId" uuid NOT NULL,
	"bookId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL CONSTRAINT "email-unique-constraint" UNIQUE,
	"status" "userStatus" DEFAULT 'ACTIVE'::"userStatus"
);
--> statement-breakpoint
ALTER TABLE "holds" ADD CONSTRAINT "holds_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "holds" ADD CONSTRAINT "holds_bookId_books_id_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id");--> statement-breakpoint
ALTER TABLE "loans" ADD CONSTRAINT "loans_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "loans" ADD CONSTRAINT "loans_bookId_books_id_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id");