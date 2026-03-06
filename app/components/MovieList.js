"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

function formatTitle(title) {
  if (title.includes(", The")) {
    return "The " + title.replace(", The", "")
  }
  if (title.includes(", A")) {
    return "A " + title.replace(", A", "")
  }
  return title
}

export default function MoviesList() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/movies")
        const data = await response.json()
        setMovies(data)
      } catch (error) {
        console.error("Error cargando películas:", error)
      }
    }

    loadMovies()
  }, [])

  return (
    <div
      className="min-h-screen py-10 px-6"
      style={{ background: "#0B1220", color: "#E5E7EB" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 relative">
          <Link
            href="/"
            className="absolute left-0 top-0 px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ background: "#6366F1", color: "#E5E7EB" }}
          >
            ← Inicio
          </Link>

          <h1 className="text-4xl font-bold text-center">
            Lista de Películas
          </h1>
        </div>

        <div className="space-y-5">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="rounded-2xl border p-6 shadow-sm"
              style={{ background: "#121A2B", borderColor: "#22304D" }}
            >
              <h2 className="text-2xl font-bold mb-4">
                {formatTitle(movie.title)}
              </h2>

              <div className="space-y-2 text-lg">
                <p>
                  <span style={{ color: "#9CA3AF" }}>Fecha de lanzamiento:</span>{" "}
                  {movie.releaseDate
                    ? new Date(movie.releaseDate).toLocaleDateString()
                    : "Sin fecha"}
                </p>

                <p>
                  <span style={{ color: "#9CA3AF" }}>Actor:</span>{" "}
                  {movie.actors?.[0]?.name || "Sin actor"}
                </p>

                <p>
                  <span style={{ color: "#9CA3AF" }}>Premio:</span>{" "}
                  {movie.prizes?.[0]?.name || "Sin premio"}
                </p>
              </div>

              <Link
                href={`/movies/${movie.id}`}
                className="inline-block mt-4 px-4 py-2 rounded-lg font-semibold"
                style={{ background: "#6366F1", color: "#E5E7EB" }}
              >
                Ver detalle
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}