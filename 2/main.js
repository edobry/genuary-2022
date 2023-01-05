function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// clickticky();
const s = (p) => {
    let x = 100;
    let y = 100;
    let inconsolata;

    p.preload = () => {
        inconsolata = p.loadFont("Inconsolata-Regular.ttf");
    };

    const canvasSize = 800;
    const minTextSize = 10;
    let textSize = minTextSize - 1;
    const timer = 600;
    let increment = 5;
    const rate = 0;
    const renderBoxes = false;

    // const rowSize = 13;
    // const colSize = 30;

    let row = 0;
    let col = 0;

    let s = 0;

    let padding = 5;

    let height;
    let width;

    let maxCols;
    let maxRows;

    // calculate leftover boxes
    let availableBoxes;
    let surplus;

    const calcMax = textSize => {
        p.textSize(textSize);
        padding = Math.floor(textSize / 4)
        height = textSize + padding * 2;
        width = p.textWidth("00:00") + padding * 2;

        maxCols = Math.floor(canvasSize / width);
        maxRows = Math.floor(canvasSize / height);

        availableBoxes = maxCols * maxRows;
        surplus = (availableBoxes - 1) - Math.ceil(timer / increment);
    };

    p.setup = function () {
        let myCanvas = p.createCanvas(canvasSize, canvasSize);
        myCanvas.parent("myContainer");
        p.noLoop();

        p.textFont(inconsolata);
        p.textAlign(p.LEFT, p.TOP);

        do {
            calcMax(++textSize);

            console.log(`text size: ${textSize}`);
            console.log(`max cols: ${maxCols}`);
            console.log(`max rows: ${maxRows}`);
            console.log(`surplus: ${surplus}`);
        } while (surplus > 0);
        if (surplus < 0) calcMax(--textSize);
        console.log(`text size: ${textSize}`);
        console.log(`surplus: ${surplus}`);
    };

    p.draw = function () {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        // console.log(`min: ${mins}, sec: ${secs}`);

        const x = col * width;
        const y = row * height;

        if (renderBoxes) {
            p.noFill();
            p.rect(x, y, width, height);
        }
        p.fill(0, 0, 0);
        p.text(`${pad(mins)}:${pad(secs)}`, x + padding, y + padding);

        if (row == maxRows - 1) {
            row = 0;
            col++;
        } else row++;
        if (col < maxCols && s < timer) {
            s += increment;
            wait(rate).then(() => p.redraw());
        }
    };

    const pad = (n) => ("0" + n).slice(-2);

    const timeStuff = () => {
        let ms = p.millis();
        if (ms < 500) {
            // [...]
        } else if (ms < 1000) {
            // [...]
        } else {
            // [...]
        }
    };
};

let myp5 = new p5(s);
