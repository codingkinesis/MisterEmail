import { useEffect, useState } from "react";
import { Link, Outlet, useParams, useSearchParams} from "react-router-dom";
import { emailService } from "../services/email.service";
import { EmailList } from "../cmp/EmailList";
import { EmailFilter } from "../cmp/EmailFilter";
import { EmailMenu } from "../cmp/EmailMenu";
import imgCompose from '../assets/imgs/writing.png';
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

export function EmailIndex() {
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [emails, setEmails] = useState(null)
    const [unreadEmailNum, setUnreadEmailNum] = useState(0)
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))

    useEffect(() => {
        loadUnreadEmailNum()
    },[])

    useEffect(() => {
        updateSearchParams()
        loadEmails()
    },[filterBy])

    function updateSearchParams() {
        let searchFilter = {}
        if (filterBy.text !== '') searchFilter.text = filterBy.text
        if (filterBy.isRead !== 'all') searchFilter.isRead = filterBy.isRead
        if (filterBy.sortBy !== 'none') searchFilter.sortBy = filterBy.sortBy
        setSearchParams(searchFilter)
    }

    async function loadEmails() {
        try{
            const emails = await emailService.query(filterBy)
            setEmails(emails)
        } catch(err) {
            showErrorMsg('Failed to load emails')
            console.error(err)
        }
    }

    async function loadUnreadEmailNum() {
        try{
            const unreadEmails = await emailService.getUnreadEmailNum()
            setUnreadEmailNum(unreadEmails)
        } catch(err) {
            showErrorMsg('Failed to load unread emails')
            console.error(err)
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy}))
    }

    function onChangeUnreadEmailNum(num) {
        setUnreadEmailNum(prevUnreadEmailNum => prevUnreadEmailNum + num)
    }

    async function onAddEmail(email) {
        try{
            const savedEmail = await emailService.save(email)
            if (emailService.checkEmailByFilter(savedEmail, filterBy))
                setEmails(prevEmails => [...prevEmails, savedEmail])
            showSuccessMsg('Successfully added email')
        } catch (err) {
            console.error(err)
            showErrorMsg('Failed to add email')
        }
        
    }

    async function onUpdateEmail(email) {
        try{
            const savedEmail = await emailService.save(email)
            setEmails(prevEmails => prevEmails.map(prevEmail => prevEmail.id === savedEmail.id ? savedEmail : prevEmail))
        } catch (err) {
            console.error(err)
        }
        
    }

    async function onDeleteEmail(emailId) {
        try {
            await emailService.remove(emailId)
            setEmails(prevEmails => prevEmails.filter(email => email.id !== emailId))
            showSuccessMsg('Successfully deleted email')
        } catch (err) {
            showErrorMsg('Failed to delete email')
            console.error(err);
        }
    }

    async function onToggleStarred(email) {
        try{
            email.isStarred = !email.isStarred
            const savedEmail = await emailService.save(email)
            if(filterBy.menu === 'starred') loadEmails()
            else setEmails(prevEmails => prevEmails.map(prevEmail => prevEmail.id === savedEmail.id ? savedEmail : prevEmail))
        } catch (err) {
            console.error(err)
        }
    }

    async function onToggleRead(email) {
        try{
            email.isRead = !email.isRead
            const savedEmail = await emailService.save(email)
            if(filterBy.isRead !== 'all') loadEmails()
            else setEmails(prevEmails => prevEmails.map(prevEmail => prevEmail.id === savedEmail.id ? savedEmail : prevEmail))
        } catch (err) {
            console.error(err)
        }
    }

    if(!emails) return <div>Loading...</div>
    const filterByFilter = {text: filterBy.text, isRead: filterBy.isRead, sortBy: filterBy.sortBy}
    const filterByMenu = {menu: filterBy.menu}
    return (
        <section className="email-index">
            <section className="layout">
                 <section className="filter">
                    <EmailFilter filterBy={filterByFilter} onSetFilter={onSetFilter} />
                </section> 
                <Link to={`/email/${params.menu}/new`} >
                    <button className="btn-compose" >
                        <img src={imgCompose} />
                        Compose
                    </button>
                </Link>
                <section className="aside">
                    <EmailMenu 
                        filterBy={filterByMenu} 
                        onSetFilter={onSetFilter} 
                        unreadEmailNum={unreadEmailNum}
                    />
                </section>
                <section className="main">
                    <EmailList 
                        emails={emails}
                        onDelete={onDeleteEmail}
                        onChangeUnreadEmailNum={onChangeUnreadEmailNum}
                        onToggleStarred={onToggleStarred}
                        onToggleRead={onToggleRead}
                    />
                </section>
            </section>
            {params.emailId && <Outlet context={{
                onAddEmail,
                onUpdateEmail, 
                onDeleteEmail}}
            />}
        </section>
    )
}