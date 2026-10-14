# Yksinkertainen tietovisa

Rakenna yksinkertainen React + TypeScript -sovellus, jossa käyttäjä voi kirjoittaa tietovisakysymyksiä ja pelata satunnaisella kysymyksellä.

Luo uusi React-komponentti nimeltä `QuizForm`. Toteuta siihen seuraava yksinkertainen tietovisa:

### Vaihe 1. Kerää kysymykset
- Käyttäjä voi kirjoittaa kysymyksen ja valita sen vaikeustaso: "Easy", "Medium" tai "Hard".
- Kun käyttäjä painaa "Play"-painiketta, kysymys ja sen vaikeustaso lisätään state:en tallennettuun taulukkoon.
- Tyhjennä lomake kysymyksen lisäyksen jälkeen.

### Vaihe 2. Pelaa satunnainen kysymys
- "Play"-painike tulee olla pois käytöstä (disabled), kunnes käyttäjä on luonut vähintään kolme kysymystä.
- Kun painiketta painetaan, näytä yksi satunnainen kysymys (teksti + taso).

### Esimerkinäkymät
Sovelluksen alkuperäinen näkymä. "Play"-painike ei ole käytettävissä, koska kysymyksiä on syötetty alle kolme. Käyttäjä voi kirjoittaa kysymyksen ja valita sen vaikeustason.

<img src="./src/assets/quiz.png" alt="initial view" width="60%" />

Käyttäjä on tallentanut vähintään kolme kysymystä. "Play"-painike on nyt aktiivisena. Kun sitä klikataan, näytetään satunnainen kysymys käyttäjän tallentamista kysymyksistä.

<img src="./src/assets/quiz_play.png" alt="initial view" width="55%" />

