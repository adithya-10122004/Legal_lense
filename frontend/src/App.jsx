import { useState } from "react";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";

import ChatWindow from "./components/chat/Chatwindow";
import ChatInput from "./components/chat/ChatInput";
import Suggestions from "./components/chat/Suggestions";

function parseAnswer(answer) {
  const sections = {};

  const regex =
    /##\s*(Summary|Applicable Laws|Legal Procedure|Possible Penalties|Rights of the Citizen|Sources)\s*([\s\S]*?)(?=##|$)/g;

  let match;

  while ((match = regex.exec(answer)) !== null) {
    sections[match[1]] = match[2].trim();
  }

  return sections;
}

function buildFIRProcedureAnswer() {
  return `## Summary
A First Information Report (FIR) is the official complaint recorded by police when a cognizable offence is reported in India.

## Legal Procedure
1. Visit the nearest police station or call the emergency number for urgent matters.
2. Give a clear statement of what happened, including date, time, place, and the names of persons involved.
3. The police must record the FIR if the offence is cognizable.
4. Ask for the FIR copy and note the FIR number for future reference.
5. If police refuse to register the FIR, you may approach the Superintendent of Police or file a complaint before the magistrate.
6. Preserve evidence such as photos, messages, medical reports, and witnesses.

## Possible Penalties
Failure to register a FIR in a cognizable case may lead to departmental action against the officer and judicial intervention.

## Rights of the Citizen
You have the right to have the complaint recorded, receive a copy of the FIR, and seek higher authorities if the police do not comply.

## Sources
- Bharatiya Nagarik Suraksha Sanhita (BNSS)
- Indian Penal Code
- Supreme Court directions on FIR registration`;
}

export default function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState("chat");

  function addMessage(nextQuestion, answer) {
    const parsed = parseAnswer(answer);

    setMessages((prev) => [
      ...prev,
      {
        question: nextQuestion,
        answer,
        parsed,
      },
    ]);
  }

  async function askAI(customQuestion = null) {
  let nextQuestion;

  // If called from Suggestions, customQuestion is a string.
  // If called from the button, React passes a click event.
  if (typeof customQuestion === "string") {
    nextQuestion = customQuestion.trim();
  } else {
    nextQuestion = question.trim();
  }

  if (!nextQuestion) return;

  setLoading(true);
  setActiveView("chat");

  const apiBase =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  try {
    const res = await fetch(`${apiBase}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: nextQuestion,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Backend error");
    }

    addMessage(nextQuestion, data.answer);
    setQuestion("");
  } catch (err) {
    console.error(err);

    addMessage(
      nextQuestion,
      `## Summary

Unable to connect to the backend.

## Legal Procedure

- Make sure FastAPI is running.
- Verify the API URL.
- Check the backend terminal for errors.

## Sources

Backend connection failed.`
    );
  }

  setLoading(false);
}

  function handleHistoryClick() {
    setActiveView("history");
    setQuestion("");
  }

  function handleClearChats() {
    setMessages([]);
    setActiveView("chat");
    setQuestion("");
  }

  function handleShowFIRProcedure() {
    const firQuestion = "Show me the FIR registration procedure in India";
    addMessage(firQuestion, buildFIRProcedureAnswer());
    setQuestion("");
    setActiveView("chat");
  }

  function handleHistorySelect(selectedQuestion) {
    setQuestion(selectedQuestion);
    setActiveView("chat");
  }

  return (
    <div className="app-layout">
      <Sidebar
        messages={messages}
        onHistoryClick={handleHistoryClick}
        onClearChats={handleClearChats}
        onShowFIRProcedure={handleShowFIRProcedure}
        onHistorySelect={handleHistorySelect}
      />

      <div className="main-content">
        <Navbar />

        <div className="content-shell">
          <ChatWindow
            messages={messages}
            loading={loading}
            activeView={activeView}
          />

          {messages.length === 0 && !loading && activeView === "chat" && (
            <Suggestions setQuestion={setQuestion} />
          )}

          <ChatInput
            question={question}
            setQuestion={setQuestion}
            askAI={askAI}
            loading={loading}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}