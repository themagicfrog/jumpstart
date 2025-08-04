const url = "https://api.airtable.com/v0/appnO5JHeNU4qR4IK/Projects";
const headers = {
    'Authorization': 'Bearer patHq1TCWpgjl8J7u.7d59dd110badcd1fa26639c18c0e4f360faabd0b16e2b6146d21f24c0f760d41'
};

async function fetchAllProjects(offset = '') {
    const endpoint = offset ? `${url}?offset=${offset}` : url;
    const res = await fetch(endpoint, { headers });
    if (!res.ok) throw new Error(`Network response was not ok (${res.status})`);
    const json = await res.json();
    const all = json.records;
    return json.offset ? all.concat(await fetchAllProjects(json.offset)) : all;
}

function renderProjects(records) {
    const section = document.getElementById('info');

    // Create or clear the project list container
    let list = section.querySelector('.project-list');
    if (!list) {
        list = document.createElement('div');
        list.className = 'project-list';
        section.appendChild(list);
    } else {
        list.innerHTML = '';
    }

    records.forEach(item => {
        const f = item.fields;

        const block = document.createElement('div');
        block.className = 'project-block';

        // First column: Image, title, one-liner, author
        const firstCol = document.createElement('div');

        const img = document.createElement('img');
        img.src = 'assets/cover_default.png';
        firstCol.appendChild(img);

        const h3 = document.createElement('h3');
        h3.textContent = f.Name;
        firstCol.appendChild(h3);

        const pDesc = document.createElement('p');
        pDesc.textContent = f["One-liner"] || "";
        firstCol.appendChild(pDesc);

        const pMember = document.createElement('p');
        pMember.innerHTML = `Made by <u>${f.Member.replace(/^@/, '')}</u>`;
        firstCol.appendChild(pMember);

        // Second column: Features, Genre, Game Engine, Experience
        const secondCol = document.createElement('div');

        const featuresH3 = document.createElement('h3');
        featuresH3.textContent = 'Features';
        secondCol.appendChild(featuresH3);

        const featuresList = document.createElement('ul');
        if (f.Features) {
            const features = f.Features.split('\n');
            features.forEach(feature => {
                if (feature.trim()) {
                    const li = document.createElement('li');
                    li.textContent = feature.replace(/^[•\-\*]\s*/, '');
                    featuresList.appendChild(li);
                }
            });
        }
        secondCol.appendChild(featuresList);

        const pGenre = document.createElement('p');
        pGenre.textContent = `Genre: ${f.Type || 'Unknown'}`;
        secondCol.appendChild(pGenre);

        const pEngine = document.createElement('p');
        pEngine.textContent = `Game Engine: ${f["Game Engine"] || 'Unknown'}`;
        secondCol.appendChild(pEngine);

        const pExperience = document.createElement('p');
        pExperience.textContent = `Experience: ${f.Experience || 'Unknown'}`;
        secondCol.appendChild(pExperience);

        // Third column: Gameplay and Other Notes
        const thirdCol = document.createElement('div');

        const pGameplay = document.createElement('p');
        pGameplay.textContent = `Gameplay: ${f.Gameplay || 'Not specified'}`;
        thirdCol.appendChild(pGameplay);

        const pNotes = document.createElement('p');
        pNotes.textContent = `Other Notes: ${f["Other Notes"] || 'None'}`;
        thirdCol.appendChild(pNotes);

        // Add all columns to block
        block.appendChild(firstCol);
        block.appendChild(secondCol);
        block.appendChild(thirdCol);
        list.appendChild(block);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAllProjects()
        .then(renderProjects)
        .catch(err => console.error('Fetch error:', err));
});
