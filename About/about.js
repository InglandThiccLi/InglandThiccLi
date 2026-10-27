const careerMilestones = [
  { 
    period: "2024-10 — 2026-08", 
    role: { en: "Tseung Kwan O Government Primary School", zh: "將軍澳官立小學", ct:"將軍澳官立小學" }, 
    org: { en: "Information Technology Resources Assistant (Full-time Contract)", zh: "資訊科技資源助理（全職合約）", ct: "資訊科技資源助理（全職合約）" }, 
    details: [
      { en: "Create multimedia learning materials", zh: "製作多媒體學習材料", ct: "製作多媒體教學材料" },
      { en: "Assist teachers in STEAM activities", zh: "協助教師進行STEAM活動", ct: "協助老師進行STEAM活動" },
      { en: "Teach after school mathematics class", zh: "教授課後數學課堂", ct: "教授課後數學班" },
      { en: "Manage IT resources and provide IT supports", zh: "管理IT資源並提供IT支援", ct: "管理IT資源並提供IT支援" }
    ] 
  },
  { 
    period: "2023-06 — 2023-08", 
    role: { en: "Esri China (Hong Kong) Limited", zh: "Esri中國(香港)有限公司", ct: "Esri中國(香港)有限公司" }, 
    org: { en: "Programmer Trainee (Internship)", zh: "程式設計師實習生（實習）", ct: "程式設計師實習生（實習）" }, 
    details: [
      { en: "Develop web applications for company internal use", zh: "開發公司內部使用之網頁應用程式", ct: "開發公司內部使用之網頁應用程式" },
      { en: "Assist senior programmers in handling projects required by the clients, such as upgrading and maintaining applications", zh: "協助資深程式設計師處理客戶要求的專案，如升級及維護應用程式", ct: "協助資深程式設計師處理客戶要求嘅專案，如升級及維護應用程式" },
      { en: "Participate in GIS projects through map making and data visualization", zh: "參與GIS專案，學習製圖和數據可視化", ct: "參與GIS專案，學習製圖同數據可視化" }
    ] 
  },
  { 
    period: "2021-09 — 2021-11", 
    role: { en: "Hong Kong University of Science and Technology", zh: "香港科技大學", ct: "香港科技大學" }, 
    org: { en: "Course Student Helper (Part-time)", zh: "課程學生助理（兼職）", ct: "課程學生助理（兼職）" }, 
    details: [
      { en: "Aid students who found difficulties in their assignments", zh: "協助有困難的學生完成作業", ct: "協助有困難嘅學生完成功課" },
      { en: "Answer questions from the student about the course material", zh: "回答學生關於課程內容的問題", ct: "回答學生關於課程內容嘅問題" }
    ] 
  },
  { 
    period: "2021-06 — 2021-08", 
    role: { en: "Hong Kong University of Science and Technology", zh: "香港科技大學", ct: "香港科技大學" }, 
    org: { en: "Library Helper (Internship)", zh: "圖書館助理（實習）", ct: "圖書館助理（實習）" }, 
    details: [
      { en: "Assist in daily operation of library", zh: "協助圖書館日常運作", ct: "協助圖書館日常運作" },
      { en: "Conduct weeding and stocktaking of library resources", zh: "清理及盤點圖書館資源", ct: "清理及盤點圖書館資源" }
    ] 
  },
  { 
    period: "2020 — 2024", 
    role: { en: "Hong Kong University of Science and Technology", zh: "香港科技大學", ct: "香港科技大學" }, 
    org: { en: "Bachelor of Engineering", zh: "工學士", ct: "工學士" }, 
    details: [
      { en: "Major in Computer Science", zh: "主修計算機科學", ct: "主修計算機科學" },
      { en: "CGA: 3.8", zh: "CGA: 3.8", ct: "CGA: 3.8" },
      { en: "Recipient of Dean's List from 2021-22 to 2023-24", zh: "榮獲院長嘉許名單（2021-22及2023-24）", ct: "榮獲院長嘉許名單（2021-22及2023-24）" },
      { en: "Awardee of the Talent Development Scholarship from HKSAR", zh: "榮獲香港特別行政區才藝發展獎學金", ct: "榮獲香港特別行政區才藝發展獎學金" },
      { en: "Participated in 2022 CSE Big Idea Challenge", zh: "曾參與2022年CSE大創意挑戰", ct: "曾參與2022年CSE大創意挑戰" },
    ] 
  }
];

function renderTimeline() {
  const host = document.getElementById('career-timeline'); if (!host) return;
  host.innerHTML = careerMilestones.map((item, index) => 
    `<article class="timeline-item reveal" style="transition-delay:${index * 70}ms">
      <div class="timeline-date">${item.period}</div>
      <div class="timeline-content">
        <h3 class="h5 fw-bold mb-1">${item.role[window.siteLang]}</h3>
        <div class="small text-muted-site mb-2">${item.org[window.siteLang]}</div>
        <ul class="text-muted-site mb-0">
          ${item.details.map(detail => `<li>${detail[window.siteLang]}</li>`).join('')}
        </ul>
      </div>
    </article>`
  ).join('');

  host.querySelectorAll('.reveal').forEach((item) => requestAnimationFrame(() => item.classList.add('is-visible')));
}

document.addEventListener('site:languagechange', renderTimeline);
const emailButton = document.querySelector('[data-email-button]');
if (emailButton) emailButton.href = `mailto:${window.SITE_CONFIG.email}`;
renderTimeline();
