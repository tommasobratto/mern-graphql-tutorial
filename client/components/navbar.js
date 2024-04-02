import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light"></nav>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <img
                        style={{ "width": 25 + '%' }}
                        src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"
                    />
                </NavLink>
                <div className="btn-wrapper navbar">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/create">
                                Create Record
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}