import { useRef, useEffect } from "react";
import { usePageLayoutContext } from "@app";

/**
 * A canvas background inspired by https://stripe.com/
 * - Note: you can play around with Stripe's canvas by entering the Konami code
 *   on their landing page !
 *
 * Source for `startAnimation` and RGB-value fns:
 * - https://dev.to/jordienr/how-to-make-animated-gradients-like-stripe-56nh
 *
 * Source for React-related functionality (ref, useEffect fn, etc.)
 * - https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
 */
export const CanvasGradientBG = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isMobilePageLayout } = usePageLayoutContext();

  // ENSURE CORRECT SIZE & SCALE:
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d") ?? null;

    if (canvas === null || context === null) return;

    const ensureCorrectSizeAndScale = () => {
      const { width, height } = canvas.getBoundingClientRect();

      if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio: ratio = 1 } = window;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        context.scale(ratio, ratio);
      }
    };

    window.addEventListener("resize", ensureCorrectSizeAndScale);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", ensureCorrectSizeAndScale);
  }, []);

  // COLOR GRADIENT EFFECT:
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d") ?? null;

    if (canvas === null || context === null) return;

    let time = 0;
    let animationFrameId: number;

    const startAnimation = () => {
      for (let x = 0; x <= 35; x++) {
        for (let y = 0; y <= 35; y++) {
          // Get RGB values and paint the canvas
          const { r, g, b } = getGradientRGB({ x, y }, time);
          context.fillStyle = `rgb(${r}, ${g}, ${b})`;
          context.fillRect(x, y, canvas.width, canvas.height);
        }
      }

      time = time + 0.01; // smaller number added = slower effect
      animationFrameId = window.requestAnimationFrame(startAnimation);
    };

    startAnimation();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="gradient-canvas"
      height={32}
      width={32}
      /* The above height and width values were hard-coded in the source, and
      for now are being left as-is at 32. Reasons:
      - Changing them up or down seems to mostly have undesirable aesthetic effects
      - They seem to work regardless of css height/width below      */
      style={
        {
          // "--gradient-color-1": "#7600ed",
          // "--gradient-color-2": "#ff333d",
          // "--gradient-color-3": "#0080c0",
          // "--gradient-color-4": "#b87400",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 0,
          height: "100vh",
          width: "100vw",
          clipPath: !isMobilePageLayout
            ? "polygon(0 0, 100% 0, 100% 18%, 0 50%)"
            : "polygon(0 0, 100% 0, 100% 15%, 0 22%)"
        } as any
      }
    />
  );
};

// prettier-ignore
const getGradientRGB = ({ x, y }: { x: number; y: number }, time: number) => {
  const redValue = Math.floor(
    192 + 64 * Math.cos((x * x - y * y) / 300 + time)
  );

  const greenValue = Math.floor(
    192 + 64 * Math.sin((x * x * Math.cos(time / 4) + y * y * Math.sin(time / 3)) / 300)
  );

  const blueValue = Math.floor(
    192 + 64 * Math.sin(5 * Math.sin(time / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100)
  );

  return {
    r: redValue,
    g: greenValue,
    b: blueValue
  };
};
