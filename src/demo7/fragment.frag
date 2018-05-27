precision mediump float;
uniform sampler2D u_Sampler;
uniform sampler2D u_Sampler2;
varying vec2 v_TexCoord;                
void main(void) {                          
    gl_FragColor = texture2D(u_Sampler,v_TexCoord) * texture2D(u_Sampler2,v_TexCoord);                
}