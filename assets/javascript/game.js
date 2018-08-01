// RPG Game :: Powered by jQuery



//DECLARE GLOBAL VARIABLES
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Buttons
var ghostBtn = $(".selectghostbtn");
var happens = $(".body");
var ghostFightBtn = $("#btn-fight");
var newGameBtn = $("#btn-reset");
var selectAllGhosts = $(".ghost-holder");
var mainBannerText = $("#welcome_text");
//Ghost Objects
var ghostOne = { name: "White Ghost", attackPower: 8, startPower: 8, hitPoints: 100, counterAttack: 10, alive: true, attacker: false, defender: false };
var ghostTwo = { name: "Blue Ghost", attackPower: 12, startPower: 12, hitPoints: 70, counterAttack: 5, alive: true, attacker: false, defender: false };
var ghostThree = { name: "Purple Ghost", attackPower: 4, startPower: 4, hitPoints: 120, counterAttack: 15, alive: true, attacker: false, defender: false };
var ghostFour = { name: "Yellow Ghost", attackPower: 6, startPower: 6, hitPoints: 200, counterAttack: 8, alive: true, attacker: false, defender: false };    
//Functional Objects
var attackGhost = {};
var defendGhost = {};
var appearGhost = {};
//States, Counters & Timers
var attackerAssigned = false;
var defendersKilled = 0;
var spookyTimer = 801;
//Opening Sequence
var openingDialogue = ["Welcome to our haunted forest.<br>", "The ghosts here are fighting for the right...<br>", "...to haunt YOU!<br>", "Choose a ghost to fight on your behalf...<br>", "...and then use your wits to take out his competition.", "As your ghost attacks, his power will grow! Good luck...", "<return;>"];
//Additional Assets
var setMood = new Audio("assets/audio/Forest_of_Fear.mp3");

//DECLARE GLOBAL FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function initializeGame() {
    //reset the variable values here to 'reset' the game.
    ghostOne = { name: "White Ghost", attackPower: 8, startPower: 8, hitPoints: 100, counterAttack: 10, alive: true, attacker: false, defender: false };
    ghostTwo = { name: "Blue Ghost", attackPower: 12, startPower: 12, hitPoints: 70, counterAttack: 5, alive: true, attacker: false, defender: false };
    ghostThree = { name: "Purple Ghost", attackPower: 4, startPower: 4, hitPoints: 120, counterAttack: 15, alive: true, attacker: false, defender: false };
    ghostFour = { name: "Yellow Ghost", attackPower: 6, startPower: 6, hitPoints: 200, counterAttack: 8, alive: true, attacker: false, defender: false };    ///REWORK THE LOGIC BASED ON THIS ALIVE STATE?

    attackGhost = {};
    defendGhost = {};
    appearGhost = {};

    attackerAssigned = false;
    defendersKilled = 0;
    spookyTimer = 801;

    newGameBtn.attr("style", "visibility: hidden;");
    ghostFightBtn.attr("style", "visibility: hidden;");
    ghostBtn.attr("style", "visibility: visible;");
    $(".ghost-body").attr("style", "visibility: hidden;");
    mainBannerText = $("#welcome_text");
};


function ghostFight(aG, dG) {                                 //aG - Sets the Attacking Ghost, dG - Sets the Defending Ghost.
    // console.log("Starting stats for attacker: AP, HP, CA ->  " + aG.attackPower + " " + aG.hitPoints + " " + aG.counterAttack);
    // console.log("Starting stats for defender: AP, HP, CA ->  " + dG.attackPower + " " + dG.hitPoints + " " + dG.counterAttack);
    dG.hitPoints = (dG.hitPoints - aG.attackPower);
    aG.hitPoints = (aG.hitPoints - dG.counterAttack);
    aG.attackPower = (aG.attackPower + aG.startPower);
    // console.log("End of round stats: AP, HP, CA ->  " + aG.attackPower + " " + aG.hitPoints + " " + aG.counterAttack);
    // console.log("End of round stats: AP, HP, CA ->  " + dG.attackPower + " " + dG.hitPoints + " " + dG.counterAttack);
};

