import AsyncStorage from "@react-native-async-storage/async-storage";


export const handleLogin = async (user: {
    username: string,
    password: string,
}
): Promise<any> => {
    try {
        const res = await fetch(`http://auth-starter.noinputsignal.com/auth/login`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await res.json()


        await AsyncStorage.setItem("@access_token", json.access_token);
        await AsyncStorage.setItem("@refresh_token", json.refresh_token)


        return json;
    } catch (error) {
        console.log(error);
        return []
    }
}