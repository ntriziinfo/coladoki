"use strict";

const assert = require("node:assert/strict");
const mode = require("../coladoki-mode.js");

assert.equal(mode.MODE_IDS.length, 8, "8モードを定義する");
assert.equal(mode.RESET_MODE_WEIGHTS.reduce((sum, entry)=>sum + entry[1], 0), 100);
assert.equal(mode.bonusGames("BIG"), 70);
assert.equal(mode.bonusGames("MID"), 30);
assert.equal(mode.atGrossPayout("BIG", ()=>0), 6);
assert.equal(mode.atGrossPayout("MID", ()=>0), 6);
assert.equal(mode.atGrossPayout("MID", ()=>0.999), 6);
assert.equal(mode.expectedBonusNet("BIG"), 210);
assert.equal(mode.expectedBonusNet("MID"), 90);
assert.equal(70 * mode.atGrossPayout("BIG") - 70 * mode.AT_PAYOUT_SPEC.spinCost, 210);
assert.equal(30 * mode.atGrossPayout("MID", ()=>0) - 30 * mode.AT_PAYOUT_SPEC.spinCost, 90);
assert.equal(30 * mode.atGrossPayout("MID", ()=>1) - 30 * mode.AT_PAYOUT_SPEC.spinCost, 90);
assert.equal(mode.AT_PAYOUT_SPEC.pushOrderMissPayout, 2);
assert.equal(mode.atRolePayout("MISS"), 0);
assert.equal(mode.atRolePayout("BELL"), 10);
assert.equal(mode.atRolePayout("REPLAY"), 3);
assert.equal(mode.normalRolePayout("BELL"), 7);
assert.equal(mode.normalRolePayout("BELL_MISS"), 1);
assert.equal(mode.normalRolePayout("SUICA"), 4);
assert.deepEqual(mode.TARGET_MACHINE_RATES, [97.0,99.7,101.7,103.9,106.2,107.9]);
assert.equal(mode.NORMAL_PUSH_ORDER_MISS_RATES.length, 6);
assert.ok(Math.abs(mode.normalRoleProbabilities(1).pushOrderMiss - 0.245659188280) < 1e-12, "設定1の機械割補正率");
assert.ok(Math.abs(mode.normalRoleProbabilities(6).pushOrderMiss - 0.273123857447) < 1e-12, "設定6の機械割補正率");
assert.ok(Math.abs(mode.expectedNormalGamesPer50(1) - 24.318) < 0.001, "設定1の補正後通常ベース");
assert.ok(Math.abs(mode.expectedNormalGamesPer50(6) - 24.803) < 0.001, "設定6の補正後通常ベース");
assert.ok(Math.abs(mode.normalRoleProbabilities(1).replay - (1 / 5.05)) < 1e-12, "通常リプレイは1/5.05");
assert.ok(Math.abs(mode.normalRoleProbabilities(1).bell - (1 / 168.04)) < 1e-12, "設定1の共通ベルは1/168.04");
assert.ok(Math.abs(mode.normalRoleProbabilities(6).bell - (1 / 128.50)) < 1e-12, "設定6の共通ベルは1/128.50");
assert.ok(Math.abs(mode.directBonusRates("normalA", "MISS", 1).big + mode.directBonusRates("normalA", "MISS", 1).reg - 0.0034) < 1e-12, "通常A/Bのその他当選率は設定1で0.34%");
assert.ok(Math.abs(mode.directBonusRates("chance", "MISS", 1).big + mode.directBonusRates("chance", "MISS", 1).reg - 0.01) < 1e-12, "チャンスのその他当選率は設定1で1.0%");
assert.ok(Math.abs(mode.directBonusRates("heaven", "MISS", 1).big + mode.directBonusRates("heaven", "MISS", 1).reg - 0.122) < 1e-12, "天国以上のその他当選率は12.2%");
for(const [kind, expectedMiss, expectedNet] of [["BIG",0.05,210],["MID",0.10,90]]){
  const rates = mode.bonusRoleRates(kind);
  const totalRate = Object.values(rates).reduce((sum,rate)=>sum + rate, 0);
  const grossPerGame = Object.entries(rates).reduce((sum,[result,rate])=>sum + mode.atRolePayout(result) * rate, 0);
  assert.ok(Math.abs(totalRate - 1) < 1e-12, `${kind} bonus role rates total 1`);
  assert.ok(Math.abs(rates.MISS - expectedMiss) < 1e-12, `${kind} miss rate`);
  assert.ok(Math.abs(mode.bonusGames(kind) * (grossPerGame - mode.AT_PAYOUT_SPEC.spinCost) - expectedNet) < 1e-9, `${kind} expected net payout`);
}
assert.notEqual(mode.drawBonusResult("BIG", ()=>0.5), "MISS");
assert.equal(mode.drawBonusResult("BIG", ()=>0.999999), "MISS");
assert.equal(mode.drawBonusResult("MID", ()=>0.999999), "MISS");
assert.equal(mode.PUSH_ORDER_PERMUTATIONS.length, 6);
assert.equal(new Set(mode.PUSH_ORDER_PERMUTATIONS.map(order=>order.join(""))).size, 6);
assert.deepEqual(mode.randomPushOrder(()=>0), [0, 1, 2]);
assert.deepEqual(mode.randomPushOrder(()=>0.999999), [2, 1, 0]);
assert.equal(mode.isPushOrderCorrect([2, 0, 1], [2, 0, 1]), true);
assert.equal(mode.isPushOrderCorrect([2, 0, 1], [0, 2, 1]), false);
assert.equal(mode.longFreezeRate("middleCherry"), 0.5);
assert.equal(mode.longFreezeRate("cherry"), 0.016);
assert.equal(mode.longFreezeRate("other"), 0.001);
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
