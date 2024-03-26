import { RGB_to_HEX } from "@/util/color";
import { Card, Paper } from "@mui/material";
import { MutableRefObject, useState } from "react";

export function ColorPalette(props: {
    selected_color: MutableRefObject<number[]>
}){
    const palette_rows = 8;
    const palette_cols = 6;
    const [colors, set_colors] = useState(new Array(palette_rows).fill(0).map(_ => new Array(palette_cols).fill('#ffffff')));

    console.log('draw palette');

    return (<Paper className="w-fit h-fit m-1" elevation={1}>
        <div className="flex flex-col m-2">
            {colors.map((row, row_number) => (<div 
                className="flex flex-row"
                key={`r: ${row_number}`}>
                {row.map((c, col_number) => (<div
                    className="w-12 h-12 bg-red-400 m-1 border"
                    style={{backgroundColor: c, cursor: 'pointer'}}
                    key={`c: ${row_number},${col_number}`}
                    onClick={(e) => {
                        let new_colors = colors.map(row => row.slice(0));
                        new_colors[row_number][col_number] = RGB_to_HEX(...props.selected_color.current);
                        set_colors(new_colors);
                    }}>

                </div>))}
            </div>))}
        </div>
    </Paper>)
}