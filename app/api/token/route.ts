import { RtcTokenBuilder, RtcRole } from "agora-access-token"

export async function GET() {
  const APP_ID = "71155e40f2a242ecadec9c74a5e3c40a"
  const APP_CERTIFICATE = "8e03108b2302491f969785f32700d8c1"
  const CHANNEL_NAME = "english-class-101"

  const currentTimestamp = Math.floor(Date.now() / 1000)
  const privilegeExpiredTs = currentTimestamp + 3600

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    CHANNEL_NAME,
    0,
    RtcRole.PUBLISHER,
    privilegeExpiredTs
  )

  return new Response(JSON.stringify({ token }), {
    headers: { "Content-Type": "application/json" }
  })
}