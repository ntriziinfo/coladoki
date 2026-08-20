(function(root, factory){
  const api = factory();
  if(typeof module === "object" && module.exports) module.exports = api;
  root.ColadokiReels = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function(){
  "use strict";

  const SYMBOLS = Object.freeze({
    CHERRY:"CHERRY",
    BLANK:"BLANK",
    SUICA:"SUICA",
    REPLAY:"REPLAY",
    BELL:"BELL",
    BAR:"BAR",
    SEVEN:"SEVEN"
  });

  const reelRow = (stop, left, middle, right)=>Object.freeze({stop, left, middle, right});

  // ユーザー指定の表記順（20番から1番）を、そのまま物理リールの循環順として保持する。
  const STOP_ROWS_20_TO_1 = Object.freeze([
    reelRow(20, SYMBOLS.CHERRY, SYMBOLS.BLANK,  SYMBOLS.SUICA),
    reelRow(19, SYMBOLS.SUICA,  SYMBOLS.CHERRY, SYMBOLS.BLANK),
    reelRow(18, SYMBOLS.REPLAY, SYMBOLS.BELL,   SYMBOLS.BELL),
    reelRow(17, SYMBOLS.BELL,   SYMBOLS.REPLAY, SYMBOLS.REPLAY),
    reelRow(16, SYMBOLS.BLANK,  SYMBOLS.SUICA,  SYMBOLS.BAR),
    reelRow(15, SYMBOLS.SEVEN,  SYMBOLS.SEVEN,  SYMBOLS.SEVEN),
    reelRow(14, SYMBOLS.SUICA,  SYMBOLS.CHERRY, SYMBOLS.BLANK),
    reelRow(13, SYMBOLS.REPLAY, SYMBOLS.BELL,   SYMBOLS.BELL),
    reelRow(12, SYMBOLS.BELL,   SYMBOLS.REPLAY, SYMBOLS.REPLAY),
    reelRow(11, SYMBOLS.BAR,    SYMBOLS.CHERRY, SYMBOLS.CHERRY),
    reelRow(10, SYMBOLS.CHERRY, SYMBOLS.BLANK,  SYMBOLS.SUICA),
    reelRow(9,  SYMBOLS.SUICA,  SYMBOLS.CHERRY, SYMBOLS.BLANK),
    reelRow(8,  SYMBOLS.REPLAY, SYMBOLS.BELL,   SYMBOLS.BELL),
    reelRow(7,  SYMBOLS.BELL,   SYMBOLS.REPLAY, SYMBOLS.REPLAY),
    reelRow(6,  SYMBOLS.BLANK,  SYMBOLS.SUICA,  SYMBOLS.CHERRY),
    reelRow(5,  SYMBOLS.BLANK,  SYMBOLS.BAR,    SYMBOLS.SUICA),
    reelRow(4,  SYMBOLS.SUICA,  SYMBOLS.CHERRY, SYMBOLS.BLANK),
    reelRow(3,  SYMBOLS.REPLAY, SYMBOLS.BELL,   SYMBOLS.BELL),
    reelRow(2,  SYMBOLS.BELL,   SYMBOLS.REPLAY, SYMBOLS.REPLAY),
    reelRow(1,  SYMBOLS.BLANK,  SYMBOLS.BLANK,  SYMBOLS.CHERRY)
  ]);

  const REEL_STRIPS_20_TO_1 = Object.freeze([
    Object.freeze(STOP_ROWS_20_TO_1.map(row=>row.left)),
    Object.freeze(STOP_ROWS_20_TO_1.map(row=>row.middle)),
    Object.freeze(STOP_ROWS_20_TO_1.map(row=>row.right))
  ]);

  return Object.freeze({SYMBOLS, STOP_ROWS_20_TO_1, REEL_STRIPS_20_TO_1});
});
