"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

export default function Login() {
  const router = useRouter()

  const getSupabase = () => createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  const [isLogin, setIsLogin] = useState(true)
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState("parent")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAuth = async (e: any) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const supabase = getSupabase()

    if (isLogin) {
      const { data: existingUser, error } = await supabase.from("users").select("*").eq("phone", phone).eq("password", password).eq("roles", selectedRole).limit(1)
      if (error || !existingUser || existingUser.length === 0) { setError("Wrong phone/password, or wrong role selected"); setLoading(false); return }
      localStorage.setItem("userRole", existingUser[0].roles)
      router.push("/dashboard")
    } else {
      const { data: checkUser } = await supabase.from("users").select("*").eq("phone", phone).limit(1)
      if (checkUser && checkUser.length > 0) { setError("This phone is already registered. Please login instead."); setLoading(false); return }
      const { error } = await supabase.from("users").insert([{ phone, password, roles: selectedRole }])
      if (error) { setError("Registration failed: " + (error?.message || "Unknown error")); setLoading(false); return }
      localStorage.setItem("userRole", selectedRole)
      router.push("/dashboard")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center py-12 px-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{isLogin ? "Welcome Back!" : "Create Account"}</h1>
          <p className="text-gray-500 mt-2">{isLogin ? "Login to your account" : "Register a new account"}</p>
        </div>
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button onClick={() => { setIsLogin(true); setError("") }} className={"flex-1 py-2.5 rounded-lg font-medium transition " + (isLogin ? "bg-white shadow text-blue-600" : "text-gray-500")}>Login</button>
          <button onClick={() => { setIsLogin(false); setError("") }} className={"flex-1 py-2.5 rounded-lg font-medium transition " + (!isLogin ? "bg-white shadow text-blue-600" : "text-gray-500")}>Register</button>
        </div>
        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl mb-4 text-center">{error}</div>}
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Who are you?</label>
            <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white"><option value="parent">Parent</option><option value="teacher">Teacher</option><option value="admin">Administrator</option></select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white" placeholder="+86 138 0000 0000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white" placeholder="********" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-xl font-bold text-lg hover:shadow-lg transition disabled:opacity-50">{loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}</button>
        </form>
        <button onClick={() => router.push("/")} className="w-full mt-6 text-gray-400 hover:text-gray-600 text-sm transition">← Back to Home Page</button>
      </div>
    </main>
  )
}