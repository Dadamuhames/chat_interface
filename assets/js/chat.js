$(document).on("click", '#createChat', (e) => {

    $("form#groupCreateForm").find("input").val("")
    $("form#groupCreateForm").find("input").val("")
    
    $("#userToAddGroup").select2();
    $("#userToAddGroup").val(null);

    myDropzone.removeAllFiles();


    $("#userSearchModal").modal("hide");
    $("#groupCreateModal").modal("show");


    const URL = `${BASE_URL}/api/users`;

    const accessToken = window.localStorage.getItem("accessToken");

    HEADERS.Authorization = `Bearer ${accessToken}`;

    $("#userToAddGroup").select2({
        dropdownParent: $('#groupCreateModal'),
        ajax: {
            url: URL,
            headers: HEADERS,
            data: function (params) {
                var query = {
                    search: params.term,        
                    type: "SIMPLE"        
                }
                return query;
            },

            processResults: function (data) {
                // Transforms the top-level key of the response object from 'items' to 'results'
                return {
                    results: data.content
                };
            }
        }
    });
})


const onChatCreated = (chat) => {
    let image = chat.image == null ? getProfileImage(chat.name) : `<img class="msg-profile" src="${chat.image}"/>`

    $("#users_list").prepend(`
        <a class="msg chats-in-list" href="#chats/${chat.uuid}" data-chat-id="${chat.uuid}">
            ${image}
            <div class="msg-detail">
                <div class="msg-username">${chat.name}</div>
            </div>
        </a>                  
    `)
}


$(document).on("submit", "form#groupCreateForm", (e) => {
    e.preventDefault();

    let formData = new FormData($("#groupCreateForm")[0]);

    let data = {usersId: []};

    for (var pair of formData.entries()) {
        switch (pair[0].toString()) {
            case "group_name": data.name = pair[1] 
            break;

            case "users": data.usersId.push(Number.parseInt(pair[1]));
            break;

            case "image": data.image = pair[1];
            break;
        }
    }

    createGroupChatRequest(data, (response) => {
        $("#groupCreateModal").modal("hide");
        onChatCreated(response);
        onRoutChange(`#chats/${response.uuid}`)
    })
})
