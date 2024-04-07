window.onload = () => {
    const search = document.querySelector('#search');

    search.addEventListener('focusout', ()=>{
        formSubmit();
    })

    // getUser("kunaltyagi9");
}
const formSubmit = () => {
    const search = document.querySelector('#search');
    if(search.value!=""){
        getUser(search.value);
        search.value="";
    }
    return false;
}
const getUser = async (username) =>{
    const API_URL = "https://api.github.com/users";
    const main = document.querySelector('#main');
    const response =await fetch(`${API_URL}/${username}`);
    const data = await response.json();

    const card = `
    <div class="card">
       <div>
         <img src =${data.avatar_url} alt ="dp" class="avatar">
       </div>
       <div class="info">
          <h2>${data.name}</h2>
          <p>${data.bio}</p>
          
          <ul>
            <li>${data.following}<strong>Following</strong></li>
            <li>${data.followers}<strong>Followers</strong></li>
            <li>${data.public_repos}<strong>Repos<strong></li>
          </ul>
          <div id="repos"></div>
       </div>
    </div>
    `

    main.innerHTML = card;
    getRepos(API_URL, username);
}


const getRepos = async (API_URL,username) => {
    const repos = document.querySelector('#repos');
    const response =await fetch(`${API_URL}/${username}/repos`);
    const data = await response.json();

    data.forEach(repo => {
        const element =document.createElement('a');
        element.classList.add('repo');
        element.href = repo.html_url;
        element.innerHTML= repo.name;
        element.target = "_blank";
        repos.appendChild(element);
    })

}