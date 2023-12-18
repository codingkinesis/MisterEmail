import imgTrash from '../assets/imgs/trash.png'

export function EmailDraft({ draft, onEditDraft, onSaveAndCloseDraft, onSubmitDraft, onDeleteDraft}) {

    function editDraft(ev) {
        const { name: feild, value } = ev.target
        const time = new Date().getTime()
        onEditDraft({...draft, [feild]: value , sentAt: time})
    }

    function saveAndCloseDraft() {
        const time = new Date().getTime()
        onSaveAndCloseDraft({...draft, sentAt: time})
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
        <form className="email-draft">
            <section className="header-draft">
                New Message
                <button className="save-and-close" type="button" onClick={saveAndCloseDraft}>X</button>  
            </section>
            <section className="main-draft">
                <label htmlFor="draft-to">To </label>
                <input type="text" onChange={(ev) => editDraft(ev)} value={to} id="draft-to" name="to"/>
                <label htmlFor="draft-subject">Subject </label>
                <input type="text" onChange={(ev) => editDraft(ev)} value={subject} id="draft-subject" name="subject"/>
                <label htmlFor="draft-body">Body </label>
                <input type="text" onChange={(ev) => editDraft(ev)} value={body} id="draft-body" name="body"/>
            </section>
            <section className="footer-draft">
                <button className="submit" type="submit" onClick={submitDraft}>Submit</button> 
                <button className="delete" type="button" onClick={onDeleteDraft}>
                    <img src={imgTrash} alt="Trash" />
                </button>
            </section>
        </form>
    )
}