import "./css/style.css";
import WaveSurfer from 'wavesurfer.js';
import unmute from '../lib/unmute';

// icons
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons/faPlayCircle";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons/faVolumeUp";

library.add(faPlayCircle);
library.add(faVolumeUp);
dom.watch();

let wavesurfer;
const url = 'media/hal.wav';

let GLOBAL_ACTIONS = {
    play: function () {
        wavesurfer.playPause();
    },
    'toggle-mute': function () {
        wavesurfer.toggleMute();
    }
};

// wait till DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Create an audio context instance if WebAudio is supported
    let context = (window.AudioContext || window.webkitAudioContext) ?
        new (window.AudioContext || window.webkitAudioContext)() : null;
    // Pass it to unmute if the context exists... ie WebAudio is supported
    if (context) {
        unmute.unmute(context);
    }

    // controls
    [].forEach.call(document.querySelectorAll('[data-action]'), function (el) {
        el.addEventListener('click', function (e) {
            let action = e.currentTarget.dataset.action;
            if (action in GLOBAL_ACTIONS) {
                e.preventDefault();
                GLOBAL_ACTIONS[action](e);
            }
        });
    });

    // setup wavesurfer
    const playerOptions = {
        container: '#waveform',
        waveColor: '#38ffac',
        progressColor: '#e3ffe5',
        cursorColor: '#ffffff',
        barWidth: 2,
        hideScrollbar: true,
        audioContext: context
    };
    wavesurfer = WaveSurfer.create(playerOptions);

    wavesurfer.on('ready', () => {
        const msg = 'Using wavesurfer.js v' + WaveSurfer.VERSION;
        console.info(msg);
        let tag = document.createElement("p");
        let title = document.createTextNode(msg);
        tag.appendChild(title);
        tag.appendChild(document.createElement("br"));
        let mediafile = document.createTextNode("Loaded " + url);
        tag.appendChild(mediafile);
        let element = document.getElementById("title");
        element.appendChild(tag);
    });

    wavesurfer.load(url);
});
