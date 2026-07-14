"use client"
import { useState } from "react"

const languages = ["English", "Spanish", "French"]

const materials = {
  English: {
    ages: [
      {
        ageGroup: "Ages 3-6 (Early Learners)",
        color: "from-pink-500 to-rose-500",
        items: [
          { title: "Cambridge Power Up (Starters)", type: "Course Book", icon: "📕", desc: "Fun, bright activities to start learning English." },
          { title: "Phonics Fun", type: "Interactive", icon: "🔤", desc: "Learn letters and sounds with songs." },
          { title: "Action Songs", type: "Audio/Video", icon: "🎵", desc: "Sing and dance to learn new words!" }
        ]
      },
      {
        ageGroup: "Ages 7-12 (Young Learners)",
        color: "from-blue-500 to-indigo-500",
        items: [
          { title: "Cambridge Power Up (Movers & Flyers)", type: "Course Book", icon: "📗", desc: "Develop essential skills for school success." },
          { title: "Grammar Friends", type: "Workbook", icon: "✏️", desc: "Clear grammar explanations with fun activities." },
          { title: "Short Stories Library", type: "Reading", icon: "📖", desc: "Exciting stories to improve reading skills." }
        ]
      },
      {
        ageGroup: "Ages 13+ (Teens)",
        color: "from-purple-500 to-violet-500",
        items: [
          { title: "Cambridge English Empower", type: "Course Book", icon: "📘", desc: "Mixed-ability learning with real-world topics." },
          { title: "TED Talks for Students", type: "Video", icon: "🎬", desc: "Watch inspiring talks and learn presentation skills." },
          { title: "Writing Masterclass", type: "Interactive", icon: "📝", desc: "Write essays, emails, and creative stories." }
        ]
      }
    ],
    songs: [
      { title: "Hello Song", desc: "The perfect start to every class!", emoji: "👋" },
      { title: "Colors Everywhere", desc: "Learn colors while singing along.", emoji: "🎨" },
      { title: "The Alphabet Chant", desc: "A catchy way to remember ABCs.", emoji: "🔤" },
      { title: "Days of the Week", desc: "Master Monday to Sunday.", emoji: "📅" }
    ],
    stories: [
      { title: "The Very Hungry Caterpillar", level: "Beginner", emoji: "🐛" },
      { title: "The Gruffalo", level: "Beginner", emoji: "🦉" },
      { title: "Charlie and the Chocolate Factory", level: "Intermediate", emoji: "🍫" },
      { title: "Diary of a Wimpy Kid", level: "Advanced", emoji: "📓" }
    ]
  },
  Spanish: { ages: [], songs: [], stories: [] },
  French: { ages: [], songs: [], stories: [] }
}

export default function Curriculum() {
  const [activeLang, setActiveLang] = useState("English")
  const [activeTab, setActiveTab] = useState("courses")

  const currentLangData = materials[activeLang]

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900">Learning Materials</h1>
          <p className="text-gray-500 mt-3 text-lg">World-class curriculum, songs, and stories for young learners</p>
        </div>

        <div className="flex justify-center gap-4 mb-10">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`px-6 py-2 rounded-full font-bold transition ${
                activeLang === lang
                  ? "bg-blue-600 text-white shadow-lg"
                  : lang === "English" ? "bg-blue-100 text-blue-600 hover:bg-blue-200" : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={lang !== "English"}
            >
              {lang === "English" ? "🇬🇧" : lang === "Spanish" ? "🇪🇸" : "🇫🇷"} {lang}
              {lang !== "English" && " (Soon)"}
            </button>
          ))}
        </div>

        {activeLang === "English" && (
          <>
            <div className="flex gap-2 mb-8 bg-white p-1 rounded-xl shadow-sm w-fit mx-auto">
              {["courses", "songs", "stories"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-lg font-medium transition capitalize ${
                    activeTab === tab ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "courses" && (
              <div className="space-y-10">
                {/* POWER UP VIDEO SECTION */}
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Cambridge Power Up Level 1</h2>
                  <p className="text-gray-500 mb-6">Watch the official video walkthrough for Level 1 below.</p>
                  <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
                    <iframe 
                      className="w-full h-full" 
                      src="//player.bilibili.com/player.html?bvid=BV1UA4m1w76o&page=1" 
                      scrolling="no" 
                      border="0" 
                      frameBorder="no" 
                      framespacing="0" 
                      allowFullScreen={true}
                    ></iframe>
                  </div>
                </div>

                {currentLangData.ages.map((group) => (
                  <div key={group.ageGroup}>
                    <h2 className={`text-2xl font-bold text-white bg-gradient-to-r ${group.color} w-fit px-6 py-2 rounded-full mb-6`}>
                      {group.ageGroup}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {group.items.map((item, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition group">
                          <div className="text-5xl mb-4 group-hover:scale-110 transition">{item.icon}</div>
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{item.type}</span>
                          <h3 className="text-xl font-bold text-gray-900 mt-3">{item.title}</h3>
                          <p className="text-gray-500 mt-2 text-sm">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "songs" && (
              <div className="grid md:grid-cols-2 gap-6">
                {currentLangData.songs.map((song, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-6">
                    <div className="text-5xl">{song.emoji}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{song.title}</h3>
                      <p className="text-gray-500 text-sm">{song.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "stories" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentLangData.stories.map((story, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center text-7xl">
                      {story.emoji}
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{story.level}</span>
                      <h3 className="font-bold text-gray-900 mt-2">{story.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeLang !== "English" && (
          <div className="text-center py-20 bg-white rounded-2xl">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-gray-900">Coming Soon!</h2>
            <p className="text-gray-500 mt-2">We are working hard to bring you {activeLang} materials.</p>
          </div>
        )}

      </div>
    </main>
  )
}