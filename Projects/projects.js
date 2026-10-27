const projects = [
  { 
    title: { en: "Math Fun", zh: "數之樂", ct: "數之樂" }, 
    category: "learning", categoryLabel: { en: "Learning", zh: "學習", ct: "學習" }, year: "2026", cover: "math_fun.png", 
    description: { 
      en: `An online math learning platform for P1 students (Chinese only). 
           It aims to spark students' interest in learning by experimenting, exercising, and gaming,
           so as to understand better the concept of addition.`, 
      zh: "互動式小學一年級數學線上學習平台，旨在透過實驗、練習和遊戲挑戰這三個步驟激發學生的學習興趣，並幫助學生理解加法的概念。",
      ct: "互動式小學一年級數學線上學習平台，旨在透過實驗、練習同遊戲挑戰呢三個步驟激發學生嘅學習興趣，並幫助學生理解加法嘅概念。"
    }, 
    link: "https://ppowoe.github.io/MathFun/",
    github: "https://github.com/ppowoe/MathFun"
  },

  { 
    title: { en: "Hungry Cube", zh: "飢餓方塊", ct: "飢餓方塊" }, 
    category: "game", categoryLabel: { en: "Game", zh: "遊戲", ct: "遊戲" }, year: "2026", cover: "hungry_cube.jpg", 
    description: { 
      en: `Step into a 3D puzzle challenge where every move drains your hunger. 
           Guide your cube through 40 levels filled with tricky traps. 
           Reach the goal with your "healthy" tummy to win.`, 
      zh: "踏入一場每步都會消耗飽食度的3D解謎挑戰！操控方塊闖過四十個充滿陷阱的關卡，維持「飽足」的狀態抵達終點，即可贏得勝利。",
      ct: "踏入一場每步都會消耗飽食度嘅3D解謎挑戰！操控方塊通過四十個充滿陷阱嘅關卡，維持「飽足」嘅狀態到達終點，就可以贏得勝利。"
    }, 
    link: "https://quilt-game.itch.io/hungry-cube"
  },

  { 
    title: { en: "Math Synthesizer", zh: "數學合成器", ct: "數學合成器" }, 
    category: "audio", categoryLabel: { en: "Audio", zh: "音頻", ct: "音頻" }, year: "2025", cover: "math_synthesizer.png", 
    description: { 
      en: `A web-based synthesizer that generates sounds from mathematical expressions. 
           Create unique instruments by writing expressions and explore the relationship between math and sound.`, 
      zh: "基於網頁的合成器，能夠把數學表達式變成聲音。通過編寫表達式創建獨特的樂器，探索數學與聲音之間的關係。",
      ct: "基於網頁嘅合成器，可以將數學表達式變成聲音。透過編寫表達式創建獨特嘅樂器，探索數學與聲音之間嘅關係。"
    }, 
    link: "https://inglandthiccli.github.io/Math-Synthesizer/",
    github: "https://github.com/InglandThiccLi/Math-Synthesizer"
  },

  { 
    title: { en: "Pwekish Dictionary", zh: "佩語字典", ct: "佩語字典" }, 
    category: "learning", categoryLabel: { en: "Learning", zh: "學習", ct: "學習" }, year: "2025", cover: "pwekish_dictionary.png", 
    description: { 
      en: `This is an online learning platform for a constructed language called "Pwekish". 
           It includes a dictionary with word searching function and a collection of learning resources.
           This platform is designed to ignite people's interest in learning new languages.`,
      zh: "這是為人造語言「佩語」而設的線上學習平台，旨在激發人們對學習新語言的興趣，它包括一個帶有單詞搜索功能的字典和一系列學習資源。",
      ct: "呢個係為人造語言「佩語」而設嘅線上學習平台，旨在激發大眾對學習新語言嘅興趣，佢包含一個帶有詞語搜索功能嘅字典同一系列學習資源。"
    }, 
    link: "https://inglandthiccli.github.io/Pwekish_Dictionary/",
    github: "https://github.com/InglandThiccLi/Pwekish_Dictionary"
  },

  { 
    title: { en: "Simple Microtonal Keyboard", zh: "簡易微分音鍵盤", ct: "簡易微分音鍵盤" }, 
    category: "audio", categoryLabel: { en: "Audio", zh: "音頻", ct: "音頻" }, year: "2025", cover: "microtonal_keyboard.png", 
    description: { 
      en: `A simple microtonal keyboard for exploring alternative tuning systems. 
           It allows users to experiment with different musical scales.`,
      zh: "一個用於探索另類調音系統的簡易微分音鍵盤，讓用戶試驗不同的音階。",
      ct: "一個用於探索另類調音系統嘅簡易微分音鍵盤。畀用戶試驗唔同嘅音階。"
    }, 
    link: "https://inglandthiccli.github.io/Simple-Microtonal-Keyboard/",
    github: "https://github.com/InglandThiccLi/Simple-Microtonal-Keyboard"
  },
];

let activeProjectFilter = 'all';
function renderProjectFilters() {
  const host = document.getElementById('project-filters'); if (!host) return;
  const filters = [['all','projects.filter.all'],['game','projects.filter.game'],['learning','projects.filter.learning'],['audio','projects.filter.audio']];
  host.innerHTML = filters.map(([id,key]) => `<button type="button" class="btn ${activeProjectFilter === id ? 'btn-site-primary' : 'btn-site-outline'} btn-sm" data-project-filter="${id}">${window.siteT(key)}</button>`).join('');
}
function renderProjects() {
  const host = document.getElementById('project-grid'); if (!host) return;
  const items = projects.filter(project => activeProjectFilter === 'all' || project.category === activeProjectFilter);
  const linkText = { game: window.siteT('projects.play'), learning: window.siteT('projects.open'), audio: window.siteT('projects.try'), image: window.siteT('projects.try'), other: window.siteT('projects.open') };

  host.innerHTML = items.map((project) => `
  <div class="col-md-6 col-xl-4"><article class="surface-card project-card reveal">
  <div class="project-cover" style="background: url(src/${project.cover}) no-repeat center/cover;"></div>
  <div class="p-4">
    <div class="d-flex justify-content-between align-items-center gap-2 mb-3">
      <span class="project-tag">${project.categoryLabel[window.siteLang]}</span>
      <span class="small text-muted-site">${project.year}</span>
    </div>
    <h2 class="h4 fw-bold mb-2">${project.title[window.siteLang]}</h2>
    <p class="text-muted-site mb-4">${project.description[window.siteLang]}</p>
    <a class="fw-bold text-decoration-none" href="${project.link}" target="${project.link.startsWith('http') ? '_blank' : '_self'}" rel="${project.link.startsWith('http') ? 'noreferrer' : ''}">${linkText[project.category]} ↗</a>
    ${project.github ? `<a class="fw-bold text-decoration-none ms-3" href="${project.github}" target="_blank" rel="noreferrer">${window.siteT('projects.code')} ↗</a>` : ''}
  </div>
  </article></div>`).join('');
  host.querySelectorAll('.reveal').forEach(item => requestAnimationFrame(() => item.classList.add('is-visible')));
}
document.addEventListener('click', (event) => { const button = event.target.closest('[data-project-filter]'); if (button) { activeProjectFilter = button.dataset.projectFilter; renderProjectFilters(); renderProjects(); } });
document.addEventListener('site:languagechange', () => { renderProjectFilters(); renderProjects(); });
renderProjectFilters(); renderProjects();
