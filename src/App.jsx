import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { EmailIndex } from './pages/EmailIndex'
import { AppHeader } from './cmp/AppHeader'
import { EmailDetails } from './pages/EmailDetails'

export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader />

                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Email" element={<EmailIndex />} />
                        <Route path="/Email/:emailId" element={<EmailDetails />} />
                    </Routes>
                </main>

                <footer>
                    <section className="container">
                        Mails 2023 &copy;
                    </section>
                </footer>
            </section>
        </Router>

    )
}