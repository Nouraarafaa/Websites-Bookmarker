// Variables
let name = document.getElementById('Name');
let url = document.getElementById('Url');
let submit = document.getElementById('submit');

let bookmark = localStorage.bookmark ? JSON.parse(localStorage.bookmark) : [];


submit.onclick = function () {
    if(name.value.length < 3){
        alert("Please enter a valid name with at least 3 letters");
        return;
    }

    if (name.value.trim() === "" || url.value.trim() === "") {
        alert("Please enter both Name and URL.");
        return;
    }
    if (!isValidURL(url.value.trim())) {
        alert("Please enter a valid URL.");
        return;
    }

    let newBookmark = { 
        name: name.value.trim(),
        url: url.value.trim()
    };
    bookmark.push(newBookmark);

    localStorage.setItem("bookmark", JSON.stringify(bookmark));

    clearData();
    showData();  
}
function showData() {
    let table = "";
    for (let i = 0; i < bookmark.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${bookmark[i].name}</td>
            <td><button onclick="visitSite('${bookmark[i].url}')" class="visit-btn">
            <i class="fa-solid fa-eye"></i>Visit</button></td>
            <td><button onclick="deleteData(${i})" class="delete-btn">
            <i class="fa-solid fa-trash-can"></i>
            Delete</button></td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
}

function visitSite(url) {
    window.open(url, '_blank'); 
}


function clearData() {
    name.value = "";
    url.value = "";
}


function deleteData(i) {
    bookmark.splice(i, 1);
    localStorage.setItem("bookmark", JSON.stringify(bookmark));
    showData();
}


function isValidURL(string) {
    let urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*))\\.?)+[a-z]{2,}'+ 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i');
    return !!urlPattern.test(string);
}


showData();
