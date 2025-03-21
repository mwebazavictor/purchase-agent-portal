"use client"; // This is a client component since it uses browser APIs like Canvas

import { useEffect, useRef } from "react";

const GlowingBlob: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match the window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.targetX = event.clientX;
      mouseRef.current.targetY = event.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize mouse position
    mouseRef.current.x = window.innerWidth / 2;
    mouseRef.current.y = window.innerHeight / 2;

    // Animation loop
    let time = 0;
    const animate = () => {
      // Smoothly interpolate the blob's position towards the mouse
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;

      // Clear the canvas with a semi-transparent background for a subtle trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Slightly transparent black to match the page background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animate the radius for a subtle pulsing effect
      const radius = 200 + Math.sin(time) * 10; // Large blob with slight pulsing (200px radius)

      // Draw the black blob
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#000000"; // Solid black for the planet-like blob
      ctx.fill();

      // Draw the glowing red outline (planet atmosphere effect)
      const glowGradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        radius * 0.9, // Inner radius (slightly smaller than the blob)
        mouseRef.current.x,
        mouseRef.current.y,
        radius * 1.2 // Outer radius (extends beyond the blob)
      );
      glowGradient.addColorStop(0, "rgba(255, 0, 0, 0)"); // Transparent at the edge of the blob
      glowGradient.addColorStop(0.5, "rgba(255, 0, 0, 0.3)"); // Subtle red glow
      glowGradient.addColorStop(1, "rgba(255, 0, 0, 0)"); // Fades to transparent

      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, radius * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Add a subtle red glow using shadow
      ctx.shadowBlur = 30;
      ctx.shadowColor = "rgba(255, 0, 0, 0.5)";

      // Increment time for pulsing
      time += 0.03;
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1, // Place it behind other content
        pointerEvents: "none", // Allow clicks to pass through
      }}
    />
  );
};

export default GlowingBlob;