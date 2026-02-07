import PDFDocument from "pdfkit";

export const generateAuditPDF = (logs, res) => {
  const doc = new PDFDocument({ margin: 40 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=reporte_auditoria.pdf"
  );

  doc.pipe(res);

  // Título
  doc.fontSize(18).text("Reporte de Auditoría", { align: "center" });
  doc.moveDown();

  doc.fontSize(10).text(`Generado: ${new Date().toLocaleString()}`);
  doc.moveDown(2);

  // Encabezados
  doc.fontSize(10).text(
    "ID | Usuario | Acción | Tabla | Fecha",
    { underline: true }
  );
  doc.moveDown();

  logs.forEach((log) => {
    doc.text(
      `${log.id} | ${log.usuario} | ${log.accion} | ${log.tabla} | ${new Date(
        log.fecha
      ).toLocaleString()}`
    );
    doc.moveDown(0.5);
  });

  doc.end();
};
