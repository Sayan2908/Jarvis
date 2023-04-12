import Image from 'next/image'
import { Inter } from 'next/font/google'
import TextToSpeech from '@/components/TextToSpeech'
import ChatBotCanvas from '@/components/ChatBotCanvas'
// import { IsPlayingProvider } from './context/IsPlayingContext'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='relative' >
      {/* <IsPlayingProvider> */}
      {/* Chatbot Canvas */}
      <div className='absolute top-[10dvh] left-[35dvw]' >
        <ChatBotCanvas/>
      </div>
      {/* Text to speech */}
      <TextToSpeech/>
      {/* </IsPlayingProvider> */}
    </main>
  )
}
