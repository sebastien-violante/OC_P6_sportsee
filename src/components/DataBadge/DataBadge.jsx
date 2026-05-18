import './DataBadge.css'

/**
 * Renvoie un composant formaté pour la présentation de données
 * @param {String} title - titre de la donnée
 * @param {String} data - valeur de la donnée
 * @param {String} unit - unité de la donnée
 * @returns {JSX.Element} - composant Databadge
 */
export default function DataBadge({title, data, unit}) {
    return (
        <button className='dataBadge'>
            <p className="title">{title}</p>
            <div className='result'>
                <p className="data">{data}</p>
                <p className="unit">{unit}</p>
            </div>
        </button>
    )
}