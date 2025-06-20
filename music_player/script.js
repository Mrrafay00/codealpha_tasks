// Get all the elements
const mainSongHeader = document.getElementById('main_song_header');
const albumArt = document.getElementById('album_art');
const artistName = document.getElementById('artist_name');
const volumeIcon = document.getElementById('volume_icon');
const volumeSlider = document.getElementById('volume_slider');
const currentTime = document.getElementById('current_time');
const durationTime = document.getElementById('duration');
const playerProgress = document.getElementById('player_progress');
const progressBar = document.getElementById('progress');
const randomBtn = document.getElementById('random_btn');
const prevBtn = document.getElementById('prev');
const playPauseBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const restartBtn = document.getElementById('restart_btn');
const wave = document.getElementById('wave');
const nowPlayingImg = document.getElementById('now_playing_img');
const npSongTitle = document.getElementById('np_song_title');
const npSongArtist = document.getElementById('np_song_artist');
const audio = document.getElementById('audio');

let currentSongIndex = 0;
let isPlaying = false;
let isRepeatCurrentSong = false;

// Playlist
const playlist = [
  {
    audioSrc: "song/Finding Her - Kushagra song -1.mp3",
    title: "Finding Her",
    artist: "Kushagra",
    imageSrc: "image/Finding Her img.jpg"
  },
  {
    audioSrc: "song/Tum se Hi - Mithun Sharma song -2.mp3",
    title: "Tum se hi",
    artist: "Mithun Sharma",
    imageSrc: "image/Tum se Hi img.png"
  },
  {
    audioSrc: "song/Tu hai Kahan - Raffey song -3.mp3",
    title: "Tu hai Kahan",
    artist: "Raffey - Usama - Ahad",
    imageSrc: "image/Tu hai Kahan img.jpg"
  },
  {
    audioSrc: "song/Shikayat - Raffey - Usama - Ahad -4.mp3",
    title: "Shikayat",
    artist: "Raffey - Usama - Ahad",
    imageSrc: "image/Shikayat img.jpg"
  },
  {
    audioSrc: "song/Iraaday - Abdul Hannan & Rovalio song -5.mp3",
    title: "Iraaday",
    artist: "Abdul Hannan & Rovalio",
    imageSrc: "image/Iraaday img.jpg"
  }
];

// Load a song
function loadSong(songIndex) {
  const song = playlist[songIndex];
  mainSongHeader.textContent = song.title;
  albumArt.src = song.imageSrc;
  artistName.textContent = song.artist;
  nowPlayingImg.src = song.imageSrc;
  npSongTitle.textContent = song.title;
  npSongArtist.textContent = song.artist;
  audio.src = song.audioSrc;
  audio.load();
}

// Play song
function playSong() {
  audio.play();
  isPlaying = true;
  playPauseBtn.classList.remove('fa-play-circle');
  playPauseBtn.classList.add('fa-pause-circle');
  wave.classList.add('playing');
}

// Pause song
function pauseSong() {
  audio.pause();
  isPlaying = false;
  playPauseBtn.classList.remove('fa-pause-circle');
  playPauseBtn.classList.add('fa-play-circle');
  wave.classList.remove('playing');
}

// Play/Pause toggle
playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Next song
nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
  playSong();
});

// Previous song
prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentSongIndex);
  playSong();
});

// Volume control
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value / 100;
});

// Show/hide volume slider
volumeIcon.addEventListener('click', () => {
  volumeSlider.classList.toggle('show');
});

// Progress bar update
audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progressPercent}%`;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  currentTime.textContent = formatTime(audio.currentTime);
  durationTime.textContent = audio.duration && !isNaN(audio.duration)
    ? formatTime(audio.duration)
    : "0:00";
});

// Seek on progress bar click
playerProgress.addEventListener('click', (e) => {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  if (duration && !isNaN(duration)) {
    audio.currentTime = (clickX / width) * duration;
  }
});

// Repeat current song toggle
randomBtn.addEventListener('click', () => {
  isRepeatCurrentSong = !isRepeatCurrentSong;
  randomBtn.classList.toggle('active', isRepeatCurrentSong);
  randomBtn.style.color = isRepeatCurrentSong ? '#4286f4' : '#666';
  audio.loop = isRepeatCurrentSong;
});

// Restart song
restartBtn.addEventListener('click', () => {
  audio.currentTime = 0;
  if (!isPlaying) {
    playSong();
  }
});

// Auto-play next song on end
audio.addEventListener('ended', () => {
  if (!isRepeatCurrentSong) {
    nextBtn.click();
  }
});

// Initial setup
loadSong(currentSongIndex);
audio.volume = volumeSlider.value / 100;
