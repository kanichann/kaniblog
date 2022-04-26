import fs from 'fs';
import path from 'path';


let soliloquyPath = path.join(process.cwd(), 'hitorigoto/hitorigoto.json')

export function getSoliloquy(res) {
    let file = fs.readFileSync(soliloquyPath);
    let fileJson = JSON.parse(file);
    let fileReverse = fileJson.reverse();
    let displayData = []
    for (let i = 0; i < 30; i++) {
        if (!fileReverse[i]) {
            break;
        }
        displayData.push(fileReverse[i]);

    }

    return displayData
}