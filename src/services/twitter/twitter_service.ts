import { Stream } from "stream";

interface ITwitterService {
    getStream(streamUrl: string): Promise<Stream>
}

export default ITwitterService;