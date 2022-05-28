const complimentBtn = document.getElementById("compliment-button");
const fortuneBtn = document.getElementById("fortune-button");
const profileContainer = document.getElementById("profile-container");
const form = document.querySelector('form');

const complimentURL = `http://localhost:4000/api/compliment/`
const profileURL = `http://localhost:4000/api/profile/`
const fortuneURL = 'http://localhost:4000/api/fortune/'

const profileCB = ({ data: profile }) => displayProfile(profile);
const errCallback = err => console.log(err);

const getCompliment = () => {
    axios.get(complimentURL)
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortunes = () => {
    axios.get(fortuneURL)
    .then(res => {
        const data = res.data;
        alert(data);
    });
};

const createProfile = body => axios.post(profileURL, body).then(profileCB).catch(errCallback)
const deleteProfile = id => axios.delete(`${profileURL}${id}`).then(profileCB).catch(errCallback)
const updateProfile = (id, type) => axios.put(`${profileURL}${id}`, {type}).then(profileCB).catch(errCallback)

const submitHandler = (e) => {
    e.preventDefault();

    let name = document.querySelector('#name');
    let currentPB = document.querySelector('#currentPB');
    let imageURL = document.querySelector('#img');

    let bodyObj = {
        name: name.value,
        currentPB: currentPB.value,
        imageURL: imageURL.value
    }

    createProfile(bodyObj)

    name.value = ''
    currentPB.value = ''
    imageURL.value = ''
};

const createProfileCard = (profile) => {
    const profileCard = document.createElement('div');
    profileCard.classList.add('profile-card')

    profileCard.innerHTML = `<img alt='profile cover image' src=${profile.imageURL} class="profile-cover-image"/>
    <p class="name">${profile.name}</p>
    <div class="btns-container">
        <button onclick="updateProfile(${profile.id}, 'minus')">-</button>
        <p class="profile-currentPB">${profile.currentPB} minutes</p>
        <button onclick="updateProfile(${profile.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteProfile(${profile.id})">delete</button>
    `

    profileContainer.appendChild(profileCard);
};

const displayProfile = (arr) => {
    profileContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createProfileCard(arr[i])
    }
};

complimentBtn.addEventListener('click', getCompliment);
fortuneBtn.addEventListener('click', getFortunes);
form.addEventListener('submit', submitHandler);