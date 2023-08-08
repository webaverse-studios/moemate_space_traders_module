/**
 * Space traders modules
 * Gives the user the ability to plat space traders modules with the companion
 */
import * as SpaceTradersAPI from './lib/space_Traders_api.js'

let spaceTradersClient = null;

class SpaceTradersClient {

    accessToken = null;
    settings = {
        token: null,
    }

    constructor(){
        console.log("Space traders build")
        console.log(window.storage.Get('spaceTrader:settings').then((data) => {console.log(data)}));
    }

    setToken(token){
        this.settings.token = token;
    }

    async register(){
        await SpaceTradersAPI.CallRegister('test', 'Cosmic');
        //console.log("registers");
        this.settings.token = "lkjnmfvksjdhfikj";
        //console.log(this);
    }

    async saveSettings(){
        await window.storage.Set('spaceTrader:settings', JSON.stringify(this.settings));
    }
    
}

export function preload() {
    spaceTradersClient = new SpaceTradersClient();
    
}

export function init() {
    
    //console.log(spaceTradersClient);
    //window.hooks.on('comedian:handle_joke_skill', _handleJokeSkill)

    window.hooks.on('space_traders:register', () => {spaceTradersClient.register()});

    window.components.AddComponentToScreen('main-menu', 'SpaceTradersMenuButton');
    window.components.AddComponentToScreen('settings-window', 'SpaceTradersSettings');
}
