export default function parseSheet(input) {
  let lineOfStrings = input.split('\n')
  let parsedStrings = []

  lineOfStrings.forEach(str => {
    let substr = ''

    if (/(?<!\w)#{3} /.test(str)) {
      //h3
      substr = str.replace('### ', '')
      parsedStrings.push(`<h3>${ substr }</h3>`)
    } else if (/(?<!\w)#{2} /.test(str)) {
      //h2
      substr = str.replace('## ', '')
      parsedStrings.push(`<h2>${ substr }</h2>`)
    } else if (/(?<!\w)# /.test(str)) {
      //h1
      substr = str.replace('# ', '')
      parsedStrings.push(`<h1>${ substr }</h1>`)
    } else if (/-{3,}/.test(str)) {
      //hr
      substr = str.replace(/-{3,}/g, '<hr>')
      parsedStrings.push(substr)
    } else if (/>> /.test(str)) {
      substr = str.replace(/>> /, '')
      parsedStrings.push(`<div class="song-section">${ substr }</div>`)
    } else { //if there is no prefix or one liner syntax like --- for hr
      let parsedSongSegment = []
      let songSegment = str.replace(/ /g, '|&nbsp|').split('|') //named as song segment because string is redundant

      songSegment.forEach(songEntity => {
        if (/([A-G])([#b]?)(m|maj|aug|dim|sus|add)?(M)?([0-9])?(?!(\w|#))$/.test(songEntity)) {
          //if it is a chord
          parsedSongSegment.push(`<span class="chord">${ songEntity }</span>`)
        } else { //if it is a lyrics
          parsedSongSegment.push(songEntity)
        }
      })

      parsedStrings.push(`${ parsedSongSegment.join('') } <br>`)
    }
  })

  return parsedStrings.join("")
}