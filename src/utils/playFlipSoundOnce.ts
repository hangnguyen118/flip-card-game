let muted = false;
function toggleMute() {
  muted = !muted;
}

type SoundName = "flip" | "match" | "win";
const sounds: Record<SoundName, HTMLAudioElement> = {
  flip: new Audio("/sounds/flipped.mp3"),
  match: new Audio("/sounds/match.mp3"),
  win: new Audio("sounds/win.mp3"),
};

function playFlipSoundOnce(name: SoundName) {
  if (muted) return;
  const sound = sounds[name];
  sound.currentTime = 0;
  sound.play().catch(() => {});
}
// Object.values(sounds).forEach((sound) => {
//   sound.preload = "auto";
// });
export { toggleMute, playFlipSoundOnce };
