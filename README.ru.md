# Simple Quiz — полный разбор

## 1. Что требуется по заданию

Проект должен быть React + TypeScript-приложением для создания и запуска простого квиза.

1. Создать компонент `QuizForm`.
2. Дать пользователю поле для ввода вопроса.
3. Добавлять вопрос в массив, хранящийся в состоянии компонента.
4. Очищать поле после добавления.
5. Не разрешать запуск до тех пор, пока не добавлены минимум три вопроса.
6. По кнопке `Play` выбирать случайный вопрос.
7. Показывать текст выбранного вопроса и его уровень сложности.
8. Уровень сложности может быть `Easy`, `Medium` или `Hard`.

## 2. Запуск с нуля

В терминале перейдите в папку проекта:

```bash
cd front-end-sof004as3ae-3008-simple-quiz-pe010101
```

Установите зависимости:

```bash
npm install
```

Для Vite 8 нужен Node.js не ниже `20.19` (либо `22.12+`). Проверить версию:

```bash
node --version
```

Запустите режим разработки:

```bash
npm run dev
```

Откройте адрес, который напечатает Vite, обычно:

```text
http://localhost:5173
```

Проверки проекта:

```bash
npm run test
npm run lint
npm run build
```

После `npm run build` готовая браузерная версия находится в папке `dist`.

## 3. Структура решения

```text
src/
├── App.tsx             # страница приложения
├── QuizForm.tsx        # состояние, форма и игровой сценарий
├── App.css             # стили компонентов страницы
├── index.css           # глобальные стили
└── QuizForm.test.tsx   # два автоматических сценария
```

## 4. Полное содержимое исходников

### `src/App.tsx`

```tsx
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
```

`App` отвечает только за страницу и подключение `QuizForm`. Логику формы не смешиваем с разметкой оболочки, поэтому компонент проще объяснять и проверять.

### `src/QuizForm.tsx`

```tsx
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
```

### Почему здесь используются эти конструкции

- `useState` хранит текст поля, выбранный уровень, массив вопросов и текущий результат.
- Тип `Difficulty` ограничивает уровень тремя допустимыми строками.
- Тип `QuizQuestion` гарантирует, что у каждого вопроса есть `text` и `level`.
- `trim()` убирает пробелы по краям и не даёт добавить пустой вопрос.
- `event.preventDefault()` не перезагружает страницу при отправке формы.
- Функциональное обновление `setQuestions(previousQuestions => ...)` безопасно добавляет элемент к актуальному массиву состояния.
- Оператор `...previousQuestions` сохраняет уже добавленные вопросы.
- `Math.random()` возвращает случайное число, а `Math.floor()` превращает его в допустимый индекс массива.
- `canPlay` вычисляется из `questions.length`, поэтому кнопка автоматически блокируется или включается.
- Тернарный оператор в блоке результата реализует условный рендеринг: до первого запуска показывается подсказка, после запуска — выбранный вопрос.
- `aria-live="polite"` сообщает об изменении результата вспомогательным технологиям.

### `src/App.css`

