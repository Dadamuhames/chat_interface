const loginRequest = async (data, fn) => {
    const URL = `${BASE_URL}/api/auth/login`;
    
    $.ajax({
        url: URL,
        type: "POST",
        headers: HEADERS,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: (data) => {
            fn(data)
        }
    })
}


const registerRequest = (data, fn) => {
    const URL = `${BASE_URL}/api/auth/signUp`;

    $.ajax({
        url: URL,
        type: "POST",
        headers: HEADERS,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: (data) => {
            fn(data)
        }
    })
}


const getProfile = (fn) => {
    const URL = `${BASE_URL}/api/auth/me`;

    const accessToken = window.localStorage.getItem("accessToken");

    HEADERS.Authorization = `Bearer ${accessToken}`;

    $.ajax({
        url: URL,
        type: "GET",
        headers: HEADERS,
        success: (data) => {
            fn(data)
        }
    })
}

const getChats = (fn) => {
    const URL = `${BASE_URL}/api/chats`;

    const accessToken = window.localStorage.getItem("accessToken");

    HEADERS.Authorization = `Bearer ${accessToken}`;

    $.ajax({
        url: URL,
        type: "GET",
        headers: HEADERS,
        success: (data) => {
            fn(data);
        }
    })
}


const getChatInner = (uuid, fn) => {
    const URL = `${BASE_URL}/api/chats/${uuid}`;

    const accessToken = window.localStorage.getItem("accessToken");

    HEADERS.Authorization = `Bearer ${accessToken}`;

    $.ajax({
        url: URL,
        type: "GET",
        headers: HEADERS,
        success: (data) => {
            fn(data)
        },
        error: () => {
            window.location.replace("/404.html")
        }
    })
}



const searchUsers = (search, fn) => {
    const URL = `${BASE_URL}/api/users`;

    const accessToken = window.localStorage.getItem("accessToken");

    HEADERS.Authorization = `Bearer ${accessToken}`;

    $.ajax({
        url: URL,
        type: "GET",
        data: {search: search},
        headers: HEADERS,
        success: (data) => {
            fn(data)
        }
    })
}

const createChatRequest = (userId, fn) => {
    const URL = `${BASE_URL}/api/chats/createPrivate`

    const accessToken = window.localStorage.getItem("accessToken");

    HEADERS.Authorization = `Bearer ${accessToken}`;

    $.ajax({
        url: URL,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ userId: userId }),
        headers: HEADERS,
        success: (data) => {
            fn(data)
        }
    })

}


const sendmessage = (data, fn)  => {
    const URL = `${BASE_URL}/api/messages`

    const accessToken = window.localStorage.getItem("accessToken");

    HEADERS.Authorization = `Bearer ${accessToken}`;

    $.ajax({
        url: URL,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        headers: HEADERS,
        success: (data) => {
            fn(data)
        }
    })
}


const getMessages = (uuid, page, fn) => {
    const URL = `${BASE_URL}/api/messages/${uuid}`

    const accessToken = window.localStorage.getItem("accessToken");

    HEADERS.Authorization = `Bearer ${accessToken}`;

    $.ajax({
        url: URL,
        type: "GET",
        data: {page: page},
        headers: HEADERS,
        success: (data) => {
            fn(data)
        }
    })
}


const sendMessageRead = (uuid) => {
    const URL = `${BASE_URL}/api/messages/${uuid}/read`

    const accessToken = window.localStorage.getItem("accessToken");

    HEADERS.Authorization = `Bearer ${accessToken}`;

    $.ajax({
        url: URL,
        type: "POST",
        headers: headers
    })
}


const profileUpdateRequest = (data, fn, error) => {
    const URL = `${BASE_URL}/api/auth/me`;

    const accessToken = window.localStorage.getItem("accessToken");

    HEADERS.Authorization = `Bearer ${accessToken}`;

    $.ajax({
        url: URL,
        type: "PUT",
        headers: HEADERS,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: (data) => {
            fn(data)
        },
        error: function (er) {
            error(er);
        }
    })
}