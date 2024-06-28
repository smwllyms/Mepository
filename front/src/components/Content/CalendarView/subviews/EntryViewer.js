import "./EntryViewer.css"

export default function EntryViewer (props)
{
    return (
        <div className="entry-viewer">
            {props.entryList.length === 0? <span>No entries found.</span> : props.entryList.map((entry, i) => (
                <div 
                    className="entry"
                    key={i}>
                    <span>At {props.formatDate(entry.tsEntry)}: </span>
                    <p>{entry.text}</p>
                </div>
            ))}
        </div>
    );
}