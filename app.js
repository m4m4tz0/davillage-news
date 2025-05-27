const AIRTABLE_PAT = 'patZDzRx04Fg2wzyd.cd7a590b5066ed0aa36920c645a9efda134bb4f4f5a150973704e25dd71f930e';  // <-- Insert your PAT here
const BASE_ID = 'DaVillageNews';       // <-- Insert your Base ID here
const TABLE_NAME = 'DaVillageNews';        // <-- Your Airtable table name

async function fetchApprovedNews() {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?filterByFormula=Approved`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${AIRTABLE_PAT}` }
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.statusText}`);
    }

    const data = await res.json();

    return data.records.map(record => {
      const fields = record.fields;
      return {
        id: record.id,
        title: fields.Title || '',
        brief: fields.Brief || '',
        author: fields.Author || '',
        date: fields.Date || '',
        content: fields.Content || '',
        imageUrl: fields.Image && fields.Image[0] ? fields.Image[0].url : 'placeholder.jpg'
      };
    });
  } catch (err) {
    console.error(err);
    return [];
  }
}

function renderNewsFeed(newsList) {
  const container = document.getElementById('newsList');
  container.innerHTML = '';

  if (newsList.length === 0) {
    container.innerHTML = '<p>Δεν υπάρχουν διαθέσιμες ειδήσεις.</p>';
    return;
  }

  newsList.forEach(article => {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.dataset.id = article.id;

    card.innerHTML = `
      <img src="${article.imageUrl}" alt="${article.title}" class="news-image" />
      <div class="news-text">
        <h3>${article.title}</h3>
        <p class="brief">${article.brief}</p>
      </div>
    `;

    card.addEventListener('click', () => {
      window.location.hash = article.id;
      // Later: open detailed view
    });

    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const news = await fetchApprovedNews();
  renderNewsFeed(news);
});
