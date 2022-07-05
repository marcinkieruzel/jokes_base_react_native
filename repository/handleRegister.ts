export const handleRegister = async (user: {
    username: string,
    password: string,
    email: string
}
): Promise<any> => {
    try {
        const res = await fetch(`http://auth-starter.noinputsignal.com/user/register`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await res.json()
        return json;
    } catch (error) {
        console.log(error);
        return []
    }
}