import { useState } from "react";
import API from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            setMessage(res.data.msg || "Login Successful!");
            toast.success("Login Successful!")
            console.log(res.data);
            navigate("/ideavault")

        } catch (err) {
            setMessage("Login failed. Please check the credentials.");
            toast.error("Login failed!")
        }
    }

    return (
        <div className="flex justify-center h-screen items-center text-white bg-gray-900 ">
            <div className="max-w-sm mx-auto bg-gray-900 p-6 rounded-2xl shadow-lg">
                <form
                    className="bg-gray-800 p-8 rounded-2xl shadow-md w-100 pb-12"
                    onSubmit={handleLogin}
                >
                    <h2 className="text-2xl font-semibold underline mb-6 text-center">
                        Login
                    </h2>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className=" w-full rounded-xl border p-2 mb-4"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=" w-full rounded-xl border p-2 mb-8"
                    />

                    <button
                        type="submit"
                        className="w-full rounded-xl py-2 px-4 bg-violet-600 hover:scale-103 transition-transform hover:bg-violet-700 "
                    >
                        Login
                    </button>
                    <p className="text-center text-gray-400 mt-4">
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="text-blue-400 hover:text-blue-500 cursor-pointer underline"
                        >
                            Register
                        </span>
                    </p>


                    {message && (
                        <p className="text-sm text-gray-300 text-center mt-10">{message}</p>
                    )

                    }
                </form>
            </div>
        </div>
    )



}

export default Login