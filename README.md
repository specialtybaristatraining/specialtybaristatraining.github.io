# Specialty Barista Training — Local Verification

This README contains quick steps to verify the recent refactor (lesson manager extraction) and to run a local sanity check.

What changed
- `static/js/lesson.js` — extracted lesson rendering logic (attached to `window.BaristaApp.lessonManager`).
- `index.html` — now loads `static/js/lesson.js` before `</body>`.

Quick local check (PowerShell)
1. Serve the folder locally (Python 3):

```powershell
# from inside c:\Users\rtabo\Desktop\norsang
python -m http.server 8000
# then open http://localhost:8000 in a browser
```

Or with Node (if you have `serve` installed):

```powershell
npx serve -l 8000
# open http://localhost:8000
```

2. Open browser DevTools (Console) and navigate to a lesson (click a day):
- Ensure no console errors referencing `lesson.js` or missing symbols.
- Try switching tabs (Theory / Practical / Notes / Quiz) and perform one interactive exercise (e.g., a practical interaction or order sim on a day that has it).

3. Verify `BaristaApp.lessonManager` is present in console:

```javascript
// in console
typeof BaristaApp.lessonManager
// expected: 'object' or 'function'
BaristaApp.lessonManager.openPage(1); // should open day 1 lesson
```

Commit suggestion
- Commit message: `Refactor: extract lessonManager into static/js/lesson.js; add verification README`

If you'd like, I can prepare a patch/commit message text or create a branch+/PR-ready patch for you to apply. If you want me to create more modular files (quizManager, dataManager) I can prepare those next.
