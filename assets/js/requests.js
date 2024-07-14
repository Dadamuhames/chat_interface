const loginRequest = async (data, fn) => {
    const URL = `${BASE_URL}/api/auth/login`;
    
    $.ajax({
        url: URL,
        type: "POST",
        headers: HEADERS,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: (data) => {
            $("#loader").addClass("active");
            fn(data)
            $("#loader").removeClass("active");
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
            $("#loader").addClass("active");
            fn(data)
            $("#loader").removeClass("active");
        }
    })
}


const getProfile = (fn) => {
    $("#loader").addClass("active");
    const URL = `${BASE_URL}/api/auth/me`;

    const accessToken = window.localStorage.getItem("accessToken");

    HEADERS.Authorization = `Bearer ${accessToken}`;

    $.ajax({
        url: URL,
        type: "GET",
        headers: HEADERS,
        success: (data) => {
            fn(data)
            $("#loader").removeClass("active");
        }
    })
}

const getChats = (fn) => {
    $("#loader").addClass("active");
    const URL = `${BASE_URL}/api/chats`;

    const accessToken = window.localStorage.getItem("accessToken");

    HEADERS.Authorization = `Bearer ${accessToken}`;

    $.ajax({
        url: URL,
        type: "GET",
        headers: HEADERS,
        success: (data) => {
            fn(data);
            $("#loader").removeClass("active");
        }
    })
}


const getChatInner = (uuid, fn) => {
    $("#loader").addClass("active");
    const URL = `${BASE_URL}/api/chats/${uuid}`;

    const accessToken = window.localStorage.getItem("accessToken");

    HEADERS.Authorization = `Bearer ${accessToken}`;

    $.ajax({
        url: URL,
        type: "GET",
        headers: HEADERS,
        success: (data) => {
            $("#loader").addClass("active");
            fn(data)
            $("#loader").removeClass("active");
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
    $("#loader").addClass("active");
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
            $("#loader").addClass("active");
            fn(data)
            $("#loader").removeClass("active");
        }
    })

}


const createGroupChatRequest = (data, fn) => {
    $("#loader").addClass("active");
    const URL = `${BASE_URL}/api/chats/createGroup`

    const accessToken = window.localStorage.getItem("accessToken");

    HEADERS.Authorization = `Bearer ${accessToken}`;

    $.ajax({
        url: URL,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        headers: HEADERS,
        success: (data) => {
            $("#loader").addClass("active");
            fn(data)
            $("#loader").removeClass("active");
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
    $("#loader").addClass("active");
    const URL = `${BASE_URL}/api/messages/${uuid}`

    const accessToken = window.localStorage.getItem("accessToken");

    HEADERS.Authorization = `Bearer ${accessToken}`;

    $.ajax({
        url: URL,
        type: "GET",
        data: {page: page},
        headers: HEADERS,
        success: (data) => {
            $("#loader").addClass("active");
            fn(data)
            $("#loader").removeClass("active");
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
        headers: HEADERS
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