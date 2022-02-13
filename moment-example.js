const moment = require('moment');
var now = moment();

// console.log(now.format());
// console.log(now.format('MMM Do YYYY, h:mma'));
// console.log(now.format('X'));
// console.log(now.valueOf());
const timestamp = 1644723793617;
var timestampMoment = moment.utc(timestamp);
console.log(now.local().format('h:mma'));
