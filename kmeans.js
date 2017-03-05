const Heap = require('heap');
function sqr(x) { return x * x; }
function distance(a, b) { return Math.sqrt(sqr(a.x - b.x) + sqr(a.y - b.y)); }

function kmeans(base, list, k) {
  list.map((p) => {
    let d = distance(base, p);
    p.d = d;
    return p;
  });

  console.log(list);

  let heap = new Heap((a, b) => {
    if (a.d === b.d) return 0;
    if (a.d - b.d > 0) {
      return -1;
    } else {
      return 1;
    }
  });

  for (let i = 0; i < k; i++) {
    heap.push(list[i]);
  }

  //console.log(heap);

  for (let i = k; i < list.length; i++) {
    let top = heap.peek(),
      p = list[i];
    //console.log('top', top);
    //console.log('p', p);

    if (p.d < top.d) {
      heap.pushpop(p);
      //console.log(heap);
    }
  }

  //console.log(heap);
  return heap.toArray();
}

let base = {x: 0, y: 0},
  list = [
    {x: 1, y: 12},
    {x: 5, y: 4},
    {x: 3, y: 4},
    {x: 3, y: 0},
    {x: 4, y: 4},
    {x: 0, y: 2},
    {x: 2, y: 3},
    {x: 1, y: 0},
    {x: 100, y: 0}];
var knearest = kmeans(base, list, 3);
console.log('knearest', knearest);
