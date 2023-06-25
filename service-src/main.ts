import { LedMatrix, LedMatrixInstance, MatrixOptions } from 'rpi-led-matrix'

// Setup Matrix
const matrixOptions: MatrixOptions = {
    ...LedMatrix.defaultMatrixOptions(),
    rows: 32,
    cols: 64,
    chainLength: 1,
    showRefreshRate: true
}

const matrix = new LedMatrix(
    matrixOptions,
    LedMatrix.defaultRuntimeOptions()
);


// Buffers
const baseBuffer = [...Array(matrix.width() * matrix.height() * 3).keys()];
let bufferA = Buffer.of(
    ...baseBuffer.map(() => (Math.random() < 0.1 ? 0xff : 0x00))
);
let bufferB = Buffer.of(
    ...baseBuffer.map(() => (Math.random() < 0.1 ? 0xff : 0x00))
);
let useBufferA = true;

// Test Buffers
// bufferA = Buffer.of(
//     ...baseBuffer.map(() => (0x00))
// )
// bufferA[0] = 0xff

// bufferB = Buffer.of(
//     ...baseBuffer.map(() => (0x00))
// )
// bufferB[0] = 0xff

function updateBuffers() {
    // Update the opposite buffer
    if (useBufferA) {
        bufferB = Buffer.of(
            ...baseBuffer.map(() => (Math.random() < 0.1 ? 0xff : 0x00))
        );
    }
    else {
        bufferA = Buffer.of(
            ...baseBuffer.map(() => (Math.random() < 0.1 ? 0xff : 0x00))
        );
    }

    // Flip the buffers
    useBufferA = !useBufferA;
}

// function circle(x: number, y: number, radius: number) {

// }

function draw() {
    // Update
    updateBuffers();

    // Draw
    matrix.clear().brightness(50);
    matrix.drawBuffer(useBufferA ? bufferA : bufferB);

    // Reset
    setTimeout(() => matrix.sync(), 500);
}

// Draw Loop
matrix.afterSync((matrix: LedMatrixInstance, dt: number, t: number) => {
    draw();
});

// Start
draw()