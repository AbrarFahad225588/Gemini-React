import React, { createContext, useState } from "react";
import run from "../gemini";
export const datacontext = createContext();
const UserContext = ({ children }) => {
  let [speaking, setSpeaking] = useState(false);
  let [prompt, setPrompt] = useState("Listening...");
  let [response, setResponse] = useState(false);
  function speak(text) {
    try {
      if (!window.speechSynthesis) {
        throw new Error("Speech synthesis not supported");
      }

      let utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = 1;
      utterance.rate = 1;
      utterance.pitch = 1;
      // utterance.lang = "en-GB";
      utterance.lang = "bn-BD";

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Error in speech synthesis:", error);
    }
  }
  // function openSocialMedia(command) {
  //   const socialMedia = {
  //     "open youtube": "https://youtube.com",
  //     "open facebook": "https://facebook.com",
  //     "open twitter": "https://twitter.com",
  //     "open instagram": "https://instagram.com",
  //     "open linkedin": "https://linkedin.com",
  //     "open reddit": "https://reddit.com",
  //   };

  //   const url = socialMedia[command.toLowerCase()];
  //   if (url) {
  //     window.open(url, "_blank");
  //     return Opening ${command.split(" ")[1]}...;
  //   }
  //   return null;
  // }
  async function aiResponse(prompt) {
    let text = await run(prompt);
    // const socialMediaResponse = openSocialMedia(prompt);
    // if (socialMediaResponse) {
    //   speak(socialMediaResponse);
    //   setPrompt(socialMediaResponse);
    // }
    let newText =
      text.split("**")&&
      text.split("*")&&
      text.replace("google", "Md Fahad").replace("Google", "Md Fahad");
    setPrompt(newText);
    speak(newText);
    setResponse(true);
    setTimeout(() => {
      setSpeaking(false);
    }, 8000);
  }
  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();

  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    // const socialMediaResponse = openSocialMedia(transcript);
    // if (socialMediaResponse) {
    //   speak(socialMediaResponse);
    //   setPrompt(socialMediaResponse);
    // }
    setPrompt(transcript);
    aiResponse(transcript);
  };

  let value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse
  };

  return (
    <div>
      <datacontext.Provider value={value}>{children}</datacontext.Provider>
    </div>
  );
};

export default UserContext; 