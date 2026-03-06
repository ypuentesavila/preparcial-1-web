"use client"

import Link from "next/link"
import { useState } from "react"

export default function ActorForm() {
  const [name, setName] = useState("")
  const [photo, setPhoto] = useState("")
  const [nationality, setNationality] = useState("")
  const [birthday, setBirthday] = useState("")
  const [biography, setBiography] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    const newActor = { name, photo, nationality, birthday, biography }

    const saved = JSON.parse(localStorage.getItem("actors_created") || "[]")
    localStorage.setItem("actors_created", JSON.stringify([newActor, ...saved]))

    setName("")
    setPhoto("")
    setNationality("")
    setBirthday("")
    setBiography("")
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "#0B1220", color: "#E5E7EB" }}
    >
      <div
        className="w-full max-w-md p-6 rounded-xl border"
        style={{ background: "#121A2B", borderColor: "#22304D" }}
      >

        <div className="mb-6 relative">
          <Link
            href="/"
            className="absolute left-0 top-0 px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ background: "#6366F1" }}
          >
            ← Inicio
          </Link>

          <h1 className="text-center text-sm" style={{ color: "#9CA3AF" }}>
            
          </h1>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Crear Actor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full p-3 rounded border outline-none"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full p-3 rounded border outline-none"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            placeholder="Photo URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />

          <input
            className="w-full p-3 rounded border outline-none"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            placeholder="Nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          />

          <input
            className="w-full p-3 rounded border outline-none"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />

          <textarea
            className="w-full p-3 rounded border outline-none min-h-28"
            style={{ background: "#0B1220", borderColor: "#22304D" }}
            placeholder="Biography"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          />

          <button
            className="w-full p-3 rounded font-semibold"
            style={{ background: "#22C55E", color: "#0B1220" }}
          >
            Crear Actor
          </button>
        </form>
      </div>
    </div>
  )
}