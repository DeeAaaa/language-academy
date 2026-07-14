"use client"
import { useState, useEffect, useRef } from "react"
import AgoraRTC from "agora-rtc-sdk-ng"

const APP_ID = "71155e40f2a242ecadec9c74a5e3c40a"
const CHANNEL_NAME = "english-class-101"

function RemoteVideo({ user }) {
  const ref = useRef(null)
  useEffect(() => {
    if (user.videoTrack) user.videoTrack.play(ref.current)
    return () => { if (user.videoTrack) user.videoTrack.stop() }
  }, [user])
  return <div ref={ref} className="w-full h-full object-cover" />
}

function useTimer(isRunning) {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    if (!isRunning) { setSeconds(0); return }
    const interval = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(interval)
  }, [isRunning])
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0")
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")
  const s = String(seconds % 60).padStart(2, "0")
  return h + ":" + m + ":" + s
}

export default function AgoraRoom() {
  const [isJoined, setIsJoined] = useState(false)
  const [localVideoTrack, setLocalVideoTrack] = useState(null)
  const [remoteUsers, setRemoteUsers] = useState([])
  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(true)
  const [showChat, setShowChat] = useState(false)
  const [showMembers, setShowMembers] = useState(false)
  const [messages, setMessages] = useState([{ user: "System", text: "Welcome to the class!" }])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const pipVideoRef = useRef(null)
  const clientRef = useRef(null)
  const timer = useTimer(isJoined)

  useEffect(() => {
    if (localVideoTrack && pipVideoRef.current) {
      localVideoTrack.play(pipVideoRef.current)
    }
  }, [localVideoTrack, isJoined])

  const handleJoin = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/token")
      const data = await res.json()
      const token = data.token

      const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
      clientRef.current = client

      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType)
        if (mediaType === "video") setRemoteUsers((prev) => [...prev, user])
      })

      client.on("user-unpublished", (user) => {
        setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid))
      })

      await client.join(APP_ID, CHANNEL_NAME, token, null)

      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack()
      const videoTrack = await AgoraRTC.createCameraVideoTrack()

      await client.publish([audioTrack, videoTrack])
      client._audioTrack = audioTrack
      client._videoTrack = videoTrack
      setLocalVideoTrack(videoTrack)
      setIsJoined(true)
    } catch (error) {
      alert("Error: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMic = () => {
    if (clientRef.current && clientRef.current._audioTrack) {
      if (micOn) clientRef.current._audioTrack.setEnabled(false)
      else clientRef.current._audioTrack.setEnabled(true)
    }
    setMicOn(!micOn)
  }

  const toggleCam = () => {
    if (clientRef.current && clientRef.current._videoTrack) {
      if (camOn) clientRef.current._videoTrack.setEnabled(false)
      else clientRef.current._videoTrack.setEnabled(true)
    }
    setCamOn(!camOn)
  }

  const leaveCall = () => {
    if (clientRef.current) clientRef.current.leave()
    setIsJoined(false)
    setRemoteUsers([])
    setLocalVideoTrack(null)
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    setMessages([...messages, { user: "You", text: newMessage }])
    setNewMessage("")
  }

  if (!isJoined) {
    return (
      <main className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-6">
        <div className="bg-[#16213e] rounded-2xl shadow-2xl p-10 text-center max-w-md w-full border border-gray-700">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">🎥</div>
          <h1 className="text-2xl font-bold text-white mb-2">Join Video Classroom</h1>
          <p className="text-gray-400 mb-8 text-sm">Channel: {CHANNEL_NAME}</p>
          <button onClick={handleJoin} disabled={isLoading} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50">
            {isLoading ? "Connecting..." : "Join Now"}
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen bg-[#1a1a2e] flex flex-col text-white">

      <div className="h-12 bg-[#0f3460] px-6 flex items-center justify-between text-sm border-b border-gray-700">
        <div className="flex items-center gap-4">
          <span className="font-medium">Language Academy - {CHANNEL_NAME}</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-400 font-mono">{timer}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-xs">Connected</span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">

        <div className="flex-1 bg-black flex items-center justify-center relative">
          {remoteUsers.length > 0 ? (
            <div className="w-full h-full">
              <RemoteVideo user={remoteUsers[0]} />
              <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded text-xs">Student {String(remoteUsers[0].uid).substring(0,4)}</div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">📹</div>
              <p className="text-gray-500">Waiting for screen share or presentation...</p>
            </div>
          )}
        </div>

        {showChat && (
          <div className="w-80 bg-[#16213e] border-l border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="font-medium">Chat</h3>
              <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white">X</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={msg.user === "You" ? "text-right" : ""}>
                  <span className="text-xs text-gray-500">{msg.user}</span>
                  <p className={"text-sm mt-1 inline-block px-3 py-1.5 rounded-lg " + (msg.user === "You" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200")}>{msg.text}</p>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-1 bg-[#1a1a2e] text-white rounded-lg px-3 py-2 text-sm border border-gray-600 focus:outline-none" placeholder="Type a message..." />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Send</button>
              </div>
            </form>
          </div>
        )}

        {showMembers && (
          <div className="w-64 bg-[#16213e] border-l border-gray-700 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Members ({1 + remoteUsers.length})</h3>
              <button onClick={() => setShowMembers(false)} className="text-gray-400 hover:text-white">X</button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-blue-900/30 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs">You</div>
                <div>
                  <p className="text-sm font-medium">You (Teacher)</p>
                  <p className="text-xs text-green-400">Host</p>
                </div>
              </div>
              {remoteUsers.map((user) => (
                <div key={user.uid} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-xs">{String(user.uid).substring(0,2)}</div>
                  <p className="text-sm">Student {String(user.uid).substring(0,4)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {localVideoTrack && (
        <div className="absolute bottom-20 right-6 w-56 h-36 rounded-xl overflow-hidden shadow-2xl border-2 border-blue-500 z-10">
          <div ref={pipVideoRef} className="w-full h-full object-cover transform -scale-x-[1]" />
          <div className="absolute bottom-1 left-2 bg-black/70 text-white px-2 py-0.5 rounded text-[10px]">You</div>
        </div>
      )}

      <div className="h-16 bg-[#16213e] border-t border-gray-700 flex items-center justify-center gap-2 px-4 relative z-20">
        <button onClick={() => setShowMembers(!showMembers)} className={"w-10 h-10 rounded-lg flex items-center justify-center text-lg transition " + (showMembers ? "bg-blue-600" : "hover:bg-gray-700")}>👤</button>
        <button onClick={toggleMic} className={"w-10 h-10 rounded-lg flex items-center justify-center text-lg transition " + (micOn ? "hover:bg-gray-700" : "bg-red-600")}>{micOn ? "🎤" : "🔇"}</button>
        <button onClick={toggleCam} className={"w-10 h-10 rounded-lg flex items-center justify-center text-lg transition " + (camOn ? "hover:bg-gray-700" : "bg-red-600")}>{camOn ? "📷" : "🚫"}</button>

        <div className="w-px h-6 bg-gray-600 mx-2"></div>

        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-lg hover:bg-gray-700 transition">📹</button>
        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-lg hover:bg-gray-700 transition">✅</button>
        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-lg hover:bg-gray-700 transition">🎨</button>

        <div className="w-px h-6 bg-gray-600 mx-2"></div>

        <button onClick={() => { setShowChat(!showChat); setShowMembers(false) }} className={"w-10 h-10 rounded-lg flex items-center justify-center text-lg transition " + (showChat ? "bg-blue-600" : "hover:bg-gray-700")}>💬</button>

        <div className="w-px h-6 bg-gray-600 mx-2"></div>

        <button onClick={leaveCall} className="w-24 h-10 bg-red-600 rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:bg-red-700 transition">Leave</button>
      </div>
    </main>
  )
}