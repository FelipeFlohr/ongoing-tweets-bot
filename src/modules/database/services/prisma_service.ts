import { Prisma, PrismaClient } from "@prisma/client";

interface IPrismaService {
    getClient(): PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
}

export default IPrismaService;