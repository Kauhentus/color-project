'use client'

import { PAINTMIXING_KS_DATA, PIGMENT_KS_TYPE } from "@/data/PAINTMIXING_KS_DATA";
import { RGB_to_HEX } from "@/util/color";
import { RGB_from_K_S_combination } from "@/util/color_mixer";
import { Container, Paper } from "@mui/material";
import { Dispatch, MouseEventHandler, MutableRefObject, RefObject, SetStateAction, useEffect, useRef, useState } from "react";

export function ColorPicker(props: {
    selected_color: MutableRefObject<number[]>,

    pigment_W: PIGMENT_KS_TYPE, 
    pigment_A: PIGMENT_KS_TYPE, 
    pigment_B: PIGMENT_KS_TYPE, 
    pigment_C: PIGMENT_KS_TYPE, 
}){
    const canvas_width = 400;
    const canvas_height = 200;

    // const [color, set_color] = [props.selected_color, props.set_selected_color];
    const [color, set_color] = useState([0, 0, 0]);
    const [ratios, set_ratios] = useState([0, 1, 0, 0]);
    const pigment_W = props.pigment_W;
    const pigment_A = props.pigment_A;
    const pigment_B = props.pigment_B;
    const pigment_C = props.pigment_C;

    let get_color_from_ratios = (ratios: number[]) => RGB_from_K_S_combination([pigment_W, pigment_A, pigment_B, pigment_C], ratios);

    const canvas_ref: RefObject<HTMLCanvasElement> = useRef(null);
    let ctx: CanvasRenderingContext2D;
    const draw_call = (ctx: CanvasRenderingContext2D) => {    
        let num_steps = canvas_width;
        let step_size = canvas_width / num_steps;
        for(let i = 0; i < num_steps; i++){
            let t = (1 - i / (num_steps - 1)) ** 0.5;
            
            let new_ratios0 = ratios.map(n => n * t);
            new_ratios0[0] += (1 - t);
            let new_color0 = get_color_from_ratios(new_ratios0);
            ctx.fillStyle = RGB_to_HEX(...new_color0);
            ctx.fillRect(i * step_size, 100 - 100, step_size, 50);
    
            let new_ratios1 = ratios.map(n => n * t);
            new_ratios1[1] += (1 - t);
            let new_color1 = get_color_from_ratios(new_ratios1);
            ctx.fillStyle = RGB_to_HEX(...new_color1);
            ctx.fillRect(i * step_size, 150 - 100, step_size, 50);
    
            let new_ratios2 = ratios.map(n => n * t);
            new_ratios2[2] += (1 - t);
            let new_color2 = get_color_from_ratios(new_ratios2);
            ctx.fillStyle = RGB_to_HEX(...new_color2);
            ctx.fillRect(i * step_size, 200 - 100, step_size, 50);
    
            let new_ratios3 = ratios.map(n => n * t);
            new_ratios3[3] += (1 - t);
            let new_color3 = get_color_from_ratios(new_ratios3);
            ctx.fillStyle = RGB_to_HEX(...new_color3);
            ctx.fillRect(i * step_size, 250 - 100, step_size, 50);
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

    const canvas_clicked: MouseEventHandler<HTMLCanvasElement> = (e) => {
        const x = e.nativeEvent.offsetX, y = e.nativeEvent.offsetY;
        let changed = false;
        let channel = 0;
        if(100 - 100 <= y && y <= 150 - 100) { channel = 0; changed = true }
        else if(150 - 100 <= y && y <= 200 - 100) { channel = 1; changed = true }
        else if(200 - 100 <= y && y <= 250 - 100) { channel = 2; changed = true }
        else if(250 - 100 <= y && y <= 300 - 100) { channel = 3; changed = true }

        if(changed){
            const t = (1 - x / canvas_width) ** 0.5;
            let new_ratios = ratios.map(n => n * t);
            new_ratios[channel] += (1 - t);
            set_ratios(new_ratios);

            let resulting_color = get_color_from_ratios(new_ratios);
            set_color(resulting_color);
            props.selected_color.current = resulting_color;

            draw_call(ctx);
        }
    }
    
    console.log("draw color picker");

    return (<Paper className="w-fit h-fit p-4 border m-1" elevation={1}>
        <div className={`
            flex flex-row justify-around items-center
            mb-4`
        }>
            <div className="w-24 h-16 border" style={{backgroundColor: RGB_to_HEX(...color)}}></div>
            <div className="w-16 h-8 border" style={{backgroundColor: RGB_to_HEX(...RGB_from_K_S_combination([pigment_W], [1])), cursor: 'pointer' }}></div>
            <div className="w-16 h-8 border" style={{backgroundColor: RGB_to_HEX(...RGB_from_K_S_combination([pigment_A], [1])), cursor: 'pointer' }}></div>
            <div className="w-16 h-8 border" style={{backgroundColor: RGB_to_HEX(...RGB_from_K_S_combination([pigment_B], [1])), cursor: 'pointer' }}></div>
            <div className="w-16 h-8 border" style={{backgroundColor: RGB_to_HEX(...RGB_from_K_S_combination([pigment_C], [1])), cursor: 'pointer' }}></div>
        </div>
        <canvas id="canvas_color_picker" 
            className="border"
            ref={canvas_ref}
            width={canvas_width} 
            height={canvas_height}
            style={{cursor: 'pointer'}}
            onClick={canvas_clicked}>

        </canvas>
    </Paper>)
}