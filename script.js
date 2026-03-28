document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursor Glow Effect
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursorGlow, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // 2. Transition Logic: Landing to Builder
    window.enterBuilder = () => {
        gsap.to('#landing-page', {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.inOut",
            onComplete: () => {
                document.getElementById('landing-page').style.display = 'none';
                const builder = document.getElementById('builder-interface');
                builder.style.display = 'block';
                builder.style.opacity = '0';
                gsap.to(builder, {
                    opacity: 1,
                    duration: 1,
                    onComplete: () => {
                        addChatMessage('ai', 'VANDER ARCHITECT: Systems synchronized. What are we building today?');
                    }
                });
            }
        });
    };

    window.exitBuilder = () => { window.location.reload(); };

    // 3. Chat Logic
    window.sendChatMessage = () => {
        const input = document.getElementById('user-prompt');
        const text = input.value.trim();
        if (!text) return;

        addChatMessage('user', text);
        input.value = '';

        // Simulate AI Construction (Base44 style)
        setTimeout(() => {
            const model = document.getElementById('model-select').value;
            let response = "";
            let codeSnippet = "";

            if (text.toLowerCase().includes("website") || text.toLowerCase().includes("landing")) {
                response = `[${model}]: Building structural components for your technical landing page. I'll focus on high-end glassmorphism and performance optimizations.`;
                codeSnippet = `// Architect Code Output [${model}]\n// Initializing Landing Page Header Component\n\nfunction renderHeader() {\n    const nav = document.createElement('nav');\n    nav.className = 'glass sticky top-0';\n    return nav;\n}\n\n// Deploying core hero logic...`;
            } else if (text.toLowerCase().includes("app") || text.toLowerCase().includes("dashboard")) {
                response = `[${model}]: Architecting an AI-powered dashboard. Initializing data-grid kernels and state persistence.`;
                codeSnippet = `// Architect Code Output [${model}]\n// Generating Application State Management Layer\n\nconst AppState = {\n    activeUser: "VanderMaster",\n    sessionToken: "VDR_0xCADE3",\n    status: "OPTIMIZED"\n};\n\nfunction syncState() {\n    console.log("State: Synchronized.");\n}`;
            } else {
                response = `[${model}]: Prompt analyzed. Initializing specialized code generation for the provided technical context. Check the terminal for output.`;
                codeSnippet = `// Code Output [${model}]\n// Generating optimized logic based on user input: ${text}\n\nfunction initializeTerminal() {\n    const status = "BASE44-ONLINE";\n    return status;\n}`;
            }

            addChatMessage('ai', response);
            updateCodeOutput(codeSnippet);
        }, 1200);
    };

    function addChatMessage(type, text) {
        const history = document.getElementById('chat-history');
        const msg = document.createElement('div');
        msg.className = `msg ${type}`;
        msg.innerText = text;
        history.appendChild(msg);
        history.scrollTop = history.scrollHeight;

        gsap.from(msg, {
            y: 10,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    }

    function updateCodeOutput(code) {
        const codeOut = document.getElementById('code-output');
        codeOut.innerText = code;
        gsap.from(codeOut, {
            opacity: 0,
            duration: 0.5
        });
    }

    // 4. Builder Tab Logic
    window.switchBuilderView = (view) => {
        const tabs = document.querySelectorAll('.tab-item');
        tabs.forEach(t => t.classList.remove('active'));
        
        if (view === 'code') {
            tabs[0].classList.add('active');
            document.getElementById('editor-view').style.display = 'block';
            document.getElementById('preview-view').style.display = 'none';
        } else {
            tabs[1].classList.add('active');
            document.getElementById('editor-view').style.display = 'none';
            document.getElementById('preview-view').style.display = 'flex';
            setTimeout(() => {
                const preview = document.getElementById('preview-view');
                preview.innerHTML = '<h2 style="color:#00f2ff; font-family:Orbitron;">BUILD STATUS: SUCCESS</h2>';
            }, 1500);
        }
    };

    // 5. Background Particles
    const particleContainer = document.getElementById('particles-js');
    if (particleContainer) {
        for (let i = 0; i < 70; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 2 + 1;
            p.style.width = p.style.height = `${size}px`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${Math.random() * 100}%`;
            particleContainer.appendChild(p);
            gsap.to(p, {
                x: `+=${Math.random() * 120 - 60}`,
                y: `+=${Math.random() * 120 - 60}`,
                duration: 10 + Math.random() * 10,
                repeat: -1,
                yoyo: true,
                ease: "linear"
            });
        }
    }
});
