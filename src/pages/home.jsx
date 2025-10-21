import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center">
            <h1 className="text-4xl font-bold text-gray-400 mb-6">
                Welcome to Auth-Lite 🚀
            </h1>
            <p className="text-gray-200 mb-8 text-lg">
                Simple authentication made powerful — login or create your account.
            </p>

            <div className="flex gap-4">
                <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-all"
                >
                    Login
                </button>

                <button
                    onClick={() => navigate("/register")}
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl font-medium hover:bg-gray-400 transition-all"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Home;
