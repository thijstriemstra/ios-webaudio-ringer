import WaveSurfer from 'wavesurfer.js';

let player;
const elementId = 'myAudio';
let src = { src: '/hal.wav', type: 'audio/wav' };

const playerOptions = {
    controls: true,
    bigPlayButton: false,
    autoplay: false,
    fluid: false,
    loop: false,
    width: 600,
    height: 300,
    plugins: {
        // configure videojs-wavesurfer plugin
        wavesurfer: {
            backend: 'MediaElement',
            displayMilliseconds: true,
            debug: true,
            waveColor: '#4A4A22',
            progressColor: 'black',
            cursorColor: 'black',
            hideScrollbar: true
        }
    }
};

// wait till DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    const msg = 'Using wavesurfer.js ' + WaveSurfer.VERSION;
    console.info(msg);
});
