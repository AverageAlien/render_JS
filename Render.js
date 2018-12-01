let Canvas = document.getElementById("MainCanvas");
let Ctx = Canvas.getContext("2d");

window.addEventListener("keydown", this.InputKeyDown, false);
window.addEventListener("keyup", this.InputKeyUp, false);

function InputKeyDown(event) {
    let key = event.which || event.keyCode;
    //alert("down " + key + " | " + 'w');
    //TODO: make WASD keys work
    switch (key) {
        case 'w'.charCodeAt(0): case 38: // up arrow
            InputHandler.Up = true;
            break;
        case 'a'.charCodeAt(0): case 37: // left arrow
            InputHandler.Left = true;
            break;
        case 's'.charCodeAt(0): case 40: //down arrow
            InputHandler.Down = true;
            break;
        case 'd'.charCodeAt(0): case 39: // right arrow
            InputHandler.Right = true;
            break;
    }
}

function InputKeyUp(event) {
    let key = event.which || event.keyCode;
    //alert("up " + key);
    switch (key) {
        case "w".charCodeAt(0): case 38: // up arrow
            InputHandler.Up = false;
            break;
        case "a".charCodeAt(0): case 37: // left arrow
            InputHandler.Left = false;
            break;
        case "s".charCodeAt(0): case 40: //down arrow
            InputHandler.Down = false;
            break;
        case "d".charCodeAt(0): case 39: // right arrow
            InputHandler.Right = false;
            break;
    }
}

let InputHandler = {
    Up: false,
    Down: false,
    Left: false,
    Right: false
};

let _Square = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    color: "#000000",
    border: 0,
};

let RendObjs = [];

let Player = {};
Object.assign(Player, _Square);
Player.x = 0;
Player.y = 0;
Player.w = 15;
Player.h = 15;
Player.color = "#00ff00";
Player.border = 2;
RendObjs.push(Player);

let Speed = 1;

const Framerate = 16.667;
let FTime = new Date().getTime();

setInterval(Update, Framerate);

function Update() {
    Player.x += InputHandler.Right ? Speed : InputHandler.Left ? -Speed : 0;
    Player.y += InputHandler.Down ? Speed : InputHandler.Up ? -Speed : 0;
    Ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    for (let i = 0; i < RendObjs.length; ++i) {
        Ctx.fillStyle = "#000000";
        Ctx.fillRect(RendObjs[i].x, RendObjs[i].y, RendObjs[i].w, RendObjs[i].h);
        if (RendObjs[i].border < RendObjs[i].w / 2 && RendObjs[i].border < RendObjs[i].h / 2) {
            Ctx.fillStyle = RendObjs[i].color;
            Ctx.fillRect(RendObjs[i].x + RendObjs[i].border, RendObjs[i].y + RendObjs[i].border,
                RendObjs[i].w - RendObjs[i].border * 2, RendObjs[i].h - RendObjs[i].border * 2);
        }
    }
    Ctx.fillStyle = "#000000";
    let NewFTime = new Date().getTime();
    Ctx.fillText(`FPS = ${Math.round(1000 / (NewFTime - FTime))}`, 1, 10, 128);
    FTime = NewFTime;
}

function AddSquare() {
    let Sqr = {};
    Object.assign(Sqr, _Square);
    Sqr.x = Math.round(Math.random() * (800 - 26));
    Sqr.y = Math.round(Math.random() * (600 - 26));
    Sqr.w = 25;
    Sqr.h = 25;
    Sqr.color = "#FF0000";
    Sqr.border = 1;
    RendObjs.push(Sqr);
}

function RGBtoHex(r, g, b) {
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    let Str = "#" + ((r > 15) ? r.toString(16) : ("0" + r.toString(16))) +
        ((g > 15) ? g.toString(16) : ("0" + g.toString(16))) +
        ((b > 15) ? b.toString(16) : ("0" + b.toString(16)));
    alert(Str);
    return Str;
}