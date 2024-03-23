import { ctx, brush_radius, main_canvas, brush_color } from "./index";

let mouse_down = false;

export const init_canvas = () => {
    const draw = (x: number, y: number) => {
        ctx.fillStyle = brush_color;
        ctx.beginPath();
        ctx.ellipse(x, y, brush_radius, brush_radius, 0, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    main_canvas.addEventListener('mousedown', (e) => {
        mouse_down = true;
        draw(e.offsetX, e.offsetY);
    });
    
    main_canvas.addEventListener('mousemove', (e) => {
        if(!mouse_down) return;
        draw(e.offsetX, e.offsetY);
    });
    
    main_canvas.addEventListener('mouseup', () => {
        mouse_down = false;
    });
    
    main_canvas.addEventListener('mouseleave', () => {
        mouse_down = false;
    });
}