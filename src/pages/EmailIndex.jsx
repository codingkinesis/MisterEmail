import { useEffect, useState } from "react";
import { EmailList } from "../cmp/EmailList";
import { emailService } from "../services/email.service";
import { EmailFilter } from "../cmp/EmailFilter";
import imgCompose from '../assets/imgs/writing.png';
import { EmailDraft } from "../cmp/EmailDraft";

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    const [draft, setDraft] = useState(null)

    useEffect(() => {
        loadEmails()
    },[emails, filterBy])

    async function loadEmails() {
        try{
            const emails = await emailService.query(filterBy)
            setEmails(emails)
        } catch(err) {
            console.log('problem')
            console.error(err)
        }
    }

    async function onDeleteEmail(emailId) {
        try {
            await emailService.remove(emailId)
            setEmails(prevEmails => {
                return prevEmails.filter(email => email.id !== emailId)
            })
        } catch (err) {
            console.error(err);
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy}))
    }

    function composeEmail() {
        if(!draft)
            setDraft(emailService.createEmail('','',0,emailService.getUser.email,''))
    }

    function onEditDraft(draftEdit) {
        setDraft(prevDraft => ({...prevDraft, ...draftEdit}))
    }

    function onSubmitDraft() {
        console.log('submited')
        setDraft(null)
    }

    function onCancelDraft() {
        console.log('canceled')
        setDraft(null)
    }

    if(!emails) return <div>Loading...</div>
    return (
        <section className="email-index">
            <section className="left">
                <button className="btn-compose" onClick={composeEmail}>
                    <img src={imgCompose} />
                    Compose
                </button>
            </section>
            <section className="right">
                <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter}/>
                <EmailList emails={emails} onDelete={onDeleteEmail}/>
            </section>
            {draft && <EmailDraft  
                draft={draft} 
                onEditDraft={onEditDraft}  
                onSubmitDraft={onSubmitDraft} 
                onCancelDraft={onCancelDraft}/>}
        </section>
    )
}