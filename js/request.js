function requestDataUser(user){
    let xhr = new XMLHttpRequest();
    let url = `https://api.github.com/users/${user}`;

    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200){
                let responseDataUser = JSON.parse(xhr.responseText);
                requestRepository(responseDataUser);
            }
            else {
                renderErrorInfoUser(user);
            }
        }
    }
    xhr.send();
}

function requestRepository(responseDataUser){
    let xhr = new XMLHttpRequest();
    let url = responseDataUser.repos_url;

    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200){
                let responseDataRepo = JSON.parse(xhr.responseText);
                renderUserSearch(responseDataUser, responseDataRepo);
            }
        }
    }
    xhr.send();
}