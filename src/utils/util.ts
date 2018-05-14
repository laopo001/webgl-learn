export function initShaders(gl: WebGLRenderingContext, vshader: string, fshader: string) {
    let program = createProgram(gl, vshader, fshader);
    gl.useProgram(program)
    return program;
}

export function createProgram(gl: WebGLRenderingContext, vshader: string, fshader: string) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
    const program = gl.createProgram();
    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    gl.linkProgram(program);
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    return program;
}

export function loadShader(gl: WebGLRenderingContext, type, source) {
    const shader = gl.createShader(type);
    gl.compileShader(shader);
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    return shader;
}