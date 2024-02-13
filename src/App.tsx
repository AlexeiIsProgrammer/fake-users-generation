import { useState } from 'react';
import { Container } from 'react-bootstrap';
import FakeTable from './components/FakeTable';
import Toolbar from './components/Toolbar';
import { FakerItem } from './types';

function App() {
  const [fakersCount, setFakersCount] = useState(20);
  const [fakers, setFakers] = useState<FakerItem[]>([]);

  return (
    <Container>
      <Toolbar setFakers={setFakers} fakersCount={fakersCount} />
      <FakeTable fakers={fakers} />
    </Container>
  );
}

export default App;
