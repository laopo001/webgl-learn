export function initShaders(gl: WebGLRenderingContext, vshader: string, fshader: string) {
    let program = createProgram(gl, vshader, fshader);

    return program;
}

export function createProgram(gl: WebGLRenderingContext, vshader: string, fshader: string) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        console.log(gl.getProgramInfoLog(program));
        return false;
    }
    gl.useProgram(program)
    return program;
}

export function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        console.log(gl.getShaderInfoLog(shader));
        return false;
    }
    return shader;
}

export function createVbo(gl: WebGLRenderingContext, data: Float32Array): WebGLBuffer {
    let vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    // gl.bindBuffer(gl.ARRAY_BUFFER, null)
    return vbo;
}

export function loadImage(url: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        }
        image.src = url;
    })
}

export function loadTexture(gl: WebGLRenderingContext, u_Sampler, image: ImageBitmap | ImageData | HTMLVideoElement | HTMLImageElement | HTMLCanvasElement) {
    console.log(image)
    const texture = gl.createTexture();
    // 对纹理图像进行Y轴反转
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    // 开启0号纹理单元
    gl.activeTexture(gl.TEXTURE0);
    // 向target绑定纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // 配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // 配置纹理图像
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    // 将0号纹理传递给着色器
    gl.uniform1i(u_Sampler, 0);

}