ALTER TABLE "Certification"
  ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;

CREATE TABLE IF NOT EXISTS "Achievement" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "organization" TEXT,
  "year" TEXT,
  "description" TEXT NOT NULL,
  "linkUrl" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);
