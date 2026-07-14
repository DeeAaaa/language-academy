import './globals.css'
import AppWrapper from '../components/AppWrapper'

export const metadata = {
  title: 'Language Academy - Learn English Fun Way',
  description: 'Online and offline language teaching for young learners',
}

const base = "/language-academy"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <AppWrapper>
          <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
              <a href={base + "/"} className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Language Academy</a>
              <div className="hidden md:flex items-center gap-6">
                <a href={base + "/"} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Home</a>
                <a href={base + "/curriculum"} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Curriculum</a>
                <a href={base + "/resources"} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Resources</a>
                <a href={base + "/video-room"} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Video Room</a>
                <a href={base + "/calendar"} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Calendar</a>
                <a href={base + "/flashcards"} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Flashcards</a>
                <a href={base + "/dashboard"} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Dashboard</a>
                <a href={base + "/register"} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg transition text-sm">Sign Up</a>
              </div>
              <details className="md:hidden relative">
                <summary className="list-none text-gray-600 dark:text-gray-300 cursor-pointer p-1">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </summary>
                <div className="absolute top-full right-0 w-56 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-lg mt-2 p-4 space-y-2 z-50">
                  <a href={base + "/"} className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Home</a>
                  <a href={base + "/curriculum"} className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Curriculum</a>
                  <a href={base + "/resources"} className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Resources</a>
                  <a href={base + "/video-room"} className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Video Room</a>
                  <a href={base + "/calendar"} className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Calendar</a>
                  <a href={base + "/flashcards"} className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Flashcards</a>
                  <a href={base + "/dashboard"} className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Dashboard</a>
                  <a href={base + "/register"} className="block mt-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-full font-medium">Sign Up</a>
                </div>
              </details>
            </div>
          </nav>

          <div className="pb-20 md:pb-0">{children}</div>

          <footer className="bg-gray-900 text-white py-12 px-4 pb-28 md:pb-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h3 className="text-xl font-bold mb-4">Language Academy</h3>
                <p className="text-gray-400">Making language learning fun and interactive for young learners.</p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Quick Links</h4>
                <div className="flex flex-col gap-2 text-gray-400">
                  <a href={base + "/"} className="hover:text-white">Home</a>
                  <a href={base + "/curriculum"} className="hover:text-white">Curriculum</a>
                  <a href={base + "/video-room"} className="hover:text-white">Video Room</a>
                  <a href={base + "/register"} className="hover:text-white">Register</a>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <p className="text-gray-400">Email: info@languageacademy.com</p>
                <p className="text-gray-400">Phone: +86 123 4567 8900</p>
              </div>
            </div>
          </footer>
        </AppWrapper>
      </body>
    </html>
  )
}