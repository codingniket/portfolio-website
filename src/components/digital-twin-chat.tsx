"use client";

import { FormEvent, useMemo, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterPrompts = [
  "What is Niket currently working on?",
  "Summarize Niket's career journey in 4 points.",
  "What are Niket's strongest technical areas?",
];

const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Hi, I am Niket's Digital Twin. Ask me about career journey, skills, certifications, or current focus.",
  },
];

export default function DigitalTwinChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSend = input.trim().length > 0 && !isLoading;

  const transcript = useMemo(() => messages.slice(-16), [messages]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    const nextMessages: ChatMessage[] = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/digital-twin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await response.json()) as {
        answer?: string;
        error?: string;
      };

      if (!response.ok || !data.answer) {
        throw new Error(data.error ?? "Chat request failed.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.answer as string },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected chat error.");
    } finally {
      setIsLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <section className="reveal-up rounded-3xl border border-slate-200/70 bg-white/90 p-7 shadow-[0_24px_70px_-50px_rgba(18,56,96,0.7)] backdrop-blur md:p-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="section-title">AI Digital Twin</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            Ask career questions and get instant answers powered by local AI.
          </p>
        </div>
        <p className="chip w-fit">Model: gemma4:31b-cloud</p>
      </div>

      <div className="chat-shell mt-6">
        <div className="chat-log" role="log" aria-live="polite">
          {transcript.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`chat-bubble ${message.role === "user" ? "chat-bubble-user" : "chat-bubble-assistant"}`}
            >
              <p className="chat-role">
                {message.role === "user" ? "You" : "Digital Twin"}
              </p>
              <p className="chat-text">{message.content}</p>
            </div>
          ))}

          {isLoading ? (
            <div className="chat-bubble chat-bubble-assistant">
              <p className="chat-role">Digital Twin</p>
              <p className="chat-text">Thinking...</p>
            </div>
          ) : null}
        </div>

        {error ? <p className="chat-error">{error}</p> : null}

        <div className="chat-prompts">
          {starterPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="chat-prompt"
              onClick={() => void sendMessage(prompt)}
              disabled={isLoading}
            >
              {prompt}
            </button>
          ))}
        </div>

        <form className="chat-form" onSubmit={onSubmit}>
          <label htmlFor="digital-twin-input" className="sr-only">
            Ask the digital twin
          </label>
          <textarea
            id="digital-twin-input"
            rows={3}
            className="chat-input"
            placeholder="Ask about roles, skills, certifications, or education..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            type="submit"
            className="action action-primary"
            disabled={!canSend}
          >
            {isLoading ? "Sending..." : "Ask Digital Twin"}
          </button>
        </form>
      </div>
    </section>
  );
}
