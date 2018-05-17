/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/demo3/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/demo3/fragment.frag":
/*!*********************************!*\
  !*** ./src/demo3/fragment.frag ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "void main(void){  \n    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);  \n}  "

/***/ }),

/***/ "./src/demo3/index.ts":
/*!****************************!*\
  !*** ./src/demo3/index.ts ***!
  \****************************/
/*! exports provided: Application */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return Application; });
/* harmony import */ var _vertex_vert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vertex.vert */ "./src/demo3/vertex.vert");
/* harmony import */ var _vertex_vert__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vertex_vert__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fragment_frag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fragment.frag */ "./src/demo3/fragment.frag");
/* harmony import */ var _fragment_frag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fragment_frag__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _math_mat4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/mat4 */ "./src/math/mat4.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");




var canvas = document.getElementById('root');
var vertices = new Float32Array([-0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.0, 0.5, 0.0]);
// let vertices = [0.0, 0.0];
var Application = /** @class */ (function () {
    function Application(canvas) {
        var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        this.gl = gl;
        this.createVbo(vertices);
        var program = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["initShaders"])(gl, _vertex_vert__WEBPACK_IMPORTED_MODULE_0___default.a, _fragment_frag__WEBPACK_IMPORTED_MODULE_1___default.a);
        var mat4Angles = new _math_mat4__WEBPACK_IMPORTED_MODULE_2__["Mat4"]().setFromEulerAngles(0, 0, 90);
        var mat4Scale = new _math_mat4__WEBPACK_IMPORTED_MODULE_2__["Mat4"]().setScale(1.5, 1, 1.5);
        var mat4Translate = new _math_mat4__WEBPACK_IMPORTED_MODULE_2__["Mat4"]().setTranslate(0.2, 0.2, 0.2);
        var mat4 = mat4Angles.mul(mat4Scale).mul(mat4Translate);
        // mat4.setTranslate(0.2, 0.2, 0.2);
        console.log(mat4);
        var a_Position = gl.getAttribLocation(program, 'position');
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);
        var matrix = gl.getUniformLocation(program, 'matrix');
        gl.uniformMatrix4fv(matrix, false, mat4.data);
        // gl.enableVertexAttribArray(matrix)
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        gl.flush();
    }
    Application.prototype.createVbo = function (data) {
        var gl = this.gl;
        var vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        // gl.bindBuffer(gl.ARRAY_BUFFER, null)
        return vbo;
    };
    return Application;
}());

new Application(canvas);


/***/ }),

/***/ "./src/demo3/vertex.vert":
/*!*******************************!*\
  !*** ./src/demo3/vertex.vert ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "attribute vec4 position;  \nuniform mat4 matrix;\nvoid main(void){  \n    gl_Position = matrix * position;\n    gl_PointSize = 10.0;\n}  "

/***/ }),

/***/ "./src/math/mat4.ts":
/*!**************************!*\
  !*** ./src/math/mat4.ts ***!
  \**************************/
/*! exports provided: Mat4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mat4", function() { return Mat4; });
/* harmony import */ var _vec3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vec3 */ "./src/math/vec3.ts");
/* harmony import */ var _vec4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vec4 */ "./src/math/vec4.ts");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math */ "./src/math/math.ts");



