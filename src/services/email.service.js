import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter,
    getFilterFromParams,
    checkEmailByFilter,
    getUser,
    getUnreadEmailNum,
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
        emails = emails.filter(email => checkEmailByFilter(email, filterBy))
        emails = _sortEmailsByFilter(emails, filterBy.sortBy)
    }
    return emails
}


async function getUnreadEmailNum() {
    const emails = await storageService.query(STORAGE_KEY)
    let unreadEmails 
    unreadEmails = emails.filter(email => !email.isRead)
    return unreadEmails.length
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

function createEmail() {
    return {
        subject: '',
        body: '', 
        isRead: true,
        isStarred: false,
        sentAt : 0,
        removedAt : null, //for later use
        from: '',
        to: ''
    }
}

function getDefaultFilter() {
    return {
        text: '',
        isRead: 'all',
        menu: 'inbox',
        sortBy: 'date'
    }
}

function getFilterFromParams(params) {
    const defaultFilter = getDefaultFilter()
    let filterBy = {}
    for(let field in defaultFilter) {
        filterBy[field] = params.get(field) || defaultFilter[field]
    }
    return filterBy
}

function getUser() {
    return loggedinUser
}

function checkEmailByFilter(email, filterBy) {
    const { text, isRead, menu } = filterBy
    
    return _checkEmailMenu(email, menu)
        && _doesEmailContainText(email, text)
        && _checkEmailByIsRead(email, isRead)
}

function _checkEmailMenu({ from, to ,isStarred}, menu) {
    switch(menu) {
        case 'inbox':
            return to === loggedinUser.email
        case 'starred': 
            return isStarred
        case 'sent': 
            return from === loggedinUser.email
        case 'drafts': 
            return from === ''
        default:
            console.log('_checkEmailMenu: option not found')
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

function _sortEmailsByFilter(emails, sortBy) {
    let newEmailList = []
    if(sortBy === 'subject') {
        newEmailList = emails.sort((e1,e2) => (e1.subject).localeCompare(e2.subject))
    }
    if(sortBy === 'date') {
        newEmailList = emails.sort((e1,e2) => e2.sentAt - e1.sentAt)
    }

    return newEmailList
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || emails.length === 0) {
        // const emails = [
        //     {id: 'e101',
        //     subject: 'Miss you!',
        //     body: 'Would love to catch up sometimes.', 
        //     isRead: false,
        //     isStarred: false,
        //     sentAt : 1591133930594,
        //     removedAt : null, //for later use
        //     from: 'momo@momo.com',
        //     to: loggedinUser.email},

        //     {id: 'e102',
        //     subject: 'Hello again',
        //     body: `We met last time, so now we're meating again.`,
        //     isRead: false,
        //     isStarred: false,
        //     sentAt : 1564133930594,
        //     removedAt : null, //for later use
        //     from: 'gron@gron.com',
        //     to: loggedinUser.email},

        //     {id: 'e103',
        //     subject: 'Please stop',
        //     body: 'Would you please stop calling the cops every time my dog barks at you.', 
        //     isRead: false,
        //     isStarred: false,
        //     sentAt : 1559135930594,
        //     removedAt : null, //for later use
        //     from: 'doggy@doggy.com',
        //     to: loggedinUser.email},

        //     {id: 'e104',
        //     subject: 'Thanks again $$',
        //     body: `I'll send you the cash once the police stop looking for the body. Where did you end up hiding it.`,
        //     isRead: false,
        //     isStarred: false,
        //     sentAt : 1551136208594,
        //     removedAt : null, //for later use
        //     from: 'ghj@ghj.com',
        //     to: loggedinUser.email,},

        //     {id: 'e105',
        //     subject: 'Great movie!',
        //     body: `I really enjoyed the movie you advised me to watch.`,
        //     isRead: true,
        //     isStarred: false,
        //     sentAt : 1565136208594,
        //     removedAt : null, //for later use
        //     from: loggedinUser.email,
        //     to: 'jojo@jojo',}
        // ]

        
        let emails = []
        // inbox
        for(let i = 0; i < 20; i++) {
            let email = _createRandomEmail()
            email.to = loggedinUser.email
            email.key = email.id
            if(i<10) email.isRead = true
            emails.push(email)
        }
        // sent
        for(let i = 0; i < 10; i++) {
            let email = _createRandomEmail()
            email.from = loggedinUser.email
            email.isRead = true
            email.key = email.id
            emails.push(email)
        }
        // drafts
        for(let i = 0; i < 10; i++) {
            let email = _createRandomEmail()
            email.from = ''
            email.isRead = true
            email.key = email.id
            emails.push(email)
        }
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

function _createRandomEmail() {
    return {
        id: utilService.makeId(),
        subject: utilService.makerRandomWords(4),
        body: utilService.makerRandomWords(20), 
        isRead: false,
        isStarred: false,
        sentAt : Math.floor(Math.random() * (1701133930594 - 1501133930594) + 1401133930594),
        removedAt : null, //for later use
        from: `${utilService.makerRandomWords(1)}@${utilService.makerRandomWords(1)}`,
        to: `${utilService.makerRandomWords(1)}@${utilService.makerRandomWords(1)}`,
    }
}