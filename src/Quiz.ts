import {MainGame} from "./MainGame";

class Quiz{
    private mainGame: MainGame;
    private currentPopup: any;
    private resultPopup: any;
    private pointsPopup: any;
    private questionPopup: any;
    private currentQ = 0;
    private quizType: number;
    private correctAnswerArray = ['B','C','A','B','A','C','C','A','B','A','B','C','C','A'];
    private points = 0;

    constructor(mainGame: MainGame,quizType: number) {
        this.mainGame = mainGame;
        if (quizType == 2){
            this.currentQ = 8;
        }
        this.quizType = quizType;
    }

    public startQuiz() {
        this.pointsPopup = WA.ui.openPopup("points" + this.quizType + "Popup","Punkte:" + this.points,[]);

        //init all zones
        this.onEnterLayer('AZone');
        this.onLeaveLayer('AZone');
        this.onEnterLayer('BZone');
        this.onLeaveLayer('BZone');
        this.onEnterLayer('CZone');
        this.onLeaveLayer('CZone');


        //start quiz with first question
        if (this.quizType == 1){
            this.questionPopup = WA.ui.openPopup("question" + this.quizType + "Popup","Welchem Unternehmen gehörte das \n" +
                "ehemalige Werksgelände, auf dem das Quartier \n" +
                "aufgebaut wurde? \n \n" +
                "A: Bosh    B: Paff   C: Singer",[]);
        }
        else {
            this.questionPopup = WA.ui.openPopup("question" + this.quizType + "Popup","Wie viele Starter-Projekte für den \n" +
                " EnStadt:Pfaff Platform Mock gibt es? \n" +
                "A: 3    B: 4   C: 5",[]);
        }




    }


    private onEnterLayer(zone: string){
        WA.room.onEnterLayer(zone).subscribe(() => {
            if(this.currentQ < 8 && this.quizType == 1){
                this.standsOn(Array.from(zone)[0]);
            }
            else if (this.currentQ < 14 && this.quizType == 2){
                this.standsOn(Array.from(zone)[0]);
            }


        })
    }
    private onLeaveLayer(zone: string){
        WA.room.onLeaveLayer(zone).subscribe(() => {
            if(this.currentPopup != undefined){
                this.currentPopup.close();
            }
        })
    }

    //player stands on A,B or C
    private standsOn(zone: string){
        this.currentPopup = WA.ui.openPopup(zone + this.quizType + "Popup" ,"Antwort "+ zone,[{
            label: "Ja",
            className: "primary",
            callback: (popup) => {
                // Do this when the "Ja" button is pressed.
                if(this.answer(zone)){
                    //player chooses correct answer
                    //ask next question and add points to the total
                    this.resultPopup = WA.ui.openPopup("resultQuiz" + this.quizType + "Popup","Richtig",[]);
                    this.pointsPopup.close();
                    this.points++;
                    this.mainGame.setPoints(this.mainGame.getPoints()+1)
                    this.pointsPopup = WA.ui.openPopup("points"+this.quizType + "Popup","Punkte:"+ this.points,[]);
                    this.mainGame.showPoints();

                    //additional information after question was answered
                    if (this.currentQ == 4){
                        this.openSite("https://www.greenly.earth/en-us","Drücke 'space', um Information über Greenly zu erhalten")
                    }

                    else if(this.currentQ == 6){
                        this.openSite("https://www.vrn.de/mobilitaet/fahrrad/vrnnextbike/index.html","Drücke 'space', um Information über VRNnextbike zu erhalten")
                    }

                    else if(this.currentQ == 7){
                        this.openSite("https://olioex.com/food-waste-in/germany/","Drücke 'space', um Information über Olio zu erhalten")
                    }

                    this.nextQ();
                }
                else {
                    //player chooses wrong answer
                    //subtract on point from total and player can retry and
                    this.resultPopup = WA.ui.openPopup("resultQuiz" + this.quizType + "Popup","Falsch",[]);
                    this.mainGame.setPoints(this.mainGame.getPoints()-1);
                    this.points--;
                    this.pointsPopup.close();
                    this.pointsPopup = WA.ui.openPopup("points" + this.quizType + "Popup","Punkte:"+ this.points,[]);
                    this.mainGame.showPoints();

                }
                setTimeout(() =>{
                    this.resultPopup.close();
                },1000)
                popup.close();


            }

        }]);


    }

    //openSite for additional information
    private openSite(url :string, message: string){
        const triggerMessage = WA.ui.displayActionMessage({
            message: message,
            callback: async () => {
                const myWebsite = await WA.ui.website.open({
                    url: url,
                    position: {
                        vertical: "top",
                        horizontal: "middle",
                    },
                    size: {
                        height: "70vh",
                        width: "70vw",
                    },
                });

                const triggerMessage2 = WA.ui.displayActionMessage({
                    message: "Drücken Sie zuerst auf das Spiel und dann 'space', um die Webseite zu schließen",
                    callback: async () => {
                        await myWebsite.close();
                        await triggerMessage2.remove();

                    }

                });


            }

        });
        setTimeout(() => {
            // later
            triggerMessage.remove();
        }, 3000)
    }

