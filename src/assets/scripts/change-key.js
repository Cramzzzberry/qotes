const keys = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']

export default function changeKey(str, newKey, prevKey) {
  let newStr = ''

  let newKeyIndex = keys.indexOf(newKey) + 1
  let prevKeyIndex = keys.indexOf(prevKey) + 1

  let goHigher = newKeyIndex > prevKeyIndex
  let keyDiff = goHigher ? newKeyIndex - prevKeyIndex : prevKeyIndex - newKeyIndex

  newStr = replacingKeys(str, keyDiff, newKey, prevKey)

  return newStr
}

function replacingKeys(str, keyDiff, newKey, prevKey) {
  let changedStr = ''
  const keysObj = {
    'C': tranposeKey('C', keyDiff, newKey, prevKey),
    'C#': tranposeKey('C#', keyDiff, newKey, prevKey),
    'Db': tranposeKey('Db', keyDiff, newKey, prevKey),
    'D': tranposeKey('D', keyDiff, newKey, prevKey),
    'D#': tranposeKey('D#', keyDiff, newKey, prevKey),
    'Eb': tranposeKey('Eb', keyDiff, newKey, prevKey),
    'E': tranposeKey('E', keyDiff, newKey, prevKey),
    'F': tranposeKey('F', keyDiff, newKey, prevKey),
    'F#': tranposeKey('F#', keyDiff, newKey, prevKey),
    'Gb': tranposeKey('Gb', keyDiff, newKey, prevKey),
    'G': tranposeKey('G', keyDiff, newKey, prevKey),
    'G#': tranposeKey('G#', keyDiff, newKey, prevKey),
    'Ab': tranposeKey('Ab', keyDiff, newKey, prevKey),
    'A': tranposeKey('A', keyDiff, newKey, prevKey),
    'A#': tranposeKey('A#', keyDiff, newKey, prevKey),
    'Bb': tranposeKey('Bb', keyDiff, newKey, prevKey),
    'B': tranposeKey('B', keyDiff, newKey, prevKey),
  }

  changedStr = str.replace(new RegExp(
    checkKey('C') + "|" +
    checkKey('C#') + "|" +
    checkKey('Db') + "|" +
    checkKey('D') + "|" +
    checkKey('D#') + "|" +
    checkKey('Eb') + "|" +
    checkKey('E') + "|" +
    checkKey('F') + "|" +
    checkKey('F#') + "|" +
    checkKey('Gb') + "|" +
    checkKey('G') + "|" +
    checkKey('G#') + "|" +
    checkKey('Ab') + "|" +
    checkKey('A') + "|" +
    checkKey('A#') + "|" +
    checkKey('Bb') + "|" +
    checkKey('B')
    , 'g'), function(match) { return keysObj[match] }
  )

  return changedStr
}

function tranposeKey(key, keyDiff, newKey, prevKey) {
  let changedKeyIndex = 0;

  let newKeyIndex = keys.indexOf(newKey) + 1
  let prevKeyIndex = keys.indexOf(prevKey) + 1
  let goHigher = newKeyIndex > prevKeyIndex

  if (key === 'Db') {
    key = 'C#'
  } else if (key === 'D#') {
    key = 'Eb'
  } else if (key === 'Gb') {
    key = 'F#'
  } else if (key === 'Ab') {
    key = 'G#'
  } else if (key === 'A#') {
    key = 'Bb'
  }

  if (goHigher) {
    if ((keys.indexOf(key) + 1) + keyDiff > keys.length) {
      changedKeyIndex = (keys.indexOf(key) + keyDiff) - keys.length
    } else {
      changedKeyIndex = keys.indexOf(key) + keyDiff
    }
  } else {
    if ((keys.indexOf(key) + 1) - keyDiff <= 0) {
      changedKeyIndex = (keys.indexOf(key) - keyDiff) + keys.length
    } else {
      changedKeyIndex = keys.indexOf(key) - keyDiff
    }
  }

  // console.log(key + " -> " + keys[changedKeyIndex])

  return keys[changedKeyIndex]
}

function checkKey(chord) {
  let regexStr = `(?<=^| |\n)${ chord }(?!#|b)(?=(maj|m|dim|sus|aug|add)?(Md)?d?(?!w))`

  return regexStr
}