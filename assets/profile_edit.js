$(document).ready(() => {
    getProfile((response) => {

        let image = response.image == null ? getProfileImage(response.name) : `<img src="${response.image}" width="100" height="100" class="rounded-circle">`

        $("#profile_image").html(image);
        $("#pre_image").val(response.image);
        $("[name='username']").val(`${response.username}`);
        $("[name='name']").val(response.name);
    })

    

    $(document).on("submit", "#updateForm", (e) => {
        e.preventDefault();

        const data = getFormData("#updateForm");

        profileUpdateRequest(data, (response) => {
            window.location.replace("/");
        }, (error) => {
            let useranmeError = error?.responseJSON?.error;

            let id = getRndInteger(10000, 99999);
            
            $("#errors").prepend(`<div class="alert alert-danger" role="alert" id='alert-${id}'>${useranmeError}</div>`);

            setTimeout(() => {
                $(`#alert-${id}`).remove();
            }, 5000)
        })
    })
})