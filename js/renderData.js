let amountRepo;

function searchUser() {
   let user = document.querySelector('#inputSearch').value;
    validateValue(user)
}

function validateValue(user){
    let validateInput = document.getElementById('validateInput').style;

    if(user){
        validateInput.setProperty('display', 'none');
        requestDataUser(user);
    }
    else {
        validateInput.setProperty('display', 'inline-flex');
    }
}

function renderUserSearch(responseDataUser, responseDataRepo) {
    if(responseDataUser.message !== 'Not Found'){
        let containerError = document.getElementById('containerError');
        containerError.style.display = 'none';

        let divResult = document.querySelector('#divResultSearch');
        divResult.style.display = 'block';
    
        let img = document.querySelector('#img');
        img.src = responseDataUser.avatar_url;
    
        let repository = document.querySelector('#repository');
        repository.textContent = responseDataUser.public_repos ? `Repositórios: ${responseDataUser.public_repos}` : '';
    
        let followers = document.querySelector('#followers');
        followers.textContent = responseDataUser.followers ? `Seguidores: ${responseDataUser.followers}` : '';
    
        let following = document.querySelector('#following');
        following.textContent = responseDataUser.following ? `Seguindo: ${responseDataUser.following}` : '';
    
        let nameUser = document.querySelector('#nameUser');
        nameUser.textContent = responseDataUser.name ? responseDataUser.name : '';

        let email = document.querySelector('#email');
        email.textContent = responseDataUser.email ? `E-mail: ${responseDataUser.email}` : 'E-mail: ';

        let biography = document.querySelector('#biography');
        biography.textContent = responseDataUser.bio ? `Biografia: ${responseDataUser.bio}` : '';

        let dataRepository = document.getElementById('dataRepository').style;

        if(responseDataRepo.length > 0){
            localStorage.setItem("dataUser", JSON.stringify(responseDataUser));
            localStorage.setItem("dataRepo", JSON.stringify(responseDataRepo));
            dataRepository.setProperty('display', 'block');
            renderRepository(responseDataRepo);
        }
        else {
            dataRepository.setProperty('display', 'none');
        }
    }
}

function renderRepository(responseDataRepo){
    let allElements = document.querySelectorAll('.divRepo');
    allElements.forEach((i) => {
        i.remove()
    });

    amountRepo = responseDataRepo;
    responseDataRepo.forEach((i) => {
        let divRepo = document.createElement('div');
        divRepo.setAttribute('class', 'divRepo'); 

        let anchorRepo = document.createElement('a');
        anchorRepo.setAttribute('href', 'repo/repository.html'); 
        anchorRepo.setAttribute('class', 'linkDataRepo');
        anchorRepo.setAttribute('id', i.id);

        let nameRepo = document.createElement('h4');
        nameRepo.setAttribute('id', 'nameRepository'); 

        let valueRepo = document.createTextNode(i.name);
        anchorRepo.appendChild(nameRepo)
        nameRepo.appendChild(valueRepo);
        divRepo.appendChild(anchorRepo);

        let stargazers = document.createElement('p');
        stargazers.setAttribute('id', 'stargazers'); 
        let valuestargazers = document.createTextNode(`Número de Estrelas: ${i.stargazers_count}`);
        stargazers.appendChild(valuestargazers);
        divRepo.appendChild(stargazers);

        document.getElementById("dataRepository").appendChild(divRepo); 
    });

    getIdRepo();
}

function orderRepository(){
    amountRepo = amountRepo.sort((a, b) => {
        return a.stargazers_count - b.stargazers_count;
    });

    renderRepository(amountRepo);
}  

function getIdRepo() {
    let repo = document.querySelector('.linkDataRepo')

    repo.addEventListener('click', function() {
        localStorage.setItem("idRepo", this.id);
    });
}

function renderErrorInfoUser(userName) {
    let divResult = document.querySelector('#divResultSearch').style;
    divResult.setProperty('display', 'none');

    let containerError = document.getElementById('containerError');
    containerError.style.display = 'flex';

    let textError = document.getElementById('textError');
    textError.textContent = `Não foi possível encontrar o usuário: ${userName}`;

}