"use client"
import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

let supabase: any = null
if (typeof window !== "undefined") {
  supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [classes, setClasses] = useState<any[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newClass, setNewClass] = useState({ start_time: "09:00", end_time: "10:00", student: "", type: "English" })
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadClasses() }, [])

  const loadClasses = async () => {
    if (!supabase) return
    setLoading(true)
    const { data } = await supabase.from("classes").select("*").order("date", { ascending: true })
    if (data) setClasses(data)
    setLoading(false)
  }

  const getDaysInMonth = (date: any) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date: any) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))

  const formatDate = (day: number) => {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return d.toISOString().split("T")[0]
  }

  const getClassesForDate = (dateStr: string) => classes.filter((c: any) => c.date === dateStr)

  const addClass = async () => {
    if (!supabase || !selectedDate || !newClass.student) return
    const { error } = await supabase.from("classes").insert([{ ...newClass, date: selectedDate }])
    if (!error) { setNewClass({ start_time: "09:00", end_time: "10:00", student: "", type: "English" }); setShowAddForm(false); loadClasses() }
  }

  const deleteClass = async (id: any) => { if (supabase) { await supabase.from("classes").delete().eq("id", id); loadClasses() } }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const selectedClasses = selectedDate ? getClassesForDate(selectedDate) : []

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Class Calendar</h1>
          <button onClick={loadClasses} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">🔄 Refresh</button>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200">◀ Prev</button>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{currentDate.toLocaleString("default", { month: "long", year: "numeric" })}</h2>
              <button onClick={nextMonth} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200">Next ▶</button>
            </div>
            {loading ? (<div className="text-center py-20 text-gray-400">Loading classes...</div>) : (
              <div className="grid grid-cols-7 gap-1">
                {daysOfWeek.map((day) => (<div key={day} className="text-center font-bold text-gray-500 py-2 text-sm">{day}</div>))}
                {Array.from({ length: firstDay }).map((_, i) => (<div key={"e-" + i} className="p-2"></div>))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const dateStr = formatDate(day)
                  const dayClasses = getClassesForDate(dateStr)
                  const isSelected = selectedDate === dateStr
                  const isToday = dateStr === new Date().toISOString().split("T")[0]
                  return (
                    <button key={day} onClick={() => setSelectedDate(dateStr)} className={"p-3 rounded-xl text-left transition hover:bg-gray-100 dark:hover:bg-gray-700 " + (isSelected ? "bg-blue-600 text-white hover:bg-blue-700" : "")}>
                      <div className={"font-bold " + (isToday && !isSelected ? "text-blue-600" : "")}>{day}{isToday && <span className="ml-1 text-xs">●</span>}</div>
                      {dayClasses.length > 0 && <div className={"text-xs mt-1 font-medium " + (isSelected ? "text-blue-200" : "text-blue-600")}>{dayClasses.length} class{dayClasses.length > 1 ? "es" : ""}</div>}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{selectedDate ? "Classes for " + selectedDate : "Select a date"}</h3>
            {selectedDate && (<>
              <div className="space-y-3 mb-6">
                {selectedClasses.map((cls: any) => (
                  <div key={cls.id} className="border dark:border-gray-700 rounded-xl p-4">
                    <div className="flex justify-between items-start">
                      <div><span className="bg-blue-100 dark:bg-blue-900 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">{cls.type}</span><p className="font-bold mt-2 text-gray-900 dark:text-white">{cls.student}</p><p className="text-gray-500 dark:text-gray-400 text-sm">{cls.start_time} - {cls.end_time}</p></div>
                      <button onClick={() => deleteClass(cls.id)} className="text-red-400 hover:text-red-600 text-lg font-bold">✕</button>
                    </div>
                  </div>
                ))}
                {selectedClasses.length === 0 && <p className="text-gray-400 text-center py-8">No classes scheduled</p>}
              </div>
              {!showAddForm ? (<button onClick={() => setShowAddForm(true)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700">+ Add Class</button>) : (
                <div className="space-y-3">
                  <input type="text" placeholder="Student name" value={newClass.student} onChange={(e) => setNewClass({ ...newClass, student: e.target.value })} className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="time" value={newClass.start_time} onChange={(e) => setNewClass({ ...newClass, start_time: e.target.value })} className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2" />
                    <input type="time" value={newClass.end_time} onChange={(e) => setNewClass({ ...newClass, end_time: e.target.value })} className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2" />
                  </div>
                  <select value={newClass.type} onChange={(e) => setNewClass({ ...newClass, type: e.target.value })} className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2"><option>English</option><option>Spanish</option><option>French</option></select>
                  <div className="flex gap-2"><button onClick={addClass} className="flex-1 bg-green-600 text-white py-2 rounded-xl font-medium hover:bg-green-700">Save</button><button onClick={() => setShowAddForm(false)} className="flex-1 bg-gray-200 dark:bg-gray-600 dark:text-white py-2 rounded-xl font-medium hover:bg-gray-300">Cancel</button></div>
                </div>
              )}
            </>)}
          </div>
        </div>
      </div>
    </main>
  )
}