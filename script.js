const cassette = document.getElementById('cassette');
const playButton = document.getElementById('play-button');
const audio = document.getElementById('mixtape');
const message = document.getElementById('message');
const reels = document.querySelectorAll('.reel');

let isPlaying = false;
let mediaRecorder;
let audioChunks = [];

// 🎵 PLAY/PAUSE
cassette.addEventListener('click', (e) => {
    if (e.target.closest('#play-button') || e.target.closest('.cassette')) {
        togglePlayback();
    }
});

function togglePlayback() {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        cassette.classList.add('playing');
        audio.play().catch(e => console.log('Audio play failed:', e));
        message.classList.add('show');
        message.innerHTML = `
            <div class="message-content">
                🎵 <strong>Now Playing: "Forever & Always" 💕</strong><br><br>
                Happy 1st monthsary, my love!<br>
                I fall for you more every day... 💖<br><br>
                <div class="record-btn" onclick="startRecording()">🎤 Add Your Message</div>
            </div>
        `;
    } else {
        cassette.classList.remove('playing');
        audio.pause();
        audio.currentTime = 0;
        message.classList.remove('show');
    }
}

// 🎤 VOICE RECORDING
function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            
            mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
                const url = URL.createObjectURL(audioBlob);
                audio.src = url;
                togglePlayback(); // Auto-play your recording!
                alert('🎉 Your love message recorded! 🎉');
            };
            
            mediaRecorder.start();
            document.querySelector('.record-btn').textContent = '⏹️ Stop Recording';
            document.querySelector('.record-btn').onclick = stopRecording;
        })
        .catch(err => alert('Microphone access denied 😢'));
}

function stopRecording() {
    mediaRecorder.stop();
    document.querySelector('.record-btn').textContent = '🎤 Record Voice';
    document.querySelector('.record-btn').onclick = startRecording;
}