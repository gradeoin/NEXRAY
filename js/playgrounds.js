class NexrayPlayground {
    constructor() {
        this.init();
    }

    init() {
        // Find all code blocks that should be playgrounds
        const codeBlocks = document.querySelectorAll('pre > code.language-html-playground');
        codeBlocks.forEach((block, index) => {
            this.createPlayground(block, index);
        });
        
        this.injectStyles();
    }

    injectStyles() {
        if (document.getElementById('playground-styles')) return;
        const style = document.createElement('style');
        style.id = 'playground-styles';
        style.textContent = `
            .playground-wrapper {
                margin: 2rem 0;
                border-radius: 16px;
                overflow: hidden;
                border: 1px solid var(--glass-b);
                background: #0f172a;
                box-shadow: var(--shadow);
            }
            .playground-header {
                padding: 12px 20px;
                background: rgba(255,255,255,0.03);
                border-bottom: 1px solid rgba(255,255,255,0.05);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .playground-label {
                font-family: 'Space Grotesk', sans-serif;
                font-weight: 700;
                font-size: 0.8rem;
                color: var(--brand);
                text-transform: uppercase;
                letter-spacing: 0.05em;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .playground-main {
                display: grid;
                grid-template-columns: 1fr 1fr;
                min-height: 300px;
            }
            @media (max-width: 768px) {
                .playground-main { grid-template-columns: 1fr; }
            }
            .playground-editor {
                padding: 0;
                position: relative;
                border-right: 1px solid rgba(255,255,255,0.05);
            }
            .playground-textarea {
                width: 100%;
                height: 100%;
                background: transparent;
                color: #e2e8f0;
                border: none;
                padding: 20px;
                font-family: 'Fira Code', monospace;
                font-size: 0.9rem;
                resize: none;
                outline: none;
                line-height: 1.5;
            }
            .playground-preview {
                background: white;
                position: relative;
            }
            .playground-iframe {
                width: 100%;
                height: 100%;
                border: none;
                background: white;
            }
            .playground-badge {
                position: absolute;
                top: 10px;
                right: 10px;
                padding: 4px 8px;
                background: rgba(0,0,0,0.05);
                border-radius: 4px;
                font-size: 10px;
                font-weight: 700;
                color: #64748b;
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }

    createPlayground(codeBlock, id) {
        const initialCode = codeBlock.textContent.trim();
        const pre = codeBlock.parentElement;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'playground-wrapper';
        wrapper.innerHTML = `
            <div class="playground-header">
                <div class="playground-label">
                    <span style="font-size:1.2rem;">⚡</span> Live Playground
                </div>
                <div style="font-size:10px; color:rgba(255,255,255,0.3); font-family:monospace;">ID: NX-PLAY-${id}</div>
            </div>
            <div class="playground-main">
                <div class="playground-editor">
                    <textarea class="playground-textarea" spellcheck="false">${initialCode}</textarea>
                </div>
                <div class="playground-preview">
                    <div class="playground-badge">PREVIEW</div>
                    <iframe class="playground-iframe" id="iframe-${id}"></iframe>
                </div>
            </div>
        `;

        pre.replaceWith(wrapper);
        
        const textarea = wrapper.querySelector('.playground-textarea');
        const iframe = wrapper.querySelector('.playground-iframe');
        
        const updatePreview = () => {
            const content = textarea.value;
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(content);
            doc.close();
        };

        textarea.addEventListener('input', updatePreview);
        // Initial render
        setTimeout(updatePreview, 100);
    }
}

// Global Init
window.addEventListener('DOMContentLoaded', () => {
    window.NexrayPlayground = new NexrayPlayground();
});
