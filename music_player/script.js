"use strict";

// Elements
const now_playing = document.querySelector(".now-playing");
const track_art = document.querySelector(".track-art");
const track_name = document.getElementById("music_title");
const track_artist = document.getElementById("musric_artist");

const playpause_btn = document.querySelector(".playpause-track");
const next_btn = document.getElementById("next");
const prev_btn = document.getElementById("prev");

const curr_time = document.getElementById("current_time");
const total_duration = document.getElementById("duration");
const seek_slider = document.getElementById("player_progress");
const progress = document.getElementById("progress");
const volume_slider = document.getElementById("volume_slider");

const wave = document.getElementById("wave");
const random_btn = document.getElementById("random_btn");
const repeat_btn = document.getElementById("repeat_btn");

const bg_img = document.getElementById("bg_img");
const cover_img = document.getElementById("cover");

const save_btn = document.getElementById("save_btn");
const library_btn = document.getElementById("library_btn");
const library_modal = document.getElementById("library_modal");
const library_list = document.getElementById("library_list");
const close_modal = document.querySelector(".close-modal");

let curr_track = new Audio();
let track_index = 0;
let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let updateTimer;

// Music List
const music_list = [
  {
    path: "song/Finding Her - Kushagra song -1.mp3",
    name: "Finding Her",
    artist: "Kushagra",
    img: "image/Finding Her img.jpg"
  },
  {
    path: "song/Tum se Hi - Mithun Sharma song -2.mp3",
    name: "Tum se hi",
    artist: "Mithun Sharma",
    img: "image/Tum se Hi img.png"
  },
  {
    path: "song/Tu hai Kahan - Raffey song -3.mp3",
    name: "Tu hai Kahan",
    artist: "Raffey - Usama - Ahad",
    img: "image/Tu hai Kahan img.jpg" 
  },
  {
    path: "song/Shikayat - Raffey - Usama - Ahad -4.mp3",
    name: "Shikayat",
    artist: "Raffey - Usama - Ahad",
    img: "image/Shikayat img.jpg"
  },
  {
    path: "song/Iraaday - Abdul Hannan & Rovalio song -5.mp3",
    name: "Iraaday",
    artist: "Abdul Hannan & Rovalio",
    img: "image/Iraaday img.jpg"
  }
];

// Initialize saved tracks from localStorage
let saved_tracks = JSON.parse(localStorage.getItem('saved_tracks')) || [];

// ✅ Load Track Function (updated to show all images)
function loadTrack(index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[index].path;
  curr_track.load();

  track_name.textContent = music_list[index].name;
  track_artist.textContent = music_list[index].artist;

  // ✅ Show image (for all songs)
  const imgPath = music_list[index].img || "image/default.jpg";
  cover_img.src = imgPath;
  bg_img.src = imgPath;

  now_playing.textContent = `PLAYING ${index + 1} OF ${music_list.length}`;

  updateTimer = setInterval(setUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

// Reset values
function reset() {
  curr_time.textContent = "0:00";
  total_duration.textContent = "0:00";
  progress.style.width = "0%";
}

// Play
function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = `<i class="fa fa-pause-circle fa-5x"></i>`;
  track_art.classList.add("rotate");
  wave.classList.add("loader");
}

// Pause
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = `<i class="fa fa-play-circle fa-5x"></i>`;
  track_art.classList.remove("rotate");
  wave.classList.remove("loader");
}

// Toggle play/pause
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

// Next Track
function nextTrack() {
  if (isRepeat) {
    curr_track.currentTime = 0;
    playTrack();
  } else if (isRandom) {
    let random_index;
    do {
      random_index = Math.floor(Math.random() * music_list.length);
    } while (random_index === track_index && music_list.length > 1);
    track_index = random_index;
    loadTrack(track_index);
    playTrack();
  } else {
    track_index = (track_index + 1) % music_list.length;
    loadTrack(track_index);
    playTrack();
  }
}

// Previous Track
function prevTrack() {
  if (curr_track.currentTime > 3) {
    curr_track.currentTime = 0;
    playTrack();
  } else {
    track_index = (track_index - 1 + music_list.length) % music_list.length;
    loadTrack(track_index);
    playTrack();
  }
}

// Random Track
function randomTrack() {
  isRandom = !isRandom;
  random_btn.classList.toggle("randomActive", isRandom);
}

// Repeat Track
function repeatTrack() {
  isRepeat = !isRepeat;
  repeat_btn.classList.toggle("randomActive", isRepeat);
}

// Volume Control
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

// Progress bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = curr_track.duration;
  curr_track.currentTime = (clickX / width) * duration;
}

// Update progress
function setUpdate() {
  if (!isNaN(curr_track.duration)) {
    const progressPercent = (curr_track.currentTime / curr_track.duration) * 100;
    progress.style.width = `${progressPercent}%`;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime % 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration % 60);

    if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
    if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;

    curr_time.textContent = `${currentMinutes}:${currentSeconds}`;
    total_duration.textContent = `${durationMinutes}:${durationSeconds}`;
  }
}

// Save current track to library
function saveCurrentTrack() {
  const current_track = music_list[track_index];
  const isAlreadySaved = saved_tracks.some(track => track.path === current_track.path);

  if (!isAlreadySaved) {
    saved_tracks.push(current_track);
    localStorage.setItem('saved_tracks', JSON.stringify(saved_tracks));
    alert(`${current_track.name} has been added to your library!`);
  } else {
    alert(`${current_track.name} is already in your library!`);
  }
}

// Show library modal
function showLibrary() {
  library_list.innerHTML = '';

  if (saved_tracks.length === 0) {
    library_list.innerHTML = '<p>Your library is empty. Save some songs!</p>';
  } else {
    saved_tracks.forEach((track, index) => {
      const libraryItem = document.createElement('div');
      libraryItem.className = 'library-item';
      libraryItem.innerHTML = `
        <img src="${track.img || 'https://via.placeholder.com/50'}" alt="${track.name}">
        <div class="library-item-info">
          <div class="track-name">${track.name}</div>
          <div class="track-artist">${track.artist}</div>
        </div>
      `;

      libraryItem.addEventListener('click', () => {
        const trackIndex = music_list.findIndex(t => t.path === track.path);
        if (trackIndex !== -1) {
          track_index = trackIndex;
          loadTrack(track_index);
          playTrack();
          library_modal.style.display = 'none';
        }
      });

      library_list.appendChild(libraryItem);
    });
  }

  library_modal.style.display = 'flex';
}

// Close modal
function closeLibrary() {
  library_modal.style.display = 'none';
}

// === EVENT LISTENERS ===
document.addEventListener("DOMContentLoaded", () => {
  loadTrack(track_index);

  playpause_btn.addEventListener("click", playpauseTrack);
  next_btn.addEventListener("click", nextTrack);
  prev_btn.addEventListener("click", prevTrack);
  random_btn.addEventListener("click", randomTrack);
  repeat_btn.addEventListener("click", repeatTrack);

  volume_slider.addEventListener("input", setVolume);
  seek_slider.addEventListener("click", setProgressBar);

  save_btn.addEventListener("click", saveCurrentTrack);
  library_btn.addEventListener("click", showLibrary);
  close_modal.addEventListener("click", closeLibrary);
});
