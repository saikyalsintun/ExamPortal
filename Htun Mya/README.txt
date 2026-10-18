# Chinese Vocabulary Practice Exam

This is a single combined final exam using the vocabulary provided for the taught chapters. The student-facing interface does not display chapter numbers or separate chapter tests.

## Exam format
- Exactly 100 questions, 100 marks total; 1 mark per question.
- Part 1: 25 vocabulary meaning multiple-choice questions (meanings shown in Myanmar).
- Part 2: 25 Burmese-to-Pinyin sentence translation questions using word tiles.
- Part 3: 25 reading-related sentence arrangement questions using word tiles.
- Part 4: 25 fill-in-the-blank multiple-choice questions.
- The design follows the sample website: dark charcoal header, gold accents, timer, setup screen, section tabs, progress bar, one question at a time, navigation, unanswered finder, submit confirmation, results report, answer review and print/save as PDF.
- Students do not need to type answers. Tile questions support drag-and-drop and tapping.
- Timer options: 45, 60 or 90 minutes.
- Question order can remain section-ordered or shuffle within each section.

## Files
- `index.html` — website structure
- `style.css` — visual design
- `app.js` — exam logic, timer, navigation and scoring
- `data/vocabulary.json` — supplied vocabulary list
- `data/testbank.json` — translation, reading and blank question banks

## Run locally
Keep the folder structure intact. If your browser blocks JSON loading when opening the HTML file directly, run a local server from this folder:
`python -m http.server 8000`
Then visit `http://localhost:8000`.
