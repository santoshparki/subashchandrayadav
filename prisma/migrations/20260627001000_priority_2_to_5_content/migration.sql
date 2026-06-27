ALTER TABLE "Enquiry"
  ADD COLUMN IF NOT EXISTS "companyName" TEXT,
  ADD COLUMN IF NOT EXISTS "preferredContactMethod" TEXT NOT NULL DEFAULT 'Email';

ALTER TABLE "Project"
  ADD COLUMN IF NOT EXISTS "duration" TEXT,
  ADD COLUMN IF NOT EXISTS "role" TEXT,
  ADD COLUMN IF NOT EXISTS "responsibilities" TEXT,
  ADD COLUMN IF NOT EXISTS "technologies" TEXT;

ALTER TABLE "Skill"
  ADD COLUMN IF NOT EXISTS "levelLabel" TEXT NOT NULL DEFAULT 'Advanced';

CREATE TABLE IF NOT EXISTS "Certification" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "issuer" TEXT NOT NULL,
  "location" TEXT,
  "issuedDate" TEXT,
  "credentialUrl" TEXT,
  "description" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);
