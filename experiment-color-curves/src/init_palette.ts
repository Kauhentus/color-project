import { palette_canvas, palette_slider, pctx, screen_dim, sctx } from "./index";
import { Color } from "./color";

export const lerp = (t: number, a: number, b: number) => a + t * (b - a);

export const dist = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

export const init_palette_A = () => {
    let steps = 100;
    let radius = screen_dim[0] / 2;

    let img_data = pctx.createImageData(screen_dim[0], screen_dim[1]);
    let num_pixels = screen_dim[0] * screen_dim[1];
    for(let i = 0; i < num_pixels; i++){
        let x = i % screen_dim[0];
        let y = i / screen_dim[0] | 0;
        let i4 = i * 4;

        let theta = Math.atan2(y - radius, x - radius);
        let distance = Math.sqrt((x - radius) ** 2 + (y - radius) ** 2);
        let weight = Math.max(0, Math.min(1, distance / radius));
        let angle = theta / (2 * Math.PI) * 360;
        let color = Color.hsl(angle, 100, 100 - 50 * weight).rgb;

        if(distance > radius) color = Color.rgb(255, 255, 255).rgb;

        img_data.data[i4] = color[0];
        img_data.data[i4 + 1] = color[1];
        img_data.data[i4 + 2] = color[2];
        img_data.data[i4 + 3] = 255;
    }

    pctx.putImageData(img_data, 0, 0);

    pctx.strokeStyle = '#000000';
    pctx.beginPath();
    pctx.ellipse(radius, radius, radius, radius, 0, 0, 2 * Math.PI);
    pctx.closePath();
    pctx.stroke();
}

