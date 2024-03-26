'use client'

import { PAINTMIXING_KS_DATA, PIGMENT_KS_TYPE } from "@/data/PAINTMIXING_KS_DATA";
import { RGB_to_HEX } from "@/util/color";
import { RGB_from_K_S_combination } from "@/util/color_mixer";
import { Container, Paper } from "@mui/material";
import { MouseEventHandler, RefObject, useEffect, useRef, useState } from "react";

export function TriangleGamutViewer(props: {
    pigment_W: PIGMENT_KS_TYPE, 
    pigment_A: PIGMENT_KS_TYPE, 
    pigment_B: PIGMENT_KS_TYPE, 
    pigment_C: PIGMENT_KS_TYPE, 
}){
    const canvas_width = 400;
    const canvas_height = 400;

    const [color, set_color] = useState([0, 0, 0])
    const [ratios, set_ratios] = useState([0, 1, 0, 0]);
    const pigment_W = props.pigment_W;
    const pigment_A = props.pigment_A;
    const pigment_B = props.pigment_B;
    const pigment_C = props.pigment_C;

    let get_color_from_ratios = (ratios: number[]) => RGB_from_K_S_combination([pigment_W, pigment_A, pigment_B, pigment_C], ratios);

    const canvas_ref: RefObject<HTMLCanvasElement> = useRef(null);
    let ctx: CanvasRenderingContext2D;
    const draw_call = (ctx: CanvasRenderingContext2D) => {
        console.log('draw call!');

        const sign = (p1: number[], p2: number[], p3: number[]) => (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1]);

        const point_in_triangle = (pt: number[], v1: number[], v2: number[], v3: number[]) => {
            let d1, d2, d3;
            let has_neg, has_pos;

            d1 = sign(pt, v1, v2);
            d2 = sign(pt, v2, v3);
            d3 = sign(pt, v3, v1);

            has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
            has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

            return !(has_neg && has_pos);
        }
        const distance = (p1: number[], p2: number[]) => Math.sqrt(
            (p1[0] - p2[0]) * (p1[0] - p2[0]) +
            (p1[1] - p2[1]) * (p1[1] - p2[1])
        );

        let scale = 1;
        let points: [number[], number[], number[]] = [
            [0, 0], 
            [0, canvas_height / scale], 
            [canvas_width / scale, 0.5 * canvas_height / scale]
        ];

        let [[x1, y1], [x2, y2], [x3, y3]] = points;

        for(let i = 0; i < canvas_width / scale; i++){
            for(let j = 0; j < canvas_height / scale; j++){
                let xy = [i, j], [x, y] = [i, j];
                let in_triangle = point_in_triangle(xy, ...points);
                if(!in_triangle) continue;

                let det = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3);
                let l1 = ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) / det;
                let l2 = ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) / det;
                let l3 = 1 - l1 - l2;

                let w = 0.5;
                let ratios = [w, (1 - w) * l1, (1 - w) * l2, (1 - w) * l3];

                let c = get_color_from_ratios(ratios);
                ctx.fillStyle = RGB_to_HEX(...c);
                ctx.fillRect(i * scale, j * scale, scale, scale);
            }
        }
    }

    useEffect(() => {
        const canvas = canvas_ref.current;
        if(!canvas) return;

        let context = canvas.getContext('2d');
        if(!context) return;
        ctx = context;
        draw_call(ctx);

    }, [draw_call]);
    
    console.log("draw triangle gamut");

    return (<Paper className="w-fit h-fit p-4 border m-1" elevation={1}>
        <canvas id="canvas_gamut_viewer" 
            className="border"
            ref={canvas_ref}
            width={canvas_width} 
            height={canvas_height}>

        </canvas>
    </Paper>)
}