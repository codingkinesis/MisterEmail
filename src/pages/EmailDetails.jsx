import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { emailService } from "../services/email.service"

export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadEmail()
    },[])

    async function loadEmail() {
        try{
            const email = await emailService.getById(params.emailId)
            markAsRead(email)
            setEmail(email)
        } catch(err) {
            console.error(err)
        }
    }

    async function markAsRead(email) {
        if(!email.isRead) {
            email.isRead = true
            emailService.save(email)
        }
    }

    if(!email) return <div>Loading...</div>
    return (
        <section className="email-details">
            <h1>from: {email.from}</h1>
            <h2>{email.subject}</h2>
            <hr />
            <p>{email.body}</p>
        </section>
    )
}