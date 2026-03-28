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

    // 2. Main Navigation Transition
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

    // 3. Tab Management (Preview / Dashboard / Code)
    window.switchMainView = (viewId) => {
        const btns = document.querySelectorAll('.tab-btn');
        btns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.innerText.toLowerCase() === viewId.toLowerCase()) {
                btn.classList.add('active');
            }
        });

        const panels = document.querySelectorAll('.content-panel');
        panels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === `view-${viewId}`) {
                panel.classList.add('active');
                gsap.from(panel, { opacity: 0, y: 10, duration: 0.5 });
            }
        });

        if (viewId === 'preview') simulatePreview();
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

    // 4. Chat Management (Base 44 Style)
    window.sendBuilderMessage = () => {
        const input = document.getElementById('ai-input');
        const text = input.value.trim();
        if (!text) return;

        addMessage('user', text);
        input.value = '';

        setTimeout(() => {
            addMessage('ai', `Analysis complete. Architecting the <strong>${text}</strong> module with high-precision components.`);
            if (text.toLowerCase().includes('price') || text.toLowerCase().includes('plan')) {
                switchMainView('dashboard');
            }
        }, 900);
    };

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
