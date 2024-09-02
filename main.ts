/**
 */
const user = {
    guiSelectedPacks:  Object.values({ ...document.getElementsByClassName("thumbnail selected") }) as HTMLAnchorElement[],
    selectedPacks:     JSON.parse(JSON.stringify(selectedPacks)) as Record<string, CategoryMetadata[]>, // deep copying object
    selectedPacksShow: JSON.parse(JSON.stringify(selectedPacksShow)) as Record<string, CategoryMetadata[]>, // deep copying object
    categories:        [...categories],
    listedPacks:       Array.from(selector.childNodes[0].childNodes).map(pack => pack.cloneNode(true)),
    version:           version // Does not need a explicit copy since string is a primitive
}

function createListOfChanges(): HTMLUListElement {
    const LIST_OF_CHANGES = document.createElement("ul")

    LIST_OF_CHANGES.setAttribute("id", "changes_list")
    LIST_OF_CHANGES.setAttribute("class", "outerlist ui-sortable")

    return LIST_OF_CHANGES
}

/**
 * @returns All the anchor elements which are marked with `selected` class
 */
function getGuiUserSelectedPack() { return user.guiSelectedPacks }

/**
 * @returns All the anchor elements which are marked with `thumbnail` class
 */
function getGuiAllPacks() { return Object.values(document.getElementsByClassName("thumbnail")) as HTMLAnchorElement[] }

/**
 * Applies 'selected' class to the packs of the user in the new version
 * @param userChanges 
 * @param allChanges 
 */
function selectPacksOfUser() {
    const userPacks = getGuiUserSelectedPack()
    const allPacks = getGuiAllPacks()

    for (const change of allPacks) {
        for (const userChange of userPacks) {
            if ((change.text == userChange.text))
                change.classList.add("selected")
        }
    }
}

/**
 * Copies the 'ul' generated when the resource pack is provided to the empty list when the version is changed
 */
function setListedChangesToUserListedChanges() {
    selector.innerHTML = ""

    const listOfPacks = createListOfChanges()
    user.listedPacks.forEach(listedPack => listOfPacks.appendChild(listedPack))
    selector.appendChild(listOfPacks)
}

/**
 * Sets the `selectedPack` content to `user.selectedPack` content
 * 
 * Keep in mind that:
 *  * If the pack being iterated does not exists in the same category of user category, that pack will not be added
 */
function setSelectedPacksToUserPacks() {
    const userSelectedPacks = Object.entries(user.selectedPacks)

    userSelectedPacks.forEach(uPack => selectedPacks[uPack[0]] = uPack[1]);
    Object.assign(selectedPacksShow, selectedPacks) // 'selectedPacksShow', at the end, has the same contents than 'selectedPacks'
}

function main() {
    if (user.version === version) {
        alert("First, change your version to a newer version")
        return;
    }

    // Sets the pack from the `packs-selector` container to selected
    // applying 'selected' class to each element
    selectPacksOfUser()

    setListedChangesToUserListedChanges()

    setSelectedPacksToUserPacks()
}