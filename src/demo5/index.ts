import vert from './vertex.vert';
import frag from './fragment.frag';
import { Mat4 } from '../math/mat4';
import { initShaders, createVbo, loadImage, loadTexture } from '../utils'
import { Vec4 } from '../math';
let canvas = document.getElementById('root') as HTMLCanvasElement;

let vertices = new Float32Array([
    -0.5, 0.5, 0, 0, 1,
    -0.5, -0.5, 0, 0, 0,
    0.5, 0.5, 0, 1, 1,
    0.5, -0.5, 0, 1, 0
])

// let vertices = [0.0, 0.0];
export class Application {
    private gl: WebGLRenderingContext | WebGL2RenderingContext;
    constructor(canvas: HTMLCanvasElement) {
        let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        this.gl = gl;
        this.main();
    }
    async main() {
        const { gl } = this;
        createVbo(gl, vertices);
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
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 5 * FSIZE, 0);
        gl.enableVertexAttribArray(a_Position);
        const a_TexCoord = gl.getAttribLocation(program, 'a_TexCoord');
        gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, 5 * FSIZE, 3 * FSIZE)
        gl.enableVertexAttribArray(a_TexCoord);
        const matrix = gl.getUniformLocation(program, 'matrix');
        (gl as WebGLRenderingContext).uniformMatrix4fv(matrix, false, mat4.data);
        const image = await loadImage('./assets/images/bg.JPG');
        const u_Sampler = gl.getUniformLocation(program, 'u_Sampler');
        loadTexture(gl,u_Sampler,image);
        // gl.enableVertexAttribArray(matrix)
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}

new Application(canvas);