function setSpookyTimer() {
    spookyTimer = (Math.floor(Math.random() * Math.floor(4200) + 800));
};
function assignAttackGhost() {
    if (currentClick === "g1") {
        attackGhost = ghostOne;
        $("#ghost1").attr("style", "visibility: visible;");
        $(".clsi1").attr("style", "visibility: hidden;");
    } else if (currentClick === "g2") {
        attackGhost = ghostTwo;
        $("#ghost2").attr("style", "visibility: visible;");
        $(".clsi2").attr("style", "visibility: hidden;");
    } else if (currentClick === "g3") {
        attackGhost = ghostThree;
        $("#ghost3").attr("style", "visibility: visible;");
        $(".clsi3").attr("style", "visibility: hidden;");
    } else if (currentClick === "g4") {
        attackGhost = ghostFour;
        $("#ghost4").attr("style", "visibility: visible;");
        $(".clsi4").attr("style", "visibility: hidden;");
    }
};
function assignDefendGhost() {
    if (currentClick === "g1") {
        defendGhost = ghostOne;
        $("#ghost1").attr("style", "visibility: visible;");
        $(".clsi1").attr("style", "visibility: hidden;");
    } else if (currentClick === "g2") {
        $("#ghost2").attr("style", "visibility: visible;");
        $(".clsi2").attr("style", "visibility: hidden;");
        defendGhost = ghostTwo;
    } else if (currentClick === "g3") {
        defendGhost = ghostThree;
        $("#ghost3").attr("style", "visibility: visible;");
        $(".clsi3").attr("style", "visibility: hidden;");
    } else if (currentClick === "g4") {
        defendGhost = ghostFour;
        $("#ghost4").attr("style", "visibility: visible;");
        $(".clsi4").attr("style", "visibility: hidden;");
    }
};
function assignAppearGhost() {
    if (currentClick === "g1") {
        appearGhostAttacker = ghostOne;
        $(".ghost1").attr("style", "visibility: visible;");
    } else if (currentClick === "g2") {
        appearGhostAttacker = ghostTwo;
        $(".ghost2").attr("style", "visibility: visible;");
    } else if (currentClick === "g3") {
        appearGhostAttacker = ghostThree;
        $(".ghost3").attr("style", "visibility: visible;");
    } else if (currentClick === "g4") {
        appearGhostAttacker = ghostFour;
        $(".ghost4").attr("style", "visibility: visible;");
    }
};
function hideIfDead() {
    if (ghostOne.alive === false) {
        $(".ghost_1").attr("style", "visibility: hidden;");
        $(".clsi1").attr("style", "visibility: hidden;");
    }
    if (ghostTwo.alive === false) {
        $(".ghost_2").attr("style", "visibility: hidden;");
        $(".clsi2").attr("style", "visibility: hidden;");
    }
    if (ghostThree.alive === false) {
        $(".ghost_3").attr("style", "visibility: hidden;");
        $(".clsi3").attr("style", "visibility: hidden;");
    }
    if (ghostFour.alive === false) {
        $(".ghost_4").attr("style", "visibility: hidden;");
        $(".clsi4").attr("style", "visibility: hidden;");
    }
};
function hideIfPicked() {
    if (ghostOne === attackGhost) {
        $(".clsi1").attr("style", "visibility: hidden;");
    }
    if (ghostTwo === attackGhost) {
        $(".clsi2").attr("style", "visibility: hidden;");
    }
    if (ghostThree === attackGhost) {
        $(".clsi3").attr("style", "visibility: hidden;");
    }
    if (ghostFour === attackGhost) {
        $(".clsi4").attr("style", "visibility: hidden;");
    }
};
function assignDeathStatus() {
    if (attackGhost.hitPoints <= 0) {
        attackGhost.alive = false;
        console.log("Attack Ghost has died");
    } else if (defendGhost.hitPoints <= 0) {
        defendGhost.alive = false;
        console.log("Defend Ghost has died");
    } else {
        console.log("Both still alive. Keep fighting.")
    }
};
function checkWin() {
    if ((attackGhost.alive === true) && (defendersKilled === 3)) {

        return true;
    }
}
function youLose() {
    if (attackGhost.alive === false) {
        // Do loss things.

        return true;
    }
};
function nextContender() {
    if (defendGhost.alive === true) {
        return;
    }
    else if ((defendGhost.alive === false) && (defendersKilled < 3)) {
        defendersKilled++;
        ghostFightBtn.attr("style", "visibility: hidden;");
        ghostBtn.attr("style", "visibility: visible;");
        attackerAssigned = true;
        hideIfDead();
        mainBannerText.html("You've defeated an enemy ghost. <br>Fight " + (3 - defendersKilled) + " more to emerge victorious.");

    }
};



//CREATE MAIN GAME



