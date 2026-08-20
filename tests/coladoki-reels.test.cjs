"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const reels = require("../coladoki-reels.js");

const {SYMBOLS:S, STOP_ROWS_20_TO_1:rows, REEL_STRIPS_20_TO_1:strips} = reels;
const expected = [
  [20,S.CHERRY,S.BLANK,S.SUICA],
  [19,S.SUICA,S.CHERRY,S.BLANK],
  [18,S.REPLAY,S.BELL,S.BELL],
  [17,S.BELL,S.REPLAY,S.REPLAY],
  [16,S.BLANK,S.SUICA,S.BAR],
  [15,S.SEVEN,S.SEVEN,S.SEVEN],
  [14,S.SUICA,S.CHERRY,S.BLANK],
  [13,S.REPLAY,S.BELL,S.BELL],
  [12,S.BELL,S.REPLAY,S.REPLAY],
  [11,S.BAR,S.CHERRY,S.CHERRY],
  [10,S.CHERRY,S.BLANK,S.SUICA],
  [9,S.SUICA,S.CHERRY,S.BLANK],
  [8,S.REPLAY,S.BELL,S.BELL],
  [7,S.BELL,S.REPLAY,S.REPLAY],
  [6,S.BLANK,S.SUICA,S.CHERRY],
  [5,S.BLANK,S.BAR,S.SUICA],
  [4,S.SUICA,S.CHERRY,S.BLANK],
  [3,S.REPLAY,S.BELL,S.BELL],
  [2,S.BELL,S.REPLAY,S.REPLAY],
  [1,S.BLANK,S.BLANK,S.CHERRY]
];

assert.equal(rows.length, 20, "停止番号は20個");
assert.deepEqual(rows.map(row=>[row.stop,row.left,row.middle,row.right]), expected);
assert.equal(strips.length, 3, "左・中・右の3リール");
strips.forEach(strip=>assert.equal(strip.length, 20, "各リールは20コマ"));
assert.deepEqual(strips[0], expected.map(row=>row[1]));
assert.deepEqual(strips[1], expected.map(row=>row[2]));
assert.deepEqual(strips[2], expected.map(row=>row[3]));

const windowAt = (reelIndex, topIndex)=>[0,1,2].map(offset=>strips[reelIndex][(topIndex + offset) % 20]);
const middleLineAt = topIndexes=>topIndexes.map((topIndex,reelIndex)=>windowAt(reelIndex, topIndex)[1]);
assert.deepEqual(middleLineAt([4,4,4]), [S.SEVEN,S.SEVEN,S.SEVEN], "15番の777が中段に揃う");
assert.deepEqual(middleLineAt([4,4,3]), [S.SEVEN,S.SEVEN,S.BAR], "REGの77BARが中段に揃う");
assert.deepEqual(middleLineAt([8,14,3]), [S.BAR,S.BAR,S.BAR], "各リール固有位置のBARが中段に揃う");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "coladoki.html"), "utf8");
const removedAssets = [
  "assets/symbols/sym_hourglass.png",
  "assets/symbols/sym_coin.webp",
  "assets/symbols/sym_grape.png",
  "assets/cabinet/edit_parts/piero.png",
  "assets/media/jag/big_confirm.mp3",
  "assets/media/jag/big_kakutei.wav",
  "assets/media/jag/reg_kakutei.wav",
  "assets/media/jag/special_symbol.wav",
  "assets/media/jag/premium_piero_symbol.wav"
];
removedAssets.forEach(asset=>{
  assert.equal(fs.existsSync(path.join(root, asset)), false, `${asset} は削除済み`);
  assert.equal(html.includes(asset), false, `${asset} をHTMLから参照しない`);
});
assert.doesNotMatch(html, /\bSMALL:\{name:/, "特殊役の出目定義を残さない");
assert.doesNotMatch(html, /\bGRAPE:\{name:/, "ブドウの出目定義を残さない");
assert.match(html, /id="roleCounterSuikaCount"/, "役カウンターはスイカを表示する");
assert.match(
  html,
  /roleCounterBigCount[\s\S]*roleCounterRegCount[\s\S]*roleCounterPremiumBigCount/,
  "全役カウンターはBIG、REG、ロングフリーズBIGの順に表示する"
);

console.log("coladoki reel strip tests passed");
