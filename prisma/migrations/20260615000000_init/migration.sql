CREATE TABLE "AdminUser" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "name" TEXT NOT NULL DEFAULT 'Administrator',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Profile" (
  "id" INTEGER NOT NULL DEFAULT 1,
  "name" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "tagline" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "availability" TEXT NOT NULL,
  "photoUrl" TEXT NOT NULL DEFAULT '/subhash-photo.jpeg',
  "cvUrl" TEXT NOT NULL DEFAULT '/subhash-chandra-yadav-cv.html',
  "yearsExperience" TEXT NOT NULL DEFAULT '1+',
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Project" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "location" TEXT,
  "year" TEXT,
  "imageUrl" TEXT,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Skill" ("id" TEXT NOT NULL, "name" TEXT NOT NULL, "category" TEXT NOT NULL DEFAULT 'Technical', "level" INTEGER NOT NULL DEFAULT 80, "sortOrder" INTEGER NOT NULL DEFAULT 0, CONSTRAINT "Skill_pkey" PRIMARY KEY ("id"));
CREATE TABLE "Service" ("id" TEXT NOT NULL, "title" TEXT NOT NULL, "description" TEXT NOT NULL, "icon" TEXT NOT NULL DEFAULT 'Building2', "sortOrder" INTEGER NOT NULL DEFAULT 0, CONSTRAINT "Service_pkey" PRIMARY KEY ("id"));
CREATE TABLE "TimelineItem" ("id" TEXT NOT NULL, "type" TEXT NOT NULL, "title" TEXT NOT NULL, "organization" TEXT NOT NULL, "location" TEXT, "startDate" TEXT NOT NULL, "endDate" TEXT NOT NULL, "description" TEXT NOT NULL, "sortOrder" INTEGER NOT NULL DEFAULT 0, CONSTRAINT "TimelineItem_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
