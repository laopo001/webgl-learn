attribute vec4 position;
uniform mat4 matrix;
attribute vec2 a_TexCoord;
varying vec2 v_TexCoord;
void main(){  
    gl_Position = matrix * position;
    v_TexCoord = a_TexCoord;
}