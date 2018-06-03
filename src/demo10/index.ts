import vert from './vertex.vert';
import frag from './fragment.frag';
import { Mat4 } from '../math/mat4';
import { initShaders, createVbo, loadImage, loadTexture } from '../utils'
import { Vec4, Vec3 } from '../math';
let canvas = document.getElementById('root') as HTMLCanvasElement;

let vertices = new Float32Array([
    0, 1, -4, 0.4, 1, 0.4,
    -0.5, -1, -4, 0.4, 1, 0.4, // 绿
    0.5, -1, -4, 1, 1, 1,

    0, 1, -2, 1, 1, 0.4,
    -0.5, -1, -2, 1, 1, 0.4, // 黄
    0.5, -1, -2, 1, 1, 0.4,

    0, 1, 0, 0.4, 0.4, 1,
    -0.5, -1, 0, 0.4, 0.4, 1, // 蓝
    0.5, -1, 0, 0.4, 0.4, 1,
])
let n = vertices.length;

console.log(canvas.width / canvas.height)
export class Application {
    private gl: WebGLRenderingContext | WebGL2RenderingContext;
    program: WebGLProgram;
    constructor(canvas: HTMLCanvasElement) {
        let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        this.gl = gl;
        this.main();
    }
    async main() {
        const { gl } = this;
        createVbo(gl, vertices);
        let viewMatrix = new Mat4().setLookAt(new Vec3(0, 0, -10), new Vec3(0, 0, 100), new Vec3(0, 1, 0));
        let projMatrix = new Mat4();
        projMatrix.setPerspective(30, canvas.width / canvas.height, 1, 1000);
        let modelMatrix = new Mat4();
        // modelMatrix.setFromEulerAngles(0, 0, -10);
        let mvpMatrix = new Mat4().mul(projMatrix).mul(viewMatrix).mul(modelMatrix);
        let program = initShaders(gl, vert, frag);
        this.program = program;
        let FSIZE = Float32Array.BYTES_PER_ELEMENT;

        // let mat4Angles = new Mat4().setFromEulerAngles(0, 0, 90);
        // let mat4Scale = new Mat4().setScale(1.5, 1, 1.5);
        // let mat4Translate = new Mat4().setTranslate(0.2, 0.2, 0.2);
        // // mat4.setTranslate(0.2, 0.2, 0.2);
        // mat4.setIdentity();
        // console.log(mat4);

        const a_Position = gl.getAttribLocation(program, 'a_Position');
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 6 * FSIZE, 0);
        gl.enableVertexAttribArray(a_Position);
        const a_Color = gl.getAttribLocation(program, 'a_Color');
        gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 6 * FSIZE, 3 * FSIZE)
        gl.enableVertexAttribArray(a_Color);

        const u_MvpjMatrix = gl.getUniformLocation(program, 'u_MvpjMatrix');
        (gl as WebGLRenderingContext).uniformMatrix4fv(u_MvpjMatrix, false, mvpMatrix.data);
        // 深度测试
        // gl.enable(gl.DEPTH_TEST);
        // gl.clear(gl.DEPTH_BUFFER_BIT);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 9);
    }

}

new Application(canvas);