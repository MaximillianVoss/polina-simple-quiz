import QuizForm from './QuizForm'
import './App.css'

function App() {
  return (
    <main className="quiz-page">
      <section className="quiz-card" aria-labelledby="quiz-title">
        <header className="quiz-header">
          <p className="quiz-kicker">Create · Save · Play</p>
          <h1 id="quiz-title">Quiz</h1>
          <p>Add at least three questions and play one at random.</p>
        </header>

        <QuizForm />
      </section>
    </main>
  )
}

export default App
