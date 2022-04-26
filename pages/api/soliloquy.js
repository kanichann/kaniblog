const fs = require('fs');
const path = require('path');



const date = new Date();
const currentTime = formattedDateTime(date);

function formattedDateTime(date) {
    const y = date.getFullYear();
    const m = ('0' + (date.getMonth() + 1)).slice(-2);
    const d = ('0' + date.getDate()).slice(-2);
    return (y + '/' + m + '/' + d)
}

const postsDirectory = path.join(process.cwd(), 'hitorigoto/hitorigoto.json');

function writeFile(path, data) {
    const jsonStr = JSON.stringify(data);
    fs.writeFile(path, jsonStr, (err) => {
        console.log(err);
        if (!err) {
            console.log(data);
        }
    })
}

function isExistFile(file) {
    try {
        fs.statSync(file);
        return true
    } catch (err) {
        if (err.code === 'ENOENT') return false
    }
}

function postSoliloquy(res, message) {
    let hitorigoto;
    const stats = isExistFile(postsDirectory);
    if (stats) {
        fs.readFile(postsDirectory, (err, file) => {
            //toStringによってbuffer型を直すことができた。
            hitorigoto = JSON.parse(file);
            hitorigoto.push({
                date: currentTime,
                hitorigoto: message
            })
            writeFile(postsDirectory, hitorigoto);

            res.status(400).json({ result: true })
        })
    } else {
        hitorigoto = [{
            date: currentTime,
            hitorigoto: message
        }]

        writeFile(postsDirectory, hitorigoto);
        res.status(400).json({ result: true })
    }

}

function getSoliloquy(res) {
    fs.readFile(postsDirectory, (err, file) => {
        res.status(400).json({ result: JSON.parse(file) })
    })
}

function main(req, res) {

    if (req.method === 'GET') {
        getSoliloquy(res);
    }
    if (req.method === 'POST') {
        postSoliloquy(res, req.body.message);
    }


}
export default main