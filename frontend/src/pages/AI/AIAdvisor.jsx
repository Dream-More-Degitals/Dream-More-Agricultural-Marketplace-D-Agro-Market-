import { useState } from "react";
import {
  MessageCircle,
  Send,
  User,
  Bot,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const initialMessages = [
  {
    id: 1,
    sender: "bot",
    text:
      "Hello! I'm the D-Agro AI Agricultural Advisor. Ask me about crops, farming, diseases, soil, markets or agricultural practices.",
  },
];

function getAIResponse(message) {
  const text = message.toLowerCase();

  if (
    text.includes("maize") ||
    text.includes("corn")
  ) {
    return "Maize generally requires suitable soil moisture, adequate nutrients and good weed management. Monitor the crop regularly for pests and diseases.";
  }

  if (
    text.includes("teff")
  ) {
    return "Teff grows well in several Ethiopian highland and midland areas. Proper land preparation, timely planting and appropriate moisture management are important.";
  }

  if (
    text.includes("coffee")
  ) {
    return "Coffee production benefits from suitable shade, healthy soil, adequate moisture and careful pest and disease monitoring. Harvesting and post-harvest handling also affect quality.";
  }

  if (
    text.includes("disease") ||
    text.includes("leaf") ||
    text.includes("yellow")
  ) {
    return "Yellowing leaves can have several causes, including nutrient deficiency, water stress, pests or disease. Check the leaves closely and compare symptoms across the field. You can also use the D-Agro Disease Detection tool to analyze an image.";
  }

  if (
    text.includes("soil") ||
    text.includes("fertilizer")
  ) {
    return "Good soil management starts with understanding soil condition and crop requirements. Organic matter, appropriate fertilizer use and proper moisture management can improve soil productivity.";
  }

  if (
    text.includes("price") ||
    text.includes("market")
  ) {
    return "Agricultural prices can change because of supply, demand, seasonality, transportation and market location. D-Agro's Price Prediction tool can be used for a future AI-based market prediction once connected to real market data.";
  }

  if (
    text.includes("rain") ||
    text.includes("rainfall")
  ) {
    return "Rainfall requirements differ between crops. Too little water can cause stress, while excessive moisture can increase some disease risks. Crop selection should consider the expected rainfall pattern.";
  }

  if (
    text.includes("pest") ||
    text.includes("insect")
  ) {
    return "Regular field monitoring is important for early pest detection. Look at leaves, stems and growing points, and use appropriate integrated pest management practices.";
  }

  if (
    text.includes("hello") ||
    text.includes("hi")
  ) {
    return "Hello! 👋 How can I help you with agriculture today?";
  }

  return "That's a good agricultural question. For a more accurate answer, provide details such as the crop, region, soil condition, rainfall, symptoms or market information.";
}

export default function AIAdvisor() {
  const [messages, setMessages] =
    useState(initialMessages);

  const [input, setInput] = useState("");

  const [loading, setLoading] =
    useState(false);

  const sendMessage = () => {
    const message = input.trim();

    if (!message || loading) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: message,
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setInput("");
    setLoading(true);

    setTimeout(() => {
      const response = getAIResponse(message);

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: response,
      };

      setMessages((previous) => [
        ...previous,
        botMessage,
      ]);

      setLoading(false);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-4xl">

        <Link
          to="/ai"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#E57036]"
        >
          <ArrowLeft size={17} />
          Back to AI Tools
        </Link>

        {/* Header */}
        <div className="mb-6 rounded-2xl bg-[#343E4F] p-5 text-white sm:p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E57036]">
              <Bot size={26} />
            </div>

            <div>
              <h1 className="text-xl font-bold sm:text-2xl">
                D-Agro AI Advisor
              </h1>

              <p className="mt-1 text-sm text-white/60">
                Your agricultural assistant
              </p>
            </div>

          </div>
        </div>

        {/* Chat */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          {/* Messages */}
          <div className="h-[55vh] min-h-[400px] space-y-5 overflow-y-auto p-4 sm:p-6">

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                {message.sender === "bot" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#343E4F] text-white">
                    <Bot size={17} />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.sender === "user"
                      ? "rounded-br-md bg-[#E57036] text-white"
                      : "rounded-bl-md bg-gray-100 text-gray-700"
                  }`}
                >
                  {message.text}
                </div>

                {message.sender === "user" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[#E57036]">
                    <User size={17} />
                  </div>
                )}

              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#343E4F] text-white">
                  <Bot size={17} />
                </div>

                <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3 text-sm text-gray-500">
                  AI is thinking...
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="border-t border-gray-100 px-4 py-3 sm:px-6">

            <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-gray-400">
              <Sparkles size={14} />
              Try asking
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">

              {[
                "How can I improve maize production?",
                "Why are my leaves yellow?",
                "Tell me about soil management",
                "How do agricultural prices change?",
              ].map((question) => (
                <button
                  key={question}
                  onClick={() => setInput(question)}
                  className="shrink-0 rounded-full border border-gray-200 px-3 py-2 text-xs text-gray-600 transition hover:border-[#E57036] hover:text-[#E57036]"
                >
                  {question}
                </button>
              ))}

            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 p-4 sm:p-5">

            <div className="flex items-end gap-3">

              <textarea
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask your agricultural question..."
                className="max-h-32 min-h-[48px] flex-1 resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E57036] focus:ring-2 focus:ring-orange-100"
              />

              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E57036] text-white transition hover:bg-[#d7632e] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={19} />
              </button>

            </div>

            <p className="mt-2 text-center text-xs text-gray-400">
              D-Agro AI is currently running in demonstration mode.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}