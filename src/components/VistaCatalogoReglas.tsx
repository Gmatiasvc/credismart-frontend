import React, { useEffect, useState } from 'react';
import type { ReglaCatalogo } from '../types/credito';
import { obtenerCatalogoReglas } from '../services/api';
import { BookOpen, Layers,  Zap } from 'lucide-react';

export const VistaCatalogoReglas: React.FC = () => {
  const [reglas, setReglas] = useState<ReglaCatalogo[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    obtenerCatalogoReglas()
      .then(setReglas)
      .catch(() => setReglas([]))
      .finally(() => setCargando(false));
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-800 mb-6">
        <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold">Base de Conocimiento (Reglas de Producción)</h2>
          <p className="text-xs text-slate-400">
            Reglas activas con resolución de conflictos por prioridad (Salience)
          </p>
        </div>
      </div>

      {cargando ? (
        <div className="py-12 text-center text-xs text-slate-500">Cargando base de conocimiento...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reglas.map((r, i) => (
            <div key={i} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    {r.codigo}
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Prioridad {r.prioridad_salience}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{r.descripcion}</p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 flex items-center gap-1">
                  <Layers className="w-3 h-3" /> Impacto en Score
                </span>
                <span className={`font-mono font-bold ${r.impacto_score >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {r.impacto_score > 0 ? `+${r.impacto_score}` : r.impacto_score} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};