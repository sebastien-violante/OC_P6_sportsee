import './ProfileBadge.css'
import { BeatLoader } from 'react-spinners'

/**
 * Renvoie un composant affichant le profil de l'utilisateur 
 * @param {String} picture - lien de la photo de l'utilisateur
 * @param {String} id - les nom et prénom de l'utilisateur
 * @param {DateTime} date - la date d'inscription de l'utilisateur
 * @param {Boolean} loadingUser - constante indiquant l'état de chargement des données utilisateur
 * @returns {JSX.Element} - composant header
 */
export default function ProfileBadge({picture, id, date, loadingUser}) {
    return (
         <article className="identity">
          { loadingUser ? 
          (<div className="flex justify-center">
            <BeatLoader size={15} color="#36d7b7" />
         </div>) 
          : 
          (<>
            <div className="pictureWrapper">
              <img className="pictureId" src={picture} alt={`image de profil de ${id}`}></img>
            </div>
            <div className="dataId">
              {id && <h1>{id}</h1>}
              <p className="caption">{date ? `Membre depuis le ${date.setLocale('fr').toFormat('d LLLL yyyy')}` : "" }</p>
            </div>
          </>)}
        </article>
    )
}