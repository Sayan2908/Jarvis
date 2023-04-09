"use client";
import React, { useState } from "react";

const TextToSpeech = () => {
  const [userText, setUserText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
  const voices = synth?.getVoices();
  console.log(voices);

  const selectedVoice = voices?.find((voice) => voice.name === "Microsoft Zira Desktop - English (United States)");

  console.log(selectedVoice?.name);

    const speak = (textToSpeak: string) => {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.voice = selectedVoice!;
        utterance.rate = 0.7;
        setIsLoading(true);
        synth?.speak(utterance);
        utterance.onend = () => {
            setIsLoading(false);
        }
    };


    const handleUserText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    speak(userText);
    console.log(userText);
    };


  return (
    <div className="relative top-0 z-50">
      <form onSubmit={handleUserText} className="absolute top-[90dvh] left-[32dvw] space-x-2 space-y-2">
        <input
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          className="bg-transparent w-[510px] border border-[#b00c3f]/80 outline-none  rounded-lg placeholder:text-[#b00c3f] p-2 text-[#b00c3f]"
          type="text"
          name="text"
          placeholder="Kya janna chahta hai bsdk"
        />
        <button
            disabled = {isLoading}
          className="text-[#b00c3f] font-bold p-2 border border-[#b00c3f] rounded-lg disabled:text-blue-100 
					disabled:cursor-not-allowed disabled:bg-gray-500 hover:scale-120 hover:bg-[#b00c3f] hover:text-black duration-300 transition-all"
        >
          {isLoading? "Thinking..." : "Ask"}
        </button>
      </form>
    </div>
  );
};

export default TextToSpeech;
