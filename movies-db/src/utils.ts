import { redirect } from "react-router-dom";

export async function requireAuth(request: Request) {
    const expirationTime = localStorage.getItem('accessTokenExpiration');
    const accessToken = localStorage.getItem('accessToken');
    const currentTime = Date.now();
    const pathname = new URL(request.url).pathname;

    if (!accessToken || (expirationTime && currentTime > parseInt(expirationTime, 10))) {
        localStorage.removeItem('user')
        const redirectPath = `/signin?message=You must login first.&redirectTo=${pathname}`;
        throw redirect(redirectPath);
    };
}
