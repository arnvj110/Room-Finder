import { useState } from "react"




import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signup(email, password);
      toast.success("Registered Successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2b2b2b] px-4">
      <div className="w-full max-w-md bg-[#1f1f1f] rounded-xl shadow-xl p-8 border border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-100 text-center mb-6">
          Sign In
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                className="w-full bg-[#2b2b2b] text-gray-100 pl-10 pr-3 py-2 rounded-md border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                className="w-full bg-[#2b2b2b] text-gray-100 pl-10 pr-10 py-2 rounded-md border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center gap-2"
          >
            {loading && (
              <span
                className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                aria-hidden="true"
              />
            )}

            <span>
              {loading ? "Signing in..." : "Sign Up"}
            </span>
          </button>
        </form>
        

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to={"/login"} >
          <span className="text-indigo-400 hover:text-indigo-300">
            Login
          </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
