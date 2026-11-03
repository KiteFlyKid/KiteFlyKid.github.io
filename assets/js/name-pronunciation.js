const pronunciationButton = document.querySelector('.name-pronunciation');
const pronunciationAudio = document.getElementById('name-pronunciation-audio');
const pronunciationStatus = document.getElementById('name-pronunciation-status');

if (pronunciationButton && pronunciationAudio && pronunciationStatus) {
  pronunciationButton.addEventListener('click', async () => {
    pronunciationStatus.textContent = '';
    pronunciationAudio.currentTime = 0;
    try {
      await pronunciationAudio.play();
    } catch {
      pronunciationStatus.textContent = 'Unable to play the pronunciation. Please try again.';
    }
  });

  pronunciationAudio.addEventListener('playing', () => pronunciationButton.classList.add('is-playing'));
  ['ended', 'pause', 'error'].forEach((event) => {
    pronunciationAudio.addEventListener(event, () => pronunciationButton.classList.remove('is-playing'));
  });
}