/**
* @name Mat4
* @class A 4x4 matrix.
* @description Creates a new Mat4 object
* @param {Number} [v0] The value in row 0, column 0. If v0 is an array of length 16, the array will be used to populate all components.
* @param {Number} [v1] The value in row 1, column 0.
* @param {Number} [v2] The value in row 2, column 0.
* @param {Number} [v3] The value in row 3, column 0.
* @param {Number} [v4] The value in row 0, column 1.
* @param {Number} [v5] The value in row 1, column 1.
* @param {Number} [v6] The value in row 2, column 1.
* @param {Number} [v7] The value in row 3, column 1.
* @param {Number} [v8] The value in row 0, column 2.
* @param {Number} [v9] The value in row 1, column 2.
* @param {Number} [v10] The value in row 2, column 2.
* @param {Number} [v11] The value in row 3, column 2.
* @param {Number} [v12] The value in row 0, column 3.
* @param {Number} [v13] The value in row 1, column 3.
* @param {Number} [v14] The value in row 2, column 3.
* @param {Number} [v15] The value in row 3, column 3.
*/
var Mat4 = /** @class */ (function () {
    function Mat4(v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15) {
        var _this = this;
        /**
         * @function
         * @name Mat4#setLookAt
         * @description Sets the specified matrix to a viewing matrix derived from an eye point, a target point
         * and an up vector. The matrix maps the target point to the negative z-axis and the eye point to the
         * origin, so that when you use a typical projection matrix, the center of the scene maps to the center
         * of the viewport. Similarly, the direction described by the up vector projected onto the viewing plane
         * is mapped to the positive y-axis so that it points upward in the viewport. The up vector must not be
         * parallel to the line of sight from the eye to the reference point.
         * @param {Vec3} position 3-d vector holding view position.
         * @param {Vec3} target 3-d vector holding reference point.
         * @param {Vec3} up 3-d vector holding the up direction.
         * @returns {Mat4} Self for chaining.
         * @example
         * var position = new Vec3(10, 10, 10);
         * var target = new Vec3(0, 0, 0);
         * var up = new Vec3(0, 1, 0);
         * var m = new Mat4().setLookAt(position, target, up);
         */
        this.setLookAt = (function () {
            var x, y, z;
            x = new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
            y = new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
            z = new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
            return function (position, target, up) {
                z.sub2(position, target).normalize();
                y.copy(up).normalize();
                x.cross(y, z).normalize();
                y.cross(z, x);
                var r = _this.data;
                r[0] = x.x;
                r[1] = x.y;
                r[2] = x.z;
                r[3] = 0;
                r[4] = y.x;
                r[5] = y.y;
                r[6] = y.z;
                r[7] = 0;
                r[8] = z.x;
                r[9] = z.y;
                r[10] = z.z;
                r[11] = 0;
                r[12] = position.x;
                r[13] = position.y;
                r[14] = position.z;
                r[15] = 1;
                return _this;
            };
        })();
        /**
         * @function
         * @name Mat4#getScale
         * @description Extracts the scale component from the specified 4x4 matrix.
         * @param {Vec3} [scale] Vector to receive the scale.
         * @returns {Vec3} The scale in X, Y and Z of the specified 4x4 matrix.
         * @example
         * // Create a 4x4 scale matrix
         * var m = new Mat4().scale(2, 3, 4);
         *
         * // Query the scale component
         * var scale = m.getScale();
         */
        this.getScale = (function () {
            var x, y, z;
            x = new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
            y = new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
            z = new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
            return function (scale) {
                scale = (scale === undefined) ? new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]() : scale;
                this.getX(x);
                this.getY(y);
                this.getZ(z);
                scale.set(x.length(), y.length(), z.length());
                return scale;
            };
        })();
        /**
         * @function
         * @name Mat4#getEulerAngles
         * @description Extracts the Euler angles equivalent to the rotational portion
         * of the specified matrix. The returned Euler angles are in XYZ order an in degrees.
         * @param {Vec3} [eulers] A 3-d vector to receive the Euler angles.
         * @returns {Vec3} A 3-d vector containing the Euler angles.
         * @example
         * // Create a 4x4 rotation matrix of 45 degrees around the y-axis
         * var m = new Mat4().setFromAxisAngle(Vec3.UP, 45);
         *
         * var eulers = m.getEulerAngles();
         */
        this.getEulerAngles = (function () {
            var scale = new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]();
            return function (eulers) {
                var x, y, z, sx, sy, sz, m, halfPi;
                eulers = (eulers === undefined) ? new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]() : eulers;
                this.getScale(scale);
                sx = scale.x;
                sy = scale.y;
                sz = scale.z;
                m = this.data;
                y = Math.asin(-m[2] / sx);
                halfPi = Math.PI * 0.5;
                if (y < halfPi) {
                    if (y > -halfPi) {
                        x = Math.atan2(m[6] / sy, m[10] / sz);
                        z = Math.atan2(m[1] / sx, m[0] / sx);
                    }
                    else {
                        // Not a unique solution
                        z = 0;
                        x = -Math.atan2(m[4] / sy, m[5] / sy);
                    }
                }
                else {
                    // Not a unique solution
                    z = 0;
                    x = Math.atan2(m[4] / sy, m[5] / sy);
                }
                return eulers.set(x, y, z).scale(_math__WEBPACK_IMPORTED_MODULE_2__["math"].RAD_TO_DEG);
            };
        })();
        if (v0 && v0.length === 16) {
            this.data = new Float32Array(v0);
            return;
        }
        this.data = new Float32Array(16);
        if (typeof (v0) === 'number') {
            this.data[0] = v0;
            this.data[1] = v1;
            this.data[2] = v2;
            this.data[3] = v3;
            this.data[4] = v4;
            this.data[5] = v5;
            this.data[6] = v6;
            this.data[7] = v7;
            this.data[8] = v8;
            this.data[9] = v9;
            this.data[10] = v10;
            this.data[11] = v11;
            this.data[12] = v12;
            this.data[13] = v13;
            this.data[14] = v14;
            this.data[15] = v15;
        }
        else {
            this.setIdentity();
        }
    }
    /**
     * @function
     * @name Mat4#add2
     * @description Adds the specified 4x4 matrices together and stores the result in
     * the current instance.
     * @param {Mat4} lhs The 4x4 matrix used as the first operand of the addition.
     * @param {Mat4} rhs The 4x4 matrix used as the second operand of the addition.
     * @returns {Mat4} Self for chaining.
     * @example
     * var m = new Mat4();
     *
     * m.add2(Mat4.INDENTITY, Mat4.ONE);
     *
     * console.log("The result of the addition is: " a.toString());
     */
    Mat4.prototype.add2 = function (lhs, rhs) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        r[2] = a[2] + b[2];
        r[3] = a[3] + b[3];
        r[4] = a[4] + b[4];
        r[5] = a[5] + b[5];
        r[6] = a[6] + b[6];
        r[7] = a[7] + b[7];
        r[8] = a[8] + b[8];
        r[9] = a[9] + b[9];
        r[10] = a[10] + b[10];
        r[11] = a[11] + b[11];
        r[12] = a[12] + b[12];
        r[13] = a[13] + b[13];
        r[14] = a[14] + b[14];
        r[15] = a[15] + b[15];
        return this;
    };
    /**
     * @function
     * @name Mat4#add
     * @description Adds the specified 4x4 matrix to the current instance.
     * @param {Mat4} rhs The 4x4 matrix used as the second operand of the addition.
     * @returns {Mat4} Self for chaining.
     * @example
     * var m = new Mat4();
     *
     * m.add(Mat4.ONE);
     *
     * console.log("The result of the addition is: " a.toString());
     */
    Mat4.prototype.add = function (rhs) {
        return this.add2(this, rhs);
    };
    /**
     * @function
     * @name Mat4#clone
     * @description Creates a duplicate of the specified matrix.
     * @returns {Mat4} A duplicate matrix.
     * @example
     * var src = new Mat4().setFromEulerAngles(10, 20, 30);
     * var dst = new Mat4();
     * dst.copy(src);
     * console.log("The two matrices are " + (src.equal(dst) ? "equal" : "different"));
     */
    Mat4.prototype.clone = function () {
        return new Mat4().copy(this);
    };
    /**
     * @function
     * @name Mat4#copy
     * @description Copies the contents of a source 4x4 matrix to a destination 4x4 matrix.
     * @param {Mat4} rhs A 4x4 matrix to be copied.
     * @returns {Mat4} Self for chaining.
     * @example
     * var src = new Mat4().setFromEulerAngles(10, 20, 30);
     * var dst = new Mat4();
     * dst.copy(src);
     * console.log("The two matrices are " + (src.equal(dst) ? "equal" : "different"));
     */
    Mat4.prototype.copy = function (rhs) {
        var src = rhs.data, dst = this.data;
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        dst[4] = src[4];
        dst[5] = src[5];
        dst[6] = src[6];
        dst[7] = src[7];
        dst[8] = src[8];
        dst[9] = src[9];
        dst[10] = src[10];
        dst[11] = src[11];
        dst[12] = src[12];
        dst[13] = src[13];
        dst[14] = src[14];
        dst[15] = src[15];
        return this;
    };
    /**
     * @function
     * @name Mat4#equals
     * @description Reports whether two matrices are equal.
     * @param {Mat4} rhs The other matrix.
     * @returns {Boolean} true if the matrices are equal and false otherwise.
     * @example
     * var a = new Mat4().setFromEulerAngles(10, 20, 30);
     * var b = new Mat4();
     * console.log("The two matrices are " + (a.equals(b) ? "equal" : "different"));
     */
    Mat4.prototype.equals = function (rhs) {
        var l = this.data, r = rhs.data;
        return ((l[0] === r[0]) &&
            (l[1] === r[1]) &&
            (l[2] === r[2]) &&
            (l[3] === r[3]) &&
            (l[4] === r[4]) &&
            (l[5] === r[5]) &&
            (l[6] === r[6]) &&
            (l[7] === r[7]) &&
            (l[8] === r[8]) &&
            (l[9] === r[9]) &&
            (l[10] === r[10]) &&
            (l[11] === r[11]) &&
            (l[12] === r[12]) &&
            (l[13] === r[13]) &&
            (l[14] === r[14]) &&
            (l[15] === r[15]));
    };
    /**
     * @function
     * @name Mat4#isIdentity
     * @description Reports whether the specified matrix is the identity matrix.
     * @returns {Boolean} true if the matrix is identity and false otherwise.
     * @example
     * var m = new Mat4();
     * console.log("The matrix is " + (m.isIdentity() ? "identity" : "not identity"));
     */
    Mat4.prototype.isIdentity = function () {
        return this.equals(Mat4.IDENTITY);
        // var m = this.data;
        // return ((m[0] === 1) &&
        //     (m[1] === 0) &&
        //     (m[2] === 0) &&
        //     (m[3] === 0) &&
        //     (m[4] === 0) &&
        //     (m[5] === 1) &&
        //     (m[6] === 0) &&
        //     (m[7] === 0) &&
        //     (m[8] === 0) &&
        //     (m[9] === 0) &&
        //     (m[10] === 1) &&
        //     (m[11] === 0) &&
        //     (m[12] === 0) &&
        //     (m[13] === 0) &&
        //     (m[14] === 0) &&
        //     (m[15] === 1));
    };
    /**
     * @function
     * @name Mat4#mul2
     * @description Multiplies the specified 4x4 matrices together and stores the result in
     * the current instance.
     * @param {Mat4} lhs The 4x4 matrix used as the first multiplicand of the operation.
     * @param {Mat4} rhs The 4x4 matrix used as the second multiplicand of the operation.
     * @returns {Mat4} Self for chaining.
     * @example
     * var a = new Mat4().setFromEulerAngles(10, 20, 30);
     * var b = new Mat4().setFromAxisAngle(Vec3.UP, 180);
     * var r = new Mat4();
     *
     * // r = a * b
     * r.mul2(a, b);
     *
     * console.log("The result of the multiplication is: " r.toString());
     */
    Mat4.prototype.mul2 = function (lhs, rhs) {
        var a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33, b0, b1, b2, b3, a = lhs.data, b = rhs.data, r = this.data;
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];
        a30 = a[12];
        a31 = a[13];
        a32 = a[14];
        a33 = a[15];
        b0 = b[0];
        b1 = b[1];
        b2 = b[2];
        b3 = b[3];
        r[0] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        r[1] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        r[2] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        r[3] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;
        b0 = b[4];
        b1 = b[5];
        b2 = b[6];
        b3 = b[7];
        r[4] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        r[5] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        r[6] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        r[7] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;
        b0 = b[8];
        b1 = b[9];
        b2 = b[10];
        b3 = b[11];
        r[8] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        r[9] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        r[10] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        r[11] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;
        b0 = b[12];
        b1 = b[13];
        b2 = b[14];
        b3 = b[15];
        r[12] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        r[13] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        r[14] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        r[15] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;
        return this;
    };
    /**
     * @function
     * @name Mat4#mul
     * @description Multiplies the current instance by the specified 4x4 matrix.
     * @param {Mat4} rhs The 4x4 matrix used as the second multiplicand of the operation.
     * @returns {Mat4} Self for chaining.
     * @example
     * var a = new Mat4().setFromEulerAngles(10, 20, 30);
     * var b = new Mat4().setFromAxisAngle(Vec3.UP, 180);
     *
     * // a = a * b
     * a.mul(b);
     *
     * console.log("The result of the multiplication is: " a.toString());
     */
    Mat4.prototype.mul = function (rhs) {
        return this.mul2(this, rhs);
    };
    /**
     * @function
     * @name Mat4#transformPoint
     * @description Transforms a 3-dimensional point by a 4x4 matrix.
     * @param {Vec3} vec The 3-dimensional point to be transformed.
     * @param {Vec3} [res] "ref" An optional 3-dimensional point to receive the result of the transformation.
     * @returns {Vec3} The input point v transformed by the current instance.
     * @example
     * // Create a 3-dimensional point
     * var v = new Vec3(1, 2, 3);
     *
     * // Create a 4x4 rotation matrix
     * var m = new Mat4().setFromEulerAngles(10, 20, 30);
     *
     * var tv = m.transformPoint(v);
     */
    Mat4.prototype.transformPoint = function (vec, res) {
        var x, y, z, m = this.data, v = vec.data;
        res = (res === undefined) ? new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]() : res;
        x =
            v[0] * m[0] +
                v[1] * m[4] +
                v[2] * m[8] +
                m[12];
        y =
            v[0] * m[1] +
                v[1] * m[5] +
                v[2] * m[9] +
                m[13];
        z =
            v[0] * m[2] +
                v[1] * m[6] +
                v[2] * m[10] +
                m[14];
        return res.set(x, y, z);
    };
    /**
     * @function
     * @name Mat4#transformVector
     * @description Transforms a 3-dimensional vector by a 4x4 matrix.
     * @param {Vec3} vec The 3-dimensional vector to be transformed.
     * @param {Vec3} [res] An optional 3-dimensional vector to receive the result of the transformation.
     * @returns {Vec3} The input vector v transformed by the current instance.
     * @example
     * // Create a 3-dimensional vector
     * var v = new Vec3(1, 2, 3);
     *
     * // Create a 4x4 rotation matrix
     * var m = new Mat4().setFromEulerAngles(10, 20, 30);
     *
     * var tv = m.transformVector(v);
     */
    Mat4.prototype.transformVector = function (vec, res) {
        var x, y, z, m = this.data, v = vec.data;
        res = (res === undefined) ? new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]() : res;
        x =
            v[0] * m[0] +
                v[1] * m[4] +
                v[2] * m[8];
        y =
            v[0] * m[1] +
                v[1] * m[5] +
                v[2] * m[9];
        z =
            v[0] * m[2] +
                v[1] * m[6] +
                v[2] * m[10];
        return res.set(x, y, z);
    };
    /**
     * @function
     * @name Mat4#transformVec4
     * @description Transforms a 4-dimensional vector by a 4x4 matrix.
     * @param {Vec4} vec The 4-dimensional vector to be transformed.
     * @param {Vec4} [res] An optional 4-dimensional vector to receive the result of the transformation.
     * @returns {Vec4} The input vector v transformed by the current instance.
     * @example
     * // Create an input 4-dimensional vector
     * var v = new Vec4(1, 2, 3, 4);
     *
     * // Create an output 4-dimensional vector
     * var result = new Vec4();
     *
     * // Create a 4x4 rotation matrix
     * var m = new Mat4().setFromEulerAngles(10, 20, 30);
     *
     * m.transformVec4(v, result);
     */
    Mat4.prototype.transformVec4 = function (vec, res) {
        var x, y, z, w, m = this.data, v = vec.data;
        res = (res === undefined) ? new _vec4__WEBPACK_IMPORTED_MODULE_1__["Vec4"]() : res;
        x =
            v[0] * m[0] +
                v[1] * m[4] +
                v[2] * m[8] +
                v[3] * m[12];
        y =
            v[0] * m[1] +
                v[1] * m[5] +
                v[2] * m[9] +
                v[3] * m[13];
        z =
            v[0] * m[2] +
                v[1] * m[6] +
                v[2] * m[10] +
                v[3] * m[14];
        w =
            v[0] * m[3] +
                v[1] * m[7] +
                v[2] * m[11] +
                v[3] * m[15];
        return res.set(x, y, z, w);
    };
    /**
     * @private
     * @function
     * @name Mat4#setFrustum
     * @description Sets the specified matrix to a perspective projection matrix. The function's parameters define
     * the shape of a frustum.
     * @param {Number} left The x-coordinate for the left edge of the camera's projection plane in eye space.
     * @param {Number} right The x-coordinate for the right edge of the camera's projection plane in eye space.
     * @param {Number} bottom The y-coordinate for the bottom edge of the camera's projection plane in eye space.
     * @param {Number} top The y-coordinate for the top edge of the camera's projection plane in eye space.
     * @param {Number} znear The near clip plane in eye coordinates.
     * @param {Number} zfar The far clip plane in eye coordinates.
     * @returns {Mat4} Self for chaining.
     * @example
     * // Create a 4x4 perspective projection matrix
     * var f = Mat4().setFrustum(-2, 2, -1, 1, 1, 1000);
     */
    Mat4.prototype.setFrustum = function (left, right, bottom, top, znear, zfar) {
        var temp1, temp2, temp3, temp4, r;
        temp1 = 2 * znear;
        temp2 = right - left;
        temp3 = top - bottom;
        temp4 = zfar - znear;
        r = this.data;
        r[0] = temp1 / temp2;
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = 0;
        r[5] = temp1 / temp3;
        r[6] = 0;
        r[7] = 0;
        r[8] = (right + left) / temp2;
        r[9] = (top + bottom) / temp3;
        r[10] = (-zfar - znear) / temp4;
        r[11] = -1;
        r[12] = 0;
        r[13] = 0;
        r[14] = (-temp1 * zfar) / temp4;
        r[15] = 0;
        return this;
    };
    /**
     * @function
     * @name Mat4#setPerspective
     * @description Sets the specified matrix to a perspective projection matrix. The function's
     * parameters define the shape of a frustum.
     * @param {Number} fovy The field of view in the frustum in the Y-axis of eye space (or X axis if fovIsHorizontal is true).
     * @param {Number} aspect The aspect ratio of the frustum's projection plane (width / height).
     * @param {Number} znear The near clip plane in eye coordinates.
     * @param {Number} zfar The far clip plane in eye coordinates.
     * @returns {Mat4} Self for chaining.
     * @example
     * // Create a 4x4 perspective projection matrix
     * var persp = Mat4().setPerspective(45, 16 / 9, 1, 1000);
     */
    Mat4.prototype.setPerspective = function (fovy, aspect, znear, zfar, fovIsHorizontal) {
        var xmax, ymax;
        if (!fovIsHorizontal) {
            ymax = znear * Math.tan(fovy * Math.PI / 360);
            xmax = ymax * aspect;
        }
        else {
            xmax = znear * Math.tan(fovy * Math.PI / 360);
            ymax = xmax / aspect;
        }
        return this.setFrustum(-xmax, xmax, -ymax, ymax, znear, zfar);
    };
    /**
     * @function
     * @name Mat4#setOrtho
     * @description Sets the specified matrix to an orthographic projection matrix. The function's parameters
     * define the shape of a cuboid-shaped frustum.
     * @param {Number} left The x-coordinate for the left edge of the camera's projection plane in eye space.
     * @param {Number} right The x-coordinate for the right edge of the camera's projection plane in eye space.
     * @param {Number} bottom The y-coordinate for the bottom edge of the camera's projection plane in eye space.
     * @param {Number} top The y-coordinate for the top edge of the camera's projection plane in eye space.
     * @param {Number} znear The near clip plane in eye coordinates.
     * @param {Number} zfar The far clip plane in eye coordinates.
     * @returns {Mat4} Self for chaining.
     * @example
     * // Create a 4x4 orthographic projection matrix
     * var ortho = Mat4().ortho(-2, 2, -2, 2, 1, 1000);
     */
    Mat4.prototype.setOrtho = function (left, right, bottom, top, near, far) {
        var r = this.data;
        r[0] = 2 / (right - left);
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = 0;
        r[5] = 2 / (top - bottom);
        r[6] = 0;
        r[7] = 0;
        r[8] = 0;
        r[9] = 0;
        r[10] = -2 / (far - near);
        r[11] = 0;
        r[12] = -(right + left) / (right - left);
        r[13] = -(top + bottom) / (top - bottom);
        r[14] = -(far + near) / (far - near);
        r[15] = 1;
        return this;
    };
    /**
     * @function
     * @name Mat4#setFromAxisAngle
     * @description Sets the specified matrix to a rotation matrix equivalent to a rotation around
     * an axis. The axis must be normalized (unit length) and the angle must be specified in degrees.
     * @param {Vec3} axis The normalized axis vector around which to rotate.
     * @param {Number} angle The angle of rotation in degrees.
     * @returns {Mat4} Self for chaining.
     * @example
     * // Create a 4x4 rotation matrix
     * var rm = new Mat4().setFromAxisAngle(Vec3.UP, 90);
     */
    Mat4.prototype.setFromAxisAngle = function (axis, angle) {
        var x, y, z, c, s, t, tx, ty, m;
        angle *= _math__WEBPACK_IMPORTED_MODULE_2__["math"].DEG_TO_RAD;
        x = axis.x;
        y = axis.y;
        z = axis.z;
        c = Math.cos(angle);
        s = Math.sin(angle);
        t = 1 - c;
        tx = t * x;
        ty = t * y;
        m = this.data;
        m[0] = tx * x + c;
        m[1] = tx * y + s * z;
        m[2] = tx * z - s * y;
        m[3] = 0;
        m[4] = tx * y - s * z;
        m[5] = ty * y + c;
        m[6] = ty * z + s * x;
        m[7] = 0;
        m[8] = tx * z + s * y;
        m[9] = ty * z - x * s;
        m[10] = t * z * z + c;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;
        return this;
    };
    /**
     * @private
     * @function
     * @name Mat4#setTranslate
     * @description Sets the specified matrix to a translation matrix.
     * @param {Number} x The x-component of the translation.
     * @param {Number} y The y-component of the translation.
     * @param {Number} z The z-component of the translation.
     * @returns {Mat4} Self for chaining.
     * @example
     * // Create a 4x4 translation matrix
     * var tm = new Mat4().setTranslate(10, 10, 10);
     */
    Mat4.prototype.setTranslate = function (x, y, z) {
        var m = this.data;
        m[0] = 1;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = 1;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = 1;
        m[11] = 0;
        m[12] = x;
        m[13] = y;
        m[14] = z;
        m[15] = 1;
        return this;
    };
    /**
     * @private
     * @function
     * @name Mat4#setScale
     * @description Sets the specified matrix to a scale matrix.
     * @param {Number} x The x-component of the scale.
     * @param {Number} y The y-component of the scale.
     * @param {Number} z The z-component of the scale.
     * @returns {Mat4} Self for chaining.
     * @example
     * // Create a 4x4 scale matrix
     * var sm = new Mat4().setScale(10, 10, 10);
     */
    Mat4.prototype.setScale = function (x, y, z) {
        var m = this.data;
        m[0] = x;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = y;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = z;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;
        return this;
    };
    /**
     * @function
     * @name Mat4#invert
     * @description Sets the specified matrix to its inverse.
     * @returns {Mat4} Self for chaining.
     * @example
     * // Create a 4x4 rotation matrix of 180 degrees around the y-axis
     * var rot = new Mat4().setFromAxisAngle(Vec3.UP, 180);
     *
     * // Invert in place
     * rot.invert();
     */
    Mat4.prototype.invert = function () {
        var a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33, b00, b01, b02, b03, b04, b05, b06, b07, b08, b09, b10, b11, det, invDet, m;
        m = this.data;
        a00 = m[0];
        a01 = m[1];
        a02 = m[2];
        a03 = m[3];
        a10 = m[4];
        a11 = m[5];
        a12 = m[6];
        a13 = m[7];
        a20 = m[8];
        a21 = m[9];
        a22 = m[10];
        a23 = m[11];
        a30 = m[12];
        a31 = m[13];
        a32 = m[14];
        a33 = m[15];
        b00 = a00 * a11 - a01 * a10;
        b01 = a00 * a12 - a02 * a10;
        b02 = a00 * a13 - a03 * a10;
        b03 = a01 * a12 - a02 * a11;
        b04 = a01 * a13 - a03 * a11;
        b05 = a02 * a13 - a03 * a12;
        b06 = a20 * a31 - a21 * a30;
        b07 = a20 * a32 - a22 * a30;
        b08 = a20 * a33 - a23 * a30;
        b09 = a21 * a32 - a22 * a31;
        b10 = a21 * a33 - a23 * a31;
        b11 = a22 * a33 - a23 * a32;
        det = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);
        if (det === 0) {
            // #ifdef DEBUG
            console.warn("pc.Mat4#invert: Can't invert matrix, determinant is 0");
            // #endif
            this.setIdentity();
        }
        else {
            invDet = 1 / det;
            m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
            m[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
            m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
            m[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
            m[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
            m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
            m[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
            m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
            m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
            m[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
            m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
            m[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
            m[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
            m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
            m[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
            m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
        }
        return this;
    };
    /**
     * @function
     * @name Mat4#set
     * @description Sets matrix data from an array.
     * @param {Array} Source array. Must have 16 values.
     */
    Mat4.prototype.set = function (src) {
        var dst = this.data;
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        dst[4] = src[4];
        dst[5] = src[5];
        dst[6] = src[6];
        dst[7] = src[7];
        dst[8] = src[8];
        dst[9] = src[9];
        dst[10] = src[10];
        dst[11] = src[11];
        dst[12] = src[12];
        dst[13] = src[13];
        dst[14] = src[14];
        dst[15] = src[15];
        return this;
    };
    /**
     * @function
     * @name Mat4#setIdentity
     * @description Sets the specified matrix to the identity matrix.
     * @returns {Mat4} Self for chaining.
     * @example
     * m.setIdentity();
     * console.log("The two matrices are " + (src.equal(dst) ? "equal" : "different"));
     */
    Mat4.prototype.setIdentity = function () {
        var m = this.data;
        m[0] = 1;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = 1;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = 1;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;
        return this;
    };
    /**
     * @function
     * @name Mat4#setTRS
     * @description Sets the specified matrix to the concatenation of a translation, a
     * quaternion rotation and a scale.
     * @param {Vec3} t A 3-d vector translation.
     * @param {Quat} r A quaternion rotation.
     * @param {Vec3} s A 3-d vector scale.
     * @returns {Mat4} Self for chaining.
     * @example
     * var t = new Vec3(10, 20, 30);
     * var r = new Quat();
     * var s = new Vec3(2, 2, 2);
     *
     * var m = new Mat4();
     * m.setTRS(t, r, s);
     */
    Mat4.prototype.setTRS = function (t, r, s) {
        var tx, ty, tz, qx, qy, qz, qw, sx, sy, sz, x2, y2, z2, xx, xy, xz, yy, yz, zz, wx, wy, wz, m;
        tx = t.x;
        ty = t.y;
        tz = t.z;
        qx = r.x;
        qy = r.y;
        qz = r.z;
        qw = r.w;
        sx = s.x;
        sy = s.y;
        sz = s.z;
        x2 = qx + qx;
        y2 = qy + qy;
        z2 = qz + qz;
        xx = qx * x2;
        xy = qx * y2;
        xz = qx * z2;
        yy = qy * y2;
        yz = qy * z2;
        zz = qz * z2;
        wx = qw * x2;
        wy = qw * y2;
        wz = qw * z2;
        m = this.data;
        m[0] = (1 - (yy + zz)) * sx;
        m[1] = (xy + wz) * sx;
        m[2] = (xz - wy) * sx;
        m[3] = 0;
        m[4] = (xy - wz) * sy;
        m[5] = (1 - (xx + zz)) * sy;
        m[6] = (yz + wx) * sy;
        m[7] = 0;
        m[8] = (xz + wy) * sz;
        m[9] = (yz - wx) * sz;
        m[10] = (1 - (xx + yy)) * sz;
        m[11] = 0;
        m[12] = tx;
        m[13] = ty;
        m[14] = tz;
        m[15] = 1;
        return this;
    };
    /**
     * @function
     * @name Mat4#transpose
     * @description Sets the specified matrix to its transpose.
     * @returns {Mat4} Self for chaining.
     * @example
     * var m = new Mat4();
     *
     * // Transpose in place
     * m.transpose();
     */
    Mat4.prototype.transpose = function () {
        var tmp, m = this.data;
        tmp = m[1];
        m[1] = m[4];
        m[4] = tmp;
        tmp = m[2];
        m[2] = m[8];
        m[8] = tmp;
        tmp = m[3];
        m[3] = m[12];
        m[12] = tmp;
        tmp = m[6];
        m[6] = m[9];
        m[9] = tmp;
        tmp = m[7];
        m[7] = m[13];
        m[13] = tmp;
        tmp = m[11];
        m[11] = m[14];
        m[14] = tmp;
        return this;
    };
    Mat4.prototype.invertTo3x3 = function (res) {
        var a11, a21, a31, a12, a22, a32, a13, a23, a33, m, r, det, idet;
        m = this.data;
        r = res.data;
        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m8 = m[8];
        var m9 = m[9];
        var m10 = m[10];
        a11 = m10 * m5 - m6 * m9;
        a21 = -m10 * m1 + m2 * m9;
        a31 = m6 * m1 - m2 * m5;
        a12 = -m10 * m4 + m6 * m8;
        a22 = m10 * m0 - m2 * m8;
        a32 = -m6 * m0 + m2 * m4;
        a13 = m9 * m4 - m5 * m8;
        a23 = -m9 * m0 + m1 * m8;
        a33 = m5 * m0 - m1 * m4;
        det = m0 * a11 + m1 * a12 + m2 * a13;
        if (det === 0) { // no inverse
            // #ifdef DEBUG
            console.warn("pc.Mat4#invertTo3x3: Can't invert matrix, determinant is 0");
            // #endif
            return this;
        }
        idet = 1 / det;
        r[0] = idet * a11;
        r[1] = idet * a21;
        r[2] = idet * a31;
        r[3] = idet * a12;
        r[4] = idet * a22;
        r[5] = idet * a32;
        r[6] = idet * a13;
        r[7] = idet * a23;
        r[8] = idet * a33;
        return this;
    };
    /**
     * @function
     * @name Mat4#getTranslation
     * @description Extracts the translational component from the specified 4x4 matrix.
     * @param {Vec3} [t] The vector to receive the translation of the matrix.
     * @returns {Vec3} The translation of the specified 4x4 matrix.
     * @example
     * // Create a 4x4 matrix
     * var m = new Mat4();
     *
     * // Query the z-axis component
     * var t = new Vec3();
     * m.getTranslation(t);
     */
    Mat4.prototype.getTranslation = function (t) {
        t = (t === undefined) ? new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]() : t;
        return t.set(this.data[12], this.data[13], this.data[14]);
    };
    /**
     * @function
     * @name Mat4#getX
     * @description Extracts the x-axis from the specified 4x4 matrix.
     * @param {Vec3} [x] The vector to receive the x axis of the matrix.
     * @returns {Vec3} The x-axis of the specified 4x4 matrix.
     * @example
     * // Create a 4x4 matrix
     * var m = new Mat4();
     *
     * // Query the z-axis component
     * var x = new Vec3();
     * m.getX(x);
     */
    Mat4.prototype.getX = function (x) {
        x = (x === undefined) ? new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]() : x;
        return x.set(this.data[0], this.data[1], this.data[2]);
    };
    /**
     * @function
     * @name Mat4#getY
     * @description Extracts the y-axis from the specified 4x4 matrix.
     * @param {Vec3} [y] The vector to receive the y axis of the matrix.
     * @returns {Vec3} The y-axis of the specified 4x4 matrix.
     * @example
     * // Create a 4x4 matrix
     * var m = new Mat4();
     *
     * // Query the z-axis component
     * var y = new Vec3();
     * m.getY(y);
     */
    Mat4.prototype.getY = function (y) {
        y = (y === undefined) ? new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]() : y;
        return y.set(this.data[4], this.data[5], this.data[6]);
    };
    /**
     * @function
     * @name Mat4#getZ
     * @description Extracts the z-axis from the specified 4x4 matrix.
     * @param {Vec3} [z] The vector to receive the z axis of the matrix.
     * @returns {Vec3} The z-axis of the specified 4x4 matrix.
     * @example
     * // Create a 4x4 matrix
     * var m = new Mat4();
     *
     * // Query the z-axis component
     * var z = new Vec3();
     * m.getZ(z);
     */
    Mat4.prototype.getZ = function (z) {
        z = (z === undefined) ? new _vec3__WEBPACK_IMPORTED_MODULE_0__["Vec3"]() : z;
        return z.set(this.data[8], this.data[9], this.data[10]);
    };
    /**
     * @function
     * @name Mat4#setFromEulerAngles
     * @description Sets the specified matrix to a rotation matrix defined by
     * Euler angles. The Euler angles are specified in XYZ order and in degrees.
     * @param {Number} ex Angle to rotate around X axis in degrees.
     * @param {Number} ey Angle to rotate around Y axis in degrees.
     * @param {Number} ez Angle to rotate around Z axis in degrees.
     * @returns {Mat4} Self for chaining.
     * @example
     * var m = new Mat4();
     * m.setFromEulerAngles(45, 90, 180);
     */
    // http://en.wikipedia.org/wiki/Rotation_matrix#Conversion_from_and_to_axis-angle
    // The 3D space is right-handed, so the rotation around each axis will be counterclockwise
    // for an observer placed so that the axis goes in his or her direction (Right-hand rule).
    Mat4.prototype.setFromEulerAngles = function (ex, ey, ez) {
        var s1, c1, s2, c2, s3, c3, m;
        ex *= _math__WEBPACK_IMPORTED_MODULE_2__["math"].DEG_TO_RAD;
        ey *= _math__WEBPACK_IMPORTED_MODULE_2__["math"].DEG_TO_RAD;
        ez *= _math__WEBPACK_IMPORTED_MODULE_2__["math"].DEG_TO_RAD;
        // Solution taken from http://en.wikipedia.org/wiki/Euler_angles#Matrix_orientation
        s1 = Math.sin(-ex);
        c1 = Math.cos(-ex);
        s2 = Math.sin(-ey);
        c2 = Math.cos(-ey);
        s3 = Math.sin(-ez);
        c3 = Math.cos(-ez);
        m = this.data;
        // Set rotation elements
        m[0] = c2 * c3;
        m[1] = -c2 * s3;
        m[2] = s2;
        m[3] = 0;
        m[4] = c1 * s3 + c3 * s1 * s2;
        m[5] = c1 * c3 - s1 * s2 * s3;
        m[6] = -c2 * s1;
        m[7] = 0;
        m[8] = s1 * s3 - c1 * c3 * s2;
        m[9] = c3 * s1 + c1 * s2 * s3;
        m[10] = c1 * c2;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;
        return this;
    };
    /**
     * @function
     * @name Mat4#toString
     * @description Converts the specified matrix to string form.
     * @returns {String} The matrix in string form.
     * @example
     * var m = new Mat4();
     * // Should output '[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]'
     * console.log(m.toString());
     */
    Mat4.prototype.toString = function () {
        var i, t;
        t = '[';
        for (i = 0; i < 16; i += 1) {
            t += this.data[i];
            t += (i !== 15) ? ', ' : '';
        }
        t += ']';
        return t;
    };
    /**
     * @field
     * @static
     * @readonly
     * @type Mat4
     * @name Mat4.IDENTITY
     * @description A constant matrix set to the identity.
     */
    Mat4.IDENTITY = new Mat4();
    /**
     * @field
     * @static
     * @readonly
     * @type Mat4
     * @name Mat4.ZERO
     * @description A constant matrix with all elements set to 0.
     */
    Mat4.ZERO = new Mat4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    return Mat4;
}());



/***/ }),

