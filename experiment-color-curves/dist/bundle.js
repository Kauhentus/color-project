/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/color.ts":
/*!**********************!*\
  !*** ./src/color.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Color": () => (/* binding */ Color)
/* harmony export */ });
class Color {
    constructor(rgb, hex, hsl) {
        this.rgb = rgb;
        this.hex = hex;
        this.hsl = hsl;
        this.string = `#${rgb.map(n => n.toString(16).padStart(2, '0')).join('')}`;
    }
    static rgb(r, g, b) {
        let rgb = [r, g, b];
        let hex = rgb_to_hex(rgb);
        let hsl = rgb_to_hsl(rgb);
        return new Color(rgb, hex, hsl);
    }
    static hex(hex) {
        let rgb = hex_to_rgb(hex);
        let hsl = rgb_to_hsl(rgb);
        return new Color(rgb, hex, hsl);
    }
    static hsl(h, s, l) {
        let hsl = [h, s, l];
        let rgb = hsl_to_rgb(hsl);
        let hex = rgb_to_hex(rgb);
        return new Color(rgb, hex, hsl);
    }
}
const rgb_to_hex = (rgb) => {
    return rgb[0] * 256 * 256 + rgb[1] * 256 + rgb[2];
};
const hex_to_rgb = (hex) => {
    let r = hex / (256 * 256) | 0;
    let g = hex % (256 * 256) / 256 | 0;
    let b = hex % 256 | 0;
    return [r, g, b];
};
const rgb_to_hsl = (rgb) => {
    let [r, g, b] = rgb;
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
            ? (g - b) / s
            : l === g
                ? 2 + (b - r) / s
                : 4 + (r - g) / s
        : 0;
    return [
        60 * h < 0 ? 60 * h + 360 : 60 * h,
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        (100 * (2 * l - s)) / 2,
    ];
};
const hsl_to_rgb = (hsl) => {
    let [h, s, l] = hsl;
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        const hue2rgb = (p, q, t) => {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [r * 255 | 0, g * 255 | 0, b * 255 | 0];
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "brush_color": () => (/* binding */ brush_color),
/* harmony export */   "brush_radius": () => (/* binding */ brush_radius),
/* harmony export */   "ctx": () => (/* binding */ ctx),
/* harmony export */   "main_canvas": () => (/* binding */ main_canvas),
/* harmony export */   "palette_canvas": () => (/* binding */ palette_canvas),
/* harmony export */   "palette_slider": () => (/* binding */ palette_slider),
/* harmony export */   "pctx": () => (/* binding */ pctx),
/* harmony export */   "screen_dim": () => (/* binding */ screen_dim),
/* harmony export */   "sctx": () => (/* binding */ sctx)
/* harmony export */ });
/* harmony import */ var _init_palette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init_palette */ "./src/init_palette.ts");
/* harmony import */ var _init_canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./init_canvas */ "./src/init_canvas.ts");


const screen_dim = [400, 400];
const main_canvas = document.getElementById('main-canvas');
main_canvas.width = screen_dim[0];
main_canvas.height = screen_dim[1];
const palette_canvas = document.getElementById('palette-canvas');
palette_canvas.width = screen_dim[0];
palette_canvas.height = screen_dim[1];
const palette_slider = document.getElementById('palette-slider');
palette_slider.width = screen_dim[0];
palette_slider.height = screen_dim[1] / 16;
const ctx = main_canvas.getContext('2d');
const pctx = palette_canvas.getContext('2d');
const sctx = palette_slider.getContext('2d');
let brush_radius = 20;
let brush_color = '#00aaff';
(0,_init_canvas__WEBPACK_IMPORTED_MODULE_1__.init_canvas)();
// init_palette_A();
(0,_init_palette__WEBPACK_IMPORTED_MODULE_0__.init_palette_B)();


/***/ }),

/***/ "./src/init_canvas.ts":
/*!****************************!*\
  !*** ./src/init_canvas.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init_canvas": () => (/* binding */ init_canvas)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.ts");

let mouse_down = false;
const init_canvas = () => {
    const draw = (x, y) => {
        _index__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = _index__WEBPACK_IMPORTED_MODULE_0__.brush_color;
        _index__WEBPACK_IMPORTED_MODULE_0__.ctx.beginPath();
        _index__WEBPACK_IMPORTED_MODULE_0__.ctx.ellipse(x, y, _index__WEBPACK_IMPORTED_MODULE_0__.brush_radius, _index__WEBPACK_IMPORTED_MODULE_0__.brush_radius, 0, 0, 2 * Math.PI);
        _index__WEBPACK_IMPORTED_MODULE_0__.ctx.fill();
    };
    _index__WEBPACK_IMPORTED_MODULE_0__.main_canvas.addEventListener('mousedown', (e) => {
        mouse_down = true;
        draw(e.offsetX, e.offsetY);
    });
    _index__WEBPACK_IMPORTED_MODULE_0__.main_canvas.addEventListener('mousemove', (e) => {
        if (!mouse_down)
            return;
        draw(e.offsetX, e.offsetY);
    });
    _index__WEBPACK_IMPORTED_MODULE_0__.main_canvas.addEventListener('mouseup', () => {
        mouse_down = false;
    });
    _index__WEBPACK_IMPORTED_MODULE_0__.main_canvas.addEventListener('mouseleave', () => {
        mouse_down = false;
    });
};


/***/ }),

/***/ "./src/init_palette.ts":
/*!*****************************!*\
  !*** ./src/init_palette.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dist": () => (/* binding */ dist),
/* harmony export */   "init_palette_A": () => (/* binding */ init_palette_A),
/* harmony export */   "init_palette_B": () => (/* binding */ init_palette_B),
/* harmony export */   "lerp": () => (/* binding */ lerp)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.ts");
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color */ "./src/color.ts");


