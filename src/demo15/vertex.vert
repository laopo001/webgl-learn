attribute vec4 a_Position;
attribute vec4 a_Color; // 法向量
attribute vec4 a_Normal;
uniform mat4 u_MvpjMatrix;
uniform mat4 u_ModelMatrix; // 模型矩阵+++
uniform mat4 u_NormalMatrix; // 光线颜色
uniform vec3 u_LightColor; // 光线颜色
// uniform vec3 u_LightDirection; // 归一化的世界坐标
uniform vec3 u_LightPosition; // 光源位置+++
uniform vec3 u_AmbientLight; // 环境光颜色
varying vec4 v_Color;

void main(){  
    gl_Position = u_MvpjMatrix * a_Position;
    vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));
    vec4 vertexPosition= u_ModelMatrix * a_Position;
    vec3 u_LightDirection= normalize( u_LightPosition - vec3(vertexPosition) );
    float nDotL = max(dot(u_LightDirection,normal), 0.0);
    vec3 diffuse = u_LightColor * vec3(a_Color)* nDotL;
    vec3 ambient = u_AmbientLight * a_Color.rgb;
    v_Color =  vec4(diffuse + ambient, a_Color.a);
}