import XLSX from "xlsx";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const WORKBOOK_SAVE_OPTS = { bookType: "xlsx", bookSST: false, type: "array" };

export const saveWorkbook = ({ file: { name }, workbook }) => {
  const wbout = XLSX.write(workbook, WORKBOOK_SAVE_OPTS);

  return {
    name,
    blob: new Blob([wbout], { type: "application/octet-stream" })
  };
};

export const saveZip = filesData => {
  const zip = new JSZip();

  filesData.forEach(({ name, blob }) => {
    zip.file(name, blob, { binary: true });
  });

  zip.generateAsync({ type: "blob" }).then(content => {
    saveAs(content, "parser-result.zip");
  });
};

export const saveFile = ({ name, blob }) => {
  saveAs(blob, name);
};
