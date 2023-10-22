import { useAppDispatch } from "features/config/hooks";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import * as XLSX from "xlsx";
import { togglePopupScroll } from "../slices/popup-scroll.slice";

interface ExcelPreviewModalProps {
  open: boolean;
  onClose: () => void;
  file: File | string;
}

export function ExcelPreviewModal(props: ExcelPreviewModalProps) {
  const dispatch = useAppDispatch();

  const [sheetData, setSheetData] = useState<any[]>([]);

  useEffect(() => {
    dispatch(togglePopupScroll());
  }, [props.open]);

  useEffect(() => {
    if (props.file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const firstSheet = workbook.Sheets[firstSheetName];
        const dataJson: any[] = XLSX.utils.sheet_to_json(firstSheet, {
          header: 1,
        });

        // Find the maximum number of columns and rows
        let maxColumns = 0;
        let maxRows = 0;

        dataJson.forEach((row) => {
          maxColumns = Math.max(maxColumns, row.length);
          maxRows++;
        });

        const filledData: any[][] = [];

        for (let rowIndex = 0; rowIndex < maxRows; rowIndex++) {
          const rowData: any[] = [];

          for (let colIndex = 0; colIndex < maxColumns; colIndex++) {
            const cellValue =
              rowIndex < dataJson.length && colIndex < dataJson[rowIndex].length
                ? dataJson[rowIndex][colIndex]
                : "";

            rowData.push(cellValue);
          }

          filledData.push(rowData);
        }

        setSheetData(filledData);
      };
      if (props.file instanceof File) {
        reader.readAsArrayBuffer(props.file);
      }
    }
  }, [props.file]);

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }
  return (
    <div
      id="excel-preview-modal"
      className="fixed inset-0 -top-5 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div className="w-[97%] lg:w-[800px] my-5 rounded-[10px]">
        <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
          <span className="text-2xl text-white">Preview Excel Content</span>
          <button
            className="text-2xl text-white"
            onClick={() => {
              document.body.classList.remove("overflow-hidden");
              props.onClose();
            }}
          >
            <IoMdClose />
          </button>
        </div>
        <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary space-y-5 overflow-auto">
          {sheetData.length > 0 && (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2"></th>
                  {sheetData[0].map((cell: any, index: number) => (
                    <th
                      key={index}
                      className="border p-2 text-center font-bold"
                    >
                      {String.fromCharCode(65 + index)}{" "}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sheetData.map((row: any, rowIndex: number) => (
                  <tr key={rowIndex}>
                    <td className="border p-2 font-bold text-center">
                      {rowIndex + 1}{" "}
                    </td>
                    {row.map((cell: any, cellIndex: number) => (
                      <td key={cellIndex} className="border p-2">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
