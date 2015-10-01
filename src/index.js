import csvparse from 'csv-parse';
import pr from 'es6-promisify';
import bs from 'binarysearch';
import request from 'request';
import {toPromise} from 'fishing';
import gunzip from 'gunzip-maybe';

let ticks = [];
let index = null;

_load().then(()=>{});
let reload = setInterval( ()=>{_load()}, 16*1000*60*60);

async function _load() {
  const url = 'http://api.bitcoincharts.com/v1/csv/krakenUSD.csv.gz';
  let unzip = gunzip();
  request(url).pipe(unzip);
  let csv = (await toPromise(unzip)).toString();
  ticks = await pr(csvparse)(csv, {});
  let buffer = new ArrayBuffer(ticks.length*4);
  index  = new Int32Array(buffer); 
  let i = 0;
  for (var tick of ticks) {
    tick[0] = tick[0]*1;
    index[i++] = tick[0];
  }
}

async function load() {
  if (ticks.length>0) {
    return;
  } else {
    return await _load();
  }
}

async function lastPrice() {
            
}

export async function btcToUSD(dateTime) { 
  if (Date.now()-dateTime.getTime()<(1000*60*60*24)) {
    return await lastPrice();
  }
  await load();
  const unixTime = dateTime/1000;
  const closest = bs.closest(index, unixTime);
  console.log('ans is ',ticks[closest][1]);
  return ticks[closest][1]; 
}

export function done() {
  clearInterval(reload);
}

