import { rgb_to_hex } from "./util/color";
import { PAINTMIXING_KS_DATA } from "./data/PAINTMIXING_KS_DATA";
import { vec3_mag, vec3_smul, mat3_vecmul } from "./util/linalg_matrix";

import { CIE_XYZ_DATA } from "./data/CIE_XYZ_DATA";
import { CIE_D65_DATA } from "./data/CIE_D65_DATA";
import { PaintDatabase, Spectrum } from "./paint_database";

export const test_swatches = () => {
    const screenDimension = [500, 1500];

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
    
    // "white"               -> titanium white
    // "cold yellow"         -> benzimidazolone yellow
    // "warm yellow"         -> diarylide yellow 
    // "yellow oxide"        -> yellow oxide
    // "orange"              -> pyrazolone orange
    // "red"                 -> naphthol red
    // "red oxide"           -> red oxide
    // "magenta"             -> quinacridone magenta
    // "violet"              -> dioxazine violet
    // "blue red shade"      -> phthalo blue, red shade
    // "blue green shade"    -> phthalo blue, green shade
    // "green"               -> phthalo green
    // "black"               -> carbon black
    
    // PW6 ' Titanium White (Titanium Dioxide)
    // PBK7 ' Carbon Black or Lamp Black (Amorphous carbon from soot)
    // PV23 ' Violet (Dioxazine Violet)
    // PG7 ' Phtalo Green (Phthalocyanine green ' blue shade)
    // PB15.4 ' Phthalo blue green shade (Copper Phthalocyanine)
    // PB15.2 ' Phthalo blue red shade (Copper Phthalocyanine)
    // PR122 ' Quinacridone magenta (Quinacridone)
    // PR170 ' Red (Naphthol AS Red)
    // PR101 (130) ' Red Oxide (Red iron oxide)
    // PY42 ' Yellow Oxide (Yellow iron oxide)
    // PO34 ' Orange (Pyrazolone Orange)
    // PY83 ' Warm yellow (Diarylide Yellow HR)
    // PY151 ' Cold yellow (Benzimidazolone Yellow)
    
    rgb_values.push([-1, -1, -1]);
    
    for(let i = 0; i <= 9; i++){
        let t = (i / 9) ** 2;
        rgb_values.push(rgb_from_K_S_combination(
            [PAINTMIXING_KS_DATA["green"], PAINTMIXING_KS_DATA["cold yellow"]],
            [t, (1 - t)],
        ));    
    }
    
    for(let i = 0; i <= 9; i++){
        let t = (i / 9) ** 2;
        rgb_values.push(rgb_from_K_S_combination(
            [PAINTMIXING_KS_DATA["blue green shade"], PAINTMIXING_KS_DATA["cold yellow"]],
            [t, (1 - t)],
        ));    
    }
    
    for(let i = 0; i <= 9; i++){
        let t = (i / 9) ** 2;
        rgb_values.push(rgb_from_K_S_combination(
            [PAINTMIXING_KS_DATA["blue red shade"], PAINTMIXING_KS_DATA["cold yellow"]],
            [t, (1 - t)],
        ));    
    }
    
    for(let i = 0; i <= 9; i++){
        let t = (i / 9) ** 2;
        rgb_values.push(rgb_from_K_S_combination(
            [PAINTMIXING_KS_DATA["green"], PAINTMIXING_KS_DATA["yellow oxide"]],
            [t, (1 - t)],
        ));    
    }
    
    for(let i = 0; i <= 9; i++){
        let t = (i / 9) ** 2;
        rgb_values.push(rgb_from_K_S_combination(
            [PAINTMIXING_KS_DATA["blue green shade"], PAINTMIXING_KS_DATA["yellow oxide"]],
            [t, (1 - t)],
        ));    
    }
    
    for(let i = 0; i <= 9; i++){
        let t = (i / 9) ** 2;
        rgb_values.push(rgb_from_K_S_combination(
            [PAINTMIXING_KS_DATA["blue red shade"], PAINTMIXING_KS_DATA["yellow oxide"]],
            [t, (1 - t)],
        ));    
    }
    
    for(let i = 0; i <= 9; i++){
        let t = (i / 9) ** 2;
        rgb_values.push(rgb_from_K_S_combination(
            [PAINTMIXING_KS_DATA["green"], PAINTMIXING_KS_DATA["warm yellow"]],
            [t, (1 - t)],
        ));    
    }
    
    for(let i = 0; i <= 9; i++){
        let t = (i / 9) ** 2;
        rgb_values.push(rgb_from_K_S_combination(
            [PAINTMIXING_KS_DATA["blue green shade"], PAINTMIXING_KS_DATA["warm yellow"]],
            [t, (1 - t)],
        ));    
    }
    
    for(let i = 0; i <= 9; i++){
        let t = (i / 9) ** 2;
        rgb_values.push(rgb_from_K_S_combination(
            [PAINTMIXING_KS_DATA["blue red shade"], PAINTMIXING_KS_DATA["warm yellow"]],
            [t, (1 - t)],
        ));    
    }
    
    // for(let i = 0; i <= 9; i++){
    //     let t = (i / 9) ** 2;
    //     rgb_values.push(rgb_from_K_S_combination(
    //         [PAINTMIXING_KS_DATA["blue green shade"], PAINTMIXING_KS_DATA["cold yellow"]],
    //         [t, (1 - t)],
    //     ));    
    // }
    
    // for(let i = 0; i <= 9; i++){
    //     let t = (i / 9) ** 2;
    //     rgb_values.push(rgb_from_K_S_combination(
    //         [PAINTMIXING_KS_DATA["blue green shade"], PAINTMIXING_KS_DATA["warm yellow"]],
    //         [t, (1 - t)],
    //     ));    
    // }
    
    // for(let i = 0; i <= 9; i++){
    //     let t = (i / 9) ** 0.5;
    //     rgb_values.push(rgb_from_K_S_combination(
    //         [PAINTMIXING_KS_DATA["white"], PAINTMIXING_KS_DATA["magenta"]],
    //         [t, (1 - t)],
    //     ));    
    // }
    
    // for(let i = 0; i <= 9; i++){
    //     let t = (i / 9) ** 0.9;
    //     rgb_values.push(rgb_from_K_S_combination(
    //         [PAINTMIXING_KS_DATA["white"], PAINTMIXING_KS_DATA["green"]],
    //         [t, (1 - t)],
    //     ));    
    // }
    
    // for(let i = 0; i <= 9; i++){
    //     let t = (i / 9) ** 0.9;
    //     rgb_values.push(rgb_from_K_S_combination(
    //         [PAINTMIXING_KS_DATA["white"], PAINTMIXING_KS_DATA["blue green shade"]],
    //         [t, (1 - t)],
    //     ));    
    // }
    
    // for(let i = 0; i <= 9; i++){
    //     let t = (i / 9) ** 0.9;
    //     rgb_values.push(rgb_from_K_S_combination(
    //         [PAINTMIXING_KS_DATA["white"], PAINTMIXING_KS_DATA["blue red shade"]],
    //         [t, (1 - t)],
    //     ));    
    // }
    
    // for(let i = 0; i <= 9; i++){
    //     let t = (i / 9) ** 0.9;
    //     rgb_values.push(rgb_from_K_S_combination(
    //         [PAINTMIXING_KS_DATA["white"], PAINTMIXING_KS_DATA["violet"]],
    //         [t, (1 - t)],
    //     ));    
    // }
    
    rgb_values.push([-1, -1, -1]);
    
    Object.keys(PAINTMIXING_KS_DATA).map(key => {
        if(key == "white") return;
        for(let i = 0; i <= 9; i++){
            let t = (i / 9) ** 0.9;
            rgb_values.push(rgb_from_K_S_combination(
                [PAINTMIXING_KS_DATA["white"], PAINTMIXING_KS_DATA[key]],
                [t, (1 - t)],
            ));    
        }
    });
    
    
    rgb_values.push([-1, -1, -1]);
    
    for(let i = 0; i <= 9; i++){
        let t = (i / 9) ** 0.3;
        let white_point = 0.7;
        rgb_values.push(rgb_from_K_S_combination(
            [PAINTMIXING_KS_DATA["magenta"], PAINTMIXING_KS_DATA["violet"], PAINTMIXING_KS_DATA["white"]],
            [t * (1 - white_point), (1 - t) * (1 - white_point), white_point],
        ));    
    }
    
    
    for(let i = 0; i <= 9; i++){
        let t = (i / 9) ** 2;
        let white_point = 0.6;
        rgb_values.push(rgb_from_K_S_combination(
            [PAINTMIXING_KS_DATA["green"], PAINTMIXING_KS_DATA["cold yellow"], PAINTMIXING_KS_DATA["white"]],
            [t * (1 - white_point), (1 - t) * (1 - white_point), white_point],
        ));    
    }
    
    for(let i = 0; i <= 9; i++){
        let t = (i / 9) ** 0.9;
        let white_point = 0.8;
        rgb_values.push(rgb_from_K_S_combination(
            [PAINTMIXING_KS_DATA["orange"], PAINTMIXING_KS_DATA["blue red shade"], PAINTMIXING_KS_DATA["white"]],
            [t * (1 - white_point), (1 - t) * (1 - white_point), white_point],
        ));    
    }
    
    
    const step = screenDimension[0] / 10;
    let n = 0;
    for(let j = 0; j < 30; j++){
        inner: for(let i = 0; i < 10; i++){
            if(n >= rgb_values.length) break;
            if(rgb_values[n].includes(-1)) { n++; break inner; }
            
            const hex = rgb_to_hex(...rgb_values[n++].map(n => n | 0));
            // const color_name = PAINT_DATA[n].name;
            // console.log(n, hex, color_name);
    
            ctx.fillStyle = hex;
            ctx.fillRect(i * step, j * step, step, step);
        }
    }
    
    console.log(use_D65);
}