import { inject, injectable } from "inversify";
import TwitterUser from "../../../twitter/models/user";
import IDatabaseService from "../database_service";
import IDatabaseRepository from "../../repositories/database_repository";
import TYPES from "../../../../types/dependency_injection/dependency_injection";
import ITwitterService from "../../../twitter/services/twitter_service";

@injectable()
export default class DatabaseServiceImpl implements IDatabaseService {
    private readonly repository: IDatabaseRepository;
    private readonly twitterService: ITwitterService;

    public constructor(@inject(TYPES.DatabaseRepository) databaseRepository: IDatabaseRepository, @inject(TYPES.TwitterService) twitterService: ITwitterService) {
        this.repository = databaseRepository;
        this.twitterService = twitterService;
    }

    public async getTwitterUserByUsername(username: string): Promise<TwitterUser> {
        const prismaTwitterUser = await this.repository.getTwitterUserByUsername(username);
        const twitterUser = await this.twitterService.getUserByUsername(prismaTwitterUser.username);

        return twitterUser;
    }
}