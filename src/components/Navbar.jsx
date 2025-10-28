import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axiosInstance";

export default function Navbar() {
    const [users, setUsers] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        API.get("/auth/profile", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => setUsers(res.data))
            .catch(() => setUsers(null));
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="flex justify-between items-center bg-gray-800 text-white px-6 py-3 shadow-lg">
            <h1
                onClick={() => navigate("/ideavault")}
                className="text-2xl font-bold cursor-pointer"
            >
                IdeaVault 💡
            </h1>

            <div className="relative">
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center space-x-2 hover:text-blue-400"
                >
                    <span>{users?.user.email || "Loading..."}</span>
                    <span>▼</span>
                </button>

                {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-gray-700 border border-gray-600 rounded shadow-lg text-sm">
                        <button
                            onClick={() => navigate("/profile")}
                            className="w-full text-left px-4 py-2 hover:bg-gray-600"
                        >
                            👤 View Profile
                        </button>
                        <button
                            onClick={logout}
                            className="w-full text-left px-4 py-2 hover:bg-gray-600 text-red-400"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
