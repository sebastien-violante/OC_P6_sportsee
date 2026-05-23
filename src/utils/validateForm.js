/**
 * Valide ou non les données du formulaire transmises sous forme d'objet data et renvoie les erreurs détectées
 * @param {Object} data - les données récupérées dans le formulaire d'authentification
 * @returns {Object} - les erreurs éventuelles issues de la vérification des champs
 */
export default function validateForm(data) {
    const errors = {}
    const username = data.username?.trim()
    const password = data.password?.trim()
    if(!username || username.length < 2) errors.username = "l'identifiant doit comprendre au moins 2 caractères"
    if(!password || password.length < 6) errors.password = "le mot de passe doit comprendre au moins 6 caractères"
    return errors
}