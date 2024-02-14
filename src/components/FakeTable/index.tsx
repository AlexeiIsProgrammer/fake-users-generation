import InfiniteScroll from 'react-infinite-scroll-component';
import { Alert, Container, Stack, Table } from 'react-bootstrap';

import { FakerItem } from '../../types';

type FakeTablePropsType = {
  fakers: FakerItem[];
  scrollFakersHandle: () => void;
};

function FakeTable({ fakers, scrollFakersHandle }: FakeTablePropsType) {
  return (
    <Container>
      <Stack direction="vertical">
        {fakers.length === 0 ? (
          <Alert variant="danger">You do not have any info now :(</Alert>
        ) : (
          <InfiniteScroll
            dataLength={fakers.length}
            next={scrollFakersHandle}
            hasMore
            loader={<h4>Loading...</h4>}
            scrollThreshold={1}
          >
            <Table className="mt-2" striped responsive>
              <thead>
                <tr>
                  <th>№</th>
                  <th>UUID</th>
                  <th>Surname Name Patronymic</th>
                  <th>Address</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {fakers.map((faker) => (
                  <tr key={faker.id}>
                    <td>{faker.id}</td>
                    <td>{faker.uuid}</td>
                    <td>{faker.name}</td>
                    <td>{faker.address}</td>
                    <td>{faker.phone}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </InfiniteScroll>
        )}
      </Stack>
    </Container>
  );
}

export default FakeTable;
