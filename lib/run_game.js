'use strict';

const Level = require('./level.js');

function runGame(plans, Display) {

  function startLevel(n) {

    runLevel(new Level(plans[n]), Display, function(status) {
      if (status == "lost")
        startLevel(n);
      else if (n < plans.length - 1)
        startLevel(n + 1);
      else
       console.log("You win!");
    });

  }

  startLevel(0);

}


function runAnimation(frameFunc) {

  var lastTime = null;

  function frame(time) {

    var stop = false;

    if (lastTime != null) {
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      stop         = frameFunc(timeStep) === false;
    }

    lastTime = time;

    if (!stop)
      requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);

}

function runLevel(level, Display, andThen) {

  let display = new Display(document.body, level);

  runAnimation(function(step) {

    level.animate(step, arrows);

    display.drawFrame(step);

    if (level.isFinished()) {
      display.clear();
      if (andThen)
        andThen(level.status);
      return false;
    }

  });

}


// CanvasDisplay needs a (parent, level)

// runGame(pacmanBoard, CanvasDisplay());


let simpleLevel = new Level(pacmanBoard);
runGame(simpleLevel, CanvasDisplay('document', 0));