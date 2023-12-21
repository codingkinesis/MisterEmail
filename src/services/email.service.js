import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter,
    getUser
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
const STORAGE_KEY = 'emails'

_createEmails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        const { text, isRead, menuOption} = filterBy
        emails = emails.filter(email =>{
            return _checkEmailMenuOption(email, menuOption)
            &&_doesEmailContainText(email, text)
            && _checkEmailByIsRead(email, isRead)
        })
    }
    return emails
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function createEmail(subject, body, sentAt, from, to) {
    return {
        subject: subject,
        body: body, 
        isRead: true,
        isStarred: false,
        sentAt : sentAt,
        removedAt : null, //for later use
        from: from,
        to: to
    }
}

function getDefaultFilter() {
    return {
        text: '',
        isRead: 'all',
        menuOption: 'inbox' // options: inbox, sent, draft
    }
}

function getUser() {
    return loggedinUser
}

function _checkEmailMenuOption({ from, to }, menuOption) {
    switch(menuOption) {
        case 'inbox':
            return to === loggedinUser.email
        case 'sent': 
            return from === loggedinUser.email
        case 'draft': 
            return from === null
        default:
            console.log('_checkEmailMenuOption: option not found')
            return false
    }
}

function _doesEmailContainText({ from, subject, body }, txt) {
    const txtCheck= new RegExp(txt, 'i')
    return txtCheck.test(from) || txtCheck.test(subject) || txtCheck.test(body)
}

function _checkEmailByIsRead({ isRead }, isReadFilter) {
    if(isReadFilter === 'all') return true
    if(isReadFilter === 'read' && isRead) return true
    if(isReadFilter === 'unread' && !isRead) return true
    return false
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (true) {
        const emails = [
            {id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes.', 
            isRead: false,
            isStarred: false,
            sentAt : 1591133930594,
            removedAt : null, //for later use
            from: 'momo@momo.com',
            to: loggedinUser.email},

            {id: 'e102',
            subject: 'Hello again',
            body: `We met last time, so now we're meating again.`,
            isRead: false,
            isStarred: false,
            sentAt : 1564133930594,
            removedAt : null, //for later use
            from: 'gron@gron.com',
            to: loggedinUser.email},

            {id: 'e103',
            subject: 'Please stop',
            body: 'Would you please stop calling the cops every time my dog barks at you.', 
            isRead: false,
            isStarred: false,
            sentAt : 1559135930594,
            removedAt : null, //for later use
            from: 'doggy@doggy.com',
            to: loggedinUser.email},

            {id: 'e104',
            subject: 'Thanks again $$',
            body: `I'll send you the cash once the police stop looking for the body. Where did you end up hiding it.`,
            isRead: false,
            isStarred: false,
            sentAt : 1551136208594,
            removedAt : null, //for later use
            from: 'ghj@ghj.com',
            to: loggedinUser.email,},

            {id: 'e105',
            subject: 'Great movie!',
            body: `I really enjoyed the movie you advised me to watch.`,
            isRead: true,
            isStarred: false,
            sentAt : 1565136208594,
            removedAt : null, //for later use
            from: loggedinUser.email,
            to: 'jojo@jojo',}
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}