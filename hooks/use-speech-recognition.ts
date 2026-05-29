import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useSyncExternalStore,
} from "react"

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance
    webkitSpeechRecognition: new () => SpeechRecognitionInstance
  }
}

interface SpeechRecognitionInstance {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  addEventListener: (type: string, callback: (event: unknown) => void) => void
}

interface SpeechRecognitionEvent extends Event {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string
      }
    }
  }
}

export interface UseSpeechRecognitionOptions {
  /** Language code for recognition. @default "en-US" */
  lang?: string
  /** Whether recognition should run continuously. @default false */
  continuous?: boolean
  /** Whether to return interim results. @default false */
  interimResults?: boolean
  /** Callback fired when recognition starts. */
  onStart?: () => void
  /** Callback fired with transcribed text. */
  onResult?: (transcript: string) => void
  /** Callback fired when recognition ends. */
  onEnd?: () => void
  /** Callback fired when an error occurs. */
  onError?: (error: string) => void
}

export interface UseSpeechRecognitionReturn {
  /** Whether speech recognition is currently listening. */
  isListening: boolean
  /** Whether the browser supports speech recognition. */
  isSupported: boolean
  /** Start voice recognition. */
  start: () => void
  /** Stop voice recognition. */
  stop: () => void
}

/**
 * Hook for speech-to-text functionality using the Web Speech API.
 *
 * @example
 * ```tsx
 * const { isListening, isSupported, start, stop } = useSpeechRecognition({
 *   onResult: (transcript) => setValue(transcript),
 * })
 * ```
 */
export function useSpeechRecognition(
  options: UseSpeechRecognitionOptions = {}
): UseSpeechRecognitionReturn {
  const {
    lang = "en-US",
    continuous = false,
    interimResults = false,
    onStart,
    onResult,
    onEnd,
    onError,
  } = options

  const [isListening, setIsListening] = useState(false)
  const isSupported = useSyncExternalStore(
    () => () => {},
    () => !!(window.SpeechRecognition || window.webkitSpeechRecognition),
    () => false
  )
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)

  useEffect(() => {
    if (!isSupported) return

    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognitionClass) return

    const recognition = new SpeechRecognitionClass()

    recognition.lang = lang
    recognition.continuous = continuous
    recognition.interimResults = interimResults

    recognition.addEventListener("start", () => {
      setIsListening(true)
      onStart?.()
    })

    recognition.addEventListener("result", (event: unknown) => {
      const speechEvent = event as SpeechRecognitionEvent
      const transcript = speechEvent.results[0]?.[0]?.transcript
      if (transcript) {
        onResult?.(transcript)
      }
    })

    recognition.addEventListener("end", () => {
      setIsListening(false)
      onEnd?.()
    })

    recognition.addEventListener("error", (event: unknown) => {
      const errorEvent = event as { error: string }
      console.error("Speech recognition error:", errorEvent.error)
      setIsListening(false)
      onError?.(errorEvent.error)
    })

    recognitionRef.current = recognition

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch {
          // Ignore errors on cleanup
        }
      }
    }
  }, [
    isSupported,
    lang,
    continuous,
    interimResults,
    onStart,
    onResult,
    onEnd,
    onError,
  ])

  const start = useCallback(() => {
    if (!recognitionRef.current || isListening) return
    try {
      recognitionRef.current.start()
    } catch (error) {
      console.error("Failed to start speech recognition:", error)
    }
  }, [isListening])

  const stop = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }, [isListening])

  return {
    isListening,
    isSupported,
    start,
    stop,
  }
}
