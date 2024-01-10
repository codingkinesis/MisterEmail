import { useEffect, useState } from 'react'
import imgTrash from '../assets/imgs/trash.png'
import { emailService } from '../services/email.service'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'

export function EmailDraft({ draftId, updateDraftId, onAddEmail, onUpdateEmail, onDeleteEmail }) {
    const [draft , setDraft] = useState()
    

    useEffect(() => {
        if(draftId === 'new') setDraft(emailService.createEmail())
        else if (draftId) loadEmail()
    },[draftId])

    async function loadEmail() {
        try {
            const email = await emailService.getById(draftId)
            setDraft(email)
        } catch (error) {
            console.log(error)
        }
    }

    function handleChange(ev) {
        const { name: feild, value, type } = ev.target
        setDraft(prevDraft => ({...prevDraft, [feild]: value}))
    }
        
    function onDeleteDraft() {
        if (draft.id) onDeleteEmail(draft.id)
        updateDraftId(null)
    }

    function saveAndCloseDraft() {
        saveDraft(draft)
        updateDraftId(null)
    }
    
    function submitDraft(ev) {
        ev.preventDefault()
        if(isDraftReady()) {
            const user = emailService.getUser().email
            saveDraft({...draft, from: user})
            updateDraftId(null)
        } else {
            alert('The email is not properly composed.')
        }
    }
    
    function saveDraft(draft) {
        draft.sentAt = new Date().getTime()
        if (draft.id) onUpdateEmail(draft)
        else onAddEmail(draft)
    }

    function isDraftReady() {
        const { to, subject, body } = draft
        if (to.includes('@') && subject !== '' && body !== '')
            return true
        return false
    }

    if(!draft) return <div>Loading...</div>
    const { to, subject, body, id } = draft
    return (
        <form className="email-draft" onSubmit={submitDraft}>
            <section className="header-draft">
                <h1>{id ? 'Edit' : 'New'} Message</h1>
                <button className="save-and-close" type="button" onClick={saveAndCloseDraft}>X</button>  
            </section>
            <section className="main-draft">
                <label htmlFor="draft-to">To </label>
                <input type="text" onChange={(ev) => handleChange(ev)} value={to} id="draft-to" name="to"/>
                <label htmlFor="draft-subject">Subject </label>
                <input type="text" onChange={(ev) => handleChange(ev)} value={subject} id="draft-subject" name="subject"/>
                <label htmlFor="draft-body">Body </label>
                <input type="text" onChange={(ev) => handleChange(ev)} value={body} id="draft-body" name="body"/>
            </section>
            <section className="footer-draft">
                <button className="submit" type="submit">Submit</button> 
                <button className="delete" type="button" onClick={onDeleteDraft}>
                    <img src={imgTrash} alt="Trash" />
                </button>
            </section>
        </form>
    )
}