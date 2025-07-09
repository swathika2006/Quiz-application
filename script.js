// Selecting necessary DOM elements for quiz interactions
const startBtn=document.querySelector('.start-btn');
const popupInfo=document.querySelector('.popup-info');
const exitBtn=document.querySelector('.exit-btn');
const main=document.querySelector('.main');
const continueBtn=document.querySelector('.continue-btn');
const quizSection=document.querySelector('.quiz-section');
const quizBox=document.querySelector('.quiz-box');
const resultBox=document.querySelector('.result-box');
const tryAgainBtn=document.querySelector('.tryAgain-btn');
const goHomeBtn=document.querySelector('.goHome-btn');

// When start button is clicked, show popup info and dim the main content
startBtn.onclick=()=>{
    popupInfo.classList.add('active');
    main.classList.add('active');
}

// Close popup and return to main screen on exit button click
exitBtn.onclick=()=>{
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

// Continue button starts the quiz
continueBtn.onclick=()=>{
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0); // Show first question
    questionCounter(1); // Set question count display
}

// When "Try Again" is clicked, restart quiz from beginning
tryAgainBtn.onclick=()=>{
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount=0;
    questionNumb=1;
    userScore=0;    
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore(); // Reset score display
}

// Go Home resets quiz state and returns to home screen
goHomeBtn.onclick=()=>{
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount=0;
    questionNumb=1;
    userScore=0;    
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore(); // Reset score display
}

// Initialize quiz variables
let questionCount=0;
let questionNumb=1;
let userScore=0; 
headerScore(); // Show initial score

// Next button shows next question or results
const nextBtn=document.querySelector('.next-btn');
nextBtn.onclick =() =>{
    if(questionCount < questions.length - 1)
    {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    }
    else{
        showResultBox(); // Show result if all questions answered
    }
}

// Show question and options based on index
const optionList=document.querySelector('.option-list');
function showQuestions(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent=`${questions[index].numb}. ${questions[index].question}`;

    // Load all 4 options for the question
    let optionTag =`<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    // Add click event to each option
    const option=document.querySelectorAll('.option');
    for(let i=0;i<option.length;i++){
        option[i].setAttribute('onclick','optionSelected(this)');
    }
}

// Handle user's selected option
function optionSelected(answer)
{
    let userAnswer =answer.textContent;
    let correctAnswer=questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if(userAnswer ==correctAnswer)
    {
        answer.classList.add('correct');
        userScore+=1; // Increase score if correct
        headerScore();
    }
    else{
        answer.classList.add('incorrect');

        // Highlight the correct answer if user was wrong
        for(let i=0;i<allOptions;i++)
        {
            if(optionList.children[i].textContent==correctAnswer){
                optionList.children[i].setAttribute('class','option correct');
            }
        }
    }

    // Disable all options after selection
    for(let i=0;i<allOptions;i++)
    {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active'); // Enable Next button
}

// Update question number display (e.g., "2 of 5 Questions")
function questionCounter(index){
    const questionTotal=document.querySelector('.question-total');
    questionTotal.textContent=`${index} of ${questions.length} Questions`;
}

// Update score shown in the header
function headerScore()
{
    const headerScoreText=document.querySelector('.header-score');
    headerScoreText.textContent=`Score: ${userScore} / ${questions.length}`;
}

// Display result screen with circular progress animation
function showResultBox()
{
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText=document.querySelector('.score-text');
    scoreText.textContent=`Your Score ${userScore} out of ${questions.length}`;

    const circularProgress=document.querySelector('.circular-progress');
    const progressValue=document.querySelector('.progress-value');

    let progressStartValue=-1;
    let progressEndValue= (userScore / questions.length) * 100;
    let speed=20;

    // Animate circular progress bar
    let progress=setInterval(()=>{
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;

        circularProgress.style.background=`conic-gradient(#0ff ${progressStartValue * 3.6}deg, rgba(255,255,255,.1) 0deg)`;

        if(progressStartValue == progressEndValue)
        {
            clearInterval(progress);
        }
    },speed);
}
