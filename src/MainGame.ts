import {EChallenge} from "./EChallenge";
import {SearchChallenge} from "./SearchChallenge";
import {Quiz} from "./Quiz";

class MainGame{
    private pointsPopup: any;
    private points = 0;
    private endGame = true;
    private currentPopup: any;
    private instructionPopup: any;

    constructor() {
        this.points = 0;
        this.endGame = true;
    }

    //init all zones for the instruction
    public startAllInstructionLayers(){
        this.onEnterInstructionLayer("instruction1");
        this.onLeaveInstructionLayer("instruction1");

        this.onEnterInstructionLayer("instruction2");
        this.onLeaveInstructionLayer("instruction2");

        this.onEnterInstructionLayer("instruction3");
        this.onLeaveInstructionLayer("instruction3");


    }

    //init all zones for the start zones
    public startAllChallengeLayers(){
        this.onEnterChallengeLayer("startQuiz");
        this.onLeaveChallengeLayer("startQuiz");

        this.onEnterChallengeLayer("startQuiz2");
        this.onLeaveChallengeLayer("startQuiz2");

        this.onEnterChallengeLayer("startEChallenge");
        this.onLeaveChallengeLayer("startEChallenge");

        this.onEnterChallengeLayer("startSearchChallenge");
        this.onLeaveChallengeLayer("startSearchChallenge");
    }

    private onEnterInstructionLayer(zone:string){
        let instructionMsg: string;
        if (zone == "instruction1"){
            instructionMsg = "Das Spiel das Sie gerade spielen, \n" +
                "wird ihnen die Quartiersplattform \n" +
                "des Pfaff-Quartiers näher bringen. \n \n" +
                "Mit vier Herausforderungen können Sie \n" +
                "einige Vorteile der Plattform kennenlernen."
        }
        else if(zone == "instruction2"){
            instructionMsg = "Wenn Sie weiter gehen, finden Sie den Hauptraum \n" +
                "mit vier verschiedenen Türen. \n" +
                "Hinter jeder Tür befindet sich eine Herausforderung. \n \n" +
                "Sobald Sie eine Herausforderung gestartet haben, \n" +
                " müssen Sie diese auch beenden,\n" +
                "damit Sie die nächste starten können. \n \n" +
                "Kehren Sie immer zurück zum Hauptraum, um die nächste Herausforderung zu starten."
        }

        else if(zone == "instruction3"){
            instructionMsg =  "Für jede Herausforderung gibt es Punkte zum Sammeln. \n \n" +
            "Im Hauptraum können Sie nach dem \n " +
            "Starten der ersten Herausforderung ihre Gesamtpunktzahl einsehen. \n \n" +
                "Die Informationen und Apps \n " +
                "für die Herausforderungen finden \n " +
                "Sie auf der Plattformswebseite. \n \n" +
                "Ps: Mit dem Scrollrad können \n" +
                "Sie rein und raus zoomen."
        }
        WA.room.onEnterLayer(zone).subscribe(() => {
            this.instructionPopup = WA.ui.openPopup(zone+ "Popup",instructionMsg,[{
                label: "Close",
                className: "primary",
                callback: (popup) => {
                    // Close the popup when the "Close" button is pressed.
                    popup.close();
                }
            }]);
        })


    }
    private onLeaveInstructionLayer(zone:string){
        WA.room.onLeaveLayer(zone).subscribe(() => {
            this.instructionPopup.close();
        })
    }

