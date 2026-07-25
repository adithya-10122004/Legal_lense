import {
  Plus,
  Search,
  History,
  BookOpen,
  Shield,
  FileText,
  Trash2,
  Settings,
} from "lucide-react";

export default function Sidebar({
  messages,
  onHistoryClick,
  onClearChats,
  onShowFIRProcedure,
  onHistorySelect,
}) {
  const recentChats = messages.slice(-4).reverse();

  return (
    <div className="sidebar">
      <div>
        <div className="logo">
          <div className="logo-badge">⚖</div>
          <div>
            <h2>LEGAL LENSE AI</h2>
            <p>AI powered Indian legal assistant</p>
          </div>
        </div>

        <button className="new-chat" onClick={() => onHistorySelect("")}>
          <Plus size={18} />
          <span>New chat</span>
        </button>

        <div className="history">
          <h4>Recent chats</h4>

          {recentChats.length > 0 ? (
            recentChats.map((item, index) => (
              <div
                key={`${item.question}-${index}`}
                className="chat-item"
                onClick={() => onHistorySelect(item.question)}
              >
                <Search size={18} />
                <span>{item.question}</span>
              </div>
            ))
          ) : (
            <div className="chat-item">
              <BookOpen size={18} />
              <span>No chats yet</span>
            </div>
          )}

          <div className="chat-item" onClick={onShowFIRProcedure}>
            <FileText size={18} />
            <span>FIR procedure</span>
          </div>
        </div>
      </div>

      <div className="bottom-menu">
        <div className="menu-item" onClick={onHistoryClick}>
          <History size={18} />
          <span>History</span>
        </div>

        <div className="menu-item" onClick={onClearChats}>
          <Trash2 size={18} />
          <span>Clear chats</span>
        </div>

        <div className="menu-item">
          <Settings size={18} />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}