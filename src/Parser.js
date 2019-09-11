import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Button, Spinner, Alert, Row, Col } from "react-bootstrap";
import XLSX from "xlsx";

import { saveWorkbook } from "./utils";

const Parser = ({ filesToParse, setResult }) => {
  const [loading, setLoading] = useState(false);
  const [filesContent, setFilesContent] = useState([]);
  const handledFilesContent = useMemo(
    () => filesContent.filter(({ workbook }) => !!workbook),
    [filesContent]
  );
  const unhandledFilesContent = useMemo(
    () => filesContent.filter(({ workbook }) => !workbook),
    [filesContent]
  );
  const disabled = handledFilesContent.length === 0 || loading;

  const handleClick = useCallback(() => {
    if (disabled) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult(handledFilesContent.map(saveWorkbook));
    }, 0);
  }, [handledFilesContent, disabled, setResult]);

  useEffect(() => {
    if (filesToParse.length === 0) {
      return;
    }

    setLoading(true);
    setResult([]);

    const fileReaders = new Set();
    const filesContent = [];

    const removeReader = reader => {
      fileReaders.delete(reader);
      if (fileReaders.size === 0) {
        setLoading(false);
        setFilesContent(filesContent);
      }
    };

    const handleError = ({ target: reader }) => {
      const { file } = reader;
      filesContent.push({ file, key: Math.random() });
      removeReader(reader);
    };

    const handleLoad = ({ target: reader }) => {
      const { file, result } = reader;
      try {
        const data = new Uint8Array(result);
        const workbook = XLSX.read(data, { type: "array" });
        filesContent.push({ file, workbook, key: Math.random() });
      } catch (e) {
        filesContent.push({ file, key: Math.random() });
      }
      removeReader(reader);
    };

    filesToParse.forEach(file => {
      const reader = new FileReader();
      reader.file = file;
      reader.onerror = handleError;
      reader.onabort = handleError;
      reader.onload = handleLoad;
      fileReaders.add(reader);
    });

    fileReaders.forEach(reader => {
      reader.readAsArrayBuffer(reader.file);
    });

    return () => {
      fileReaders.forEach(reader => {
        reader.abort();
      });
    };
  }, [filesToParse, setResult]);

  return (
    <>
      <Row>
        <Col>
          {unhandledFilesContent.length > 0 && (
            <Alert variant="warning">
              Не удалось прочитать следующие файлы:
              {unhandledFilesContent.map(({ file: { name }, key }) => (
                <div key={key}>{name}</div>
              ))}
            </Alert>
          )}
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <Button
            variant="primary"
            type="button"
            disabled={disabled}
            onClick={handleClick}
            block
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Распарсить"}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Parser;
