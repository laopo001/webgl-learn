import vert from './vertex.vert';
import frag from './fragment.frag';
import { Mat4 } from '../math/mat4';
import { initShaders } from '../utils'
import { Vec4 } from '../math';
let canvas = document.getElementById('root') as HTMLCanvasElement;

let vertices = new Float32Array([
    -0.5, -0.5, 0.0, 1, 0, 0,
    0.5, -0.5, 0.0, 0, 1, 0,
    0.0, 0.5, 0.0, 0, 0, 1
])

// let vertices = [0.0, 0.0];

export class Application {
    private gl: WebGLRenderingContext;
    constructor(canvas: HTMLCanvasElement) {
        let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        this.gl = gl;
        this.createVbo(vertices);
        let program = initShaders(gl, vert, frag);
        let FSIZE = Float32Array.BYTES_PER_ELEMENT;
        let mat4Angles = new Mat4().setFromEulerAngles(0, 0, 90);
        let mat4Scale = new Mat4().setScale(1.5, 1, 1.5);
        let mat4Translate = new Mat4().setTranslate(0.2, 0.2, 0.2);

        let mat4 = mat4Angles.mul(mat4Scale).mul(mat4Translate);
        // mat4.setTranslate(0.2, 0.2, 0.2);
        mat4.setIdentity();
        console.log(mat4);
        const a_Position = gl.getAttribLocation(program, 'position');
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 6 * FSIZE, 0);
        gl.enableVertexAttribArray(a_Position);
        const a_Color = gl.getAttribLocation(program, 'a_Color');
        gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 6 * FSIZE, 3 * FSIZE)
        gl.enableVertexAttribArray(a_Color);
        const matrix = gl.getUniformLocation(program, 'matrix');
        gl.uniformMatrix4fv(matrix, false, mat4.data);
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