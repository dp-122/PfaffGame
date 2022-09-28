import {MainGame} from "./MainGame";

class SearchChallenge{
    private mainGame: MainGame;
    private endGame = false;
    private currentPopup: any;
    private resultPopup: any;
    private takeObjectsArray: Array<string> = [];

    constructor(mainGame: MainGame) {
        this.mainGame = mainGame;
    }
    public startChallenge(){
        //init all zones

        //libs
        this.onEnterLayer('lib1');
        this.onLeaveLayer('lib1');
        this.onEnterLayer('lib2');
        this.onLeaveLayer('lib2');
        this.onEnterLayer('lib3');
        this.onLeaveLayer('lib3');

        //closets
        this.onEnterLayer('closet1');
        this.onLeaveLayer('closet1');
        this.onEnterLayer('closet2');
        this.onLeaveLayer('closet2');
        this.onEnterLayer('closet3');
        this.onLeaveLayer('closet3');
        this.onEnterLayer('closet4');
        this.onLeaveLayer('closet4');

        //endSearch
        this.onEnterLayer('endSearch')
        this.onLeaveLayer('endSearch')


    }

    private onEnterLayer(zone: string){
        if(zone == "endSearch"){
            WA.room.onEnterLayer(zone).subscribe(() => {
                if(!this.endGame){
                    this.endChallenge();
                }

            })
        }
        else {

            WA.room.onEnterLayer(zone).subscribe(() => {
                if (!this.endGame){
                    this.inFrontOf(zone);
                }
            })


        }

    }
    private onLeaveLayer(zone: string){
        WA.room.onLeaveLayer(zone).subscribe(() => {
            this.currentPopup.close();
        })
    }

    private inFrontOf(zone: string){
        let takeThis: string;
        takeThis = this.objectIn(zone);
        this.currentPopup = WA.ui.openPopup("searchRoomPopup",takeThis + "\n nehmen/ \n zurücklegen",[{
            label: "Ja",
            className: "primary",
            callback: (popup) => {
                // Do this when the "Ja" button is pressed.
                this.take(takeThis)
                setTimeout(() =>{
                },1000)
                popup.close();

            }
        }]);


    }

    //object from closet/lib player might want to take
    private objectIn(zone: string):string{
        if(zone == "lib1") {
            return "Harry Potter BD.1"
        }
        else if(zone == "lib2"){
            return "Der Hobbit"
        }
        else if(zone == "lib3"){
            return "1984"
        }
        else if(zone == "closet1"){
            return "Hammer"
        }
        else if(zone == "closet2"){
            return "Schere"
        }
        else if(zone == "closet3"){
            return "Wasserwaage"
        }
        else if(zone == "closet4"){
            return "Schraubenzieher"
        }

        else return ""
    }

    private take(takeThis: string){

        if (this.takeObjectsArray.indexOf(takeThis) > -1){
            //take object from lib/closet
            this.delete(this.takeObjectsArray.indexOf(takeThis),this.takeObjectsArray);
        }
        else {
            //put object back in lib/closet
            this.takeObjectsArray.push(takeThis);
        }
    }

    private endChallenge(){
        this.currentPopup = WA.ui.openPopup("endSearchPopup","Gegenstände abgeben?",[{
            label: "Ja",
            className: "primary",
            callback: (popup) => {
                // Do this when the "Ja" button is pressed.
                //check whether player borrows correct objects
                if (this.takeObjectsArray.indexOf("Der Hobbit") > -1 && this.takeObjectsArray.indexOf("Hammer") > -1 && this.takeObjectsArray.length == 2){
                    //player has chosen correct objects
                    //end challenge and add 2 points to the total
                    this.resultPopup = WA.ui.openPopup("resultSearchPopup","Gut gemacht. \n \n" +
                        "Alle richtigen Gegenstände abgegebenn.",[]);
                    this.endGame = true;
                    this.mainGame.setEndGame(this.endGame);
                    this.mainGame.setPoints(this.mainGame.getPoints()+2);
                    this.mainGame.showPoints();

                }
                else {
                    //wrong objects borrowed
                    //substract one point and player can search again
                    this.resultPopup = WA.ui.openPopup("resultSearchPopup","Falsche Abgabe der Gegenstände. \n \n " +
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



    private delete(index:number, arr: Array<string>){
        if (index !== -1) {
            arr.splice(index, 1);
        }
    }
}


export {SearchChallenge};