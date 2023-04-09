import Image from 'next/image'
import { Inter } from 'next/font/google'
import TextToSpeech from '@/components/TextToSpeech'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      {/* Text to speech */}
      <TextToSpeech/>
      {/* Chatbot Canvas */}
    </main>
  )
}
