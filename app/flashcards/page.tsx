"use client"
import { useState, useEffect, useCallback } from "react"

const alphabet = [
  { letter: "A", color: "from-red-400 to-red-600", words: [
    { word: "Apple", emoji: "🍎", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/400px-Red_Apple.jpg" },
    { word: "Ant", emoji: "🐜", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Camponotus_flavomarginatus_ant.jpg/400px-Camponotus_flavomarginatus_ant.jpg" },
    { word: "Astronaut", emoji: "🧑‍🚀", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/ISS-64_Shannon_Walker_is_suited_up_in_a_U.S._spacesuit.jpg/400px-ISS-64_Shannon_Walker_is_suited_up_in_a_U.S._spacesuit.jpg" }
  ]},
  { letter: "B", color: "from-amber-400 to-amber-600", words: [
    { word: "Bear", emoji: "🐻", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2010-kodiak-bear-1.jpg/400px-2010-kodiak-bear-1.jpg" },
    { word: "Butterfly", emoji: "🦋", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Monarch_In_May.jpg/400px-Monarch_In_May.jpg" },
    { word: "Banana", emoji: "🍌", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bananas_white_background_DS.jpg/400px-Bananas_white_background_DS.jpg" }
  ]},
  { letter: "C", color: "from-orange-400 to-orange-600", words: [
    { word: "Cat", emoji: "🐱", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/400px-Cat03.jpg" },
    { word: "Cake", emoji: "🎂", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Torte_Mit_Schokokuchen_und_Creme.jpg/400px-Torte_Mit_Schokokuchen_und_Creme.jpg" },
    { word: "Cloud", emoji: "☁️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Cumulus_clouds_in_fair_weather.JPG/400px-Cumulus_clouds_in_fair_weather.JPG" }
  ]},
  { letter: "D", color: "from-yellow-400 to-yellow-600", words: [
    { word: "Dog", emoji: "🐶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Golden_Retriever_Dukedestiny01_dv.jpg/400px-Golden_Retriever_Dukedestiny01_dv.jpg" },
    { word: "Duck", emoji: "🦆", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mallard2.jpg/400px-Mallard2.jpg" },
    { word: "Dolphin", emoji: "🐬", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Tursiops_truncatus_01.jpg/400px-Tursiops_truncatus_01.jpg" }
  ]},
  { letter: "E", color: "from-lime-400 to-lime-600", words: [
    { word: "Elephant", emoji: "🐘", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/400px-African_Bush_Elephant.jpg" },
    { word: "Egg", emoji: "🥚", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Chicken_egg.jpg/400px-Chicken_egg.jpg" }
  ]},
  { letter: "F", color: "from-green-400 to-green-600", words: [
    { word: "Fish", emoji: "🐟", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Pterophyllum_scalare_-_Wild_caught.jpg/400px-Pterophyllum_scalare_-_Wild_caught.jpg" },
    { word: "Flower", emoji: "🌸", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Solandra_maxima_flower.jpg/400px-Solandra_maxima_flower.jpg" },
    { word: "Frog", emoji: "🐸", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Rana_esculenta1.jpg/400px-Rana_esculenta1.jpg" }
  ]},
  { letter: "G", color: "from-teal-400 to-teal-600", words: [
    { word: "Giraffe", emoji: "🦒", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Giraffe_Mikumi_National_Park.jpg/400px-Giraffe_Mikumi_National_Park.jpg" },
    { word: "Grapes", emoji: "🍇", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Table_grapes_on_white.jpg/400px-Table_grapes_on_white.jpg" },
    { word: "Guitar", emoji: "🎸", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Guitar_anatomy_side_profile.jpg/400px-Guitar_anatomy_side_profile.jpg" }
  ]},
  { letter: "H", color: "from-cyan-400 to-cyan-600", words: [
    { word: "Horse", emoji: "🐴", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Equus_caballus_-_Flying_Shooting_Star.jpg/400px-Equus_caballus_-_Flying_Shooting_Star.jpg" },
    { word: "House", emoji: "🏠", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Single-family_home.jpg/400px-Single-family_home.jpg" },
    { word: "Honey", emoji: "🍯", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Honey_jar_with_honey_dipper.jpg/400px-Honey_jar_with_honey_dipper.jpg" }
  ]},
  { letter: "I", color: "from-sky-400 to-sky-600", words: [
    { word: "Ice Cream", emoji: "🍦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ice_cream_with_chocolate.jpg/400px-Ice_cream_with_chocolate.jpg" },
    { word: "Island", emoji: "🏝️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Tropical_Island.jpg/400px-Tropical_Island.jpg" }
  ]},
  { letter: "J", color: "from-blue-400 to-blue-600", words: [
    { word: "Jellyfish", emoji: "🪼", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Aurelia_aurita_%28Moon_Jelly%29.jpg/400px-Aurelia_aurita_%28Moon_Jelly%29.jpg" },
    { word: "Juice", emoji: "🧃", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange_juice_1.jpg/400px-Orange_juice_1.jpg" }
  ]},
  { letter: "K", color: "from-indigo-400 to-indigo-600", words: [
    { word: "Koala", emoji: "🐨", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/400px-Koala_climbing_tree.jpg" },
    { word: "Kite", emoji: "🪁", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Colorful_kite_flying.jpg/400px-Colorful_kite_flying.jpg" },
    { word: "Key", emoji: "🔑", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Old_key.jpg/400px-Old_key.jpg" }
  ]},
  { letter: "L", color: "from-violet-400 to-violet-600", words: [
    { word: "Lion", emoji: "🦁", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/400px-Lion_waiting_in_Namibia.jpg" },
    { word: "Lemon", emoji: "🍋", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Lemon_-_whole_and_split.jpg/400px-Lemon_-_whole_and_split.jpg" },
    { word: "Leaf", emoji: "🍃", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Green_leaf.jpg/400px-Green_leaf.jpg" }
  ]},
  { letter: "M", color: "from-purple-400 to-purple-600", words: [
    { word: "Monkey", emoji: "🐒", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Golden_snub-nosed_monkey.jpg/400px-Golden_snub-nosed_monkey.jpg" },
    { word: "Moon", emoji: "🌙", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/400px-FullMoon2010.jpg" },
    { word: "Mushroom", emoji: "🍄", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mushroom_group.jpg/400px-Mushroom_group.jpg" }
  ]},
  { letter: "N", color: "from-fuchsia-400 to-fuchsia-600", words: [
    { word: "Nest", emoji: "🪺", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Bird_nest_in_grass.jpg/400px-Bird_nest_in_grass.jpg" },
    { word: "Nut", emoji: "🥜", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Nuts.jpg/400px-Nuts.jpg" }
  ]},
  { letter: "O", color: "from-pink-400 to-pink-600", words: [
    { word: "Owl", emoji: "🦉", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Strix_varia_1.jpg/400px-Strix_varia_1.jpg" },
    { word: "Orange", emoji: "🍊", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/400px-Orange-Fruit-Pieces.jpg" },
    { word: "Ocean", emoji: "🌊", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Ocean_Macro.jpg/400px-Ocean_Macro.jpg" }
  ]},
  { letter: "P", color: "from-rose-400 to-rose-600", words: [
    { word: "Penguin", emoji: "🐧", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Emperor_Penguin_Manchot_empereur.jpg/400px-Emperor_Penguin_Manchot_empereur.jpg" },
    { word: "Pizza", emoji: "🍕", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita.jpg/400px-Eq_it-na_pizza-margherita.jpg" },
    { word: "Pumpkin", emoji: "🎃", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Pumpkins.jpg/400px-Pumpkins.jpg" }
  ]},
  { letter: "Q", color: "from-red-500 to-pink-500", words: [
    { word: "Queen", emoji: "👑", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Queen_Elizabeth_II_in_March_2015.jpg/400px-Queen_Elizabeth_II_in_March_2015.jpg" },
    { word: "Quilt", emoji: "🧵", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Quilts_001.jpg/400px-Quilts_001.jpg" }
  ]},
  { letter: "R", color: "from-amber-500 to-orange-500", words: [
    { word: "Rabbit", emoji: "🐰", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Oryctolagus_cuniculus_Rabbit.jpg/400px-Oryctolagus_cuniculus_Rabbit.jpg" },
    { word: "Rainbow", emoji: "🌈", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rainbow_over_Van_Gogh_Museum.jpg/400px-Rainbow_over_Van_Gogh_Museum.jpg" },
    { word: "Rose", emoji: "🌹", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Rose_Yellow_Sarah.jpg/400px-Rose_Yellow_Sarah.jpg" }
  ]},
  { letter: "S", color: "from-yellow-500 to-amber-500", words: [
    { word: "Star", emoji: "⭐", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Stars0001.jpg/400px-Stars0001.jpg" },
    { word: "Sun", emoji: "☀️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/400px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg" },
    { word: "Snake", emoji: "🐍", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Python_regius.jpg/400px-Python_regius.jpg" }
  ]},
  { letter: "T", color: "from-orange-500 to-red-500", words: [
    { word: "Tiger", emoji: "🐯", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Tiger_in_Ranthambhore.jpg/400px-Tiger_in_Ranthambhore.jpg" },
    { word: "Tree", emoji: "🌳", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Tree_03.JPG/400px-Tree_03.JPG" },
    { word: "Turtle", emoji: "🐢", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Chelonia_mydas_is_going_for_the_air.jpg/400px-Chelonia_mydas_is_going_for_the_air.jpg" }
  ]},
  { letter: "U", color: "from-teal-500 to-cyan-500", words: [
    { word: "Umbrella", emoji: "☂️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Umbrella_and_rain.jpg/400px-Umbrella_and_rain.jpg" },
    { word: "Unicorn", emoji: "🦄", img: "" }
  ]},
  { letter: "V", color: "from-blue-500 to-indigo-500", words: [
    { word: "Violin", emoji: "🎻", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Violin_VL100.jpg/400px-Violin_VL100.jpg" },
    { word: "Volcano", emoji: "🌋", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Eruption_of_Eyjafjallaj%C3%B6kull.jpg/400px-Eruption_of_Eyjafjallaj%C3%B6kull.jpg" }
  ]},
  { letter: "W", color: "from-indigo-500 to-purple-500", words: [
    { word: "Whale", emoji: "🐋", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Humpback_whale_underwater.jpg/400px-Humpback_whale_underwater.jpg" },
    { word: "Watermelon", emoji: "🍉", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Watermelon_Slice.jpg/400px-Watermelon_Slice.jpg" },
    { word: "Windmill", emoji: "💨", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Geesthacht_Windmill.jpg/400px-Geesthacht_Windmill.jpg" }
  ]},
  { letter: "X", color: "from-purple-500 to-fuchsia-500", words: [
    { word: "Xylophone", emoji: "🎵", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Xylophone.jpg/400px-Xylophone.jpg" }
  ]},
  { letter: "Y", color: "from-fuchsia-500 to-pink-500", words: [
    { word: "Yacht", emoji: "⛵", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Yacht_at_sea.jpg/400px-Yacht_at_sea.jpg" },
    { word: "Yak", emoji: "🐃", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Domestic_yak.jpg/400px-Domestic_yak.jpg" }
  ]},
  { letter: "Z", color: "from-pink-500 to-rose-500", words: [
    { word: "Zebra", emoji: "🦓", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Plains_Zebra_Equus_quagga.jpg/400px-Plains_Zebra_Equus_quagga.jpg" },
    { word: "Zoo", emoji: "🦁", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Kolkata_zoo_entrance.jpg/400px-Kolkata_zoo_entrance.jpg" }
  ]}
]

export default function Flashcards() {
  const [letterIndex, setLetterIndex] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [imgErrors, setImgErrors] = useState({})
  const [voices, setVoices] = useState([])

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices()
      if (allVoices.length > 0) setVoices(allVoices)
    }
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
    return () => { window.speechSynthesis.onvoiceschanged = null }
  }, [])

  const speak = useCallback((text) => {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.rate = 0.8
    utterance.pitch = 1.1
    utterance.volume = 1
    const usVoices = voices.filter(v => v.lang === "en-US")
    const preferred = usVoices.find(v =>
      v.name.includes("David") ||
      v.name.includes("Zira") ||
      v.name.includes("Mark") ||
      v.name.includes("Samantha") ||
      v.name.includes("Google US English")
    )
    if (preferred) {
      utterance.voice = preferred
    } else if (usVoices.length > 0) {
      utterance.voice = usVoices[0]
    }
    window.speechSynthesis.speak(utterance)
  }, [voices])

  const currentLetter = alphabet[letterIndex]
  const currentWord = currentLetter.words[wordIndex]

  const nextLetter = () => {
    setIsFlipped(false)
    setWordIndex(0)
    setImgErrors({})
    setTimeout(() => setLetterIndex((prev) => (prev + 1) % alphabet.length), 200)
  }

  const prevLetter = () => {
    setIsFlipped(false)
    setWordIndex(0)
    setImgErrors({})
    setTimeout(() => setLetterIndex((prev) => (prev - 1 + alphabet.length) % alphabet.length), 200)
  }

  const switchWord = (idx) => {
    setIsFlipped(false)
    setWordIndex(idx)
  }

  const renderImage = (word) => {
    if (imgErrors[word] || !word.img) {
      return <div className="text-9xl drop-shadow-lg">{currentWord.emoji}</div>
    }
    return (
      <img
        src={word.img}
        alt={currentWord.word}
        className="w-52 h-40 object-cover rounded-2xl shadow-lg"
        onError={() => setImgErrors(prev => ({ ...prev, [word]: true }))}
      />
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ABC Flashcards
          </h1>
          <p className="text-gray-500 mt-3 text-lg">Click the card to flip. Click the speaker to hear the sound!</p>
        </div>

        <div className="flex justify-center gap-8 items-center mb-6">
          <button onClick={prevLetter} className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition">◀</button>

          <div onClick={() => setIsFlipped(!isFlipped)} className="cursor-pointer w-80 h-[440px]">
            <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)", transition: "transform 0.6s" }}>

              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6" style={{ backfaceVisibility: "hidden" }}>
                {renderImage(currentWord.word)}
                <div className="text-8xl font-bold text-white mt-4 mb-4">{currentLetter.letter}</div>
                <div className="flex gap-2 mb-2">
                  {currentLetter.words.map((w, i) => (
                    <div key={i} className={"w-3 h-3 rounded-full " + (i === wordIndex ? "bg-white" : "bg-white/40")}></div>
                  ))}
                </div>
                <button onClick={(e) => { e.stopPropagation(); speak(currentLetter.letter) }} className="mt-2 bg-white/20 px-6 py-2 rounded-full text-white font-medium hover:bg-white/30 transition">🔊 Hear Letter</button>
              </div>

              <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                {renderImage(currentWord.word)}
                <div className="text-2xl font-bold text-gray-800 mt-4 mb-2">{currentLetter.letter} is for</div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{currentWord.word}</div>
                <button onClick={(e) => { e.stopPropagation(); speak(currentLetter.letter + " is for " + currentWord.word) }} className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition">🔊 Hear Word</button>
              </div>

            </div>
          </div>

          <button onClick={nextLetter} className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition">▶</button>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          {currentLetter.words.map((w, i) => (
            <button
              key={i}
              onClick={() => switchWord(i)}
              className={"px-5 py-2 rounded-full font-medium text-sm transition " + (i === wordIndex ? "bg-purple-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-100")}
            >
              {w.emoji} {w.word}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4 text-center">All Letters</h3>
          <div className="grid grid-cols-9 gap-2">
            {alphabet.map((item, index) => (
              <button key={item.letter} onClick={() => { setLetterIndex(index); setWordIndex(0); setIsFlipped(false); setImgErrors({}); speak(item.letter) }} className={"w-12 h-12 rounded-xl font-bold text-lg transition hover:scale-110 " + (index === letterIndex ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>
                {item.letter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}