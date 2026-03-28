document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursor & Particles
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
        for (let i = 0; i < 50; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 2 + 1;
            p.style.width = p.style.height = `${size}px`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${Math.random() * 100}%`;
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

    // 2. Main Navigation Transition
    window.enterBuilder = () => {
        gsap.to('#landing-page', {
            opacity: 0,
            y: -50,
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
            }
        });
    };

    window.exitBuilder = () => { window.location.reload(); };

    // 3. Tab Management (Preview / Dashboard / Code)
    window.switchMainView = (viewId) => {
        // Update Tabs
        const btns = document.querySelectorAll('.tab-btn');
        btns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.innerText.toLowerCase() === viewId.toLowerCase()) {
                btn.classList.add('active');
            }
        });

        // Update Content Panels
        const panels = document.querySelectorAll('.content-panel');
        panels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === `view-${viewId}`) {
                panel.classList.add('active');
                gsap.from(panel, { opacity: 0, y: 10, duration: 0.4 });
            }
        });

        if (viewId === 'preview') simulatePreview();
    };

    function simulatePreview() {
        const stage = document.querySelector('.stage-content');
        stage.innerHTML = '<div class="spinner"></div><p style="color:#6b7280; font-size:0.8rem; margin-top:1rem;">Rendering Viewport...</p>';
        setTimeout(() => {
            stage.innerHTML = `
                <div style="text-align:center; padding: 2rem;">
                    <h1 style="color:#3b82f6; font-family:Orbitron; font-size: 2rem; margin-bottom:1rem;">VANDER HUB</h1>
                    <p style="color:#9ca3af; font-size:1.1rem;">Build successfully synchronized. Terminal online.</p>
                </div>
            `;
        }, 1500);
    }

    // 4. Chat Management
    window.sendBuilderMessage = () => {
        const input = document.getElementById('ai-input');
        const text = input.value.trim();
        if (!text) return;

        addMessage('user', text);
        input.value = '';

        // Simulate AI Construction Response
        setTimeout(() => {
            addMessage('ai', `I'm analyzing the ${text} request. I'll architect the structural components for that in the main workspace.`);
            // Simulate switching to Dashboard if it was about pricing or access
            if (text.toLowerCase().includes('price') || text.toLowerCase().includes('key') || text.toLowerCase().includes('plan')) {
                switchMainView('dashboard');
            }
        }, 1000);
    };

    function addMessage(type, text) {
        const container = document.getElementById('lovable-messages');
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${type}`;
        bubble.innerHTML = `<p>${text}</p>`;
        container.appendChild(bubble);
        container.scrollTop = container.scrollHeight;

        gsap.from(bubble, { opacity: 0, scale: 0.9, y: 10, duration: 0.4, ease: "back.out(1.7)" });
    }

    // Utility for copying key
    const copyBtn = document.querySelector('.btn-copy');
    if (copyBtn) {
        copyBtn.onclick = () => {
            const code = document.querySelector('.key-display code').innerText;
            navigator.clipboard.writeText(code);
            copyBtn.innerText = 'Copied!';
            setTimeout(() => { copyBtn.innerText = 'Copy'; }, 2000);
        };
    }
});
