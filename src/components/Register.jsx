import { useState } from "react";
import API from "../utils/axiosInstance";


function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMesaage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/register", { email, password });
            setMesaage(res.data.msg || "Registered successfully!")
        } catch (err) {
            setMesaage(err.response?.data?.msg || "Registration Failed!")
        };

    };


    return (
        <div className="h-screen flex justify-center items-center text-white bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 shadow-xl rounded-2xl w-96 space-y-4"
            >
                <h2
                    className="text-2xl font-bold text-center ">
                    Register
                </h2>

                <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border w-full p-2 rounded"
                    required
                />

                <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border w-full p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Register
                </button>
                {message && (
                    <p className="text-center text-sm text-gray-300 mt-2">{message}</p>
                )}
            </form>
        </div>

    )

}

export default Register;