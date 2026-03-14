// script.js

const audio = document.getElementById('audio');
const albumArt = document.getElementById('album-art');
const trackTitle = document.getElementById('track-title');
const trackDescription = document.getElementById('track-description');
const seekBar = document.getElementById('seek-bar');
const volumeBar = document.getElementById('volume-bar');
const playlist = document.getElementById('playlist');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const volumeLevelDisplay = document.getElementById('volume-level');

// Read song data from the JSON script tag
const songsData = JSON.parse(document.getElementById('songs-data').textContent);

let currentIndex = 0;

function loadSong(index) {
    const song = songsData[index];
    audio.src = song.src;
    albumArt.src = song.art;
    trackTitle.textContent = song.title;
    trackDescription.textContent = song.description;
    document.querySelector('.playlist .active')?.classList.remove('active');
    playlist.children[index].classList.add('active');
    updateSeekBar(); // Update seek bar to match the song duration
}

function playSong() {
    audio.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline';
}

function pauseSong() {
    audio.pause();
    playButton.style.display = 'inline';
    pauseButton.style.display = 'none';
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songsData.length) % songsData.length;
    loadSong(currentIndex);
    playSong();
}

function nextSong() {
    currentIndex = (currentIndex + 1) % songsData.length;
    loadSong(currentIndex);
    playSong();
}

function updateSeekBar() {
    seekBar.max = audio.duration;
    seekBar.value = audio.currentTime;
    // Update time displays
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    durationDisplay.textContent = formatTime(audio.duration);
}

function setSeekBar() {
    audio.currentTime = seekBar.value;
}

function updateVolume() {
    audio.volume = volumeBar.value;
    volumeLevelDisplay.textContent = Math.round(volumeBar.value * 100) + '%';
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Load songs into the playlist
songsData.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = song.title;
    li.addEventListener('click', () => {
        currentIndex = index;
        loadSong(currentIndex);
        playSong();
    });
    playlist.appendChild(li);
});

// Load the first song
loadSong(currentIndex);

audio.addEventListener('timeupdate', updateSeekBar);
seekBar.addEventListener('input', setSeekBar);
volumeBar.addEventListener('input', updateVolume);

playButton.addEventListener('click', playSong);
pauseButton.addEventListener('click', pauseSong);
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
