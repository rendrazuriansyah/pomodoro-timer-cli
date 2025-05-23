# 🍅 Pomodoro CLI: Focus Without Distraction

[![Node.js](https://img.shields.io/badge/Node.js-14%2B-brightgreen)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Last Commit](https://img.shields.io/github/last-commit/rendrazuriansyah/pomodoro-timer-cli)](https://github.com/rendrazuriansyah/pomodoro-timer-cli/commits/main)
[![GitHub stars](https://img.shields.io/github/stars/rendrazuriansyah/pomodoro-timer-cli?style=social)](https://github.com/rendrazuriansyah/pomodoro-timer-cli/stargazers)

> Boost your productivity by focusing on your tasks with the Pomodoro Technique, right from your terminal. This lightweight, interactive CLI tool provides desktop notifications to keep you on track.

## ✨ Features

- **Customizable Durations:** Set work, short, and long break times.
- **Visual Progress:** Dynamic progress bar with color-coded feedback.
- **Intuitive Controls:** Pause `P`, resume `R`, skip `S`, or quit `Q` sessions with simple keypresses.
- **Cross-Platform Notifications:** Desktop alerts for session starts/ends.
- **Automated Cycle:** Auto-progresses through Pomodoro cycles (4 work, 3 short, 1 long break) and prompts to restart.
- **Enhanced Output:** Uses `chalk` for colored, bold terminal text.
- **Lightweight:** Minimal dependencies, clean code.

## ⚙️ How to Use

### Installation & Run

1.  **Clone:**
    ```bash
    git clone https://github.com/rendrazuriansyah/pomodoro-timer-cli.git
    cd pomodoro-timer-cli
    ```
2.  **Install:**
    ```bash
    npm install
    ```
3.  **Run:**
    ```bash
    node index.js
    # Or:
    npm start
    ```

### Usage

Enter desired durations (minutes) when prompted for Work, Short break, and Long break.

**Example:**

```bash
*Terminal appearance may vary

> node index.js
Work duration (minutes): 25
Short break duration (minutes): 5
Long break duration (minutes): 15

⏳ Work started! 💪 (25:00)
Press [p]ause, [r]esume, [s]kip, [q]uit
⏰ Work 24:59 [■■------------------------------] 4%
```

## 🛠️ Built With

- **Node.js**: Runtime.
- [`chalk`](<https://www.google.com/search?q=%5Bhttps://www.npmjs.com/package/chalk%5D(https://www.npmjs.com/package/chalk)>): Terminal styling.
- [`moment`](<https://www.google.com/search?q=%5Bhttps://www.npmjs.com/package/moment%5D(https://www.npmjs.com/package/moment)>): Time formatting.
- [`node-notifier`](<https://www.google.com/search?q=%5Bhttps://www.npmjs.com/package/node-notifier%5D(https://www.npmjs.com/package/node-notifier)>): Desktop notifications.
- `readline`: Interactive input.
- `path`: File path handling.

## 🤝 Contributing

**Welcome\!**

- Open an **Issue** for bugs/features.
- Submit a **Pull Request** for fixes/features.
- Improve docs or code.

Ensure tests are updated and code style is consistent.

## 📄 License

This project is under the **MIT License**. See [LICENSE](https://www.google.com/search?q=LICENSE) for details.
