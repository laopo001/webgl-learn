attribute vec4 position;  
uniform mat4 matrix;
attribute vec4 a_Color;
varying vec4 v_Color;
void main(){  
    gl_Position = matrix * position;
    v_Color = a_Color;
}