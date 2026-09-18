CREATE TYPE "public"."catalog_request_status" AS ENUM('pending', 'processing', 'resolved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."opening_rule_verification_status" AS ENUM('rejected', 'pending', 'verified');--> statement-breakpoint
CREATE TYPE "public"."validation_run_status" AS ENUM('pending', 'running', 'succeeded', 'failed');--> statement-breakpoint
CREATE TABLE "brands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"normalized_name" varchar(255) NOT NULL,
	CONSTRAINT "brands_normalized_name_unique" UNIQUE("normalized_name")
);
--> statement-breakpoint
CREATE TABLE "catalog_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"barcode" varchar(32) NOT NULL,
	"status" "catalog_request_status" DEFAULT 'pending' NOT NULL,
	"scan_count" integer DEFAULT 1 NOT NULL,
	"first_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
	"resolved_product_id" uuid,
	CONSTRAINT "catalog_requests_barcode_unique" UNIQUE("barcode"),
	CONSTRAINT "catalog_requests_resolved_product_id_unique" UNIQUE("resolved_product_id"),
	CONSTRAINT "catalog_request_scan_count_positive" CHECK ("catalog_requests"."scan_count" > 0)
);
--> statement-breakpoint
CREATE TABLE "evidence" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"opening_rule_id" uuid NOT NULL,
	"source_type" varchar(50) NOT NULL,
	"source_url" varchar(2048) NOT NULL,
	"extracted_text" text NOT NULL,
	"content_hash" varchar(64) NOT NULL,
	"retrieved_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "opening_rules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"duration_hours" integer NOT NULL,
	"storage_condition" varchar(255) NOT NULL,
	"instruction" varchar(255) NOT NULL,
	"verification_status" "opening_rule_verification_status" DEFAULT 'pending' NOT NULL,
	"confidence" numeric(3, 2) NOT NULL,
	"verified_at" timestamp with time zone,
	CONSTRAINT "opening_rules_product_id_unique" UNIQUE("product_id"),
	CONSTRAINT "duration_hours_positive" CHECK ("opening_rules"."duration_hours" > 0),
	CONSTRAINT "confidence_between_zero_and_one" CHECK ("opening_rules"."confidence" >= 0 and "opening_rules"."confidence" <= 1)
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"barcode" varchar(32) NOT NULL,
	"brand_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"quantity" varchar(64),
	"country_code" varchar(2) NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "products_barcode_unique" UNIQUE("barcode")
);
--> statement-breakpoint
CREATE TABLE "validation_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"catalog_request_id" uuid NOT NULL,
	"provider" varchar(100) NOT NULL,
	"model" varchar(255) NOT NULL,
	"status" "validation_run_status" DEFAULT 'pending' NOT NULL,
	"result" jsonb,
	"error" text,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "catalog_requests" ADD CONSTRAINT "catalog_requests_resolved_product_id_products_id_fk" FOREIGN KEY ("resolved_product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_opening_rule_id_opening_rules_id_fk" FOREIGN KEY ("opening_rule_id") REFERENCES "public"."opening_rules"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opening_rules" ADD CONSTRAINT "opening_rules_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "validation_runs" ADD CONSTRAINT "validation_runs_catalog_request_id_catalog_requests_id_fk" FOREIGN KEY ("catalog_request_id") REFERENCES "public"."catalog_requests"("id") ON DELETE no action ON UPDATE no action;