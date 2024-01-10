import imgLogo from '../assets/imgs/logo.png';

export function AppHeader() {

    return <header className="app-header">
        <section className="container">
            <div className="logo">
                    <img src={imgLogo} />
                    Mister Email
            </div>
        </section>
    </header>
}