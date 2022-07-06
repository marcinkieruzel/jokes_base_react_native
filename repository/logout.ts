import AsyncStorage from "@react-native-async-storage/async-storage"
import { isTokenValid, parseJwt } from "./parseJwt";
import { refreshToken } from "./sendJoke";

export const logout = async () => {

    // http://auth-starter.noinputsignal.com/user/logout

    try {
        let token = await AsyncStorage.getItem("@access_token");
        const refreshT = await AsyncStorage.getItem("@refresh_token");

        if (!token) {
            throw new Error("Brak tokena")
        }

        if (typeof token != "string") {
            throw new Error("Token nie jest stringiem")
        }

        const validToken = isTokenValid(token)


        if (typeof token === "string" && !validToken) {
            token = await refreshToken(token)

            if (token) {
                await AsyncStorage.setItem("@access_token", token)
            }

            return {
                "exception": "Błąd autoryzacji"
            }

        }

        const user = parseJwt(token)

        const res = await fetch(`http://auth-starter.noinputsignal.com/user/logout`, {
            method: "POST",
            body: JSON.stringify({
                username: user?.username,
                refreshtoken: refreshT
            })
        })

        const json = await res.json();


        console.log(json);



    } catch (error) {
        console.log(error);

    }



}