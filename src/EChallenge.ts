import {MainGame} from "./MainGame";


class EChallenge{
    private mainGame: MainGame;
    private endGame = false;
    private currentPopup: any;
    private allObjectsState = [{id: 0, an: true}, {id: 1, an: false},{id: 2, an: true },{id: 3, an: true}];
    private resultPopup: any;


    constructor(mainGame: MainGame) {
        this.mainGame = mainGame;
    }

    public startChallenge(){
        //init all zones
        this.onEnterLayer('lightone');
        this.onLeaveLayer('lightone')

        this.onEnterLayer('lighttwo');
        this.onLeaveLayer('lighttwo');
        this.onEnterLayer('tv');
        this.onLeaveLayer('tv');
        this.onEnterLayer('pc');
        this.onLeaveLayer('pc');

        this.onEnterLayer('endEChallenge');
        this.onLeaveLayer('endEChallenge');

    }

    private onEnterLayer(zone:string){
        WA.room.onEnterLayer(zone).subscribe(() => {
            if(!this.endGame){
                if(zone == "endEChallenge"){
                    this.endChallenge();
                }
                else{
                    this.inFrontOf(zone);
                }
            }

        })
    }
    private onLeaveLayer(zone: string){
        WA.room.onLeaveLayer(zone).subscribe(() => {
            this.currentPopup.close();
        })
    }

    //player stands in front of an object and might want to turn on/off it
    private inFrontOf(zone: string){
        this.currentPopup = WA.ui.openPopup(zone + "Popup",zone + "\n an/ausschalten? ",[{
            label: "Ja",
            className: "primary",
            callback: (popup) => {
                // Do this when the "Ja" button is pressed.
                //player wants to turn on/off a object
                this.turnOnOff(zone)
                setTimeout(() =>{
                },1000)
                popup.close();

            }
        }]);

    }

    //change state of the object player wants to turn on/off
    private turnOnOff(object: string){

        //change state of the object
        if (object == "lightone"){
            this.allObjectsState[0].an =  !this.allObjectsState[0].an;
        }
        if (object == "lighttwo"){
            this.allObjectsState[1].an =  !this.allObjectsState[1].an;
        }
        if (object == "tv"){
            this.allObjectsState[2].an =  !this.allObjectsState[2].an;
        }
        if (object == "pc"){
            this.allObjectsState[3].an =  !this.allObjectsState[3].an;
        }

    }

    //when the player wants to end this challenge
    private endChallenge(){
        this.currentPopup = WA.ui.openPopup("endEChallengePopup","Beenden",[{
            label: "Ja",
            className: "primary",
            callback: (popup) => {
                // Do this when the "Ja" button is pressed.
                //check if lightone,pc,tv are turned off
                if (!(this.allObjectsState[0].an) && !(this.allObjectsState[1].an) && !(this.allObjectsState[2].an) && !(this.allObjectsState[3].an)){
                    //end this challenge and add 4 points
                    this.resultPopup = WA.ui.openPopup("resultEPopup","Gut gemacht! \n \n" +
                        "Alle Geräte sind aus.",[]);
                    this.endGame = true;
                    this.mainGame.setEndGame(this.endGame);
                    this.mainGame.setPoints(this.mainGame.getPoints()+4);
                    this.mainGame.showPoints();

                }
                else {
                    //subtract a point
                    //player can retry
                    this.resultPopup = WA.ui.openPopup("resultEPopup","Nicht alle Geräte sind aus! \n \n" +
                        "Versuchen Sie es erneut.",[]);
                    this.mainGame.setPoints(this.mainGame.getPoints()-1);
                    this.mainGame.showPoints();


                }

                setTimeout(() =>{
                    this.resultPopup.close();
                },2000)
                popup.close();
            }

        }]);

    }

}

export {EChallenge};