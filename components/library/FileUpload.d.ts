import * as React from 'react';
export interface UploadFile {
  name: string;
  /** Tamaño ya formateado, p. ej. "2,4 MB". */
  size: string;
  /** Progreso 0–100. */
  pct: number;
  done?: boolean;
}
export interface FileUploadProps {
  files?: UploadFile[];
  onAdd?: (files: UploadFile[]) => void;
  onRemove?: (index: number) => void;
  /** Texto de formatos y límite. */
  hint?: string;
  /** Llamada a la acción de la zona de arrastre. Admite marcado. */
  cta?: React.ReactNode;
  /** Nombre accesible de la barra de progreso. Default `Progreso de ${nombre}`. */
  progressLabel?: (name: string) => string;
  /** Nombre accesible del botón de quitar. Default `Quitar ${nombre}`. */
  removeLabel?: (name: string) => string;
  style?: React.CSSProperties;
}
/** Zona de arrastre que se ilumina en naranja + lista con progreso (naranja en curso, verde completado). */
export const FileUpload: React.FC<FileUploadProps>;
