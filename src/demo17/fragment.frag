precision mediump float;
uniform vec3 u_LightPosition; // 光源位置+++
uniform vec3 u_AmbientLight; // 环境光颜色
uniform vec3 u_LightColor; // 光线颜色
varying vec3 v_Position;
varying vec3 v_Normal;
varying vec4 v_Color;         

void main(void) {                 
    vec3 u_LightDirection= normalize( u_LightPosition - vec3(v_Position) );
    float nDotL = max( dot( u_LightDirection, v_Normal ), 0.0);
    vec3 diffuse = u_LightColor * vec3(v_Color)* nDotL;
    vec3 ambient = u_AmbientLight * v_Color.rgb;
       
    gl_FragColor = vec4(diffuse + ambient, v_Color.a);                  
}