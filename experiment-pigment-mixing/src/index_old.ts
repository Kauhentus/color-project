import { PAINT_DATA } from "./data/PAINT_DATA";
import { CIE_XYZ_DATA } from "./data/CIE_XYZ_DATA";
import { CIE_D65_DATA } from "./data/CIE_D65_DATA";
import { mat3_vecmul, smul_mat3, vec3_mag, vec3_smul } from "./util/linalg_matrix";
import { rgb_to_hex } from "./util/color";

const screenDimension = [500, 500];

const mainCanvas = document.getElementById('main-canvas') as HTMLCanvasElement;
mainCanvas.width = screenDimension[0];
mainCanvas.height = screenDimension[1];

const ctx = mainCanvas.getContext('2d') as CanvasRenderingContext2D;

console.log("hello world");

const R_mix_from_KS = (KS: number) => 1 + KS - Math.sqrt(KS * KS + 2 * KS);

const adjust_R_mix = (R_mix: number, k: number) => (1 - k) * (1 - k) * R_mix / (1 - k * R_mix);

let max_XYZ_strength = 0;
const use_D65 = false;

const pigment_to_rgb = (color: {
    name: string;
    LAB: number[];
    reflectance: number[];
    KS: number[];
}) => {

    let X = 0;
    let Y = 0;
    let Z = 0;
    let i = 0;

    for(let lambda = 400; lambda <= 700; lambda += 10){
        // @ts-ignore
        const [x_hat, y_hat, z_hat] = vec3_smul(CIE_XYZ_DATA[lambda], 1);
        // @ts-ignore
        const D65 = 1;

        const KS = color.KS[i];
        // const k = color.reflectance[i];
        const R_mix = R_mix_from_KS(KS);

        if(use_D65){
            X += x_hat * D65 * R_mix;
            Y += y_hat * D65 * R_mix;
            Z += z_hat * D65 * R_mix;
        } else {
            X += x_hat * R_mix;
            Y += y_hat * R_mix;
            Z += z_hat * R_mix;
        }
    
        i += 1;
    }
    
    const XYZ_c = [X, Y, Z];
    
    const XYZ_to_RGB_mat = [
        3.2406, -0.9689, 0.0557,
        -1.5372, 1.8758, -0.2040,
        -0.4986, 0.0415, 1.0570
    ];
    
    let Y_D65 = 0;
    for(let lambda = 400; lambda <= 700; lambda += 10){
        // @ts-ignore
        const [x_hat, y_hat, z_hat] = CIE_XYZ_DATA[lambda];
        // @ts-ignore
        const D65 = CIE_D65_DATA[lambda];
        Y_D65 += y_hat * D65 * 10;
    }
    
    console.log(X, Y, Z);
    
    let xyz_strength: number, result: number[];
    if(use_D65){
        xyz_strength = vec3_mag(XYZ_c) / Y_D65;
        result = vec3_smul(mat3_vecmul(XYZ_to_RGB_mat, XYZ_c), 1 / Y_D65);
    } else {
        xyz_strength = vec3_mag(XYZ_c);
        result = vec3_smul(mat3_vecmul(XYZ_to_RGB_mat, XYZ_c), 1);
    }

    console.log(result, xyz_strength, color.name);
    if(max_XYZ_strength < xyz_strength) max_XYZ_strength = xyz_strength;

    return result;
}

const nonnormalized_rgbs = PAINT_DATA.map(d => pigment_to_rgb(d));

const normalized_rgbs = nonnormalized_rgbs.map(rgb => rgb.map(n => {
    let out = n / max_XYZ_strength * 255;
    return Math.max(Math.min(out, 255), 0);
}));

console.log(normalized_rgbs);

const step = screenDimension[0] / 10;
for(let j = 0; j < 10; j++){
    for(let i = 0; i < 10; i++){
        let n = i + j * 10;
        if(n >= normalized_rgbs.length) break;
        const hex = rgb_to_hex(...normalized_rgbs[n].map(n => n | 0));
        const color_name = PAINT_DATA[n].name;

        console.log(n, hex, color_name);

        ctx.fillStyle = hex;
        ctx.fillRect(i * step, j * step, step, step);
    }
}

console.log(use_D65);