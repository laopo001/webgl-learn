import vert from './vertex.vert';
import frag from './fragment.frag';
import { Mat4 } from '../math/mat4';
import { initShaders, createVbo, createIbo, loadImage, loadTexture } from '../utils'
import { Vec4, Vec3 } from '../math';
let canvas = document.getElementById('root') as HTMLCanvasElement;



// Create a cube
//    v6----- v5
//   /|      /|
//  v1------v0|
//  | |     | |
//  | |v7---|-|v4
//  |/      |/
//  v2------v3
var vertices = new Float32Array([   // Coordinates
  1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, // v0-v1-v2-v3 front
  1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, // v0-v3-v4-v5 right
  1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, // v0-v5-v6-v1 up
  -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, // v1-v6-v7-v2 left
  -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, // v7-v4-v3-v2 down
  1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0  // v4-v7-v6-v5 back
]);


var colors = new Float32Array([    // Colors
  1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v1-v2-v3 front
  1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v3-v4-v5 right
  1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v5-v6-v1 up
  1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v1-v6-v7-v2 left
  1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v7-v4-v3-v2 down
  1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0　    // v4-v7-v6-v5 back
]);


var normals = new Float32Array([    // Normal
  0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
  1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
  0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
  -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
  0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,  // v7-v4-v3-v2 down
  0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0   // v4-v7-v6-v5 back
]);


// Indices of the vertices
var indices = new Uint8Array([
  0, 1, 2, 0, 2, 3,    // front
  4, 5, 6, 4, 6, 7,    // right
  8, 9, 10, 8, 10, 11,    // up
  12, 13, 14, 12, 14, 15,    // left
  16, 17, 18, 16, 18, 19,    // down
  20, 21, 22, 20, 22, 23     // back
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
    if (this.gl instanceof WebGL2RenderingContext) { return; }
    const { gl } = this;

    createIbo(gl, indices);
    let viewMatrix = new Mat4().setLookAt(new Vec3(3, 3, 7), new Vec3(0, 0, 0), new Vec3(0, 1, 0)).invert();
    let projMatrix = new Mat4();
    projMatrix.setPerspective(45, canvas.width / canvas.height, 1, 100);
    let modelMatrix = new Mat4();
    // modelMatrix.setTranslate(0, 0, 1);
    modelMatrix.setFromEulerAngles(45, 45, 45);
    let mvpMatrix = new Mat4().mul(projMatrix).mul(viewMatrix).mul(modelMatrix);
    let program = initShaders(gl, vert, frag);
    this.program = program;
    let FSIZE = Float32Array.BYTES_PER_ELEMENT;
    createVbo(gl, vertices);
    const a_Position = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    createVbo(gl, colors);
    const a_Color = gl.getAttribLocation(program, 'a_Color');
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Color);
    createVbo(gl, normals);
    const a_Normal = gl.getAttribLocation(program, 'a_Normal');
    gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Normal);

    const u_ModelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix');
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.data);

    var u_AmbientLight = gl.getUniformLocation(program, 'u_AmbientLight');
    gl.uniform3f(u_AmbientLight, 0.2, 0.2, 0.2);

    var u_AmbientLight = gl.getUniformLocation(program, 'u_AmbientLight');
    gl.uniform3f(u_AmbientLight, 2.3, 4.0, 3.5);

    var normalMatrix =modelMatrix.clone().invert().transpose();

    const u_NormalMatrix = gl.getUniformLocation(program, 'u_NormalMatrix');
    gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.data);

    var u_LightColor = gl.getUniformLocation(program, 'u_LightColor');
    gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
    // Set the light direction (in the world coordinate)
    var u_LightDirection = gl.getUniformLocation(program, 'u_LightDirection');
    var lightDirection = new Vec3([0.5, 3.0, 4.0]);
    lightDirection.normalize();     // Normalize
    gl.uniform3fv(u_LightDirection, lightDirection.data);

    const u_MvpjMatrix = gl.getUniformLocation(program, 'u_MvpjMatrix');
    gl.uniformMatrix4fv(u_MvpjMatrix, false, mvpMatrix.data);


    // 深度测试
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
  }


}

new Application(canvas);