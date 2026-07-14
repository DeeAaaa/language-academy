"use client"
import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

let supabase: any = null
if (typeof window !== "undefined") {
  supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

const quizQuestions = [
  { question: "What letter does 'Apple' start with?", options: ["A", "B", "C", "D"], answer: "A" },
  { question: "What animal says 'Meow'?", options: ["Dog", "Cat", "Bird", "Fish"], answer: "Cat" },
  { question: "How do you say 'Hello' in English?", options: ["Goodbye", "Thank you", "Hello", "Sorry"], answer: "Hello" },
  { question: "What color is the sky?", options: ["Red", "Green", "Blue", "Yellow"], answer: "Blue" },
  { question: "How many legs does a dog have?", options: ["2", "3", "4", "5"], answer: "4" },
  { question: "What is the opposite of 'big'?", options: ["Small", "Tall", "Fast", "Happy"], answer: "Small" },
  { question: "Which one is a fruit?", options: ["Carrot", "Banana", "Fish", "Egg"], answer: "Banana" },
  { question: "What day comes after Monday?", options: ["Sunday", "Wednesday", "Tuesday", "Friday"], answer: "Tuesday" },
  { question: "How do you say 'Thank you' in English?", options: ["Sorry", "Please", "Thank you", "Hello"], answer: "Thank you" },
  { question: "What animal lives in water?", options: ["Cat", "Dog", "Fish", "Bird"], answer: "Fish" },
  { question: "What color is a banana?", options: ["Red", "Blue", "Yellow", "Green"], answer: "Yellow" },
  { question: "How many eyes do you have?", options: ["1", "2", "3", "4"], answer: "2" },
  { question: "Which one can fly?", options: ["Fish", "Dog", "Bird", "Cat"], answer: "Bird" },
  { question: "What season comes after Summer?", options: ["Winter", "Spring", "Autumn", "Summer"], answer: "Autumn" },
  { question: "What is the plural of 'cat'?", options: ["Cats", "Cates", "Catis", "Caties"], answer: "Cats" }
]

export default function Resources() {
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answers, setAnswers] = useState<any[]>([])
  const [studentName, setStudentName] = useState("")
  const [showNameInput, setShowNameInput] = useState(true)
  const [savedScores, setSavedScores] = useState<any[]>([])
  const [saveStatus, setSaveStatus] = useState("")

  useEffect(() => { loadScores() }, [])

  const loadScores = async () => {
    if (!supabase) return
    const { data } = await supabase.from("quiz_scores").select("*").order("created_at", { ascending: false }).limit(10)
    if (data) setSavedScores(data)
  }

  const startQuiz = () => { if (studentName.trim()) setShowNameInput(false) }

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option)
    const isCorrect = option === quizQuestions[currentQ].answer
    if (isCorrect) setScore(score + 1)
    setAnswers([...answers, { question: quizQuestions[currentQ].question, selected: option, correct: quizQuestions[currentQ].answer, isCorrect }])
    setTimeout(() => {
      if (currentQ < quizQuestions.length - 1) { setCurrentQ(currentQ + 1); setSelectedAnswer(null) }
      else { setShowResult(true); saveScore() }
    }, 1000)
  }

  const saveScore = async () => {
    if (!supabase) return
    setSaveStatus("Saving...")
    const { error } = await supabase.from("quiz_scores").insert([{ student_name: studentName, score, total: quizQuestions.length }])
    if (error) setSaveStatus("Failed to save")
    else { setSaveStatus("Saved!"); loadScores() }
  }

  const restartQuiz = () => { setCurrentQ(0); setScore(0); setShowResult(false); setSelectedAnswer(null); setAnswers([]); setSaveStatus("") }
  const getEmoji = () => { const p = score / quizQuestions.length; if (p === 1) return "🏆"; if (p >= 0.8) return "🌟"; if (p >= 0.6) return "😊"; if (p >= 0.4) return "👍"; return "💪" }
  const getMessage = () => { const p = score / quizQuestions.length; if (p === 1) return "Perfect Score!"; if (p >= 0.8) return "Excellent work!"; if (p >= 0.6) return "Good job!"; if (p >= 0.4) return "Not bad!"; return "Keep learning!" }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">Learning Resources</h1>
        <p className="text-gray-500 dark:text-gray-400 text-center text-lg mb-12">Watch videos, read articles, and take fun quizzes!</p>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-700 p-2"><video className="w-full h-64 rounded-xl object-cover bg-black" controls src="/language-academy/Mike.mp4" /></div>
            <div className="p-6"><span className="bg-green-100 dark:bg-green-900 text-green-600 text-xs px-3 py-1 rounded-full font-medium">Self-Hosted</span><h3 className="text-xl font-bold text-gray-900 dark:text-white mt-3">Short Welcome Video</h3><p className="text-gray-500 dark:text-gray-400 mt-2">A quick look at our academy.</p></div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-700 p-2 aspect-video"><iframe className="w-full h-full rounded-xl" src="//player.bilibili.com/player.html?bvid=BV1GJ411x7h7&page=1" scrolling="no" border="0" frameBorder="no" framespacing="0" allowFullScreen={true}></iframe></div>
            <div className="p-6"><span className="bg-pink-100 dark:bg-pink-900 text-pink-600 text-xs px-3 py-1 rounded-full font-medium">Bilibili Embed</span><h3 className="text-xl font-bold text-gray-900 dark:text-white mt-3">Full English Lesson</h3><p className="text-gray-500 dark:text-gray-400 mt-2">Hosted on Bilibili for free.</p></div>
          </div>
        </div>
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Reading Corner</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 hover:shadow-lg transition"><div className="text-4xl mb-4">📖</div><h3 className="text-lg font-bold text-gray-900 dark:text-white">Why Reading Matters</h3><p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Reading English books helps children learn new words naturally.</p></div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 hover:shadow-lg transition"><div className="text-4xl mb-4">🗣️</div><h3 className="text-lg font-bold text-gray-900 dark:text-white">Tips for Speaking</h3><p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Don&apos;t be afraid to make mistakes!</p></div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 hover:shadow-lg transition"><div className="text-4xl mb-4">🎵</div><h3 className="text-lg font-bold text-gray-900 dark:text-white">Learn with Songs</h3><p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Singing English songs is a fun way to remember vocabulary.</p></div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">Fun English Quiz</h2>
              <p className="text-gray-400 text-center text-sm mb-8">{quizQuestions.length} questions — test your English!</p>
              {showNameInput ? (
                <div className="text-center py-8"><div className="text-6xl mb-4">✏️</div><h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Enter Your Name to Start</h3><div className="max-w-sm mx-auto"><input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && startQuiz()} className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 text-center text-lg mb-4" placeholder="Your name..." autoFocus /><button onClick={startQuiz} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg hover:shadow-lg transition">Start Quiz!</button></div></div>
              ) : !showResult ? (
                <div>
                  <div className="flex items-center justify-between mb-6"><span className="text-sm font-medium text-gray-500 dark:text-gray-400">Question {currentQ + 1} of {quizQuestions.length}</span><span className="text-sm font-bold text-blue-600">Score: {score}</span></div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8"><div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: ((currentQ + 1) / quizQuestions.length) * 100 + "%" }}></div></div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">{quizQuestions[currentQ].question}</h3>
                  <div className="space-y-3">{quizQuestions[currentQ].options.map((option) => (<button key={option} onClick={() => handleAnswer(option)} disabled={selectedAnswer !== null} className={"w-full text-left p-4 rounded-xl border-2 font-medium transition " + (selectedAnswer === null ? "border-gray-200 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20" : option === quizQuestions[currentQ].answer ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700" : "border-red-300 bg-red-50 dark:bg-red-900/20 text-red-700 opacity-50")}>{option}</button>))}</div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-7xl mb-4">{getEmoji()}</div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Quiz Complete!</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg"><span className="text-blue-600 font-bold">{studentName}</span> got <span className="text-blue-600 font-bold">{score}</span> out of <span className="font-bold">{quizQuestions.length}</span></p>
                  <p className="text-gray-400 mt-1">{getMessage()}</p>
                  {saveStatus && <p className="text-sm mt-2 text-green-600">{saveStatus}</p>}
                  <div className="mt-8 space-y-2 max-h-48 overflow-y-auto">{answers.map((a: any, i: number) => (<div key={i} className={"flex items-center gap-3 p-2 rounded-lg text-sm text-left " + (a.isCorrect ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20")}><span>{a.isCorrect ? "✅" : "❌"}</span><span className="flex-1 text-gray-700 dark:text-gray-300">{a.question}</span><span className="font-medium text-gray-500">{a.selected}</span></div>))}</div>
                  <button onClick={restartQuiz} className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700">Try Again</button>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 h-fit">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🏆 Scoreboard</h3>
            {savedScores.length === 0 ? (<p className="text-gray-400 text-center py-8">No scores yet.</p>) : (
              <div className="space-y-3">{savedScores.map((s: any, i: number) => { const p = s.score / s.total; return (<div key={s.id} className={"flex items-center gap-3 p-3 rounded-xl " + (i === 0 ? "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200" : "bg-gray-50 dark:bg-gray-700")}><div className="text-2xl">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "📄"}</div><div className="flex-1"><p className="font-bold text-gray-900 dark:text-white text-sm">{s.student_name}</p><p className="text-gray-400 text-xs">{new Date(s.created_at).toLocaleDateString()}</p></div><div className="text-right"><p className="font-bold text-blue-600">{s.score}/{s.total}</p><p className="text-xs text-gray-400">{Math.round(p * 100)}%</p></div></div>) })}</div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}