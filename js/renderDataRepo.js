let userData = rendeInfoUser();
let repoData = renderInfoRepo();

function rendeInfoUser(){
    let dataUser = JSON.parse(localStorage.getItem("dataUser"));
    let img = document.querySelector('#img');
    img.src = dataUser.avatar_url;

    let repository = document.querySelector('#repository');
    repository.textContent = `Repositórios: ${dataUser.public_repos}`;

    let followers = document.querySelector('#followers');
    followers.textContent = `Seguidores: ${dataUser.followers}`;

    let following = document.querySelector('#following');
    following.textContent = `Seguindo: ${dataUser.following}`;

    let nameUser = document.querySelector('#nameUser');
    nameUser.textContent = dataUser.name;

    let biography = document.querySelector('#biography');
    biography.textContent = dataUser.bio ? `Biografia: ${dataUser.bio}` :  '';
}

function renderInfoRepo() {
    let idRepo = localStorage.getItem("idRepo");
    let dataRepo = JSON.parse(localStorage.getItem("dataRepo"));
    let filterRepo = dataRepo.filter(i => i.id == idRepo);

    let nameRepo = document.getElementById('nameRepo');
    nameRepo.textContent = filterRepo[0].name;

    let numberStarts = document.getElementById('numberStarts');
    numberStarts.textContent = filterRepo[0].stargazers_count;

    let description = document.getElementById('descriptionRepo');
    description.textContent = filterRepo[0].description;

    let linkExterno = document.getElementById('externo');
    linkExterno.setAttribute('href', filterRepo[0].html_url)
}