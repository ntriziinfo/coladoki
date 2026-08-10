(function(root, factory){
  const api = factory();
  if(typeof module === "object" && module.exports) module.exports = api;
  root.ColadokiMode = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function(){
  "use strict";

  const MODES = Object.freeze({
    normalA:{label:"通常モードA", ceiling:999},
    normalB:{label:"通常モードB", ceiling:999},
    return:{label:"引き戻しモード", ceiling:199},
    heaven:{label:"天国モード", ceiling:31},
    dokidoki:{label:"コラドキモード", ceiling:31},
    superDokidoki:{label:"超コラドキモード", ceiling:31},
    guarantee:{label:"保障モード", ceiling:31},
    chance:{label:"チャンスモード", ceiling:199}
  });
  const MODE_IDS = Object.freeze(Object.keys(MODES));
  const SPECIAL_MODES = Object.freeze(["heaven", "dokidoki", "superDokidoki", "guarantee"]);
  const RESET_MODE_WEIGHTS = Object.freeze([
    ["normalA",57.03],
    ["normalB",9.77],
    ["chance",33.20]
  ]);

  const row = (...entries)=>Object.freeze(entries.map(entry=>Object.freeze(entry)));
  const bySetting = (...rows)=>Object.freeze(rows.map(entries=>row(...entries)));
  const all = entries=>Object.freeze({all:row(...entries)});
  const settings = rows=>Object.freeze({settings:bySetting(...rows)});

  const TRANSITIONS = Object.freeze({
    normalA:Object.freeze({
      confirmed:all([["normalA",45.31],["normalB",25.00],["heaven",25.00],["dokidoki",4.69]]),
      middleCherry:all([["heaven",75.00],["dokidoki",24.22],["superDokidoki",0.78]]),
      suika:settings([
        [["normalA",28.13],["normalB",50.00],["heaven",20.31],["dokidoki",1.56]],
        [["normalA",20.31],["normalB",57.81],["heaven",20.31],["dokidoki",1.56]],
        [["normalA",26.56],["normalB",50.00],["heaven",21.88],["dokidoki",1.56]],
        [["normalA",18.75],["normalB",59.38],["heaven",20.31],["dokidoki",1.56]],
        [["normalA",25.00],["normalB",50.00],["heaven",23.44],["dokidoki",1.56]],
        [["normalA",17.19],["normalB",60.94],["heaven",20.31],["dokidoki",1.56]]
      ]),
      other:settings([
        [["normalA",64.06],["normalB",25.00],["heaven",10.16],["dokidoki",0.78]],
        [["normalA",51.56],["normalB",37.50],["heaven",10.16],["dokidoki",0.78]],
        [["normalA",63.28],["normalB",25.00],["heaven",10.94],["dokidoki",0.78]],
        [["normalA",50.78],["normalB",38.28],["heaven",10.16],["dokidoki",0.78]],
        [["normalA",62.50],["normalB",25.00],["heaven",11.72],["dokidoki",0.78]],
        [["normalA",50.00],["normalB",39.06],["heaven",10.16],["dokidoki",0.78]]
      ])
    }),
    normalB:Object.freeze({
      confirmed:all([["normalB",25.00],["heaven",50.00],["dokidoki",25.00]]),
      middleCherry:all([["heaven",50.00],["dokidoki",49.22],["superDokidoki",0.78]]),
      suika:settings([
        [["normalB",23.44],["heaven",59.38],["dokidoki",17.19]],
        [["normalB",19.53],["heaven",64.84],["dokidoki",15.63]],
        [["normalB",21.88],["heaven",59.38],["dokidoki",18.75]],
        [["normalB",17.97],["heaven",66.41],["dokidoki",15.63]],
        [["normalB",20.31],["heaven",59.38],["dokidoki",20.31]],
        [["normalB",16.41],["heaven",67.97],["dokidoki",15.63]]
      ]),
      other:settings([
        [["normalB",49.22],["heaven",42.19],["dokidoki",8.59]],
        [["normalB",39.06],["heaven",53.13],["dokidoki",7.81]],
        [["normalB",48.44],["heaven",42.19],["dokidoki",9.38]],
        [["normalB",38.28],["heaven",53.91],["dokidoki",7.81]],
        [["normalB",47.66],["heaven",42.19],["dokidoki",10.16]],
        [["normalB",37.50],["heaven",54.69],["dokidoki",7.81]]
      ])
    }),
    return:Object.freeze({
      confirmed:all([["normalB",50.00],["heaven",45.31],["dokidoki",4.69]]),
      middleCherry:all([["heaven",75.00],["dokidoki",24.22],["superDokidoki",0.78]]),
      suika:settings([
        [["normalA",25.00],["normalB",42.19],["heaven",31.25],["dokidoki",1.56]],
        [["normalA",25.00],["normalB",42.19],["heaven",31.25],["dokidoki",1.56]],
        [["normalA",25.00],["normalB",40.63],["heaven",32.81],["dokidoki",1.56]],
        [["normalA",23.44],["normalB",43.75],["heaven",31.25],["dokidoki",1.56]],
        [["normalA",25.00],["normalB",39.06],["heaven",34.38],["dokidoki",1.56]],
        [["normalA",21.88],["normalB",45.31],["heaven",31.25],["dokidoki",1.56]]
      ]),
      other:settings([
        [["normalA",50.00],["normalB",33.59],["heaven",15.63],["dokidoki",0.78]],
        [["normalA",33.59],["normalB",50.00],["heaven",15.63],["dokidoki",0.78]],
        [["normalA",50.00],["normalB",32.81],["heaven",16.41],["dokidoki",0.78]],
        [["normalA",32.81],["normalB",50.78],["heaven",15.63],["dokidoki",0.78]],
        [["normalA",50.00],["normalB",32.03],["heaven",17.19],["dokidoki",0.78]],
        [["normalA",32.03],["normalB",51.56],["heaven",15.63],["dokidoki",0.78]]
      ])
    }),
    heaven:Object.freeze({
      middleCherry:all([["dokidoki",100.00]]),
      confirmed:all([["heaven",93.75],["dokidoki",6.25]]),
      suika:all([["heaven",98.44],["dokidoki",1.56]]),
      cherry:all([["heaven",99.22],["dokidoki",0.78]]),
      other:Object.freeze({odd:row(["normalA",13.28],["normalB",3.91],["return",7.81],["heaven",74.22],["dokidoki",0.78]),even:row(["normalA",13.28],["normalB",3.91],["return",17.19],["heaven",64.84],["dokidoki",0.78])})
    }),
    guarantee:Object.freeze({
      confirmed:all([["guarantee",75.00],["heaven",22.66],["dokidoki",2.34]]),
      middleCherry:all([["heaven",75.00],["dokidoki",24.22],["superDokidoki",0.78]]),
      suika:all([["guarantee",91.41],["heaven",7.81],["dokidoki",0.78]]),
      cherry:all([["guarantee",95.70],["heaven",3.91],["dokidoki",0.39]]),
      other:all([["normalA",65.23],["normalB",10.16],["return",20.31],["heaven",3.91],["dokidoki",0.39]])
    }),
    dokidoki:Object.freeze({
      confirmed:all([["dokidoki",96.88],["superDokidoki",3.13]]),
      middleCherry:all([["superDokidoki",100.00]]),
      suika:all([["dokidoki",99.22],["superDokidoki",0.78]]),
      cherry:all([["dokidoki",99.61],["superDokidoki",0.39]]),
      other:all([["guarantee",17.97],["dokidoki",81.64],["superDokidoki",0.39]])
    }),
    superDokidoki:Object.freeze({
      confirmed:all([["superDokidoki",100.00]]),
      middleCherry:all([["superDokidoki",100.00]]),
      suika:all([["superDokidoki",100.00]]),
      cherry:all([["superDokidoki",100.00]]),
      other:all([["guarantee",9.38],["superDokidoki",90.63]])
    }),
    chance:Object.freeze({
      confirmed:all([["normalB",25.00],["heaven",65.63],["dokidoki",7.03],["superDokidoki",2.34]]),
      middleCherry:all([["heaven",50.00],["dokidoki",42.19],["superDokidoki",7.81]]),
      suika:all([["normalB",65.63],["return",31.25],["heaven",2.34],["dokidoki",0.78]]),
      other:all([["normalB",82.81],["return",15.63],["heaven",1.17],["dokidoki",0.39]])
    })
  });

  const NORMAL_BIG_ODDS = Object.freeze([394.1,377.0,362.4,347.6,334.7,322.6]);
  const NORMAL_REG_ODDS = Object.freeze([632.1,584.8,546.2,510.5,479.6,452.1]);
  const SUICA_HIT_RATES = Object.freeze({
    normal:Object.freeze([3.66,3.96,4.28,4.58,4.88,5.18]),
    return:Object.freeze([9.16,9.92,10.68,11.44,12.20,12.96]),
    special:Object.freeze([25.00,26.52,28.06,29.58,31.10,32.62])
  });
  const CHERRY_HIT_RATES = Object.freeze({
    normal:Object.freeze([0.92,1.07,1.22,1.37,1.53,1.68]),
    return:Object.freeze([2.29,2.67,3.05,3.43,3.81,4.20]),
    special:Object.freeze([6.25,6.63,7.01,7.39,7.78,8.16])
  });
  const RETURN_OTHER_RATES = Object.freeze({
    big:Object.freeze([0.48,0.48,0.50,0.52,0.54,0.54]),
    reg:Object.freeze([0.36,0.40,0.42,0.46,0.48,0.52])
  });
  const NORMAL_ROLE_PROBABILITIES = Object.freeze({
    confirmedRole:1/8192,
    confirmedCherry:1/10922.7,
    middleCherry:1/32768,
    suika:1/128,
    cherry:1/32.1,
    replay:1/7.3,
    bell:1/6.5
  });
  const LONG_FREEZE_RATES = Object.freeze({
    middleCherry:0.50,
    confirmed:0.05,
    suika:0.015,
    cherry:0.015,
    ceiling:0.0003,
    other:0.0006
  });
  const BONUS_STOCK_RATES = Object.freeze({
    CHERRY_ANY:0.012,
    SUICA:0.047,
    BAR3:1,
    CHERRY_DOUBLE:1,
    CHERRY_TRIPLE:1
  });
  const AT_PAYOUT_SPEC = Object.freeze({
    spinCost:3,
    bigGrossPerGame:6,
    regGrossLow:5,
    regGrossHigh:6,
    pushOrderMissPayout:2
  });
  const PUSH_ORDER_PERMUTATIONS = Object.freeze([
    Object.freeze([0, 1, 2]),
    Object.freeze([0, 2, 1]),
    Object.freeze([1, 0, 2]),
    Object.freeze([1, 2, 0]),
    Object.freeze([2, 0, 1]),
    Object.freeze([2, 1, 0])
  ]);

  function validMode(mode){ return MODE_IDS.includes(mode) ? mode : "normalA"; }
  function modeLabel(mode){ return MODES[validMode(mode)].label; }
  function weightedPick(entries, rng=Math.random){
    const valid = (entries || []).filter(entry=>entry && MODE_IDS.includes(entry[0]) && Number(entry[1]) > 0);
    const total = valid.reduce((sum,entry)=>sum + Number(entry[1]), 0);
    if(total <= 0) return "normalA";
    let roll = rng() * total;
    for(const entry of valid){
      roll -= Number(entry[1]);
      if(roll <= 0) return entry[0];
    }
    return valid[valid.length - 1][0];
  }
  function transitionEntries(mode, trigger="other", setting=1){
    const modeId = validMode(mode);
    const table = TRANSITIONS[modeId] || TRANSITIONS.normalA;
    const source = table[trigger] || table.other;
    if(source.all) return source.all;
    if(source.settings) return source.settings[Math.max(0, Math.min(5, Number(setting) - 1))] || source.settings[0];
    if(source.odd || source.even) return Number(setting) % 2 === 0 ? source.even : source.odd;
    return [[modeId,100]];
  }
  function pickNextMode(mode, trigger="other", setting=1, rng=Math.random){
    return weightedPick(transitionEntries(mode, trigger, setting), rng);
  }
  function pickResetMode(rng=Math.random){ return weightedPick(RESET_MODE_WEIGHTS, rng); }
  function pickCeiling(mode, rng=Math.random){
    const modeId = validMode(mode);
    if(modeId === "normalA" || modeId === "normalB") return 999;
    if(modeId === "return" || modeId === "chance"){
      const ticket = Math.floor(rng() * 256);
      return ticket < 88 ? 100 + Math.floor(ticket / 2) : 144 + Math.floor((ticket - 88) / 3);
    }
    return rng() < 0.125 ? 0 : 31;
  }
  function triggerForResult(result){
    if(result === "CHERRY_TRIPLE") return "middleCherry";
    if(result === "BAR3" || result === "CHERRY_DOUBLE") return "confirmed";
    if(result === "SUICA") return "suika";
    if(result === "CHERRY_ANY") return "cherry";
    return "other";
  }
  function modeRateBand(mode){
    const modeId = validMode(mode);
    if(SPECIAL_MODES.includes(modeId)) return "special";
    if(modeId === "return" || modeId === "chance") return "return";
    return "normal";
  }
  function calibratedNormalOtherRates(setting){
    const index = Math.max(0, Math.min(5, Number(setting) - 1));
    const odds = NORMAL_ROLE_PROBABILITIES;
    const guaranteed = odds.confirmedRole + odds.confirmedCherry + odds.middleCherry;
    const suikaRate = SUICA_HIT_RATES.normal[index] / 100;
    const cherryRate = CHERRY_HIT_RATES.normal[index] / 100;
    const rareBig = guaranteed + (odds.suika * suikaRate * 0.5) + (odds.cherry * cherryRate);
    const rareReg = odds.suika * suikaRate * 0.5;
    const otherShare = 1 - odds.confirmedRole - odds.confirmedCherry - odds.middleCherry - odds.suika - odds.cherry;
    return {
      big:Math.max(0, ((1 / NORMAL_BIG_ODDS[index]) - rareBig) / otherShare),
      reg:Math.max(0, ((1 / NORMAL_REG_ODDS[index]) - rareReg) / otherShare)
    };
  }
  function directBonusRates(mode, result, setting=1){
    const index = Math.max(0, Math.min(5, Number(setting) - 1));
    const trigger = triggerForResult(result);
    if(trigger === "middleCherry" || trigger === "confirmed") return {big:1,reg:0,trigger};
    const band = modeRateBand(mode);
    if(trigger === "suika"){
      const total = SUICA_HIT_RATES[band][index] / 100;
      return {big:total / 2,reg:total / 2,trigger};
    }
    if(trigger === "cherry") return {big:CHERRY_HIT_RATES[band][index] / 100,reg:0,trigger};
    if(band === "special") return {big:0.0854,reg:0.0366,trigger};
    if(band === "return") return {big:RETURN_OTHER_RATES.big[index] / 100,reg:RETURN_OTHER_RATES.reg[index] / 100,trigger};
    return {...calibratedNormalOtherRates(setting),trigger};
  }
  function longFreezeRate(trigger, ceiling=false){
    return LONG_FREEZE_RATES[ceiling ? "ceiling" : trigger] ?? LONG_FREEZE_RATES.other;
  }
  function pickBonusKind(setting=1, rng=Math.random){
    const index = Math.max(0, Math.min(5, Number(setting) - 1));
    const bigWeight = 1 / NORMAL_BIG_ODDS[index];
    const regWeight = 1 / NORMAL_REG_ODDS[index];
    return rng() < bigWeight / (bigWeight + regWeight) ? "BIG" : "MID";
  }
  function stockRate(result){ return BONUS_STOCK_RATES[result] || 0; }
  function bonusGames(kind){ return kind === "MID" ? 30 : 70; }
  function atGrossPayout(kind, rng=Math.random){
    if(kind === "MID") return rng() < 0.5 ? AT_PAYOUT_SPEC.regGrossLow : AT_PAYOUT_SPEC.regGrossHigh;
    return AT_PAYOUT_SPEC.bigGrossPerGame;
  }
  function expectedBonusNet(kind){
    if(kind === "MID"){
      const averageGross = (AT_PAYOUT_SPEC.regGrossLow + AT_PAYOUT_SPEC.regGrossHigh) / 2;
      return bonusGames(kind) * (averageGross - AT_PAYOUT_SPEC.spinCost);
    }
    return bonusGames(kind) * (AT_PAYOUT_SPEC.bigGrossPerGame - AT_PAYOUT_SPEC.spinCost);
  }
  function randomPushOrder(rng=Math.random){
    const roll = Math.max(0, Math.min(0.999999999999, Number(rng()) || 0));
    return [...PUSH_ORDER_PERMUTATIONS[Math.floor(roll * PUSH_ORDER_PERMUTATIONS.length)]];
  }
  function isPushOrderCorrect(required, actual){
    return Array.isArray(required)
      && Array.isArray(actual)
      && required.length === 3
      && actual.length === 3
      && required.every((reelIndex, step)=>reelIndex === actual[step]);
  }
  function isSpecial(mode){ return SPECIAL_MODES.includes(validMode(mode)); }
  function transitionRows(){
    const rows = [];
    for(const mode of MODE_IDS){
      for(const trigger of Object.keys(TRANSITIONS[mode])){
        for(let setting=1;setting<=6;setting++){
          const entries = transitionEntries(mode, trigger, setting);
          rows.push({mode,trigger,setting,total:entries.reduce((sum,entry)=>sum + Number(entry[1]),0),entries});
        }
      }
    }
    return rows;
  }

  return Object.freeze({
    MODES,
    MODE_IDS,
    SPECIAL_MODES,
    RESET_MODE_WEIGHTS,
    TRANSITIONS,
    NORMAL_ROLE_PROBABILITIES,
    LONG_FREEZE_RATES,
    BONUS_STOCK_RATES,
    AT_PAYOUT_SPEC,
    PUSH_ORDER_PERMUTATIONS,
    validMode,
    modeLabel,
    transitionEntries,
    transitionRows,
    pickNextMode,
    pickResetMode,
    pickCeiling,
    triggerForResult,
    directBonusRates,
    longFreezeRate,
    pickBonusKind,
    stockRate,
    bonusGames,
    atGrossPayout,
    expectedBonusNet,
    randomPushOrder,
    isPushOrderCorrect,
    isSpecial
  });
});
