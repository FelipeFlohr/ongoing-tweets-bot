import { PrismaClient, Prisma } from "@prisma/client";
import IPrismaService from "../prisma_service";
import { injectable } from "inversify";

@injectable()
export default class PrismaServiceImpl implements IPrismaService {
    getClient(): PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined> {
        const client = new PrismaClient();
        return client;
    }
}