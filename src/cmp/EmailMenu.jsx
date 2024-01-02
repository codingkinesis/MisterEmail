import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useEffectUpdate } from "../customHooks/useEffectUpdate"

export function EmailMenu({ filterBy , onSetFilter, unreadEmailNum}) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const navigate = useNavigate()
    const { emailId } = useParams()

    useEffectUpdate(() => {
        onSetFilter(filterByToEdit)
    },[filterByToEdit])

    function handleMenuChange(menu) {
        console.log(menu)
        setFilterByToEdit(prevFilter => ({...prevFilter, menu: menu}))
        navigate(`/email/${menu}`)
    }

    const { menu } = filterByToEdit
    return (
        <section className="email-menu">
            <button className={`${menu === 'inbox' && 'selected'}`} onClick={() => handleMenuChange('inbox')}>
                <p>Inbox</p>
                {unreadEmailNum >= 0 && unreadEmailNum}
            </button>
            <button className={`${menu === 'starred' && 'selected'}`} onClick={() => handleMenuChange('starred')}>Starred</button>
            <button className={`${menu === 'sent' && 'selected'}`} onClick={() => handleMenuChange('sent')}>Sent</button>
            <button className={`${menu === 'drafts' && 'selected'}`} onClick={() => handleMenuChange('drafts')}>Drafts</button>
        </section>
    )
}