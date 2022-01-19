import { useState, useEffect } from "react"
import QuestionCard from "./components/QuestionCard"
import { fetchQuizQuestions, QuestionState, Difficulty } from "./API/API"
import "./App.css"

const TOTAL_QUESTIONS = 10
type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const App = () => {
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState<QuestionState[]>([])
    const [number, setNumber] = useState(0)
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(true)

    const startTrivia = async () => {
      setLoading(true)
      setGameOver(false)
      const questions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
      setQuestions(questions)
      setScore(0)
      setUserAnswers([])
      setNumber(0)
      setLoading(false)
    }
    const checkAnswer = (evt: React.MouseEvent<HTMLButtonElement>) => {
      if(!gameOver) {
        const userAnswer = evt.currentTarget.value
        const isCorrect = questions[number].correct_answer === userAnswer
        if(isCorrect) setScore(prev => prev + 1)
        const answerObject = {
          question: questions[number].question,
          answer: userAnswer,
          correct: isCorrect,
          correctAnswer: questions[number].correct_answer
        }
        setUserAnswers(prevAnswers => [...prevAnswers, answerObject])
      }
    }
    const nextQuestion = () => {
      const nextQ = number + 1
      if(nextQ === TOTAL_QUESTIONS) {
        setGameOver(true)
      } else {
        setNumber(nextQ)
      }
    }

    useEffect(() => {
      startTrivia()
    }, [])

    return (
        <div className="App">
            <h1>QUIZ</h1>
            {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
        </div>
    )
}

export default App
