export default async function getUser() {
    const token = "TON_TOKEN_ICI";

    try {
        const response = await fetch("https://api.example.com/data", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const user = await response.json();
        return user;

    } catch (error) {
        console.error("Erreur :", error);
        return null;
    }
}