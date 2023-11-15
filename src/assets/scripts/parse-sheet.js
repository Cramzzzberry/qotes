/* 
This functions by getting the whole input of a user, dissect each line checking if there are
one liner prefixes, else proceed to parse chords and lyrics by checking each words one by one
TODO: I wanted to make it more maintainable, customizable, and parse the whole text instead of
parsing each line
*/

let lyricChordsStore = []
let lyricStore = ''
let chordStore = []
let parsedLineOfStrs = []

export default function parseSheet(input) {
  parsedLineOfStrs = []
  let lineOfStrings = input.split('\n')

  lineOfStrings.forEach((str, mainIndex) => {
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
      if (str === '') {
        mergeLyricsAndChords(str)
        parsedLineOfStrs.push(`<div class="leading-[3rem] invisible">invisible</div>`)
      } else if (isLastLine(mainIndex, lineOfStrings.length) && containsChord(str)) {
        let lyric = str.split(/( )/).filter((value) => value !== '')
        let finalLyric = []

        lyric.forEach((word) => {
          if (isChord(word)) {
            finalLyric.push(`<span class="chord">${word}</span>`)
          } else {
            finalLyric.push(' ')
          }
        })

        parsedLineOfStrs.push(`<div class="whitespace-pre-wrap">${finalLyric.join('')}</div>`)
      } else if (containsChord(str)) {
        convertChordToHash(str)
      } else {
        //This is the "next line after checking if the previous line has chords"
        mergeLyricsAndChords(str)
      }
    }
  })

  return parsedLineOfStrs.join('')
}

function convertChordToHash(str) {
  lyricStore = str
  lyricChordsStore = str.split(/( )/).filter((value) => value !== '')
  chordStore = lyricChordsStore.filter((value) => isChord(value))

  //This section makes the lyricChordsStore (the lyric with chord) split into individual characters except the chords,
  //where in chords are being replaced as # or ## depending on the chord length
  for (let i = 0; i < lyricChordsStore.length; i++) {
    if (isChord(lyricChordsStore[i])) {
      for (let j = 0; j < lyricChordsStore[i].length; j++) {
        if (j === 0) {
          //the unwieldy code, this makes chords into #'s, C becomes #, Am becomes ##, C#m becomes ###...
          //etc. depending on the chord's length
          //cant replace it into a single #, because it changes the current lyricChordsStore[i].length
          //which bypasses the else statement if ever
          let replacement = lyricChordsStore[i].split('').fill('#').join('')
          lyricChordsStore.splice(i, 1, replacement)
        } else {
          lyricChordsStore.splice(i + j, 0, ' ')
        }
      }
    } else {
      //convert words into spaces
      let word = lyricChordsStore[i]

      word.split('').forEach((char, index) => {
        if (index === 0) {
          lyricChordsStore.splice(i, 1, ' ')
        } else {
          lyricChordsStore.splice(i + index, 0, ' ')
        }
      })
    }
  }
}

function mergeLyricsAndChords(str) {
  if (lyricStore !== '') {
    let currentLyricChars = str.split('')
    let lyricChars = lyricStore.split('')
    let chordPointerIndex = 0
    let pointerIndex = 0

    if (lyricChars.length > currentLyricChars.length) {
      let lengthDiff = lyricChars.length - currentLyricChars.length

      while (lengthDiff !== 0) {
        currentLyricChars.push(' ')

        lengthDiff--
      }
    }

    currentLyricChars.forEach((word, index) => {
      if (isChord(lyricChordsStore[index])) {
        currentLyricChars.splice(index + pointerIndex, 0, `<span class=absolute><span class="chord">${chordStore[chordPointerIndex]}</span></span>`)
        pointerIndex++
        if (chordPointerIndex < chordStore.length - 1) chordPointerIndex++
      }
    })

    lyricChordsStore = []
    lyricStore = ''
    chordStore = []
    parsedLineOfStrs.push(`<div class="whitespace-pre-wrap relative leading-[3rem]">${currentLyricChars.join('')}</div>`)
  } else {
    parsedLineOfStrs.push(`<div class="whitespace-pre-wrap leading-[3rem]">${str}</div>`)
  }
}

function containsChord(str) {
  if (/(^| )([A-G])([#b]?)(m|maj|aug|dim|sus|add)?(M)?([0-9])?(?!\w)/.test(str)) {
    return true
  } else {
    return false
  }
}

function isChord(str) {
  return /(^| )([A-G])([#b]?)(m|maj|aug|dim|sus|add)?(M)?([0-9])?$/.test(str) || /^#*$/.test(str)
}

function isLastLine(index, length) {
  return index === length - 1
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
