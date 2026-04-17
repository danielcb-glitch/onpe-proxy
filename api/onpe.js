export default async function handler(req, res) {
  try {
    const { tipo } = req.query || {};

    let url = "";

    if (tipo === "resumen") {
      url = "https://resultadoelectoral.onpe.gob.pe/presentacion-backend/resumen-general/totales?idEleccion=10&tipoFiltro=eleccion";
    } else if (tipo === "participantes") {
      url = "https://resultadoelectoral.onpe.gob.pe/presentacion-backend/resumen-general/participantes?idEleccion=10&tipoFiltro=eleccion";
    } else {
      return res.status(400).json({ error: "Tipo inválido" });
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        "Referer": "https://resultados.onpe.gob.pe/",
        "Origin": "https://resultados.onpe.gob.pe/"
      }
    });

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);

  } catch (error) {
    console.error("ERROR PROXY:", error);
    res.status(500).json({
      error: "Error en proxy",
      detalle: error.message
    });
  }
}
