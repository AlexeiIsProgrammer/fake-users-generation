import { useState } from 'react';
import { Container } from 'react-bootstrap';
import FakeTable from './components/FakeTable';
import Toolbar from './components/Toolbar';
import { FakerItem } from './types';
import { Countries } from './components/utils/selectCountry';
import { loadMore } from './components/utils/loadAndUglify';

function App() {
  const [page, setPage] = useState(1);
  const [errorCount, setErrorCount] = useState(0);
  const [country, setCountry] = useState<Countries>(Countries.US);
  const [fakers, setFakers] = useState<FakerItem[]>([]);

  const scrollFakersHandle = () => {
    setTimeout(() => {
      setPage(page + 1);
      setFakers(loadMore(country, 10, fakers, errorCount));
    }, 500);
  };

  return (
    <Container>
      <Toolbar
        page={page}
        errorCount={errorCount}
        setErrorCount={setErrorCount}
        setFakers={setFakers}
        fakers={fakers}
        country={country}
        setCountry={setCountry}
      />
      <FakeTable fakers={fakers} scrollFakersHandle={scrollFakersHandle} />
    </Container>
  );
}

export default App;
