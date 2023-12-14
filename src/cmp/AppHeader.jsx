import { NavLink } from "react-router-dom";

export function AppHeader() {

    return <header className="app-header">
        <section className="container">
            <h1>Mister Email</h1>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/Email">Email</NavLink>
            </nav> 
        </section>
    </header>
}