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
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0"
      }
    });

    const text = await response.text();

    // 👇 MUY IMPORTANTE: parse manual (evita errores silenciosos)
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        error: "Respuesta inválida de ONPE",
        raw: text.slice(0, 200)
      });
    }

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
