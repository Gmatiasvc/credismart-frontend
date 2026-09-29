import React, { useState } from 'react';
import type { SolicitudEntrada, RespuestaEvaluacion } from './types/credito';
import { enviarEvaluacionCredito } from './services/api';
import { FormularioCredito } from './components/FormularioCredito';
import { PanelResultado } from './components/PanelResultado';
import { VistaHistorial } from './components/VistaHistorial';
import { VistaCatalogoReglas } from './components/VistaCatalogoReglas';
import { ModalConfiguracion } from './components/ModalConfiguracion';
import { Settings, BrainCircuit, FormInput, History, BookOpen } from 'lucide-react';

export const App: React.FC = () => {
  const [pestanaActiva, setPestanaActiva] = useState<'EVALUADOR' | 'HISTORIAL' | 'REGLAS'>('EVALUADOR');
  const [cargando, setCargando] = useState<boolean>(false);
  const [resultado, setResultado] = useState<RespuestaEvaluacion | null>(null);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState<boolean>(false);

  const manejarEnvio = async (datos: SolicitudEntrada) => {
    setCargando(true);
    setErrorMensaje(null);
    try {
      const resp = await enviarEvaluacionCredito(datos);
      setResultado(resp);
    } catch (err: any) {
      setErrorMensaje(err.message || 'Error de conexión con el agente n8n.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* BARRA SUPERIOR DE NAVEGACIÓN */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40 px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/30">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight">CrediSmart AI</h1>
              <p className="text-[11px] text-slate-400">Sistema Experto & Búsqueda A*</p>
            </div>
          </div>

          {/* SELECTOR DE PESTAÑAS */}
          <nav className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setPestanaActiva('EVALUADOR')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition font-medium ${
                pestanaActiva === 'EVALUADOR' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FormInput className="w-3.5 h-3.5" /> Evaluador
            </button>
            <button
              onClick={() => setPestanaActiva('HISTORIAL')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition font-medium ${
                pestanaActiva === 'HISTORIAL' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <History className="w-3.5 h-3.5" /> Historial & Auditoría
            </button>
            <button
              onClick={() => setPestanaActiva('REGLAS')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition font-medium ${
                pestanaActiva === 'REGLAS' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Base de Reglas
            </button>
          </nav>

          <button
            onClick={() => setModalAbierto(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition"
          >
            <Settings className="w-3.5 h-3.5 text-indigo-400" />
            <span>Configurar Túnel</span>
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL POR PESTAÑAS */}
      <main className="max-w-7xl mx-auto w-full p-6 flex-1">
        {pestanaActiva === 'EVALUADOR' && (
          <>
            {errorMensaje && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-sm">
                {errorMensaje}
              </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5">
                <FormularioCredito alEnviar={manejarEnvio} cargando={cargando} />
              </div>
              <div className="lg:col-span-7">
                {resultado ? (
                  <PanelResultado resultado={resultado} />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-12 border border-dashed border-slate-800 rounded-2xl text-center bg-slate-900/20">
                    <BrainCircuit className="w-12 h-12 text-slate-700 mb-3" />
                    <h3 className="text-base font-semibold text-slate-400">Esperando solicitud</h3>
                    <p className="text-xs text-slate-500 max-w-sm mt-1">
                      Usa los botones de atajo en el sensor para probar casos de aprobación, reestructuración con A* o detección de riesgo por LLM.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {pestanaActiva === 'HISTORIAL' && <VistaHistorial />}

        {pestanaActiva === 'REGLAS' && <VistaCatalogoReglas />}
      </main>

      <ModalConfiguracion abierto={modalAbierto} alCerrar={() => setModalAbierto(false)} />
    </div>
  );
};

export default App;