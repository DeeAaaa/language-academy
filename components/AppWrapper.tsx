"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/", icon: "🏠", label: "Home" },
  { href: "/calendar", icon: "📅", label: "Calendar" },
  { href: "/flashcards", icon: "🃏", label: "Cards" },
  { href: "/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/video-room", icon: "🎥", label: "Video" }
]

export default function AppWrapper({ children }) {
  const [dark, setDark] = useState(false)
  const pathname = usePathname()
  const showMobileNav = pathname !== "/register" && pathname !== "/video-room"

  useEffect(() => {
    const saved = localStorage.getItem("darkMode")
    if (saved === "true") {
      setDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDark = () => {
    const newDark = !dark
    setDark(newDark)
    localStorage.setItem("darkMode", String(newDark))
    if (newDark) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }

  return (
    <>
      <button onClick={toggleDark} className="fixed bottom-24 md:bottom-6 right-4 z-50 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center text-xl hover:scale-110 transition">
        {dark ? "☀️" : "🌙"}
      </button>

      {showMobileNav && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
          <div className="flex justify-around py-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={"flex flex-col items-center py-1 px-3 text-xs transition " + (pathname === item.href ? "text-blue-600" : "text-gray-400")}>
                <span className="text-xl">{item.icon}</span>
                <span className="mt-1">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {children}
    </>
  )
}