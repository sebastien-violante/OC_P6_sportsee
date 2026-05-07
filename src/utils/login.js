export default async function login(data) {
    try {
        const response = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            body: JSON.stringify({
                username: data.username,
                password: data.password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            // On récupère le message d'erreur éventuel du backend
            const errorData = await response.json().catch(() => null);
            if (response.status === 401) {
                throw new Error("Identifiants invalides");
            }
            throw new Error(errorData?.message || "Erreur lors de la connexion");
        }
        const result = await response.json();

        return result.token;

    } catch (error) {
        console.error("Erreur login :", error);
        throw error;    
    }
}