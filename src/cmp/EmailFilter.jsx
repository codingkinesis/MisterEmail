import { useEffect, useState } from "react"

export function EmailFilter({ filterBy , onSetFilter}) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    
    useEffect(() => {
        onSetFilter(filterByToEdit)
    },[filterByToEdit])

    function handleChange(ev) {
        const { name: feild, value } = ev.target
        setFilterByToEdit(prevFilter => ({...prevFilter, [feild]: value}))
    }

    const { text, isRead } = filterByToEdit
    return (
        <form className="email-filter">
            <label htmlFor="text-search">Search mail</label>
            <input onChange={handleChange} id="text-search" value={text} name="text" type="text"/>

            <input type="radio" onChange={handleChange} id="read-search" name="isRead" value={1} checked={isRead == 1}/>
            <label htmlFor="read-search">Read</label>
            <input type="radio" onChange={handleChange} id="unread-search" name="isRead" value={0} checked={isRead == 0}/>
            <label htmlFor="unread-search">Unread</label>
            <input type="radio" onChange={handleChange} id="read-unread-search" name="isRead" value={-1} checked={isRead == -1}/>
            <label htmlFor="read-unread-search">All</label>
        </form>
    )
}