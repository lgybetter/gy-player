export function initAudioContext (audio, canvas) {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  const audioContext = new AudioContext()
  const source = audioContext.createMediaElementSource(audio)
  const analyser = audioContext.createAnalyser()
  source.connect(analyser)
  analyser.connect(audioContext.destination)
  const context = canvas.getContext('2d')
  let arrData = new Uint8Array(analyser.frequencyBinCount)
  let count = Math.min(500, arrData.length)
  let step = Math.round(arrData.length * 0.6 / count)
  let value = 0
  let drawX = 0
  let drawY = 0
  let height = canvas.height
  let width = canvas.width
  let lineWidth = context.lineWidth = canvas.width / count * 10
  context.lineWidth = lineWidth
  render()
  function render () {
    context.clearRect(0, 0, width, height)
    analyser.getByteFrequencyData(arrData)
    for (let i = 0; i < count / 10; i++) {
      value = arrData[i * step + step]
      drawX = i * lineWidth
      drawY = parseInt(Math.max((height - value / 2), 10))
      context.beginPath()
      context.strokeStyle = 'rgba(209,95,238,.6)'
      context.moveTo(drawX, height)
      context.lineTo(drawX, drawY)
      context.stroke()
    }
    requestAnimationFrame(render)
  }
}
