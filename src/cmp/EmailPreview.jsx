import { Link, useParams } from "react-router-dom";

export function EmailPreview({ email, onOpenDraft }) {
    const { menu } = useParams()

    const { id, from, isRead, subject, body } = email
    return (
        <section className="email-preview">
            { from && <Link to={`/${menu}/${id}`}>
                <p className={`head ${!isRead && 'bold'} hide-extra-text`}>{from}</p>
                <p className={`head ${!isRead && 'bold'} hide-extra-text`}>{subject}</p>
                <p className="body hide-extra-text">{body}</p>
            </Link>}
            { !from && <button onClick={() => onOpenDraft(id)}>
                <p className={`draft hide-extra-text`}>draft</p>
                <p className={`head hide-extra-text`}>{subject}</p>
                <p className="body hide-extra-text">{body}</p>
            </button>}
        </section>
    )
}