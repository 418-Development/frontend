import { NavigationItem } from "../enums/navigation";
import logo from "../assets/Logo418-light.png";
import { useNavigate } from "react-router-dom";

interface Props {
    activeNavigationItem: NavigationItem;
}

function Navigation({ activeNavigationItem }: Props) {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-3" />
                <a className="navbar-brand" href="#">
                    418 Development
                </a>

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

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeNavigationItem === NavigationItem.HOME ? "active" : ""}`}
                                aria-current="page"
                                href="/"
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                Home
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeNavigationItem === NavigationItem.USERS ? "active" : ""}`}
                                onClick={() => {
                                    navigate("/users");
                                }}
                            >
                                User
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
