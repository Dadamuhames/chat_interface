$(document).ready(() => {
    const checkAuth = () => {
        let accessToken = window.localStorage.getItem("accessToken");
        let refreshToken = window.localStorage.getItem("refreshToken");

        let url = window.location.pathname;

        if (!accessToken && url != "/register") {
            window.location.replace("/login")
        }
    }

    checkAuth();
    routingFn();

    getProfile((response) => {
        let image = response.image == null ? getProfileImage(response.name) : `<img class="user-profile" src="${response.image}" id="profile_photo" alt class="account-profile">`;
        $("#profile_photo").html(image)
    })


    if (localStorage.getItem("mode") && !document.body.classList.contains("dark-mode")) {
        document.body.classList.add('dark-mode');
    }
})