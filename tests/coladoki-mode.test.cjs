"use strict";

const assert = require("node:assert/strict");
const mode = require("../coladoki-mode.js");

assert.equal(mode.MODE_IDS.length, 8, "8モードを定義する");
assert.equal(mode.RESET_MODE_WEIGHTS.reduce((sum, entry)=>sum + entry[1], 0), 100);
assert.equal(mode.bonusGames("BIG"), 70);
assert.equal(mode.bonusGames("MID"), 30);
assert.equal(mode.atGrossPayout("BIG", ()=>0), 6);
assert.equal(mode.atGrossPayout("MID", ()=>0), 5);
assert.equal(mode.atGrossPayout("MID", ()=>0.999), 6);
assert.equal(mode.expectedBonusNet("BIG"), 210);
assert.equal(mode.expectedBonusNet("MID"), 75);
assert.equal(70 * mode.atGrossPayout("BIG") - 70 * mode.AT_PAYOUT_SPEC.spinCost, 210);
assert.equal(30 * mode.atGrossPayout("MID", ()=>0) - 30 * mode.AT_PAYOUT_SPEC.spinCost, 60);
assert.equal(30 * mode.atGrossPayout("MID", ()=>1) - 30 * mode.AT_PAYOUT_SPEC.spinCost, 90);
assert.equal(mode.longFreezeRate("middleCherry"), 0.5);
assert.equal(mode.pickBonusKind(1, ()=>0), "BIG");
assert.equal(mode.pickBonusKind(1, ()=>0.999999), "MID");
assert.equal(mode.pickResetMode(()=>0), "normalA");
assert.equal(mode.pickResetMode(()=>0.5703), "normalA");
assert.equal(mode.pickResetMode(()=>0.57031), "normalB");
assert.equal(mode.pickResetMode(()=>0.66801), "chance");

for(const row of mode.transitionRows()){
  assert.ok(Math.abs(row.total - 100) <= 0.04, `${row.mode}/${row.trigger}/設定${row.setting}の合計=${row.total}`);
  assert.ok(row.entries.every(([next])=>mode.MODE_IDS.includes(next)), "移行先は定義済みモードに限る");
  assert.ok(row.entries.every(([next])=>next !== "chance"), "チャンスモードはループしない");
}

assert.equal(mode.pickCeiling("normalA", ()=>0), 999);
assert.equal(mode.pickCeiling("normalB", ()=>0.999), 999);
assert.equal(mode.pickCeiling("heaven", ()=>0.124999), 0);
assert.equal(mode.pickCeiling("heaven", ()=>0.125), 31);

const returnCounts = new Map();
for(let ticket=0; ticket<256; ticket++){
  const ceiling = mode.pickCeiling("return", ()=>(ticket + 0.5) / 256);
  returnCounts.set(ceiling, (returnCounts.get(ceiling) || 0) + 1);
}
assert.equal(returnCounts.size, 100);
for(let game=100; game<=143; game++) assert.equal(returnCounts.get(game), 2, `${game}Gは2/256`);
for(let game=144; game<=199; game++) assert.equal(returnCounts.get(game), 3, `${game}Gは3/256`);

assert.deepEqual(mode.transitionEntries("chance", "confirmed", 1), [
  ["normalB",25], ["heaven",65.63], ["dokidoki",7.03], ["superDokidoki",2.34]
]);
assert.deepEqual(mode.transitionEntries("superDokidoki", "other", 6), [
  ["guarantee",9.38], ["superDokidoki",90.63]
]);
assert.deepEqual(mode.transitionEntries("dokidoki", "other", 1), [
  ["guarantee",17.97], ["dokidoki",81.64], ["superDokidoki",0.39]
]);

for(const setting of [1,2,3,4,5,6]){
  for(const modeId of mode.MODE_IDS){
    for(const result of ["MISS","BELL","REPLAY","CHERRY_ANY","SUICA","CHERRY_DOUBLE","CHERRY_TRIPLE","BAR3"]){
      const rates = mode.directBonusRates(modeId, result, setting);
      assert.ok(rates.big >= 0 && rates.reg >= 0 && rates.big + rates.reg <= 1.000001);
    }
  }
}

console.log("coladoki-mode: all assertions passed");
