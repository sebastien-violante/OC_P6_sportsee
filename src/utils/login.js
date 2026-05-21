/**
 * Renvoie le token de l'utilisateur ou une erreur
 * @param {Object} data - les données d'identifications issues du formulaire de connexion
 * @returns {Object} - le token ou une erreur
 */
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
            // Transformation de l'erreur en json ou null (évite une erreur de type "Unexpected token < in JSON" si le serveur ne renvoie pas son erreur sous format JSON)
            const errorData = await response.json().catch(() => null);
            
            // Cas de login/password invalides
            if (response.status === 401) {
                throw new Error("Identifiants invalides");
            }
            throw new Error(errorData?.message || "Erreur lors de la connexion");
        }

        const result = await response.json();

        return result.token;

    } catch (error) {
        // cas de l'API indisponible ou d'une erreur réseau
        if (error instanceof TypeError) {
            throw new Error(
                "Les données d'identification n'ont pas pu être récupérées"
            );
        }

        console.error("Erreur login :", error);
        throw error;
    }
}