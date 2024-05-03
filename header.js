document.addEventListener("DOMContentLoaded", function () {
    var headerContainer = document.getElementById("header-container");
    fetch("header.html")
        .then(function (response) {
            return response.text();
        })
        .then(function (html) {
            headerContainer.innerHTML = html;
        });
});
