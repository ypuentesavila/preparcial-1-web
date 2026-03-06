import Link from "next/link"

export default function Home() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "#0B1220", color: "#E5E7EB" }}
    >
      <div className="max-w-3xl w-full text-center">

        <h1 className="text-5xl font-extrabold mb-6 tracking-wide">
          Arte7
        </h1>

        <p className="max-w-xl mx-auto mb-10 text-lg leading-relaxed"
           style={{ color: "#9CA3AF" }}>
          Plataforma dedicada al cine. Consulta información sobre películas,
          actores y directores. Explora el talento detrás de cada producción
          cinematográfica y gestiona el elenco del mundo del cine.
        </p>

        <div className="flex justify-center gap-4 mb-12">

          <Link
            href="/actors"
            className="px-6 py-3 rounded-xl font-semibold transition"
            style={{ background: "#6366F1" }}
          >
            Ver actores
          </Link>

          <Link
            href="/crear"
            className="px-6 py-3 rounded-xl font-semibold transition"
            style={{ background: "#22C55E", color: "#0B1220" }}
          >
            Crear actor
          </Link>

        </div>

        <div className="grid grid-cols-3 gap-4 text-left">

          <div
            className="p-5 rounded-xl border"
            style={{ background: "#121A2B", borderColor: "#22304D" }}
          >
            <h3 className="font-semibold mb-2">Actores</h3>
            <p style={{ color: "#9CA3AF" }}>
              Explora biografías y trayectorias del talento frente a cámara.
            </p>
          </div>

          <div
            className="p-5 rounded-xl border"
            style={{ background: "#121A2B", borderColor: "#22304D" }}
          >
            <h3 className="font-semibold mb-2">Películas</h3>
            <p style={{ color: "#9CA3AF" }}>
              Consulta producciones, historias y datos del mundo del cine.
            </p>
          </div>

          <div
            className="p-5 rounded-xl border"
            style={{ background: "#121A2B", borderColor: "#22304D" }}
          >
            <h3 className="font-semibold mb-2">Directores</h3>
            <p style={{ color: "#9CA3AF" }}>
              Conoce la visión creativa detrás de cada obra cinematográfica.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}