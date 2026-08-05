"use strict";
const user = {
    guiSelectedPacks: Array.from(document.querySelectorAll(".thumbnail.selected")),
    selectedPacks: structuredClone(selectedPacks),
    selectedPacksShow: structuredClone(selectedPacksShow),
    categories: [...categories],
    listedPacks: Array.from(selector.firstElementChild?.childNodes || []).map(pack => pack.cloneNode(true)),
    version: version
};
function getPacksToHighlight(availablePackNames, savedPackNames) {
    const savedSet = new Set(savedPackNames);
    return new Set(availablePackNames.filter(name => savedSet.has(name)));
}
;
function renderPacksHighlight(highlightState) {
    const allPacks = document.querySelectorAll(".thumbnail");
    allPacks.forEach(pack => {
        pack.classList.toggle("selected", highlightState.has(pack.text));
    });
}
;
function renderSidebar(savedNodes) {
    const listOfPacks = document.createElement("ul");
    listOfPacks.id = "changes_list";
    listOfPacks.className = "outerlist ui-sortable";
    listOfPacks.append(...savedNodes);
    selector.replaceChildren(listOfPacks);
}
;
function updateGlobalState(savedPacks) {
    Object.assign(selectedPacks, savedPacks);
    Object.assign(selectedPacksShow, selectedPacks);
}
;
function main() {
    if (user.version === version) {
        alert("First, change your version to a newer version.");
        return;
    }
    const availablePacks = Array.from(document.querySelectorAll(".thumbnail")).map(p => p.text);
    const userSavedPacks = user.guiSelectedPacks.map(p => p.text);
    const packsToHighlight = getPacksToHighlight(availablePacks, userSavedPacks);
    renderPacksHighlight(packsToHighlight);
    renderSidebar(user.listedPacks);
    updateGlobalState(user.selectedPacks);
}
