import { Joke } from '../interfaces/Joke.interface';

export const getJokes = async (): Promise<Joke[]> => {
    try {
        const res = await fetch(`http://auth-starter.noinputsignal.com/joke`)
        const json = await res.json()
        return json;
    } catch (error) {
        console.log(error);
        return []
    }
}