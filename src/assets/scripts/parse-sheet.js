/* 
This functions by getting the whole input of a user, dissect each line checking if there are
one liner prefixes, else proceed to parse chords and lyrics by checking each words one by one
TODO: I wanted to make it more maintainable, customizable, and parse the whole text instead of
parsing each line
*/

export default function parseSheet(input) {
  let lineOfStrings = input.split('\n')
  let parsedLineOfStrs = []

  lineOfStrings.forEach((str) => {
    let parsedStr = ''

    if (/(?<!\w)#{3} /.test(str)) {
      //h3
      parsedStr = str.replace('### ', '')
      parsedLineOfStrs.push(`<h3>${parsedStr}</h3>`)
    } else if (/(?<!\w)#{2} /.test(str)) {
      //h2
      parsedStr = str.replace('## ', '')
      parsedLineOfStrs.push(`<h2>${parsedStr}</h2>`)
    } else if (/(?<!\w)# /.test(str)) {
      //h1
      parsedStr = str.replace('# ', '')
      parsedLineOfStrs.push(`<h1>${parsedStr}</h1>`)
    } else if (/-{3,}/.test(str)) {
      //hr
      parsedStr = str.replace(/-{3,}/g, '<hr>')
      parsedLineOfStrs.push(parsedStr)
    } else if (/>> /.test(str)) {
      parsedStr = str.replace(/>> /, '')
      parsedLineOfStrs.push(`<div class="song-section">${parsedStr}</div>`)
    } else {
      //if there is no prefix or one liner syntax like --- for hr
      let parsedSongSegment = []
      let songSegment = str.replace(/ /g, '|&nbsp|').split('|') //named as song segment because string is redundant

      songSegment.forEach((songEntity) => {
        if (/([A-G])([#b]?)(m|maj|aug|dim|sus|add)?(M)?([0-9])?$/.test(songEntity)) {
          //if it is a chord
          parsedSongSegment.push(`<span class="chord">${songEntity}</span>`)
        } else {
          //if it is a lyrics
          parsedSongSegment.push(songEntity)
        }
      })

      parsedLineOfStrs.push(`${parsedSongSegment.join('')} <br>`)
    }
  })

  return parsedLineOfStrs.join('')
}
