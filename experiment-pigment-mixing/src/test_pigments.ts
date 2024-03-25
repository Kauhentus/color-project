import { rgb_to_hex } from "./util/color";
import { PAINTMIXING_KS_DATA } from "./data/PAINTMIXING_KS_DATA";
import { vec3_mag, vec3_smul, mat3_vecmul } from "./util/linalg_matrix";

import { CIE_XYZ_DATA } from "./data/CIE_XYZ_DATA";
import { CIE_D65_DATA } from "./data/CIE_D65_DATA";
import { PaintDatabase, Spectrum } from "./paint_database";

export const test_pigments = () => {
    const screenDimension = [500, 500];

    const mainCanvas = document.getElementById('main-canvas') as HTMLCanvasElement;
    mainCanvas.width = screenDimension[0];
    mainCanvas.height = screenDimension[1];
    
    const ctx = mainCanvas.getContext('2d') as CanvasRenderingContext2D;
    
    const R_mix_from_KS = (KS: number) => 1 + KS - Math.sqrt(KS * KS + 2 * KS);
    const adjust_R_mix = (R_mix: number, k: number) => (1 - k) * (1 - k) * R_mix / (1 - k * R_mix);
    let max_XYZ_strength = 0;
    const use_D65 = true;
    
    const rgb_from_K_S = (K: Spectrum, S: Spectrum) => {
        let X = 0;
        let Y = 0;
        let Z = 0;
        const dlambda = 1.84;
        for(let i = 0; i < S.wavelengths.length; i++){
            const lambda = Math.round(S.wavelengths[i]);
    
            // @ts-ignore
            const [x_hat, y_hat, z_hat] = vec3_smul(CIE_XYZ_DATA[lambda], 1);
            // @ts-ignore
            const D65 = CIE_D65_DATA[lambda];
    
            const KS = K.values[i] / S.values[i];
            const R_mix = R_mix_from_KS(KS);
    
            X += x_hat * D65 * R_mix * dlambda;
            Y += y_hat * D65 * R_mix * dlambda;
            Z += z_hat * D65 * R_mix * dlambda;
        
            i += 1;
        }
        
        let Y_D65 = 0;
        for(let i = 0; i < S.wavelengths.length; i++){
            const lambda = Math.round(S.wavelengths[i]);
            // @ts-ignore
            const [x_hat, y_hat, z_hat] = CIE_XYZ_DATA[lambda];
            // @ts-ignore
            const D65 = CIE_D65_DATA[lambda];
            Y_D65 += y_hat * D65 * dlambda;
        }
    
        const XYZ_c = [X / Y_D65, Y / Y_D65, Z / Y_D65];
        
        const XYZ_to_RGB_mat = [
            3.2406, -0.9689, 0.0557,
            -1.5372, 1.8758, -0.2040,
            -0.4986, 0.0415, 1.0570
        ];
        
        // console.log(X, Y, Z, Y_D65);
        
        let result: number[] = mat3_vecmul(XYZ_to_RGB_mat, XYZ_c)
            .map(n => ((n * 2) ** 0.5) * 255)
            .map(n => Math.min(Math.max(n, 0), 255));
        // console.log(result);
    
        return result;
    }
    
    const black_point =  [65.57811077066799, 60.36814711164087, 57.21053094620101];
    const rgb_from_K_S_combination = (P: {
        S: {
            wavelengths: number[];
            values: number[];
        };
        K: {
            wavelengths: number[];
            values: number[];
        };
    }[], weights: number[]) => {
        const K = P.map(p => p.K);
        const S = P.map(p => p.S);
        let X = 0;
        let Y = 0;
        let Z = 0;
        const dlambda = 1.84;
        for(let i = 0; i < S[0].wavelengths.length; i++){
            const lambda = Math.round(S[0].wavelengths[i]);
    
            // @ts-ignore
            const [x_hat, y_hat, z_hat] = vec3_smul(CIE_XYZ_DATA[lambda], 1);
            // @ts-ignore
            const D65 = CIE_D65_DATA[lambda];
    
            let K_mix = 0, S_mix = 0;
            for(let c = 0; c < K.length; c++){
                K_mix += K[c].values[i] * weights[c];
                S_mix += S[c].values[i] * weights[c];
            }
            const KS = K_mix / S_mix;
            const R_mix = R_mix_from_KS(KS);
    
            X += x_hat * D65 * R_mix * dlambda;
            Y += y_hat * D65 * R_mix * dlambda;
            Z += z_hat * D65 * R_mix * dlambda;
        
            i += 1;
        }
        
        let Y_D65 = 0;
        for(let i = 0; i < S[0].wavelengths.length; i++){
            const lambda = Math.round(S[0].wavelengths[i]);
            // @ts-ignore
            const [x_hat, y_hat, z_hat] = CIE_XYZ_DATA[lambda];
            // @ts-ignore
            const D65 = CIE_D65_DATA[lambda];
            Y_D65 += y_hat * D65 * dlambda;
        }
    
        const XYZ_c = [X / Y_D65, Y / Y_D65, Z / Y_D65];
        
        const XYZ_to_RGB_mat = [
            3.2406, -0.9689, 0.0557,
            -1.5372, 1.8758, -0.2040,
            -0.4986, 0.0415, 1.0570
        ];
        
        // console.log(X, Y, Z, Y_D65);
        
        let result: number[] = mat3_vecmul(XYZ_to_RGB_mat, XYZ_c)
            .map(n => ((n * 2) ** 0.5) * 255)
            .map(n => {
                let lowest = Math.min(...black_point);
                let shifted_n = n - lowest;
                let remapped_n = shifted_n * 255 / (255 - lowest);
                return remapped_n;
            })
            .map(n => Math.min(Math.max(n, 0), 255));
        // console.log(result);
    
        return result;
    }
    
    const rgb_values = Object.keys(PAINTMIXING_KS_DATA).map(name => {
        // @ts-ignore
        const color_data = PAINTMIXING_KS_DATA[name];
        const rgb = rgb_from_K_S(color_data.K, color_data.S);
        // console.log(name, color_data, rgb);
        return rgb;
    });

    // 0  "white"               -> titanium white
    // 1  "cold yellow"         -> benzimidazolone yellow
    // 2  "warm yellow"         -> diarylide yellow 
    // 3  "yellow oxide"        -> yellow oxide
    // 4  "orange"              -> pyrazolone orange
    // 5  "red"                 -> naphthol red
    // 6  "red oxide"           -> red oxide
    // 7  "magenta"             -> quinacridone magenta
    // 8  "violet"              -> dioxazine violet
    // 9  "blue red shade"      -> phthalo blue, red shade
    // 10 "blue green shade"    -> phthalo blue, green shade
    // 11 "green"               -> phthalo green
    // 12 "black"               -> carbon black

    const pigment_W = PAINTMIXING_KS_DATA["white"];
    const pigment_A = PAINTMIXING_KS_DATA["cold yellow"];
    const pigment_B = PAINTMIXING_KS_DATA["orange"];
    const pigment_C = PAINTMIXING_KS_DATA["black"];

    let ratios = [0, 1, 0, 0];

    let get_color_from_ratios = (ratios: number[]) => rgb_from_K_S_combination(
        [pigment_W, pigment_A, pigment_B, pigment_C],
        ratios
    );

    let render = () => {
        let cur_color = get_color_from_ratios(ratios);
        ctx.fillStyle = rgb_to_hex(...cur_color);
        ctx.fillRect(0, 0, 100, 50);   
    
        let num_steps = 500;
        let step_size = screenDimension[0] / num_steps;
        for(let i = 0; i < num_steps; i++){
            let t = (1 - i / (num_steps - 1)) ** 0.5;
            
            let new_ratios0 = ratios.map(n => n * t);
            new_ratios0[0] += (1 - t);
            let new_color0 = get_color_from_ratios(new_ratios0);
            ctx.fillStyle = rgb_to_hex(...new_color0);
            ctx.fillRect(i * step_size, 100, step_size, 50);
    
            let new_ratios1 = ratios.map(n => n * t);
            new_ratios1[1] += (1 - t);
            let new_color1 = get_color_from_ratios(new_ratios1);
            ctx.fillStyle = rgb_to_hex(...new_color1);
            ctx.fillRect(i * step_size, 150, step_size, 50);
    
            let new_ratios2 = ratios.map(n => n * t);
            new_ratios2[2] += (1 - t);
            let new_color2 = get_color_from_ratios(new_ratios2);
            ctx.fillStyle = rgb_to_hex(...new_color2);
            ctx.fillRect(i * step_size, 200, step_size, 50);
    
            let new_ratios3 = ratios.map(n => n * t);
            new_ratios3[3] += (1 - t);
            let new_color3 = get_color_from_ratios(new_ratios3);
            ctx.fillStyle = rgb_to_hex(...new_color3);
            ctx.fillRect(i * step_size, 250, step_size, 50);
        }
    }
    render();

    mainCanvas.addEventListener('click', (e) => {
        const x = e.offsetX, y = e.offsetY;

        let changed = false;
        let channel = 0;
        if(100 <= y && y <= 150) { channel = 0; changed = true }
        else if(150 <= y && y <= 200) { channel = 1; changed = true }
        else if(200 <= y && y <= 250) { channel = 2; changed = true }
        else if(250 <= y && y <= 300) { channel = 3; changed = true }

        if(changed){
            const t = (1 - x / screenDimension[0]) ** 0.5;
            
            let new_ratios = ratios.map(n => n * t);
            new_ratios[channel] += (1 - t);
            console.log(ratios, new_ratios, t)
            ratios = new_ratios;
            render();

        }
    });
}