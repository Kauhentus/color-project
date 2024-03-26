'use client';

import { ColorPalette } from "@/components/palette";
import { ColorPicker } from "@/components/slider";
import { TriangleGamutViewer } from "@/components/triangle";
import { PAINTMIXING_KS_DATA } from "@/data/PAINTMIXING_KS_DATA";
import { RGB_to_HEX } from "@/util/color";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Home() {
  const selected_color = useRef([0, 0, 0]);

  const pigment_W = PAINTMIXING_KS_DATA["white"];
  const pigment_A = PAINTMIXING_KS_DATA["cold yellow"];
  const pigment_B = PAINTMIXING_KS_DATA["orange"];
  const pigment_C = PAINTMIXING_KS_DATA["blue red shade"];

  const palette_rows = 8;
  const palette_cols = 6;

  return (<div className="flex flex-row">
    <div>
      <ColorPicker
        selected_color={selected_color}
        
        pigment_W={pigment_W}
        pigment_A={pigment_A}
        pigment_B={pigment_B}
        pigment_C={pigment_C}></ColorPicker>

      <TriangleGamutViewer
        pigment_W={pigment_W}
        pigment_A={pigment_A}
        pigment_B={pigment_B}
        pigment_C={pigment_C}></TriangleGamutViewer>

    </div>

    <ColorPalette
        selected_color={selected_color}></ColorPalette>

  </div>);
}
