import React, { useState, useCallback } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

import "./App.scss";
import Parser from "./Parser";
import ParserResult from "./ParserResult";

const App = () => {
  const [filesToParse, setFilesToParse] = useState([]);
  const [parseResult, setParseResult] = useState([]);
  const handleChange = useCallback(({ target: { files } }) => {
    const filesToParse = [];
    for (let i = 0; i < files.length; i++) {
      filesToParse[i] = files[i];
    }
    setFilesToParse(filesToParse);
  }, []);

  return (
    <div className="py-5">
      <Container>
        <Row>
          <Col />
          <Col md={9} lg={8} xl={8}>
            <div className="pb-5 text-center">
              <h1>Парсер</h1>
              <p>Откройте нужные файлы и нажмите "Распарсить"</p>
            </div>
            <Row>
              <Col>
                <Form.Group controlId="filesToParse">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      lang="ru"
                      multiple
                      onChange={handleChange}
                    />
                    <label className="custom-file-label">
                      {filesToParse.length
                        ? `Выбрано файлов: ${filesToParse.length}`
                        : "Файлы не выбраны"}
                    </label>
                  </div>
                  <Form.Text className="text-muted">
                    Выберите один или несколько файлов
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Parser filesToParse={filesToParse} setResult={setParseResult} />
            <ParserResult result={parseResult} />
          </Col>
          <Col />
        </Row>
      </Container>
    </div>
  );
};

export default App;
