function searchDailymotion() {
    const query = document.getElementById('dailymotion-query').value.trim();
    if (!query) {
        alert("Please enter a search query.");
        return;
    }

    const url = `https://api.dailymotion.com/videos?search=${query}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayResults(data.list))
        .catch(error => console.error('Dailymotion API Error:', error));
}

// function displayResults(items) {
//     const resultsDiv = document.getElementById('dailymotion-results');
//     resultsDiv.innerHTML = '';

//     items.forEach(item => {
//         const card = document.createElement('div');
//         card.classList.add('video-card');

//         const title = item.title;
//         const url = `https://www.dailymotion.com/video/${item.id}`;
//         const thumbnail = item.thumbnail_240_url; // Use a smaller thumbnail for better loading

//         card.innerHTML = `
//             <a href="${url}" target="_blank">
//                 <img src="${thumbnail}" alt="${title}">
//                 <h3>${title}</h3>
//             </a>
//         `;
//         resultsDiv.appendChild(card);
//     });
// }

function displayResults(items) {
    const resultsDiv = document.getElementById('dailymotion-results');
    resultsDiv.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('video-card');

        const title = item.title;
        const url = `https://www.dailymotion.com/video/${item.id}`;

        // Use the thumbnail URLs provided by the API
        const thumbnail = item.thumbnail_240_url; // You can also use item.thumbnail_480_url or item.thumbnail_720_url for higher quality

        card.innerHTML = `
            <a href="${url}" target="_blank">
                <img src="${thumbnail}" alt="${title}">
                <h3>${title}</h3>
            </a>
        `;
        resultsDiv.appendChild(card);
    });
}