import { EmailPreview } from "./EmailPreview";
import imgStarred from '../assets/imgs/starred.png'
import imgUnstarred from '../assets/imgs/unstarred.png'
import EmailReadIcon from '@mui/icons-material/DraftsOutlined';
import EmailUnreadIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import TrashIcon from '@mui/icons-material/DeleteOutlined';
import UnstarredIcon from '@mui/icons-material/StarBorderOutlined';
import StarredIcon from '@mui/icons-material/StarOutlined';
import { yellow } from "@mui/material/colors";

export function EmailList({ emails, onOpenDraft, onDelete, onChangeUnreadEmailNum, onToggleStarred, onToggleRead }) {

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
                            <button className="btn" onClick={() => onToggleStarred(email)}>
                                {email.isStarred 
                                ? 
                                <StarredIcon color="primary" sx={{ color: yellow[500] }} /> 
                                : 
                                <UnstarredIcon />}
                            </button>
                        </div>
                        <section className="email-info">
                            <EmailPreview email={email} onOpenDraft={onOpenDraft}/>
                        </section>
                        <div className="not-hover-display">
                            {getDate(email.sentAt)}
                        </div>
                        <div className="hover-display">
                            <button className="btn" onClick={() => onTrash(email)}>
                                <TrashIcon />
                            </button>
                            <button className="btn" onClick={() => onToggleIsRead(email)}>
                                {!email.isRead 
                                ? 
                                <EmailReadIcon />
                                : 
                                <EmailUnreadIcon />}
                            </button>
                        </div>
                    </li>
                )}
            </ul>
        </section>
    )
}