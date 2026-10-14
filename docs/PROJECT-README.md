[Suomenkielinen tehtävänanto (README.fi.md)](../README.fi.md)

[Подробный разбор и запуск на русском (README.ru.md)](../README.ru.md)

# Simple Quiz (Total 3 points)
Build a simple React + TypeScript application that allows a user to type in quiz questions and play a random question. 

Create a new React component `QuizForm`. In that component implement the following simple quiz: 

### Step 1. Collect questions (1 point)
- Allow the user to type a question.
- On clicking "Add Question", the question should be added to an array in state.
- Clear the form after submission.

### Step 2. Play Random Question (2 points)
- A Play button should be disabled until there are at least 3 questions in the state.
- On clicking the button, show one random question (text + level) from the array state.

### Example Views

The initial view of the application. The Play button is disabled because fewer than three questions have been entered. The user can input a question.

<img src="./src/assets/quiz.png" alt="initial view" width="60%" />

The user has entered at least three questions. The Play button is now enabled. After clicking it, a randomly selected question is displayed.

<img src="./src/assets/quiz_play.png" alt="initial view" width="55%" />


  
