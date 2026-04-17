export default async function handler(req, res) {
  try {
    const tipo = req.query.tipo;

    let url = "";

    if (tipo === "resumen") {
      url = "https://resultadoelectoral.onpe.gob.pe/presentacion-backend/resumen-general/totales?idEleccion=10&tipoFiltro=eleccion";
    } else {
      url = "https://resultadoelectoral.onpe.gob.pe/presentacion-backend/resumen-general/participantes?idEleccion=10&tipoFiltro=eleccion";
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Error en API ONPE");
    }

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
