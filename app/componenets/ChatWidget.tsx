"use client";

import React, { useEffect, useRef, useState } from "react";

type Msg = { id: string; role: "user" | "assistant" | "system"; text: string };

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function ChatFloat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(() => [
    {
      id: uid(),
      role: "system",
      text: "A helpful education assistant. Ask about universities, admissions, scholarships, test prep, or anything else.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight + 9999;
  }, [msgs, isStreaming, open]);

  async function sendMessage() {
    if (!input.trim()) return;
    setError(null);

    const userMsg: Msg = { id: uid(), role: "user", text: input.trim() };
    setMsgs((s) => [...s, userMsg]);
    setInput("");
    setIsStreaming(true);

    const assistantId = uid();
    setMsgs((s) => [...s, { id: assistantId, role: "assistant", text: "" }]);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const text = await res.text();
        setError(`Server error: ${res.status} ${text}`);
        setIsStreaming(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setError("No streaming body from server.");
        setIsStreaming(false);
        return;
      }

      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        if (value) {
          const str = decoder.decode(value, { stream: true });
          setMsgs((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, text: m.text + str } : m
            )
          );
        }
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        setError("Request aborted.");
      } else {
        setError(String(err?.message ?? err));
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }

  function stopStreaming() {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
  }

  return (
    <>
      {/* Floating button */}
      <button
        aria-label="Open chat"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[99999] rounded-full p-3 bg-gradient-to-br from-blue-600/70 to-cyan-500/60 shadow-lg hover:scale-105 transform transition duration-200 ring-1 ring-cyan-400/30 backdrop-blur-md"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.97-4.03 9-9 9a8.96 8.96 0 01-4.95-1.53L3 21l1.53-3A8.96 8.96 0 013 12c0-4.97 4.03-9 9-9s9 4.03 9 9z"
          />
        </svg>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-[99999] w-[360px] max-w-[92vw] h-[560px] md:w-96 md:h-[640px] rounded-3xl backdrop-blur-xl bg-gradient-to-br from-[#0a1326]/70 to-[#0d1835]/70 ring-1 ring-cyan-500/40 shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-800/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-700/40 to-blue-900/40 flex items-center justify-center ring-1 ring-cyan-400/30">
                <svg
                  className="w-5 h-5 text-cyan-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.97-4.03 9-9 9a8.96 8.96 0 01-4.95-1.53L3 21l1.53-3A8.96 8.96 0 013 12c0-4.97 4.03-9 9-9s9 4.03 9 9z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  Campus Assistant
                </div>
                <div className="text-xs text-cyan-200/60">
                  Ask anything — admissions, scholarships, tests
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isStreaming && (
                <button
                  title="Stop streaming"
                  onClick={stopStreaming}
                  className="text-xs px-3 py-1 rounded-md bg-red-700/50 text-red-100 hover:bg-red-700/70 transition"
                >
                  Stop
                </button>
              )}

              <button
                onClick={() => setOpen(false)}
                title="Close chat"
                className="text-cyan-200/70 hover:text-white p-2 rounded-md"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-cyan-700/60 scrollbar-track-transparent"
          >
            {msgs.map((m) => (
              <div
                key={m.id}
                className={`max-w-full ${
                  m.role === "user" ? "flex justify-end" : "flex justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-2xl text-sm leading-relaxed break-words transition-all duration-200 ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-cyan-600/80 to-blue-600/70 text-white rounded-br-none shadow-md"
                      : "bg-[#0c1b36]/70 ring-1 ring-cyan-600/30 text-cyan-100 rounded-bl-none shadow-sm"
                  }`}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {m.text || (m.role === "assistant" && isStreaming ? "…" : "")}
                </div>
              </div>
            ))}
            {error && (
              <div className="text-xs text-red-300 bg-red-900/20 px-3 py-2 rounded-md">
                {error}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-cyan-800/20 bg-[#0a1326]/50 backdrop-blur-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex gap-2 items-center"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about admissions, scholarships, tests..."
                className="flex-1 bg-[#0b1b36]/60 placeholder-cyan-200/40 text-cyan-50 px-3 py-2 rounded-xl ring-1 ring-cyan-700/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition"
                aria-label="Type your question"
                disabled={isStreaming && false}
              />
              <button
                type="submit"
                disabled={isStreaming}
                className="ml-1 rounded-xl px-4 py-2 bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-sm font-medium shadow-md hover:scale-[1.03] transition disabled:opacity-60"
              >
                {isStreaming ? "Streaming..." : "Send"}
              </button>
            </form>

            <div className="mt-2 text-xs text-cyan-200/60 flex items-center justify-between">
              <div>Streaming (typewriter) mode</div>
              <div className="text-[11px]">
                <button
                  onClick={() => {
                    setMsgs((s) => s.filter((m) => m.role === "system"));
                    setError(null);
                    setInput("");
                  }}
                  className="underline underline-offset-2 hover:text-white"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
