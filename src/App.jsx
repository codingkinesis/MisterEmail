import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { EmailIndex } from './pages/EmailIndex'
import { AppHeader } from './cmp/AppHeader'
import { EmailDetails } from './pages/EmailDetails'
import { EmailDraft } from './cmp/EmailDraft'
import { UserMsg } from './cmp/userMsg'

export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/email/:menu" element={<EmailIndex />} >
                                <Route path="/email/:menu/:emailId?" element={<EmailDetails />} />
                        </Route>
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>

    )
}