/***/ "./src/math/math.ts":
/*!**************************!*\
  !*** ./src/math/math.ts ***!
  \**************************/
/*! exports provided: math */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "math", function() { return math; });
/**
 * @name math
 * @namespace
 * @description Math API
 */
var math = {
    /**
     * @name math.DEG_TO_RAD
     * @description Conversion factor between degrees and radians
     * @type Number
     * @example
     * // Convert 180 degrees to pi radians
     * var rad = 180 * math.DEG_TO_RAD;
     */
    DEG_TO_RAD: Math.PI / 180,
    /**
     * @name math.RAD_TO_DEG
     * @description Conversion factor between degrees and radians
     * @type Number
     * @example
     * // Convert pi radians to 180 degrees
     * var deg = Math.PI * math.RAD_TO_DEG;
     */
    RAD_TO_DEG: 180 / Math.PI,
    /**
    * @name math.INV_LOG2
    * @description Inverse log 2
    * @type Number
    */
    INV_LOG2: 1 / Math.log(2),
    /**
     * @function
     * @name math.clamp
     * @description Clamp a number between min and max inclusive.
     * @param {Number} value Number to clamp
     * @param {Number} min Min value
     * @param {Number} max Max value
     * @returns {Number} The clamped value
     */
    clamp: function (value, min, max) {
        if (value >= max)
            return max;
        if (value <= min)
            return min;
        return value;
    },
    /**
     * @function
     * @name math.intToBytes24
     * @description Convert an 24 bit integer into an array of 3 bytes.
     * @param {Number} i Number holding an integer value
     * @returns {Number[]} An array of 3 bytes.
     * @example
     * // Set bytes to [0x11, 0x22, 0x33]
     * var bytes = math.intToBytes24(0x112233);
     */
    intToBytes24: function (i) {
        var r, g, b;
        r = (i >> 16) & 0xff;
        g = (i >> 8) & 0xff;
        b = (i) & 0xff;
        return [r, g, b];
    },
    /**
     * @function
     * @name math.intToBytes32
     * @description Convert an 32 bit integer into an array of 4 bytes.
     * @returns {Number[]} An array of 4 bytes
     * @param {Number} i Number holding an integer value
     * @example
     * // Set bytes to [0x11, 0x22, 0x33, 0x44]
     * var bytes = math.intToBytes32(0x11223344);
     */
    intToBytes32: function (i) {
        var r, g, b, a;
        r = (i >> 24) & 0xff;
        g = (i >> 16) & 0xff;
        b = (i >> 8) & 0xff;
        a = (i) & 0xff;
        return [r, g, b, a];
    },
    /**
     * @function
     * @name math.bytesToInt24
     * @description Convert 3 8 bit Numbers into a single unsigned 24 bit Number.
     * @example
     * // Set result1 to 0x112233 from an array of 3 values
     * var result1 = math.bytesToInt24([0x11, 0x22, 0x33]);
     *
     * // Set result2 to 0x112233 from 3 discrete values
     * var result2 = math.bytesToInt24(0x11, 0x22, 0x33);
     * @param {Number} r A single byte (0-255)
     * @param {Number} g A single byte (0-255)
     * @param {Number} b A single byte (0-255)
     * @returns {Number} A single unsigned 24 bit Number.
     */
    bytesToInt24: function (r, g, b) {
        if (Array.isArray(r)) {
            b = r[2];
            g = r[1];
            r = r[0];
        }
        return ((r << 16) | (g << 8) | b);
    },
    /**
     * @function
     * @name math.bytesToInt32
     * @description Convert 4 1-byte Numbers into a single unsigned 32bit Number.
     * @returns {Number} A single unsigned 32bit Number.
     * @example
      * // Set result1 to 0x11223344 from an array of 4 values
      * var result1 = math.bytesToInt32([0x11, 0x22, 0x33, 0x44]);
      *
      * // Set result2 to 0x11223344 from 4 discrete values
      * var result2 = math.bytesToInt32(0x11, 0x22, 0x33, 0x44);
     * @param {Number} r A single byte (0-255)
     * @param {Number} g A single byte (0-255)
     * @param {Number} b A single byte (0-255)
     * @param {Number} a A single byte (0-255)
     */
    bytesToInt32: function (r, g, b, a) {
        if (Array.isArray(r)) {
            a = r[3];
            b = r[2];
            g = r[1];
            r = r[0];
        }
        // Why ((r << 24)>>>32)?
        // << operator uses signed 32 bit numbers, so 128<<24 is negative.
        // >>> used unsigned so >>>32 converts back to an unsigned.
        // See http://stackoverflow.com/questions/1908492/unsigned-integer-in-javascript
        return ((r << 24) | (g << 16) | (b << 8) | a) >>> 32;
    },
    /**
     * @function
     * @name math.lerp
     * @returns {Number} The linear interpolation of two numbers.
     * @description Calculates the linear interpolation of two numbers.
     * @param {Number} a Number to linearly interpolate from.
     * @param {Number} b Number to linearly interpolate to.
     * @param {Number} alpha The value controlling the result of interpolation. When alpha is 0,
     * a is returned. When alpha is 1, b is returned. Between 0 and 1, a linear interpolation between
     * a and b is returned. alpha is clamped between 0 and 1.
     */
    lerp: function (a, b, alpha) {
        return a + (b - a) * math.clamp(alpha, 0, 1);
    },
    /**
     * @function
     * @name math.lerpAngle
     * @description Calculates the linear interpolation of two angles ensuring that interpolation
     * is correctly performed across the 360 to 0 degree boundary. Angles are supplied in degrees.
     * @returns {Number} The linear interpolation of two angles
     * @param {Number} a Angle (in degrees) to linearly interpolate from.
     * @param {Number} b Angle (in degrees) to linearly interpolate to.
     * @param {Number} alpha The value controlling the result of interpolation. When alpha is 0,
     * a is returned. When alpha is 1, b is returned. Between 0 and 1, a linear interpolation between
     * a and b is returned. alpha is clamped between 0 and 1.
     */
    lerpAngle: function (a, b, alpha) {
        if (b - a > 180) {
            b -= 360;
        }
        if (b - a < -180) {
            b += 360;
        }
        return math.lerp(a, b, math.clamp(alpha, 0, 1));
    },
    /**
     * @function
     * @name math.powerOfTwo
     * @description Returns true if argument is a power-of-two and false otherwise.
     * @param {Number} x Number to check for power-of-two property.
     * @returns {Boolean} true if power-of-two and false otherwise.
     */
    powerOfTwo: function (x) {
        return ((x !== 0) && !(x & (x - 1)));
    },
    /**
     * @function
     * @name math.nextPowerOfTwo
     * @description Returns the next power of 2 for the specified value.
     * @param {Number} val The value for which to calculate the next power of 2.
     * @returns {Number} The next power of 2.
     */
    nextPowerOfTwo: function (val) {
        val--;
        val = (val >> 1) | val;
        val = (val >> 2) | val;
        val = (val >> 4) | val;
        val = (val >> 8) | val;
        val = (val >> 16) | val;
        val++;
        return val;
    },
    /**
     * @function
     * @name math.random
     * @description Return a pseudo-random number between min and max.
     * The number generated is in the range [min, max), that is inclusive of the minimum but exclusive of the maximum.
     * @param {Number} min Lower bound for range.
     * @param {Number} max Upper bound for range.
     * @returns {Number} Pseudo-random number between the supplied range.
     */
    random: function (min, max) {
        var diff = max - min;
        return Math.random() * diff + min;
    },
    /**
     * @function
     * @name math.smoothstep
     * @description The function interpolates smoothly between two input values based on
     * a third one that should be between the first two. The returned value is clamped
     * between 0 and 1.
     * <br/>The slope (i.e. derivative) of the smoothstep function starts at 0 and ends at 0.
     * This makes it easy to create a sequence of transitions using smoothstep to interpolate
     * each segment rather than using a more sophisticated or expensive interpolation technique.
     * <br/>See http://en.wikipedia.org/wiki/Smoothstep for more details.
     * @param {Number} min The lower bound of the interpolation range.
     * @param {Number} max The upper bound of the interpolation range.
     * @param {Number} x The value to interpolate.
     * @returns {Number} The smoothly interpolated value clamped between zero and one.
     */
    smoothstep: function (min, max, x) {
        if (x <= min)
            return 0;
        if (x >= max)
            return 1;
        x = (x - min) / (max - min);
        return x * x * (3 - 2 * x);
    },
    /**
     * @function
     * @name math.smootherstep
     * @description An improved version of the math.smoothstep function which has zero
     * 1st and 2nd order derivatives at t=0 and t=1.
     * <br/>See http://en.wikipedia.org/wiki/Smoothstep for more details.
     * @param {Number} min The lower bound of the interpolation range.
     * @param {Number} max The upper bound of the interpolation range.
     * @param {Number} x The value to interpolate.
     * @returns {Number} The smoothly interpolated value clamped between zero and one.
     */
    smootherstep: function (min, max, x) {
        if (x <= min)
            return 0;
        if (x >= max)
            return 1;
        x = (x - min) / (max - min);
        return x * x * x * (x * (x * 6 - 15) + 10);
    }
};
// math.intToBytes = math.intToBytes32;
// math.bytesToInt = math.bytesToInt32;
// IE doesn't have native log2
if (!Math.log2) {
    Math.log2 = function (x) {
        return Math.log(x) * math.INV_LOG2;
    };
}


