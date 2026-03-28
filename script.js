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

    // 4. Chat Management (Base 44 Style + Real-time Builder Simulation)
    window.sendBuilderMessage = () => {
        const input = document.getElementById('ai-input');
        const text = input.value.trim();
        if (!text) return;

        addMessage('user', text);
        input.value = '';

        setTimeout(() => {
            let modelLabel = activeModel;
            let response = "";
            let code = "";

            // Simulate 'Key Authorization' check for presentation
            const hasKey = API_CONFIG[modelLabel.split(' ')[0]];
            const authStatus = hasKey ? `<span style="color:#10b981; font-size:0.7rem;">[AUTH VERIFIED]</span>` : `<span style="color:#ef4444; font-size:0.7rem;">[AUTH FAILED]</span>`;

            if (text.toLowerCase().includes("website") || text.toLowerCase().includes("landing")) {
                response = `<strong>[Architect Output | ${modelLabel}]</strong> ${authStatus}: Constructing high-precision structural kernels for your landing page. Focus on clinical light-mode aesthetics.`;
                code = `// Clinical Structural Kernel [${modelLabel}]\n// Authorization: SYNCED\n\nconst Layout = {\n    scheme: "clinical-white",\n    logic: "high-performance",\n    nodes: 12\n};\n\nfunction render() {\n    return \`Vander-Sync: ${modelLabel}\`;\n}`;
            } else if (text.toLowerCase().includes("app") || text.toLowerCase().includes("dashboard")) {
                response = `<strong>[Architect Output | ${modelLabel}]</strong> ${authStatus}: Building application state management layer for your dashboard. Synchronizing project nuclei.`;
                code = `// Dashboard Nucleus [${modelLabel}]\n// Authorization: SYNCED\n\nconst STATE = {\n    active: true,\n    model: "${modelLabel}",\n    access: "LIFETIME"\n};\n\nfunction syncDashboard() {\n    console.log("Nucleus synchronized.");\n}`;
            } else {
                response = `<strong>[Architect Output | ${modelLabel}]</strong> ${authStatus}: Specialized analysis complete. Architecting specialized logic for: ${text}`;
                code = `// Specialized Logic [${modelLabel}]\n// Authorization: SYNCED\n// Generating optimized code based on: ${text}\n\nfunction initTerminal() {\n    return "Status: Clinical-Online";\n}`;
            }

            addMessage('ai', response);
            updateEditorCode(code);
        }, 800);
    };

    function updateEditorCode(code) {
        const editor = document.getElementById('lovable-editor');
        editor.innerHTML = `<code>${code}</code>`;
        gsap.from(editor, { opacity: 0, duration: 0.4 });
    }

    function addMessage(type, text) {
        const container = document.getElementById('lovable-messages');
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${type}`;
        bubble.innerHTML = `<p>${text}</p>`;
        container.appendChild(bubble);
        container.scrollTop = container.scrollHeight;

        gsap.from(bubble, { opacity: 0, y: 15, duration: 0.5, ease: "power2.out" });
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
