"use client"

import { useState } from "react"

export default function MovieForm() {
  const [title, setTitle] = useState("")
  const [poster, setPoster] = useState("")
  const [duration, setDuration] = useState("")
  const [country, setCountry] = useState("")
  const [releaseDate, setReleaseDate] = useState("")
  const [popularity, setPopularity] = useState("")

  const [actorName, setActorName] = useState("")
  const [actorPhoto, setActorPhoto] = useState("")
  const [actorNationality, setActorNationality] = useState("")
  const [actorBirthDate, setActorBirthDate] = useState("")
  const [actorBiography, setActorBiography] = useState("")

  const [prizeName, setPrizeName] = useState("")
  const [prizeYear, setPrizeYear] = useState("")
  const [prizeCategory, setPrizeCategory] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const movieRes = await fetch("http://localhost:3000/api/v1/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          poster,
          duration: Number(duration),
          country,
          releaseDate,
          popularity: Number(popularity),
        }),
      })

      if (!movieRes.ok) {
        throw new Error("Error al crear la película")
      }

      const movie = await movieRes.json()
      console.log("movie:", movie)

      const actorRes = await fetch("http://localhost:3000/api/v1/actors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: actorName,
          photo: actorPhoto,
          nationality: actorNationality,
          birthDate: actorBirthDate,
          biography: actorBiography,
        }),
      })

      if (!actorRes.ok) {
        throw new Error("Error al crear el actor")
      }

      const actor = await actorRes.json()
      console.log("actor:", actor)

      const actorMovieRes = await fetch(
        `http://localhost:3000/api/v1/actors/${actor.id}/movies/${movie.id}`,
        {
          method: "POST",
        }
      )

      if (!actorMovieRes.ok) {
        throw new Error("Error al asociar actor con película")
      }

      const prizeRes = await fetch("http://localhost:3000/api/v1/prizes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: prizeName,
          year: Number(prizeYear),
          category: prizeCategory,
        }),
      })

      if (!prizeRes.ok) {
        throw new Error("Error al crear el premio")
      }

      const prize = await prizeRes.json()
      console.log("prize:", prize)

      const moviePrizeRes = await fetch(
        `http://localhost:3000/api/v1/movies/${movie.id}/prizes/${prize.id}`,
        {
          method: "POST",
        }
      )

      if (!moviePrizeRes.ok) {
        throw new Error("Error al asociar premio con película")
      }

      setTitle("")
      setPoster("")
      setDuration("")
      setCountry("")
      setReleaseDate("")
      setPopularity("")
      setActorName("")
      setActorPhoto("")
      setActorNationality("")
      setActorBirthDate("")
      setActorBiography("")
      setPrizeName("")
      setPrizeYear("")
      setPrizeCategory("")

      alert("Película creada con actor y premio")
    } catch (error) {
      console.error(error)
      alert("Hubo un error en el proceso")
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "#0B1220", color: "#E5E7EB" }}
    >
      <div
        className="w-full max-w-xl p-6 rounded-xl border"
        style={{ background: "#121A2B", borderColor: "#22304D" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Crear Película
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <h3 className="text-lg font-semibold">Película</h3>

          <input
            className="w-full p-3 rounded border outline-none"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full p-3 rounded border outline-none"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            placeholder="Poster URL"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />

          <input
            className="w-full p-3 rounded border outline-none"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            placeholder="Duración"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <input
            className="w-full p-3 rounded border outline-none"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            placeholder="País"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <input
            type="date"
            className="w-full p-3 rounded border outline-none"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />

          <input
            className="w-full p-3 rounded border outline-none"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            placeholder="Popularidad"
            value={popularity}
            onChange={(e) => setPopularity(e.target.value)}
          />

          <h3 className="text-lg font-semibold pt-3">Actor principal</h3>

          <input
            className="w-full p-3 rounded border outline-none"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            placeholder="Nombre"
            value={actorName}
            onChange={(e) => setActorName(e.target.value)}
          />

          <input
            className="w-full p-3 rounded border outline-none"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            placeholder="Photo URL"
            value={actorPhoto}
            onChange={(e) => setActorPhoto(e.target.value)}
          />

          <input
            className="w-full p-3 rounded border outline-none"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            placeholder="Nacionalidad"
            value={actorNationality}
            onChange={(e) => setActorNationality(e.target.value)}
          />

          <input
            type="date"
            className="w-full p-3 rounded border outline-none"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            value={actorBirthDate}
            onChange={(e) => setActorBirthDate(e.target.value)}
          />

          <textarea
            className="w-full p-3 rounded border outline-none min-h-24"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            placeholder="Biografía"
            value={actorBiography}
            onChange={(e) => setActorBiography(e.target.value)}
          />

          <h3 className="text-lg font-semibold pt-3">Premio</h3>

          <input
            className="w-full p-3 rounded border outline-none"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            placeholder="Nombre del premio"
            value={prizeName}
            onChange={(e) => setPrizeName(e.target.value)}
          />

          <input
            className="w-full p-3 rounded border outline-none"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            placeholder="Año del premio"
            value={prizeYear}
            onChange={(e) => setPrizeYear(e.target.value)}
          />

          <input
            className="w-full p-3 rounded border outline-none"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            placeholder="Categoría"
            value={prizeCategory}
            onChange={(e) => setPrizeCategory(e.target.value)}
          />

          <button
            type="submit"
            className="w-full p-3 rounded font-semibold"
            style={{ background: "#22C55E", color: "#0B1220" }}
          >
            Crear película
          </button>
        </form>
      </div>
    </div>
  )
}