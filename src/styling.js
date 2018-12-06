// This file is for functions that affect styling

function dropIn(element) {
  element.classList.remove('drop-out')
  element.classList.remove('no-display')
  element.classList.add('drop-in')
}

function dropOut(element) {
  element.classList.remove('drop-in')
  element.classList.add('drop-out')
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
