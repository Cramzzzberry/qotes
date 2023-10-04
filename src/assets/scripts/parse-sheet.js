export default function parseSheet(input) {
  let lineOfStrings = input.split('\n')
  let parsedStrings = []

  lineOfStrings.forEach(str => {
    let substr = ''

    if (str.match(/(?<!\w)#{3} /g)) {
      //h3
      substr = str.replace('### ', '')
      parsedStrings.push(`<h3>${ substr }</h3>`)
    } else if (str.match(/(?<!\w)#{2} /g)) {
      //h2
      substr = str.replace('## ', '')
      parsedStrings.push(`<h2>${ substr }</h2>`)
    } else if (str.match(/(?<!\w)# /g)) {
      //h1
      substr = str.replace('# ', '')
      parsedStrings.push(`<h1>${ substr }</h1>`)
    } else if (str.match(/-{3,}/g)) {
      //hr
      substr = str.replace(/-{3,}/g, '<hr>')
      parsedStrings.push(substr)
    } else if (str.match(/>> /g)) {
      substr = str.replace(/>> /g, '')
      parsedStrings.push(`<div class="song-section">${ substr }</div>`)
    } else { //if there is no prefix or one liner syntax like --- for hr
      let parsedSongSegment = []
      let songSegment = str.replace(/ /g, '|&nbsp|').split('|') //named as song segment because string is redundant

      songSegment.forEach(songEntity => {
        substr = ''

        if (songEntity.match(/(^| )([A-G](#?|b?))(maj|m|dim|sus|aug|add)?(M\d)?\d?(?!\w)/g)) {
          //if it is a chord
          substr = songEntity
          parsedSongSegment.push(`<span class="chord">${ substr }</span>`)
        } else { //if it is a lyrics
          parsedSongSegment.push(songEntity)
        }
      })

      parsedStrings.push(`${ parsedSongSegment.join('') } <br>`)
    }
  })

  return parsedStrings.join("")
}