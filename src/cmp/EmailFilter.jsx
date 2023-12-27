import { useEffect, useState } from "react"
import imgSearch from '../assets/imgs/search.png'
import imgFilter from '../assets/imgs/filter.png'

export function EmailFilter({ filterBy , onSetFilter}) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [advanceFilter, setAdvanceFilter] = useState(null)

    function startAdvanceFilter() {
        setAdvanceFilter(1)
    }
    
    
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
                <img className="search" src={imgSearch} />
                <input className="search-bar"
                    type="text" 
                    name="text" 
                    value={text} 
                    placeholder={'Search mail'}
                    onChange={handleChange} 
                />

                <button> {/* add advance filters*/}
                    <img className="filter" src={imgFilter} />
                </button>
                
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