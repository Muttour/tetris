import * as Map from "./map.js"


var gameDom = document.getElementById('game');
gameDom.style.height = 45 * Map.colNumber + 'px';
gameDom.style.width = 45 * Map.rowNumber + 'px';


function isCorrect(i, j) {
    var len = Map.correct.length;
    for (let index = 0; index < len; index++) {
        // console.log(Map.correct[index], i, j);
        if (Map.correct[index].row === i && Map.correct[index].col === j) {
            return true
        }
    }
    return false;
}

function renderType(Dom, item) {
    switch (item.type) {
        case Map.PLAYER: Dom.classList.add('player'); break;
        case Map.WALL: Dom.classList.add('wall'); break;
        case Map.BOX:
            Dom.classList.add('box');
            if (isCorrect(item.row, item.col)) {
                Dom.classList.add('correct-box');
                // console.log(i, j);
            }
            break;
        case Map.SPACE:
            if (isCorrect(item.row, item.col)) {
                Dom.classList.add('correct');
            }
            break;
        default: break;
    }
}

export function showUI() {
    // console.log('flag shouui');
    gameDom.innerHTML='';
    Map.content.forEach((rows, row) => {
        rows.forEach((type, col) => {
            let item = { row,col,type}
            let Dom = document.createElement('div');
            Dom.className = 'item';
            Dom.style.top = row * 45 + 'px';
            Dom.style.left = col * 45 + 'px';
            renderType(Dom, item);
            gameDom.appendChild(Dom);
        })
    })
}


