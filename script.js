const fetchQuestions = async () => {
  try {
    const response = await fetch(
      'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'
    );
    const data = await response.json();
    console.log(data.results);
    return data.results;
  } catch (error) {
    console.log('Error fetching data from quiz qurstions', error);
  }
};

let apiQuestions = [];

(async () => {
  try {
    apiQuestions = await fetchQuestions();
    fetchedQuestion(apiQuestions);
  } catch (error) {
    console.log('Error fetching apiQuestions', error);
  }
})();

let currentIndex = 0;
let selectedAnswer = [];
let selectedOption = null;
let totalScore = 0;

const nextButton = document.querySelector('.nav-next');
const previousButton = document.querySelector('.nav-prev');
const Category = document.getElementById('category');
const questionTitle = document.querySelector('h2');
const matrixX = document.querySelector('.matrix-X');
const matrixY = document.querySelector('.matrix-Y');
const options = document.querySelectorAll('.option');
const buttonsDiv = document.querySelector('.prev-next');
const submitButton = document.createElement('button');

submitButton.id = 'submit';
submitButton.innerText = 'Submit';
submitButton.style.display = 'none';
buttonsDiv.appendChild(submitButton);

const fetchedQuestion = (apiQuestions) => {
  const currentQuestion = apiQuestions[currentIndex];
  Category.innerHTML = currentQuestion?.category;
  questionTitle.innerHTML = currentQuestion?.question;
  const totalAnswers = [
    ...currentQuestion?.incorrect_answers,
    currentQuestion?.correct_answer,
  ];
  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  const shuffledAnswers = shuffle(totalAnswers);
  shuffledAnswers.forEach((answer, index) => {
    options[index].innerHTML = answer;
  });

  options.forEach((option) => {
    option.style.backgroundColor = '';
    option.style.color = '';
  });

  if (selectedAnswer[currentIndex]) {
    options.forEach((option) => {
      if (option.innerHTML === selectedAnswer[currentIndex]) {
        option.style.backgroundColor = 'blue';
        option.style.color = 'white';
      }
    });
  }

  options.forEach((option) => {
    option.addEventListener('click', (e) => {
      options.forEach((option) => {
        (option.style.backgroundColor = ''), (option.style.color = '');
      });
      selectedOption = e.target;
      option.style.backgroundColor = 'blue';
      option.style.color = 'white';
      selectedAnswer[currentIndex] = selectedOption.innerHTML;
    });
  });
  const questionLenght = apiQuestions.length;
  matrixY.innerHTML = questionLenght;
};

previousButton.style.display = 'none';
previousButton.addEventListener('click', () => {
  if (previousButton) {
    currentIndex--;
    const xIndex = currentIndex + 1;
    matrixX.innerHTML = xIndex;
    fetchedQuestion(apiQuestions);
  }
  if (currentIndex === 0) {
    previousButton.style.display = 'none';
  }
  if (currentIndex < apiQuestions.length) {
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
});
const currentQuestionIndex = currentIndex + 1;
matrixX.innerHTML = currentQuestionIndex;

nextButton.addEventListener('click', () => {
  if (selectedAnswer[currentIndex] !== undefined) {
    if (currentIndex < apiQuestions.length) {
      currentIndex++;
      fetchedQuestion(apiQuestions);
      const currentQuestionIndex = currentIndex + 1;
      matrixX.innerHTML = currentQuestionIndex;
    }
    if (currentIndex > 0) {
      previousButton.style.display = 'inline-block';
    }
    if (currentIndex === apiQuestions.length - 1) {
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
  } else {
    alert('Please select an option before proceeding.');
  }
});

submitButton.addEventListener('click', () => {
  if(selectedAnswer[currentIndex] !== undefined){

    totalScore = 0;
    apiQuestions.forEach((question, index) => {
      if (selectedAnswer[index] === question.correct_answer) {
        totalScore++;
      }
    });
    localStorage.setItem('quizScore', totalScore);
    localStorage.setItem('totalQuestions', apiQuestions.length);
    window.location.href = 'result.html';
  }
  else {
    alert('Please answer all questions before submitting.');
  }
});


