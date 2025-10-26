import { useState, useEffect } from "react";
import API from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function IdeaVault() {
    const [ideas, setIdeas] = useState([]);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(null)
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false)
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
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!title) return alert("Enter a title!");

        try {
            setAdding(true)
            const res = await API.post("/ideas", { title, description }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Use the actual saved idea with _id from MongoDB
            setIdeas((prev) => [res.data, ...prev]);
            fetchIdeas(token)
            setTitle("");
            setDescription("");
            toast.success("Idea added successfully!");
        } catch (err) {
            console.error("Add failed:", err);
            toast.error("Failed to add idea");
        } finally {
            setAdding(false)
        }
    };



    const deleteIdea = async (id) => {
        const token = localStorage.getItem("token");

        try {
            // Optimistic UI update
            setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea._id !== id));

            // API request
            const res = await API.delete(`/ideas/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchIdeas(token)
            toast.success("Idea deleted!");
            console.log("Deleted:", res.data);
        } catch (err) {
            console.error("Delete Failed:", err.response?.data || err.message);
            toast.error("Delete failed, please retry.");
        }
    };

    const SkeletonIdea = () => (
        <div className="border border-gray-700 bg-gray-800 rounded p-3 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-2/3"></div>
        </div>
    );


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
                    <button
                        disabled={adding}
                        className={`${adding ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            } transition hover:scale-103 text-white px-4 py-2 rounded-lg shadow`}
                    >
                        {adding ? "Adding..." : "Add Idea"}
                    </button>
                </form>

                {/* Ideas centered */}
                <div className="space-y-3">
                    {loading ? (
                        <>
                            <SkeletonIdea />
                            <SkeletonIdea />
                            <SkeletonIdea />
                        </>
                    ) : ideas.length === 0 ? (
                        <p className="text-gray-400 text-center italic mt-12">Your vault is empty — start adding your genius 💡</p>
                    ) : (
                        ideas.map((idea) => (
                            <div
                                key={idea._id}
                                className="border border-gray-700 bg-gray-800 rounded p-3 flex justify-between items-center transition-all duration-300 hover:scale-[1.01]"
                            >
                                <div>
                                    <h3 className="font-semibold">{idea.title}</h3>
                                    <p className="text-sm text-gray-400">{idea.description}</p>
                                </div>
                                <button
                                    onClick={() => setConfirmDelete(idea._id)}
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
                {confirmDelete && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center max-w-sm shadow-lg">
                            <h2 className="text-lg font-semibold mb-4 text-white">
                                Are you sure you want to delete this idea?
                            </h2>
                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={() => {
                                        deleteIdea(confirmDelete);
                                        setConfirmDelete(null);
                                    }}
                                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={() => setConfirmDelete(null)}
                                    className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );

}



