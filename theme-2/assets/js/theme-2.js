export function theme(){
    function setInvitationLayout() {
  const body = document.body;
  const leftPanel = document.getElementById('left-panel');
  const rightScroll = document.getElementById('right-scroll');
  const isMobile = window.innerWidth < 768;
    
  if (isMobile) {
    leftPanel.classList.add('hidden');
    rightScroll.classList.remove('h-screen');
    rightScroll.classList.add('h-auto');
    body.classList.remove('overflow-hidden');
    body.classList.add('overflow-auto');
  } else {
    leftPanel.classList.remove('hidden');
    rightScroll.classList.remove('h-auto');
    rightScroll.classList.add('h-screen');
    body.classList.remove('overflow-auto');
    body.classList.add('overflow-hidden');

    document.querySelectorAll('.will-reveal').forEach((el, i) => {
      el.style.animation = `fadeUp 0.75s ease ${i * 0.12}s forwards`;
    });
  }
}

function openInvitation() {
  const opening = document.getElementById('opening');
  const main = document.getElementById('main');

  opening.classList.add('pointer-events-none', 'scale-[1.04]', 'opacity-0');

  setTimeout(() => {
    opening.classList.add('hidden');
    main.classList.remove('opacity-0', 'pointer-events-none');
    main.classList.add('opacity-100', 'pointer-events-auto');
    setInvitationLayout();
    setTimeout(spawnPetals, 700);
  }, 860);
}

document.querySelector('#btn-envelope').addEventListener('click', ()=>{
    openInvitation();
})

function spawnPetals() {
  const container = document.getElementById('petals');
  container.classList.remove('hidden');

  if (container.childElementCount > 0) return;

  const colors = ['#e8c4bc', '#c9a96e', '#f0ddd4', '#deb8b0', '#e0cba8', '#eac9c0'];

  for (let i = 0; i < 16; i++) {
    const petal = document.createElement('div');
    petal.className = 'pointer-events-none fixed top-[-20px] z-[9999] rounded-[50%_50%_50%_0] animate-petalFall';

    const size = 6 + Math.random() * 7;
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.45}px`;
    petal.style.background = colors[Math.floor(Math.random() * colors.length)];
    petal.style.opacity = `${0.35 + Math.random() * 0.5}`;
    petal.style.animationDuration = `${7 + Math.random() * 8}s`;
    petal.style.animationDelay = `${Math.random() * 14}s`;
    container.appendChild(petal);
  }
}

window.addEventListener('resize', () => {
  const main = document.getElementById('main');
  const isActive = main.classList.contains('opacity-100');
  if (!isActive) return;
  setInvitationLayout();
});

}