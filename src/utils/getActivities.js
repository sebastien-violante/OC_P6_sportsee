/**
 * Renvoie une date calculée à partir d'une date initiale, d'un type et d'un pas
 * @param {string} token - le token permettant d'identifier l'utilisateur
 * @param {String} type - le type de décalalge : précédent ou suivant
 * @param {Object} date - la date de référence
 * @returns {Object} - une nouvelle date issue du décalage
 */
/*
export default async function getActivities(token) {
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
            throw new Error(errorData?.message || "Erreur lors de la connexion");
        }

        const result = await response.json();

        // Si ton API renvoie un token JWT
        return result.token;

    } catch (error) {
        console.error("Erreur login :", error);

        // Tu peux soit relancer l'erreur...
        throw error;

    
    }
}
    */