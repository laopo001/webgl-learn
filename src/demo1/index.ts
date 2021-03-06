import vert from './vertex.vert';
import frag from './fragment.frag';
import { initShaders } from '../utils'
let canvas = document.getElementById('root') as HTMLCanvasElement;

// let vertices = new Float32Array([-0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.0, 0.5, 0.0])

let vertices = [0.0, 0.0];

export class Application {
    private gl: WebGLRenderingContext;
    constructor(canvas: HTMLCanvasElement) {
        let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        this.gl = gl;
        let program = initShaders(gl, vert, frag);
        const a_Position = gl.getAttribLocation(program, 'position');
        canvas.addEventListener('click', (e) => {
            let rect = canvas.getBoundingClientRect();
            let x = e.clientX / rect.width * 2 - 1;
            let y = 1 - e.clientY / rect.height * 2;
            vertices.push(x, y)
            console.log(x, y);
            gl.clear(gl.COLOR_BUFFER_BIT);
            for (let i = 0; i < vertices.length; i = i + 2) {
                let x = vertices[i];
                let y = vertices[i + 1];
                gl.vertexAttrib3f(a_Position, x, y, 0);
                gl.drawArrays(gl.POINTS, 0, 1);
            }
        })
        gl.vertexAttrib3f(a_Position, vertices[0], vertices[1], 0.0)
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
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