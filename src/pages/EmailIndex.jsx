import { useEffect, useState } from "react";
import { Link, Outlet, useParams} from "react-router-dom";
import { emailService } from "../services/email.service";
import { EmailList } from "../cmp/EmailList";
import { EmailFilter } from "../cmp/EmailFilter";
import { EmailMenu } from "../cmp/EmailMenu";
import imgCompose from '../assets/imgs/writing.png';

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())

    const params = useParams()

    useEffect(() => {
        loadEmails()
    },[filterBy])

    async function loadEmails() {
        try{
            const emails = await emailService.query(filterBy)
            setEmails(emails)
        } catch(err) {
            console.log('problem')
            console.error(err)
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy}))
    }

    async function onAddEmail(email) {
        try{
            const savedEmail = await emailService.save(email)
            if (emailService.checkEmailByFilter(savedEmail, filterBy))
                setEmails(prevEmails => [...prevEmails, savedEmail])
        } catch (err) {
            console.error(err)
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
        } catch (err) {
            console.error(err);
        }
    }

    console.log(params)

    if(!emails) return <div>Loading...</div>
    const filterByFilter = {text: filterBy.text, isRead: filterBy.isRead}
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
                    <EmailMenu filterBy={filterByMenu} onSetFilter={onSetFilter} />
                </section>
                <section className="main">
                    <EmailList 
                        emails={emails}
                        onDelete={onDeleteEmail}/>
                </section>
            </section>
            {params.emailId && <Outlet context={{
                onAddEmail,
                onUpdateEmail, 
                onDeleteEmail}}/>}
        </section>
    )
}