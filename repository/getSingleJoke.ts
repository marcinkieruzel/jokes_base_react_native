import { Joke } from '../interfaces/Joke.interface';

export const getSingleJoke = async (id: string): Promise<Joke | null> => {
    try {
        const res = await fetch(`http://auth-starter.noinputsignal.com/joke/${id}`)
        const json = await res.json()
        return json;
    } catch (error) {
        console.log(error);
        return null
    }
}