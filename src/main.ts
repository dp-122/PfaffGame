/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

import {MainGame} from "./MainGame";


console.log('Script started successfully');


let mainGame: MainGame;
// Waiting for the API to be ready
WA.onInit().then(() => {


    mainGame = new MainGame();
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)



    mainGame.startAllChallengeLayers();
    mainGame.startAllInstructionLayers();


    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));







export {};

