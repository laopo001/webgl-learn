import vert from './vertex.vert';
import frag from './fragment.frag';
import { Mat4 } from '../math/mat4';
import { initShaders, createVbo, createIbo, loadImage, loadTexture } from '../utils'
import { Vec4, Vec3 } from '../math';
let canvas = document.getElementById('root') as HTMLCanvasElement;
canvas.style.position = 'absolute';
canvas.style.zIndex = '0';

let hud = document.createElement('canvas');
hud.width = 1000;
hud.height = 600;
hud.style.position = 'absolute';
hud.style.zIndex = '1';
document.body.appendChild(hud);
var ctx = hud.getContext('2d')

// Create a cube
//    v6----- v5
//   /|      /|
//  v1------v0|
//  | |     | |
//  | |v7---|-|v4
//  |/      |/
//  v2------v3
var vertices = new Float32Array([   // Vertex coordinates
  1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,    // v0-v1-v2-v3 front
  1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,    // v0-v3-v4-v5 right
  1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,    // v0-v5-v6-v1 up
  -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0,    // v1-v6-v7-v2 left
  -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,    // v7-v4-v3-v2 down
  1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0     // v4-v7-v6-v5 back
]);

var colors = new Float32Array([   // Colors
  0.2, 0.58, 0.82, 0.2, 0.58, 0.82, 0.2, 0.58, 0.82, 0.2, 0.58, 0.82, // v0-v1-v2-v3 front
  0.5, 0.41, 0.69, 0.5, 0.41, 0.69, 0.5, 0.41, 0.69, 0.5, 0.41, 0.69,  // v0-v3-v4-v5 right
  0.0, 0.32, 0.61, 0.0, 0.32, 0.61, 0.0, 0.32, 0.61, 0.0, 0.32, 0.61,  // v0-v5-v6-v1 up
  0.78, 0.69, 0.84, 0.78, 0.69, 0.84, 0.78, 0.69, 0.84, 0.78, 0.69, 0.84, // v1-v6-v7-v2 left
  0.32, 0.18, 0.56, 0.32, 0.18, 0.56, 0.32, 0.18, 0.56, 0.32, 0.18, 0.56, // v7-v4-v3-v2 down
  0.73, 0.82, 0.93, 0.73, 0.82, 0.93, 0.73, 0.82, 0.93, 0.73, 0.82, 0.93, // v4-v7-v6-v5 back
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

var ANGLE_STEP = 3.0;    // The increments of rotation angle (degrees)
var g_arm1Angle = -90.0; // The rotation angle of arm1 (degrees)
var g_joint1Angle = 0.0; // The rotation angle of joint1 (degrees)

export class Application {
  private gl: WebGLRenderingContext | WebGL2RenderingContext;
  program: WebGLProgram;
  MvpMatrix: Mat4;

  constructor(canvas: HTMLCanvasElement) {
    let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    this.gl = gl;
    this.main();
  }
  async main() {
    if (this.gl instanceof WebGL2RenderingContext) { return; }
    const { gl } = this;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    // createVbo(gl, colors);
    let program = initShaders(gl, vert, frag);
    this.program = program;
    let viewMatrix = new Mat4().setLookAt(new Vec3(5, 5, 5), new Vec3(0, 0, 0), new Vec3(0, 1, 0)).invert();
    let projMatrix = new Mat4().setPerspective(50, canvas.width / canvas.height, 1, 1000);
    let modelMatrix = new Mat4();
    // modelMatrix.setTranslate(0, 0, 10);
    // modelMatrix.setFromEulerAngles(45, 45, 45);
    const viewProjMatrix = new Mat4().mul(projMatrix).mul(viewMatrix).mul(modelMatrix);

    this.MvpMatrix = viewProjMatrix;
    this.draw();
    var tick = () => {   // Start drawing
      // currentAngle = animate(currentAngle);
      this.draw2D(ctx); // Draw 2D
      this.draw();
      requestAnimationFrame(tick);
    };
    tick();

    canvas.onmousedown = (ev: any) => {   // Mouse is pressed
      var x = ev.clientX, y = ev.clientY;
      var rect = ev.target.getBoundingClientRect();
      if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
        // If pressed position is inside <canvas>, check if it is above object
        var x_in_canvas = x - rect.left, y_in_canvas = rect.bottom - y;
        var picked = this.check(x_in_canvas, y_in_canvas);
        if (picked) alert('The cube was selected! ');
      }
    }
  }
  currentAngle = 0;
  draw2D(ctx) {
    ctx.clearRect(0, 0, 1000, 600); // Clear <hud>
    // Draw triangle with white lines
    ctx.beginPath();                      // Start drawing
    ctx.moveTo(120, 10); ctx.lineTo(200, 150); ctx.lineTo(40, 150);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)'; // Set white to color of lines
    ctx.stroke();                           // Draw Triangle with white lines
    // Draw white letters
    ctx.font = '18px "Times New Roman"';
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // Set white to the color of letters
    ctx.fillText('HUD: Head Up Display', 40, 180);
    ctx.fillText('Triangle is drawn by Canvas 2D API.', 40, 200);
    ctx.fillText('Cube is drawn by WebGL API.', 40, 220);
    ctx.fillText('Current Angle: ' + Math.floor(this.currentAngle), 40, 240);
  }
  check(x, y) {
    if (this.gl instanceof WebGL2RenderingContext) { return; }
    const { gl, program } = this;
    var picked = false;
    let u_Clicked = gl.getUniformLocation(program, 'u_Clicked');
    gl.uniform1i(u_Clicked, 1);
    this.draw()
    var pixels = new Uint8Array(4);
    gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

    if (pixels[0] == 255) // The mouse in on cube if R(pixels[0]) is 255
      picked = true;
    gl.uniform1i(u_Clicked, 0);
    this.draw()
    return picked;
  }
  draw() {
    if (this.gl instanceof WebGL2RenderingContext) { return; }
    const { gl, program } = this;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    let FSIZE = Float32Array.BYTES_PER_ELEMENT;

    createVbo(gl, vertices);
    const a_Position = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    createVbo(gl, colors);
    const a_Color = gl.getAttribLocation(program, 'a_Color');
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Color);
    createIbo(gl, indices);


    const u_MvpjMatrix = gl.getUniformLocation(program, 'u_MvpjMatrix');
    gl.uniformMatrix4fv(u_MvpjMatrix, false, this.MvpMatrix.data);


    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
  }

}

new Application(canvas);