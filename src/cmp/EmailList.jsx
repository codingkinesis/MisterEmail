import { EmailPreview } from "./EmailPreview";
import imgTrash from '../assets/imgs/trash.png'

export function EmailList({emails, onDelete}) {

    return (
        <section className="email-list">
            <ul>
                {emails.map(email =>
                    <li key={email.id}>
                        <EmailPreview email={email}  />
                        <button onClick={() => onDelete(email.id)}>
                            <img src={imgTrash} alt="Trash" />
                        </button>
                    </li>
                )}
            </ul>
        </section>
    )
}