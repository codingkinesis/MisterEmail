import { useEffect, useState } from "react"

export function EmailDraft({ draft, onEditDraft, onSubmitDraft, onCancelDraft}) {
    const [draftEdit, setDraftEdit] = useState(draft)

    function handleChange(ev) {
        const { name: feild, value } = ev.target
        setDraftEdit(prevDraft => ({...prevDraft, [feild]: value }))
    }

    useEffect(() => {
        onEditDraft(draftEdit)
    },[draftEdit])

    function submitDraft(ev) {
        ev.preventDefault()
        onSubmitDraft()
    }

    const { to, subject, body } = draftEdit
    return (
        <form className="email-draft container">
            <label htmlFor="draft-to">To:</label>
            <input type="text" onChange={(ev) => handleChange(ev)} value={to} id="draft-to" name="to"/>
            <br />
            <label htmlFor="draft-subject">Subject:</label>
            <input type="text" onChange={(ev) => handleChange(ev)} value={subject} id="draft-subject" name="subject"/>
            <hr />
            <label htmlFor="draft-body">Body:</label>
            <input type="text" onChange={(ev) => handleChange(ev)} value={body} id="draft-body" name="body"/>
            <br />
            <button type="submit" onClick={submitDraft}>Submit</button> 
            <button type="button" onClick={onCancelDraft}>X</button> 
        </form>
    )
}