export default function htmlParse(input) {
  let lineOfStrings = input.split('\n')
  let parsedStrings = []

  lineOfStrings.forEach(str => {
    let substr = ''

    if(str.match(/(?<!\w)#{3} /g)) {
      //h1
      substr = str.replace('### ', '')
      parsedStrings.push(`<h3>${ substr }</h3>`)
    }
    else if(str.match(/(?<!\w)#{2} /g)) {
      //h2
      substr = str.replace('## ', '')
      parsedStrings.push(`<h2>${ substr }</h2>`)
    }
    else if(str.match(/(?<!\w)# /g)) {
      //h3
      substr = str.replace('# ', '')
      parsedStrings.push(`<h1>${ substr }</h1>`)
    }
    else if (str.match(/-{3,}/g)) {
      //hr
      substr = str.replace(/-{3,}/g, '<hr>')
      parsedStrings.push(substr)
    }
    else { //if there is no prefix or one liner syntax like --- for hr
      let parsedSongSegment = []
      let songSegment = str.replace(/ /g, '|&nbsp|').split('|') //named as song segment because string is redundant

      songSegment.forEach(songEntity => {
        substr = ''

        //if it is a chord
        if (songEntity.match(/(^| )([A-G](#?|b?))(maj|m|dim|sus|aug|add)?(M\d)?\d?(?!\w)/g)) {
          substr = songEntity
          parsedSongSegment.push(`<span class="chord">${ substr }</span>`)
        } else if (songEntity.match(/\[.*\]/g)) {
          substr = songEntity.replace(/\[|\]/g, '')
          parsedSongSegment.push(`<span class="song-section">${ substr }</span>`)
        } else {
          parsedSongSegment.push(songEntity)
        }
      })

      parsedStrings.push(`${ parsedSongSegment.join('') } <br>`)
    }
  })

  return parsedStrings.join("")
}