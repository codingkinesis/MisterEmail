import { useEffect, useState } from "react"
import imgSearch from '../assets/imgs/search.png';

export function EmailFilter({ filterBy , onSetFilter}) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    
    useEffect(() => {
        onSetFilter(filterByToEdit)
    },[filterByToEdit])

    function handleChange(ev) {
        const { name: feild, value } = ev.target
        setFilterByToEdit(prevFilter => ({...prevFilter, [feild]: value}))
    }

    const { text, isRead, sortBy } = filterByToEdit
    return (
        <form className="email-filter">
            <label className="search-bar-container">
                <img src={imgSearch} />
                <input className="search-bar"
                    type="text" 
                    name="text" 
                    value={text} 
                    placeholder={'Search mail'}
                    onChange={handleChange} 
                />
            </label>
            <section className="dropdown-options">
                <select className="dropdown" name="isRead" value={isRead} onChange={handleChange}>
                    <option value={'all'}>All</option>
                    <option value={'read'}>Read</option>
                    <option value={'unread'}>Unread</option>
                </select>
                <select className="dropdown" name="sortBy" value={sortBy} onChange={handleChange}>
                    <option value={'date'}>Date</option>
                    <option value={'subject'}>Subject</option>
                </select>
            </section>
        </form>
    )
}