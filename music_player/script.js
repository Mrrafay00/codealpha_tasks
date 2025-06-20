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

    // Music List (reduced to 5 songs, keeping 1 and 2, with image links removed for 3, 4, 5)
    const music_list = [
      {
        path: "song/Finding Her - Kushagra song -1.mp3",
        name: "Finding Her",
        artist: "Kushagra",
        img: "data:image/jpeg;base64,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"
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
        img: "image/Tu hai kahan img.png" 
      },
      {
        path: "song/Shikayat - Raffey - Usama - Ahad -4.mp3",
        name: "Shikayat",
        artist: "Raffey - Usama - Ahad",
        img: "" // Image removed as per request
      },
      {
        path: "song/Iraaday - Abdul Hannan & Rovalio song -5.mp3",
        name: "Iraaday",
        artist: "Abdul Hannan & Rovalio",
        img: "" // Image removed as per request
      }
    ];

    // Initialize saved tracks from localStorage
    let saved_tracks = JSON.parse(localStorage.getItem('saved_tracks')) || [];

    // Load Track
    function loadTrack(index) {
      clearInterval(updateTimer);
      reset();

      curr_track.src = music_list[index].path;
      curr_track.load();

      track_name.textContent = music_list[index].name;
      track_artist.textContent = music_list[index].artist;
      // Only set image for songs 1 and 2 (index 0 and 1)
      if (index === 0 || index === 1) {
        cover_img.src = music_list[index].img;
        bg_img.src = music_list[index].img;
      } else {
        // Set a placeholder or clear the image for other songs
        cover_img.src = ""; // You can set a default placeholder image here
        bg_img.src = ""; // You can set a default placeholder image here
      }
      
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
      
      // Check if track is already saved
      const isAlreadySaved = saved_tracks.some(
        track => track.path === current_track.path
      );
      
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
            // Find the track in the main list and play it
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

      // Player controls
      playpause_btn.addEventListener("click", playpauseTrack);
      next_btn.addEventListener("click", nextTrack);
      prev_btn.addEventListener("click", prevTrack);
      random_btn.addEventListener("click", randomTrack);
      repeat_btn.addEventListener("click", repeatTrack);

      // Volume and progress
      volume_slider.addEventListener("input", setVolume);
      seek_slider.addEventListener("click", setProgressBar);

      // Library functionality
      save_btn.addEventListener("click", saveCurrentTrack);
      library_btn.addEventListener("click", showLibrary);
      close_modal.addEventListener("click", closeLibrary);
    });