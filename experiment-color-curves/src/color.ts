export class Color {
    rgb: number[];
    hex: number;
    hsl: number[];
    string: string;
    constructor(rgb: number[], hex: number, hsl: number[]) {
        this.rgb = rgb;
        this.hex = hex;
        this.hsl = hsl;
        this.string = `#${rgb.map(n => n.toString(16).padStart(2, '0')).join('')}`;
    }

    static rgb(r: number, g: number, b: number){
        let rgb = [r, g, b];
        let hex = rgb_to_hex(rgb);
        let hsl = rgb_to_hsl(rgb);
        return new Color(rgb, hex, hsl);
    }

    static hex(hex: number){
        let rgb = hex_to_rgb(hex);
        let hsl = rgb_to_hsl(rgb);
        return new Color(rgb, hex, hsl);
    }

    static hsl(h: number, s: number, l: number){
        let hsl = [h, s, l];
        let rgb = hsl_to_rgb(hsl);
        let hex = rgb_to_hex(rgb);
        return new Color(rgb, hex, hsl);
    }
}

const rgb_to_hex = (rgb: number[]) => {
    return rgb[0] * 256 * 256 + rgb[1] * 256 + rgb[2];
}

const hex_to_rgb = (hex: number) => {
    let r = hex / (256 * 256) | 0;
    let g = hex % (256 * 256) / 256 | 0;
    let b = hex % 256 | 0;
    return [r, g, b];
}

const rgb_to_hsl = (rgb: number[]) => {
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
}

const hsl_to_rgb = (hsl: number[]) => {
    let [h, s, l] = hsl;
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [r * 255 | 0, g * 255 | 0, b * 255 | 0];
}