$(document).ready(function () {

    newGameBtn.attr("style", "visibility: hidden;");
    ghostFightBtn.attr("style", "visibility: hidden;");
    $(".ghost-holder").attr("style", "visibility: hidden;");
    mainBannerText.html("<h4>...hit any key to enter the forest...</h4>");


    ghostBtn.hover(
        function () {

            if (attackerAssigned === false) {

                currentClick = $(this).val();
                assignAppearGhost();
                console.log(appearGhostAttacker);
                mainBannerText.html("Choose an attacker: <br><h3>" + appearGhostAttacker.name + " has " + appearGhostAttacker.attackPower + " attack power, and " + appearGhostAttacker.hitPoints + " hit points.");
                // $(".ghost-holder").attr("style", "visibility: visible;</h3>");
                console.log(this);
            } else if (attackerAssigned === true) {
                currentClick = $(this).val();
                assignAppearGhost();
                console.log(appearGhostAttacker);
                mainBannerText.html("Choose a defender: <br><h3> " + appearGhostAttacker.name + " has " + appearGhostAttacker.hitPoints + " hit points, and " + appearGhostAttacker.counterAttack + " retaliation damage.</h3>");
                // $(".ghost-holder").attr("style", "visibility: visible;");

            }
        }, function () {
            $(".ghost1").attr("style", "visibility: hidden;");
            $(".ghost2").attr("style", "visibility: hidden;");
            $(".ghost3").attr("style", "visibility: hidden;");
            $(".ghost4").attr("style", "visibility: hidden;");
            mainBannerText.html("<return;>");
        }
    );

    ghostBtn.on("click", function () {
        if (attackerAssigned === false) {
            currentClick = $(this).val();
            assignAttackGhost();
            attackerAssigned = true;
        } else if (attackerAssigned === true) {
            currentClick = $(this).val();
            assignDefendGhost();
            ghostFightBtn.attr("style", "visibility: visible;");
            ghostBtn.attr("style", "visibility: hidden;");
        }

        console.log("Both have been assigned now:" + attackGhost + defendGhost)
    });

    ghostFightBtn.on("click", function () {                        //on the click of a ghost selector button
        if (checkWin() === true) {
            newGameBtn.attr("style", "visibility: visible;");
            ghostFightBtn.attr("style", "visibility: hidden;");
            mainBannerText.html("You win! Consider yourself successfully haunted.")
            return;
        }
        else if (youLose() === true) {
            newGameBtn.attr("style", "visibility: visible;");
            ghostFightBtn.attr("style", "visibility: hidden;");
            mainBannerText.html("You have lost the ghost battle. No new ghost friends will follow you home.")
            return;
        }
        else {
            ghostFight(attackGhost, defendGhost);
            mainBannerText.html("<h4>" + attackGhost.name + " hits for " + attackGhost.attackPower + " damage!<br>" + defendGhost.name + " counters for " + defendGhost.counterAttack + " damage!</h4>");
            attackerAssigned = true;
            setTimeout(function () {
                mainBannerText.html(" ")
            }, 2500);
            assignDeathStatus();
            nextContender();
            hideIfPicked();
            hideIfDead();
            assignDefendGhost();
            if (checkWin() === true) {
                newGameBtn.attr("style", "visibility: visible;");
                ghostFightBtn.attr("style", "visibility: hidden;");
                mainBannerText.html("You win! Consider yourself successfully haunted.")
                return;
            }
            else if (youLose() === true) {
                newGameBtn.attr("style", "visibility: visible;");
                ghostFightBtn.attr("style", "visibility: hidden;");
                mainBannerText.html("You have lost the ghost battle. No new ghost friends will follow you home.")
                return;
            }
        }
    });

    newGameBtn.on("click", function () {
        initializeGame();
    });






    document.onkeyup = function () {
        setMood.play();
        function staggeredExecution(i) {
            setTimeout(function () {
                mainBannerText.html(openingDialogue[i]);
                $(".btn").attr("style", "visibility: hidden;");
            }, i * 3000);
        }
        function similarTiming(j) {
            setTimeout(function () {
                $(".selectghostbtn").attr("style", "visibility: visible;");
            }, (openingDialogue.length - 1) * 3001);
        }

        for (var i = 0; i < openingDialogue.length; i++)
            staggeredExecution(i);

        for (var j = 0; j < openingDialogue.length; j++)
            similarTiming(j);
    }
});  // END OF MAIN SECTION


//FUTURE DEVELOPMENT NOTES:
////////////////////////////////////////////////////////////////////////////////////////////////////////

//      Apply fades, animation, hides and motion so things are less jarring?
//      Clean up the ghost images. Too square.
//      Finish tightening up breakable portions and lingering bugs.