import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Shuffle } from 'react-bootstrap-icons';
import getRandomSeed from '../utils/getRandomSeed';
import {
  MAX_INPUT_ERRORS_VALUE,
  MAX_RANGE_ERRORS_VALUE,
} from '../../constants';
import selectCountry, { Countries } from '../utils/selectCountry';
import { FakerItem } from '../../types';
import { loadMore, uglifyFakers } from '../utils/loadAndUglify';
import { download, generateCsv } from 'export-to-csv';
import csvConfig from '../../constants/csv';

type ToolbarPropsType = {
  setFakers: React.Dispatch<React.SetStateAction<FakerItem[]>>;
  fakers: FakerItem[];
  country: Countries;
  setCountry: React.Dispatch<React.SetStateAction<Countries>>;
  errorCount: number;
  setErrorCount: React.Dispatch<React.SetStateAction<number>>;
};

function Toolbar({
  setFakers,
  country,
  setCountry,
  fakers,
  setErrorCount,
  errorCount,
}: ToolbarPropsType) {
  const [seed, setSeed] = useState(1);

  useEffect(() => {
    const currentFaker = selectCountry(country);
    currentFaker.seed(seed);
    setFakers(loadMore(currentFaker, 20, [], errorCount));
  }, []);

  useEffect(() => {
    if (fakers.length > 0)
      setFakers(uglifyFakers(fakers, selectCountry(country), errorCount, seed));
  }, [country, errorCount, setFakers, seed]);

  return (
    <Row className="mt-4">
      <Col className="mb-3">
        <Form.Label>Region:</Form.Label>
        <Form.Select
          aria-label="Countries select"
          onChange={(e) => {
            setCountry(e.target.value as unknown as Countries);
          }}
        >
          <option value="us">USA</option>
          <option value="pl">Poland</option>
          <option value="de">Germany</option>
        </Form.Select>
      </Col>
      <Col className="mb-3">
        <Form.Label>Errors:</Form.Label>
        <Row className="mb-3 align-items-center">
          <Col>
            <Form.Range
              step={0.5}
              onChange={(e) => setErrorCount(+e.target.value)}
              value={errorCount}
              min={0}
              max={MAX_RANGE_ERRORS_VALUE}
            />
          </Col>
          <Col>
            <Form.Control
              onChange={(e) => {
                const val = +e.target.value;
                if (val > MAX_INPUT_ERRORS_VALUE) {
                  setErrorCount(MAX_INPUT_ERRORS_VALUE);
                } else {
                  setErrorCount(val);
                }
              }}
              value={errorCount}
              max={MAX_INPUT_ERRORS_VALUE}
              type="number"
              placeholder="0"
            />
          </Col>
        </Row>
      </Col>
      <Col className="mb-3">
        <Form.Label>Seed:</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            onChange={(e) => setSeed(+e.target.value)}
            value={seed}
            type="number"
            placeholder="0"
          />
          <Button onClick={() => setSeed(getRandomSeed())} title="Random Seed">
            <Shuffle />
          </Button>
        </InputGroup>
      </Col>
      <Col className="mb-3">
        <Form.Label>Export:</Form.Label>
        <Button
          className="w-100"
          onClick={() => {
            const readyCSV = generateCsv(csvConfig)(fakers);
            download(csvConfig)(readyCSV);
          }}
        >
          Export to csv
        </Button>
      </Col>
    </Row>
  );
}

export default Toolbar;
