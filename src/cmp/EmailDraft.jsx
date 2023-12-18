import { useEffect, useState } from "react"

export function EmailDraft({ draft, onEditDraft, onSaveDraft, onSubmitDraft, onCancelDraft}) {

    function editDraft(ev) {
        const { name: feild, value } = ev.target
        const time = new Date().getTime()
        onEditDraft({...draft, [feild]: value , sentAt: time})
    }

    function saveDraft() {
        const time = new Date().getTime()
        onSaveDraft({...draft, sentAt: time})
    }

    function submitDraft(ev) {
        ev.preventDefault()
        if(isDraftReady()) {
            const time = new Date().getTime()
            onSubmitDraft({...draft, sentAt: time})
        } else {
            alert('The email is not properly composed.')
        }
    }

    function isDraftReady() {
        const { to, subject, body } = draft
        if (to.includes('@') && subject !== '' && body !== '')
            return true
        return false
    }

    const { to, subject, body } = draft
    return (
        <form className="email-draft container">
            <label htmlFor="draft-to">To:</label>
            <input type="text" onChange={(ev) => editDraft(ev)} value={to} id="draft-to" name="to"/>
            <br />
            <label htmlFor="draft-subject">Subject:</label>
            <input type="text" onChange={(ev) => editDraft(ev)} value={subject} id="draft-subject" name="subject"/>
            <hr />
            <label htmlFor="draft-body">Body:</label>
            <input type="text" onChange={(ev) => editDraft(ev)} value={body} id="draft-body" name="body"/>
            <br />
            <button type="submit" onClick={submitDraft}>Submit</button> 
            <button type="button" onClick={saveDraft}>Save</button> 
            <button type="button" onClick={onCancelDraft}>X</button> 
        </form>
    )
}