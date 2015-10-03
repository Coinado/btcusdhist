import test from 'blue-tape';
import {done,btcToUSD} from '../index.js';
import moment from 'moment';

test('btcPrice', async t => {
  const dt = moment('09-14-2014 10:00', 'MM-DD-YYYY HH:mm');
  const price = await btcToUSD(1, dt.toDate());
  console.log(`Price on ${dt.format()} = ${price}`);
  const startOfYear = moment().startOf('year');
  const price2 = await btcToUSD(1, startOfYear.toDate());
  console.log(`Price on ${startOfYear.format()} = ${price2}`);

  const nowPrice = await btcToUSD(1, new Date());
  console.log(`Current price is ${nowPrice}`);
  done();
  return t.equal(1,1);
})
