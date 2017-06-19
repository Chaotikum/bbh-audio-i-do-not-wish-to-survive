document.body.addEventListener('touchmove', ev => ev.preventDefault())

const elements = {
  audio: document.querySelector('audio'),
  button: document.querySelector('button'),
  progress: document.querySelector('progress'),
};

let state = {
  playing: false,
  position: 0,
};

function reset() {
  elements.audio.pause();

  state.isPlaying = false;
  state.position = 0;

  render();
}

function render() {
  elements.progress.value = state.position * 100;

  if (state.isPlaying) {
    elements.progress.classList.add('is-playing');
    elements.button.textContent = 'Stop';
  } else {
    elements.progress.classList.remove('is-playing');
    elements.button.textContent = 'Start';
  }
}

function onTimeupdate(event) {
  state.position = event.srcElement.currentTime / event.srcElement.duration;
  render();
}

function onClickPlayButton(event) {
  if (state.isPlaying) {
    elements.audio.pause();
  } else {
    elements.audio.currentTime = 0;
    elements.audio.play();
  }
  state.isPlaying = !state.isPlaying;
  render();
}

function onClickProgress(event) {
  if (!state.isPlaying) return;

  state.position = event.clientX / document.body.clientWidth;
  elements.audio.currentTime = elements.audio.duration * state.position;

  render();
}

function init() {
  render();

  elements.audio.addEventListener('timeupdate', onTimeupdate);
  elements.audio.addEventListener('ended', reset);
  elements.button.addEventListener('click', onClickPlayButton);
  elements.progress.addEventListener('click', onClickProgress);
}

init();
