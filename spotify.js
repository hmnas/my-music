let playBtn = document.querySelector('#playBtn')
let gif = document.querySelector('.gif')
let progress = document.querySelector('.progress')
let songItems = Array.from(document.querySelectorAll('.song-item'))
let songPlay = Array.from(document.querySelectorAll('.songIconPlay'))
let songCurrentTime = document.querySelector('.current-time')
let SongDuration = document.querySelector('.duration')

let index = 0;

let audio = new Audio(`C:/Users/Hmna07/Desktop/basics/spotify/material/song${index + 1}.mp3`)

let songs = [
    {
        song: 'Perfect - EdSheeran',
        filePath: 'C:/Users/Hmna07/Desktop/basics/spotify/material/song1.mp3',
        cover: 'C:/Users/Hmna07/Desktop/basics/spotify/material/img1.jpg',
        duration: '04:39',
    },
    {
        song: 'Life Goes On - Bts',
        filePath: 'C:/Users/Hmna07/Desktop/basics/spotify/material/song3.mp3',
        cover: 'C:/Users/Hmna07/Desktop/basics/spotify/material/img2.jpg',
        duration: '03:30',
    },
    {
        song: 'Tere Hath Mien Mera Hath ho',
        filePath: 'C:/Users/Hmna07/Desktop/basics/spotify/material/song2.mp3',
        cover: 'C:/Users/Hmna07/Desktop/basics/spotify/material/img3.jpg',
        duration: '04:45',
    },
    {
        song: 'Cupid - Fifty Fifty',
        filePath: 'C:/Users/Hmna07/Desktop/basics/spotify/material/song4.mp3',
        cover: 'C:/Users/Hmna07/Desktop/basics/spotify/material/img4.jpg',
        duration: '02:54',
    },
    {
        song: 'Angel Baby - Troy Sivan',
        filePath: 'C:/Users/Hmna07/Desktop/basics/spotify/material/song5.mp3',
        cover: 'C:/Users/Hmna07/Desktop/basics/spotify/material/img5.jpg',
        duration: '03:41',
    },
    {
        song: 'Seven - Jungkook',
        filePath: 'C:/Users/Hmna07/Desktop/basics/spotify/material/song6.mp3',
        cover: 'C:/Users/Hmna07/Desktop/basics/spotify/material/img6.jpg',
        duration: '03:46',
    },
    {
        song: 'Butter - Bts',
        filePath: 'C:/Users/Hmna07/Desktop/basics/spotify/material/song7.mp3',
        cover: 'C:/Users/Hmna07/Desktop/basics/spotify/material/img7.png',
        duration: '02:44',
    },
    {
        song: 'Tere Hawale',
        filePath: 'C:/Users/Hmna07/Desktop/basics/spotify/material/song8.mp3',
        cover: 'C:/Users/Hmna07/Desktop/basics/spotify/material/img8.jpg',
        duration: '05:22',
    },
    {
        song: 'Like Crazy - Jimin',
        filePath: 'C:/Users/Hmna07/Desktop/basics/spotify/material/song9.mp3',
        cover: 'C:/Users/Hmna07/Desktop/basics/spotify/material/img9.jpg',
        duration: '03:32',
    },
]
//Main button
function forplay() {
    audio.play()
    playBtn.classList.remove(`fa-circle-play`)
    playBtn.classList.add(`fa-circle-pause`)
    gif.style.opacity = 1
    songPlay.forEach((song, i) => {
        if (i === index) {
            song.classList.remove(`fa-circle-play`)
            song.classList.add(`fa-circle-pause`)
        }
    })
}
function forPause() {
    audio.pause()
    playBtn.classList.add(`fa-circle-play`)
    playBtn.classList.remove(`fa-circle-pause`)
    gif.style.opacity = 0;
    songPlay.forEach((song, i) => {
        if (i === index) {
            song.classList.remove(`fa-circle-pause`)
            song.classList.add(`fa-circle-play`)
        }
    })
}
function playPause() {
    if (audio.paused) {
        forplay()
    }
    else {
        forPause()
    }
}
playBtn.addEventListener('click', playPause)




