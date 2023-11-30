/* 
This functions by getting the whole input of a user, dissect each line checking if there are
one liner prefixes, else proceed to parse chords and lyrics by checking each words one by one
TODO: I wanted to make it more maintainable, customizable, and parse the whole text instead of
parsing each line
*/
let parsedLineOfStrs = []

export default function parseSheet(input) {
  parsedLineOfStrs = []
  let lineOfStrings = input.split('\n')

  lineOfStrings.forEach((str) => {
    let parsedStr = ''

    if (isH3(str)) {
      parsedStr = str.replace('### ', '')
      parsedLineOfStrs.push(`<h3>${parsedStr}</h3>`)
    } else if (isH2(str)) {
      parsedStr = str.replace('## ', '')
      parsedLineOfStrs.push(`<h2>${parsedStr}</h2>`)
    } else if (isH1(str)) {
      parsedStr = str.replace('# ', '')
      parsedLineOfStrs.push(`<h1>${parsedStr}</h1>`)
    } else if (isHr(str)) {
      parsedStr = str.replace(/-{3,}/g, '<hr>')
      parsedLineOfStrs.push(parsedStr)
    } else if (isSongSection(str)) {
      parsedStr = str.replace(/>> /, '')
      parsedLineOfStrs.push(`<div class="song-section">${parsedStr}</div>`)
    } else {
      //if there is no prefix or one liner syntax like --- for hr
      let parsedPhrases = []
      let phrases = str.replace(/ /g, '|&nbsp|').split('|') //named as song segment because string is redundant

      phrases.forEach((songEntity) => {
        if (isChord(songEntity)) {
          //if it is a chord
          parsedPhrases.push(`<span class="chord">${songEntity}</span>`)
        } else {
          //if it is a lyrics
          parsedPhrases.push(songEntity)
        }
      })

      parsedLineOfStrs.push(`${parsedPhrases.join('')} <br>`)
    }
  })

  return parsedLineOfStrs.join('')
}

function isChord(str) {
  return /([A-G])([#b]?)(m|maj|aug|dim|sus|add)?(M)?([0-9])?(?!(\w|#))$/.test(str)
}

function isH3(str) {
  return /(?<!\w)#{3} /.test(str)
}

function isH2(str) {
  return /(?<!\w)#{2} /.test(str)
}

function isH1(str) {
  return /(?<!\w)# /.test(str)
}

function isHr(str) {
  return /-{3,}/.test(str)
}

function isSongSection(str) {
  return /^>> /.test(str)
}
