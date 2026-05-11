import './DataBadge.css'

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