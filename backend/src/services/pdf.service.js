import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generarReporteDiarioPDF = (data, fecha) => {
  const doc = new PDFDocument();
  const filePath = path.join('reportes', `reporte_diario_${fecha}.pdf`);
  fs.mkdirSync('reportes', { recursive: true });
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text('REPORTE DIARIO TESORERÍA', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Fecha: ${fecha}`);
  doc.moveDown();

  doc.text(`Ingresos del día: ${data.ingresos}`);
  doc.text(`Egresos del día: ${data.egresos}`);
  doc.text(`Saldo del día: ${data.saldo}`);

  doc.end();
  return filePath;
};