-- CreateEnum
CREATE TYPE "ProcessingStatus" AS ENUM ('pending', 'completed', 'failed');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "rawContent" TEXT NOT NULL,
    "selectedText" TEXT,
    "userNote" TEXT,
    "aiSummary" TEXT,
    "processingStatus" "ProcessingStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedItemTag" (
    "savedItemId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "SavedItemTag_pkey" PRIMARY KEY ("savedItemId","tagId")
);

-- CreateTable
CREATE TABLE "Embedding" (
    "id" TEXT NOT NULL,
    "savedItemId" TEXT NOT NULL,
    "vector" DOUBLE PRECISION[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Embedding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Embedding_savedItemId_key" ON "Embedding"("savedItemId");

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedItemTag" ADD CONSTRAINT "SavedItemTag_savedItemId_fkey" FOREIGN KEY ("savedItemId") REFERENCES "SavedItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedItemTag" ADD CONSTRAINT "SavedItemTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Embedding" ADD CONSTRAINT "Embedding_savedItemId_fkey" FOREIGN KEY ("savedItemId") REFERENCES "SavedItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
