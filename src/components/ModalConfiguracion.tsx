import React, { useState } from "react";
import { Settings, CheckCircle, Globe } from "lucide-react";
import { obtenerUrlWebhook, guardarUrlWebhook } from "../services/api";

interface PropsModal {
  abierto: boolean;
  alCerrar: () => void;
}

export const ModalConfiguracion: React.FC<PropsModal> = ({
  abierto,
  alCerrar,
}) => {
  const [urlIngresada, setUrlIngresada] = useState<string>(obtenerUrlWebhook());
  const [guardadoExitoso, setGuardadoExitoso] = useState<boolean>(false);

  if (!abierto) return null;

  const manejarGuardar = (e: React.FormEvent) => {
    e.preventDefault();
    guardarUrlWebhook(urlIngresada);
    setGuardadoExitoso(true);
    setTimeout(() => {
      setGuardadoExitoso(false);
      alCerrar();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl text-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
            <Settings className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold">
            Configuración de Conectividad
          </h3>
        </div>

        <p className="text-sm text-slate-400 mb-4">
          Indica la URL pública activa generada por ngrok en tu laptop servidora
          para recibir las solicitudes web:
        </p>

        <form onSubmit={manejarGuardar}>
          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-300 mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              URL Base de ngrok
            </label>
            <input
              type="text"
              value={urlIngresada}
              onChange={(e) => setUrlIngresada(e.target.value)}
              placeholder="https://xxxx-xxxx.ngrok-free.dev"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={alCerrar}
              className="px-4 py-2 text-sm rounded-lg text-slate-400 hover:text-slate-200 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium flex items-center gap-1.5 transition"
            >
              {guardadoExitoso ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                  Guardado
                </>
              ) : (
                "Guardar URL"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
