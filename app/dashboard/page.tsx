"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

export default function Dashboard() {
  const router = useRouter()
  const [role, setRole] = useState(null)
  const [dbStatus, setDbStatus] = useState("Checking...")
  const [users, setUsers] = useState<any[]>([])
  const [showUsers, setShowUsers] = useState(false)
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({ phone: "", password: "", roles: "parent" })
  const [addError, setAddError] = useState("")
  const [deleteLoading, setDeleteLoading] = useState<any>(null)
  const [todayClasses, setTodayClasses] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [showPayments, setShowPayments] = useState(false)
  const [showAddPayment, setShowAddPayment] = useState(false)
  const [newPayment, setNewPayment] = useState({ student_name: "", amount: "", payment_date: new Date().toISOString().split("T")[0], description: "" })
  const [paymentError, setPaymentError] = useState("")
  const [totalIncome, setTotalIncome] = useState(0)

  const getSupabase = () => createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const today = new Date().toISOString().split("T")[0]

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole")
    if (!savedRole) { router.push("/register") } else { setRole(savedRole) }
    const supabase = getSupabase()
    supabase.from("users").select("*").limit(1).then(({ data, error }) => {
      if (error) setDbStatus("Connected, but users table not created yet")
      else setDbStatus("Database Connected Successfully!")
    }).catch(() => setDbStatus("Connection Error"))
    loadTodayClasses()
    loadPayments()
  }, [router])

  const loadTodayClasses = async () => {
    const { data } = await getSupabase().from("classes").select("*").eq("date", today).order("start_time", { ascending: true })
    if (data) setTodayClasses(data)
  }

  const loadPayments = async () => {
    const { data } = await getSupabase().from("payments").select("*").order("payment_date", { ascending: false })
    if (data) { setPayments(data); setTotalIncome(data.reduce((sum: number, p: any) => sum + parseFloat(p.amount), 0)) }
  }

  const loadUsers = async () => {
    const { data } = await getSupabase().from("users").select("*").order("created_at", { ascending: false })
    if (data) setUsers(data)
    setShowUsers(true)
  }

  const handleAddUser = async (e: any) => {
    e.preventDefault()
    setAddError("")
    const { data: existing } = await getSupabase().from("users").select("*").eq("phone", newUser.phone).limit(1)
    if (existing && existing.length > 0) { setAddError("This phone number already exists"); return }
    const { error } = await getSupabase().from("users").insert([newUser])
    if (error) { setAddError("Failed: " + error.message) } else { setNewUser({ phone: "", password: "", roles: "parent" }); setShowAddUser(false); loadUsers() }
  }

  const handleDeleteUser = async (id: any) => { setDeleteLoading(id); await getSupabase().from("users").delete().eq("id", id); loadUsers(); setDeleteLoading(null) }

  const handleAddPayment = async (e: any) => {
    e.preventDefault()
    setPaymentError("")
    if (!newPayment.student_name || !newPayment.amount) { setPaymentError("Please fill in student name and amount"); return }
    const { error } = await getSupabase().from("payments").insert([{ ...newPayment, amount: parseFloat(newPayment.amount) }])
    if (error) { setPaymentError("Failed: " + error.message) } else { setNewPayment({ student_name: "", amount: "", payment_date: new Date().toISOString().split("T")[0], description: "" }); setShowAddPayment(false); loadPayments() }
  }

  const handleDeletePayment = async (id: any) => { await getSupabase().from("payments").delete().eq("id", id); loadPayments() }
  const handleLogout = () => { localStorage.removeItem("userRole"); router.push("/") }

  if (!role) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>
  const roleName = role === "parent" ? "Parent" : role === "teacher" ? "Teacher" : "Administrator"

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-3 flex items-center justify-between -mx-6 -mt-12 mb-8 rounded-b-2xl shadow-sm">
          <a href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Language Academy</a>
          <div className="flex items-center gap-4"><span className="text-sm font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full">{roleName}</span><button onClick={handleLogout} className="text-gray-500 dark:text-gray-400 hover:text-red-600 text-sm font-medium">Logout</button></div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back!</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">What would you like to do today?</p>
        <div className={"p-5 rounded-2xl border-2 mb-8 " + (dbStatus.includes("Successfully") ? "border-green-400 bg-green-50 dark:bg-green-900/20" : "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20")}><div className="flex items-center gap-3"><div className={"w-3 h-3 rounded-full " + (dbStatus.includes("Successfully") ? "bg-green-500" : "bg-yellow-500")}></div><p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{dbStatus}</p></div></div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="text-xl font-bold text-gray-900 dark:text-white">📅 Today&apos;s Classes</h2><p className="text-gray-400 text-sm">{today}</p></div>
            <button onClick={() => router.push("/calendar")} className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Full Calendar →</button>
          </div>
          {todayClasses.length === 0 ? (<div className="text-center py-8 text-gray-400"><div className="text-4xl mb-2">📭</div><p>No classes scheduled for today</p><button onClick={() => router.push("/calendar")} className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">+ Add a class</button></div>) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{todayClasses.map((cls: any) => (<div key={cls.id} className="border dark:border-gray-700 rounded-xl p-4"><div className="flex items-center justify-between mb-3"><span className="bg-blue-100 dark:bg-blue-900 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium">{cls.type}</span><span className="text-gray-400 text-xs">{cls.start_time} - {cls.end_time}</span></div><p className="font-bold text-gray-900 dark:text-white">{cls.student}</p></div>))}</div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">💰 Payment Overview</h2>
            <div className="flex gap-2"><button onClick={() => { setShowAddPayment(!showAddPayment); setShowPayments(false) }} className="text-blue-600 hover:text-blue-800 text-sm font-medium">+ Add Payment</button><span className="text-gray-300 dark:text-gray-600">|</span><button onClick={() => { loadPayments(); setShowPayments(!showPayments); setShowAddPayment(false) }} className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-green-600">¥{totalIncome.toLocaleString()}</p><p className="text-green-600/70 text-sm mt-1">Total Income</p></div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-blue-600">{payments.length}</p><p className="text-blue-600/70 text-sm mt-1">Payments</p></div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-purple-600">{payments.length > 0 ? "¥" + Math.round(totalIncome / payments.length).toLocaleString() : "¥0"}</p><p className="text-purple-600/70 text-sm mt-1">Average</p></div>
          </div>
          {showAddPayment && (
            <form onSubmit={handleAddPayment} className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl space-y-3">
              {paymentError && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-600 text-sm p-3 rounded-xl">{paymentError}</div>}
              <div className="grid md:grid-cols-2 gap-3"><input type="text" placeholder="Student name" value={newPayment.student_name} onChange={(e) => setNewPayment({ ...newPayment, student_name: e.target.value })} className="border dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-2.5" /><input type="number" placeholder="Amount (¥)" value={newPayment.amount} onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })} className="border dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-2.5" /></div>
              <div className="grid md:grid-cols-2 gap-3"><input type="date" value={newPayment.payment_date} onChange={(e) => setNewPayment({ ...newPayment, payment_date: e.target.value })} className="border dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-2.5" /><input type="text" placeholder="Description (optional)" value={newPayment.description} onChange={(e) => setNewPayment({ ...newPayment, description: e.target.value })} className="border dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-2.5" /></div>
              <div className="flex gap-2"><button type="submit" className="bg-green-600 text-white px-8 py-2.5 rounded-xl font-medium hover:bg-green-700">Save Payment</button><button type="button" onClick={() => setShowAddPayment(false)} className="bg-gray-200 dark:bg-gray-600 dark:text-white px-8 py-2.5 rounded-xl font-medium hover:bg-gray-300">Cancel</button></div>
            </form>
          )}
          {showPayments && (
            <div className="mt-6 space-y-2 max-h-64 overflow-y-auto">
              {payments.length === 0 ? (<p className="text-center text-gray-400 py-6">No payments recorded yet</p>) : (payments.map((p: any) => (<div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"><div><p className="font-medium text-gray-900 dark:text-white">{p.student_name}</p><p className="text-gray-400 text-xs">{p.payment_date} {p.description ? "- " + p.description : ""}</p></div><div className="flex items-center gap-3"><span className="font-bold text-green-600">¥{parseFloat(p.amount).toLocaleString()}</span><button onClick={() => handleDeletePayment(p.id)} className="text-red-400 hover:text-red-600 text-sm">✕</button></div></div>)))}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button onClick={() => { setShowAddUser(!showAddUser); setShowUsers(false) }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 text-left hover:shadow-xl transition border border-transparent hover:border-blue-200"><div className="text-4xl mb-3">👤</div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Manage Users</h3><p className="text-gray-500 dark:text-gray-400 mt-1">Create parents, teachers and admins</p></button>
          <button onClick={loadUsers} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 text-left hover:shadow-xl transition border border-transparent hover:border-blue-200"><div className="text-4xl mb-3">📊</div><h3 className="text-xl font-bold text-gray-900 dark:text-white">All Users</h3><p className="text-gray-500 dark:text-gray-400 mt-1">View and delete users</p></button>
          <button onClick={() => router.push("/calendar")} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 text-left hover:shadow-xl transition border border-transparent hover:border-blue-200"><div className="text-4xl mb-3">📅</div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Class Schedule</h3><p className="text-gray-500 dark:text-gray-400 mt-1">Manage times and dates</p></button>
          <button onClick={() => router.push("/video-room")} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 text-left hover:shadow-xl transition border border-transparent hover:border-blue-200"><div className="text-4xl mb-3">🎥</div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Video Room</h3><p className="text-gray-500 dark:text-gray-400 mt-1">Start a live class</p></button>
        </div>

        {showAddUser && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add New User</h2>
            {addError && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-600 text-sm p-3 rounded-xl mb-4">{addError}</div>}
            <form onSubmit={handleAddUser}>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label><input type="tel" required value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5" placeholder="+86 138 0000 0000" /></div>
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label><input type="text" required value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5" placeholder="********" /></div>
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label><select value={newUser.roles} onChange={(e) => setNewUser({ ...newUser, roles: e.target.value })} className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2.5"><option value="parent">Parent</option><option value="teacher">Teacher</option><option value="admin">Administrator</option></select></div>
              </div>
              <div className="flex gap-3"><button type="submit" className="bg-green-600 text-white px-8 py-2.5 rounded-xl font-medium hover:bg-green-700">Add User</button><button type="button" onClick={() => setShowAddUser(false)} className="bg-gray-200 dark:bg-gray-600 dark:text-white px-8 py-2.5 rounded-xl font-medium hover:bg-gray-300">Cancel</button></div>
            </form>
          </div>
        )}

        {showUsers && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Users ({users.length})</h2><button onClick={() => setShowUsers(false)} className="text-gray-400 hover:text-gray-600 text-sm">Close</button></div>
            {users.length === 0 ? (<div className="p-12 text-center text-gray-400"><div className="text-5xl mb-4">📭</div><p>No users found.</p></div>) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700"><tr><th className="text-left px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Phone</th><th className="text-left px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Role</th><th className="text-left px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Created</th><th className="text-right px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Action</th></tr></thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">{users.map((user: any) => (<tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700"><td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{user.phone}</td><td className="px-6 py-4"><span className={"text-xs font-bold px-2.5 py-1 rounded-full " + (user.roles === "admin" ? "bg-red-100 dark:bg-red-900 text-red-600" : user.roles === "teacher" ? "bg-blue-100 dark:bg-blue-900 text-blue-600" : "bg-green-100 dark:bg-green-900 text-green-600")}>{user.roles}</span></td><td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}</td><td className="px-6 py-4 text-right"><button onClick={() => handleDeleteUser(user.id)} disabled={deleteLoading === user.id} className="text-red-400 hover:text-red-600 text-sm font-medium disabled:opacity-50">{deleteLoading === user.id ? "Deleting..." : "Delete"}</button></td></tr>))}</tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}