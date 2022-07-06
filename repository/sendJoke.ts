import AsyncStorage from "@react-native-async-storage/async-storage";
import { isTokenValid, parseJwt } from "./parseJwt";



export const refreshToken = async (oldToken: string) => {
    try {

        const user = parseJwt(oldToken);
        const refreshToken = await AsyncStorage.getItem("@refresh_token")

        if (user && typeof refreshToken === 'string') {

            const res = await fetch(`http://auth-starter.noinputsignal.com/user/refreshtoken`, {
                method: "POST",
                body: JSON.stringify({
                    username: user.username,
                    refreshtoken: refreshToken
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const json = await res.json()

            console.log("Refreshed", json);

            return json.token

        }

        throw new Error("Problem z tokenem")



        // http://auth-starter.noinputsignal.com/user/refreshtoken
    } catch (error) {
        console.log(error);

    }
}

export const sendJoke = async (joke: { title: string, joke: string }, token: string): Promise<any> => {
    try {


        let token = await AsyncStorage.getItem("@access_token");

        if (!token) {
            throw new Error("Brak tokena")
        }

        if (typeof token != "string") {
            throw new Error("Token nie jest stringiem")
        }

        const validToken = isTokenValid(token)


        if (!validToken) {
            token = await refreshToken(token)

            if (token) {
                await AsyncStorage.setItem("@access_token", token)
            }

            return {
                "exception": "Błąd autoryzacji"
            }

        }

        const res = await fetch(`http://auth-starter.noinputsignal.com/joke`, {
            method: "POST",
            body: JSON.stringify(joke),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        const json = await res.json()

        
        await AsyncStorage.removeItem("@access_token")
        await AsyncStorage.removeItem("@refresh_token")
        
        
        return json;



    } catch (error) {
        console.log(error);

        return null;
    }
}