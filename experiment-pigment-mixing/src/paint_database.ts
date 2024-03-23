import { PAINTMIXING_MASSTONE_DATA, PAINTMIXING_MASSTONE_DATA_TYPE, PAINTMIXING_WAVELENGTH_DATA } from "./data/PAINTMIXING_MASSTONE_DATA";
import { PAINTMIXING_MIX_DATA, PAINTMIXING_MIX_DATA_TYPE } from "./data/PAINTMIXING_MIX_DATA";

export type PaintParameters = {
    name: string;
    S: Spectrum;
    K: Spectrum;
}

export class Spectrum {
    wavelengths: number[];
    values: number[];

    constructor(wavelengths: number[], values: number[]){
        this.wavelengths = wavelengths;
        this.values = values;
    }
}

export class PaintDatabase {
    wavelengths: { type: string; values: number[]; };
    masstone_data: PAINTMIXING_MASSTONE_DATA_TYPE[];
    mix_data: PAINTMIXING_MIX_DATA_TYPE[];

    constructor(){
        this.wavelengths = PAINTMIXING_WAVELENGTH_DATA;
        this.masstone_data = PAINTMIXING_MASSTONE_DATA;
        this.mix_data = PAINTMIXING_MIX_DATA;

        this.compute_KS();
    }

    compute_K_S_ratios(reflectance: number[]){
        return reflectance.map(v => (1 - v) * (1 - v) / (4.0 * v));
    }

    compute_K_from_S(reflectance: number[], S: Spectrum){
        const K = this.compute_K_S_ratios(reflectance).map((n, i) => n * S.values[i]);
        return new Spectrum(this.wavelengths.values, K);
    }

    compute_KS(){
        const white_name = "white";

        const white_sample = this.masstone_data.find(d => d.name === white_name) as PAINTMIXING_MASSTONE_DATA_TYPE;
        const white_temp_S = new Spectrum(this.wavelengths.values, white_sample.reflectance);
        const white_paint: PaintParameters = {
            name: white_name,
            S: white_temp_S,
            K: this.compute_K_from_S(white_sample.reflectance, white_temp_S)
        }

        // TODO: ....
    }
}

export const database = new PaintDatabase();