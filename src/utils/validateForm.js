export default function validateForm(data) {
    const errors = {}
    const username = data.username?.trim()
    const password = data.password?.trim()
    if(!username || username.length<2) errors.username = "l'identifiant doit comprendre au moins 2 caractères"
    if(!password || password.length < 6) errors.password = "le mot de passe doit comprendre au moins 6 caractères"
    return errors
}