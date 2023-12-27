import { EmailPreview } from "./EmailPreview";
import imgTrash from '../assets/imgs/trash.png'
import imgStarred from '../assets/imgs/starred.png'
import imgUnstarred from '../assets/imgs/unstarred.png'
import imgRead from '../assets/imgs/read.png'
import imgUnread from '../assets/imgs/unread.png'

export function EmailList({emails, onDelete, onChangeUnreadEmailNum, onToggleStarred, onToggleRead}) {

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

    function onTrash({ isRead, id }) {
        if (!isRead) onChangeUnreadEmailNum(-1)
        onDelete(id)
    }

    function onToggleIsRead(email) {
        const isRead = email.isRead
        onToggleRead(email)
        if (!isRead) onChangeUnreadEmailNum(-1)
        else onChangeUnreadEmailNum(1)
    }

    return (
        <section className="email-list">
            <ul>
                {emails.map(email =>
                    <li key={email.id}>
                        <div className="starred">
                            <button onClick={() => onToggleStarred(email)}>
                                {email.isStarred 
                                ? 
                                <img src={imgStarred} alt="starred" /> 
                                : 
                                <img src={imgUnstarred} alt="unstarred" />}
                            </button>
                        </div>
                        <section className="email-info">
                            <EmailPreview email={email} />
                        </section>
                        <div className="not-hover-display">
                            {getDate(email.sentAt)}
                        </div>
                        <div className="hover-display">
                            <button onClick={() => onTrash(email)}>
                                <img src={imgTrash} alt="Trash" />
                            </button>
                            <button onClick={() => onToggleIsRead(email)}>
                                {!email.isRead 
                                ? 
                                <img src={imgRead} alt="read" /> 
                                : 
                                <img src={imgUnread} alt="unread" />}
                            </button>
                        </div>
                    </li>
                )}
            </ul>
        </section>
    )
}