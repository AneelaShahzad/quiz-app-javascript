let questions=[
    { qs:"1)What is the basic unit of life?",op1:"A) Atom",op2:"B) Cell",op3:"C) Tissue",op4:"D) Organ"},
    { qs:"2)Which organ is responsible for pumping blood throughout the body?",op1:"A) Brain",op2:"B) Kidney",op3:"C) Heart",op4:"D) Lungs"},
    { qs:"3)What part of the body controls all other systems?",op1:"A) Stomach",op2:"B) Brain",op3:"C) Liver",op4:"D) Skin"},
    { qs:"4)Which gas do humans need to breathe in to survive?",op1:"A) Carbon dioxide",op2:"B) Hydrogen",op3:"C) Oxygen",op4:"D) Nitrogen"},
    { qs:"5)How many bones are there in an adult human body (approx)?",op1:"A) 106",op2:"B) 126",op3:"C) 206",op4:"D) 306"},
];
// let answers=["Cell","Heart","Brain","Oxygen","206"];
let answersId=["option2","option3","option2","option3","option3"];

let startButton=document.querySelector("#startButton");
let starter=document.querySelector(".starter");
let questionContainer=document.querySelector(".question-container");
let resultCard=document.querySelector(".resultCard");
let reset=document.querySelector("#reset");
let marks=document.querySelector("#marks");
let timer=document.querySelector("#timer");
let username=document.querySelector("#username");
let nameBar=document.querySelector("#name");

let question=document.querySelector(".question");
let option1=document.querySelector("#option1");
let option2=document.querySelector("#option2");
let option3=document.querySelector("#option3");
let option4=document.querySelector("#option4");
let options=document.querySelectorAll(".options");

let score=0;
sessionStorage.setItem("marksss",score);
const clickSound=new Audio("click sound.mp3");


let matchAns=(choseOptId,qno)=>{
    console.log(choseOptId);
    console.log(answersId[qno]);
    if(choseOptId===answersId[qno])
    {
        console.log("correct");
        score++;
        sessionStorage.setItem("marksss", score);
    }
    else console.log("wrong");
}


let displayResult=()=>{

    questionContainer.style.visibility="hidden";
    resultCard.style.visibility="visible";
    marks.innerHTML=`${score}/5`;
    if(score===5){
        reset.innerText=`Excellent try!  ${username.value}`;
        reset.style.fontSize="1.1rem";
    }
    else reset.innerText="Try Again!";
}


let startQs=()=>{

    function func(i){

    let tt;
    let count=10;
    timer.innerText=count;

    let countdown = setInterval(() => {
            count--;
            timer.innerText = count;
            if (count === 0) {
                clearInterval(countdown); 
            }
    }, 1000);

    let choseOpt;
    return new Promise((resolve,reject)=>{

        question.innerText=questions[i].qs;
        option1.innerText=questions[i].op1;
        option2.innerText=questions[i].op2;
        option3.innerText=questions[i].op3;
        option4.innerText=questions[i].op4;

        hasAnswered=false;
    let qstimer=setTimeout(()=>{
        if(!hasAnswered){
                hasAnswered=true;
                resolve("success");
       }
        },10000)

        
    options.forEach((button)=>{
            button.onclick=()=>{
                if(hasAnswered) return;
                clickSound.play();
                hasAnswered=true;
                clearTimeout(qstimer);
                clearInterval(countdown);
                resolve("hogya");
                button.diabled=true;
                choseOpt=button.getAttribute("id");
                matchAns(choseOpt,i);}
        })
        });
    };
    

    (async function exec(){
        for(let c=0;c<questions.length;c++)
        {
         await func(c);
         console.log(score);
        }
        await displayResult();
    })();

}

startButton.addEventListener("click",()=>{
    starter.style.visibility="hidden";
    questionContainer.style.visibility="visible";
    
    startQs();
  
})

reset.onclick=()=>{
   console.log("resetting.....");
   starter.style.visibility="visible";
   questionContainer.style.visibility="hidden";
   resultCard.style.visibility="hidden";
   score=0;

}
username.addEventListener("keydown",function(e){
    if(e.key==="Enter"){
        nameBar.style.visibility="hidden";
        starter.style.visibility="visible";
    }
})