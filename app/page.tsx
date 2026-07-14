import Link from "next/link"

export default function Home() {
  return (
    <main>
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-medium">Welcome to the Future of Learning</span>
            <h1 className="text-6xl font-bold mt-6 leading-tight">
              Learn English<br/>
              <span className="text-yellow-300">The Fun Way!</span>
            </h1>
            <p className="text-xl mt-6 text-white/80 max-w-lg">
              Join thousands of young learners mastering English with live classes, interactive flashcards, and fun activities.
            </p>
            <div className="flex gap-4 mt-8">
              <Link href="/register" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition">
                Start Learning Free
              </Link>
              <Link href="/video-room" className="border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition">
                Watch Demo
              </Link>
            </div>
            <div className="flex gap-8 mt-10">
              <div><span className="text-3xl font-bold">5000+</span><p className="text-white/70">Students</p></div>
              <div><span className="text-3xl font-bold">200+</span><p className="text-white/70">Teachers</p></div>
              <div><span className="text-3xl font-bold">50+</span><p className="text-white/70">Courses</p></div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 shadow-2xl">
            <video 
              className="w-full h-80 rounded-2xl object-cover shadow-lg" 
              controls 
              autoPlay 
              muted 
              loop 
              playsInline
              src="/Mike.mp4"
            >
              Your browser does not support the video tag.
            </video>
            <p className="mt-4 text-white/90 font-medium text-center">Watch Our Amazing Classes!</p>
          </div>

        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Everything You Need to Learn</h2>
            <p className="text-gray-500 mt-4 text-lg">Our platform provides all the tools for effective language learning</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/video-room" className="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-xl transition">
              <div className="text-5xl mb-4">📹</div>
              <h3 className="text-xl font-bold text-gray-900">Live Video Room</h3>
              <p className="text-gray-500 mt-2">Real-time classes with screen sharing and transcription</p>
              <span className="text-blue-600 font-medium mt-4 block">Join Room </span>
            </Link>
            <Link href="/flashcards" className="group bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition">
              <div className="text-5xl mb-4">🃏</div>
              <h3 className="text-xl font-bold text-gray-900">Fun Flashcards</h3>
              <p className="text-gray-500 mt-2">Learn alphabets with pictures and voice</p>
              <span className="text-green-600 font-medium mt-4 block">Start Learning </span>
            </Link>
            <Link href="/calendar" className="group bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-xl transition">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-gray-900">Smart Calendar</h3>
              <p className="text-gray-500 mt-2">Track class schedules and teacher availability</p>
              <span className="text-purple-600 font-medium mt-4 block">View Calendar </span>
            </Link>
            <Link href="/dashboard" className="group bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl hover:shadow-xl transition">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900">Parent Dashboard</h3>
              <p className="text-gray-500 mt-2">Track progress, payments, and development</p>
              <span className="text-pink-600 font-medium mt-4 block">Go to Dashboard </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold">Ready to Start Your Journey?</h2>
          <p className="text-xl mt-4 text-white/80">Join thousands of students already learning with us. Free to start!</p>
          <Link href="/register" className="inline-block mt-8 bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition">
            Create Free Account
          </Link>
        </div>
      </section>
    </main>
  )
}