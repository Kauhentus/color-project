export const rgb_to_hex = (...rgb: number[]) => {
    const [r, g, b] = rgb;
    const hex_r = r.toString(16).padStart(2, '0');
    const hex_g = g.toString(16).padStart(2, '0');
    const hex_b = b.toString(16).padStart(2, '0');
    return `#${hex_r}${hex_g}${hex_b}`;
} 