//update progress everysecond
let progressPer;
let progressPerMin;
let progressPerSec;
let totalMin;
let totalSec;
audio.addEventListener('timeupdate', function () {

    progressPer = parseInt((audio.currentTime / audio.duration) * 100)
    progress.value = progressPer
    // console.log(progressPer)

    totalMin = parseInt(audio.duration / 60)
    // console.log(totalMin)
    totalSec = parseInt(Math.floor(audio.duration - totalMin * 60))
    // console.log(totalSec)

    totalMin = totalMin < 10 ? '0' + totalMin : totalMin
    totalSec = totalSec < 10 ? '0' + totalSec : totalSec

    progressPerMin = Math.floor((audio.currentTime / 60))
    progressPerSec = Math.floor((audio.currentTime % 60))

    progressPerMin = progressPerMin < 10 ? '0' + progressPerMin : progressPerMin
    progressPerSec = progressPerSec < 10 ? '0' + progressPerSec : progressPerSec
    // console.log(progressPerSec)


    songCurrentTime.textContent = `${progressPerMin}:${progressPerSec}`
    SongDuration.textContent = `${totalMin}:${totalSec}`

})
//change progress 
progress.addEventListener('change', function () {
    audio.currentTime = (progress.value * audio.duration) / 100
    // console.log(audio.currentTime)
});

///Display Song cover and names in UI
songItems.forEach((item, i) => {
    item.getElementsByClassName('songName')[0].innerHTML = songs[i].song
    item.getElementsByTagName('img')[0].src = songs[i].cover
    item.getElementsByClassName('song-time')[0].innerHTML = songs[i].duration
})


function playAll() {
    songPlay.forEach((sing) => {

        sing.classList.add(`fa-circle-play`)
        sing.classList.remove(`fa-circle-pause`)
        playBtn.classList.add(`fa-circle-play`)
        playBtn.classList.remove(`fa-circle-pause`)
        gif.style.opacity = 0

    })
}
//Play list songs
function forParticularPlay(songP, i) {
    playAll()
    index = parseInt(i)
    current.innerHTML = songs[index].song
    songP.classList.remove(`fa-circle-play`)
    songP.classList.add(`fa-circle-pause`)
    audio.src = `C:/Users/Hmna07/Desktop/basics/spotify/material/song${index + 1}.mp3`
    audio.currentTime = 0
    forplay()
}
function forParticularPause(songP, i) {
    songP.classList.add(`fa-circle-play`)
    songP.classList.remove(`fa-circle-pause`)
    forPause()
}



function forParticular() {
    songPlay.forEach((playSong, i) => {
        playSong.addEventListener('click', function () {
            if (audio.paused || i !== index) {
                forParticularPlay(playSong, i)
            }
            else {
                forParticularPause(playSong, i)
            }
        })
    })
}
forParticular()



//Next and pre buttons
let next = document.getElementById('next')
let previous = document.getElementById('previous')
let current = document.querySelector('.song-current')

next.addEventListener('click', function () {
    playAll()
    if (index <= 9) {
        index = (index + 1) % songs.length
    }
    current.innerHTML = songs[index].song
    audio.src = `C:/Users/Hmna07/Desktop/basics/spotify/material/song${index + 1}.mp3`
    audio.currentTime = 0
    forplay()
    songPlay.forEach((song, i) => {
        if (i === index) {
            song.classList.remove(`fa-circle-play`)
            song.classList.add(`fa-circle-pause`)
        }
    })
})


previous.addEventListener('click', function () {
    if (index > 0) {
        playAll()
        index--
        current.innerHTML = songs[index].song
        audio.src = `C:/Users/Hmna07/Desktop/basics/spotify/material/song${index + 1}.mp3`
        audio.currentTime = 0
        forplay()
        songPlay.forEach((song, i) => {
            if (i === index) {
                song.classList.remove(`fa-circle-play`)
                song.classList.add(`fa-circle-pause`)
            }
        })

    } else {
        index = songs.length - 1
    }

})

function autoPlay() {
    audio.addEventListener('ended', function () {
        playAll()
        if (index <= 7) {
            index = (index + 1) % songs.length
        }
        current.innerHTML = songs[index].song
        audio.src = `C:/Users/Hmna07/Desktop/basics/spotify/material/song${index + 1}.mp3`
        audio.currentTime = 0
        forplay()
    })
}
autoPlay()