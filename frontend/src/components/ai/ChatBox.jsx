import React, { useState } from "react";
import { Send, Sparkles, User, Bot, RefreshCw } from "lucide-react";
import Button from "../common/Button";

function ChatBox() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Selam! I am D-Agro AI Advisor. How can I assist your farming or wholesale purchases today? Ask me about Sidama Coffee price forecasts, Teff market trends, or transport logistics."
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Based on regional market intelligence, prices for Ethiopian agricultural commodities remain favorable. High-grade Arabica coffee demand in Sidama and Gedeo is up 12% year-over-year.";
      if (userMsg.toLowerCase().includes("teff")) {
        reply = "White Teff (Magna) prices in Gojjam and Addis Ababa are currently at ETB 150/kg. Our predictive models project a 6% seasonal uptick next month. We recommend placing wholesale contracts early.";
      } else if (userMsg.toLowerCase().includes("coffee") || userMsg.toLowerCase().includes("sidama")) {
        reply = "Sidama Grade A Coffee is currently trading at ETB 650/kg, which is 8% lower than the 30-day average. Recommended action: Lock in bulk purchases now before export demand surges.";
      } else if (userMsg.toLowerCase().includes("transport") || userMsg.toLowerCase().includes("ship")) {
        reply = "Logistics AI Alert: Grouping your shipment with 3 neighboring buyers in Bole Sub-City reduces freight cost by 22%.";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[520px] rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
      <div className="bg-[#343E4F] p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E57036] text-white">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="font-extrabold text-sm tracking-wide">D-Agro Market AI Advisor</h3>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Live Market Intelligence Engine</span>
            </div>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                sender: "ai",
                text: "Chat reset. Ask me anything about crop yields, market prices, or buyer logistics."
              }
            ])
          }
          className="p-2 text-slate-300 hover:text-white rounded-lg transition cursor-pointer"
          title="Reset Chat"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 max-w-[85%] ${
              msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                msg.sender === "user"
                  ? "bg-[#107C41] text-white"
                  : "bg-[#343E4F] text-[#E57036]"
              }`}
            >
              {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
            </div>

            <div
              className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-[#343E4F] text-white rounded-tr-none"
                  : "bg-white text-[#343E4F] border border-slate-200/80 shadow-xs rounded-tl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2">
            <Bot size={14} className="animate-spin text-[#E57036]" />
            <span>D-Agro AI is analyzing regional market data...</span>
          </div>
        )}
      </div>

      <div className="px-4 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto scrollbar-none text-xs">
        <button
          onClick={() => setInput("What is the Coffee price forecast in Sidama?")}
          className="px-3 py-1 bg-slate-100 hover:bg-[#E57036] hover:text-white text-slate-600 rounded-full transition whitespace-nowrap cursor-pointer"
        >
          ☕ Coffee Price Forecast
        </button>
        <button
          onClick={() => setInput("Tell me about White Teff supply in Gojjam")}
          className="px-3 py-1 bg-slate-100 hover:bg-[#E57036] hover:text-white text-slate-600 rounded-full transition whitespace-nowrap cursor-pointer"
        >
          🌾 White Teff Supply
        </button>
        <button
          onClick={() => setInput("How can I save on transport logistics?")}
          className="px-3 py-1 bg-slate-100 hover:bg-[#E57036] hover:text-white text-slate-600 rounded-full transition whitespace-nowrap cursor-pointer"
        >
          🚚 Logistics Savings
        </button>
      </div>

      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your agricultural or market inquiry..."
          className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs sm:text-sm text-[#343E4F] focus:border-[#E57036] focus:outline-none focus:ring-1 focus:ring-[#E57036]"
        />
        <Button variant="orange" size="md" type="submit" icon={Send}>
          Send
        </Button>
      </form>
    </div>
  );
}

export default ChatBox;
