import { PAINT_DATA } from "./data/PAINT_DATA";
import { CIE_XYZ_DATA } from "./data/CIE_XYZ_DATA";
import { CIE_D65_DATA } from "./data/CIE_D65_DATA";
import { mat3_vecmul, smul_mat3, vec3_mag, vec3_smul } from "./util/linalg_matrix";

const screenDimension = [400, 400];

const mainCanvas = document.getElementById('main-canvas') as HTMLCanvasElement;
mainCanvas.width = screenDimension[0];
mainCanvas.height = screenDimension[1];

const ctx = mainCanvas.getContext('2d') as CanvasRenderingContext2D;

console.log("hello world");

const R_mix_from_KS = (KS: number) => 1 + KS - Math.sqrt(KS * KS + 2 * KS);

const adjust_R_mix = (R_mix: number, k: number) => (1 - k) * (1 - k) * R_mix / (1 - k * R_mix);

let max_XYZ_strength = 0;

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
        const k = color.reflectance[i];
        const R_mix = R_mix_from_KS(KS);
        // const R_mix = adjust_R_mix(R_mix_from_KS(KS), k);

        X += x_hat * D65 * R_mix;
        Y += y_hat * D65 * R_mix;
        Z += z_hat * D65 * R_mix;
    
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
        Y_D65 += y_hat * D65;
    }
    
    console.log(X, Y, Z);
    
    const xyz_strength = vec3_mag(XYZ_c);
    const result = vec3_smul(mat3_vecmul(XYZ_to_RGB_mat, XYZ_c), 1);
    
    console.log(result, xyz_strength, color.name);
    if(max_XYZ_strength < xyz_strength) max_XYZ_strength = xyz_strength;

    return result;
}

PAINT_DATA.map(d => pigment_to_rgb(d))
console.log(max_XYZ_strength);