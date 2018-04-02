'use strict'

// function oldBrowser () {
//   throw new Error('Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11')
// }

var Buffer = require('safe-buffer').Buffer
// var crypto = global.crypto || global.msCrypto

var MersenneTwister = require('mersenne-twister')

var twister = new MersenneTwister(Math.random()*Number.MAX_SAFE_INTEGER)


// if (crypto && crypto.getRandomValues) {
  
// } else {
//   // module.exports = oldBrowser
// }

function randomBytes (size, cb) {
  // phantomjs needs to throw
  if (size > 65536) throw new Error('requested too many random bytes')
  // in case browserify  isn't using the Uint8Array version
  var rawBytes = new global.Uint8Array(size)

  // This will not work in older browsers.
  // See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
  if (size > 0) {  // getRandomValues fails on IE if size == 0
    getRandomValues(rawBytes)
  }

  // XXX: phantomjs doesn't like a buffer being passed here
  var bytes = Buffer.from(rawBytes.buffer)

  if (typeof cb === 'function') {
    return process.nextTick(function () {
      cb(null, bytes)
    })
  }

  return bytes
}






function getRandomValues (abv) {
  var l = abv.length
  while (l--) {
    abv[l] = Math.floor(randomFloat() * 256)
  }
  return abv
}

function randomFloat() {
  return twister.random()
}



module.exports = randomBytes
