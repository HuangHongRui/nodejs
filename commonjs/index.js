const {sum, x} = require('./utils');
const _ = require('lodash');

const val = sum(1, 2)

const xval = x(566, 2)

const ary = _.concat([1],[2,[34,[6,6,7]]])

console.log(val, xval, ary);