/***/ }),

/***/ "./src/math/vec3.ts":
/*!**************************!*\
  !*** ./src/math/vec3.ts ***!
  \**************************/
/*! exports provided: Vec3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vec3", function() { return Vec3; });
/**
* @name Vec3
* @class A 3-dimensional vector.
* @description Creates a new Vec3 object
* @param {Number} [x] The x value. If x is an array of length 3, the array will be used to populate all components.
* @param {Number} [y] The y value
* @param {Number} [z] The z value
* @example
* var v = new Vec3(1,2,3);
*/
var Vec3 = /** @class */ (function () {
    function Vec3(x, y, z) {
        if (x && x.length === 3) {
            this.data = new Float32Array(x);
            return;
        }
        this.data = new Float32Array(3);
        this.data[0] = x || 0;
        this.data[1] = y || 0;
        this.data[2] = z || 0;
    }
    /**
     * @function
     * @name Vec3#add
     * @description Adds a 3-dimensional vector to another in place.
     * @param {Vec3} rhs The vector to add to the specified vector.
     * @returns {Vec3} Self for chaining.
     * @example
     * var a = new Vec3(10, 10, 10);
     * var b = new Vec3(20, 20, 20);
     *
     * a.add(b);
     *
     * // Should output [30, 30, 30]
     * console.log("The result of the addition is: " + a.toString());
     */
    Vec3.prototype.add = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] += b[0];
        a[1] += b[1];
        a[2] += b[2];
        return this;
    };
    /**
     * @function
     * @name Vec3#add2
     * @description Adds two 3-dimensional vectors together and returns the result.
     * @param {Vec3} lhs The first vector operand for the addition.
     * @param {Vec3} rhs The second vector operand for the addition.
     * @returns {Vec3} Self for chaining.
     * @example
     * var a = new Vec3(10, 10, 10);
     * var b = new Vec3(20, 20, 20);
     * var r = new Vec3();
     *
     * r.add2(a, b);
     * // Should output [30, 30, 30]
     *
     * console.log("The result of the addition is: " + r.toString());
     */
    Vec3.prototype.add2 = function (lhs, rhs) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        r[2] = a[2] + b[2];
        return this;
    };
    /**
     * @function
     * @name Vec3#clone
     * @description Returns an identical copy of the specified 3-dimensional vector.
     * @returns {Vec3} A 3-dimensional vector containing the result of the cloning.
     * @example
     * var v = new Vec3(10, 20, 30);
     * var vclone = v.clone();
     * console.log("The result of the cloning is: " + vclone.toString());
     */
    Vec3.prototype.clone = function () {
        return new Vec3().copy(this);
    };
    /**
     * @function
     * @name Vec3#copy
     * @description Copied the contents of a source 3-dimensional vector to a destination 3-dimensional vector.
     * @param {Vec3} rhs A vector to copy to the specified vector.
     * @returns {Vec3} Self for chaining.
     * @example
     * var src = new Vec3(10, 20, 30);
     * var dst = new Vec3();
     *
     * dst.copy(src);
     *
     * console.log("The two vectors are " + (dst.equals(src) ? "equal" : "different"));
     */
    Vec3.prototype.copy = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        return this;
    };
    /**
     * @function
     * @name Vec3#cross
     * @description Returns the result of a cross product operation performed on the two specified 3-dimensional vectors.
     * @param {Vec3} lhs The first 3-dimensional vector operand of the cross product.
     * @param {Vec3} rhs The second 3-dimensional vector operand of the cross product.
     * @returns {Vec3} Self for chaining.
     * @example
     * var back = new Vec3().cross(Vec3.RIGHT, Vec3.UP);
     *
     * // Should print the Z axis (i.e. [0, 0, 1])
     * console.log("The result of the cross product is: " + back.toString());
     */
    Vec3.prototype.cross = function (lhs, rhs) {
        var a, b, r, ax, ay, az, bx, by, bz;
        a = lhs.data;
        b = rhs.data;
        r = this.data;
        ax = a[0];
        ay = a[1];
        az = a[2];
        bx = b[0];
        by = b[1];
        bz = b[2];
        r[0] = ay * bz - by * az;
        r[1] = az * bx - bz * ax;
        r[2] = ax * by - bx * ay;
        return this;
    };
    /**
     * @function
     * @name Vec3#dot
     * @description Returns the result of a dot product operation performed on the two specified 3-dimensional vectors.
     * @param {Vec3} rhs The second 3-dimensional vector operand of the dot product.
     * @returns {Number} The result of the dot product operation.
     * @example
     * var v1 = new Vec3(5, 10, 20);
     * var v2 = new Vec3(10, 20, 40);
     * var v1dotv2 = v1.dot(v2);
     * console.log("The result of the dot product is: " + v1dotv2);
     */
    Vec3.prototype.dot = function (rhs) {
        var a = this.data, b = rhs.data;
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    };
    /**
     * @function
     * @name Vec3#equals
     * @description Reports whether two vectors are equal.
     * @param {Vec3} rhs The vector to compare to the specified vector.
     * @returns {Boolean} true if the vectors are equal and false otherwise.
     * @example
     * var a = new Vec3(1, 2, 3);
     * var b = new Vec3(4, 5, 6);
     * console.log("The two vectors are " + (a.equals(b) ? "equal" : "different"));
     */
    Vec3.prototype.equals = function (rhs) {
        var a = this.data, b = rhs.data;
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    };
    /**
     * @function
     * @name Vec3#length
     * @description Returns the magnitude of the specified 3-dimensional vector.
     * @returns {Number} The magnitude of the specified 3-dimensional vector.
     * @example
     * var vec = new Vec3(3, 4, 0);
     * var len = vec.length();
     * // Should output 5
     * console.log("The length of the vector is: " + len);
     */
    Vec3.prototype.length = function () {
        var v = this.data;
        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    };
    /**
     * @function
     * @name Vec3#lengthSq
     * @description Returns the magnitude squared of the specified 3-dimensional vector.
     * @returns {Number} The magnitude of the specified 3-dimensional vector.
     * @example
     * var vec = new Vec3(3, 4, 0);
     * var len = vec.lengthSq();
     * // Should output 25
     * console.log("The length squared of the vector is: " + len);
     */
    Vec3.prototype.lengthSq = function () {
        var v = this.data;
        return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
    };
    /**
     * @function
     * @name Vec3#lerp
     * @description Returns the result of a linear interpolation between two specified 3-dimensional vectors.
     * @param {Vec3} lhs The 3-dimensional to interpolate from.
     * @param {Vec3} rhs The 3-dimensional to interpolate to.
     * @param {Number} alpha The value controlling the point of interpolation. Between 0 and 1, the linear interpolant
     * will occur on a straight line between lhs and rhs. Outside of this range, the linear interpolant will occur on
     * a ray extrapolated from this line.
     * @returns {Vec3} Self for chaining.
     * @example
     * var a = new Vec3(0, 0, 0);
     * var b = new Vec3(10, 10, 10);
     * var r = new Vec3();
     *
     * r.lerp(a, b, 0);   // r is equal to a
     * r.lerp(a, b, 0.5); // r is 5, 5, 5
     * r.lerp(a, b, 1);   // r is equal to b
     */
    Vec3.prototype.lerp = function (lhs, rhs, alpha) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] + alpha * (b[0] - a[0]);
        r[1] = a[1] + alpha * (b[1] - a[1]);
        r[2] = a[2] + alpha * (b[2] - a[2]);
        return this;
    };
    /**
     * @function
     * @name Vec3#mul
     * @description Multiplies a 3-dimensional vector to another in place.
     * @param {Vec3} rhs The 3-dimensional vector used as the second multiplicand of the operation.
     * @returns {Vec3} Self for chaining.
     * @example
     * var a = new Vec3(2, 3, 4);
     * var b = new Vec3(4, 5, 6);
     *
     * a.mul(b);
     *
     * // Should output 8, 15, 24
     * console.log("The result of the multiplication is: " + a.toString());
     */
    Vec3.prototype.mul = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] *= b[0];
        a[1] *= b[1];
        a[2] *= b[2];
        return this;
    };
    /**
     * @function
     * @name Vec3#mul2
     * @description Returns the result of multiplying the specified 3-dimensional vectors together.
     * @param {Vec3} lhs The 3-dimensional vector used as the first multiplicand of the operation.
     * @param {Vec3} rhs The 3-dimensional vector used as the second multiplicand of the operation.
     * @returns {Vec3} Self for chaining.
     * @example
     * var a = new Vec3(2, 3, 4);
     * var b = new Vec3(4, 5, 6);
     * var r = new Vec3();
     *
     * r.mul2(a, b);
     *
     * // Should output 8, 15, 24
     * console.log("The result of the multiplication is: " + r.toString());
     */
    Vec3.prototype.mul2 = function (lhs, rhs) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] * b[0];
        r[1] = a[1] * b[1];
        r[2] = a[2] * b[2];
        return this;
    };
    /**
     * @function
     * @name Vec3#normalize
     * @description Returns the specified 3-dimensional vector copied and converted to a unit vector.
     * If the vector has a length of zero, the vector's elements will be set to zero.
     * @returns {Vec3} The result of the normalization.
     * @example
     * var v = new Vec3(25, 0, 0);
     *
     * v.normalize();
     *
     * // Should output 1, 0, 0, 0
     * console.log("The result of the vector normalization is: " + v.toString());
     */
    Vec3.prototype.normalize = function () {
        var v = this.data;
        var lengthSq = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
        if (lengthSq > 0) {
            var invLength = 1 / Math.sqrt(lengthSq);
            v[0] *= invLength;
            v[1] *= invLength;
            v[2] *= invLength;
        }
        return this;
    };
    /**
     * @function
     * @name  Vec3#project
     * @description Projects this 3-dimensional vector onto the specified vector.
     * @param {Vec3} rhs The vector onto which the original vector will be projected on.
     * @returns {Vec3} Self for chaining.
     * @example
     * var v = new Vec3(5, 5, 5);
     * var normal = new Vec3(1, 0, 0);
     *
     * v.project(normal);
     *
     * // Should output 5, 0, 0
     * console.log("The result of the vector projection is: " + v.toString());
     */
    Vec3.prototype.project = function (rhs) {
        var a = this.data;
        var b = rhs.data;
        var a_dot_b = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        var b_dot_b = b[0] * b[0] + b[1] * b[1] + b[2] * b[2];
        var s = a_dot_b / b_dot_b;
        a[0] = b[0] * s;
        a[1] = b[1] * s;
        a[2] = b[2] * s;
        return this;
    };
    /**
     * @function
     * @name Vec3#scale
     * @description Scales each dimension of the specified 3-dimensional vector by the supplied
     * scalar value.
     * @param {Number} scalar The value by which each vector component is multiplied.
     * @returns {Vec3} Self for chaining.
     * @example
     * var v = new Vec3(2, 4, 8);
     *
     * // Multiply by 2
     * v.scale(2);
     *
     * // Negate
     * v.scale(-1);
     *
     * // Divide by 2
     * v.scale(0.5);
     */
    Vec3.prototype.scale = function (scalar) {
        var v = this.data;
        v[0] *= scalar;
        v[1] *= scalar;
        v[2] *= scalar;
        return this;
    };
    /**
     * @function
     * @name Vec3#set
     * @description Sets the specified 3-dimensional vector to the supplied numerical values.
     * @param {Number} x The value to set on the first component of the vector.
     * @param {Number} y The value to set on the second component of the vector.
     * @param {Number} z The value to set on the third component of the vector.
     * @example
     * var v = new Vec3();
     * v.set(5, 10, 20);
     *
     * // Should output 5, 10, 20
     * console.log("The result of the vector set is: " + v.toString());
     */
    Vec3.prototype.set = function (x, y, z) {
        var v = this.data;
        v[0] = x;
        v[1] = y;
        v[2] = z;
        return this;
    };
    /**
     * @function
     * @name Vec3#sub
     * @description Subtracts a 3-dimensional vector from another in place.
     * @param {Vec3} rhs The vector to add to the specified vector.
     * @returns {Vec3} Self for chaining.
     * @example
     * var a = new Vec3(10, 10, 10);
     * var b = new Vec3(20, 20, 20);
     *
     * a.sub(b);
     *
     * // Should output [-10, -10, -10]
     * console.log("The result of the addition is: " + a.toString());
     */
    Vec3.prototype.sub = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] -= b[0];
        a[1] -= b[1];
        a[2] -= b[2];
        return this;
    };
    /**
     * @function
     * @name Vec3#sub2
     * @description Subtracts two 3-dimensional vectors from one another and returns the result.
     * @param {Vec3} lhs The first vector operand for the addition.
     * @param {Vec3} rhs The second vector operand for the addition.
     * @returns {Vec3} Self for chaining.
     * @example
     * var a = new Vec3(10, 10, 10);
     * var b = new Vec3(20, 20, 20);
     * var r = new Vec3();
     *
     * r.sub2(a, b);
     *
     * // Should output [-10, -10, -10]
     * console.log("The result of the addition is: " + r.toString());
     */
    Vec3.prototype.sub2 = function (lhs, rhs) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];
        r[2] = a[2] - b[2];
        return this;
    };
    /**
     * @function
     * @name Vec3#toString
     * @description Converts the vector to string form.
     * @returns {String} The vector in string form.
     * @example
     * var v = new Vec3(20, 10, 5);
     * // Should output '[20, 10, 5]'
     * console.log(v.toString());
     */
    Vec3.prototype.toString = function () {
        return "[" + this.data[0] + ", " + this.data[1] + ", " + this.data[2] + "]";
    };
    Object.defineProperty(Vec3.prototype, "x", {
        /**
         * @name Vec3#x
         * @type Number
         * @description The first component of the vector.
         * @example
         * var vec = new Vec3(10, 20, 30);
         *
         * // Get x
         * var x = vec.x;
         *
         * // Set x
         * vec.x = 0;
         */
        get: function () {
            return this.data[0];
        },
        set: function (value) {
            this.data[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Vec3.prototype, "y", {
        /**
         * @name Vec3#y
         * @type Number
         * @description The second component of the vector.
         * @example
         * var vec = new Vec3(10, 20, 30);
         *
         * // Get y
         * var y = vec.y;
         *
         * // Set y
         * vec.y = 0;
         */
        get: function () {
            return this.data[1];
        },
        set: function (value) {
            this.data[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Vec3.prototype, "z", {
        /**
         * @name Vec3#z
         * @type Number
         * @description The third component of the vector.
         * @example
         * var vec = new Vec3(10, 20, 30);
         *
         * // Get z
         * var z = vec.z;
         *
         * // Set z
         * vec.z = 0;
         */
        get: function () {
            return this.data[2];
        },
        set: function (value) {
            this.data[2] = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * @static
     * @readonly
     * @type Vec3
     * @name Vec3.BACK
     * @description A constant vector set to [0, 0, 1].
     */
    Vec3.BACK = new Vec3(0, 0, 1);
    /**
     * @static
     * @readonly
     * @type Vec3
     * @name Vec3.DOWN
     * @description A constant vector set to [0, -1, 0].
     */
    Vec3.DOWN = new Vec3(0, -1, 0);
    /**
     * @static
     * @readonly
     * @type Vec3
     * @name Vec3.FORWARD
     * @description A constant vector set to [0, 0, -1].
     */
    Vec3.FORWARD = new Vec3(0, 0, -1);
    /**
     * @field
     * @static
     * @readonly
     * @type Vec3
     * @name Vec3.LEFT
     * @description A constant vector set to [-1, 0, 0].
     */
    Vec3.LEFT = new Vec3(-1, 0, 0);
    /**
     * @field
     * @static
     * @readonly
     * @type Vec3
     * @name Vec3.ONE
     * @description A constant vector set to [1, 1, 1].
     */
    Vec3.ONE = new Vec3(1, 1, 1);
    /**
     * @field
     * @static
     * @readonly
     * @type Vec3
     * @name Vec3.RIGHT
     * @description A constant vector set to [1, 0, 0].
     */
    Vec3.RIGHT = new Vec3(1, 0, 0);
    /**
     * @field
     * @static
     * @readonly
     * @type Vec3
     * @name Vec3.UP
     * @description A constant vector set to [0, 1, 0].
     */
    Vec3.UP = new Vec3(0, 1, 0);
    /**
     * @field
     * @static
     * @readonly
     * @type Vec3
     * @name Vec3.ZERO
     * @description A constant vector set to [0, 0, 0].
     */
    Vec3.ZERO = new Vec3(0, 0, 0);
    return Vec3;
}());



/***/ }),

/***/ "./src/math/vec4.ts":
/*!**************************!*\
  !*** ./src/math/vec4.ts ***!
  \**************************/
/*! exports provided: Vec4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vec4", function() { return Vec4; });
/**
* @name Vec4
* @class A 4-dimensional vector.
* @description Creates a new Vec4 object
* @param {Number} [x] The x value. If x is an array of length 4, the array will be used to populate all components.
* @param {Number} [y] The y value
* @param {Number} [z] The z value
* @param {Number} [w] The w value
*/
var Vec4 = /** @class */ (function () {
    function Vec4(x, y, z, w) {
        if (x && x.length === 4) {
            this.data = new Float32Array(x);
            return;
        }
        this.data = new Float32Array(4);
        this.data[0] = x || 0;
        this.data[1] = y || 0;
        this.data[2] = z || 0;
        this.data[3] = w || 0;
    }
    /**
         * @function
         * @name Vec4#add
         * @description Adds a 4-dimensional vector to another in place.
         * @param {Vec4} rhs The vector to add to the specified vector.
         * @returns {Vec4} Self for chaining.
         * @example
         * var a = new Vec4(10, 10, 10, 10);
         * var b = new Vec4(20, 20, 20, 20);
         *
         * a.add(b);
         *
         * // Should output [30, 30, 30]
         * console.log("The result of the addition is: " + a.toString());
         */
    Vec4.prototype.add = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] += b[0];
        a[1] += b[1];
        a[2] += b[2];
        a[3] += b[3];
        return this;
    };
    /**
     * @function
     * @name Vec4#add2
     * @description Adds two 4-dimensional vectors together and returns the result.
     * @param {Vec4} lhs The first vector operand for the addition.
     * @param {Vec4} rhs The second vector operand for the addition.
     * @returns {Vec4} Self for chaining.
     * @example
     * var a = new Vec4(10, 10, 10, 10);
     * var b = new Vec4(20, 20, 20, 20);
     * var r = new Vec4();
     *
     * r.add2(a, b);
     * // Should output [30, 30, 30]
     *
     * console.log("The result of the addition is: " + r.toString());
     */
    Vec4.prototype.add2 = function (lhs, rhs) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        r[2] = a[2] + b[2];
        r[3] = a[3] + b[3];
        return this;
    };
    /**
     * @function
     * @name Vec4#clone
     * @description Returns an identical copy of the specified 4-dimensional vector.
     * @returns {Vec4} A 4-dimensional vector containing the result of the cloning.
     * @example
     * var v = new Vec4(10, 20, 30, 40);
     * var vclone = v.clone();
     * console.log("The result of the cloning is: " + vclone.toString());
     */
    Vec4.prototype.clone = function () {
        return new Vec4().copy(this);
    };
    /**
     * @function
     * @name Vec4#copy
     * @description Copied the contents of a source 4-dimensional vector to a destination 4-dimensional vector.
     * @param {Vec4} rhs A vector to copy to the specified vector.
     * @returns {Vec4} Self for chaining.
     * @example
     * var src = new Vec4(10, 20, 30, 40);
     * var dst = new Vec4();
     *
     * dst.copy(src);
     *
     * console.log("The two vectors are " + (dst.equals(src) ? "equal" : "different"));
     */
    Vec4.prototype.copy = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        return this;
    };
    /**
     * @function
     * @name Vec4#dot
     * @description Returns the result of a dot product operation performed on the two specified 4-dimensional vectors.
     * @param {Vec4} rhs The second 4-dimensional vector operand of the dot product.
     * @returns {Number} The result of the dot product operation.
     * @example
     * var v1 = new Vec4(5, 10, 20, 40);
     * var v2 = new Vec4(10, 20, 40, 80);
     * var v1dotv2 = v1.dot(v2);
     * console.log("The result of the dot product is: " + v1dotv2);
     */
    Vec4.prototype.dot = function (rhs) {
        var a = this.data, b = rhs.data;
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    };
    /**
     * @function
     * @name Vec4#equals
     * @description Reports whether two vectors are equal.
     * @param {Vec4} rhs The vector to compare to the specified vector.
     * @returns {Boolean} true if the vectors are equal and false otherwise.
     * @example
     * var a = new Vec4(1, 2, 3, 4);
     * var b = new Vec4(5, 6, 7, 8);
     * console.log("The two vectors are " + (a.equals(b) ? "equal" : "different"));
     */
    Vec4.prototype.equals = function (rhs) {
        var a = this.data, b = rhs.data;
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    };
    /**
     * @function
     * @name Vec4#length
     * @description Returns the magnitude of the specified 4-dimensional vector.
     * @returns {Number} The magnitude of the specified 4-dimensional vector.
     * @example
     * var vec = new Vec4(3, 4, 0, 0);
     * var len = vec.length();
     * // Should output 5
     * console.log("The length of the vector is: " + len);
     */
    Vec4.prototype.length = function () {
        var v = this.data;
        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3]);
    };
    /**
     * @function
     * @name Vec4#lengthSq
     * @description Returns the magnitude squared of the specified 4-dimensional vector.
     * @returns {Number} The magnitude of the specified 4-dimensional vector.
     * @example
     * var vec = new Vec4(3, 4, 0);
     * var len = vec.lengthSq();
     * // Should output 25
     * console.log("The length squared of the vector is: " + len);
     */
    Vec4.prototype.lengthSq = function () {
        var v = this.data;
        return v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3];
    };
    /**
     * @function
     * @name Vec4#lerp
     * @description Returns the result of a linear interpolation between two specified 4-dimensional vectors.
     * @param {Vec4} lhs The 4-dimensional to interpolate from.
     * @param {Vec4} rhs The 4-dimensional to interpolate to.
     * @param {Number} alpha The value controlling the point of interpolation. Between 0 and 1, the linear interpolant
     * will occur on a straight line between lhs and rhs. Outside of this range, the linear interpolant will occur on
     * a ray extrapolated from this line.
     * @returns {Vec4} Self for chaining.
     * @example
     * var a = new Vec4(0, 0, 0, 0);
     * var b = new Vec4(10, 10, 10, 10);
     * var r = new Vec4();
     *
     * r.lerp(a, b, 0);   // r is equal to a
     * r.lerp(a, b, 0.5); // r is 5, 5, 5, 5
     * r.lerp(a, b, 1);   // r is equal to b
     */
    Vec4.prototype.lerp = function (lhs, rhs, alpha) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] + alpha * (b[0] - a[0]);
        r[1] = a[1] + alpha * (b[1] - a[1]);
        r[2] = a[2] + alpha * (b[2] - a[2]);
        r[3] = a[3] + alpha * (b[3] - a[3]);
        return this;
    };
    /**
     * @function
     * @name Vec4#mul
     * @description Multiplies a 4-dimensional vector to another in place.
     * @param {Vec4} rhs The 4-dimensional vector used as the second multiplicand of the operation.
     * @returns {Vec4} Self for chaining.
     * @example
     * var a = new Vec4(2, 3, 4, 5);
     * var b = new Vec4(4, 5, 6, 7);
     *
     * a.mul(b);
     *
     * // Should output 8, 15, 24, 35
     * console.log("The result of the multiplication is: " + a.toString());
     */
    Vec4.prototype.mul = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] *= b[0];
        a[1] *= b[1];
        a[2] *= b[2];
        a[3] *= b[3];
        return this;
    };
    /**
     * @function
     * @name Vec4#mul2
     * @description Returns the result of multiplying the specified 4-dimensional vectors together.
     * @param {Vec4} lhs The 4-dimensional vector used as the first multiplicand of the operation.
     * @param {Vec4} rhs The 4-dimensional vector used as the second multiplicand of the operation.
     * @returns {Vec4} Self for chaining.
     * @example
     * var a = new Vec4(2, 3, 4, 5);
     * var b = new Vec4(4, 5, 6, 7);
     * var r = new Vec4();
     *
     * r.mul2(a, b);
     *
     * // Should output 8, 15, 24, 35
     * console.log("The result of the multiplication is: " + r.toString());
     */
    Vec4.prototype.mul2 = function (lhs, rhs) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] * b[0];
        r[1] = a[1] * b[1];
        r[2] = a[2] * b[2];
        r[3] = a[3] * b[3];
        return this;
    };
    /**
     * @function
     * @name Vec4#normalize
     * @description Returns the specified 4-dimensional vector copied and converted to a unit vector.
     * If the vector has a length of zero, the vector's elements will be set to zero.
     * @returns {Vec4} The result of the normalization.
     * @example
     * var v = new Vec4(25, 0, 0, 0);
     *
     * v.normalize();
     *
     * // Should output 1, 0, 0, 0
     * console.log("The result of the vector normalization is: " + v.toString());
     */
    Vec4.prototype.normalize = function () {
        var v = this.data;
        var lengthSq = v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3];
        if (lengthSq > 0) {
            var invLength = 1 / Math.sqrt(lengthSq);
            v[0] *= invLength;
            v[1] *= invLength;
            v[2] *= invLength;
            v[3] *= invLength;
        }
        return this;
    };
    /**
     * @function
     * @name Vec4#scale
     * @description Scales each dimension of the specified 4-dimensional vector by the supplied
     * scalar value.
     * @param {Number} scalar The value by which each vector component is multiplied.
     * @returns {Vec4} Self for chaining.
     * @example
     * var v = new Vec4(2, 4, 8, 16);
     *
     * // Multiply by 2
     * v.scale(2);
     *
     * // Negate
     * v.scale(-1);
     *
     * // Divide by 2
     * v.scale(0.5);
     */
    Vec4.prototype.scale = function (scalar) {
        var v = this.data;
        v[0] *= scalar;
        v[1] *= scalar;
        v[2] *= scalar;
        v[3] *= scalar;
        return this;
    };
    /**
     * @function
     * @name Vec4#set
     * @description Sets the specified 4-dimensional vector to the supplied numerical values.
     * @param {Number} x The value to set on the first component of the vector.
     * @param {Number} y The value to set on the second component of the vector.
     * @param {Number} z The value to set on the third component of the vector.
     * @param {Number} w The value to set on the fourth component of the vector.
     * @example
     * var v = new Vec4();
     * v.set(5, 10, 20, 40);
     *
     * // Should output 5, 10, 20, 40
     * console.log("The result of the vector set is: " + v.toString());
     */
    Vec4.prototype.set = function (x, y, z, w) {
        var v = this.data;
        v[0] = x;
        v[1] = y;
        v[2] = z;
        v[3] = w;
        return this;
    };
    /**
     * @function
     * @name Vec4#sub
     * @description Subtracts a 4-dimensional vector from another in place.
     * @param {Vec4} rhs The vector to add to the specified vector.
     * @returns {Vec4} Self for chaining.
     * @example
     * var a = new Vec4(10, 10, 10, 10);
     * var b = new Vec4(20, 20, 20, 20);
     *
     * a.sub(b);
     *
     * // Should output [-10, -10, -10, -10]
     * console.log("The result of the subtraction is: " + a.toString());
     */
    Vec4.prototype.sub = function (rhs) {
        var a = this.data, b = rhs.data;
        a[0] -= b[0];
        a[1] -= b[1];
        a[2] -= b[2];
        a[3] -= b[3];
        return this;
    };
    /**
     * @function
     * @name Vec4#sub2
     * @description Subtracts two 4-dimensional vectors from one another and returns the result.
     * @param {Vec4} lhs The first vector operand for the subtraction.
     * @param {Vec4} rhs The second vector operand for the subtraction.
     * @returns {Vec4} Self for chaining.
     * @example
     * var a = new Vec4(10, 10, 10, 10);
     * var b = new Vec4(20, 20, 20, 20);
     * var r = new Vec4();
     *
     * r.sub2(a, b);
     *
     * // Should output [-10, -10, -10, -10]
     * console.log("The result of the subtraction is: " + r.toString());
     */
    Vec4.prototype.sub2 = function (lhs, rhs) {
        var a = lhs.data, b = rhs.data, r = this.data;
        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];
        r[2] = a[2] - b[2];
        r[3] = a[3] - b[3];
        return this;
    };
    /**
     * @function
     * @name Vec4#toString
     * @description Converts the vector to string form.
     * @returns {String} The vector in string form.
     * @example
     * var v = new Vec4(20, 10, 5, 0);
     * // Should output '[20, 10, 5, 0]'
     * console.log(v.toString());
     */
    Vec4.prototype.toString = function () {
        return "[" + this.data[0] + ", " + this.data[1] + ", " + this.data[2] + ", " + this.data[3] + "]";
    };
    Object.defineProperty(Vec4.prototype, "x", {
        /**
         * @field
         * @type Number
         * @name Vec4#x
         * @description The first component of the vector.
         * @example
         * var vec = new Vec4(10, 20, 30, 40);
         *
         * // Get x
         * var x = vec.x;
         *
         * // Set x
         * vec.x = 0;
         */
        get: function () {
            return this.data[0];
        },
        set: function (value) {
            this.data[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Vec4.prototype, "y", {
        /**
         * @field
         * @type Number
         * @name Vec4#y
         * @description The second component of the vector.
         * @example
         * var vec = new Vec4(10, 20, 30, 40);
         *
         * // Get y
         * var y = vec.y;
         *
         * // Set y
         * vec.y = 0;
         */
        get: function () {
            return this.data[1];
        },
        set: function (value) {
            this.data[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Vec4.prototype, "z", {
        /**
         * @field
         * @type Number
         * @name Vec4#z
         * @description The third component of the vector.
         * @example
         * var vec = new Vec4(10, 20, 30, 40);
         *
         * // Get z
         * var z = vec.z;
         *
         * // Set z
         * vec.z = 0;
         */
        get: function () {
            return this.data[2];
        },
        set: function (value) {
            this.data[2] = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Vec4.prototype, "w", {
        /**
         * @field
         * @type Number
         * @name Vec4#w
         * @description The fourth component of the vector.
         * @example
         * var vec = new Vec4(10, 20, 30, 40);
         *
         * // Get w
         * var w = vec.w;
         *
         * // Set w
         * vec.w = 0;
         */
        get: function () {
            return this.data[2];
        },
        set: function (value) {
            this.data[2] = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    return Vec4;
}());



/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/*! exports provided: initShaders, createProgram, loadShader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/utils/util.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initShaders", function() { return _util__WEBPACK_IMPORTED_MODULE_0__["initShaders"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createProgram", function() { return _util__WEBPACK_IMPORTED_MODULE_0__["createProgram"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadShader", function() { return _util__WEBPACK_IMPORTED_MODULE_0__["loadShader"]; });




/***/ }),

/***/ "./src/utils/util.ts":
/*!***************************!*\
  !*** ./src/utils/util.ts ***!
  \***************************/
/*! exports provided: initShaders, createProgram, loadShader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initShaders", function() { return initShaders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProgram", function() { return createProgram; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadShader", function() { return loadShader; });
function initShaders(gl, vshader, fshader) {
    var program = createProgram(gl, vshader, fshader);
    return program;
}
function createProgram(gl, vshader, fshader) {
    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        console.log(gl.getProgramInfoLog(program));
        return false;
    }
    gl.useProgram(program);
    return program;
}
function loadShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        console.log(gl.getShaderInfoLog(shader));
        return false;
    }
    return shader;
}


/***/ })

/******/ });
//# sourceMappingURL=index.js.map