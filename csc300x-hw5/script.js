async function fetchRepositories() {
    const username = document.getElementById('searchInput').value.trim();
    if (!username) {
        alert('Please enter a GitHub username');
        return;
    }

    const loadingIndicator = document.getElementById('loading');
    loadingIndicator.classList.remove('hidden');

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) throw new Error('Failed to fetch repositories');
        
        const repositories = await response.json();
        displayRepositories(repositories);
    } catch (error) {
        console.error('Error fetching repositories:', error);
        alert('Error fetching repositories. Please check the console for details.');
    } finally {
        loadingIndicator.classList.add('hidden');
    }
}

function displayRepositories(repositories) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear current content

    if (repositories.length === 0) {
        gallery.innerHTML = '<p>No repositories found.</p>';
        return;
    }

    repositories.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.classList.add('repository');
        repoElement.innerHTML = `
            <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
            <p><strong>Description:</strong> ${repo.description || 'N/A'}</p>
            <p><strong>Creation Date:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
            <p><strong>Last Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
            <p><strong>Language:</strong> ${repo.language || 'N/A'}</p>
            <p><strong>Watchers:</strong> ${repo.watchers_count}</p>
            <p><strong>Forks:</strong> ${repo.forks_count}</p>
        `;
        gallery.appendChild(repoElement);
    });
}

document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchRepositories();
    }
});
