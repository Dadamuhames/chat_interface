const BASE_URL = "https://9ce4-2a05-45c2-303e-cb00-5440-bbea-6d83-fe34.ngrok-free.app" // "https://6d6a-84-54-120-230.ngrok-free.app" //"https://d879-84-54-120-134.ngrok-free.app";


let HEADERS = {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    'ngrok-skip-browser-warning': true
}


const injectHtmlFromId = (url) => {
    $("#app").html($(url).html());
}

const getFormData = (formId) => {
    var paramObj = {};
    $.each($(formId).serializeArray(), function(_, kv) {
        if (paramObj.hasOwnProperty(kv.name)) {
            paramObj[kv.name] = $.makeArray(paramObj[kv.name]);
            paramObj[kv.name].push(kv.value);
        }
        else {
            paramObj[kv.name] = kv.value;
        }
    });


    return paramObj;
}


const onRoutChange = (path) => {
    let url = path || window.location.hash || "";
    let urlWithoutHash = url.replace("#", "");

    if (urlWithoutHash == "" || urlWithoutHash == "#" || urlWithoutHash == null) return;

    if (urlWithoutHash.indexOf("/") > -1) {
        urlWithoutHash = urlWithoutHash.split("/")[0]
    }

    let fn = ROUTERS_MAP[urlWithoutHash];

    if (fn == undefined) return;

    window.location.hash = url;
    fn(url);
}



const formatDate = (date) => {
    const objectDate = new Date(date);
    const year = objectDate.getFullYear();
    const month = String(objectDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(objectDate.getDate()).padStart(2, '0');

    // Example format: YYYY-MM-DD HH:MM:SS
    return `${year}-${month}-${day}`;
}


const formatTime = (date) => {
    const objectDate = new Date(date);
    const day = String(objectDate.getDate()).padStart(2, '0');
    const hours = String(objectDate.getHours()).padStart(2, '0');
    const minutes = String(objectDate.getMinutes()).padStart(2, '0');

    // Example format: YYYY-MM-DD HH:MM:SS
    return `${hours}:${minutes}`;
}


const getProfileImage = (name) => {
    let firstLetter = name.charAt(0).toUpperCase();

    var hex = Math.floor(Math.random() * 0xffffff);
    var a = "#" + ("000000" + hex.toString(16)).slice(-6);

    return `<span class="profileImage" style='background: ${a};'>${firstLetter}</span>`
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
