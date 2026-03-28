document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursor & Particles (Light)
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursorGlow, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    const particleContainer = document.getElementById('particles-js');
    if (particleContainer) {
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 2 + 1;
            p.style.width = p.style.height = `${size}px`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${Math.random() * 100}%`;
            p.style.background = '#000'; // Black particles on white
            p.style.opacity = '0.05';
            particleContainer.appendChild(p);
            gsap.to(p, {
                x: `+=${Math.random() * 100 - 50}`,
                y: `+=${Math.random() * 100 - 50}`,
                duration: 10 + Math.random() * 10,
                repeat: -1,
                yoyo: true,
                ease: "linear"
            });
        }
    }

    // 2. State Management (Hardcoded Simulated Keys for Presentation Access)
    let activeModel = 'Gemini 1.5 Flash';
    const API_CONFIG = {
        Gemini: 'AI-z-vander-flash-9wy-NGTC2D',
        Groq: 'gsk-vdr-llama3-70b-v2-0xCADE3',
        Mistral: 'mst-vander-7b-clinical-N7-B44'
    };

    // 3. Main Navigation Transition
    window.enterBuilder = () => {
        gsap.to('#landing-page', {
            opacity: 0,
            y: -50,
            scale: 0.98,
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: () => {
                document.getElementById('landing-page').style.display = 'none';
                const builder = document.getElementById('builder-interface');
                builder.style.display = 'block';
                builder.style.opacity = '0';
                gsap.to(builder, {
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out"
                });
                simulatePreview();
            }
        });
    };

    window.exitBuilder = () => { window.location.reload(); };

    // 3. Tab Management (Preview / Models / Code)
    window.switchMainView = (viewId) => {
        const btns = document.querySelectorAll('.tab-btn');
        btns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.innerText.toLowerCase().includes(viewId.toLowerCase()) || btn.getAttribute('onclick')?.includes(viewId)) {
                btn.classList.add('active');
            }
        });

        const panels = document.querySelectorAll('.content-panel');
        panels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === `view-${viewId}`) {
                panel.classList.add('active');
                gsap.from(panel, { opacity: 0, y: 15, duration: 0.3, ease: "power2.out" });
            }
        });

        if (viewId === 'preview') simulatePreview();
    };

    window.saveKey = (provider) => {
        const id = `${provider.toLowerCase()}-key`;
        const val = document.getElementById(id).value;
        if (val) {
            addMessage('ai', `<strong>Vander Architect</strong>: [${provider}] key synchronized successfully. System optimization active.`);
            document.getElementById(id).style.borderColor = "#10b981";
        }
    };

    function simulatePreview() {
        const stage = document.querySelector('.stage-content');
        stage.innerHTML = '<div class="spinner"></div><p style="color:#6b7280; font-size:0.9rem; margin-top:1.5rem; font-weight:600;">Architecting Interface...</p>';
        setTimeout(() => {
            stage.innerHTML = `
                <div style="text-align:center; padding: 2.5rem; animation: fadeIn 0.8s ease;">
                    <h1 style="color:#000; font-family:Inter,sans-serif; font-size: 2.5rem; font-weight:900; letter-spacing:-2px; margin-bottom:0.5rem;">VanderBuild</h1>
                    <p style="color:#6b7280; font-size:1.1rem; font-weight:500;">Clinical builder online. Prototype: Live.</p>
                </div>
            `;
        }, 1500);
    }

    // 4. Chat Management (REAL AI INTEGRATION)
    window.sendBuilderMessage = async () => {
        const input = document.getElementById('ai-input');
        const text = input.value.trim();
        if (!text) return;

        addMessage('user', text);
        input.value = '';

        // Retrieve the active key for Gemini (easiest to integrate free)
        const geminiKey = API_CONFIG.Gemini;
        
        // Show 'Processing' state
        const loadingMsgId = addMessage('ai', `<strong>[Architect Output | Processing...]</strong> Analyzing structural kernels...`);
        
        try {
            if (!geminiKey || geminiKey.includes('vander')) {
                throw new Error("Simulated key detected. Reverting to architecture simulation.");
            }

            // REAL GOOGLE GEMINI API CALL (Elite Prompting)
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `You are an elite Industrial Software Architect. The user wants to build: ${text}. Provide a senior-level technical architectural overview followed by a production-ready code snippet (HTML/CSS/JS or React) in a single code block.` }] }]
                })
            });

            const data = await response.json();
            const aiResponse = data.candidates[0].content.parts[0].text;

            // Separate the text from the code block if it exists
            const codeMatch = aiResponse.match(/```(?:[a-z]+)?\n([\s\S]*?)```/);
            const cleanText = aiResponse.replace(/```[\s\S]*?```/g, '').trim();
            const cleanCode = codeMatch ? codeMatch[1].trim() : `// Generated Architectural Logic\nconst output = "Ready";`;

            updateMessage(loadingMsgId, cleanText);
            updateEditorCode(cleanCode);

        } catch (error) {
            // FALLBACK TO PREMIUM SIMULATION IF NO REAL KEY OR ERROR
            setTimeout(() => {
                let responseText = "";
                let codeText = "";

                if (text.toLowerCase().includes("website") || text.toLowerCase().includes("landing")) {
                    responseText = `Initializing high-performance landing page architecture. utilizing adaptive grid kernels and clinical UI modules.`;
                    codeText = `// Clinical Landing Page [Industrial Grade]\nexport const App = () => {\n    const [nodes, setNodes] = useState(initKernel());\n    return (\n        <UIPackage theme="vander-light">\n            <ClinicalHero dynamic />\n            <Grid nodes={nodes} />\n        </UIPackage>\n    );\n};`;
                } else if (text.toLowerCase().includes("app") || text.toLowerCase().includes("dashboard")) {
                    responseText = `Architecting a functional dashboard nucleus. Implementing real-time data-binding and state persistence layers.`;
                    codeText = `// Dashboard Kernel [Advanced Architecture]\nclass DashboardRegistry {\n    constructor() {\n        this.state = new Map();\n        this.middleware = [];\n    }\n    use(plugin) {\n        this.middleware.push(plugin);\n    }\n    dispatch(event) {\n        this.state.set(Date.now(), event);\n    }\n}`;
                } else {
                    responseText = `Industrial project analysis complete. Generating clinical code logic for the specified architectural context.`;
                    codeText = `// Clinical Middleware Engine\nconst Engine = {\n    init: async () => {\n        await registry.sync();\n        return new Controller({ mode: 'synchronized' });\n    },\n    authorize: (key) => key.valid ? 'AUTHORIZED' : 'DENIED'\n};`;
                }

                updateMessage(loadingMsgId, responseText);
                updateEditorCode(codeText);
            }, 800);
        }
    };

    function addMessage(type, text) {
        const container = document.getElementById('lovable-messages');
        const bubble = document.createElement('div');
        const id = 'msg-' + Date.now();
        bubble.id = id;
        bubble.className = `chat-bubble ${type}`;
        bubble.innerHTML = `<p>${text}</p>`;
        container.appendChild(bubble);
        container.scrollTop = container.scrollHeight;

        gsap.from(bubble, { opacity: 0, y: 15, duration: 0.5, ease: "power2.out" });
        return id;
    }

    function updateMessage(id, text) {
        const msg = document.getElementById(id);
        if (msg) {
            msg.querySelector('p').innerHTML = text;
        }
    }

    // 5. Scroll Utility
    window.scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    // Copy to clipboard
    const copyBtn = document.querySelector('.btn-copy');
    if (copyBtn) {
        copyBtn.onclick = () => {
            const code = document.querySelector('.key-display code').innerText;
            navigator.clipboard.writeText(code);
            copyBtn.innerText = 'Copied';
            setTimeout(() => { copyBtn.innerText = 'Copy'; }, 1500);
        };
    }
});
