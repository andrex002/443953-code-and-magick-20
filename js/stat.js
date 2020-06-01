'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var MAX_HEIGHT_HISTOGRAM = 150;
var FONT_STYLE = '16px PT Mono';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomBlueColor = function () {
  return 'hsl(240, ' + Math.round(Math.random() * 100) + '%, 50%)';
};

window.renderStatistics = function (ctx, players, times) {
  ctx.font = FONT_STYLE;
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderText(ctx, 'Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3, '#000');
  renderText(ctx, 'Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3 + FONT_GAP + GAP / 2, '#000');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {

    renderText(
        ctx,
        players[i],
        CLOUD_X + COLUMN_WIDTH + (COLUMN_WIDTH + COLUMN_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - GAP * 2,
        '#000'
    );

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getRandomBlueColor();
    }
    ctx.fillRect(
        CLOUD_X + COLUMN_WIDTH + (COLUMN_WIDTH + COLUMN_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - GAP * 2 - FONT_GAP,
        COLUMN_WIDTH,
        -(MAX_HEIGHT_HISTOGRAM * times[i]) / maxTime
    );
    renderText(
        ctx,
        Math.round(times[i]),
        CLOUD_X + COLUMN_WIDTH + (COLUMN_WIDTH + COLUMN_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - GAP * 3 - FONT_GAP - (MAX_HEIGHT_HISTOGRAM * times[i]) / maxTime,
        '#000'
    );
  }
};
