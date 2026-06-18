(function(){
    
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

  </div> <div class="shifra-status">
    Tap button to Speak

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

  </div> <div class="shifra-bottom"> 
    
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
    button.innerHTML=`
       <img  src="http://localhost:5173/logo.svg" alt="logo"/>
    `
    document.body.appendChild(button)

    //toggle popup logic

    let open=false

    button.onclick = ()=>{
        open = !open;
        popup.style.display = open ? "flex" : "none";
    }

    // load assistant

    const loadAssistant = async()=>{
        try {
            const res = await fetch(`http://localhost:8000/api/assistant/config/${userId}`)

            const data = await res.json()

            console.log(data)

            if(data){
                assistantConfig = data.user
                applyConfig()
            }

        } catch (error) {
            console.log(`Assistant load error : ${error}`)
        }
    }

    const applyConfig = ()=>{
        if(!assistantConfig) return;
        
        popup.className = `shifra-popup theme-${assistantConfig.theme}`

        button.className = `shifra-btn theme-${assistantConfig.button}`

        const title = popup.querySelector(".shifra-title")

        title.innerHTML = `Hello ! I am ${assistantConfig.assistantName}`;

        const subTitle = popup.querySelector(".shifra-sub")
        subTitle.innerHTML=`
        Welcome to 
        ${assistantConfig.businessName}.
        <br />
        Ask anything about your website.
        `;

    }

    loadAssistant()





})();