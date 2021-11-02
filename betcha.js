let Total=100
let jetonR1=""
let jetonR2=""
let placelot1=""
let placelot2=""
const resultat = []
const emplacement = [".",".",".",".",".",".",".",".",".",".",".","."]
let lot = 5
emplacement[5]= "L"

let tours = 1 ;

function getFirstNumber() {
    var firstNumber = document.getElementById("first").value;
    return firstNumber;
  }

function getTwiceNumber() {
    var twiceNumber = document.getElementById("twice").value;
    return twiceNumber;
  }



function compareJeton(jetonR1,jetonR2)
{
    jetonR1 = getFirstNumber()
    jetonR2 = getTwiceNumber()
    for(let i = 0;i<11;1++){
        console.log("Saisir le nombre de jetons:");
        if(jetonR1<jetonR2)
        {
            console.log("Le Lot + 1 pour :" + jetonR2);
            placelot2 = placelot2 + 1
            lot=emplacement[i-1]
            if(lot= emplacement[0])
            {
                console.log("le gagnant est jouer 2:" + nom);
            }
        }else if(jetonR1>jetonR2)
        {
            console.log("Le Lot + 1 pour :" + jetonR1);
            placelot1 = placelot1 + 1 
            lot=emplacement[i+1]
            if(lot =emplacement[11])
            {
                console.log("le gagnant est jouer 1:" + nom);
            }
        }else
        {
            console.log("partir null");
        }
        tours = tours + 1;
        console.log("tours" + tours +":");
    }
   
}




