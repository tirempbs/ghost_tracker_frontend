// This file is for functions that affect styling

function dropInCreate(element) {
  element.classList.remove('drop-out-create')
  element.classList.remove('no-display')
  element.classList.add('drop-in-create')
}

function dropInShow(element) {
  element.classList.remove('drop-out-show')
  element.classList.remove('no-display')
  element.classList.add('drop-in-show')
}

function dropOutCreate(element) {
  element.classList.remove('drop-in-create')
  element.classList.add('drop-out-create')
  setTimeout(() => {
    element.classList.add('no-display')
  }, 1000)
}

function dropOutShow(element) {
  element.classList.remove('drop-in-show')
  element.classList.add('drop-out-show')
  setTimeout(() => {
    element.classList.add('no-display')
  }, 1000)
}

function toggleInvisible(element) {
  if (element.classList.contains('no-display')) {
    element.classList.remove('no-display')
  } else {
    element.classList.add('no-display')
  }
}

function togglePulseRed(element) {
  if (element.classList.contains('pulse-red')) {
    element.classList.remove('pulse-red')
  } else {
    element.classList.add('pulse-red')
  }
}

function addPulseRed(element) {
  element.classList.add('pulse-red')
}

function removePulseRed(element) {
  element.classList.remove('pulse-red')
}

function addSabbathScheme(element) {
  element.classList.add('sabbath')
}
