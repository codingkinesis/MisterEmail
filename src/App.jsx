import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'
import { EmailIndex } from './pages/EmailIndex'
import { AppHeader } from './cmp/AppHeader'
import { EmailDetails } from './pages/EmailDetails'
import { UserMsg } from './cmp/userMsg'

export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/inbox" replace={true} />} />
                        <Route path="/:menu" element={<EmailIndex />} >
                                <Route path="/:menu/:emailId?" element={<EmailDetails />} />
                        </Route>
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>

    )
}