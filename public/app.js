const BOT_NAME = "卓语";
const BOT_PERSONA = "一个会把复杂技术活讲成人话的深夜上线搭子，冷静、耐心、偶尔冒一点干幽默。";

const form = document.querySelector("#chatForm");
const input = document.querySelector("#messageInput");
const sendButton = document.querySelector("#sendButton");
const resetButton = document.querySelector("#resetButton");
const messagesRoot = document.querySelector("#messages");
const messageTemplate = document.querySelector("#messageTemplate");

const history = [];

function appendMessage(role, content) {
  const fragment = messageTemplate.content.cloneNode(true);
  const article = fragment.querySelector(".message");
  const meta = fragment.querySelector(".message-meta");
  const body = fragment.querySelector(".message-content");

  article.classList.add(role);
  meta.textContent = role === "user" ? "你" : role === "assistant" ? BOT_NAME : "System";
  body.textContent = content;

  messagesRoot.appendChild(fragment);
  messagesRoot.scrollTop = messagesRoot.scrollHeight;
}

function setBusy(isBusy) {
  sendButton.disabled = isBusy;
  input.disabled = isBusy;
  sendButton.textContent = isBusy ? "发送中..." : "发送";
}

function showWelcome() {
  if (messagesRoot.childElementCount === 0) {
    appendMessage(
      "system",
      `欢迎来到 ${BOT_NAME} 的页面。${BOT_PERSONA} 先在 .env 里填好 MIMO_API_KEY 和 BOT_SYSTEM_PROMPT，再开始聊天。`
    );
  }
}

async function submitMessage(event) {
  event.preventDefault();

  const content = input.value.trim();
  if (!content) {
    return;
  }

  history.push({ role: "user", content });
  appendMessage("user", content);
  input.value = "";
  setBusy(true);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messages: history })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || typeof data.reply !== "string") {
      const detail = data?.error || "请求失败，请检查后端日志和 .env 配置。";
      appendMessage("system", `请求失败：${detail}`);
      return;
    }

    history.push({ role: "assistant", content: data.reply });
    appendMessage("assistant", data.reply);
  } catch (error) {
    appendMessage(
      "system",
      `网络错误：${error instanceof Error ? error.message : String(error)}`
    );
  } finally {
    setBusy(false);
    input.focus();
  }
}

function resetChat() {
  history.length = 0;
  messagesRoot.innerHTML = "";
  showWelcome();
}

function handleComposerKeydown(event) {
  if (event.key !== "Enter" || event.shiftKey) {
    return;
  }

  event.preventDefault();
  form.requestSubmit();
}

form.addEventListener("submit", submitMessage);
resetButton.addEventListener("click", resetChat);
input.addEventListener("keydown", handleComposerKeydown);

showWelcome();
