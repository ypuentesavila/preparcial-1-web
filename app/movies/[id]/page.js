"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

function formatTitle(title) {
  if (!title) return ""
  if (title.includes(", The")) {
    return "The " + title.replace(", The", "")
  }
  if (title.includes(", A")) {
    return "A " + title.replace(", A", "")
  }
  return title
}

export default function MovieDetailPage({ params }) {
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    async function loadMovie() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/movies/${params.id}`
        )
        const data = await response.json()
        setMovie(data)
      } catch (error) {
        console.error("Error cargando detalle de película:", error)
      }
    }

    loadMovie()
  }, [params.id])

  if (!movie) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0B1220", color: "#E5E7EB" }}
      >
        Cargando película...
      </div>
    )
  }

  return (
    <div
      className="min-h-screen py-10 px-6"
      style={{ background: "#0B1220", color: "#E5E7EB" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 relative">
          <Link
            href="/movies"
            className="absolute left-0 top-0 px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ background: "#6366F1", color: "#E5E7EB" }}
          >
            ← Volver
          </Link>

          <h1 className="text-4xl font-bold text-center">
            Detalle de Película
          </h1>
        </div>

        <div
          className="rounded-2xl border p-6 space-y-6"
          style={{ background: "#121A2B", borderColor: "#22304D" }}
        >
          <div>
            <h2 className="text-3xl font-bold mb-4">
              {formatTitle(movie.title)}
            </h2>

            <div className="space-y-2 text-lg">
              <p>
                <span style={{ color: "#9CA3AF" }}>ID:</span> {movie.id}
              </p>

              <p>
                <span style={{ color: "#9CA3AF" }}>Título original:</span>{" "}
                {movie.title}
              </p>

              <p>
                <span style={{ color: "#9CA3AF" }}>Poster:</span>{" "}
                {movie.poster || "Sin poster"}
              </p>

              <p>
                <span style={{ color: "#9CA3AF" }}>Duración:</span>{" "}
                {movie.duration ?? "Sin duración"}
              </p>

              <p>
                <span style={{ color: "#9CA3AF" }}>País:</span>{" "}
                {movie.country || "Sin país"}
              </p>

              <p>
                <span style={{ color: "#9CA3AF" }}>Fecha de lanzamiento:</span>{" "}
                {movie.releaseDate
                  ? new Date(movie.releaseDate).toLocaleDateString()
                  : "Sin fecha"}
              </p>

              <p>
                <span style={{ color: "#9CA3AF" }}>Popularidad:</span>{" "}
                {movie.popularity ?? "Sin popularidad"}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Listado de actores</h3>

            {movie.actors && movie.actors.length > 0 ? (
              <div className="space-y-3">
                {movie.actors.map((actor) => (
                  <div
                    key={actor.id}
                    className="rounded-xl border p-4"
                    style={{ background: "#0B1220", borderColor: "#22304D" }}
                  >
                    <p>
                      <span style={{ color: "#9CA3AF" }}>Nombre:</span>{" "}
                      {actor.name}
                    </p>

                    <p>
                      <span style={{ color: "#9CA3AF" }}>Nacionalidad:</span>{" "}
                      {actor.nationality || "Sin nacionalidad"}
                    </p>

                    <p>
                      <span style={{ color: "#9CA3AF" }}>Fecha de nacimiento:</span>{" "}
                      {actor.birthDate
                        ? new Date(actor.birthDate).toLocaleDateString()
                        : "Sin fecha"}
                    </p>

                    <p>
                      <span style={{ color: "#9CA3AF" }}>Biografía:</span>{" "}
                      {actor.biography || "Sin biografía"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Sin actores</p>
            )}
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Premios</h3>

            {movie.prizes && movie.prizes.length > 0 ? (
              <div className="space-y-3">
                {movie.prizes.map((prize) => (
                  <div
                    key={prize.id}
                    className="rounded-xl border p-4"
                    style={{ background: "#0B1220", borderColor: "#22304D" }}
                  >
                    <p>
                      <span style={{ color: "#9CA3AF" }}>Nombre:</span>{" "}
                      {prize.name || "Sin nombre"}
                    </p>

                    <p>
                      <span style={{ color: "#9CA3AF" }}>Año:</span>{" "}
                      {prize.year ?? "Sin año"}
                    </p>

                    <p>
                      <span style={{ color: "#9CA3AF" }}>Categoría:</span>{" "}
                      {prize.category || "Sin categoría"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Sin premios</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}