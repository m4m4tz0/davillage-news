const reporters = ['reporter'];

let currentUser = null;
let newsList = [];

document.getElementById('loginBtn').addEventListener('click', login);
document.getElementById('postNewsBtn').addEventListener('click', uploadNews);

function login() {
    const name = document.getElementById('username').value.trim().toLowerCase();
    if (!name) {
        alert('Παρακαλώ εισάγετε ένα όνομα χρήστη.');
        return;
    }
    currentUser = name;
    document.getElementById('loginMsg').textContent = `Συνδέθηκες ως: ${currentUser}`;
    document.getElementById('login').classList.add('hidden');

    if (reporters.includes(currentUser)) {
        document.getElementById('upload').classList.remove('hidden');
    }
}

function uploadNews() {
    const title = document.getElementById('newsTitle').value.trim();
    const content = document.getElementById('newsContent').value.trim();
    if (!title || !content) {
        alert('Παρακαλώ συμπληρώστε όλα τα πεδία.');
        return;
    }

    alert('Uploading articles directly to GitHub via API will be implemented next.');

    document.getElementById('newsTitle').value = '';
    document.getElementById('newsContent').value = '';
}

async function fetchNews() {
    try {
        const res = await fetch('data/news.json' + Date.now());
        if (!res.ok) throw new Error('Αποτυχία φόρτωσης ειδήσεων');
        newsList = await res.json();
    } catch {
        newsList = [];
    }
    renderNews();
}

function renderNews() {
    const container = document.getElementById('newsList');
    if (newsList.length === 0) {
        container.innerHTML = '<p>Δεν υπάρχουν διαθέσιμες ειδήσεις.</p>';
        return;
    }
    container.innerHTML = '';
    newsList.forEach(item => {
        const el = document.createElement('div');
        el.innerHTML = `<h3>${item.title}</h3><small>by ${item.author} on ${item.date}</small><p>${item.content}</p>`;
        container.appendChild(el);
    });
}

fetchNews();
