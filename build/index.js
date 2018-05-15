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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/demo1/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/demo1/fragment.frag":
/*!*********************************!*\
  !*** ./src/demo1/fragment.frag ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "void main(void){  \n    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);  \n}  "

/***/ }),

/***/ "./src/demo1/index.ts":
/*!****************************!*\
  !*** ./src/demo1/index.ts ***!
  \****************************/
/*! exports provided: Application */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return Application; });
/* harmony import */ var _vertex_vert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vertex.vert */ "./src/demo1/vertex.vert");
/* harmony import */ var _vertex_vert__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vertex_vert__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fragment_frag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fragment.frag */ "./src/demo1/fragment.frag");
/* harmony import */ var _fragment_frag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fragment_frag__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");



var canvas = document.getElementById('root');
var vertices = new Float32Array([-0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.0, 0.5, 0.0]);
var Application = /** @class */ (function () {
    function Application(canvas) {
        var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        this.gl = gl;
        var program = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["initShaders"])(gl, _vertex_vert__WEBPACK_IMPORTED_MODULE_0___default.a, _fragment_frag__WEBPACK_IMPORTED_MODULE_1___default.a);
        var a_Position = gl.getAttribLocation(program, 'position');
        gl.vertexAttrib3f(a_Position, 0.0, -0.5, 0.0);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(this.gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, 1);
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

/***/ "./src/demo1/vertex.vert":
/*!*******************************!*\
  !*** ./src/demo1/vertex.vert ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "attribute vec3 position;  \n  \nvoid main(void){  \n    gl_Position = vec4(position,1.0);\n    gl_PointSize = 10.0;\n}  "

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