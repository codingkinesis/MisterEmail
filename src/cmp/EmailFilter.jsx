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

    const { text, isRead } = filterByToEdit
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
            <select className="dropdown" name="isRead" onChange={handleChange}>
                <option value={'all'}>All</option>
                <option value={'read'}>Read</option>
                <option value={'unread'}>Unread</option>
            </select>
        </form>
    )
}