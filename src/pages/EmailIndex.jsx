import { useEffect, useState } from "react";
import { EmailList } from "../cmp/EmailList";
import { emailService } from "../services/email.service";
import { EmailFilter } from "../cmp/EmailFilter";
import { EmailDraft } from "../cmp/EmailDraft";
import imgCompose from '../assets/imgs/writing.png';
import { EmailMenu } from "../cmp/EmailMenu";

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    const [draft, setDraft] = useState(null)

    useEffect(() => {
        loadEmails()
    },[emails, filterBy, draft])

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
            setDraft(emailService.createEmail('','',0,null,''))
    }

    function onEditDraft(draftEdit) {
        setDraft(prevDraft => ({...prevDraft, ...draftEdit}))
    }

    async function onSaveDraft(draftEdit) {
        try{
            const savedDraft = await emailService.save(draftEdit)
            setDraft(prevDraft => ({...prevDraft, ...savedDraft}))
        } catch (err) {
            alert('Failed to save draft.')
            //console.error(err)
        }
        
    }

    function onSubmitDraft(draftEdit) {
        try{
            emailService.save({...draftEdit, from: emailService.getUser().email})
            setDraft(null)
        } catch (err) {
            alert('Failed to submit draft.')
            //console.error(err)
        }
    }

    function onCancelDraft() {
        console.log('canceled')
        setDraft(null)
    }

    function onOpenDraft(draft) {
        setDraft(draft)
    }

    if(!emails) return <div>Loading...</div>
    const filterByFilter = {text: filterBy.text, isRead: filterBy.isRead}
    const filterByMenu = {menuOption: filterBy.menuOption}
    return (
        <section className="email-index">
            <section className="layout">
                <button className="btn-compose" onClick={composeEmail}>
                    <img src={imgCompose} />
                    Compose
                </button>
                <section className="filter">
                    <EmailFilter filterBy={filterByFilter} onSetFilter={onSetFilter}/>
                </section>
                <section className="aside">
                    <EmailMenu filterBy={filterByMenu} onSetFilter={onSetFilter}/>
                </section>
                <section className="main">
                    <EmailList 
                        emails={emails}
                        onDelete={onDeleteEmail}
                        onOpenDraft={onOpenDraft}/>
                </section>
            </section>
            {draft && <EmailDraft  
                draft={draft}
                onEditDraft={onEditDraft}
                onSaveDraft={onSaveDraft}  
                onSubmitDraft={onSubmitDraft}
                onCancelDraft={onCancelDraft}/>}
        </section>
    )
}