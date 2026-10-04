import React, { useState } from 'react';
import type { SolicitudEntrada } from '../types/credito';
import { Send, Sparkles, UserCheck, RefreshCw, AlertTriangle } from 'lucide-react';

interface PropsFormulario {
  alEnviar: (datos: SolicitudEntrada) => void;
  cargando: boolean;
}

export const FormularioCredito: React.FC<PropsFormulario> = ({ alEnviar, cargando }) => {
  const [formulario, setFormulario] = useState<SolicitudEntrada>({
    documento_identidad: '60897401',
    nombres: 'Valentina Pajares',
    edad: 34,
    ingresos_mensuales: 6000,
    deuda_actual: 900,
    monto_solicitado: 12000,
    plazo_meses: 18,
    score_crediticio: 770,
    justificacion_cualitativa: 'Remodelación de oficina de constructora propio con cartera consolidada de clientes.'
  });

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const cargarEscenarioPrueba = (tipo: 'APROBADO' | 'ASTAR' | 'RIESGO_LLM') => {
    if (tipo === 'APROBADO') {
      setFormulario({
        documento_identidad: '60897401',
        nombres: 'Valentina Pajares',
        edad: 34,
        ingresos_mensuales: 6000,
        deuda_actual: 900,
        monto_solicitado: 12000,
        plazo_meses: 18,
        score_crediticio: 770,
        justificacion_cualitativa: 'Remodelación de oficina de constructora propio con cartera consolidada de clientes.'
      });
    } else if (tipo === 'ASTAR') {
      setFormulario({
        documento_identidad: '60529990',
        nombres: 'Gerardo Venegas',
        edad: 26,
        ingresos_mensuales: 3200,
        deuda_actual: 1650,
        monto_solicitado: 15000,
        plazo_meses: 24,
        score_crediticio: 680,
        justificacion_cualitativa: 'Compra de inventario para taller técnico con flujo de caja activo pero liquidez ajustada este trimestre.'
      });
    } else {
      setFormulario({
        documento_identidad: '60881122',
        nombres: 'Jordan Tacuri',
        edad: 22,
        ingresos_mensuales: 2400,
        deuda_actual: 400,
        monto_solicitado: 10000,
        plazo_meses: 12,
        score_crediticio: 620,
        justificacion_cualitativa: 'Inversión en plataformas de trading y criptomonedas de alta volatilidad para duplicar el capital en 15 días.'
      });
    }
  };

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alEnviar(formulario);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Sensor de Solicitud de Crédito
          </h2>
          <p className="text-xs text-slate-400">Captura de variables cuantitativas y cualitativas</p>
        </div>

        {/* Botones de Escenarios de Prueba */}
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => cargarEscenarioPrueba('APROBADO')}
            className="px-2.5 py-1 text-xs bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition flex items-center gap-1"
          >
            <UserCheck className="w-3.5 h-3.5" /> Caso Sano
          </button>
          <button
            type="button"
            onClick={() => cargarEscenarioPrueba('ASTAR')}
            className="px-2.5 py-1 text-xs bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Caso A*
          </button>
          <button
            type="button"
            onClick={() => cargarEscenarioPrueba('RIESGO_LLM')}
            className="px-2.5 py-1 text-xs bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg transition flex items-center gap-1"
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Caso LLM
          </button>
        </div>
      </div>

      <form onSubmit={manejarSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">DNI / Documento</label>
            <input
              type="text"
              name="documento_identidad"
              value={formulario.documento_identidad}
              onChange={manejarCambio}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Nombres y Apellidos</label>
            <input
              type="text"
              name="nombres"
              value={formulario.nombres}
              onChange={manejarCambio}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Edad</label>
            <input
              type="number"
              name="edad"
              value={formulario.edad}
              onChange={manejarCambio}
              min={16}
              max={100}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Ingresos Mensuales (S/)</label>
            <input
              type="number"
              name="ingresos_mensuales"
              value={formulario.ingresos_mensuales}
              onChange={manejarCambio}
              min={1}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Deuda Vigente (S/)</label>
            <input
              type="number"
              name="deuda_actual"
              value={formulario.deuda_actual}
              onChange={manejarCambio}
              min={0}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Monto Solicitado (S/)</label>
            <input
              type="number"
              name="monto_solicitado"
              value={formulario.monto_solicitado}
              onChange={manejarCambio}
              min={500}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-indigo-300"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Plazo Solicitado (Meses)</label>
            <input
              type="number"
              name="plazo_meses"
              value={formulario.plazo_meses}
              onChange={manejarCambio}
              min={3}
              max={84}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Score Buró (300 - 850)</label>
            <input
              type="number"
              name="score_crediticio"
              value={formulario.score_crediticio}
              onChange={manejarCambio}
              min={300}
              max={850}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Justificación Cualitativa del Crédito (Capa Subsimbólica / LLM)
          </label>
          <textarea
            name="justificacion_cualitativa"
            value={formulario.justificacion_cualitativa}
            onChange={manejarCambio}
            rows={3}
            placeholder="Detalla el propósito de la solicitud comercial..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-600/20"
        >
          {cargando ? (
            <>
              <div className="w-4 h-4 border-2 border-indigo-200 border-t-transparent rounded-full animate-spin" />
              <span>Ejecutando Inferencia Híbrida...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Evaluar Solicitud con Sistema Inteligente</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};