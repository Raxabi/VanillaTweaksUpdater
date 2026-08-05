/// <reference path="index.d.ts" />

/**
 * Object that acts as a "Snapshot". 
 * Stores the user's current state (selected packs, categories, and version) 
 * before a version change occurs in the Vanilla Tweaks interface.
 */
const user = {
    guiSelectedPacks:  Array.from(document.querySelectorAll<HTMLAnchorElement>(".thumbnail.selected")),
    selectedPacks:     structuredClone(selectedPacks),
    selectedPacksShow: structuredClone(selectedPacksShow),
    categories:        [...categories],
    listedPacks:       Array.from(selector.firstElementChild?.childNodes || []).map(pack => pack.cloneNode(true)),
    version:           version 
};

/**
 * Calculates which packs should be highlighted by comparing available vs saved packs.
 * 
 * @param {string[]} availablePackNames - Names of packs visible in the current UI.
 * @param {string[]} savedPackNames - Names of packs the user had previously selected.
 * @returns {Set<string>} A set of pack names that need the 'selected' state.
 */
function getPacksToHighlight(availablePackNames: string[], savedPackNames: string[]): Set<string> {
    const savedSet = new Set(savedPackNames);
    return new Set(availablePackNames.filter(name => savedSet.has(name)));
};

/**
 * Updates the DOM declaratively based on the provided state.
 * Syncs the visual grid of Vanilla Tweaks with the restored packs.
 * 
 * @param {Set<string>} highlightState - The exact packs that should be selected.
 */
function renderPacksHighlight (highlightState: Set<string>): void {
    const allPacks = document.querySelectorAll<HTMLAnchorElement>(".thumbnail");
    
    allPacks.forEach(pack => {
        // Toggles the class ON if the pack is in our set, OFF if it isn't
        pack.classList.toggle("selected", highlightState.has(pack.text));
    });
};

/**
 * Replaces the right sidebar content (selected packs list) with the saved DOM nodes.
 * 
 * @param {Node[]} savedNodes - The cloned nodes from the previous version.
 */
function renderSidebar (savedNodes: Node[]): void {
    const listOfPacks = document.createElement("ul");
    listOfPacks.id = "changes_list";
    listOfPacks.className = "outerlist ui-sortable";
    
    // Append all restored nodes at once
    listOfPacks.append(...savedNodes);
    
    // Replace current sidebar content with our restored list in one step
    selector.replaceChildren(listOfPacks);
};

/**
 * Overwrites Vanilla Tweaks' global variables with the restored state data.
 * 
 * @param {Record<string, CategoryMetadata[]>} savedPacks - The structured data to restore.
 */
function updateGlobalState (savedPacks: Record<string, CategoryMetadata[]>): void {
    Object.assign(selectedPacks, savedPacks);
    Object.assign(selectedPacksShow, selectedPacks);
};

/**
 * Main execution pipeline for the version migration process.
 */
function main(): void {
    if (user.version === version) {
        alert("First, change your version to a newer version.");
        return;
    }

    // 1. Read current state from the DOM (Input)
    const availablePacks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".thumbnail")).map(p => p.text);
    const userSavedPacks = user.guiSelectedPacks.map(p => p.text);

    // 2. Compute new state (Pure Logic)
    const packsToHighlight = getPacksToHighlight(availablePacks, userSavedPacks);

    // 3. Apply state to the UI and Globals (Side Effects)
    renderPacksHighlight(packsToHighlight);
    renderSidebar(user.listedPacks);
    updateGlobalState(user.selectedPacks);
}