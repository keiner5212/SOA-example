const  ApiBase = import.meta.env.VITE_AUTH_SERVICE_API

export async function signIn(email, password) {
    const response = await fetch(ApiBase + "/api/v1/user/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })

    if (!response.ok) {
        throw new Error("Failed to sign in")
    }
    return await response.json()
}