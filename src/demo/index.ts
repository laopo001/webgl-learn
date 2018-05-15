import vert from '../shader/vertex.vert';
import frag from '../shader/fragment.frag';
import { initShaders } from '../utils'
let canvas = document.getElementById('root') as HTMLCanvasElement;

let vertices = new Float32Array([-0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.0, 0.5, 0.0])

export class Application {
    private gl: WebGLRenderingContext;
    constructor(canvas: HTMLCanvasElement) {
        let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        this.gl = gl;
        if (!initShaders(gl, vert, frag)) {
            return;
        }
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(this.gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, 1);

    }
    createVbo(data: Float32Array): WebGLBuffer {
        let { gl } = this;
        let vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        // gl.bindBuffer(gl.ARRAY_BUFFER, null)
        return vbo;
    }
}

new Application(canvas);