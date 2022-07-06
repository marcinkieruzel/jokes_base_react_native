type Token = {
    email: string,
    exp: number,
    iat: number,
    id: string,
    username: string
}

export const parseJwt = (token: string): Token | null => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export const isTokenValid = (token: string): boolean => {

    const parsedToken = parseJwt(token)

    if (!parsedToken) {
        return false
    }

    console.log(new Date(), new Date(parsedToken.exp * 1000 - 3000));
    
    return new Date().getTime() < (parsedToken.exp * 1000 - 3000)

}