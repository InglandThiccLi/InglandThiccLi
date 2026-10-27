// These are public demo audio files. Replace the title, credit, and src with audio you may share.
// For local files, add them to Music/src/ and set src to "src/your-track.mp3".
const tracks = [
  { title: { en: "Home Town", zh: "家鄉", ct:"家鄉" }, note: { en: "Medieval-like music", zh: "仿中世紀音樂", ct: "仿中世紀音樂" }, src: "home_town.mp3" },
  { title: { en: "What a Lovely Place", zh: "多麼美妙的地方", ct: "多麼美妙的地方" }, note: { en: "Lively small orchestral piece", zh: "節奏生動的小型管弦樂曲", ct: "節奏生動嘅小型管弦樂曲" }, src: "what_a_lovely_place.mp3" },
  { title: { en: "Beyond Horizon", zh: "地平綫的遠方", ct: "地平綫的遠方" }, note: { en: "Atmospheric piano solo", zh: "氛圍感強的鋼琴獨奏", ct: "氛圍感強嘅鋼琴獨奏" }, src: "beyond_horizon.mp3" },
  { title: { en: "Our Ingland", zh: "我們的恩格蘭", ct: "我們的恩格蘭" }, note: { en: "Orchestral anthem of a fictional country", zh: "虛構國家的管弦樂國歌", ct: "虛構國家嘅管弦樂國歌" }, src: "our_ingland.mp3" },
  { title: { en: "Sunrise", zh: "晨曦", ct: "晨曦" }, note: { en: "Emotional piano pop solo", zh: "情感充沛的鋼琴流行曲獨奏", ct: "情感充沛嘅鋼琴流行曲獨奏" }, src: "sunrise.mp3" },
  { title: { en: "Blossoms", zh: "繁花盛放", ct: "繁花盛放" }, note: { en: "Slow new age music", zh: "慢節奏新世紀音樂", ct: "慢節奏新世紀音樂" }, src: "blossoms.mp3" },
  { title: { en: "Put Your Pumpkin Head On", zh: "戴上你的南瓜頭", ct: "戴上你的南瓜頭" }, note: { en: "Halloween special", zh: "萬聖節特輯", ct: "萬聖節特輯" }, src: "put_your_pumpkin_head_on.mp3" },
  { title: { en: "Christmas Sack", zh: "聖誕大禮包", ct: "聖誕大禮包" }, note: { en: "All Christmas songs in one", zh: "傳統聖誕歌曲一次滿足", ct: "傳統聖誕歌曲一次滿足" }, src: "christmas_sack.mp3" },
  { title: { en: "Happy Happy Christmas", zh: "快樂聖誕", ct: "快樂聖誕" }, note: { en: "Orchestral arrangement of Happy H. Christmas by Drax", zh: "Happy H. Christmas管弦樂版（原作者：Drax）", ct: "Happy H. Christmas管弦樂版（原作者：Drax）" }, src: "happy_happy_christmas.mp3" },
  { title: { en: "Celebration", zh: "慶祝", ct: "慶祝" }, note: { en: "Let's do it again", zh: "再來一次", ct: "再嚟一次" }, src: "celebration.mp3" },
];
function renderPlaylist() {
  const host = document.getElementById('playlist'); if (!host) return;
  host.innerHTML = tracks.map((track, index) => `<div class="track-row"><span class="track-index">${String(index + 1).padStart(2, '0')}</span><div><div class="track-title">${track.title[window.siteLang]}</div><div class="track-note">${track.note[window.siteLang]}</div></div><audio controls preload="none" src="src/${track.src}" aria-label="${track.title[window.siteLang]}"><span>Audio playback is not supported in this browser.</span></audio></div>`).join('');
  // Keep one track playing at a time, like a simple playlist.
  const players = [...host.querySelectorAll('audio')];

  // Auto-play the next track when the current one ends, and loop back to the first track after the last one.
  let currentPlayingIndex = -1;
  players.forEach((player, index) => {
    player.addEventListener('play', () => {
      currentPlayingIndex = index;
      players.filter(other => other !== player).forEach(other => other.pause());
    });

    player.addEventListener('ended', () => {
      currentPlayingIndex = (index + 1) % players.length;
      players[currentPlayingIndex].currentTime = 0;
      players[currentPlayingIndex].play();
    });
  });
}
document.addEventListener('site:languagechange', renderPlaylist);
renderPlaylist();
