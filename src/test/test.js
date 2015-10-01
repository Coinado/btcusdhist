import test from 'blue-tape';
import {done,btcToUSD} from '../index.js';
import moment from 'moment';

test('btcPrice', async t => {
  const dt = moment('09-14-2014 10:00', 'MM-DD-YYYY HH:mm');
  const price = await btcToUSD(dt.toDate());
  console.log(`Price on ${dt.format()} = ${price}`);
  const startOfYear = moment().startOf('year');
  const price2 = await btcToUSD(startOfYear.toDate());
  console.log(`Price on ${startOfYear.format()} = ${price2}`);
  done();
  return t.equal(1,1);
})
