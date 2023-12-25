import { EmailPreview } from "./EmailPreview";
import imgTrash from '../assets/imgs/trash.png'

export function EmailList({emails, onDelete}) {

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
        <section className="email-list">
            <ul>
                {emails.map(email =>
                    <li key={email.id}>
                        <EmailPreview email={email} />
                        <div className="not-hover-display">
                            {getDate(email.sentAt)}
                        </div>
                        <div className="hover-display">
                            <button onClick={() => onDelete(email.id)}>
                                <img src={imgTrash} alt="Trash" />
                            </button>
                        </div>
                    </li>
                )}
            </ul>
        </section>
    )
}