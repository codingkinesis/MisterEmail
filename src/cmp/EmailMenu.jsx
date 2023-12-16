import { useEffect, useState } from "react"

export function EmailMenu({ filterBy , onSetFilter}) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    },[filterByToEdit])

    function handleMenuChange(menuOption) {
        setFilterByToEdit(prevFilter => ({...prevFilter, menuOption: menuOption}))
    }

    const { menuOption } = filterByToEdit
    let inbox, sent
    menuOption === 'inbox' ? inbox = 'selected' : inbox = ''
    menuOption === 'sent' ? sent = 'selected' : sent = ''
    return (
        <section className="email-menu">
            <button className={inbox} onClick={() => handleMenuChange('inbox')}>Inbox</button>
            <button className={sent} onClick={() => handleMenuChange('sent')}>Sent</button>
        </section>
    )
}