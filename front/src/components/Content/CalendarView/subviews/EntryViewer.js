import "./EntryViewer.css"

export default function EntryViewer (props)
{
    return (
        <div className="entry-viewer">
            {props.entryList.map((entry, i) => (
                <div 
                    className="entry"
                    key={i}>
                    <span>At {props.formatDate(entry.timestamp)}: </span>
                    <p>{entry.text}</p>
                </div>
            ))}
        </div>
    );
}