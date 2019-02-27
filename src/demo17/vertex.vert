attribute vec4 a_Position;
attribute vec4 a_Color; // 法向量
attribute vec4 a_Normal;
uniform mat4 u_MvpjMatrix;
uniform mat4 u_ModelMatrix; // 模型矩阵+++
uniform mat4 u_NormalMatrix; // 光线颜色
varying vec3 v_Position;
varying vec3 v_Normal;
varying vec4 v_Color;

void main(){  
    gl_Position = u_MvpjMatrix * a_Position;
    v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));
    v_Position = vec3( u_ModelMatrix * a_Position );
    v_Color = a_Color;

}