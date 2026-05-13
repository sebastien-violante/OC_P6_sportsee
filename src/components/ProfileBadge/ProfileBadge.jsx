import './ProfileBadge.css'
import { BeatLoader } from 'react-spinners'

export default function ProfileBadge({picture, id, date, loadingUser}) {
    return (
         <article className="identity">
          { loadingUser ? 
          (<div className="flex justify-center">
            <BeatLoader size={15} />
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