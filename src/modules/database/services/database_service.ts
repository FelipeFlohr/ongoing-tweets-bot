import TwitterUser from "../../twitter/models/user";

interface IDatabaseService {
    getTwitterUserByUsername(username: string): Promise<TwitterUser>
}

export default IDatabaseService;