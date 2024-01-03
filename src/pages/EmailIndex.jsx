import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useParams, useSearchParams} from "react-router-dom";
import { emailService } from "../services/email.service";
import { EmailList } from "../cmp/EmailList";
import { EmailFilter } from "../cmp/EmailFilter";
import { EmailMenu } from "../cmp/EmailMenu";
import imgCompose from '../assets/imgs/writing.png';
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { EmailDraft } from "../cmp/EmailDraft";
import { Drafts } from "@mui/icons-material";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";

export function EmailIndex() {
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [emails, setEmails] = useState(null)
    const displayedEmails = useRef(null)
    const [unreadEmailNum, setUnreadEmailNum] = useState(0)
    const [filterBy, setFilterBy] = useState({...emailService.getFilterFromParams(searchParams), menu: params.menu})
    const [draftId, setDraftId] = useState(searchParams.get('compose') || null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        loadUnreadEmailNum()
        loadAllEmails()
    },[])

    useEffectUpdate(() => {
        updateSearchParams(draftId)
        loadDisplayedEmails()
    },[filterBy, emails])

    async function loadAllEmails() {
        try{
            const emails = await emailService.query(filterBy)
            setEmails(emails)
        } catch(err) {
            showErrorMsg('Failed to load emails')
            console.error(err)
        }
    }

    function updateSearchParams(draftId) {
        let searchFilter = {}
        if (filterBy.text !== '') searchFilter.text = filterBy.text
        if (filterBy.isRead !== 'all') searchFilter.isRead = filterBy.isRead
        if (filterBy.sortBy !== 'date') searchFilter.sortBy = filterBy.sortBy
        if (draftId !== null) searchFilter.compose = draftId
        setSearchParams(searchFilter)
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

    function loadDisplayedEmails() {
        let emailsForDisplay = emails.filter(email => emailService.checkEmailByFilter(email, filterBy))
        emailsForDisplay = emailService.sortEmailsByFilter(emailsForDisplay, filterBy)
        displayedEmails.current = emailsForDisplay
    }

    function onChangeUnreadEmailNum(num) {
        setUnreadEmailNum(prevUnreadEmailNum => prevUnreadEmailNum + num)
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy}))
    }

    async function onAddEmail(email) {
        try{
            const savedEmail = await emailService.save(email)
            setEmails(prevEmail => [...prevEmails, savedEmail])  
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
            showErrorMsg('Failed to update email')
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
            setEmails(prevEmails => prevEmails.map(prevEmail => prevEmail.id === savedEmail.id ? savedEmail : prevEmail))
        } catch (err) {
            console.error(err)
        }
    }

    async function onToggleRead(email) {
        try{
            email.isRead = !email.isRead
            const savedEmail = await emailService.save(email)
            setEmails(prevEmails => prevEmails.map(prevEmail => prevEmail.id === savedEmail.id ? savedEmail : prevEmail))
        } catch (err) {
            console.error(err)
        }
    }

    function updateDraftId(draftId) {
        setDraftId(draftId)
        updateSearchParams(draftId)
    }

    if(!displayedEmails.current) return <div>Loading...</div>
    const filterByFilter = {text: filterBy.text, isRead: filterBy.isRead, sortBy: filterBy.sortBy}
    const filterByMenu = {menu: filterBy.menu}
    return (
        <section className="email-index">
            <section className="layout">
                <section className="filter">
                    <button className="btn-hamberger" onClick={() => setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)}>
                        <MenuIcon />
                    </button>
                    <EmailFilter filterBy={filterByFilter} onSetFilter={onSetFilter} />
                </section> 
                <button className="btn-compose" onClick={() =>  updateDraftId('new')} >
                    <img src={imgCompose} />
                    Compose
                </button>
                <section className={`aside ${!isMenuOpen && 'hidden'}`}>
                    <button className="btn-hamberger" onClick={() => setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)}>
                        <MenuOpenIcon />
                    </button>
                    <EmailMenu 
                        filterBy={filterByMenu} 
                        onSetFilter={onSetFilter} 
                        unreadEmailNum={unreadEmailNum}
                    />
                </section>
                <section className="main">
                    {params.emailId 
                    ?
                    <Outlet />
                    :
                    <EmailList 
                        emails={displayedEmails.current}
                        onOpenDraft={updateDraftId}
                        onDelete={onDeleteEmail}
                        onChangeUnreadEmailNum={onChangeUnreadEmailNum}
                        onToggleStarred={onToggleStarred}
                        onToggleRead={onToggleRead}
                    />
                    }
                </section>
            </section>
            {searchParams.get('compose') && <EmailDraft
                draftId={draftId}
                updateDraftId={updateDraftId}
                onAddEmail={onAddEmail}
                onUpdateEmail={onUpdateEmail}
                onDeleteEmail={onDeleteEmail}
            />}
        </section>
    )
}