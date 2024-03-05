import { useEffect, useState } from "react";
import Button from "../components/Button";

function Users() {
    const [users, setUsers] = useState<string[]>([]);
    const [userInput, setUserInput] = useState<string>("");

    const getUsers = async () => {
        const url = (import.meta.env.VITE_API_URL as string) + "users";

        console.log("Request users from", url);
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log("data", data);
            setUsers(data);
        } else {
            console.log("Failed to get users", response);
            setUsers([]);
        }
    };

    const addUser = async (username: string) => {
        const url = (import.meta.env.VITE_API_URL as string) + "users";

        console.log("Request users form", url);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: username,
            });

            if (response.ok) {
                getUsers();
            } else {
                console.log("Response not ok", response);
            }
        } catch (error) {
            console.error("Error:", error);
        }
        return [];
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <h2>Add new User</h2>
            <div>
                <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                <Button
                    className="ms-3"
                    onClick={() => {
                        addUser(userInput);
                        setUserInput("");
                    }}
                >
                    Add
                </Button>
            </div>
            <hr />
            <h2>Users</h2>
            {users.map((user, index) => (
                <div key={index}>
                    {index}: {user}
                </div>
            ))}
        </div>
    );
}

export default Users;
