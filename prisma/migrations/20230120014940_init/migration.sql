-- CreateTable
CREATE TABLE "TwitterUser" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(16) NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "TwitterUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuildHasTwitterUser" (
    "id" SERIAL NOT NULL,
    "guildId" VARCHAR(256) NOT NULL,
    "twitterUserId" INTEGER NOT NULL,

    CONSTRAINT "GuildHasTwitterUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuildHasTwitterUser_guildId_twitterUserId_key" ON "GuildHasTwitterUser"("guildId", "twitterUserId");

-- AddForeignKey
ALTER TABLE "GuildHasTwitterUser" ADD CONSTRAINT "GuildHasTwitterUser_twitterUserId_fkey" FOREIGN KEY ("twitterUserId") REFERENCES "TwitterUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
