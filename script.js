function searchUser() {
    const username = document.getElementById('searchInput').value;
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            renderProfile(data);
            fetchRepositories(username);
            saveSearchHistory(username);
        })
        .catch(error => console.error('Hata:', error));
}

function fetchRepositories(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => renderRepositories(data))
        .catch(error => console.error('Hata:', error));
}

function renderProfile(user) {
    const profileDiv = document.getElementById('profile');
    profileDiv.innerHTML = `
        <img src="${user.avatar_url}" alt="Profil Resmi">
        <h2>${user.login}</h2>
        <p><strong>Adı:</strong> ${user.name ? user.name : 'Bilinmiyor'}</p>
        <p><strong>Lokasyon:</strong> ${user.location ? user.location : 'Bilinmiyor'}</p>
        <p><strong>Biyografi:</strong> ${user.bio ? user.bio : 'Bilinmiyor'}</p>
        <p><strong>Email:</strong> ${user.email ? user.email : 'Bilinmiyor'}</p>
    `;
}

function renderRepositories(repos) {
    const repositoriesDiv = document.getElementById('repositories');
    repositoriesDiv.innerHTML = `
        <h2>Repositoriler</h2>
        <table>
            <tr>
                <th>Repo Adı</th>
                <th>Star Sayısı</th>
                <th>Fork Sayısı</th>
            </tr>
            ${repos.map(repo => `
                <tr>
                    <td><a href="${repo.html_url}" target="_blank">${repo.name}</a></td>
                    <td>${repo.stargazers_count}</td>
                    <td>${repo.forks_count}</td>
                </tr>
            `).join('')}
        </table>
    `;
}

function saveSearchHistory(username) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!searchHistory.includes(username)) {
        searchHistory.push(username);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        renderSearchHistory(searchHistory);
    }
}

function renderSearchHistory(history) {
    const searchHistoryDiv = document.getElementById('searchHistory');
    searchHistoryDiv.innerHTML = `
        <h2>Son Aramalar</h2>
        <ul>
            ${history.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
}

function clearSearchHistory() {
    localStorage.removeItem('searchHistory');
    const searchHistoryDiv = document.getElementById('searchHistory');
    searchHistoryDiv.innerHTML = '';
}
