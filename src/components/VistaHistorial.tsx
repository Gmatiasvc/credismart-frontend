import React, { useEffect, useState } from 'react';
import type { ItemHistorial, EstadisticasSistema } from '../types/credito';
import { obtenerHistorialEvaluaciones, obtenerEstadisticasSistema } from '../services/api';
import { History, CheckCircle2, AlertCircle, XCircle, Clock, RefreshCw, BarChart3 } from 'lucide-react';

export const VistaHistorial: React.FC = () => {
  const [registros, setRegistros] = useState<ItemHistorial[]>([]);
  const [metricas, setMetricas] = useState<EstadisticasSistema | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cargarDatos = async () => {
    setCargando(true);
    setError(null);
    try {
      const [aux_historial, aux_stats] = await Promise.all([
        obtenerHistorialEvaluaciones(),
        obtenerEstadisticasSistema()
      ]);
      setRegistros(aux_historial);
      setMetricas(aux_stats);
    } catch (err: any) {
      setError(err.message || 'Error de conexión con el backend.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div className="space-y-6 text-slate-100">
      {/* 1. TARJETAS DE MÉTRICAS GLOBALES */}
      {metricas && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-indigo-400" /> Total Evaluaciones
            </span>
            <p className="text-2xl font-black text-indigo-400 mt-1">{metricas.total_evaluaciones}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
            <span className="text-xs text-slate-400">Tasa de Aprobación</span>
            <p className="text-2xl font-black text-emerald-400 mt-1">{metricas.tasa_aprobacion}%</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
            <span className="text-xs text-slate-400">Reestructurados (A*)</span>
            <p className="text-2xl font-black text-amber-400 mt-1">{metricas.reestructurados}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" /> Latencia Promedio
            </span>
            <p className="text-2xl font-black text-cyan-400 mt-1">{metricas.tiempo_promedio_ms} ms</p>
          </div>
        </div>
      )}

      {/* 2. TABLA DE REGISTROS DE AUDITORÍA */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold">Registro de Auditoría de Decisiones (SQLite)</h2>
          </div>
          <button
            onClick={cargarDatos}
            disabled={cargando}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg transition flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${cargando ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-lg">
            {error}
          </div>
        )}

        {registros.length === 0 && !cargando ? (
          <p className="text-center text-xs text-slate-500 py-8">No hay expedientes registrados aún.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-slate-400 text-xs uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">ID</th>
                  <th className="py-2.5 px-3">Cliente</th>
                  <th className="py-2.5 px-3">Monto / Plazo</th>
                  <th className="py-2.5 px-3 text-center">Dictamen</th>
                  <th className="py-2.5 px-3 text-right">Score</th>
                  <th className="py-2.5 px-3 text-right">Tiempo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {registros.map((item, i) => {
                  const esAprob = item.estado === 'APROBADO';
                  const esReest = item.estado === 'REESTRUCTURADO';
                  return (
                    <tr key={i} className="hover:bg-slate-800/40 transition">
                      <td className="py-2.5 px-3 font-mono text-slate-500">#{item.id}</td>
                      <td className="py-2.5 px-3">
                        <p className="font-semibold text-slate-200">{item.nombres}</p>
                        <span className="text-[10px] text-slate-500 font-mono">{item.documento_identidad}</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono">
                        S/ {item.monto_solicitado.toLocaleString()}
                        <span className="text-slate-500 block text-[10px]">{item.plazo_meses} meses</span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            esAprob
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : esReest
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {esAprob && <CheckCircle2 className="w-3 h-3" />}
                          {esReest && <AlertCircle className="w-3 h-3" />}
                          {!esAprob && !esReest && <XCircle className="w-3 h-3" />}
                          {item.estado}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-indigo-400">
                        {item.score_calculado.toFixed(1)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-400">
                        {item.tiempo_computo_ms} ms
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};