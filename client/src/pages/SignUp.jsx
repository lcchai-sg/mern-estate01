import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [errdet, setErrdet] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("/api/auth/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
            setError(data.message);
            setErrdet(data.details);
            setLoading(false);
            return;
        }
        setLoading(false);
        setError(null);
        navigate("/signin");
    };

    return (
        <div className="pad-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">
                Sign Up Account
            </h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="username"
                    className="border p-3 rounded-lg"
                    id="username"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="email"
                    className="border p-3 rounded-lg"
                    id="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="password"
                    className="border p-3 rounded-lg"
                    id="password"
                    onChange={handleChange}
                />
                <button
                    disabled={loading}
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? "Loading..." : "Sign up"}
                </button>
                <OAuth />
            </form>
            <div className="flex gap-2 mt-5">
                <p>Have an account?</p>
                <Link to={"/signin"}>
                    <span className="text-blue-700">Sign In</span>
                </Link>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
            {errdet && <p className="text-red-500 mt-5">{errdet}</p>}
        </div>
    );
}
