type Props = {
    question: string
    answers: string[]
    callback: any
    userAnswer: any
    questionNumber: number
    totalQuestions: number
}
const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNumber,
    totalQuestions,
}) => (
    <div className="">
        <p className="number">
            Question: {questionNumber} / {totalQuestions}
        </p>
        <div className="">{question}</div>
        <div className="">
            {answers.map((answer) => (
                <div className="">
                    <button disabled={userAnswer} onClick={callback}>
                        <span>{answer}</span>
                    </button>
                </div>
            ))}
        </div>
    </div>
)

export default QuestionCard
