export const RGB_to_HEX = (...rgb: number[]) => {
    const [r, g, b] = rgb.map(n => n | 0);
    const hex_r = r.toString(16).padStart(2, '0');
    const hex_g = g.toString(16).padStart(2, '0');
    const hex_b = b.toString(16).padStart(2, '0');
    return `#${hex_r}${hex_g}${hex_b}`;
} 