export const init_palette_B = () => {
    let steps = 100;
    let radius = screen_dim[0] / 2;
    let slider_a = 100;
    let slider_b = 200;
    let anchors = [[50, 200], [300, 100], [300, 300]];
    let curve_points: number[][] = [];

    const sample_color = (x: number, y: number, sw: number, sh: number) => {
        let min_dist = Infinity;
        let min_i = 0;
        let scale_factor = sw / screen_dim[0];
        for(let i = 0; i < curve_points.length; i++){
            let cur_dist = dist(x, y, curve_points[i][0] * scale_factor, curve_points[i][1] * scale_factor);
            if(cur_dist < min_dist){
                min_dist = cur_dist;
                min_i = i;
            }
        }
        let t = min_i / (curve_points.length - 1);

        let color = Color.hsl(
            lerp(t, slider_a, slider_b), 
            x / sw * 100, 
            lerp(
                x / sw,
                lerp(y / sh, 100, 0),
                lerp(y / sh, 50, 0)
            )
        );

        return color;
    }

    const draw_palette = () => {
        const sw = 100;
        const sh = 100;
        const small_canvas = document.createElement('canvas');
        small_canvas.width = sw;
        small_canvas.height = sh;
        const scctx = small_canvas.getContext('2d') as CanvasRenderingContext2D;
        curve_points = bezier_thru_3(0, anchors);
        
        let img_data = scctx.createImageData(sw, sh);
        let num_pixels = sw * sh;

        for(let i = 0; i < num_pixels; i++){
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
        pctx.drawImage(small_canvas, 0, 0, screen_dim[0], screen_dim[1]);

        pctx.beginPath();
        pctx.strokeStyle = '#ffffff';
        pctx.lineWidth = 4;
        pctx.moveTo(curve_points[0][0], curve_points[0][1]);
        for(let i = 1; i < curve_points.length; i++){
            pctx.lineTo(curve_points[i][0], curve_points[i][1]);
        }
        pctx.stroke();

        anchors.forEach(coord => {
            pctx.beginPath();
            pctx.strokeStyle = '#ffffff';
            pctx.lineWidth = 4;
            pctx.ellipse(coord[0], coord[1], 10, 10, 0, 0, 2 * Math.PI);
            pctx.stroke();

            pctx.beginPath();
            pctx.strokeStyle = '#888888';
            pctx.fillStyle = sample_color(coord[0], coord[1], screen_dim[0], screen_dim[1]).string;
            pctx.lineWidth = 2;
            pctx.ellipse(coord[0], coord[1], 10, 10, 0, 0, 2 * Math.PI);
            pctx.stroke();
            pctx.fill();
        });
    }
    draw_palette();
    
    let palette_mouse_down = false;
    palette_canvas.addEventListener('mousedown', (e) => (palette_mouse_down = true, color_wheel_input(e.offsetX, e.offsetY)));
    palette_canvas.addEventListener('mousemove', (e) => color_wheel_input(e.offsetX, e.offsetY));
    palette_canvas.addEventListener('mouseup', () => palette_mouse_down = false);
    palette_canvas.addEventListener('mouseleave', () => palette_mouse_down = false)

    const color_wheel_input = (x: number, y: number) => {
        if(!palette_mouse_down) return;

        console.log("AH")
        let middle = palette_slider.height / 2;

        if(dist(anchors[0][0], anchors[0][1], x, y) < middle){
            anchors[0] = [x, y];
        } else if(dist(anchors[1][0], anchors[1][1], x, y) < middle){
            anchors[1] = [x, y];
        } else if(dist(anchors[2][0], anchors[2][1], x, y) < middle){
            anchors[2] = [x, y];
        } 

        draw_palette();
    }

    const draw_slider = () => {
        let slider_img_data = sctx.createImageData(palette_slider.width, palette_slider.height);
        let slider_num_pixels = palette_slider.width * palette_slider.height;
        for(let i = 0; i < slider_num_pixels; i++){
            let x = i % palette_slider.width;
            let i4 = i * 4;
    
            let angle = x / screen_dim[0] * 360;
            let color = Color.hsl(angle, 100, 50).rgb;
    
            slider_img_data.data[i4] = color[0];
            slider_img_data.data[i4 + 1] = color[1];
            slider_img_data.data[i4 + 2] = color[2];
            slider_img_data.data[i4 + 3] = 255;
        }
        sctx.putImageData(slider_img_data, 0, 0);

        let slider_a_px = slider_a / 360 * palette_slider.width;
        let slider_b_px = slider_b / 360 * palette_slider.width;
        let slider_a_color = Color.hsl(slider_a, 100, 50).string;
        let slider_b_color = Color.hsl(slider_b, 100, 50).string;
        let middle = palette_slider.height / 2;
        
        sctx.beginPath();
        sctx.strokeStyle = '#888888';
        sctx.fillStyle = slider_b_color;
        sctx.lineWidth = 3;
        sctx.ellipse(
            slider_b_px, middle,
            middle, middle,
            0, 0, 2 * Math.PI
        );
        sctx.fill();
        sctx.stroke();

        sctx.beginPath();
        sctx.strokeStyle = '#888888';
        sctx.fillStyle = slider_a_color;
        sctx.lineWidth = 3;
        sctx.ellipse(
            slider_a_px, middle,
            middle, middle,
            0, 0, 2 * Math.PI
        );
        sctx.fill();
        sctx.stroke();

        sctx.beginPath();
        sctx.moveTo(slider_a_px, middle);
        sctx.lineTo(slider_a > slider_b ? palette_slider.width : slider_b_px, middle);
        sctx.stroke();
        sctx.beginPath();
        sctx.moveTo(slider_b_px, middle);
        sctx.lineTo(slider_a > slider_b ? 0 : slider_a_px, middle);
        sctx.stroke();
    }

    let mouse_down = false;
    let slider_input = (x: number, y: number) => {
        if(!mouse_down) return;

        let slider_a_px = slider_a / 360 * palette_slider.width;
        let slider_b_px = slider_b / 360 * palette_slider.width;
        let middle = palette_slider.height / 2;

        if(dist(slider_a_px, middle, x, y) < middle){
            slider_a = x / palette_slider.width * 360;
        } else if(dist(slider_b_px, middle, x, y) < middle){
            slider_b = x / palette_slider.width * 360;
        } 

        draw_slider();
        draw_palette();
    }

    palette_slider.addEventListener('mousedown', (e) => (mouse_down = true, slider_input(e.offsetX, e.offsetY)));
    palette_slider.addEventListener('mousemove', (e) => slider_input(e.offsetX, e.offsetY));
    palette_slider.addEventListener('mouseup', () => mouse_down = false);
    palette_slider.addEventListener('mouseleave', () => mouse_down = false)

    draw_slider();
}

const bezier_thru_3 = (t: number, anchors: number[][]) => {
    let p0 = anchors[0];
    let p2 = anchors[2];
    let pc = anchors[1];

    let p1 = [
        2*pc[0] - p0[0]/2 - p2[0]/2,
        2*pc[1] - p0[1]/2 - p2[1]/2,
    ];

    let steps = 32;
    let points = [];
    for(let i = 0; i <= steps; i++){
        let t = i / steps;
        points.push([
            p0[0]*t**2 + p1[0]*2*t*(1-t) + p2[0]*(1-t)**2,
            p0[1]*t**2 + p1[1]*2*t*(1-t) + p2[1]*(1-t)**2
        ])
    }

    return points;
}