```css
.quiz-page {
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 40px 20px;
}

.quiz-card {
  width: min(900px, 100%);
  padding: clamp(24px, 5vw, 56px);
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.14);
}

.quiz-header {
  margin-bottom: 34px;
  text-align: center;
}

.quiz-header h1 {
  margin: 4px 0 8px;
  color: #17233c;
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  line-height: 1;
}

.quiz-header p {
  margin: 0;
  color: #64748b;
}

.quiz-header .quiz-kicker {
  color: #6d28d9;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.quiz-form-wrapper {
  display: grid;
  gap: 22px;
}

.quiz-form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(150px, 0.35fr) auto;
  gap: 14px;
  align-items: end;
}

.field {
  display: grid;
  gap: 8px;
  color: #334155;
  font-size: 0.85rem;
  font-weight: 700;
}

.field input,
.field select {
  width: 100%;
  min-height: 54px;
  box-sizing: border-box;
  border: 1px solid #cbd5e1;
  border-radius: 14px;
  padding: 0 16px;
  color: #17233c;
  background: #fff;
  font: inherit;
  font-weight: 500;
  outline: none;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}

.field input:focus,
.field select:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.13);
}

.button {
  min-height: 54px;
  border: 0;
  border-radius: 14px;
  padding: 0 22px;
  font: inherit;
  font-weight: 800;
  cursor: pointer;
  transition: transform 150ms ease, box-shadow 150ms ease, opacity 150ms ease;
}

.button:not(:disabled):hover {
  transform: translateY(-2px);
}

.button:focus-visible {
  outline: 3px solid rgba(124, 58, 237, 0.32);
  outline-offset: 3px;
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.42;
}

.button-add {
  color: #fff;
  background: #17233c;
  box-shadow: 0 10px 25px rgba(23, 35, 60, 0.18);
}

.play-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 18px 20px;
  border-radius: 16px;
  background: #f5f3ff;
}

.question-counter {
  margin: 0;
  color: #5b6474;
}

.question-counter strong {
  color: #6d28d9;
}

.button-play {
  min-width: 130px;
  color: #fff;
  background: linear-gradient(135deg, #7c3aed, #4f46e5);
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.24);
}

.question-result {
  min-height: 145px;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 10px;
  padding: 28px;
  border: 1px dashed #c4b5fd;
  border-radius: 20px;
  text-align: center;
  background: linear-gradient(145deg, #fafaff, #f5f3ff);
}

.question-result h2 {
  margin: 0;
  color: #17233c;
  font-size: clamp(1.3rem, 4vw, 2rem);
}

.result-label,
.result-placeholder {
  margin: 0;
  color: #64748b;
}

.result-label {
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.difficulty-badge {
  display: inline-flex;
  border-radius: 999px;
  padding: 5px 12px;
  font-size: 0.8rem;
  font-weight: 800;
}

.difficulty-easy {
  color: #166534;
  background: #dcfce7;
}

.difficulty-medium {
  color: #92400e;
  background: #fef3c7;
}

.difficulty-hard {
  color: #991b1b;
  background: #fee2e2;
}

@media (max-width: 760px) {
  .quiz-page {
    padding: 16px;
  }

  .quiz-card {
    border-radius: 20px;
  }

  .quiz-form {
    grid-template-columns: 1fr;
  }

  .play-panel {
    align-items: stretch;
    flex-direction: column;
  }

  .button,
  .button-play {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .button,
  .field input,
  .field select {
    transition: none;
  }
}
```

### `src/index.css`

```css
:root {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  color: #17233c;
  background:
    radial-gradient(
      circle at 15% 15%,
      rgba(196, 181, 253, 0.75),
      transparent 34%
    ),
    radial-gradient(
      circle at 85% 80%,
      rgba(191, 219, 254, 0.72),
      transparent 34%
    ),
    #eef2ff;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html {
  min-width: 320px;
  min-height: 100%;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
}

button,
input,
select {
  font: inherit;
}

button {
  -webkit-tap-highlight-color: transparent;
}

#root {
  min-height: 100vh;
}
```

## 5. Как проверить вручную

1. При открытии приложения кнопка `Play` неактивна, счётчик показывает `0 / 3`.
2. Введите вопрос и выберите уровень.
3. Нажмите `Add Question`: поле должно очиститься, а счётчик увеличиться.
4. Добавьте ещё два вопроса. После третьего `Play` должен стать активным.
5. Нажмите `Play`: появятся текст одного из трёх вопросов и его уровень.
6. Повторите `Play` несколько раз — выбор может меняться, потому что используется случайный индекс.
7. Проверьте мобильную ширину окна: форма должна перейти в одну колонку.

Автоматически эти основные сценарии проверяются командами `npm run test` и `npm run build`.
