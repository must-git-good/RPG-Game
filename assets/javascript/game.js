// RPG Game :: Powered by (some) jQuery



//DECLARE GLOBAL VARIABLES
    var ghostBtn = $(".selectghostbtn");
    var ghostFightBtn = $("#btn-fight");
    var newGameBtn = $("#btn-reset");
    var ghostSelected = $(".ghost-holder");

    var ghostOne = {name: "Red Ghost",attackPower: 8,startPower:8,hitPoints: 100,counterAttack: 10, alive: true};
    var ghostTwo = {name: "Yellow Ghost",attackPower:12,startPower:12,hitPoints: 70,counterAttack: 5, alive: true};
    var ghostThree = {name: "Green Ghost",attackPower:4,startPower:4,hitPoints: 100,counterAttack: 20, alive: true};
    var ghostFour = {name: "White Ghost",attackPower:6,startPower:6,hitPoints: 240,counterAttack: 10, alive: true};    ///REWORK THE LOGIC BASED ON THIS ALIVE STATE.
    
    var attackGhost = {};
    var defendGhost = {};
    
    var attackerAssigned = false;
    var defendersKilled = 0;

//DECLARE GLOBAL FUNCTIONS

function ghostFight(aG,dG){                                 //aG - Sets the Attacking Ghost, dG - Sets the Defending Ghost.
    console.log("Starting stats for attacker: AP, HP, CA ->  " + aG.attackPower +" "+ aG.hitPoints +" "+ aG.counterAttack);
    console.log("Starting stats for defender: AP, HP, CA ->  " + dG.attackPower +" "+ dG.hitPoints +" "+ dG.counterAttack);
    dG.hitPoints = (dG.hitPoints - aG.attackPower);
    aG.hitPoints = (aG.hitPoints- dG.counterAttack);
    aG.attackPower = (aG.attackPower + aG.startPower);
    console.log("End of round stats: AP, HP, CA ->  " + aG.attackPower +" "+ aG.hitPoints +" "+ aG.counterAttack);
    console.log("End of round stats: AP, HP, CA ->  " + dG.attackPower +" "+ dG.hitPoints +" "+ dG.counterAttack);
};


function assignAttackGhost(){
    if (currentClick === "g1"){
        attackGhost = ghostOne;
    } else if (currentClick === "g2"){
        attackGhost = ghostTwo;
    } else if (currentClick === "g3"){
        attackGhost = ghostThree;
    } else if (currentClick === "g4"){
        attackGhost = ghostFour;
    }
};

function assignDefendGhost(){
    if (currentClick === "g1"){
        defendGhost = ghostOne;
    } else if (currentClick === "g2"){
        defendGhost = ghostTwo;
    } else if (currentClick === "g3"){
        defendGhost = ghostThree;
    } else if (currentClick === "g4"){
        defendGhost = ghostFour;
    }
};

function initializeGame(){
    //reset the variable values here to 'reset' the game.
    ghostOne = {name: "Red Ghost",attackPower: 8,startPower:8,hitPoints: 100,counterAttack: 10, alive: true};
    ghostTwo = {name: "Yellow Ghost",attackPower:12,startPower:12,hitPoints: 70,counterAttack: 5, alive: true};
    ghostThree = {name: "Green Ghost",attackPower:4,startPower:4,hitPoints: 100,counterAttack: 20, alive: true};
    ghostFour = {name: "White Ghost",attackPower:6,startPower:6,hitPoints: 240,counterAttack: 10, alive: true};  
    attackGhost = {};
    defendGhost = {};
    attackerAssigned = false;
    newGameBtn.attr("style", "visibility: hidden;");
    ghostFightBtn.attr("style", "visibility: hidden;");
    ghostBtn.attr("style", "visibility: visible;");
    defendersKilled = 0;
};

// function defenderIsDead(){
//     if (defendGhost.hitPoints <= 0){
//         console.log(this);
//     }
// };

// function attackerIsDead(){
//     if (attackGhost.hitPoints <= 0){
//         return(true);
//         //do defender dead things
//     }
// };

function assignDeathStatus(){
    if (attackGhost.hitPoints <= 0) {
        attackGhost.alive = false;
        console.log("Attack Ghost has died");
    } else if (defendGhost.hitPoints <= 0) {
        defendGhost.alive = false;
        console.log("Defend Ghost has died");
    }
};

function youLose(){
if (attackGhost.alive === false) {
    // Do loss things.
    newGameBtn.attr("style", "visibility: visible;");
    ghostFightBtn.attr("style", "visibility: hidden;");
    alert("You have lost. Play again if you'd like.");
}
};

function nextContender(){
    if (defendGhost.alive === true) {
        return;
        } 
    else if ((defendGhost.alive === false) && (defendersKilled <3)) {
    ghostFightBtn.attr("style", "visibility: hidden;");
    ghostBtn.attr("style", "visibility: visible;");
    alert("Pick your next defender");
    defendersKilled++;
    attackerAssigned = true;
        }
    else if ((defendGhost.alive === false) && (defendersKilled >=3)) {
        newGameBtn.attr("style", "visibility: visible;");
        ghostFightBtn.attr("style", "visibility: hidden;");
        alert("You win! Play again!");
    }
};

//CREATE MAIN GAME



$(document).ready(function() {

    newGameBtn.attr("style", "visibility: hidden;");
    ghostFightBtn.attr("style", "visibility: hidden;");


    ghostBtn.on("click", function(){
        // console.log(this);
        // console.log( $(this).val());
        // console.log("Have they been assigned?" + attackGhost + defendGhost)
        if (attackerAssigned === false){
        currentClick  = $(this).val();
        assignAttackGhost();
        attackerAssigned = true;
        } else if (attackerAssigned === true){
        currentClick  = $(this).val();
        assignDefendGhost();
        ghostFightBtn.attr("style", "visibility: visible;");
        ghostBtn.attr("style", "visibility: hidden;");
        }

        console.log("Now they have been assigned!" + attackGhost + defendGhost)
    });

    ghostFightBtn.on("click", function(){                        //on the click of a ghost selector button
        console.log(attackGhost);
        console.log(defendGhost);
        console.log("Fight has activated");
        console.log(this);
        console.log( $(this).val());
        ghostFight(attackGhost,defendGhost); 

        console.log("Round has concluded. We should be able to just fight again.")
        console.log(attackGhost,defendGhost);
        assignDeathStatus();
        console.log (attackGhost, defendGhost);
        youLose();
        console.log (attackGhost, defendGhost);
        nextContender();
        console.log (attackGhost, defendGhost);
    });

    newGameBtn.on("click", function(){
        initializeGame();
        console.log("A new game has started");
        //reset visual elements
    });


});  // END OF MAIN SECTION


    