(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      nav.classList.toggle('open', open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('open');
    }));
  }

  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.work-card[data-category]')];
  filters.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    cards.forEach(card => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('filtered-out', !visible);
    });
  }));

  const projects = {
    '01': { title: 'KASA / Everyday Objects', category: 'Brand identity · Packaging', description: '日常で使うものに、静かな存在感を。素材の質感と余白を軸に、架空の生活雑貨ブランドのアイデンティティとパッケージを設計。' },
    '02': { title: 'FORMA / Digital Culture', category: 'Website · Art direction', description: 'カルチャーを横断するデジタルメディアを想定。鮮やかな色と軽快な動きで、編集された情報に出会う楽しさを表現。' },
    '03': { title: 'SUNDAY / Bloom Again', category: 'Campaign · Photography', description: 'いつもの日曜日に花を飾る習慣を提案するキャンペーン。自然な色彩と親しみやすい言葉で、日々の小さな気分転換を伝える。' },
    '04': { title: 'YŌ / Scent Objects', category: 'Visual identity · Packaging', description: '香りをオブジェのように楽しむフレグランスブランドのコンセプト。繊細なタイポグラフィと触感を想像させるビジュアルを制作。' },
    '05': { title: 'STILL / Digital Wellness', category: 'Digital product · UI design', description: '日々のペースを整えるウェルネスアプリのコンセプト。柔らかいグラデーションと穏やかなインタラクションを中心にUIを構成。' },
    '06': { title: 'OFF SCRIPT / Open Studio', category: 'Campaign · Art direction', description: 'つくる過程そのものをひらく、架空のオープンスタジオ企画。自由な展示体験を伝えるキャンペーンのアートディレクション。' }
  };
  const dialog = document.querySelector('.project-dialog');
  const dialogTitle = document.querySelector('#dialogTitle');
  const dialogNumber = document.querySelector('#dialogNumber');
  const dialogCategory = document.querySelector('#dialogCategory');
  const dialogDescription = document.querySelector('#dialogDescription');
  const dialogImage = document.querySelector('#dialogImage');
  const closeDialog = () => { if (dialog?.open) dialog.close(); };
  document.querySelectorAll('.work-card .work-image').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.work-card');
      const number = card.dataset.project;
      const data = projects[number];
      if (!dialog || !data) return;
      dialogTitle.textContent = data.title;
      dialogNumber.textContent = number;
      dialogCategory.textContent = data.category;
      dialogDescription.textContent = data.description;
      const image = card.querySelector('img');
      dialogImage.src = image.src;
      dialogImage.alt = image.alt;
      dialog.showModal();
    });
  });
  document.querySelector('.dialog-close')?.addEventListener('click', closeDialog);
  document.querySelector('.dialog-done')?.addEventListener('click', closeDialog);
  dialog?.addEventListener('click', event => { if (event.target === dialog) closeDialog(); });
  dialog?.addEventListener('close', () => { document.querySelectorAll('.work-image').forEach(button => button.blur()); });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); obs.unobserve(entry.target); }
    }), { threshold: .1, rootMargin: '0px 0px -20px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('in-view'));
})();
