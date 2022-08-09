const canvas = this.document.getElementById("mycanvas");
const ctx = canvas.getContext('2d');
canvas.width = this.window.innerWidth * 0.999999999999999999999999999999999999999999999999;
canvas.height = window.innerHeight * 0.994;


ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = 20;
ctx.lineCap = "round";
ctx.shadowColor = "rgba(0,0,0,0.7)";
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 10;

console.log(canvas.width);
let size;
if (canvas.width > 600) {
    size = canvas.width / 8;

} else {
    size = canvas.height / 6;
}

let sides = 9;
console.log(size);

let maxLevel = 4;
let scale = 0.5;
let spread = 0.5;

let branches = 2;
let dots = false;

let color = `hsl(0, 100%, 100%)`;

function drawBranch(level) {
    // ctx.strokeStyle = color;
    // color = `hsl(${Math.random() * 360}, 100%, 50%)`
    if (level > maxLevel) return;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();

    for (let i = 0; i < branches; i++) {

        ctx.save();
        ctx.translate(size - (size / branches) * i, 0)
        ctx.rotate(spread);
        ctx.scale(scale, scale);
        drawBranch(level + 1);
        ctx.restore();


        ctx.save();
        ctx.translate(size - (size / branches) * i, 0)
        ctx.rotate(-spread);
        ctx.scale(scale, scale);
        drawBranch(level + 1);
        ctx.restore();

        // lightness = '60%';
        // let color = 'hsl('+hue+', 100%, '+lightness+')';
        if (dots) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(size * 1.5, size * -0.5, size * 0.07, 0, Math.PI * 2);
            ctx.fill();

        }

    }
}






function drawFractal() {
    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(1, 1);
    ctx.rotate(0);

    for (let i = 0; i < sides; i++) {
        ctx.strokeStyle = color;
        // color = `hsl(${Math.random() * 360}, 100%, 50%)`

        ctx.rotate((Math.PI * 2) / sides);
        drawBranch(0);

        // ctx.scale(0.97, 0.97);
    }
    ctx.restore();


}

drawFractal();

function redraw() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawFractal();

}


let branchlevel = 2;

function changeBranch(branch, type) {

    if (type == "increase") {
        branchlevel++;
    } else if (type == "decrease") {
        branchlevel--;
    }
    if (branchlevel < 0) {
        branchlevel = 0;
    }
    branches = branchlevel;
    document.getElementById("branchinglevel").innerHTML = "Branching Level: " + branches;
    redraw();

}

function changeSides(side) {
    side = side.value;
    sides = side;
    redraw();
}

function changeColor(side) {
    side = side.value;
    color = `hsl(${side}, 100%, 50%)`;
    redraw();
}


function spreadSlider(side) {
    side = side.value;
    spread = side;
    redraw();
}

function save() {
    var imageData = canvas.toDataURL("image/png");
    let anchorTag = document.createElement("a");
    document.body.appendChild(anchorTag);
    anchorTag.href = imageData;
    anchorTag.download = "iamgeData";
    anchorTag.click();
    document.body.removeChild(anchorTag);
}

    // this.setInterval(drawFractal, 200);




function changeDots() {
    console.log("hells")
    dots = dots ? false : true;

    redraw();
}