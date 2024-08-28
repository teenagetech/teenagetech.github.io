function show(enabled, useSettingsInsteadOfPreferences) {
    if (useSettingsInsteadOfPreferences) {
        document.getElementsByClassName('state-on')[0].innerText = "word clock is currently on. you can turn it off in the extensions section of safari settings.";
        document.getElementsByClassName('state-off')[0].innerText = "word clock is currently off. you can turn it on in the extensions section of safari settings.";
        document.getElementsByClassName('state-unknown')[0].innerText = "you can turn on word clock in the extensions section of safari settings.";
        document.getElementsByClassName('open-preferences')[0].innerText = "quit and open safari settings…";
    }

    if (typeof enabled === "boolean") {
        document.body.classList.toggle(`state-on`, enabled);
        document.body.classList.toggle(`state-off`, !enabled);
    } else {
        document.body.classList.remove(`state-on`);
        document.body.classList.remove(`state-off`);
    }
}

function openPreferences() {
    webkit.messageHandlers.controller.postMessage("open-preferences");
}

document.querySelector("button.open-preferences").addEventListener("click", openPreferences);
