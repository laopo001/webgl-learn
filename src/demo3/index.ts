import vert from './vertex.vert';
import frag from './fragment.frag';
import { Mat4 } from '../math/mat4';
import { initShaders } from '../utils'
let canvas = document.getElementById('root') as HTMLCanvasElement;

let vertices = new Float32Array([-0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.0, 0.5, 0.0])

// let vertices = [0.0, 0.0];

export class Application {
    private gl: WebGLRenderingContext;
    constructor(canvas: HTMLCanvasElement) {
        let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        this.gl = gl;
        this.createVbo(vertices);
        let program = initShaders(gl, vert, frag);
        let mat4 = new Mat4();
        mat4.setScale(2, 2, 2);
        console.log(mat4);
        const a_Position = gl.getAttribLocation(program, 'position');
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);
        const matrix = gl.getUniformLocation(program, 'matrix');
        gl.uniformMatrix4fv(matrix, false, mat4.data)
        // gl.enableVertexAttribArray(matrix)
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
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