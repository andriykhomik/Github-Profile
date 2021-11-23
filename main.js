const APIURL = 'https://api.github.com/users/';
const form = document.querySelector('#form');
const search = document.querySelector('#search');
const card = document.querySelector('.card');
const avatar = card.querySelector('.avatar');
const cardP = card.querySelector('.user-info p');
const ulEl = card.querySelector('.user-info ul');

// const username = card.querySelector('.user-info h2');
// const username = card.querySelector('.user-info h2');

async function getUser(username){
    try {
        const {data} = await axios(APIURL + username);
        console.log (data);
        createCard(data);

    } catch (err) {
        console.log (err);
    }
}

function createCard(data){

    avatar.src = data.avatar_url;

    ulEl.innerHTM = `
        <li>${data.followers}<strong>Followers</strong></li>
        <li>${data.following}<strong>Following</strong></li>
        <li>${data.public_repos}<strong>Repos</strong></li>
        `

}


form.addEventListener('submit', (e)=> {
    e.preventDefault()
    const user = search.value
    if (user){
        getUser(user);
        search.value = '';
    }
})


