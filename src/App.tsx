import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Button from "./components/Button";
import Navigation from "./components/Navigation";
import { NavigationItem } from "./enums/navigation";
import Users from "./routes/users";

function App() {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);

    return (
        <div className="container">
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Navigation activeNavigationItem={NavigationItem.HOME} />
                            <Button className="m-3" outline={true} style="primary" onClick={() => setCount((count) => count + 1)}>
                                count is {count}
                            </Button>
                            <a href="#" onClick={() => navigate("/users")}>
                                Users
                            </a>
                        </>
                    }
                />

                <Route
                    path="/users"
                    element={
                        <>
                            <Navigation activeNavigationItem={NavigationItem.USERS} />
                            <Users />
                        </>
                    }
                />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
