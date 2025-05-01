
function injectTailwindCSS() {
  if (!document.getElementById('tailwind-injected')) {
    const script = document.createElement('script');
    script.id = 'tailwind-injected';
    script.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(script);
  }
}


export const LenderShareAPI = {
  share({ title = '', text = '', url = window.location.href }) {
    

    if (!document.getElementById('shareContainer')) {
      injectFontAwesome();
      injectShareStyles();
      injectShareHTML();
      injectTailwindCSS()
    }

    document.querySelectorAll('.social-icon').forEach(button => {
      button.onclick = () => {
        const platform = button.getAttribute('data-share');
        handleShare(platform, { title, text, url });
      };
    });

    document.getElementById('shareBackdrop').classList.add('show');
    document.getElementById('shareContainer').classList.add('show');
    document.body.style.overflow = 'hidden';
  }
};

// Inject Font Awesome (sans import HTML)
function injectFontAwesome() {
  if (!document.getElementById('fa-injected')) {
    const link = document.createElement('link');
    link.id = 'fa-injected';
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
  }
}

// Inject styles sans Tailwind
function injectShareStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .share-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.5);
      opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
      z-index: 40;
    }
    .share-backdrop.show {
      opacity: 1; pointer-events: all;
    }
    .share-container {
      position: fixed; bottom: 0; left: 0; right: 0;
      transform: translateY(100%); transition: transform 0.3s ease;
      z-index: 50; max-width: 500px; margin: auto;
      background: white; border-radius: 16px 16px 0 0; box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
      font-family: sans-serif;
    }
    .share-container.show {
      transform: translateY(0);
    }
    .share-header, .share-footer {
      display: flex; justify-content: space-between; align-items: center;
      padding: 1rem; border-bottom: 1px solid #ddd;
    }
    .share-footer {
      border-top: 1px solid #ddd;
    }
    .share-title {
      font-size: 1rem; font-weight: bold; color: #333;
    }
    .share-btn {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
      padding: 1rem; text-align: center; font-size: 0.75rem; color: #444;
    }
    .social-icon {
      display: flex; flex-direction: column; align-items: center;
      transition: transform 0.2s ease;
    }
    .social-icon:hover {
      transform: scale(1.1);
    }
    .icon-wrapper {
      width: 48px; height: 48px; border-radius: 9999px;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 0.5rem; background: #f3f4f6;
    }
    .close-btn, .cancel-btn {
      background: none; border: none; color: #2563eb;
      font-weight: bold; cursor: pointer;
    }
    .cancel-btn {
      width: 100%; padding: 0.75rem 1rem; font-size: 1rem;
    }
  `;
  document.head.appendChild(style);
}

function injectShareHTML() {
  const html = `
    <div id="shareBackdrop" class="share-backdrop"></div>
    <div id="shareContainer" class="share-container">
      <div class="share-header">
        <span class="share-title">Partager via...</span>
        <button id="closeShare" class="close-btn"><i class="fas fa-times"></i></button>
      </div>
      <div class="share-btn">
        ${getButtonsHTML()}
      </div>
      <div class="share-footer">
        <button id="cancelShare" class="cancel-btn">Annuler</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);

  document.getElementById('cancelShare').onclick = hideShare;
  document.getElementById('closeShare').onclick = hideShare;
  document.getElementById('shareBackdrop').onclick = hideShare;
  document.getElementById('shareContainer').onclick = e => e.stopPropagation();
}

function hideShare() {
  document.getElementById('shareBackdrop')?.classList.remove('show');
  document.getElementById('shareContainer')?.classList.remove('show');
  document.body.style.overflow = '';
}

function handleShare(platform, { title, text, url }) {
  const t = encodeURIComponent(text);
  const u = encodeURIComponent(url);
  const s = encodeURIComponent(title);
  let shareUrl = '';

  switch (platform) {
    case 'linkedin':
  shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${u}&title=${s}&summary=${t}`;
  break;
case 'reddit':
  shareUrl = `https://www.reddit.com/submit?url=${u}&title=${s}`;
  break;
case 'pinterest':
  shareUrl = `https://pinterest.com/pin/create/button/?url=${u}&description=${t}`;
  break;
case 'tumblr':
  shareUrl = `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${u}&title=${s}&caption=${t}`;
  break;
case 'snapchat':
  shareUrl = `https://www.snapchat.com/scan?attachmentUrl=${u}`;
  break;
case 'line':
  shareUrl = `https://social-plugins.line.me/lineit/share?url=${u}`;
  break;
case 'skype':
  shareUrl = `https://web.skype.com/share?url=${u}&text=${t}`;
  break;
case 'discord':
  shareUrl = `https://discord.com/channels/@me`; // lien à ouvrir manuellement
  alert("Copié pour partager dans Discord.");
  navigator.clipboard.writeText(`${text} ${url}`);
  break;
case 'weibo':
  shareUrl = `https://service.weibo.com/share/share.php?url=${u}&title=${t}`;
  break;
case 'vk':
  shareUrl = `https://vk.com/share.php?url=${u}`;
  break;
case 'xing':
  shareUrl = `https://www.xing.com/app/user?op=share&url=${u}`;
  break;
case 'buffer':
  shareUrl = `https://buffer.com/add?text=${t}&url=${u}`;
  break;
    case 'clipboard':
      navigator.clipboard.writeText(`${text} ${url}`).then(() => alert("Lien copié !"));
      hideShare(); return;
  }

  if (shareUrl) window.open(shareUrl, '_blank');
  hideShare();
}

function getButtonsHTML() {
  return [
    ['whatsapp', 'fab fa-whatsapp', 'color:#25D366'],
    ['facebook', 'fab fa-facebook', 'color:#1877F2'],
    ['twitter', 'fab fa-twitter', 'color:#1DA1F2'],
    ['email', 'fas fa-envelope', 'color:#666'],
    ['telegram', 'fab fa-telegram', 'color:#0088cc'],
    ['messenger', 'fab fa-facebook-messenger', 'color:#0078FF'],
    ['sms', 'fas fa-comment-dots', 'color:#0f0'],
    ['clipboard', 'fas fa-copy', 'color:#7c3aed'],
    ['linkedin', 'fab fa-linkedin', 'color:#0077b5'],
    ['reddit', 'fab fa-reddit', 'color:#FF5700'],
    ['pinterest', 'fab fa-pinterest', 'color:#E60023'],
    ['tumblr', 'fab fa-tumblr', 'color:#36465D'],
    ['snapchat', 'fab fa-snapchat-ghost', 'color:#FFFC00'],
    ['line', 'fab fa-line', 'color:#00c300'],
    ['skype', 'fab fa-skype', 'color:#00aff0'],
    ['discord', 'fab fa-discord', 'color:#5865F2'],
    ['weibo', 'fab fa-weibo', 'color:#E6162D'],
    ['vk', 'fab fa-vk', 'color:#4680C2'],
    ['xing', 'fab fa-xing', 'color:#026466'],
    ['buffer', 'fab fa-buffer', 'color:#168eea']
  ].map(([id, icon, color]) => `
    <button class="social-icon" data-share="${id}">
      <div class="icon-wrapper" style="${color}">
        <i class="${icon}" style="${color}; font-size:1.5rem;"></i>
      </div>
      <span>${id.charAt(0).toUpperCase() + id.slice(1)}</span>
    </button>
  `).join('');
}