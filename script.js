const player = document.querySelector('.player')
const video = document.querySelector('video')
const progressRange = document.querySelector('.progress-range')
const progressBar = document.querySelector('.progress-bar')
const playBtn = document.getElementById('play-btn')
const volumeIcon = document.getElementById('volume-icon')
const volumeRange = document.querySelector('.volume-range')
const volumeBar = document.querySelector('.volume-bar')
const currentTime = document.querySelector('.time-elapsed')
const duration = document.querySelector('.time-duration')
const speed = document.querySelector('.player-speed')
const fullscreenBtn = document.querySelector('.fullscreen')
const fullscreenIcon = document.getElementById('fullscreenIcon')


// Play & Pause ----------------------------------- //

const replacePlayPause = (x, y) => {
    playBtn.classList.replace(`fa-${x.toLowerCase()}`, `fa-${y.toLowerCase()}`)
    playBtn.setAttribute('title', y)
}

const togglePlay = () => {
    if (video.paused) {
        video.play()
        replacePlayPause('Play', 'Pause')
    } else {
        video.pause()
        replacePlayPause('Pause', 'Play')
    }
}

// On Video End, show play button icon
video.addEventListener('ended', () => replacePlayPause('Pause', 'Play'))


// Progress Bar ---------------------------------- //

// Calculate display time format
const displayTime = (time) => {
    const minutes = Math.floor(time / 60)
    let seconds = Math.floor(time % 60)
    seconds = (seconds < 10) ? `0${seconds}` : `${seconds}`
    return `${minutes}:${seconds}`
}

// Update progress bar as video plays
const updateProgress = () => {
    progressBar.style.width = `${video.currentTime * 100 / video.duration}%`
    currentTime.textContent = displayTime(video.currentTime)
    duration.textContent = displayTime(video.duration)
}

// Click to seek within the video
const setProgress = (e) => {
    const newTime = (e.offsetX / progressRange.offsetWidth) * video.duration
    video.currentTime = newTime
}

// Volume Controls --------------------------- //

let lastVolume = 1

// Volume bar
const changeVolume = (e) => {
    // console.log(e.offsetX, volumeRange.offsetWidth)
    let volume = e.offsetX / volumeRange.offsetWidth
    // Rounding Value up or down
    if (volume < 0.1) { volume = 0 }
    if (volume > 0.9) { volume = 1 }
    volumeBar.style.width = `${volume * 100}%`
    video.volume = volume
    // Change Icon depending on volume
    volumeIcon.className = ''
    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up')
    } else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down')
    } else {
        volumeIcon.classList.add('fas', 'fa-volume-mute')
    }
    lastVolume = volume
}

// Mute/Unmute
const toggleMute = () => {
    if (lastVolume === 0) {
        return
    }
    volumeIcon.className = ''
    if (video.volume) {
        lastVolume = video.volume
        video.volume = 0
        volumeBar.style.width = 0
        volumeIcon.classList.add('fas', 'fa-volume-mute')
        volumeIcon.setAttribute('title', 'Unmute')
    } else {
        video.volume = lastVolume
        volumeBar.style.width = `${lastVolume * 100}%`
        volumeIcon.setAttribute('title', 'Mute')
        if (lastVolume > 0.7) {
            volumeIcon.classList.add('fas', 'fa-volume-up')
        } else if (lastVolume < 0.7 && lastVolume > 0) {
            volumeIcon.classList.add('fas', 'fa-volume-down')
        }
    }
}


// Change Playback Speed -------------------- //

const changeSpeed = () => {
    video.playbackRate = speed.value
}

// Fullscreen ------------------------------- //

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen')
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen')
}

let fullscreen = false;
// Toggle Fullscreen
const toggleFullScreen = () => {
    if(!fullscreen){
        openFullscreen(player)
        fullscreen = true
        fullscreenIcon.classList.replace('fa-expand', 'fa-compress')
    }else {
        closeFullscreen()
        fullscreen = false
        fullscreenIcon.classList.replace('fa-compress', 'fa-expand')
    }
}

// Event Listeners
playBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', updateProgress)
video.addEventListener('loadedmetadata', () => updateProgress())
progressRange.addEventListener('click', setProgress)
volumeRange.addEventListener('click', changeVolume)
volumeIcon.addEventListener('click', toggleMute)
speed.addEventListener('change', changeSpeed)
fullscreenBtn.addEventListener('click', toggleFullScreen)