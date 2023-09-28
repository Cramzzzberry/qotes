export default function htmlParse(input) {
  let lineOfStrings = input.split('\n');
  let parsedStrings = [];

  lineOfStrings.forEach(str => {
    let substr = '';

    if(str.match(/(?<!\w)#{3} /g)) {
      //h1
      substr = str.replace('### ', '');
      parsedStrings.push(`<h3>${ substr }</h3>`);
    }
    else if(str.match(/(?<!\w)#{2} /g)) {
      //h2
      substr = str.replace('## ', '');
      parsedStrings.push(`<h2>${ substr }</h2>`);
    }
    else if(str.match(/(?<!\w)# /g)) {
      //h3
      substr = str.replace('# ', '');
      parsedStrings.push(`<h1>${ substr }</h1>`);
    }
    else if(str.match(/== /g)) { //did this because as of now i dont know how to regex a "== chord_line"
      //chords
      str = str.replace('== ', '')

      if(str.match(/(^| )([A-G](#?|b?))(m|maj|dim|sus|aug|add)?M?\d?( ?(?![a-zA-Z0-9])$)/g)) {
        //1st group checks if it starts with a letter or a " "
        //2nd group checks if a string has A to G letters, then checks if there is # or b (with a null check)
        //3rd group checks if there is a maj/m/dim/sus/aug
        //\d checks if there is a single digit number
        //last group ensures that there are no word [a-zA-Z0-9] follows the chord
        //\[ and \] are just brackets to indicate it is a chord container
        substr = parseChords(str);
        parsedStrings.push(substr);
      }
    }
    else if(str.match(/-- /g)) {
      //lyrics
      substr = str.replace('-- ', '')
      parsedStrings.push(`<div class="lyrics">${ substr }</div>`);
    }
    else if(str.match(/\[.*\]/g)) {
      //song section
      substr = str.replace(/\[|\]/g, '')
      parsedStrings.push(`<div class="song-section">${ substr }</div>`);
    }
    else if (str.match(/(?<=\w?) ?\\/g)) {
      substr = str.replace(/\\/g, '<br />');
      parsedStrings.push(substr);
    }
    else if (str.match(/-{3}/g)) {
      substr = str.replace(/-{3}/g, '<hr>');
      parsedStrings.push(substr);
    }
    else {
      parsedStrings.push(str);
    }
  });

  return parsedStrings.join(" ");
}

function parseChords(chord) {
  let substr = '';

  let chords = [];
  let chordLine = chord.replace(/ /g, '-&nbsp-').split('-'); //just a "hack" to preserve spaces, but it leaves an empty string:/

  chordLine.forEach(word => {
    if(word.match(/([A-G](#?|b?))(maj|m|dim|sus|aug|add)?M?\d?/g)) {
      substr = word.replace(/([A-G](#?|b?))(maj|m|dim|sus|aug|add)?M?\d?/g, `<span>${ word }</span>`);
      chords.push(substr);
    } else if (word === "&nbsp") {
      chords.push(word);
    }
  })

  return `<div class="chords">${ chords.join('') }</div>`;
}