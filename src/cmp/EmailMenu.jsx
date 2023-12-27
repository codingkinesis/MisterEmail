import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export function EmailMenu({ filterBy , onSetFilter, unreadEmailNum}) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const navigate = useNavigate()
    const { emailId } = useParams()

    useEffect(() => {
        onSetFilter(filterByToEdit)
    },[filterByToEdit])

    function handleMenuChange(menu) {
        setFilterByToEdit(prevFilter => ({...prevFilter, menu: menu}))
        if (emailId) 
            navigate(`/email/${menu}/${emailId}`)
        else
            navigate(`/email/${menu}`)
    }

    const { menu } = filterByToEdit
    let inbox, sent, drafts, starred
    menu === 'inbox' ? inbox = 'selected' : inbox = ''
    menu === 'starred' ? starred = 'selected' : starred = ''
    menu === 'sent' ? sent = 'selected' : sent = ''
    menu === 'drafts' ? drafts = 'selected' : drafts = ''
    return (
        <section className="email-menu">
            <button className={inbox} onClick={() => handleMenuChange('inbox')}>
                <p>Inbox</p>
                {unreadEmailNum >= 0 && unreadEmailNum}
            </button>
            <button className={starred} onClick={() => handleMenuChange('starred')}>Starred</button>
            <button className={sent} onClick={() => handleMenuChange('sent')}>Sent</button>
            <button className={drafts} onClick={() => handleMenuChange('drafts')}>Drafts</button>
        </section>
    )
}