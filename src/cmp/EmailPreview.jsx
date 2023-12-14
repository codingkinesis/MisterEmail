import { Link } from "react-router-dom";

export function EmailPreview({ email }) {

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

    return (
        <Link className="email-preview" to={`/Email/${email.id}`}>
            <p className={`head ${!email.isRead && 'bold'} hide-extra-text`}>{email.from}</p>
            <p className={`head ${!email.isRead && 'bold'} hide-extra-text`}>{email.subject}</p>
            <p className="body hide-extra-text">{email.body}</p>
            {getDate(email.sentAt)}
        </Link>
    )
}