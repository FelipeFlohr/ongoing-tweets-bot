import { TwitterUser } from "@prisma/client";

interface IDatabaseRepository {
    getTwitterUserByUsername(username: string): Promise<TwitterUser>
}

export default IDatabaseRepository;