import * as Map from "./map.js"
import { showUI } from './render.js'

function getPlayerPosition() {
    for (var row = 0; row < Map.rowNumber; row++) {
        for (var col = 0; col < Map.colNumber; col++) {
            if (Map.content[row][col] === Map.PLAYER) {
                return {
                    row,
                    col
                    // ,type:Map.PLAYER
                }
            }
        }
    }
}

function nextItem(item, direction) {
    var next = {};
    switch (direction) {
        case 'right':
            next.row = item.row;
            next.col = item.col + 1;
            next.type = Map.content[next.row][next.col];
            if (next.type === Map.SPACE) {
                next.flag = true;;
            } else {
                next.flag = false;
            }
            break;
        case 'left':
            next.row = item.row;
            next.col = item.col - 1;
            next.type = Map.content[next.row][next.col];
            if (next.type === Map.SPACE) {
                next.flag = true
            } else {
                next.flag = false;
            }
            break;
        case 'up':
            next.row = item.row - 1;
            next.col = item.col;
            next.type = Map.content[next.row][next.col];
            if (next.type === Map.SPACE) {
                next.flag = true
            } else {
                next.flag = false;
            }
            break;
        case 'down':
            next.row = item.row + 1;
            next.col = item.col;
            next.type = Map.content[next.row][next.col];
            if (next.type === Map.SPACE) {
                next.flag = true
            } else {
                next.flag = false;
            }
            break;
        default: break
    }
    return next;
}

function moveToNext(pre, next) {
    Map.content[pre.row][pre.col] = Map.SPACE;
    Map.content[next.row][next.col] = Map.PLAYER;
    showUI();
}


function canPushBox(next, direction) {
    var canPush = false;
    switch (next, direction) {
        case 'up':
            if (Map.content[next.row - 1][next.col] === Map.SPACE)
                canPush = true;
            break;
        case 'down':
            if (Map.content[next.row + 1][next.col] === Map.SPACE)
                canPush = true;
            break;
        case 'left':
            if (Map.content[next.row][next.col - 1] === Map.SPACE)
                canPush = true;
            break;
        case 'right':
            if (Map.content[next.row][next.col + 1] === Map.SPACE)
                canPush = true;
            break;
        default: break;
    }
    return canPush;
}

function gameSuc() {
    let len = Map.correct.length;
    let flag = 0;
    // let corr=Map.correct;
    for (let index = 0; index < len; index++) {
        let row = Map.correct[index].row;
        let col = Map.correct[index].col;
        if (Map.content[row][col] === Map.BOX) {
            flag++;
        }
    }
    if (flag === len) {
        console.log('游戏成功');
        return true;
    }

    return false;
}

function pushBox(player, box, boxPos) {
    if (!gameSuc()) {
        Map.content[boxPos.row][boxPos.col] = box.type;
        Map.content[box.row][box.col] = Map.PLAYER;
        Map.content[player.row][player.col] = Map.SPACE;
        showUI();
    } else {
        return;
    }

}

export function playerMove(direction) {
    if (gameSuc()) {
        return;
    } else {
        let player = getPlayerPosition();
        let next = nextItem(player, direction);
        // console.log(next);
        if (next.type === Map.SPACE) {
            moveToNext(player, next)
        } else if (next.type === Map.BOX) {
            if (canPushBox(next, direction)) {
                var boxNextPos = nextItem(next, direction);
                pushBox(player, next, boxNextPos);
            } else {
                console.log('推不动！！')
            }
        } else {
            console.log('这是墙壁，推不动！！');
        }
    }


}

