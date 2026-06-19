(function () {

  //user-data

  const script = document.currentScript;

  const userId = script?.dataset?.userId

  const theme = "dark"

  let assistantConfig = null

  //load - css 

  const link = document.createElement("link")

  link.rel = "stylesheet"

  link.href = "http://localhost:5173/assistant.css"

  document.head.appendChild(link)

  //create popUp

  const popup = document.createElement("div");
  popup.className = `shifra-popup theme-${theme}`

  popup.innerHTML = `
    <div class="shifra-overlay"></div>

   <div class="shifra-content">

  <div class="shifra-top">
    
    <div class="shifra-orb-wrap">
      <div class="shifra-orb-glow"></div>
      <div class="shifra-orb"></div>
    </div>

    <h2 class="shifra-title">
      Hello! I am shifra AI
    </h2>

    <p class="shifra-sub">
      Your smart voice assistant.
      <br/>
      Ask anything about your website
    </p>

  </div> 

  <div class="shifra-status">
    Tap button to Speak
  </div>

    <div class="shifra-wave">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="shifra-user-text"></div>
    <div class="shifra-ai-text"></div>

   <div class="shifra-bottom"> 
    
    <button class="shifra-mic">
      <img
        src="http://localhost:5173/mic.png"
        alt="mic"
        class="shifra-mic-icon"
      />
    </button>

  </div> </div>
    
    `;

  document.body.appendChild(popup);

  // floating button

  const button = document.createElement("button")

  button.className = `shifra-btn theme-${theme}`
  button.innerHTML = `
       <img  src="http://localhost:5173/logo.svg" alt="logo"/>
    `
  document.body.appendChild(button)

  //toggle popup logic

  let open = false

  button.onclick = () => {
    open = !open;
    popup.style.display = open ? "flex" : "none";
  }

  // load assistant

  const loadAssistant = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/assistant/config/${userId}`)

      const data = await res.json()

      //console.log(data)

      if (data) {
        assistantConfig = data.user
        applyConfig()
      }

    } catch (error) {
      console.log(`Assistant load error : ${error}`)
    }
  }

  const applyConfig = () => {
    if (!assistantConfig) return;

    popup.className = `shifra-popup theme-${assistantConfig.theme}`

    button.className = `shifra-btn theme-${assistantConfig.button}`

    const title = popup.querySelector(".shifra-title")

    title.innerHTML = `Hello ! I am ${assistantConfig.assistantName}`;

    const subTitle = popup.querySelector(".shifra-sub")
    subTitle.innerHTML = `
        Welcome to 
        ${assistantConfig.businessName}.
        <br />
        Ask anything about your website.
        `;

  }

  loadAssistant()

  //Element

  const status = popup.querySelector(".shifra-status")

  const wave =
    popup.querySelector(
      ".shifra-wave"
    );

  const userText =
    popup.querySelector(
      ".shifra-user-text"
    );

  const aiText =
    popup.querySelector(
      ".shifra-ai-text"
    );

  const mic =
    popup.querySelector(
      ".shifra-mic"
    );

  //text to speech

  const speak = (text) => {

    window.speechSynthesis.cancel();

    aiText.innerText =
      text;

    status.innerText =
      "AI Speaking...";

    const speech = new SpeechSynthesisUtterance(text)

    speech.lang =
      "hi-IN";

    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    //Voice end
    speech.onend = () => {

      status.innerText =
        "Tap button to Speak";

      wave.style.opacity =
        "0";
    };

    //Start speaking
    window.speechSynthesis.speak(speech);

  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  if (SpeechRecognition) {

    const recognition = new SpeechRecognition();

    recognition.lang =
      "en-US";

    recognition.continuous =
      false;

    recognition.interimResults =
      false;

    mic.onclick = () => {
      wave.style.opacity =
        "1";

      status.innerText =
        "Listening...";

      userText.innerText =
        "";

      aiText.innerText =
        "";

      recognition.start();
    }

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript

      userText.innerText = "You : " + text;
      recognition.stop()

      setTimeout(async () => {
        try {
          status.innerText = "Thinking...";

          const res = await fetch("http://localhost:8000/api/assistant/ask", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              message: text,
              userId
            })
          })

          const data = await res.json()
          console.log(data);

          if (data.success) {
            if (data.action === "navigate") {
              speak(data.response)

              setTimeout(() => {
                window.location.href = data.path
              }, 1500)
            }
            else {
              speak(data.aiResponse)
            }
          }
          else {
            speak("response Error please Check your plan")
          }
        } catch (error) {
          console.log(error)
          speak(" AI Server error")
        }
      }, 600)

    };

    recognition.onerror = () => {
      status.innerText =
        "Tap Button to Speak";

      wave.style.opacity =
        "0";
    }
  }

  else{
     status.innerText = "Speech recognition not supported";
  }


})();