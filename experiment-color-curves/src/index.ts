import { init_palette_A, init_palette_B } from "./init_palette";
import { init_canvas } from "./init_canvas";

export const screen_dim = [400, 400];

export const main_canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
main_canvas.width = screen_dim[0];
main_canvas.height = screen_dim[1];

export const palette_canvas = document.getElementById('palette-canvas') as HTMLCanvasElement;
palette_canvas.width = screen_dim[0];
palette_canvas.height = screen_dim[1];

export const palette_slider = document.getElementById('palette-slider') as HTMLCanvasElement;
palette_slider.width = screen_dim[0];
palette_slider.height = screen_dim[1] / 16;

export const ctx = main_canvas.getContext('2d') as CanvasRenderingContext2D;
export const pctx = palette_canvas.getContext('2d') as CanvasRenderingContext2D;
export const sctx = palette_slider.getContext('2d') as CanvasRenderingContext2D;

export let brush_radius = 20;
export let brush_color = '#00aaff';

init_canvas();
// init_palette_A();
init_palette_B();