const canvas = document.querySelector("canvas");
const ch = canvas.height = 600;
const cw = canvas.width = 800;
const ctx = canvas.getContext("2d");

class Box {
    constructor(context) {
        this.ctx = context;
        this.size = 60;
        this.color = "green";
        this.padding = 0;
        this.cx = (context.canvas.width / 2 - .5 * this.size) + .5*this.padding;
        this.cy = (context.canvas.height / 2 - .5 * this.size) + .5*this.padding;
        this.x = this.cx;
        this.y = 1;
        this.speed = 2;
        this.currentspeed = this.speed;
        this.dx = -1;
        this.dy = 1;
        this.distance = Math.sqrt(Math.pow(this.cx,2) + Math.pow(this.cy,2));
        this.ry = (this.cy / this.distance);
        this.rx = (this.cx / this.distance);
        this.state = 0;
    }
    moveBlock() {
        this.state = 1;
        this.currentspeed = this.speed;
    }
    update() {
        this.draw(this.ctx);
        if(!this.state) return;
        if(this.x <= this.padding || this.x >= this.ctx.canvas.width - this.size - 2*this.padding) {
            this.dx = -1 * this.dx
            // this.currentspeed = 0;
        }
        if(this.y <= this.padding || this. y >= this.ctx.canvas.height - this.size - 2*this.padding) {
            this.dy = -1 * this.dy;
            // this.currentspeed = 0;
        }
        this.x += this.dx * this.rx * this.currentspeed;
        this.y += this.dy * this.ry * this.currentspeed;
    }
    draw(ctx) {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x,this.y,this.size,this.size);
    }
}

const box = new Box(ctx);

const BoxPadding = 2;

function start() {
    ctx.clearRect(0,0,cw,ch);
    ctx.strokeStyle = "red";
    ctx.strokeRect(0 + BoxPadding,0 + BoxPadding,cw - 2 * BoxPadding,ch - 2*BoxPadding);
    box.update();
    if(!box.state) {
        ctx.beginPath()
        ctx.strokeStyle = 'black';
        ctx.strokeText("click to begin",cw/2 - 25,ch/2,50);
        ctx.stroke();
    }
    requestAnimationFrame(start)
}


start()

canvas.addEventListener("click",() => {
    box.moveBlock();
},{once:true})
