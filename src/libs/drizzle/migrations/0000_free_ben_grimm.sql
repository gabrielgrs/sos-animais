DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('MALE', 'FEMALE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('USER', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "animals" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL,
	"name" text,
	"species" text NOT NULL,
	"gender" "gender",
	"color" text NOT NULL,
	"breed" text,
	"found_date" timestamp NOT NULL,
	"found_zip_code" text NOT NULL,
	"found_city" text NOT NULL,
	"rescue_zip_code" text,
	"contact_phone" text NOT NULL,
	"contact_zip_code" text,
	"contact_address" text,
	"contact_city" text,
	"pictures" text[],
	"observations" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"name" text,
	"role" "role" DEFAULT 'USER' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "animals" ADD CONSTRAINT "animals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
