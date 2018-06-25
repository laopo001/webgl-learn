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
  1.5, 10.0, 1.5, -1.5, 10.0, 1.5, -1.5, 0.0, 1.5, 1.5, 0.0, 1.5, // v0-v1-v2-v3 front
  1.5, 10.0, 1.5, 1.5, 0.0, 1.5, 1.5, 0.0, -1.5, 1.5, 10.0, -1.5, // v0-v3-v4-v5 right
  1.5, 10.0, 1.5, 1.5, 10.0, -1.5, -1.5, 10.0, -1.5, -1.5, 10.0, 1.5, // v0-v5-v6-v1 up
  -1.5, 10.0, 1.5, -1.5, 10.0, -1.5, -1.5, 0.0, -1.5, -1.5, 0.0, 1.5, // v1-v6-v7-v2 left
  -1.5, 0.0, -1.5, 1.5, 0.0, -1.5, 1.5, 0.0, 1.5, -1.5, 0.0, 1.5, // v7-v4-v3-v2 down
  1.5, 0.0, -1.5, -1.5, 0.0, -1.5, -1.5, 10.0, -1.5, 1.5, 10.0, -1.5  // v4-v7-v6-v5 back
]);


var colors = new Float32Array([    // Colors
  1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v1-v2-v3 front
  1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v3-v4-v5 right
  1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v5-v6-v1 up
  1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v1-v6-v7-v2 left
  1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v7-v4-v3-v2 down
  1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0　    // v4-v7-v6-v5 back
]);


var normals = new Float32Array([
  0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, // v0-v1-v2-v3 front
  1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, // v0-v3-v4-v5 right
  0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, // v0-v5-v6-v1 up
  -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // v1-v6-v7-v2 left
  0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, // v7-v4-v3-v2 down
  0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0  // v4-v7-v6-v5 back
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
    createIbo(gl, indices);
    createVbo(gl, vertices);
    let program = initShaders(gl, vert, frag);
    this.program = program;
    let viewMatrix = new Mat4().setLookAt(new Vec3(20, 10, 30), new Vec3(0, 0, 0), new Vec3(0, 1, 0)).invert();
    let projMatrix = new Mat4().setPerspective(50, canvas.width / canvas.height, 1, 1000);

    const viewProjMatrix = new Mat4().mul(projMatrix).mul(viewMatrix);
    this.draw(viewProjMatrix);

    let keydown = (ev) => {

      switch (ev.keyCode) {
        case 38: // Up arrow key -> the positive rotation of joint1 around the z-axis
          if (g_joint1Angle < 135.0) g_joint1Angle += ANGLE_STEP;
          break;
        case 40: // Down arrow key -> the negative rotation of joint1 around the z-axis
          if (g_joint1Angle > -135.0) g_joint1Angle -= ANGLE_STEP;
          break;
        case 39: // Right arrow key -> the positive rotation of arm1 around the y-axis
          g_arm1Angle = (g_arm1Angle + ANGLE_STEP);
          break;
        case 37: // Left arrow key -> the negative rotation of arm1 around the y-axis
          g_arm1Angle = (g_arm1Angle - ANGLE_STEP);
          break;
        default: return; // Skip drawing at no effective action
      }
      console.log(g_arm1Angle, g_joint1Angle);
      // Draw the robot arm
      this.draw(viewProjMatrix);
    }
    document.onkeydown = function (ev) { keydown(ev); };
  }
  g_modelMatrix = new Mat4();
  g_MvpMatrix = new Mat4();
  g_normalMatrix = new Mat4();
  draw(viewProjMatrix) {
    const { gl } = this;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var arm1Length = 10.0;

    this.g_modelMatrix = this.g_modelMatrix
      .mul(new Mat4().setTranslate(0, -10, 0))
      .mul(new Mat4().setFromEulerAngles(0, g_arm1Angle, 0))
    this.drawBox(viewProjMatrix)

    this.g_modelMatrix = this.g_modelMatrix
      .mul(new Mat4().setTranslate(0, arm1Length, 0))
      .mul(new Mat4().setScale(1.3, 1, 1.3))
      .mul(new Mat4().setFromEulerAngles(0, 0, g_joint1Angle))
    this.drawBox(viewProjMatrix)

    this.g_modelMatrix = new Mat4();
  }
  drawBox(viewProjMatrix) {
    if (this.gl instanceof WebGL2RenderingContext) { return; }
    const { gl, program, } = this;
    this.g_MvpMatrix = this.g_MvpMatrix.copy(viewProjMatrix)
    this.g_MvpMatrix = this.g_MvpMatrix.mul(this.g_modelMatrix);
    let FSIZE = Float32Array.BYTES_PER_ELEMENT;

    const a_Position = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    const a_Color = gl.getAttribLocation(program, 'a_Color');
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Color);

    const a_Normal = gl.getAttribLocation(program, 'a_Normal');
    gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Normal);

    const u_ModelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix');
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.g_modelMatrix.data);

    var u_AmbientLight = gl.getUniformLocation(program, 'u_AmbientLight');
    gl.uniform3f(u_AmbientLight, 0.2, 0.2, 0.2);

    var u_LightPosition = gl.getUniformLocation(program, 'u_LightPosition');
    gl.uniform3f(u_LightPosition, 20, 20, 17);

    var u_LightColor = gl.getUniformLocation(program, 'u_LightColor');
    gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
    // Set the light direction (in the world coordinate)
    var u_LightDirection = gl.getUniformLocation(program, 'u_LightDirection');
    var lightDirection = new Vec3([0.5, 3.0, 4.0]);
    lightDirection.normalize();     // Normalize
    gl.uniform3fv(u_LightDirection, lightDirection.data);

    const u_MvpjMatrix = gl.getUniformLocation(program, 'u_MvpjMatrix');
    gl.uniformMatrix4fv(u_MvpjMatrix, false, this.g_MvpMatrix.data);

    this.g_normalMatrix = this.g_modelMatrix.clone().invert().transpose();
    const u_NormalMatrix = gl.getUniformLocation(program, 'u_NormalMatrix');
    gl.uniformMatrix4fv(u_NormalMatrix, false, this.g_normalMatrix.data);

    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
  }
}

new Application(canvas);