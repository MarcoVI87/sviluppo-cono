export function calcolaPeso(superficie_mm2, spessore_mm, densita = 7.85) {
  const volume_dm3 = (superficie_mm2 / 1e6) * (spessore_mm / 10);
  return volume_dm3 * densita; // kg
}

export function calcolaCosto(peso_kg, costo_kg) {
  return peso_kg * costo_kg;
}