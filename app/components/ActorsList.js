"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const storageKey = "actors_created"

const inputStyle = "w-full rounded-xl border p-3 outline-none"
const textareaStyle = `${inputStyle} min-h-24`
const emptyForm = { name: "", photo: "", nationality: "", birthday: "", biography: "" }
const getId = (a) => a._localId ?? a.id

export default function ActorsList() {
  const [actors, setActors] = useState([])
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyForm)

  function getCreatedActors() {
    const created = JSON.parse(localStorage.getItem(storageKey) || "[]")
    const normalized = created.map((a) => ({
      ...a,
      _localId: a._localId || crypto.randomUUID(),
    }))
    localStorage.setItem(storageKey, JSON.stringify(normalized))
    return normalized
  }

  function setCreatedActors(next) {
    localStorage.setItem(storageKey, JSON.stringify(next))
  }

  useEffect(() => {
    async function load() {
      const created = getCreatedActors()
      try {
        const res = await fetch("http://localhost:3000/api/v1/actors")
        const apiActors = await res.json()
        setActors([...created, ...apiActors])
      } catch {
        setActors(created)
      }
    }
    load()
  }, [])

  function startEdit(actor) {
    setEditId(getId(actor))
    setForm({
      name: actor.name || "",
      photo: actor.photo || "",
      nationality: actor.nationality || "",
      birthday: actor.birthday || "",
      biography: actor.biography || "",
    })
  }

  function cancelEdit() {
    setEditId(null)
    setForm(emptyForm)
  }

  function onChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function saveEdit(e) {
    e.preventDefault()

    setActors((prev) =>
      prev.map((a) => (getId(a) === editId ? { ...a, ...form } : a))
    )

    const updatedCreated = getCreatedActors().map((a) =>
      getId(a) === editId ? { ...a, ...form } : a
    )
    setCreatedActors(updatedCreated)

    cancelEdit()
  }

  function deleteActor(actor) {
    const id = getId(actor)

    setActors((prev) => prev.filter((a) => getId(a) !== id))

    const created = JSON.parse(localStorage.getItem(storageKey) || "[]")
    const updatedCreated = created.filter((a) => getId(a) !== id)
    setCreatedActors(updatedCreated)

    if (editId === id) cancelEdit()
  }

  return (
    <div
      className="min-h-screen p-10"
      style={{ background: "#0B1220", color: "#E5E7EB" }}
    >
      <div className="max-w-2xl mx-auto mb-8 relative">
        <Link
          href="/"
          className="absolute left-0 top-0 px-4 py-2 rounded-lg text-sm font-semibold"
          style={{ background: "#6366F1" }}
        >
          ← Inicio
        </Link>

        <h1 className="text-3xl font-bold text-center">
          Actores
        </h1>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {actors.map((actor) => {
          const id = getId(actor)
          const isEditing = id === editId

          return (
            <div
              key={id}
              className="rounded-xl border p-5"
              style={{ background: "#121A2B", borderColor: "#22304D" }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="truncate text-lg font-semibold">
                    {actor.name}
                  </div>
                  <div style={{ color: "#9CA3AF" }}>
                    {actor.nationality || "Sin nationality"}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(actor)}
                    className="px-3 py-2 rounded-lg text-sm font-semibold"
                    style={{ background: "#6366F1" }}
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => deleteActor(actor)}
                    className="px-3 py-2 rounded-lg text-sm font-semibold"
                    style={{ background: "#EF4444" }}
                    type="button"
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              {isEditing && (
                <form onSubmit={saveEdit} className="mt-4 space-y-3">
                  <input
                    className={inputStyle}
                    style={{ background: "#0B1220", borderColor: "#22304D" }}
                    value={form.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    placeholder="Nombre"
                    required
                  />

                  <input
                    className={inputStyle}
                    style={{ background: "#0B1220", borderColor: "#22304D" }}
                    value={form.photo}
                    onChange={(e) => onChange("photo", e.target.value)}
                    placeholder="Photo URL"
                  />

                  <div className="grid gap-3 md:grid-cols-2">
                    <input
                      className={inputStyle}
                      style={{ background: "#0B1220", borderColor: "#22304D" }}
                      value={form.nationality}
                      onChange={(e) => onChange("nationality", e.target.value)}
                      placeholder="Nationality"
                    />

                    <input
                      type="date"
                      className={inputStyle}
                      style={{ background: "#0B1220", borderColor: "#22304D" }}
                      value={form.birthday}
                      onChange={(e) => onChange("birthday", e.target.value)}
                    />
                  </div>

                  <textarea
                    className={textareaStyle}
                    style={{ background: "#0B1220", borderColor: "#22304D" }}
                    value={form.biography}
                    onChange={(e) => onChange("biography", e.target.value)}
                    placeholder="Biography"
                  />

                  <div className="flex gap-3">
                    <button
                      className="flex-1 rounded-xl p-3 font-semibold"
                      style={{ background: "#22C55E", color: "#0B1220" }}
                    >
                      Guardar
                    </button>

                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex-1 rounded-xl border p-3 font-semibold"
                      style={{ borderColor: "#22304D" }}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}