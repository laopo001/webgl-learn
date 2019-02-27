import vert from './vertex.vert';
import frag from './fragment.frag';
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
        const a_Position = gl.getAttribLocation(program, 'position');
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    createVbo(data: Float32Array): WebGLBuffer {
        let { gl } = this;
        // 创建缓存区对象
        let vbo = gl.createBuffer();
        // 将缓冲区对象绑定到目标
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        // 想向缓冲区对象中写入数据
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        // gl.bindBuffer(gl.ARRAY_BUFFER, null)
        return vbo;
    }
}

new Application(canvas);