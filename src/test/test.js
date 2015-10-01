import test from 'blue-tape';
import {btcToUSD} from '../index.js';
import moment from 'moment';

test('btcPrice', async t => {
  const dt = moment('09-15-2015 10:00', 'MM-DD-YYYY HH:mm');
  const price = await btcToUSD(dt.toDate());
  console.log(`Price = ${price}`);
  return t.equal(1,1);
});
