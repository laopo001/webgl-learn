attribute vec4 position;  
attribute mat4 matrix;
void main(void){  
    gl_Position = matrix * position;
    gl_PointSize = 10.0;
}  