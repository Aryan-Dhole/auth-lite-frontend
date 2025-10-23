import API from "../utils/axiosInstance";
import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";


export default function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }


            try {
                const res = await API.get("/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("Profile response:", res.data);
                setUser(res.data);
            } catch (err) {
                console.error("Profile fetch failed:", err);
                alert("Session expired or invalid token. Please log in again.");
                localStorage.removeItem("token");
                navigate("/login");
            }
        }

        fetchProfile();
    }, [navigate]);

    if (!user) return <p className="text-center mt-10">Loading profile...</p>;

    return (
        <div className="text-white bg-gray-900 h-screen p-8 flex flex-col justify-center items-center text-center">
            <h1 className="text-2xl font-bold mb-6">Welcome back!, {user.user.email}</h1>
            <p className="text-gray-500 mb-4">Your Token is secure 🔐</p>
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                }}
                className="bg-red-500 mt-30 px-4 py-2 rounded hover:scale-103"
            >
                Logout
            </button>
        </div>
    )
}

