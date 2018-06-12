import vert from './vertex.vert';
import frag from './fragment.frag';
import { Mat4 } from '../math/mat4';
import { initShaders, createVbo, createIbo, loadImage, loadTexture } from '../utils'
import { Vec4, Vec3 } from '../math';
let canvas = document.getElementById('root') as HTMLCanvasElement;

let vertices = new Float32Array([
  // Vertex coordinates and color
  1.0, 1.0, 1.0, 1.0, 1.0, 1.0,  // v0 White
  -1.0, 1.0, 1.0, 1.0, 0.0, 1.0,  // v1 Magenta
  -1.0, -1.0, 1.0, 1.0, 0.0, 0.0,  // v2 Red
  1.0, -1.0, 1.0, 1.0, 1.0, 0.0,  // v3 Yellow
  1.0, -1.0, -1.0, 0.0, 1.0, 0.0,  // v4 Green
  1.0, 1.0, -1.0, 0.0, 1.0, 1.0,  // v5 Cyan
  -1.0, 1.0, -1.0, 0.0, 0.0, 1.0,  // v6 Blue
  -1.0, -1.0, -1.0, 0.0, 0.0, 0.0   // v7 Black
])

let indices = new Uint8Array([
  0, 1, 2, 0, 2, 3,    // front
  0, 3, 4, 0, 4, 5,    // right
  0, 5, 6, 0, 6, 1,    // up
  1, 6, 7, 1, 7, 2,    // left
  7, 4, 3, 7, 3, 2,    // down
  4, 7, 6, 4, 6, 5     // back
]);
let n = indices.length;


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
    createIbo(gl, indices);
    let viewMatrix = new Mat4().setLookAt(new Vec3(4, 2, -10), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
    let projMatrix = new Mat4();
    projMatrix.setPerspective(45, canvas.width / canvas.height, 1, 1000);
    let modelMatrix = new Mat4();
    // modelMatrix.setTranslate(0, 0, 10);
    // modelMatrix.setFromEulerAngles(45, 45, 45);
    let mvpMatrix = new Mat4().mul(projMatrix).mul(viewMatrix).mul(modelMatrix);
    let program = initShaders(gl, vert, frag);
    this.program = program;
    let FSIZE = Float32Array.BYTES_PER_ELEMENT;

    const a_Position = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 6 * FSIZE, 0);
    gl.enableVertexAttribArray(a_Position);
    const a_Color = gl.getAttribLocation(program, 'a_Color');
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 6 * FSIZE, 3 * FSIZE)
    gl.enableVertexAttribArray(a_Color);

    const u_MvpjMatrix = gl.getUniformLocation(program, 'u_MvpjMatrix');
    (gl as WebGLRenderingContext).uniformMatrix4fv(u_MvpjMatrix, false, mvpMatrix.data);
    // 深度测试
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
  }

  
}

new Application(canvas);