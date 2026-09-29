import type {
  SolicitudEntrada,
  RespuestaEvaluacion,
  ItemHistorial,
  EstadisticasSistema,
  ReglaCatalogo,
} from "../types/credito";

const CLAVE_STORAGE_URL = "credismart_ngrok_url";
const CLAVE_STORAGE_BACKEND = "credismart_backend_url";

export const obtenerUrlWebhook = (): string => {
  const url_guardada = localStorage.getItem(CLAVE_STORAGE_URL);
  return url_guardada || "https://java-saved-basically.ngrok-free.dev";
};

export const guardarUrlWebhook = (nueva_url: string): void => {
  let aux_url = nueva_url.trim().replace(/\/$/, "");
  localStorage.setItem(CLAVE_STORAGE_URL, aux_url);
};

export const obtenerUrlBackendDirecto = (): string => {
  return (
    localStorage.getItem("credismart_backend_url") ||
    "https://font-lawyer-pensions-risks.trycloudflare.com"
  );
};

export const enviarEvaluacionCredito = async (
  datos: SolicitudEntrada,
): Promise<RespuestaEvaluacion> => {
  const base_url = obtenerUrlWebhook();
  const endpoint_final = `${base_url}/webhook/evaluar-credito`;

  const respuesta = await fetch(endpoint_final, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    const error_texto = await respuesta.text();
    throw new Error(
      `Fallo en el servicio (${respuesta.status}): ${error_texto}`,
    );
  }

  const aux_resultado: RespuestaEvaluacion = await respuesta.json();
  return aux_resultado;
};

export const obtenerHistorialEvaluaciones = async (): Promise<
  ItemHistorial[]
> => {
  const base_api = obtenerUrlBackendDirecto();
  const resp = await fetch(`${base_api}/api/v1/historial/`, {
    headers: { "ngrok-skip-browser-warning": "true" },
  });
  if (!resp.ok) throw new Error("No se pudo cargar el historial");
  return await resp.json();
};

export const obtenerEstadisticasSistema =
  async (): Promise<EstadisticasSistema> => {
    const base_api = obtenerUrlBackendDirecto();
    const resp = await fetch(`${base_api}/api/v1/sistema/estadisticas`, {
      headers: { "ngrok-skip-browser-warning": "true" },
    });
    if (!resp.ok) throw new Error("No se pudieron obtener estadísticas");
    return await resp.json();
  };

export const obtenerCatalogoReglas = async (): Promise<ReglaCatalogo[]> => {
  const base_api = obtenerUrlBackendDirecto();
  const resp = await fetch(`${base_api}/api/v1/sistema/catalogo-reglas`, {
    headers: { "ngrok-skip-browser-warning": "true" },
  });
  if (!resp.ok) throw new Error("No se pudo cargar el catálogo de reglas");
  return await resp.json();
};
