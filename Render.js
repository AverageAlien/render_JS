let Canvas = document.getElementById("MainCanvas");
let Ctx = Canvas.getContext("2d");

window.addEventListener("keydown", this.InputKeyDown, false);
window.addEventListener("keyup", this.InputKeyUp, false);

function InputKeyDown(event) {
    let key = event.which || event.keyCode;
    //alert("down " + key + " | " + 'w');
    //TODO: make WASD keys work
    switch (key) {
        case 'W'.charCodeAt(0): case 38: // up arrow
            InputHandler.Up = true;
            break;
        case 'A'.charCodeAt(0): case 37: // left arrow
            InputHandler.Left = true;
            break;
        case 'S'.charCodeAt(0): case 40: //down arrow
            InputHandler.Down = true;
            break;
        case 'D'.charCodeAt(0): case 39: // right arrow
            InputHandler.Right = true;
            break;
    }
}

function InputKeyUp(event) {
    let key = event.which || event.keyCode;
    //alert("up " + key);
    switch (key) {
        case 'W'.charCodeAt(0): case 38: // up arrow
            InputHandler.Up = false;
            break;
        case 'A'.charCodeAt(0): case 37: // left arrow
            InputHandler.Left = false;
            break;
        case 'S'.charCodeAt(0): case 40: //down arrow
            InputHandler.Down = false;
            break;
        case 'D'.charCodeAt(0): case 39: // right arrow
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
    speed_x: 0,
    speed_y: 0,
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
Player.speed_x = 0;
Player.speed_y = 0;
Player.color = "#00ff00";
Player.border = 2;
RendObjs.push(Player);

let Speed = 0.25;
let Drag = 0.1;
let Gravity = 1;
let JumpBoost = 3;

const Field_X = 800;
const Field_Y = 600;

const RenderFramerate = 16.667;
const PhysicsFramerate = 16.667;
let FTime = new Date().getTime();

setInterval(PhysicsUpdate, PhysicsFramerate)
setInterval(RenderUpdate, RenderFramerate);

function PhysicsUpdate() {
    Player.speed_x += InputHandler.Right ? Speed : InputHandler.Left ? -Speed : 0;
    Player.speed_y += InputHandler.Down ? Speed : InputHandler.Up ? -Speed : 0;
    Player.speed_y += Gravity;
    Player.speed_x *= 1 - Drag;
    Player.speed_y *= 1 - Drag;
    Player.x = Math.max(0, Math.min(Field_X - Player.w, Player.x + Player.speed_x));
    Player.y = Math.max(0, Math.min(Field_Y - Player.h, Player.y + Player.speed_y));
    if (Player.x >= Field_X - Player.w) Player.speed_x = Math.min(0, Player.speed_x);
    else if (Player.x <= 0) Player.speed_x = Math.max(0, Player.speed_x);
    if (Player.y >= Field_Y - Player.h) Player.speed_y = Math.min(0, Player.speed_y);
    else if (Player.y <= 0) Player.speed_y = Math.max(0, Player.speed_y);
    for (let i = 1; i < RendObjs.length; ++i) {
        if (RendObjs[i].x <= 0 || RendObjs[i].x >= (800-RendObjs[i].w)) {
            RendObjs[i].speed_x *= -1;
        }
        if (RendObjs[i].y <= 0 || RendObjs[i].y >= (600-RendObjs[i].h)) {
            RendObjs[i].speed_y *= -1;
        }
        RendObjs[i].x += RendObjs[i].speed_x;
        RendObjs[i].y += RendObjs[i].speed_y;
    }
}


function RenderUpdate() {
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
    Sqr.speed_x = 3;
    Sqr.speed_y = 3;
    let R = Math.random() * 255;
    let G = Math.random() * 255;
    let B = Math.random() * 255;
    Sqr.color = RGBtoHex(R,G,B);
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
    return Str;
}