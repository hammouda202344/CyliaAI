const API_KEY = "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";

const tools = document.querySelectorAll("#tool-list li");
const toolTitle = document.getElementById("tool-title");
const inputText = document.getElementById("input-text");
const submitBtn = document.getElementById("submit-btn");
const clearBtn = document.getElementById("clear-btn");
const loading = document.getElementById("loading");
const outputContainer = document.getElementById("output-container");

let currentTool = "chatbot";

tools.forEach(tool => {
  tool.addEventListener("click", () => {
    tools.forEach(t => t.classList.remove("active"));
    tool.classList.add("active");
    currentTool = tool.dataset.tool;
    toolTitle.innerText = tool.innerText;
    inputText.value = "";
    outputContainer.innerHTML = "";
  });
});

clearBtn.addEventListener("click", () => {
  inputText.value = "";
  outputContainer.innerHTML = "";
});

submitBtn.addEventListener("click", async () => {
  const prompt = inputText.value.trim();
  if(!prompt) return;
  loading.style.display = "block";

  try {
    if(currentTool === "chatbot") {
      const response = await fetch("https://api.manus.ai/gpt5", {
        method:"POST",
        headers: { "Content-Type":"application/json", "Authorization":`Bearer ${API_KEY}` },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      addOutputCard(data.response);
    } else if(currentTool === "image-gen") {
      const imgUrl = "https://picsum.photos/seed/"+encodeURIComponent(prompt)+"/512/512";
      addOutputCard(`<img src="${imgUrl}" alt="Generated Image"/>`);
    } else if(currentTool === "video-gen") {
      addOutputCard(`<video controls><source src="https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4" type="video/mp4"></video>`);
    } else if(currentTool === "tts") {
      addOutputCard(`<audio controls src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"></audio>`);
    } else if(currentTool === "speech-to-text") {
      addOutputCard("Speech-to-Text output will appear here (demo).");
    } else if(currentTool === "avatar") {
      const avatarUrl = "https://i.pravatar.cc/150?u="+encodeURIComponent(prompt);
      addOutputCard(`<img src="${avatarUrl}" alt="Avatar"/>`);
    } else if(currentTool === "image-edit") {
      addOutputCard(`<img src="https://picsum.photos/512/512?random=1" alt="Edited Image"/>`);
    } else if(currentTool === "video-edit") {
      addOutputCard(`<video controls><source src="https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4" type="video/mp4"></video>`);
    }
  } catch(e) {
    addOutputCard("Error: " + e.message);
  }

  loading.style.display = "none";
});

function addOutputCard(content){
  const card = document.createElement("div");
  card.className = "output-card";
  card.innerHTML = content;
  outputContainer.prepend(card);
}
