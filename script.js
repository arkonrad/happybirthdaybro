// ========== Emoji Columns Background ==========
const emojiList = ['🎂','🎉','🎈','🥳','🍰'];
const columns = 12;
const emojiBg = document.getElementById('emoji-columns-bg');
emojiBg.innerHTML = '';
const emojisPerCol = Math.ceil(window.innerHeight / 48) + 2;

for (let i = 0; i < columns; i++) {
    const col = document.createElement('div');
    col.className = 'emoji-column ' + (i % 2 === 0 ? 'up' : 'down');
    for (let j = 0; j < emojisPerCol * 2; j++) {
        const emoji = document.createElement('span');
        emoji.textContent = emojiList[Math.floor(Math.random()*emojiList.length)];
        col.appendChild(emoji);
    }
    emojiBg.appendChild(col);
}

// ========== Flip Boxes ==========
const flipBoxImages = [
  'https://i.imgur.com/dhQeoIX.jpeg',
  'https://i.imgur.com/2lYw3bD.jpeg',
  'https://i.imgur.com/3Q2Qw1g.jpeg',
  'https://i.imgur.com/4nQw2kP.jpeg',
  'https://i.imgur.com/5nQw3kQ.jpeg',
  'https://i.imgur.com/6nQw4kR.jpeg',
  'https://i.imgur.com/7nQw5kS.jpeg',
  'https://i.imgur.com/8nQw6kT.jpeg',
  'https://i.imgur.com/9nQw7kU.jpeg',
  'https://i.imgur.com/AnQw8kV.jpeg',
  'https://i.imgur.com/BnQw9kW.jpeg',
  'https://i.imgur.com/CnQw0kX.jpeg'
];

const flipboxSection = document.getElementById('flipbox-section');
flipBoxImages.slice(0, 12).forEach((imgUrl, i) => {
  const flipbox = document.createElement('button');
  flipbox.className = 'flipbox';
  flipbox.setAttribute('aria-label', 'Flip to reveal image');
  flipbox.innerHTML = `
    <div class="flipbox-inner">
      <div class="flipbox-front">
        <span class="question">?</span>
        <span class="click-text">Click to reveal!</span>
      </div>
      <div class="flipbox-back">
        <img src="${imgUrl}" alt="Birthday surprise ${i+1}" draggable="false">
      </div>
    </div>
  `;
  flipboxSection.appendChild(flipbox);

  // Toggle flip on click, confetti only when opening, confetti from flipbox center
  flipbox.addEventListener('click', function(e) {
    const isFlipped = flipbox.classList.contains('flipped');
    flipbox.classList.toggle('flipped');
    if (!isFlipped) {
      setTimeout(() => {
        confettiBurstFromCenter(flipbox);
      }, 300); // match flip animation duration in CSS
    }
  });
});

// ========== Confetti Burst (robust, always from visible center) ==========
function confettiBurstFromCenter(target) {
  const colors = ['#ff6ec4','#f7971e','#43e97b','#38f9d7','#ff6ec4','#fff700','#ffb347','#b19cd9'];
  const rect = target.getBoundingClientRect();
  const scrollLeft = window.scrollX || window.pageXOffset;
  const scrollTop = window.scrollY || window.pageYOffset;
  const centerX = rect.left + rect.width / 2 + scrollLeft;
  const centerY = rect.top + rect.height / 2 + scrollTop;
  const parent = document.body;
  for (let i = 0; i < 24; i++) {
    const conf = document.createElement('div');
    conf.className = 'confetti-piece';
    conf.style.background = colors[Math.floor(Math.random()*colors.length)];
    conf.style.position = 'absolute';
    conf.style.left = (centerX + (Math.random()-0.5)*80) + 'px';
    conf.style.top = (centerY + (Math.random()-0.5)*20) + 'px';
    conf.style.setProperty('--y', (60 + Math.random()*60) + 'px');
    conf.style.transform = `scale(${0.8 + Math.random()*0.7}) rotate(${Math.random()*360}deg)`;
    parent.appendChild(conf);
    setTimeout(()=>conf.remove(), 1200);
  }
}

// ========== Do Not Click Box Reveal ==========
const doNotClickBox = document.getElementById('do-not-click-box');
const ominousMessage = document.getElementById('ominous-message');
doNotClickBox.addEventListener('click', () => {
  const isOpen = ominousMessage.style.display === 'block';
  if (isOpen) {
    ominousMessage.style.opacity = 0;
    setTimeout(() => { ominousMessage.style.display = 'none'; }, 300);
  } else {
    ominousMessage.style.display = 'block';
    setTimeout(() => { ominousMessage.style.opacity = 1; }, 10);
  }
});
doNotClickBox.addEventListener('keydown', (e) => {
  if (e.key === "Enter" || e.key === " ") {
    doNotClickBox.click();
  }
});

// Touch support for flip boxes (toggle, with confetti from flipbox)
flipboxSection.addEventListener('touchstart', function(e) {
  const flipbox = e.target.closest('.flipbox');
  if (flipbox) {
    const isFlipped = flipbox.classList.contains('flipped');
    flipbox.classList.toggle('flipped');
    if (!isFlipped) {
      setTimeout(() => {
        confettiBurstFromCenter(flipbox);
      }, 300);
    }
  }
}, {passive:true});