    private onLeaveChallengeLayer(zone: string){
        WA.room.onLeaveLayer(zone).subscribe(() => {
            this.currentPopup.close();
        })
    }
    private onEnterChallengeLayer(zone: string){
        let challenge: string;

        if (zone == "startQuiz"){
            challenge = "Quiz für Bewohner: \n" +
                "In diesem Spiel müssen Sie 8 verschiedene \n" +
                "Fragen zur Quartiersplattform beantworten. \n \n" +
                "Pro richtig beantworte Frage kriegen Sie einen Punkt. \n" +
                "Bei falsch beantwortete Fragen wird \n" +
                "Ihnen ein Punkt abgezogen. \n \n" +
                "Einige Fragen bieten Ihnen nach dem Beantworten \n" +
                "der Frage zusätzliche Informationen an. \n \n" +
                "Tipp: Das IKT-Konzept und die Apps der Plattform sind hilfreich für das Quiz "
        }
        if (zone == "startQuiz2"){
            challenge = "Quiz für Entwickler: \n" +
                "In diesem Spiel müssen Sie 6 verschiedene \n" +
                "Entwicklerfragen zur Quartiersplattform beantworten. \n \n" +
                "Pro richtig beantworte Frage kriegen Sie einen Punkt. \n" +
                "Bei falsch beantwortete Fragen wird \n" +
                "Ihnen ein Punkt abgezogen. \n \n" +
                "Tipp: Das Gitlab zur Plattform Mock wird ihnen bei diesem Quiz helfen "
        }

        else if(zone == "startEChallenge"){
            challenge = "EChallenge: \n" +
                "In der Wohnung von Maximilian gibt es 4 Geräte, die jeweils an oder aus sind. \n \n" +
                "Schalten Sie alle Geräte aus, die bereits an sind. \n \n" +
                "Wenn Sie denken, Sie haben alle Geräte richtig ausgeschaltet, \n" +
                "gehen Sie zum blauen Feld und beenden die Herausforderung. \n \n"+
                "Für das richtige Ausschalten gibt es 4 Punkte. \n \n" +
                "Ansonsten wird Ihnen ein Punkt abgezogen \n " +
                "und können dann wieder einen Versuch starten. \n \n" +
                "Tipp für die Lampen: App Fish n' Tipps \n " +
                "Kategorie Energie wird ihnen helfen."
        }

        else if (zone == "startSearchChallenge") {
            challenge = "SearchChallenge: \n" +
                "Bei MeDeTe hat sich ein Bewohner gemeldet. \n \n" +
                "Er würde sich gerne das Buch Der Hobbit \n" +
                "und einen Hammer ausleihen. \n \n" +
                "Geben Sie die richtigen Gegenstände ab, erhalten Sie 2 Punkte. \n \n" +
                "Ansonsten wird Ihnen ein Punkt abgezogen."
        }

        WA.room.onEnterLayer(zone).subscribe(() => {
            this.currentPopup = WA.ui.openPopup(zone + "Popup",challenge,[{
                label: "Starten",
                className: "primary",
                callback: (popup) => {
                    if (zone == "startQuiz"){
                        this.startQuiz(1);
                    }
                    if (zone == "startQuiz2"){
                        this.startQuiz(2);
                    }
                    else if(zone == "startEChallenge"){
                        this.startEChallenge();
                    }
                    else if (zone == "startSearchChallenge") {
                        this.startSearchChallenge();
                    }
                    setTimeout(() =>{
                        this.currentPopup .close();
                    },1000)
                    popup.close();
                }

            }])
        })
    }

    private startEChallenge(){
        if (this.endGame){
            let eChallenge: EChallenge;
            eChallenge = new EChallenge(this);
            this.endGame = false;
            eChallenge.startChallenge();

        }

    }
    private startSearchChallenge(){
        if (this.endGame){
            let searchChallenge: SearchChallenge;
            searchChallenge = new SearchChallenge(this);
            this.endGame = false;
            searchChallenge.startChallenge();

        }

    }
    private startQuiz(quizType: number){
        if (this.endGame){
            let quiz: Quiz;
            quiz = new Quiz(this,quizType);
            this.endGame = false;
            quiz.startQuiz();

        }

    }

    public getPoints(){
        return this.points;
    }
    public setPoints(points: number){
        this.points = points;
    }
    public setEndGame(endGame: boolean){
        this.endGame = endGame;
    }
    public showPoints(){
        if(this.pointsPopup != undefined){
            this.pointsPopup.close();
        }
        this.pointsPopup = WA.ui.openPopup("pointsAllPopup","Gesamtpunktzahl: \n "+ this.points,[]);
    }
}

export {MainGame};