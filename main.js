const APIURL = 'https://api.github.com/users/';
const form = document.querySelector('#form');
const search = document.querySelector('#search');
const card = document.querySelector('.card');
const main = document.querySelector('#main');
let repoArray = [];
let currentUser;

// const username = card.querySelector('.user-info h2');
// const username = card.querySelector('.user-info h2');

async function getUser(username){
    try {
        const {data} = await axios(APIURL + username);
        createCard(data);
    } catch (err) {
        console.log (err);
        if (err.response.status === 404){
            createErrorCard('Not profile wit such username');
        }
    }
}

async function getRepos(username){
    try {
        const {data} = await axios(APIURL + username + '/repos?sort=created');
        createRepos(data);
    } catch (err) {
        console.log (err);
        createErrorCard('Problems fetching repos');
    }
}

function createCard(user){
    main.innerHTML = '';
    main.innerHTML = `
        <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul>
                    <li>${user.followers}<strong>Followers </strong></li>
                    <li>${user.following}<strong>Following </strong></li>
                    <li>${user.public_repos}<strong>Repos </strong></li>
                </ul>
                <div id="repos">
<!--                    <a href="#" class="repo">Repo 1</a>-->
<!--                    <a href="#" class="repo">Repo 2</a>-->
<!--                    <a href="#" class="repo">Repo 3</a>-->
                </div>
            </div>
        </div>
    `
}

form.addEventListener('submit', (e)=> {
    e.preventDefault()
    const user = search.value
    if (user){
        getUser(user);
        getRepos(user);
        currentUser = user;
        search.value = '';

    }
})

function createErrorCard(message){
    main.innerHTML = '';
    main.innerHTML = `
        <div class="card">
           ${message}
        </div>
    `
}

function createRepos(repos){
    let i = 0;
    repos.forEach(repo => {
        const reposTag = document.querySelector('#repos');
        if (i < 5){
            const a = document.createElement('a');
            a.href = repo.html_url;
            a.classList.add('repo');
            a.target = '_blank';
            a.innerText = repo.name;
            reposTag.appendChild(a);
        }
        i++
    })
}






