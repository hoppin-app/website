"use client";

import { useEffect, useRef } from "react";

/* ==========================================================================
   A trail of something like lava behind the cursor

   The mouse leaves blobs as it moves. They are drawn as metaballs, so blobs
   close together melt into one viscous line, and each one cools as it ages:
   hot pink-orange when fresh, the icon's violet as it fades, a little
   thinner and a few pixels lower as it sinks. Kept faint on purpose; it is
   texture, not a feature.

   Only for a real pointer (no touch), never with reduced motion, and the
   loop stops as soon as the last blob is gone, so an idle page costs nothing.
   The canvas sits behind everything in <main> (z-index -1 inside main's
   stacking context), and main clips it (page.tsx), so it never paints over
   the footer.
   ========================================================================== */

const MAX_BLOBS = 48;
/** Rendered at half resolution: the goo is soft, and it is a quarter of the pixels. */
const SCALE = 0.5;
const LIFE = 2.6; // seconds
const SPACING = 11; // CSS px between blobs along the path
const RADIUS = 21; // CSS px
const SINK = 7; // CSS px per second

const COLORS = {
  light: { hot: [1.0, 0.45, 0.32], cool: [0.42, 0.3, 0.92], alpha: 0.15 },
  dark: { hot: [1.0, 0.5, 0.36], cool: [0.55, 0.45, 1.0], alpha: 0.2 },
};

const VERTEX = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAGMENT = `
precision mediump float;
uniform vec3 u_blobs[${MAX_BLOBS}];
uniform float u_heat[${MAX_BLOBS}];
uniform int u_count;
uniform vec3 u_hot;
uniform vec3 u_cool;
uniform float u_alpha;

void main() {
  vec2 p = gl_FragCoord.xy;
  float field = 0.0;
  float heat = 0.0;
  for (int i = 0; i < ${MAX_BLOBS}; i++) {
    if (i >= u_count) break;
    vec3 b = u_blobs[i];
    vec2 d = p - b.xy;
    float f = (b.z * b.z) / (dot(d, d) + 1.0);
    field += f;
    heat += f * u_heat[i];
  }
  float h = heat / max(field, 0.0001);
  float body = smoothstep(0.85, 1.3, field);
  float core = smoothstep(1.6, 5.0, field) * h;
  vec3 color = mix(u_cool, u_hot, h);
  color = mix(color, vec3(1.0, 0.86, 0.7), core * 0.35);
  float a = body * u_alpha * (0.5 + 0.5 * h);
  gl_FragColor = vec4(color * a, a);
}
`;

type Blob = { x: number; y: number; r: number; born: number };

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function LavaTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!pointer.matches || reduce.matches) return;

    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // One triangle that covers the whole canvas.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uBlobs = gl.getUniformLocation(program, "u_blobs");
    const uHeat = gl.getUniformLocation(program, "u_heat");
    const uCount = gl.getUniformLocation(program, "u_count");
    const uHot = gl.getUniformLocation(program, "u_hot");
    const uCool = gl.getUniformLocation(program, "u_cool");
    const uAlpha = gl.getUniformLocation(program, "u_alpha");

    const blobData = new Float32Array(MAX_BLOBS * 3);
    const heatData = new Float32Array(MAX_BLOBS);
    let blobs: Blob[] = [];
    let last: { x: number; y: number } | null = null;
    let frame = 0;
    let height = 0;

    const resize = () => {
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.round(window.innerWidth * SCALE));
      canvas.height = Math.max(1, Math.round(height * SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const draw = (now: number) => {
      const t = now / 1000;
      blobs = blobs.filter((b) => t - b.born < LIFE);

      const theme = document.documentElement.dataset.theme === "dark" ? COLORS.dark : COLORS.light;
      blobs.forEach((b, i) => {
        const age = (t - b.born) / LIFE;
        const heat = 1 - age;
        blobData[i * 3] = b.x * SCALE;
        blobData[i * 3 + 1] = (height - (b.y + SINK * (t - b.born))) * SCALE;
        blobData[i * 3 + 2] = b.r * Math.pow(heat, 0.55) * SCALE;
        heatData[i] = heat * heat;
      });

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (blobs.length) {
        gl.uniform3fv(uBlobs, blobData);
        gl.uniform1fv(uHeat, heatData);
        gl.uniform1i(uCount, blobs.length);
        gl.uniform3fv(uHot, theme.hot);
        gl.uniform3fv(uCool, theme.cool);
        gl.uniform1f(uAlpha, theme.alpha);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }

      // Nothing left to cool: stop until the mouse moves again.
      frame = blobs.length ? requestAnimationFrame(draw) : 0;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      const x = event.clientX;
      const y = event.clientY;
      const born = performance.now() / 1000;
      const from = last ?? { x, y };
      const distance = Math.hypot(x - from.x, y - from.y);
      // Fill the gap a fast flick leaves, so the line stays unbroken.
      const steps = last ? Math.floor(distance / SPACING) : 1;
      for (let i = 1; i <= steps; i++) {
        const f = last ? i / steps : 1;
        blobs.push({
          x: from.x + (x - from.x) * f,
          y: from.y + (y - from.y) * f,
          r: RADIUS * (0.85 + Math.random() * 0.3),
          born,
        });
      }
      if (steps > 0 || !last) last = { x, y };
      if (blobs.length > MAX_BLOBS) blobs = blobs.slice(blobs.length - MAX_BLOBS);
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onLeave = () => {
      last = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
