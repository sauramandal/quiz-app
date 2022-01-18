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
    const checkAnswer = (evt: React.MouseEvent<HTMLButtonElement>) => {}
    const nextQuestion = () => {}

    useEffect(() => {
      startTrivia()
    }, [])

    return (
        <div className="App">
            <h1>QUIZ</h1>
            <button className="start" onClick={startTrivia}>
                Start
            </button>
            <p className="score">Score:</p>
            <p>Loading Questions...</p>
            <QuestionCard
                questionNumber={number + 1}
                totalQuestions={TOTAL_QUESTIONS}
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
            />
            <button className="next" onClick={nextQuestion}></button>
        </div>
    )
}

export default App
