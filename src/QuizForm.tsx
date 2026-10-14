import { useState, type FormEvent } from 'react'

type Difficulty = 'Easy' | 'Medium' | 'Hard'

type QuizQuestion = {
  text: string
  level: Difficulty
}

const difficultyLevels: Difficulty[] = ['Easy', 'Medium', 'Hard']

function QuizForm() {
  const [questionText, setQuestionText] = useState('')
  const [level, setLevel] = useState<Difficulty>('Easy')
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] =
    useState<QuizQuestion | null>(null)

  const trimmedQuestion = questionText.trim()
  const canPlay = questions.length >= 3

  const addQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!trimmedQuestion) {
      return
    }

    setQuestions((previousQuestions) => [
      ...previousQuestions,
      { text: trimmedQuestion, level },
    ])
    setQuestionText('')
    setLevel('Easy')
  }

  const playRandomQuestion = () => {
    if (!canPlay) {
      return
    }

    const randomIndex = Math.floor(Math.random() * questions.length)
    setCurrentQuestion(questions[randomIndex])
  }

  return (
    <div className="quiz-form-wrapper">
      <form className="quiz-form" onSubmit={addQuestion}>
        <label className="field question-field">
          <span>Question</span>
          <input
            type="text"
            value={questionText}
            onChange={(event) => setQuestionText(event.target.value)}
            placeholder="Enter a question..."
            autoComplete="off"
          />
        </label>

        <label className="field level-field">
          <span>Difficulty</span>
          <select
            value={level}
            onChange={(event) => setLevel(event.target.value as Difficulty)}
          >
            {difficultyLevels.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </label>

        <button
          className="button button-add"
          type="submit"
          disabled={!trimmedQuestion}
        >
          Add Question
        </button>
      </form>

      <div className="play-panel">
        <p className="question-counter">
          Questions added: <strong>{questions.length}</strong> / 3 minimum
        </p>
        <button
          className="button button-play"
          type="button"
          disabled={!canPlay}
          onClick={playRandomQuestion}
        >
          Play
        </button>
      </div>

      <section className="question-result" aria-live="polite">
        {currentQuestion ? (
          <>
            <p className="result-label">Your random question</p>
            <h2>{currentQuestion.text}</h2>
            <span
              className={`difficulty-badge difficulty-${currentQuestion.level.toLowerCase()}`}
            >
              {currentQuestion.level}
            </span>
          </>
        ) : (
          <p className="result-placeholder">
            Add three questions, then press Play.
          </p>
        )}
      </section>
    </div>
  )
}

export default QuizForm
