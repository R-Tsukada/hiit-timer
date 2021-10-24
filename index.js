#!/usr/bin/env node

const log = require('single-line-log').stdout
const player = require('play-sound')(opts = {})
const { prompt } = require('enquirer')
const emoji = require('node-emoji');

async function hiitTimer(){
  const workoutTimer = await prompt(
    [
      {
        type: 'select',
        name: 'workoutTime',
        message: 'select workout time',
        choices: ['10', '20', '30', '40', '50', '60']
      },
      {
        type: 'select',
        name: 'restTime',
        message: 'select rest time',
        choices: ['10', '20', '30', '40', '50', '60']
      },
      {
        type: 'select',
        name: 'set',
        message: 'select set number?',
        choices: ['1', '2', '3', '4', '5', '7', '8', '9', '10']
      }
    ]
  )
  const workout = workoutTimer.workoutTime
  const rest = workoutTimer.restTime
  const set = workoutTimer.set

  running(set, workout, rest)
}

async function running(setNumber, workout, rest){
  await log('\x1b[32m10 seconds before Workout')
  await firstWorkout(10)
  for (let i = 0; i < setNumber; i++) {
    log(emoji.get('fist') + ` Set${i + 1} Workoout Start ` + emoji.get('fist'))
    await intervalTimer(workout)
    log((emoji.get('relaxed')) + ` Set${i + 1} Break ` + (emoji.get('relaxed')))
    await intervalTimer(rest)
  }
  await log((emoji.get('congratulations')) + ' Workout Finish' + (emoji.get('exclamation')) + 'Good Job' + (emoji.get('exclamation')) + (emoji.get('congratulations')))
}

function intervalTimer(selectWorkout) {
  return new Promise(resolve => {
      setTimeout(() => {
        const startEffect = player.play('start_effect.mp3')
        resolve()
      }, selectWorkout * 1000)
    }
  )
}

function firstWorkout(second) {
  return new Promise(resolve => {
    setTimeout(() => {
      const startEffect = player.play('start_effect.mp3')
      resolve()
    }, second * 1000)
  })
}

hiitTimer()