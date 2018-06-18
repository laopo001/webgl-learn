attribute vec4 a_Position;
attribute vec4 a_Color; // 法向量
attribute vec4 a_Normal;
uniform mat4 u_MvpjMatrix;
uniform vec3 u_LightColor; // 光线颜色
uniform vec3 u_LightDirection; // 归一化的世界坐标
varying vec4 v_Color;

void main(){  
    gl_Position = u_MvpjMatrix * a_Position;
    vec3 normal = normalize(vec3(a_Normal));
    float nDotL = max(dot(u_LightDirection,normal), 0.0);
    vec3 diffuse = u_LightColor * vec3(a_Color)* nDotL;
    v_Color = vec4(diffuse, a_Color.a);
}