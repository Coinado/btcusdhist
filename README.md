Get a BTC price given at a given time in the recent past.

# Usage

```javascript
import {done,btcToUSD} from 'btcusdhist';
import moment from 'moment';

async t = () => {
  const dt = moment('09-14-2014 10:00', 'MM-DD-YYYY HH:mm');
  const price = await btcToUSD(dt.toDate());
  console.log(`Price on ${dt.format()} = ${price}`);
  done();
}

```