const lerp = (t, a, b) => a + t * (b - a);
const dist = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
};
const init_palette_A = () => {
    let steps = 100;
    let radius = _index__WEBPACK_IMPORTED_MODULE_0__.screen_dim[0] / 2;
    let img_data = _index__WEBPACK_IMPORTED_MODULE_0__.pctx.createImageData(_index__WEBPACK_IMPORTED_MODULE_0__.screen_dim[0], _index__WEBPACK_IMPORTED_MODULE_0__.screen_dim[1]);
    let num_pixels = _index__WEBPACK_IMPORTED_MODULE_0__.screen_dim[0] * _index__WEBPACK_IMPORTED_MODULE_0__.screen_dim[1];
    for (let i = 0; i < num_pixels; i++) {
        let x = i % _index__WEBPACK_IMPORTED_MODULE_0__.screen_dim[0];
        let y = i / _index__WEBPACK_IMPORTED_MODULE_0__.screen_dim[0] | 0;
        let i4 = i * 4;
        let theta = Math.atan2(y - radius, x - radius);
        let distance = Math.sqrt(Math.pow((x - radius), 2) + Math.pow((y - radius), 2));
        let weight = Math.max(0, Math.min(1, distance / radius));
        let angle = theta / (2 * Math.PI) * 360;
        let color = _color__WEBPACK_IMPORTED_MODULE_1__.Color.hsl(angle, 100, 100 - 50 * weight).rgb;
        if (distance > radius)
            color = _color__WEBPACK_IMPORTED_MODULE_1__.Color.rgb(255, 255, 255).rgb;
        img_data.data[i4] = color[0];
        img_data.data[i4 + 1] = color[1];
        img_data.data[i4 + 2] = color[2];
        img_data.data[i4 + 3] = 255;
    }
    _index__WEBPACK_IMPORTED_MODULE_0__.pctx.putImageData(img_data, 0, 0);
    _index__WEBPACK_IMPORTED_MODULE_0__.pctx.strokeStyle = '#000000';
    _index__WEBPACK_IMPORTED_MODULE_0__.pctx.beginPath();
    _index__WEBPACK_IMPORTED_MODULE_0__.pctx.ellipse(radius, radius, radius, radius, 0, 0, 2 * Math.PI);
    _index__WEBPACK_IMPORTED_MODULE_0__.pctx.closePath();
    _index__WEBPACK_IMPORTED_MODULE_0__.pctx.stroke();
};
const init_palette_B = () => {
    let steps = 100;
    let radius = _index__WEBPACK_IMPORTED_MODULE_0__.screen_dim[0] / 2;
    let slider_a = 100;
    let slider_b = 200;
    let anchors = [[50, 200], [300, 100], [300, 300]];
    let curve_points = [];
    const sample_color = (x, y, sw, sh) => {
        let min_dist = Infinity;
        let min_i = 0;
        let scale_factor = sw / _index__WEBPACK_IMPORTED_MODULE_0__.screen_dim[0];
        for (let i = 0; i < curve_points.length; i++) {
            let cur_dist = dist(x, y, curve_points[i][0] * scale_factor, curve_points[i][1] * scale_factor);
            if (cur_dist < min_dist) {
                min_dist = cur_dist;
                min_i = i;
            }
        }
        let t = min_i / (curve_points.length - 1);
        let color = _color__WEBPACK_IMPORTED_MODULE_1__.Color.hsl(lerp(t, slider_a, slider_b), x / sw * 100, lerp(x / sw, lerp(y / sh, 100, 0), lerp(y / sh, 50, 0)));
        return color;
    };
    const draw_palette = () => {
        const sw = 100;
        const sh = 100;
        const small_canvas = document.createElement('canvas');
        small_canvas.width = sw;
        small_canvas.height = sh;
        const scctx = small_canvas.getContext('2d');
        curve_points = bezier_thru_3(0, anchors);
        let img_data = scctx.createImageData(sw, sh);
        let num_pixels = sw * sh;
        for (let i = 0; i < num_pixels; i++) {
            let x = i % sw;
            let y = i / sw | 0;
            let i4 = i * 4;
            let color = sample_color(x, y, sw, sh).rgb;
            img_data.data[i4] = color[0];
            img_data.data[i4 + 1] = color[1];
            img_data.data[i4 + 2] = color[2];
            img_data.data[i4 + 3] = 255;
        }
        scctx.putImageData(img_data, 0, 0);
        _index__WEBPACK_IMPORTED_MODULE_0__.pctx.drawImage(small_canvas, 0, 0, _index__WEBPACK_IMPORTED_MODULE_0__.screen_dim[0], _index__WEBPACK_IMPORTED_MODULE_0__.screen_dim[1]);
        _index__WEBPACK_IMPORTED_MODULE_0__.pctx.beginPath();
        _index__WEBPACK_IMPORTED_MODULE_0__.pctx.strokeStyle = '#ffffff';
        _index__WEBPACK_IMPORTED_MODULE_0__.pctx.lineWidth = 4;
        _index__WEBPACK_IMPORTED_MODULE_0__.pctx.moveTo(curve_points[0][0], curve_points[0][1]);
        for (let i = 1; i < curve_points.length; i++) {
            _index__WEBPACK_IMPORTED_MODULE_0__.pctx.lineTo(curve_points[i][0], curve_points[i][1]);
        }
        _index__WEBPACK_IMPORTED_MODULE_0__.pctx.stroke();
        anchors.forEach(coord => {
            _index__WEBPACK_IMPORTED_MODULE_0__.pctx.beginPath();
            _index__WEBPACK_IMPORTED_MODULE_0__.pctx.strokeStyle = '#ffffff';
            _index__WEBPACK_IMPORTED_MODULE_0__.pctx.lineWidth = 4;
            _index__WEBPACK_IMPORTED_MODULE_0__.pctx.ellipse(coord[0], coord[1], 10, 10, 0, 0, 2 * Math.PI);
            _index__WEBPACK_IMPORTED_MODULE_0__.pctx.stroke();
            _index__WEBPACK_IMPORTED_MODULE_0__.pctx.beginPath();
            _index__WEBPACK_IMPORTED_MODULE_0__.pctx.strokeStyle = '#888888';
            _index__WEBPACK_IMPORTED_MODULE_0__.pctx.fillStyle = sample_color(coord[0], coord[1], _index__WEBPACK_IMPORTED_MODULE_0__.screen_dim[0], _index__WEBPACK_IMPORTED_MODULE_0__.screen_dim[1]).string;
            _index__WEBPACK_IMPORTED_MODULE_0__.pctx.lineWidth = 2;
            _index__WEBPACK_IMPORTED_MODULE_0__.pctx.ellipse(coord[0], coord[1], 10, 10, 0, 0, 2 * Math.PI);
            _index__WEBPACK_IMPORTED_MODULE_0__.pctx.stroke();
            _index__WEBPACK_IMPORTED_MODULE_0__.pctx.fill();
        });
    };
    draw_palette();
    let palette_mouse_down = false;
    _index__WEBPACK_IMPORTED_MODULE_0__.palette_canvas.addEventListener('mousedown', (e) => (palette_mouse_down = true, color_wheel_input(e.offsetX, e.offsetY)));
    _index__WEBPACK_IMPORTED_MODULE_0__.palette_canvas.addEventListener('mousemove', (e) => color_wheel_input(e.offsetX, e.offsetY));
    _index__WEBPACK_IMPORTED_MODULE_0__.palette_canvas.addEventListener('mouseup', () => palette_mouse_down = false);
    _index__WEBPACK_IMPORTED_MODULE_0__.palette_canvas.addEventListener('mouseleave', () => palette_mouse_down = false);
    const color_wheel_input = (x, y) => {
        if (!palette_mouse_down)
            return;
        console.log("AH");
        let middle = _index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.height / 2;
        if (dist(anchors[0][0], anchors[0][1], x, y) < middle) {
            anchors[0] = [x, y];
        }
        else if (dist(anchors[1][0], anchors[1][1], x, y) < middle) {
            anchors[1] = [x, y];
        }
        else if (dist(anchors[2][0], anchors[2][1], x, y) < middle) {
            anchors[2] = [x, y];
        }
        draw_palette();
    };
    const draw_slider = () => {
        let slider_img_data = _index__WEBPACK_IMPORTED_MODULE_0__.sctx.createImageData(_index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.width, _index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.height);
        let slider_num_pixels = _index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.width * _index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.height;
        for (let i = 0; i < slider_num_pixels; i++) {
            let x = i % _index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.width;
            let i4 = i * 4;
            let angle = x / _index__WEBPACK_IMPORTED_MODULE_0__.screen_dim[0] * 360;
            let color = _color__WEBPACK_IMPORTED_MODULE_1__.Color.hsl(angle, 100, 50).rgb;
            slider_img_data.data[i4] = color[0];
            slider_img_data.data[i4 + 1] = color[1];
            slider_img_data.data[i4 + 2] = color[2];
            slider_img_data.data[i4 + 3] = 255;
        }
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.putImageData(slider_img_data, 0, 0);
        let slider_a_px = slider_a / 360 * _index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.width;
        let slider_b_px = slider_b / 360 * _index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.width;
        let slider_a_color = _color__WEBPACK_IMPORTED_MODULE_1__.Color.hsl(slider_a, 100, 50).string;
        let slider_b_color = _color__WEBPACK_IMPORTED_MODULE_1__.Color.hsl(slider_b, 100, 50).string;
        let middle = _index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.height / 2;
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.beginPath();
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.strokeStyle = '#888888';
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.fillStyle = slider_b_color;
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.lineWidth = 3;
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.ellipse(slider_b_px, middle, middle, middle, 0, 0, 2 * Math.PI);
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.fill();
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.stroke();
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.beginPath();
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.strokeStyle = '#888888';
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.fillStyle = slider_a_color;
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.lineWidth = 3;
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.ellipse(slider_a_px, middle, middle, middle, 0, 0, 2 * Math.PI);
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.fill();
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.stroke();
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.beginPath();
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.moveTo(slider_a_px, middle);
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.lineTo(slider_a > slider_b ? _index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.width : slider_b_px, middle);
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.stroke();
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.beginPath();
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.moveTo(slider_b_px, middle);
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.lineTo(slider_a > slider_b ? 0 : slider_a_px, middle);
        _index__WEBPACK_IMPORTED_MODULE_0__.sctx.stroke();
    };
    let mouse_down = false;
    let slider_input = (x, y) => {
        if (!mouse_down)
            return;
        let slider_a_px = slider_a / 360 * _index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.width;
        let slider_b_px = slider_b / 360 * _index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.width;
        let middle = _index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.height / 2;
        if (dist(slider_a_px, middle, x, y) < middle) {
            slider_a = x / _index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.width * 360;
        }
        else if (dist(slider_b_px, middle, x, y) < middle) {
            slider_b = x / _index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.width * 360;
        }
        draw_slider();
        draw_palette();
    };
    _index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.addEventListener('mousedown', (e) => (mouse_down = true, slider_input(e.offsetX, e.offsetY)));
    _index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.addEventListener('mousemove', (e) => slider_input(e.offsetX, e.offsetY));
    _index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.addEventListener('mouseup', () => mouse_down = false);
    _index__WEBPACK_IMPORTED_MODULE_0__.palette_slider.addEventListener('mouseleave', () => mouse_down = false);
    draw_slider();
};
const bezier_thru_3 = (t, anchors) => {
    let p0 = anchors[0];
    let p2 = anchors[2];
    let pc = anchors[1];
    let p1 = [
        2 * pc[0] - p0[0] / 2 - p2[0] / 2,
        2 * pc[1] - p0[1] / 2 - p2[1] / 2,
    ];
    let steps = 32;
    let points = [];
    for (let i = 0; i <= steps; i++) {
        let t = i / steps;
        points.push([
            p0[0] * Math.pow(t, 2) + p1[0] * 2 * t * (1 - t) + p2[0] * Math.pow((1 - t), 2),
            p0[1] * Math.pow(t, 2) + p1[1] * 2 * t * (1 - t) + p2[1] * Math.pow((1 - t), 2)
        ]);
    }
    return points;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU8sTUFBTSxLQUFLO0lBS2QsWUFBWSxHQUFhLEVBQUUsR0FBVyxFQUFFLEdBQWE7UUFDakQsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUMvRSxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVM7UUFDdEMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsT0FBTyxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQVc7UUFDbEIsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixPQUFPLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO1FBQ3RDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLE9BQU8sSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBQ0o7QUFFRCxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQWEsRUFBRSxFQUFFO0lBQ2pDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEQsQ0FBQztBQUVELE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBVyxFQUFFLEVBQUU7SUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNwQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUN0QixPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNyQixDQUFDO0FBRUQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFhLEVBQUUsRUFBRTtJQUNqQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDcEIsQ0FBQyxJQUFJLEdBQUcsQ0FBQztJQUNULENBQUMsSUFBSSxHQUFHLENBQUM7SUFDVCxDQUFDLElBQUksR0FBRyxDQUFDO0lBQ1QsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFDakIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDUixPQUFPO1FBQ0gsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztRQUNsQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0tBQzFCLENBQUM7QUFDTixDQUFDO0FBRUQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFhLEVBQUUsRUFBRTtJQUNqQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDcEIsQ0FBQyxJQUFJLEdBQUcsQ0FBQztJQUNULENBQUMsSUFBSSxHQUFHLENBQUM7SUFDVCxDQUFDLElBQUksR0FBRyxDQUFDO0lBQ1QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNULENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWE7S0FDL0I7U0FBTTtRQUNILE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsRUFBRTtZQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Z0JBQUUsT0FBTyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Z0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwRCxPQUFPLENBQUMsQ0FBQztRQUNiLENBQUMsQ0FBQztRQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdCLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyQixDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNoQztJQUNELE9BQU8sQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ25ELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RitEO0FBQ3BCO0FBRXJDLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBRTlCLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFzQixDQUFDO0FBQ3ZGLFdBQVcsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTVCLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQXNCLENBQUM7QUFDN0YsY0FBYyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckMsY0FBYyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFL0IsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBc0IsQ0FBQztBQUM3RixjQUFjLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQyxjQUFjLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFFcEMsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQTZCLENBQUM7QUFDckUsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQTZCLENBQUM7QUFDekUsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQTZCLENBQUM7QUFFekUsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQztBQUVuQyx5REFBVyxFQUFFLENBQUM7QUFDZCxvQkFBb0I7QUFDcEIsNkRBQWMsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDMUJxRDtBQUV0RSxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFFaEIsTUFBTSxXQUFXLEdBQUcsR0FBRyxFQUFFO0lBQzVCLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxFQUFFO1FBQ2xDLGlEQUFhLEdBQUcsK0NBQVcsQ0FBQztRQUM1QixpREFBYSxFQUFFLENBQUM7UUFDaEIsK0NBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLGdEQUFZLEVBQUUsZ0RBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakUsNENBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELGdFQUE0QixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzVDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUFDO0lBRUgsZ0VBQTRCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDNUMsSUFBRyxDQUFDLFVBQVU7WUFBRSxPQUFPO1FBQ3ZCLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztJQUVILGdFQUE0QixDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDekMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztJQUVILGdFQUE0QixDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7UUFDNUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JnRjtBQUNqRDtBQUV6QixNQUFNLElBQUksR0FBRyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBRWxFLE1BQU0sSUFBSSxHQUFHLENBQUMsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQUU7SUFDbkUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFJLENBQUMsSUFBRyxVQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBSSxDQUFDLEVBQUMsQ0FBQztBQUN0RCxDQUFDO0FBRU0sTUFBTSxjQUFjLEdBQUcsR0FBRyxFQUFFO0lBQy9CLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUNoQixJQUFJLE1BQU0sR0FBRyxpREFBYSxHQUFHLENBQUMsQ0FBQztJQUUvQixJQUFJLFFBQVEsR0FBRyx3REFBb0IsQ0FBQyxpREFBYSxFQUFFLGlEQUFhLENBQUMsQ0FBQztJQUNsRSxJQUFJLFVBQVUsR0FBRyxpREFBYSxHQUFHLGlEQUFhLENBQUM7SUFDL0MsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBQztRQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsaURBQWEsQ0FBQztRQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsaURBQWEsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVmLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDL0MsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBSSxDQUFDLElBQUcsVUFBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEVBQUksQ0FBQyxFQUFDLENBQUM7UUFDaEUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDekQsSUFBSSxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEMsSUFBSSxLQUFLLEdBQUcsNkNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRXpELElBQUcsUUFBUSxHQUFHLE1BQU07WUFBRSxLQUFLLEdBQUcsNkNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUUzRCxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFL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LEdBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUNoRCxDQUFDO0tBQ0w7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDOzs7Ozs7O1VDbFFEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGJydC8uL3NyYy9jb2xvci50cyIsIndlYnBhY2s6Ly9wYnJ0Ly4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL3BicnQvLi9zcmMvaW5pdF9jYW52YXMudHMiLCJ3ZWJwYWNrOi8vcGJydC8uL3NyYy9pbml0X3BhbGV0dGUudHMiLCJ3ZWJwYWNrOi8vcGJydC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wYnJ0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wYnJ0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcGJydC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3BicnQvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9wYnJ0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9wYnJ0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ29sb3Ige1xyXG4gICAgcmdiOiBudW1iZXJbXTtcclxuICAgIGhleDogbnVtYmVyO1xyXG4gICAgaHNsOiBudW1iZXJbXTtcclxuICAgIHN0cmluZzogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IocmdiOiBudW1iZXJbXSwgaGV4OiBudW1iZXIsIGhzbDogbnVtYmVyW10pIHtcclxuICAgICAgICB0aGlzLnJnYiA9IHJnYjtcclxuICAgICAgICB0aGlzLmhleCA9IGhleDtcclxuICAgICAgICB0aGlzLmhzbCA9IGhzbDtcclxuICAgICAgICB0aGlzLnN0cmluZyA9IGAjJHtyZ2IubWFwKG4gPT4gbi50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKSkuam9pbignJyl9YDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcmdiKHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCByZ2IgPSBbciwgZywgYl07XHJcbiAgICAgICAgbGV0IGhleCA9IHJnYl90b19oZXgocmdiKTtcclxuICAgICAgICBsZXQgaHNsID0gcmdiX3RvX2hzbChyZ2IpO1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IocmdiLCBoZXgsIGhzbCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGhleChoZXg6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IHJnYiA9IGhleF90b19yZ2IoaGV4KTtcclxuICAgICAgICBsZXQgaHNsID0gcmdiX3RvX2hzbChyZ2IpO1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IocmdiLCBoZXgsIGhzbCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGhzbChoOiBudW1iZXIsIHM6IG51bWJlciwgbDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgaHNsID0gW2gsIHMsIGxdO1xyXG4gICAgICAgIGxldCByZ2IgPSBoc2xfdG9fcmdiKGhzbCk7XHJcbiAgICAgICAgbGV0IGhleCA9IHJnYl90b19oZXgocmdiKTtcclxuICAgICAgICByZXR1cm4gbmV3IENvbG9yKHJnYiwgaGV4LCBoc2wpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCByZ2JfdG9faGV4ID0gKHJnYjogbnVtYmVyW10pID0+IHtcclxuICAgIHJldHVybiByZ2JbMF0gKiAyNTYgKiAyNTYgKyByZ2JbMV0gKiAyNTYgKyByZ2JbMl07XHJcbn1cclxuXHJcbmNvbnN0IGhleF90b19yZ2IgPSAoaGV4OiBudW1iZXIpID0+IHtcclxuICAgIGxldCByID0gaGV4IC8gKDI1NiAqIDI1NikgfCAwO1xyXG4gICAgbGV0IGcgPSBoZXggJSAoMjU2ICogMjU2KSAvIDI1NiB8IDA7XHJcbiAgICBsZXQgYiA9IGhleCAlIDI1NiB8IDA7XHJcbiAgICByZXR1cm4gW3IsIGcsIGJdO1xyXG59XHJcblxyXG5jb25zdCByZ2JfdG9faHNsID0gKHJnYjogbnVtYmVyW10pID0+IHtcclxuICAgIGxldCBbciwgZywgYl0gPSByZ2I7XHJcbiAgICByIC89IDI1NTtcclxuICAgIGcgLz0gMjU1O1xyXG4gICAgYiAvPSAyNTU7XHJcbiAgICBjb25zdCBsID0gTWF0aC5tYXgociwgZywgYik7XHJcbiAgICBjb25zdCBzID0gbCAtIE1hdGgubWluKHIsIGcsIGIpO1xyXG4gICAgY29uc3QgaCA9IHNcclxuICAgICAgICA/IGwgPT09IHJcclxuICAgICAgICAgICAgPyAoZyAtIGIpIC8gc1xyXG4gICAgICAgICAgICA6IGwgPT09IGdcclxuICAgICAgICAgICAgICAgID8gMiArIChiIC0gcikgLyBzXHJcbiAgICAgICAgICAgICAgICA6IDQgKyAociAtIGcpIC8gc1xyXG4gICAgICAgIDogMDtcclxuICAgIHJldHVybiBbXHJcbiAgICAgICAgNjAgKiBoIDwgMCA/IDYwICogaCArIDM2MCA6IDYwICogaCxcclxuICAgICAgICAxMDAgKiAocyA/IChsIDw9IDAuNSA/IHMgLyAoMiAqIGwgLSBzKSA6IHMgLyAoMiAtICgyICogbCAtIHMpKSkgOiAwKSxcclxuICAgICAgICAoMTAwICogKDIgKiBsIC0gcykpIC8gMixcclxuICAgIF07XHJcbn1cclxuXHJcbmNvbnN0IGhzbF90b19yZ2IgPSAoaHNsOiBudW1iZXJbXSkgPT4ge1xyXG4gICAgbGV0IFtoLCBzLCBsXSA9IGhzbDtcclxuICAgIGggLz0gMzYwO1xyXG4gICAgcyAvPSAxMDA7XHJcbiAgICBsIC89IDEwMDtcclxuICAgIGxldCByLCBnLCBiO1xyXG4gICAgaWYgKHMgPT09IDApIHtcclxuICAgICAgICByID0gZyA9IGIgPSBsOyAvLyBhY2hyb21hdGljXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGh1ZTJyZ2IgPSAocDogbnVtYmVyLCBxOiBudW1iZXIsIHQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodCA8IDApIHQgKz0gMTtcclxuICAgICAgICAgICAgaWYgKHQgPiAxKSB0IC09IDE7XHJcbiAgICAgICAgICAgIGlmICh0IDwgMSAvIDYpIHJldHVybiBwICsgKHEgLSBwKSAqIDYgKiB0O1xyXG4gICAgICAgICAgICBpZiAodCA8IDEgLyAyKSByZXR1cm4gcTtcclxuICAgICAgICAgICAgaWYgKHQgPCAyIC8gMykgcmV0dXJuIHAgKyAocSAtIHApICogKDIgLyAzIC0gdCkgKiA2O1xyXG4gICAgICAgICAgICByZXR1cm4gcDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHEgPSBsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzO1xyXG4gICAgICAgIGNvbnN0IHAgPSAyICogbCAtIHE7XHJcbiAgICAgICAgciA9IGh1ZTJyZ2IocCwgcSwgaCArIDEgLyAzKTtcclxuICAgICAgICBnID0gaHVlMnJnYihwLCBxLCBoKTtcclxuICAgICAgICBiID0gaHVlMnJnYihwLCBxLCBoIC0gMSAvIDMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtyICogMjU1IHwgMCwgZyAqIDI1NSB8IDAsIGIgKiAyNTUgfCAwXTtcclxufSIsImltcG9ydCB7IGluaXRfcGFsZXR0ZV9BLCBpbml0X3BhbGV0dGVfQiB9IGZyb20gXCIuL2luaXRfcGFsZXR0ZVwiO1xyXG5pbXBvcnQgeyBpbml0X2NhbnZhcyB9IGZyb20gXCIuL2luaXRfY2FudmFzXCI7XHJcblxyXG5leHBvcnQgY29uc3Qgc2NyZWVuX2RpbSA9IFs0MDAsIDQwMF07XHJcblxyXG5leHBvcnQgY29uc3QgbWFpbl9jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbi1jYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxubWFpbl9jYW52YXMud2lkdGggPSBzY3JlZW5fZGltWzBdO1xyXG5tYWluX2NhbnZhcy5oZWlnaHQgPSBzY3JlZW5fZGltWzFdO1xyXG5cclxuZXhwb3J0IGNvbnN0IHBhbGV0dGVfY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhbGV0dGUtY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbnBhbGV0dGVfY2FudmFzLndpZHRoID0gc2NyZWVuX2RpbVswXTtcclxucGFsZXR0ZV9jYW52YXMuaGVpZ2h0ID0gc2NyZWVuX2RpbVsxXTtcclxuXHJcbmV4cG9ydCBjb25zdCBwYWxldHRlX3NsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWxldHRlLXNsaWRlcicpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG5wYWxldHRlX3NsaWRlci53aWR0aCA9IHNjcmVlbl9kaW1bMF07XHJcbnBhbGV0dGVfc2xpZGVyLmhlaWdodCA9IHNjcmVlbl9kaW1bMV0gLyAxNjtcclxuXHJcbmV4cG9ydCBjb25zdCBjdHggPSBtYWluX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuZXhwb3J0IGNvbnN0IHBjdHggPSBwYWxldHRlX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuZXhwb3J0IGNvbnN0IHNjdHggPSBwYWxldHRlX3NsaWRlci5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuXHJcbmV4cG9ydCBsZXQgYnJ1c2hfcmFkaXVzID0gMjA7XHJcbmV4cG9ydCBsZXQgYnJ1c2hfY29sb3IgPSAnIzAwYWFmZic7XHJcblxyXG5pbml0X2NhbnZhcygpO1xyXG4vLyBpbml0X3BhbGV0dGVfQSgpO1xyXG5pbml0X3BhbGV0dGVfQigpOyIsImltcG9ydCB7IGN0eCwgYnJ1c2hfcmFkaXVzLCBtYWluX2NhbnZhcywgYnJ1c2hfY29sb3IgfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5cclxubGV0IG1vdXNlX2Rvd24gPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBjb25zdCBpbml0X2NhbnZhcyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGRyYXcgPSAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gYnJ1c2hfY29sb3I7XHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGN0eC5lbGxpcHNlKHgsIHksIGJydXNoX3JhZGl1cywgYnJ1c2hfcmFkaXVzLCAwLCAwLCAyICogTWF0aC5QSSk7XHJcbiAgICAgICAgY3R4LmZpbGwoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbWFpbl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcclxuICAgICAgICBtb3VzZV9kb3duID0gdHJ1ZTtcclxuICAgICAgICBkcmF3KGUub2Zmc2V0WCwgZS5vZmZzZXRZKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBtYWluX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmKCFtb3VzZV9kb3duKSByZXR1cm47XHJcbiAgICAgICAgZHJhdyhlLm9mZnNldFgsIGUub2Zmc2V0WSk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgbWFpbl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICBtb3VzZV9kb3duID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgbWFpbl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgICBtb3VzZV9kb3duID0gZmFsc2U7XHJcbiAgICB9KTtcclxufSIsImltcG9ydCB7IHBhbGV0dGVfY2FudmFzLCBwYWxldHRlX3NsaWRlciwgcGN0eCwgc2NyZWVuX2RpbSwgc2N0eCB9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4vY29sb3JcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBsZXJwID0gKHQ6IG51bWJlciwgYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IGEgKyB0ICogKGIgLSBhKTtcclxuXHJcbmV4cG9ydCBjb25zdCBkaXN0ID0gKHgxOiBudW1iZXIsIHkxOiBudW1iZXIsIHgyOiBudW1iZXIsIHkyOiBudW1iZXIpID0+IHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoKHgxIC0geDIpICoqIDIgKyAoeTEgLSB5MikgKiogMik7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpbml0X3BhbGV0dGVfQSA9ICgpID0+IHtcclxuICAgIGxldCBzdGVwcyA9IDEwMDtcclxuICAgIGxldCByYWRpdXMgPSBzY3JlZW5fZGltWzBdIC8gMjtcclxuXHJcbiAgICBsZXQgaW1nX2RhdGEgPSBwY3R4LmNyZWF0ZUltYWdlRGF0YShzY3JlZW5fZGltWzBdLCBzY3JlZW5fZGltWzFdKTtcclxuICAgIGxldCBudW1fcGl4ZWxzID0gc2NyZWVuX2RpbVswXSAqIHNjcmVlbl9kaW1bMV07XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbnVtX3BpeGVsczsgaSsrKXtcclxuICAgICAgICBsZXQgeCA9IGkgJSBzY3JlZW5fZGltWzBdO1xyXG4gICAgICAgIGxldCB5ID0gaSAvIHNjcmVlbl9kaW1bMF0gfCAwO1xyXG4gICAgICAgIGxldCBpNCA9IGkgKiA0O1xyXG5cclxuICAgICAgICBsZXQgdGhldGEgPSBNYXRoLmF0YW4yKHkgLSByYWRpdXMsIHggLSByYWRpdXMpO1xyXG4gICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguc3FydCgoeCAtIHJhZGl1cykgKiogMiArICh5IC0gcmFkaXVzKSAqKiAyKTtcclxuICAgICAgICBsZXQgd2VpZ2h0ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgZGlzdGFuY2UgLyByYWRpdXMpKTtcclxuICAgICAgICBsZXQgYW5nbGUgPSB0aGV0YSAvICgyICogTWF0aC5QSSkgKiAzNjA7XHJcbiAgICAgICAgbGV0IGNvbG9yID0gQ29sb3IuaHNsKGFuZ2xlLCAxMDAsIDEwMCAtIDUwICogd2VpZ2h0KS5yZ2I7XHJcblxyXG4gICAgICAgIGlmKGRpc3RhbmNlID4gcmFkaXVzKSBjb2xvciA9IENvbG9yLnJnYigyNTUsIDI1NSwgMjU1KS5yZ2I7XHJcblxyXG4gICAgICAgIGltZ19kYXRhLmRhdGFbaTRdID0gY29sb3JbMF07XHJcbiAgICAgICAgaW1nX2RhdGEuZGF0YVtpNCArIDFdID0gY29sb3JbMV07XHJcbiAgICAgICAgaW1nX2RhdGEuZGF0YVtpNCArIDJdID0gY29sb3JbMl07XHJcbiAgICAgICAgaW1nX2RhdGEuZGF0YVtpNCArIDNdID0gMjU1O1xyXG4gICAgfVxyXG5cclxuICAgIHBjdHgucHV0SW1hZ2VEYXRhKGltZ19kYXRhLCAwLCAwKTtcclxuXHJcbiAgICBwY3R4LnN0cm9rZVN0eWxlID0gJyMwMDAwMDAnO1xyXG4gICAgcGN0eC5iZWdpblBhdGgoKTtcclxuICAgIHBjdHguZWxsaXBzZShyYWRpdXMsIHJhZGl1cywgcmFkaXVzLCByYWRpdXMsIDAsIDAsIDIgKiBNYXRoLlBJKTtcclxuICAgIHBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICBwY3R4LnN0cm9rZSgpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaW5pdF9wYWxldHRlX0IgPSAoKSA9PiB7XHJcbiAgICBsZXQgc3RlcHMgPSAxMDA7XHJcbiAgICBsZXQgcmFkaXVzID0gc2NyZWVuX2RpbVswXSAvIDI7XHJcbiAgICBsZXQgc2xpZGVyX2EgPSAxMDA7XHJcbiAgICBsZXQgc2xpZGVyX2IgPSAyMDA7XHJcbiAgICBsZXQgYW5jaG9ycyA9IFtbNTAsIDIwMF0sIFszMDAsIDEwMF0sIFszMDAsIDMwMF1dO1xyXG4gICAgbGV0IGN1cnZlX3BvaW50czogbnVtYmVyW11bXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0IHNhbXBsZV9jb2xvciA9ICh4OiBudW1iZXIsIHk6IG51bWJlciwgc3c6IG51bWJlciwgc2g6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGxldCBtaW5fZGlzdCA9IEluZmluaXR5O1xyXG4gICAgICAgIGxldCBtaW5faSA9IDA7XHJcbiAgICAgICAgbGV0IHNjYWxlX2ZhY3RvciA9IHN3IC8gc2NyZWVuX2RpbVswXTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgY3VydmVfcG9pbnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGN1cl9kaXN0ID0gZGlzdCh4LCB5LCBjdXJ2ZV9wb2ludHNbaV1bMF0gKiBzY2FsZV9mYWN0b3IsIGN1cnZlX3BvaW50c1tpXVsxXSAqIHNjYWxlX2ZhY3Rvcik7XHJcbiAgICAgICAgICAgIGlmKGN1cl9kaXN0IDwgbWluX2Rpc3Qpe1xyXG4gICAgICAgICAgICAgICAgbWluX2Rpc3QgPSBjdXJfZGlzdDtcclxuICAgICAgICAgICAgICAgIG1pbl9pID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdCA9IG1pbl9pIC8gKGN1cnZlX3BvaW50cy5sZW5ndGggLSAxKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbG9yID0gQ29sb3IuaHNsKFxyXG4gICAgICAgICAgICBsZXJwKHQsIHNsaWRlcl9hLCBzbGlkZXJfYiksIFxyXG4gICAgICAgICAgICB4IC8gc3cgKiAxMDAsIFxyXG4gICAgICAgICAgICBsZXJwKFxyXG4gICAgICAgICAgICAgICAgeCAvIHN3LFxyXG4gICAgICAgICAgICAgICAgbGVycCh5IC8gc2gsIDEwMCwgMCksXHJcbiAgICAgICAgICAgICAgICBsZXJwKHkgLyBzaCwgNTAsIDApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZHJhd19wYWxldHRlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN3ID0gMTAwO1xyXG4gICAgICAgIGNvbnN0IHNoID0gMTAwO1xyXG4gICAgICAgIGNvbnN0IHNtYWxsX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgICAgIHNtYWxsX2NhbnZhcy53aWR0aCA9IHN3O1xyXG4gICAgICAgIHNtYWxsX2NhbnZhcy5oZWlnaHQgPSBzaDtcclxuICAgICAgICBjb25zdCBzY2N0eCA9IHNtYWxsX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICAgICAgICBjdXJ2ZV9wb2ludHMgPSBiZXppZXJfdGhydV8zKDAsIGFuY2hvcnMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBpbWdfZGF0YSA9IHNjY3R4LmNyZWF0ZUltYWdlRGF0YShzdywgc2gpO1xyXG4gICAgICAgIGxldCBudW1fcGl4ZWxzID0gc3cgKiBzaDtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG51bV9waXhlbHM7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB4ID0gaSAlIHN3O1xyXG4gICAgICAgICAgICBsZXQgeSA9IGkgLyBzdyB8IDA7XHJcbiAgICAgICAgICAgIGxldCBpNCA9IGkgKiA0O1xyXG4gICAgXHJcbiAgICAgICAgICAgIGxldCBjb2xvciA9IHNhbXBsZV9jb2xvcih4LCB5LCBzdywgc2gpLnJnYjtcclxuICAgIFxyXG4gICAgICAgICAgICBpbWdfZGF0YS5kYXRhW2k0XSA9IGNvbG9yWzBdO1xyXG4gICAgICAgICAgICBpbWdfZGF0YS5kYXRhW2k0ICsgMV0gPSBjb2xvclsxXTtcclxuICAgICAgICAgICAgaW1nX2RhdGEuZGF0YVtpNCArIDJdID0gY29sb3JbMl07XHJcbiAgICAgICAgICAgIGltZ19kYXRhLmRhdGFbaTQgKyAzXSA9IDI1NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2NjdHgucHV0SW1hZ2VEYXRhKGltZ19kYXRhLCAwLCAwKTtcclxuICAgICAgICBwY3R4LmRyYXdJbWFnZShzbWFsbF9jYW52YXMsIDAsIDAsIHNjcmVlbl9kaW1bMF0sIHNjcmVlbl9kaW1bMV0pO1xyXG5cclxuICAgICAgICBwY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIHBjdHguc3Ryb2tlU3R5bGUgPSAnI2ZmZmZmZic7XHJcbiAgICAgICAgcGN0eC5saW5lV2lkdGggPSA0O1xyXG4gICAgICAgIHBjdHgubW92ZVRvKGN1cnZlX3BvaW50c1swXVswXSwgY3VydmVfcG9pbnRzWzBdWzFdKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAxOyBpIDwgY3VydmVfcG9pbnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgcGN0eC5saW5lVG8oY3VydmVfcG9pbnRzW2ldWzBdLCBjdXJ2ZV9wb2ludHNbaV1bMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwY3R4LnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBhbmNob3JzLmZvckVhY2goY29vcmQgPT4ge1xyXG4gICAgICAgICAgICBwY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBwY3R4LnN0cm9rZVN0eWxlID0gJyNmZmZmZmYnO1xyXG4gICAgICAgICAgICBwY3R4LmxpbmVXaWR0aCA9IDQ7XHJcbiAgICAgICAgICAgIHBjdHguZWxsaXBzZShjb29yZFswXSwgY29vcmRbMV0sIDEwLCAxMCwgMCwgMCwgMiAqIE1hdGguUEkpO1xyXG4gICAgICAgICAgICBwY3R4LnN0cm9rZSgpO1xyXG5cclxuICAgICAgICAgICAgcGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgcGN0eC5zdHJva2VTdHlsZSA9ICcjODg4ODg4JztcclxuICAgICAgICAgICAgcGN0eC5maWxsU3R5bGUgPSBzYW1wbGVfY29sb3IoY29vcmRbMF0sIGNvb3JkWzFdLCBzY3JlZW5fZGltWzBdLCBzY3JlZW5fZGltWzFdKS5zdHJpbmc7XHJcbiAgICAgICAgICAgIHBjdHgubGluZVdpZHRoID0gMjtcclxuICAgICAgICAgICAgcGN0eC5lbGxpcHNlKGNvb3JkWzBdLCBjb29yZFsxXSwgMTAsIDEwLCAwLCAwLCAyICogTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIHBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIHBjdHguZmlsbCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZHJhd19wYWxldHRlKCk7XHJcbiAgICBcclxuICAgIGxldCBwYWxldHRlX21vdXNlX2Rvd24gPSBmYWxzZTtcclxuICAgIHBhbGV0dGVfY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiAocGFsZXR0ZV9tb3VzZV9kb3duID0gdHJ1ZSwgY29sb3Jfd2hlZWxfaW5wdXQoZS5vZmZzZXRYLCBlLm9mZnNldFkpKSk7XHJcbiAgICBwYWxldHRlX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4gY29sb3Jfd2hlZWxfaW5wdXQoZS5vZmZzZXRYLCBlLm9mZnNldFkpKTtcclxuICAgIHBhbGV0dGVfY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiBwYWxldHRlX21vdXNlX2Rvd24gPSBmYWxzZSk7XHJcbiAgICBwYWxldHRlX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4gcGFsZXR0ZV9tb3VzZV9kb3duID0gZmFsc2UpXHJcblxyXG4gICAgY29uc3QgY29sb3Jfd2hlZWxfaW5wdXQgPSAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHtcclxuICAgICAgICBpZighcGFsZXR0ZV9tb3VzZV9kb3duKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQUhcIilcclxuICAgICAgICBsZXQgbWlkZGxlID0gcGFsZXR0ZV9zbGlkZXIuaGVpZ2h0IC8gMjtcclxuXHJcbiAgICAgICAgaWYoZGlzdChhbmNob3JzWzBdWzBdLCBhbmNob3JzWzBdWzFdLCB4LCB5KSA8IG1pZGRsZSl7XHJcbiAgICAgICAgICAgIGFuY2hvcnNbMF0gPSBbeCwgeV07XHJcbiAgICAgICAgfSBlbHNlIGlmKGRpc3QoYW5jaG9yc1sxXVswXSwgYW5jaG9yc1sxXVsxXSwgeCwgeSkgPCBtaWRkbGUpe1xyXG4gICAgICAgICAgICBhbmNob3JzWzFdID0gW3gsIHldO1xyXG4gICAgICAgIH0gZWxzZSBpZihkaXN0KGFuY2hvcnNbMl1bMF0sIGFuY2hvcnNbMl1bMV0sIHgsIHkpIDwgbWlkZGxlKXtcclxuICAgICAgICAgICAgYW5jaG9yc1syXSA9IFt4LCB5XTtcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBkcmF3X3BhbGV0dGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkcmF3X3NsaWRlciA9ICgpID0+IHtcclxuICAgICAgICBsZXQgc2xpZGVyX2ltZ19kYXRhID0gc2N0eC5jcmVhdGVJbWFnZURhdGEocGFsZXR0ZV9zbGlkZXIud2lkdGgsIHBhbGV0dGVfc2xpZGVyLmhlaWdodCk7XHJcbiAgICAgICAgbGV0IHNsaWRlcl9udW1fcGl4ZWxzID0gcGFsZXR0ZV9zbGlkZXIud2lkdGggKiBwYWxldHRlX3NsaWRlci5oZWlnaHQ7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNsaWRlcl9udW1fcGl4ZWxzOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgeCA9IGkgJSBwYWxldHRlX3NsaWRlci53aWR0aDtcclxuICAgICAgICAgICAgbGV0IGk0ID0gaSAqIDQ7XHJcbiAgICBcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0geCAvIHNjcmVlbl9kaW1bMF0gKiAzNjA7XHJcbiAgICAgICAgICAgIGxldCBjb2xvciA9IENvbG9yLmhzbChhbmdsZSwgMTAwLCA1MCkucmdiO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHNsaWRlcl9pbWdfZGF0YS5kYXRhW2k0XSA9IGNvbG9yWzBdO1xyXG4gICAgICAgICAgICBzbGlkZXJfaW1nX2RhdGEuZGF0YVtpNCArIDFdID0gY29sb3JbMV07XHJcbiAgICAgICAgICAgIHNsaWRlcl9pbWdfZGF0YS5kYXRhW2k0ICsgMl0gPSBjb2xvclsyXTtcclxuICAgICAgICAgICAgc2xpZGVyX2ltZ19kYXRhLmRhdGFbaTQgKyAzXSA9IDI1NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2N0eC5wdXRJbWFnZURhdGEoc2xpZGVyX2ltZ19kYXRhLCAwLCAwKTtcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlcl9hX3B4ID0gc2xpZGVyX2EgLyAzNjAgKiBwYWxldHRlX3NsaWRlci53aWR0aDtcclxuICAgICAgICBsZXQgc2xpZGVyX2JfcHggPSBzbGlkZXJfYiAvIDM2MCAqIHBhbGV0dGVfc2xpZGVyLndpZHRoO1xyXG4gICAgICAgIGxldCBzbGlkZXJfYV9jb2xvciA9IENvbG9yLmhzbChzbGlkZXJfYSwgMTAwLCA1MCkuc3RyaW5nO1xyXG4gICAgICAgIGxldCBzbGlkZXJfYl9jb2xvciA9IENvbG9yLmhzbChzbGlkZXJfYiwgMTAwLCA1MCkuc3RyaW5nO1xyXG4gICAgICAgIGxldCBtaWRkbGUgPSBwYWxldHRlX3NsaWRlci5oZWlnaHQgLyAyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHNjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgc2N0eC5zdHJva2VTdHlsZSA9ICcjODg4ODg4JztcclxuICAgICAgICBzY3R4LmZpbGxTdHlsZSA9IHNsaWRlcl9iX2NvbG9yO1xyXG4gICAgICAgIHNjdHgubGluZVdpZHRoID0gMztcclxuICAgICAgICBzY3R4LmVsbGlwc2UoXHJcbiAgICAgICAgICAgIHNsaWRlcl9iX3B4LCBtaWRkbGUsXHJcbiAgICAgICAgICAgIG1pZGRsZSwgbWlkZGxlLFxyXG4gICAgICAgICAgICAwLCAwLCAyICogTWF0aC5QSVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc2N0eC5maWxsKCk7XHJcbiAgICAgICAgc2N0eC5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgc2N0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBzY3R4LnN0cm9rZVN0eWxlID0gJyM4ODg4ODgnO1xyXG4gICAgICAgIHNjdHguZmlsbFN0eWxlID0gc2xpZGVyX2FfY29sb3I7XHJcbiAgICAgICAgc2N0eC5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIHNjdHguZWxsaXBzZShcclxuICAgICAgICAgICAgc2xpZGVyX2FfcHgsIG1pZGRsZSxcclxuICAgICAgICAgICAgbWlkZGxlLCBtaWRkbGUsXHJcbiAgICAgICAgICAgIDAsIDAsIDIgKiBNYXRoLlBJXHJcbiAgICAgICAgKTtcclxuICAgICAgICBzY3R4LmZpbGwoKTtcclxuICAgICAgICBzY3R4LnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBzY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIHNjdHgubW92ZVRvKHNsaWRlcl9hX3B4LCBtaWRkbGUpO1xyXG4gICAgICAgIHNjdHgubGluZVRvKHNsaWRlcl9hID4gc2xpZGVyX2IgPyBwYWxldHRlX3NsaWRlci53aWR0aCA6IHNsaWRlcl9iX3B4LCBtaWRkbGUpO1xyXG4gICAgICAgIHNjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgc2N0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBzY3R4Lm1vdmVUbyhzbGlkZXJfYl9weCwgbWlkZGxlKTtcclxuICAgICAgICBzY3R4LmxpbmVUbyhzbGlkZXJfYSA+IHNsaWRlcl9iID8gMCA6IHNsaWRlcl9hX3B4LCBtaWRkbGUpO1xyXG4gICAgICAgIHNjdHguc3Ryb2tlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1vdXNlX2Rvd24gPSBmYWxzZTtcclxuICAgIGxldCBzbGlkZXJfaW5wdXQgPSAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHtcclxuICAgICAgICBpZighbW91c2VfZG93bikgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVyX2FfcHggPSBzbGlkZXJfYSAvIDM2MCAqIHBhbGV0dGVfc2xpZGVyLndpZHRoO1xyXG4gICAgICAgIGxldCBzbGlkZXJfYl9weCA9IHNsaWRlcl9iIC8gMzYwICogcGFsZXR0ZV9zbGlkZXIud2lkdGg7XHJcbiAgICAgICAgbGV0IG1pZGRsZSA9IHBhbGV0dGVfc2xpZGVyLmhlaWdodCAvIDI7XHJcblxyXG4gICAgICAgIGlmKGRpc3Qoc2xpZGVyX2FfcHgsIG1pZGRsZSwgeCwgeSkgPCBtaWRkbGUpe1xyXG4gICAgICAgICAgICBzbGlkZXJfYSA9IHggLyBwYWxldHRlX3NsaWRlci53aWR0aCAqIDM2MDtcclxuICAgICAgICB9IGVsc2UgaWYoZGlzdChzbGlkZXJfYl9weCwgbWlkZGxlLCB4LCB5KSA8IG1pZGRsZSl7XHJcbiAgICAgICAgICAgIHNsaWRlcl9iID0geCAvIHBhbGV0dGVfc2xpZGVyLndpZHRoICogMzYwO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIGRyYXdfc2xpZGVyKCk7XHJcbiAgICAgICAgZHJhd19wYWxldHRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGFsZXR0ZV9zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IChtb3VzZV9kb3duID0gdHJ1ZSwgc2xpZGVyX2lucHV0KGUub2Zmc2V0WCwgZS5vZmZzZXRZKSkpO1xyXG4gICAgcGFsZXR0ZV9zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHNsaWRlcl9pbnB1dChlLm9mZnNldFgsIGUub2Zmc2V0WSkpO1xyXG4gICAgcGFsZXR0ZV9zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IG1vdXNlX2Rvd24gPSBmYWxzZSk7XHJcbiAgICBwYWxldHRlX3NsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4gbW91c2VfZG93biA9IGZhbHNlKVxyXG5cclxuICAgIGRyYXdfc2xpZGVyKCk7XHJcbn1cclxuXHJcbmNvbnN0IGJlemllcl90aHJ1XzMgPSAodDogbnVtYmVyLCBhbmNob3JzOiBudW1iZXJbXVtdKSA9PiB7XHJcbiAgICBsZXQgcDAgPSBhbmNob3JzWzBdO1xyXG4gICAgbGV0IHAyID0gYW5jaG9yc1syXTtcclxuICAgIGxldCBwYyA9IGFuY2hvcnNbMV07XHJcblxyXG4gICAgbGV0IHAxID0gW1xyXG4gICAgICAgIDIqcGNbMF0gLSBwMFswXS8yIC0gcDJbMF0vMixcclxuICAgICAgICAyKnBjWzFdIC0gcDBbMV0vMiAtIHAyWzFdLzIsXHJcbiAgICBdO1xyXG5cclxuICAgIGxldCBzdGVwcyA9IDMyO1xyXG4gICAgbGV0IHBvaW50cyA9IFtdO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8PSBzdGVwczsgaSsrKXtcclxuICAgICAgICBsZXQgdCA9IGkgLyBzdGVwcztcclxuICAgICAgICBwb2ludHMucHVzaChbXHJcbiAgICAgICAgICAgIHAwWzBdKnQqKjIgKyBwMVswXSoyKnQqKDEtdCkgKyBwMlswXSooMS10KSoqMixcclxuICAgICAgICAgICAgcDBbMV0qdCoqMiArIHAxWzFdKjIqdCooMS10KSArIHAyWzFdKigxLXQpKioyXHJcbiAgICAgICAgXSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcG9pbnRzO1xyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==