CREATE TABLE "user_opened_items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"product_id" uuid,
	"barcode" varchar(32) NOT NULL,
	"product_name_snapshot" varchar(255) NOT NULL,
	"duration_hours_snapshot" integer,
	"opened_at" timestamp with time zone NOT NULL,
	"expires_at" timestamp with time zone,
	"status" varchar(50) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_opened_items" ADD CONSTRAINT "user_opened_items_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_opened_items" ADD CONSTRAINT "user_opened_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;