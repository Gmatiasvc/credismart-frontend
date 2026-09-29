// ==========================================
// TIPOS DE DATOS: SISTEMA HÍBRIDO CREDISMART
// ==========================================

export interface SolicitudEntrada {
  documento_identidad: string;
  nombres: string;
  edad: number;
  ingresos_mensuales: number;
  deuda_actual: number;
  monto_solicitado: number;
  plazo_meses: number;
  score_crediticio: number;
  justificacion_cualitativa: string;
}

export interface ReglaDisparada {
  codigo_regla: string;
  descripcion: string;
  tipo: string;
  cumplida: boolean;
  impacto_score: number;
  hecho_deducido?: string;
}

export interface PlanReestructuradoAStar {
  monto_reestructurado: number;
  plazo_meses: number;
  cuota_mensual: number;
  tasa_anual: number;
  costo_total_credito: number;
  nodos_explorados: number;
  profundidad_solucion: number;
  costo_gn: number;
  heuristica_hn: number;
  tiempo_ms: number;
  camino_resumen: string[];
}

export interface CapaSubsimbolicaLLM {
  nivel_riesgo_cualitativo?: "BAJO" | "MEDIO" | "ALTO";
  opinion_experta?: string;
  factores_clave?: string[];
  recomendacion_comite?: string;
  modelo_utilizado?: string;
}

export interface RespuestaEvaluacion {
  solicitud_id: number;
  dictamen_final: string;
  estado_codigo:
    | "APROBADO"
    | "REESTRUCTURADO"
    | "RECHAZADO"
    | "REVISION_MANUAL";
  score_simbolico: number;
  candidato_a_star: boolean;
  requiere_analisis_llm: boolean;
  tiempo_computo_total_ms: number;
  detalles_hechos: Record<string, any>;
  reglas_disparadas: ReglaDisparada[];
  plan_reestructurado?: PlanReestructuradoAStar;
  capa_subsimbolica?: CapaSubsimbolicaLLM;
}

export interface ItemHistorial {
  id: number;
  documento_identidad: string;
  nombres: string;
  monto_solicitado: number;
  plazo_meses: number;
  estado: string;
  score_calculado: number;
  tiempo_computo_ms: number;
  created_at: string;
}

export interface EstadisticasSistema {
  total_evaluaciones: number;
  aprobados: number;
  reestructurados: number;
  rechazados: number;
  tiempo_promedio_ms: number;
  tasa_aprobacion: number;
}

export interface ReglaCatalogo {
  codigo: string;
  descripcion: string;
  prioridad_salience: number;
  impacto_score: number;
}