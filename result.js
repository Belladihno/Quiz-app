const score = localStorage.getItem('quizScore')
const totalQuestions = localStorage.getItem('totalQuestions')

document.querySelector('.scoreX').innerText = score
document.querySelector('.testLenght').innerText = totalQuestions

const retakeButton = document.querySelector('.retake')

retakeButton.addEventListener('click', ()=> {
    localStorage.removeItem('quizScore')
    localStorage.removeItem('totalQuestions')
    window.location.href = 'index.html'
})