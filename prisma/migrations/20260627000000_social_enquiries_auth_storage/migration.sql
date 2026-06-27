ALTER TABLE "Profile"
  ADD COLUMN "heroHeading" TEXT NOT NULL DEFAULT 'Building certainty into every site.',
  ADD COLUMN "aboutText" TEXT NOT NULL DEFAULT 'My approach combines practical field awareness with accurate design thinking. From construction drawings and inspections to progress coordination and safety compliance, I bring clarity to the details that determine project quality.',
  ADD COLUMN "contactHeading" TEXT NOT NULL DEFAULT 'Let''s build something that lasts.',
  ADD COLUMN "contactIntro" TEXT NOT NULL DEFAULT 'Open to civil site engineering, quality control, residential design support, and project coordination opportunities.';

CREATE TABLE "SiteStat" (
  "id" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "SiteStat_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SocialLink" (
  "id" TEXT NOT NULL,
  "platform" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "icon" TEXT NOT NULL DEFAULT 'Globe',
  "active" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

CREATE TYPE "EnquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'IN_PROGRESS', 'CLOSED');

CREATE TABLE "Enquiry" (
  "id" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "opportunityType" TEXT NOT NULL,
  "location" TEXT,
  "budgetRange" TEXT,
  "message" TEXT NOT NULL,
  "status" "EnquiryStatus" NOT NULL DEFAULT 'NEW',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Enquiry_pkey" PRIMARY KEY ("id")
);
