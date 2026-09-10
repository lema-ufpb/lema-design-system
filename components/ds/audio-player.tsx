"use client"

import * as React from "react"
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

// ── Types ──────────────────────────────────────────────────────────────────

export interface AudioPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  title?: string
  artist?: string
  coverUrl?: string
  autoPlay?: boolean
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const audioPlayerContainerVariants = cva("w-full", {
  variants: {}
  }
)

// ── Helpers ────────────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

function VolumeIcon({ level }: { level: number }) {
  if (level === 0) return <VolumeX className="size-4" />
  if (level < 0.33) return <Volume className="size-4" />
  if (level < 0.66) return <Volume1 className="size-4" />
  return <Volume2 className="size-4" />
}

// ── AudioPlayer ────────────────────────────────────────────────────────────

export function AudioPlayer({
  src,
  title = "Unknown Track",
  artist,
  coverUrl,
  autoPlay = false,
  loading = false,
  className,
  ...props
}: AudioPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [volume, setVolume] = React.useState(0.8)
  const [isMuted, setIsMuted] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [playbackRate, setPlaybackRate] = React.useState(1)

  const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2]

  // ── Audio event handlers ──────────────────────────────────────────────

  React.useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoading(false)
      if (autoPlay) audio.play().catch(() => {})
    }
    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onEnded = () => setIsPlaying(false)
    const onWaiting = () => setIsLoading(true)
    const onCanPlay = () => setIsLoading(false)

    audio.addEventListener("loadedmetadata", onLoadedMetadata)
    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("ended", onEnded)
    audio.addEventListener("waiting", onWaiting)
    audio.addEventListener("canplay", onCanPlay)

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata)
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audio.removeEventListener("ended", onEnded)
      audio.removeEventListener("waiting", onWaiting)
      audio.removeEventListener("canplay", onCanPlay)
    }
  }, [autoPlay])

  // ── Controls ──────────────────────────────────────────────────────────

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      await audio.play()
      setIsPlaying(true)
    }
  }

  const handleSeek = (values: number[]) => {
    const audio = audioRef.current
    if (!audio) return
    const t = values[0] ?? 0
    audio.currentTime = t
    setCurrentTime(t)
  }

  const handleVolumeChange = (values: number[]) => {
    const audio = audioRef.current
    const v = values[0] ?? 0
    setVolume(v)
    if (audio) audio.volume = v
    setIsMuted(v === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    const newMuted = !isMuted
    setIsMuted(newMuted)
    audio.volume = newMuted ? 0 : volume
    if (!newMuted && volume === 0) {
      setVolume(0.5)
      audio.volume = 0.5
    }
  }

  const skip = (seconds: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(
      0,
      Math.min(duration, audio.currentTime + seconds)
    )
  }

  const cyclePlaybackRate = () => {
    const audio = audioRef.current
    const idx = PLAYBACK_RATES.indexOf(playbackRate)
    const next = PLAYBACK_RATES[(idx + 1) % PLAYBACK_RATES.length] ?? 1
    setPlaybackRate(next)
    if (audio) audio.playbackRate = next
  }

  // ── Loading skeleton ───────────────────────────────────────────────────

  if (loading) {
    return (
      <Card className={cn("w-full", className)} {...props}>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Skeleton className="size-16 shrink-0 rounded-lg" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-2 w-full rounded-full" />
              <div className="flex items-center gap-2">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="size-10 rounded-full" />
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="ml-auto h-3 w-16 rounded-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardContent className="p-4">
        {/* Hidden audio element */}
        <audio ref={audioRef} src={src} preload="metadata" />

        <div className="flex items-center gap-4">
          {/* Cover art */}
          <Avatar className="size-16 shrink-0 rounded-lg">
            <AvatarImage src={coverUrl} alt={title} className="object-cover" />
            <AvatarFallback className="rounded-lg text-lg">🎵</AvatarFallback>
          </Avatar>

          {/* Player controls */}
          <div className="flex flex-1 flex-col gap-2 overflow-hidden">
            {/* Title & artist */}
            <div>
              <p className="truncate text-sm font-semibold text-foreground">
                {title}
              </p>
              {artist && (
                <p className="truncate text-xs text-muted-foreground">
                  {artist}
                </p>
              )}
            </div>

            {/* Seek bar */}
            <div className="flex items-center gap-2">
              <span className="w-8 text-right text-xs text-muted-foreground tabular-nums">
                {formatTime(currentTime)}
              </span>
              <Slider
                min={0}
                max={duration || 1}
                step={0.1}
                value={[currentTime]}
                onValueChange={handleSeek}
                className="flex-1"
                aria-label="Seek"
              />
              <span className="w-8 text-xs text-muted-foreground tabular-nums">
                {formatTime(duration)}
              </span>
            </div>

            {/* Controls row */}
            <div className="flex items-center gap-1">
              {/* Skip back */}
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => skip(-10)}
                aria-label="Skip back 10 seconds"
              >
                <SkipBack className="size-4" />
              </Button>

              {/* Play/Pause */}
              <Button
                size="icon"
                className="size-9"
                onClick={togglePlay}
                disabled={isLoading}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="size-5" />
                ) : (
                  <Play className="size-5" />
                )}
              </Button>

              {/* Skip forward */}
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => skip(10)}
                aria-label="Skip forward 10 seconds"
              >
                <SkipForward className="size-4" />
              </Button>

              {/* Playback rate */}
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs font-medium tabular-nums"
                onClick={cyclePlaybackRate}
                aria-label={`Playback rate: ${playbackRate}×`}
              >
                {playbackRate}×
              </Button>

              {/* Volume */}
              <div className="ml-auto flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  <VolumeIcon level={isMuted ? 0 : volume} />
                </Button>
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={[isMuted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  className="w-20"
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
