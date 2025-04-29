let gameSeq=[];
let userSeq=[];

let scores=[0];
let max=scores[0];

let started=false;
let level=0;

let h3=document.querySelector("h3");

let btns=['red', 'yellow', 'purple', 'green'];

document.addEventListener("keypress", function(){
    h3.classList.remove("gameover");
    if(started==false){
        console.log("Game has started!");
        started=true;

        setTimeout(levelUp,1000);
    }
});

function btnFlash(btn){
    btn.classList.add("flash");

    setTimeout(function(){
        btn.classList.remove("flash");
    }, 200);
}

function userFlash(userbtn){
    userbtn.classList.add("userFlash");

    setTimeout(function(){
        userbtn.classList.remove("userFlash");
    }, 200);
}


function levelUp(){
    userSeq=[];
    level++;
    h3.innerText= `Level ${level}`;

    let randIndx= Math.floor(Math.random() * 4);
    let randBtnClass=btns[randIndx];
    let randBtn=document.querySelector(`.${randBtnClass}`)

    gameSeq.push(randBtnClass);
    console.log(gameSeq);
    
    btnFlash(randBtn);
}

function printHighestScore(highestScore){
    for(i of highestScore){
        if( i>max){
            max=i;
        }
    }
    return max;
}

function checkAns(idx){
    if(gameSeq[idx]==userSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,700);
        }
    } 
    else{
        scores.push(level);
        h3.innerText=`GAME OVER! Your score was ${level}
        Press any key to start the game! Highest Score has been ${printHighestScore(scores)}`;
        h3.classList.add("gameover");
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}


function btnpressed(){
    let userBtnColor=this.classList[1];
    userSeq.push(userBtnColor);
    console.log(userSeq);
    let btn= this;
    userFlash(btn);

    checkAns(userSeq.length-1);
}

let allBtns= document.querySelectorAll(".btn");

for( b of allBtns){
    b.addEventListener("click",btnpressed);
}

function reset(){
    started=false;
    level=0;
    gameSeq=[];
    userSeq=[]; 
}
