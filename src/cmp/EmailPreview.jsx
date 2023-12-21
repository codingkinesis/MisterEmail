import { Link } from "react-router-dom";

export function EmailPreview({ email, onOpenDraft }) {

    function getDate(dateTime) {
        const date = new Date(dateTime)
        const year = padNum(date.getFullYear())
        const month = padNum(date.getMonth() + 1)
        const day = padNum(date.getDate())
        return `${day}/${month}/${year}`
    }

    function padNum(num) {
        return (num > 9) ? num + '' : '0' + num
    }

    const { id, from, isRead, subject, body, sentAt } = email
    return (
        <section className="email-preview">
            { from && <Link className="link" to={`/Email/${id}`}>
                <p className={`head ${!isRead && 'bold'} hide-extra-text`}>{from}</p>
                <p className={`head ${!isRead && 'bold'} hide-extra-text`}>{subject}</p>
                <p className="body hide-extra-text">{body}</p>
            </Link>}
            { !from && <div className="button-content" onClick={onOpenDraft}>
                <p className={`draft hide-extra-text`}>draft</p>
                <p className={`head hide-extra-text`}>{subject}</p>
                <p className="body hide-extra-text">{body}</p>
            </div>}
        </section>
    )
}