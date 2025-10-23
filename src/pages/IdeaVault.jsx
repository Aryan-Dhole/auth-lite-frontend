import { useState, useEffect } from "react";
import API from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";


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
            const res = await API.get("/ideas", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            setIdeas(res.data)
        } catch (err) {
            console.error("Fetch failed:", err);
        }
    }

    const addIdea = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token");
        if (!title) return alert("Enter a title!");

        try {
            const res = await API.post("/ideas", { title, description }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTitle("");
            setDescription("");
            fetchIdeas(token)
        } catch (err) {
            console.error("Add failed:", err);
        }
    }


    const deleteIdea = async (id) => {
        const token = localStorage.getItem("token");
        try {
            await API.delete(`/ideas/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchIdeas(token);
        } catch (err) {
            console.error("Delete Failed:", err);
        }
    };


    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
            <h1 className="text-3xl font-bold mb-4 text-center">💡 IdeaVault</h1>

            <form onSubmit={addIdea} className="mb-6">
                <input
                    className="w-full border p-2 mb-2 rounded"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="w-full border p-2 mb-2 rounded"
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Idea
                </button>
            </form>

            <div className="space-y-3">
                {ideas.length === 0 ? (
                    <p className="text-gray-500 text-center">No ideas yet.</p>
                ) : (
                    ideas.map((idea) => (
                        <div
                            key={idea._id}
                            className="border rounded p-3 flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-semibold">{idea.title}</h3>
                                <p className="text-sm text-gray-600">{idea.description}</p>
                            </div>
                            <button
                                onClick={() => deleteIdea(idea._id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                🗑
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )

}



