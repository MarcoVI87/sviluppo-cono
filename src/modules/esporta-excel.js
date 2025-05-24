import * as XLSX from 'xlsx';

export function esportaExcel(dati, nomeFile = "sviluppo_cono.xlsx") {
  const ws = XLSX.utils.json_to_sheet(dati);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sviluppo");
  XLSX.writeFile(wb, nomeFile);
}