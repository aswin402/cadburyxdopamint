import React, { useState, useEffect, useRef } from "react";
import logoCad from "../assets/logocad.svg";

interface MeetSantaPageProps {
  userName: string | null;
  onEndCall: () => void;
}

export function MeetSantaPage({ userName, onEndCall }: MeetSantaPageProps) {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [santaDialogueIndex, setSantaDialogueIndex] = useState(0);
  const [chatMessage, setChatMessage] = useState("");
  const [chatLog, setChatLog] = useState<Array<{ sender: "user" | "santa"; text: string }>>([]);
  const [showChat, setShowChat] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Santa's dialogue flow
  const nameToUse = userName || "friend";
  const santaDialogues = [
    `Ho ho ho! Hello there, ${nameToUse}! Welcome to my Grotto!`,
    "I received your digital ticket and checked my list twice!",
    "Tell me, have you been kind and helpful to others this year?",
    "I'm warming up by the fireplace, writing down all the wishes.",
    "Do you like chocolate? The elves have been making special Cadbury treats just for you!",
    "Tell me your biggest wish! You can type it to me in the chat below.",
    "Ho ho ho! Remember, Christmas magic is all about sharing love and joy!",
  ];

  // Increment call duration
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cycle Santa's auto-dialogues every 6 seconds if chat is empty
  useEffect(() => {
    if (chatLog.length > 0) return; // Stop auto-cycling if they start chatting
    const dialogueTimer = setInterval(() => {
      setSantaDialogueIndex((prev) => (prev + 1) % santaDialogues.length);
    }, 6000);
    return () => clearInterval(dialogueTimer);
  }, [chatLog.length, santaDialogues.length]);

  // Request webcam stream on load
  useEffect(() => {
    if (!isVideoOff) {
      navigator.mediaDevices
        .getUserMedia({ video: { width: 320, height: 240 }, audio: false })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch((err) => {
          console.warn("Camera permission denied or camera not found.", err);
        });
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isVideoOff]);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatLog]);

  // Format call duration to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage.trim();
    const newLog = [...chatLog, { sender: "user" as const, text: userText }];
    setChatLog(newLog);
    setChatMessage("");

    // Simulate Santa's smart reply
    setTimeout(() => {
      let santaReply = `Ho ho ho! "${userText}" is a wonderful wish! I've added it to my big golden book.`;
      if (userText.toLowerCase().includes("chocolate") || userText.toLowerCase().includes("cadbury")) {
        santaReply = "Ah, Cadbury chocolate! My absolute favorite treat to eat after delivering presents! Excellent choice!";
      } else if (userText.toLowerCase().includes("hello") || userText.toLowerCase().includes("hi")) {
        santaReply = `Ho ho ho! Hello again, ${nameToUse}! I hope you are having a cozy and warm day!`;
      }

      setChatLog((prev) => [...prev, { sender: "santa" as const, text: santaReply }]);
      // Update subtitle to match Santa's last reply
      setSantaDialogueIndex(-1); // Indicator to use custom chat bubble subtitle
    }, 1500);
  };

  // Get current subtitle string
  const currentSubtitle =
    santaDialogueIndex === -1 && chatLog.length > 0
      ? chatLog[chatLog.length - 1].sender === "santa"
        ? chatLog[chatLog.length - 1].text
        : chatLog[chatLog.length - 2]?.text || santaDialogues[0]
      : santaDialogues[santaDialogueIndex];

  return (
    <div className="min-h-screen bg-[#1F073E] text-white flex flex-col justify-between select-none font-sans relative overflow-hidden">
      {/* Decorative Falling Snow / Ambient Lights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(123,74,175,0.15)_0%,_transparent_70%)] pointer-events-none z-0" />

      {/* Video Call Header */}
      <header className="relative z-10 w-full py-4 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logoCad} alt="Cadbury Logo" className="h-8 sm:h-10 w-auto object-contain" />
          <div className="h-6 w-px bg-white/20 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-2 bg-red-500/20 border border-red-500/40 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            LIVE GROTTO FEED
          </div>
        </div>

        {/* Duration / Code Display */}
        <div className="flex items-center gap-4">
          <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-xs sm:text-sm font-mono tracking-wider">
            {formatTime(callDuration)}
          </div>
          <button
            onClick={onEndCall}
            className="px-4 py-1.5 bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-xs font-bold rounded-lg border border-red-500/30 shadow-md cursor-pointer"
          >
            End Call
          </button>
        </div>
      </header>

      {/* Video Stream Main Area */}
      <main className="relative flex-grow w-full max-w-6xl mx-auto px-4 py-2 sm:py-4 flex flex-col md:flex-row gap-4 items-stretch justify-center z-10 h-[calc(100vh-170px)]">
        {/* Main Santa Display Viewport */}
        <div className="relative flex-grow flex flex-col items-center justify-center bg-[#15042A] rounded-3xl border border-white/10 overflow-hidden shadow-2xl min-h-[300px] md:min-h-0">
          
          {/* Simulated Santa Feed (Festive artwork simulation) */}
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#2A084E] via-[#1D0337] to-[#3E146B]">
            {/* Cozy fireplace backdrop visual animation */}
            <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-orange-500/10 to-transparent animate-pulse" />
            
            {/* Large Santa Avatar Graphic */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-[#300C58] border-4 border-gold-primary/30 flex items-center justify-center shadow-2xl overflow-hidden hover:scale-102 transition-transform duration-700">
              {/* Christmas glow behind avatar */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#FFE9A0_0%,_transparent_75%)] opacity-20 animate-pulse" />
              <span className="text-6xl sm:text-7xl md:text-8xl select-none filter drop-shadow-lg">🎅</span>
            </div>

            {/* Cozy Name Overlay */}
            <div className="mt-4 sm:mt-6 text-center">
              <h2 className="text-xl sm:text-2xl font-spartan font-bold text-gold-light tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                Santa Claus
              </h2>
              <p className="text-xs text-cream-text/50 font-mono mt-1">
                Connected • North Pole Server
              </p>
            </div>
          </div>

          {/* Subtitles Overlay Panel (Santa Speaking text) */}
          <div className="absolute bottom-6 inset-x-4 sm:inset-x-8 z-20 flex justify-center">
            <div className="bg-black/75 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/15 max-w-xl text-center shadow-lg transition-all duration-300">
              <span className="text-xs uppercase font-extrabold tracking-wider text-gold-light block mb-1">
                Santa Claus
              </span>
              <p className="text-sm sm:text-base md:text-lg font-spartan leading-relaxed text-cream-text">
                "{currentSubtitle}"
              </p>
            </div>
          </div>

          {/* Simulated audio visualizer spikes */}
          <div className="absolute bottom-28 left-6 flex items-end gap-1 h-12 z-20 opacity-60">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="w-1.5 bg-gold-primary rounded-full animate-pulse"
                style={{
                  height: `${Math.floor(Math.random() * 35) + 12}px`,
                  animationDuration: `${0.4 + i * 0.15}s`,
                }}
              />
            ))}
          </div>

          {/* Video Feed Label indicator */}
          <div className="absolute top-4 left-4 bg-black/45 backdrop-blur-sm px-3 py-1 rounded-md text-[10px] sm:text-xs font-semibold tracking-wider border border-white/5">
            🔴 CAM_FEED // SANTA_01
          </div>
        </div>

        {/* Right side: Chat Log or Chat Drawer */}
        {showChat && (
          <div className="w-full md:w-80 shrink-0 bg-[#1A0734]/95 border border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-xl animate-fade-in">
            <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <span className="text-sm font-bold text-gold-light">Grotto Live Chat</span>
              <button
                onClick={() => setShowChat(false)}
                className="text-xs text-cream-text/60 hover:text-white"
              >
                Hide
              </button>
            </div>

            {/* Chat List container */}
            <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-3 flex flex-col h-[200px] md:h-0">
              {chatLog.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4 text-cream-text/40 italic text-xs sm:text-sm">
                  <span>No messages yet. Ask Santa for a present or wish him Merry Christmas!</span>
                </div>
              ) : (
                chatLog.map((chat, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col max-w-[85%] ${
                      chat.sender === "user" ? "self-end items-end" : "self-start items-start"
                    }`}
                  >
                    <span className="text-[10px] text-cream-text/40 font-bold mb-0.5">
                      {chat.sender === "user" ? nameToUse : "Santa"}
                    </span>
                    <div
                      className={`px-3 py-2 rounded-2xl text-xs sm:text-sm ${
                        chat.sender === "user"
                          ? "bg-metallic-gold text-[#4b0983] font-semibold rounded-tr-none"
                          : "bg-[#3B1A6E] text-white border border-white/5 rounded-tl-none"
                      }`}
                    >
                      {chat.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Chat input box form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white/5 border-t border-white/10 flex gap-2">
              <input
                type="text"
                placeholder="Type a wish..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-grow bg-[#15042A] border border-white/10 focus:border-gold-primary text-xs sm:text-sm text-white rounded-xl px-3 py-2.5 outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-3 bg-metallic-gold text-[#4b0983] font-bold rounded-xl text-xs hover:scale-105 transition-all cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        )}

        {/* User Webcam Floating Selfie Display */}
        <div className="absolute top-20 right-8 md:top-auto md:bottom-28 z-30 w-28 h-36 sm:w-36 sm:h-48 bg-[#180530] border-2 border-gold-primary rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-end">
          {!isVideoOff ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
            />
          ) : null}

          {/* Overlay when Camera is Disabled */}
          {isVideoOff || !stream ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#15042A] text-center p-2">
              <span className="text-2xl sm:text-3xl mb-1">👤</span>
              <span className="text-[10px] text-cream-text/40 font-bold uppercase tracking-wider">
                CAM OFF
              </span>
            </div>
          ) : null}

          {/* Selfie Label overlay */}
          <div className="relative z-10 bg-black/60 px-2 py-0.5 m-1.5 rounded text-[9px] font-bold tracking-wider text-center text-white/80">
            {nameToUse} (You)
          </div>
        </div>
      </main>

      {/* Video Call Controls Panel */}
      <footer className="relative z-10 w-full py-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 px-4">
        <div className="flex items-center gap-4">
          
          {/* Mute Audio button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-md ${
              isMuted
                ? "bg-red-500/20 border-red-500 text-red-500"
                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
            }`}
            title={isMuted ? "Unmute Mic" : "Mute Mic"}
          >
            {isMuted ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2.5" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            )}
          </button>

          {/* Toggle Camera button */}
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-md ${
              isVideoOff
                ? "bg-red-500/20 border-red-500 text-red-500"
                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
            }`}
            title={isVideoOff ? "Turn Camera On" : "Turn Camera Off"}
          >
            {isVideoOff ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2.5" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>

          {/* Toggle Live Chat button */}
          <button
            onClick={() => setShowChat(!showChat)}
            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-md ${
              showChat
                ? "bg-gold-primary border-gold-primary text-[#1F073E]"
                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
            }`}
            title="Toggle Live Chat"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>

        <div className="h-px w-24 bg-white/10 hidden sm:block" />

        {/* Big End Call Button */}
        <button
          onClick={onEndCall}
          className="flex items-center gap-3 px-8 py-3 bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white font-bold rounded-full border border-red-500/40 shadow-lg cursor-pointer text-sm sm:text-base"
        >
          <svg className="w-5 h-5 fill-white rotate-[135deg]" viewBox="0 0 24 24">
            <path d="M21 15.46l-5.27-.61-2.52 2.52a15.045 15.045 0 01-6.59-6.59l2.52-2.52L8.54 3H3.03C2.45 3 2 3.45 2 4.03c0 9.37 7.6 16.97 16.97 16.97.58 0 1.03-.45 1.03-1.03v-4.51z" />
          </svg>
          Disconnect Call
        </button>
      </footer>
    </div>
  );
}
