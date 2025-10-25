import { useState, useEffect } from "react";
import API from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function IdeaVault() {
    const [ideas, setIdeas] = useState([]);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        fetchIdeas(token)
    }, [navigate])

    const fetchIdeas = async (token) => {
        try {
            setLoading(true)
            const res = await API.get("/ideas", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            setIdeas(res.data)
        } catch (err) {
            console.error("Fetch failed:", err);
        } finally {
            setLoading(false)
        }
    }

    const addIdea = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token");
        if (!title) return alert("Enter a title!");

        const newIdea = {
            title,
            description
        }

        setIdeas([newIdea, ...ideas])
        setTitle("")
        setDescription("")

        try {
            const res = await API.post("/ideas", { title, description }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTitle("");
            setDescription("");
            fetchIdeas(token)
            toast.success("Idea added successfully!")
        } catch (err) {
            console.error("Add failed:", err);
        }
    }


    const deleteIdea = async (id) => {
        const token = localStorage.getItem("token");

        setIdeas((prevIdeas) => prevIdeas.filter((Idea) => Idea._id !== id));

        try {
            await API.delete(`/ideas/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Idea deleted!");
        } catch (err) {
            console.error("Delete Failed:", err);
            toast.error("Delete failed, please retry.");
            fetchIdeas(token);
        }
    };



    return (
        <div className="min-h-screen bg-gray-900 text-white relative">
            {/* Logout top-right */}
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                }}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
                Logout
            </button>

            {/* Centered content */}
            <div className="mx-auto max-w-2xl px-6 pt-16">
                <h1 className="text-3xl font-bold mb-6 text-center">IdeaVault  💡</h1>

                {/* Form */}
                <form onSubmit={addIdea} className="mb-6">
                    <input
                        className="w-full border border-gray-700 bg-gray-800 p-2 mb-2 rounded"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="w-full border border-gray-700 bg-gray-800 p-2 mb-2 rounded"
                        placeholder="Description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 transition hover:scale-103 text-white px-4 py-2 rounded-lg shadow">
                        Add Idea
                    </button>
                </form>

                {/* Ideas centered */}
                <div className="space-y-3">
                    {ideas.length === 0 ? (
                        <p className="text-gray-400 text-center italic mt-12">Your vault is empty — start adding your genius 💡</p>
                    ) : (
                        ideas.map((idea) => (
                            <div
                                key={idea.id || idea._id}
                                className="border border-gray-700 bg-gray-800 rounded p-3 flex justify-between items-center transition-all duration-300 hover:scale-[1.01]"
                            >
                                <div>
                                    <h3 className="font-semibold">{idea.title}</h3>
                                    <p className="text-sm text-gray-400">{idea.description}</p>
                                </div>
                                <button
                                    onClick={() => deleteIdea(idea._id)}
                                    className="text-red-400 hover:text-red-500"
                                    aria-label="Delete"
                                    title="Delete"
                                >
                                    🗑
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );

}



