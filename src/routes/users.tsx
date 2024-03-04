import { useEffect, useState } from "react";

async function getUsers(): Promise<string[]> {
    const url = (import.meta.env.VITE_API_URL as string) + "users";

    console.log("Request users form", url);
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log("data", data);
            return data;
        } else {
            console.log("no data", response);
        }
    } catch (error) {
        console.error("Error:", error);
    }
    return [];
}

function Users() {
    const [users, setUsers] = useState<string[]>([]);

    useEffect(() => {
        getUsers().then((items) => {
            setUsers(items);
        });
    }, []);

    return (
        <div>
            <h2>{import.meta.env.API_URL}</h2>
            {users.map((user, index) => (
                <div key={index}>
                    {index}: {user}
                </div>
            ))}
        </div>
    );
}

export default Users;
