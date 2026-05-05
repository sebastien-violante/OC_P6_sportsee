import './ProfileBadge.css'

export default function ProfileBadge({picture, id, date}) {
    return (
         <article className="identity">
          <img className="pictureId" src={picture} alt="image de profil"></img>
          <div className="dataId">
            <h1>{id}</h1>
            <p className="caption">{date ? `Membre depuis le ${date.setLocale('fr').toFormat('d LLLL yyyy')}` : "" }</p>
          </div>
        </article>
    )
}