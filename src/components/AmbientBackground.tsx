"use client"

import { useEffect, useRef } from "react"

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createGradient = (t: number) => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, `hsl(${(t / 50) % 360}, 100%, 50%)`)
      gradient.addColorStop(0.5, `hsl(${(t / 50 + 120) % 360}, 100%, 50%)`)
      gradient.addColorStop(1, `hsl(${(t / 50 + 240) % 360}, 100%, 50%)`)
      return gradient
    }

    const animate = (t: number) => {
      ctx.fillStyle = createGradient(t)
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animate(0)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 opacity-20 dark:opacity-10" />
}

