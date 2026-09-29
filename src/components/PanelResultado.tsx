import React from 'react';
import type { RespuestaEvaluacion } from '../types/credito';
import { CheckCircle2, XCircle, AlertCircle, Cpu, Bot, Compass, Clock } from 'lucide-react';

interface PropsResultado {
  resultado: RespuestaEvaluacion;
}

export const PanelResultado: React.FC<PropsResultado> = ({ resultado }) => {
  // aux = determinar colores e iconos según el dictamen final
  const esAprobado = resultado.estado_codigo === 'APROBADO';
  const esReestructurado = resultado.estado_codigo === 'REESTRUCTURADO';
  const esRechazado = resultado.estado_codigo === 'RECHAZADO';

  const colorBadge = esAprobado
    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    : esReestructurado
    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    : 'bg-rose-500/10 text-rose-400 border-rose-500/30';

  // Blindaje numérico auxiliar
  const aux_score = resultado.score_simbolico !== undefined && resultado.score_simbolico !== null
    ? Number(resultado.score_simbolico).toFixed(1)
    : '0.0';

  const aux_tiempo = resultado.tiempo_computo_total_ms !== undefined && resultado.tiempo_computo_total_ms !== null
    ? Number(resultado.tiempo_computo_total_ms).toFixed(2)
    : '—';

  return (
    <div className="space-y-6 text-slate-100">
      {/* 1. TARJETA DEL VEREDICTO PRINCIPAL */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs text-slate-400 font-mono">
              EXPEDIENTE Nº #{resultado.solicitud_id ?? 'S/N'}
            </span>
            <h2 className="text-2xl font-black mt-1">Dictamen del Agente Inteligente</h2>
          </div>
          <div className={`px-4 py-2 rounded-xl border text-sm font-bold flex items-center gap-2 ${colorBadge}`}>
            {esAprobado && <CheckCircle2 className="w-5 h-5" />}
            {esReestructurado && <AlertCircle className="w-5 h-5" />}
            {esRechazado && <XCircle className="w-5 h-5" />}
            <span>{resultado.dictamen_final || resultado.estado_codigo}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Score Simbólico</span>
            <p className="text-lg font-bold text-indigo-400">{aux_score} pts</p>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Tiempo de Cómputo</span>
            <p className="text-lg font-bold text-slate-200 flex items-center gap-1">
              <Clock className="w-4 h-4 text-slate-500" />
              {aux_tiempo} ms
            </p>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Módulo A*</span>
            <p className={`text-lg font-bold ${resultado.candidato_a_star ? 'text-amber-400' : 'text-slate-500'}`}>
              {resultado.candidato_a_star ? 'Activado' : 'No Requerido'}
            </p>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Capa Subsimbólica</span>
            <p className="text-lg font-bold text-cyan-400">
              {resultado.capa_subsimbolica?.nivel_riesgo_cualitativo || 'Evaluado'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. MÓDULO DELIBERATIVO: OPTIMIZACIÓN A* (SI APLICA) */}
      {resultado.plan_reestructurado && (
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-300">
                Plan de Reestructuración Óptimo (Búsqueda Heurística A*)
              </h3>
              <p className="text-xs text-slate-400">Resolución en espacio de estados minimizando insatisfacción</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400">Monto Aprobado</span>
              <p className="text-base font-bold text-emerald-400">
                S/ {Number(resultado.plan_reestructurado.monto_reestructurado ?? 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400">Nuevo Plazo</span>
              <p className="text-base font-bold text-slate-200">
                {resultado.plan_reestructurado.plazo_meses ?? '—'} meses
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400">Cuota Mensual Viable</span>
              <p className="text-base font-bold text-amber-400">
                S/ {Number(resultado.plan_reestructurado.cuota_mensual ?? 0).toFixed(2)}
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400">Nodos Expandidos</span>
              <p className="text-base font-bold text-indigo-400">
                {resultado.plan_reestructurado.nodos_explorados ?? 0} estados
              </p>
            </div>
          </div>

          {/* Secuencia de Operadores A* */}
          {resultado.plan_reestructurado.camino_resumen && resultado.plan_reestructurado.camino_resumen.length > 0 && (
            <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Camino de Acciones en el Árbol de Estados:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {resultado.plan_reestructurado.camino_resumen.map((paso, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-800 text-[10px] text-amber-400 font-mono">
                      {idx + 1}
                    </span>
                    <span>{paso}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 3. CAPA SUBSIMBÓLICA (ANÁLISIS CUALITATIVO LLM) */}
      {resultado.capa_subsimbolica && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-cyan-300">
                Capa Subsimbólica (Agente LLM)
              </h3>
              <p className="text-xs text-slate-400">Evaluación de justificación cualitativa y riesgos contextuales</p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 italic leading-relaxed">
              "{resultado.capa_subsimbolica.opinion_experta || 'Evaluación cualitativa procesada con éxito.'}"
            </p>

            {resultado.capa_subsimbolica.factores_clave && resultado.capa_subsimbolica.factores_clave.length > 0 && (
              <div className="pt-2 border-t border-slate-800">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Factores Clave Detectados:
                </span>
                <div className="flex flex-wrap gap-2">
                  {resultado.capa_subsimbolica.factores_clave.map((factor, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs">
                      • {factor}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. TRAZA DEL SISTEMA EXPERTO (FORWARD CHAINING) */}
      {resultado.reglas_disparadas && resultado.reglas_disparadas.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-indigo-300">
                Traza del Sistema Experto (IA Simbólica)
              </h3>
              <p className="text-xs text-slate-400">Explicabilidad paso a paso del motor de inferencia formal</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-slate-400 text-xs uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Código Regla</th>
                  <th className="py-2.5 px-3">Descripción</th>
                  <th className="py-2.5 px-3 text-center">Estado</th>
                  <th className="py-2.5 px-3 text-right">Puntuación</th>
                  <th className="py-2.5 px-3">Hecho Inferido</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {resultado.reglas_disparadas.map((r, k) => (
                  <tr key={k} className="hover:bg-slate-800/40 transition">
                    <td className="py-2.5 px-3 font-mono text-indigo-400 font-semibold">{r.codigo_regla}</td>
                    <td className="py-2.5 px-3 text-slate-300">{r.descripcion}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold">
                        Disparada
                      </span>
                    </td>
                    <td className={`py-2.5 px-3 text-right font-mono font-bold ${r.impacto_score >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {r.impacto_score > 0 ? `+${r.impacto_score}` : r.impacto_score}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-cyan-400">{r.hecho_deducido || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};