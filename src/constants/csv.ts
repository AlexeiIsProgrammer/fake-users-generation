import { mkConfig } from 'export-to-csv';

const csvConfig = mkConfig({ useKeysAsHeaders: true });
export default csvConfig;
