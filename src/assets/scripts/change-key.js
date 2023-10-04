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
  const keyObj = {
    C: tranposeKey('C', keyDiff, newKey, prevKey),
    D: tranposeKey('D', keyDiff, newKey, prevKey),
    E: tranposeKey('E', keyDiff, newKey, prevKey),
    F: tranposeKey('F', keyDiff, newKey, prevKey),
    G: tranposeKey('G', keyDiff, newKey, prevKey),
    A: tranposeKey('A', keyDiff, newKey, prevKey),
    B: tranposeKey('B', keyDiff, newKey, prevKey),
  }

  changedStr = str.replace(new RegExp(
    checkKey('C') + "|" +
    checkKey('D') + "|" +
    checkKey('E') + "|" +
    checkKey('F') + "|" +
    checkKey('G') + "|" +
    checkKey('A') + "|" +
    checkKey('B')
    , 'g'), function(match) { return keyObj[match] })

  return changedStr
}

function tranposeKey(key, keyDiff, newKey, prevKey) {
  let changedKeyIndex = 0;

  let newKeyIndex = keys.indexOf(newKey) + 1
  let prevKeyIndex = keys.indexOf(prevKey) + 1
  let goHigher = newKeyIndex > prevKeyIndex

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

  console.log(keys[changedKeyIndex])

  return keys[changedKeyIndex]
}

function checkKey(chord) {
  let regex = null

  if(chord.includes('#')) {
    regex = ``
  } else {
    regex = `(?<=^| |\n)${ chord }(?!#|b)(?=(maj|m|dim|sus|aug|add)?(Md)?d?(?!w))`
  }

  return regex
}