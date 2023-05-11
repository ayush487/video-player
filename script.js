const video = document.querySelector('video')
const progressRange = document.querySelector('.progress-range')
const progressBar = document.querySelector('.progress-bar')
const playBtn = document.getElementById('play-btn')
const volumeIcon = document.getElementById('volume-icon')
const volumeRange = document.querySelector('.volume-range')
const volumeBar = document.querySelector('.volume-bar')
const currentTime = document.querySelector('.time-elapsed')
const duration = document.querySelector('.time-duration')
const fullscreenBtn = document.querySelector('.fullscreen')



// Play & Pause ----------------------------------- //

const replacePlayPause = (x , y) => {
    playBtn.classList.replace(`fa-${x.toLowerCase()}`, `fa-${y.toLowerCase()}`)
    playBtn.setAttribute('title', y)
}

const togglePlay = () => {
    if(video.paused) {
        video.play()
        replacePlayPause('Play', 'Pause')
    }else {
        video.pause()
        replacePlayPause('Pause', 'Play')
    }
}

// On Video End, show play button icon
video.addEventListener('ended', () => replacePlayPause('Pause', 'Play'))


// Progress Bar ---------------------------------- //

// Update progress bar as video plays
const updateProgress = () => {
    progressBar.style.width = `${video.currentTime * 100/video.duration}%`
}


// Volume Controls --------------------------- //



// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //


// Event Listeners
playBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', updateProgress)