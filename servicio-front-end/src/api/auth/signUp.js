const  ApiBase = import.meta.env.VITE_AUTH_SERVICE_API

export async function signUp(email, password) {
    const response = await fetch(ApiBase + "/api/v1/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
    return await response
}