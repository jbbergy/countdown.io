const hoursElem = document.querySelector('.countdown__hours')
const minutsElem = document.querySelector('.countdown__minuts')
const secondsElem = document.querySelector('.countdown__seconds')
const datepickerElem = document.querySelector('#input-date')
const timepickerElem = document.querySelector('#input-time')
const startButtonElem = document.querySelector('#start')
const stopButtonElem = document.querySelector('#stop')
const audioElem = document.querySelector('#audio')
const INTERVAL_LENGTH = 1000
let startDate = new Date()
let dateDiff = null
let timerId = null

hoursElem.innerHTML = '00'
minutsElem.innerHTML = '00'
secondsElem.innerHTML = '00'

audioElem.volume = 0.30
audioElem.currentTime = 0
audioElem.volume = 0.9

const getHoursFromTimestamp = (timestamp) => {
  let value = Math.floor(timestamp / 3600000)
  return value < 10 ? '0' + value : value
}

const getMinutsFromTimestamp = (timestamp) => {
  let value = Math.floor((timestamp % 3600000) / 60000)
  return value < 10 ? '0' + value : value
}

const getSecondsFromTimestamp = (timestamp) => {
  let value = Math.floor((timestamp % 60000) / 1000)
  return value < 10 ? '0' + value : value
}

const stop = () => {
  clearInterval(timerId)
  timerId = null
  hoursElem.innerHTML = '00'
  minutsElem.innerHTML = '00'
  secondsElem.innerHTML = '00'
}

const start = () => {
  if (timerId) stop()
  const endDate = new Date(`${datepickerElem.value}T${timepickerElem.value}`)
  dateDiff = endDate - startDate
  timerId = setInterval(() => {
    dateDiff = dateDiff - INTERVAL_LENGTH
    hoursElem.innerHTML = getHoursFromTimestamp(dateDiff)
    minutsElem.innerHTML = getMinutsFromTimestamp(dateDiff)
    secondsElem.innerHTML = getSecondsFromTimestamp(dateDiff)
    if (dateDiff < 0) {
      audioElem.play()
      stop()
    }
  }, INTERVAL_LENGTH)
}

startButtonElem.addEventListener('click', start)
stopButtonElem.addEventListener('click', stop)
