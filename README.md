# VanillaTweaksUpdater

> Updater for Vanilla Tweaks Minecraft resource packs

[Vanilla Tweaks](https://vanillatweaks.net/) is a popular web site for minecraft, which allows you to create data packs, resource packs and edit or add some crafts of the game.

This utility is designed to [the part of resource packs](https://vanillatweaks.net/picker/resource-packs/). And allow you "update" your resource pack to a newer version of the game and works in the next way:</br>

1. Once the resource pack is added (a .zip file), open the browser console on the site

2. Copy the code inside 'main.js' (or compile main.ts). Then Press enter and then, change your version to a different version (any way, even you doesn't change the game version, an alert warning you will be displayed, stopping 'main' function execution)

3. Once the version was changed, in the same console, execute the 'main' function: `main()`

4. Finally, the selector and packs-selector elements will be in the same state than when you added the resource pack. Also, the objects `selectedPacks` and `selectedPacksShow`

> Advice: Even if some category was moved to another category as a sub-category, the packs of that category still has markeds as selected.
> This can be fixed, but makes the code harder for a project made here and there and in no time. Any way, in some moment I will fix this for comfort and make the utility in accordance with the site (if a native updater is not added until these moment xd)
> Also keep in mind, that this utility doenst check if you selected a previous minecraft version to the version that the provided resource pack was originally designed. If you choose a very old version of Minecraft, your game probably will get some bugs on some textures

## Glosary

- Pack: Changes that will be applied to the result resource pack
- Category: Group of packs of the same kind
- selectedPacks: object which contains the selected packs and which category belongs to
- selectedPacksShow: The same as `selectedPacks` but is used for list the contents of the `selector`
- selector: `div` HTML element which contains an `ul` element, used to list all the selected packs and which category belongs to
- packs-selector: `div` HTML element which contains multiple `div` elements to show the categories.

As a reference look the next picture:
![image_reference](./Image%20reference%20VanillaTweaksUpdater.png)

> Final advice: Probably some concepts in the Glosary or other explanation may be wrong.
> Because the source code of [Vanilla Tweaks](https://vanillatweaks.net/) is not public (almost until I have seen) and all the work was made working over analize the code of the website and constantly use the console and the inspector to see how to site respond to some actions

Enjoy the tool :)

> Super-final-advice-I-promise: I already know that some code comments are badly documented, because was wrote on the fly when I start the tool and I feel lazy :)
