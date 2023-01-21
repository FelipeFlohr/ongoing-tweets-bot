import { Prisma, PrismaClient, TwitterUser } from "@prisma/client";
import IDatabaseRepository from "../database_repository";
import { inject, injectable } from "inversify";
import TYPES from "../../../../types/dependency_injection/dependency_injection";
import IPrismaService from "../../services/prisma_service";

@injectable()
export default class DatabaseRepositoryImpl implements IDatabaseRepository {
    private readonly prismaClient: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

    public constructor(@inject(TYPES.PrismaService) prismaService: IPrismaService) {
        this.prismaClient = prismaService.getClient();
    }

    public async getTwitterUserByUsername(username: string): Promise<TwitterUser> {
        const user = await this.prismaClient.twitterUser.findFirstOrThrow({
            where: {
                username: username
            }
        });

        return user;
    }
}