    //load next Question
    private nextQ(){
        this.closePopUp();
        this.currentQ++;
        if (this.currentQ ==  8 && this.quizType == 1){
            //end this challenge when all questions are answered
            this.mainGame.setEndGame(true);
            this.pointsPopup.close();

        }
        if (this.currentQ ==  14 && this.quizType == 2){
            //end this challenge when all questions are answered
            this.mainGame.setEndGame(true);
            this.pointsPopup.close();

        }

        //ask next question
        if (this.currentQ == 1){
            this.questionPopup = WA.ui.openPopup("question"+this.quizType + "Popup","Laut den Klimaschutzzielen der Bundesregierung \n" +
                "soll bis 2050 die Reduzierung der Treibhauseffekte \n" +
                "im Vergleich zu 1990 wie hoch ausfallen? \n \n" +
                "A: 20%-30%  B: 40%-60%  C: 80%-95%" ,[]);
        }

        if (this.currentQ == 2){
            this.questionPopup = WA.ui.openPopup("question"+this.quizType + "Popup","Wie hoch soll dabei der Anteil \n" +
                "an erneuerbaren Energien sein? \n \n" +
                "A: 60%  B: 30%  C: 80%" ,[]);
        }

        if (this.currentQ == 3){
            this.questionPopup = WA.ui.openPopup("question"+this.quizType+ "Popup","Was ist die digitale Quartiersplattform? \n \n  " +
                "A: Ein App-Store, mit dem man sich neue Apps herunterladen kann. \n \n" +
                "B: Eine Software, mithilfe derer die Apps und Dienste des Quartiers \n" +
                "miteinander kommunizieren können. \n \n " +
                "C: Ein soziales Netzwerk, das vom Quartier angeboten wird." ,[]);
        }

        if (this.currentQ == 4){
            this.questionPopup = WA.ui.openPopup("question"+this.quizType + "Popup","Welche dieser Apps zeigt den Energieverbrauch  \n " +
                "deines Haushaltes  an \n" +
                "und gibt zusätzlich Tipps, sodass du diesen senken kannst? \n \n" +

                "A: Greenly  B: Fish n'Tipps  C: Pfaff-Funk" ,[]);
        }
        if (this.currentQ == 5){
            this.questionPopup = WA.ui.openPopup("question"+this.quizType + "Popup","Wie viele Tipp-Kategorien gibt es \n " +
                "in der Fish n' Tipps App? \n \n " +
                "A: 8  B: 10  C: 9" ,[]);
        }

        if (this.currentQ == 6){
            this.questionPopup = WA.ui.openPopup("question"+this.quizType + "Popup","Welches dieser Verkehrsmittel \n" +
                "ist am energiesparendsten? \n \n" +
                "A: Auto  B: E-Auto C: Fahrrad" ,[]);
        }

        if (this.currentQ == 7){
            this.questionPopup = WA.ui.openPopup("question"+this.quizType + "Popup","Pro Jahr werden weltweit 1,3 Milliarden Tonnen \n" +
                "an Essen verschwendet. Welche App \n" +
                "hilft dir dabei, diese Lebensmittelverschwendung gezielt zu bekämpfen \n" +
                "und gleichzeitig Geld zu sparen? \n \n" +
                "A: Olio  B: MeDeTe C: Pfaff-Funk" ,[]);
        }
        if (this.currentQ == 9){
            this.questionPopup = WA.ui.openPopup("question"+this.quizType + "Popup","Wofür steht MQTT? \n \n"+
                "A: Message Queuing Telemetry Transport \n \n" +
                "B: Message Query Telemetry Transport \n \n" +
                "C: Machine Query Telemetry Transport \n \n"  ,[]);
        }
        if (this.currentQ == 10){
            this.questionPopup = WA.ui.openPopup("question"+this.quizType + "Popup","Was sind „Shared Topics“ im " +
                "MQTT-Broker in erster Linie?\n \n " +
                "A: Themen, die wichtig für Bewohner sind \n \n" +
                "B: Öffentliche, Asynchrone Informationskanäle \n \n" +
                "C: Api-Schnittestelle, mit der Entwickler ihre App \n" +
                "veröffentlichen können" ,[]);
        }
        if (this.currentQ == 11){
            this.questionPopup = WA.ui.openPopup("question"+this.quizType + "Popup","Wie viele „Shared Topics“ sind zurzeit verfügbar? \n \n" +
                "A: 2  B: 6 C: 3" ,[]);
        }
        if (this.currentQ == 12){
            this.questionPopup = WA.ui.openPopup("question"+this.quizType + "Popup","Was kann mit „publish“ \n" +
                "im Kontext des MQTT-Broker erreicht werden? \n \n" +
                "A: App/Dienst wird auf der Plattform veröffentlicht\n" +
                "und mit dieser/diesem verbunden \n \n" +
                "B: Entwickler können hiermit ein neues Topic erstellen \n" +
                "und veröffentlichen. \n \n" +
                "C: Event-Nachrichten,die nicht spezifisch adressiert werden,\n" +
                "werden in einem Topic veröffentlicht." ,[]);
        }
        if (this.currentQ == 13){
            this.questionPopup = WA.ui.openPopup("question"+this.quizType + "Popup","Wer hat die Befugnisse\n" +
                "auf „Service Specific Topics“ \n \n " +
                "A: Dienstbetreiber  B: Plattformbetreiber  C: Bewohner des Quartiers" ,[]);
        }



    }

    //check if answer of player is correct
    private answer(x: string):boolean{
        if(this.currentQ<= this.correctAnswerArray.length-1){
            return x == this.correctAnswerArray.at(this.currentQ);
        }
        else {
            return false
        }
    }


    private closePopUp(){
        if (this.questionPopup !== undefined) {
            this.questionPopup.close();
            this.questionPopup = undefined;
        }
    }
}


export {Quiz};