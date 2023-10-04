const setKeys = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']
const allKeys = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B']

export default function changeKey(sheetStr, newKey, prevKey) {
  let newStr = ''

  let newKeyIndex = setKeys.indexOf(newKey) + 1
  let prevKeyIndex = setKeys.indexOf(prevKey) + 1

  let goHigher = newKeyIndex > prevKeyIndex
  let keyDiff = goHigher ? newKeyIndex - prevKeyIndex : prevKeyIndex - newKeyIndex

  newStr = replacingKeys(sheetStr, keyDiff, newKey, prevKey)

  return newStr
}

function replacingKeys(str, keyDiff, newKey, prevKey) {
  let transposedKeyObj = {}
  let regex = ''

  for (let index in allKeys) {
    //put all keys in an object so the replace method can use it for matching.
    transposedKeyObj[allKeys[index]] = tranposeKey(allKeys[index], keyDiff, newKey, prevKey)

    //combine the regex strings
    if (parseInt(index) + 1 == allKeys.length) {
      regex = regex + checkKey(allKeys[index])
    } else {
      regex = regex + checkKey(allKeys[index]) + "|"
    }
  }

  return str.replace(new RegExp(regex, 'g'), function(match) { return transposedKeyObj[match] })
}

function tranposeKey(key, keyDiff, newKey, prevKey) {
  let changedKeyIndex = 0;

  let newKeyIndex = setKeys.indexOf(newKey) + 1
  let prevKeyIndex = setKeys.indexOf(prevKey) + 1
  let goHigher = newKeyIndex > prevKeyIndex

  // this is for correction, to make the 'counting' work
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

  if (goHigher) {// if the new key is higher than the previous
    if ((setKeys.indexOf(key) + 1) + keyDiff > setKeys.length) { //if the transposition overflows the array length
      changedKeyIndex = (setKeys.indexOf(key) + keyDiff) - setKeys.length
    } else {
      changedKeyIndex = setKeys.indexOf(key) + keyDiff
    }
  } else {
    if ((setKeys.indexOf(key) + 1) - keyDiff <= 0) { //if the transposition overflows the array length, backwards
      changedKeyIndex = (setKeys.indexOf(key) - keyDiff) + setKeys.length
    } else {
      changedKeyIndex = setKeys.indexOf(key) - keyDiff
    }
  }

  return setKeys[changedKeyIndex]
}

function checkKey(chord) {
  return `(?<=^| |\n)${ chord }(?!#|b)(?=(maj|m|dim|sus|aug|add)?(Md)?d?(?!w))`
}