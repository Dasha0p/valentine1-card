const btn = document.getElementById("surpriseBtn");

const clickSound = new Audio("mixkit-mouse-click-close-1113.wav");
clickSound.volume = 0.4;

btn.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();
  showSecretMessage();
});

function showSecretMessage() {
  const oldSecret = document.querySelector(".secret");
  if (oldSecret) oldSecret.remove();

  const message = document.createElement("div");
  message.className = "secret";

  message.innerHTML = `
    <div class="secret-card">
      <p>
        Иногда самый важный код<br>
        пишется не для системы,<br>
        а для человека.
      </p>

      <pre><code id="codeLine"></code><span class="cursor">|</span></pre>

      <p class="final-line hidden">
        И цикл не прервётся 🤍
      </p>

      <div class="buttons">
        <button id="replayBtn" class="replay hidden">
          Посмотреть ещё раз
        </button>

        <button id="closeBtn" class="close">
          Закрыть
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(message);

  setTimeout(() => {
    message.classList.add("visible");
    startTyping();
  }, 100);
}

function startTyping() {
  const codeElement = document.getElementById("codeLine");
  const cursor = document.querySelector(".cursor");

  codeElement.textContent = "";

  typeText("while (life) { friendship++; }", "codeLine", () => {
    document.querySelector(".final-line").classList.remove("hidden");

    const replayBtn = document.getElementById("replayBtn");
    replayBtn.classList.remove("hidden");

    replayBtn.onclick = () => {
      document.querySelector(".final-line").classList.add("hidden");
      replayBtn.classList.add("hidden");
      startTyping();
    };
  });
}

function typeText(text, elementId, callback) {
  const el = document.getElementById(elementId);
  let i = 0;

  const typingSound = new Audio("mixkit-mouse-click-close-1113.wav");
  typingSound.volume = 0.15;

  const interval = setInterval(() => {
    el.textContent += text[i];
    typingSound.currentTime = 0;
    typingSound.play();
    i++;

    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 100);
}

// Закрытие
document.addEventListener("click", (e) => {
  if (e.target.id === "closeBtn") {
    document.querySelector(".secret").remove();
  }
});