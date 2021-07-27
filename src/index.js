import { showUI } from './render.js'
import { playerMove } from './move.js';

showUI();

// window.playerMove=playerMove;


document.onkeydown = function (e) {
    switch (e.key) {
        case 'ArrowUp': playerMove('up'); break;
        case 'ArrowDown': playerMove('down'); break;
        case 'ArrowLeft': playerMove('left'); break;
        case 'ArrowRight': playerMove('right'); break;
        default: break;
    }
}







