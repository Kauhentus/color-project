import { CIE_D65_DATA } from "@/data/CIE_D65_DATA";
import { CIE_XYZ_DATA } from "@/data/CIE_XYZ_DATA";
import { mat3_vecmul, vec3_smul } from "./linalg";

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


export const R_mix_from_KS = (KS: number) => 1 + KS - Math.sqrt(KS * KS + 2 * KS);

export const black_point =  [65.57811077066799, 60.36814711164087, 57.21053094620101];

export const RGB_from_K_S_combination = (P: {
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
        const [x_hat, y_hat, z_hat] = vec3_smul(CIE_XYZ_DATA[lambda], 1);
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
        const [x_hat, y_hat, z_hat] = CIE_XYZ_DATA[lambda];
        const D65 = CIE_D65_DATA[lambda];
        Y_D65 += y_hat * D65 * dlambda;
    }

    const XYZ_c = [X / Y_D65, Y / Y_D65, Z / Y_D65];
    const XYZ_to_RGB_mat = [
        3.2406, -0.9689, 0.0557,
        -1.5372, 1.8758, -0.2040,
        -0.4986, 0.0415, 1.0570
    ];
    
    let result: number[] = mat3_vecmul(XYZ_to_RGB_mat, XYZ_c)
        .map(n => ((n * 2) ** 0.5) * 255)
        .map(n => {
            let lowest = Math.min(...black_point);
            let shifted_n = n - lowest;
            let remapped_n = shifted_n * 255 / (255 - lowest);
            return remapped_n;
        })
        .map(n => Math.min(Math.max(n, 0), 255));

    return result;
}


