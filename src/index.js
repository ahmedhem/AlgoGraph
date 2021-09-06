import { Graph } from "./Canvas/Graph";
import { drawUI } from "./functions";
import { UI } from "./UI";

//...Initializing the UI and the Canvas variables

export const the_canvas = document.getElementById("main_canvas");

export const graph = new Graph();

if (the_canvas && the_canvas.getContext) {
  the_canvas.width = window.innerWidth;
  the_canvas.height = 0.87 * window.innerHeight;

  const ctx = the_canvas.getContext("2d");
  if (ctx) {
    drawUI(the_canvas, ctx);
    UI.canvas = the_canvas;
    UI.ctx = ctx;
    UI.subscribe(drawUI);
  }
}
