import { NavLink } from "react-router-dom"

export default function NewPwd() {
    return (
        <>
            <h1>Changer mon mot de passe</h1>   
            <form class="register-form">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="exemple@mail.com"
                    />
                </div>

                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="Mot de passe"
                    />
                </div>

                <div class="form-group">
                    <label for="confirmPassword">Confirmation du mot de passe</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        placeholder="Confirmez le mot de passe"
                    />
                </div>

                <button type="submit">Valider</button>

            </form>
            <NavLink  to="/"><button>Retour à la page de connexion</button></NavLink>

        </>
    )
}