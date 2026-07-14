"use client"
import dynamic from "next/dynamic"

const VideoRoomContent = dynamic(() => import("./AgoraRoom"), { ssr: false })

export default function VideoRoom() {
  return <VideoRoomContent />
}