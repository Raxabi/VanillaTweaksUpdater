"use strict";
const user = {
    guiSelectedPacks: Object.values({ ...document.getElementsByClassName("thumbnail selected") }),
    selectedPacks: JSON.parse(JSON.stringify(selectedPacks)),
    selectedPacksShow: JSON.parse(JSON.stringify(selectedPacksShow)),
    categories: [...categories],
    listedPacks: Array.from(selector.childNodes[0].childNodes).map(pack => pack.cloneNode(true)),
    version: version
};
function createListOfChanges() {
    const LIST_OF_CHANGES = document.createElement("ul");
    LIST_OF_CHANGES.setAttribute("id", "changes_list");
    LIST_OF_CHANGES.setAttribute("class", "outerlist ui-sortable");
    return LIST_OF_CHANGES;
}
function getGuiUserSelectedPack() { return user.guiSelectedPacks; }
function getGuiAllPacks() { return Object.values(document.getElementsByClassName("thumbnail")); }
function selectPacksOfUser() {
    const userPacks = getGuiUserSelectedPack();
    const allPacks = getGuiAllPacks();
    for (const change of allPacks) {
        for (const userChange of userPacks) {
            if ((change.text == userChange.text))
                change.classList.add("selected");
        }
    }
}
function setListedChangesToUserListedChanges() {
    selector.innerHTML = "";
    const listOfPacks = createListOfChanges();
    user.listedPacks.forEach(listedPack => listOfPacks.appendChild(listedPack));
    selector.appendChild(listOfPacks);
}
function setSelectedPacksToUserPacks() {
    const userSelectedPacks = Object.entries(user.selectedPacks);
    userSelectedPacks.forEach(uPack => selectedPacks[uPack[0]] = uPack[1]);
    Object.assign(selectedPacksShow, selectedPacks);
}
function main() {
    if (user.version === version) {
        alert("First, change your version to a newer version");
        return;
    }
    selectPacksOfUser();
    setListedChangesToUserListedChanges();
    setSelectedPacksToUserPacks();
}
