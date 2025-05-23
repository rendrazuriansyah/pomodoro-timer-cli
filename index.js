const notifier = require('node-notifier');
const moment = require('moment');
const readline = require('readline');
const chalk = require('chalk');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askInput(promptText, validateFn) {
  return new Promise((resolve) => {
    rl.question(promptText, (answer) => {
      const parsed = parseFloat(answer);
      if (validateFn(parsed)) {
        resolve(parsed);
      } else {
        console.log(chalk.red('❌ Invalid input. Please try again.'));
        resolve(askInput(promptText, validateFn));
      }
    });
  });
}

function startTimer(durationSeconds, mode, onComplete) {
  let remainingSeconds = durationSeconds;
  const totalSeconds = durationSeconds;
  let timer = null;
  let paused = false;

  const modeLabels = {
    work: {
      title: 'Work',
      emoji: '💪',
      doneMsg: '✅ Done! Time to take a short break. 😌',
    },
    break: {
      title: 'Break',
      emoji: '☕',
      doneMsg: '🔁 Break finished! Ready to focus again? 💼',
    },
    longBreak: {
      title: 'Long Break',
      emoji: '🛌',
      doneMsg: '🎉 Long break over! Let’s get energized! 🚀',
    },
  };
  const label = modeLabels[mode] || { title: mode, emoji: '', doneMsg: '' };

  console.log(
    chalk.green.bold(
      `\n⏳ ${label.title} started! ${label.emoji} (${moment
        .utc(durationSeconds * 1000)
        .format('mm:ss')})`
    )
  );
  console.log(chalk.gray('Press [p]ause, [r]esume, [s]kip, [q]uit'));

  function printProgressBar() {
    const percent = (totalSeconds - remainingSeconds) / totalSeconds;
    const barLength = 30;
    const filledLength = Math.round(barLength * percent);
    const bar = '■'.repeat(filledLength) + '-'.repeat(barLength - filledLength);

    const barColor =
      percent >= 0.8 ? chalk.green : percent >= 0.4 ? chalk.yellow : chalk.red;
    const progressBar = barColor(`[${bar}]`);
    const timeLabel = chalk.cyan.bold(
      moment.utc(remainingSeconds * 1000).format('mm:ss')
    );
    const percentLabel = chalk.gray(`${Math.round(percent * 100)}%`);
    const modeLabel = chalk.yellow.bold(label.title);

    process.stdout.write(
      `\r⏰ ${modeLabel} ${timeLabel} ${progressBar} ${percentLabel} `
    );
  }

  function tick() {
    if (remainingSeconds <= 0) {
      clearInterval(timer);
      printProgressBar();
      console.log('\n' + chalk.magenta.bold(label.doneMsg));
      notifier.notify({
        title: mode === 'work' ? 'Pomodoro Finished! ✅' : 'Break Finished! 🔔',
        message:
          mode === 'work'
            ? 'Take a short break, buddy ☕🧘'
            : 'Time to get back to work, let’s go! 💼',
        icon: path.join(__dirname, 'icon.png'),
        sound: true,
        wait: false,
      });

      rl.input.removeListener('keypress', onKeyPress);
      onComplete();
      return;
    }

    printProgressBar();
    remainingSeconds--;
  }

  function onKeyPress(_, key) {
    if (!key) return;
    const k = key.name;

    if (k === 'p' && !paused) {
      paused = true;
      clearInterval(timer);
      console.log(chalk.red('\n⏸️ Timer paused. Press [r] to resume.'));
    } else if (k === 'r' && paused) {
      paused = false;
      console.log(chalk.green('▶️ Timer resumed.'));
      timer = setInterval(tick, 1000);
    } else if (k === 's') {
      clearInterval(timer);
      console.log(chalk.yellow('\n⏭️ Timer skipped.'));
      rl.input.removeListener('keypress', onKeyPress);
      onComplete();
    } else if (k === 'q') {
      clearInterval(timer);
      console.log(chalk.red('\n❌ Timer stopped by user.'));
      rl.input.removeListener('keypress', onKeyPress);
      rl.close();
      process.exit(0);
    }
  }

  rl.input.on('keypress', onKeyPress);
  timer = setInterval(tick, 1000);
}

async function runPomodoroLoop() {
  const work = await askInput(
    'Work duration (minutes): ',
    (v) => !isNaN(v) && v > 0 && v < 180
  );
  const shortBreak = await askInput(
    'Short break duration (minutes): ',
    (v) => !isNaN(v) && v > 0 && v < 60
  );
  const longBreak = await askInput(
    'Long break duration (minutes): ',
    (v) => !isNaN(v) && v > 0 && v < 120
  );

  const sessions = [
    { mode: 'work', duration: work * 60 },
    { mode: 'break', duration: shortBreak * 60 },
    { mode: 'work', duration: work * 60 },
    { mode: 'break', duration: shortBreak * 60 },
    { mode: 'work', duration: work * 60 },
    { mode: 'break', duration: shortBreak * 60 },
    { mode: 'work', duration: work * 60 },
    { mode: 'longBreak', duration: longBreak * 60 },
  ];

  let current = 0;

  function runNextSession() {
    const s = sessions[current];
    startTimer(s.duration, s.mode, () => {
      current++;
      if (current < sessions.length) {
        runNextSession();
      } else {
        console.log(
          chalk.green.bold(
            '\n🌀 All Pomodoro sessions completed. 🚀 Restarting in 5 seconds...'
          )
        );
        setTimeout(() => {
          current = 0;
          runNextSession();
        }, 5000);
      }
    });
  }

  runNextSession();
}

runPomodoroLoop();
