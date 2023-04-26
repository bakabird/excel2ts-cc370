System.register("chunks:///_virtual/ABuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "906a2t/UK1KBb6wWzL4Utn/", "ABuffCom", undefined);

      var ABuffCom = exports('ABuffCom', /*#__PURE__*/function () {
        function ABuffCom() {
          this._isValid = void 0;
          this._es2order = void 0;
          this.buff = void 0;
        }

        var _proto = ABuffCom.prototype;

        _proto.init = function init(buff) {
          this._isValid = true;
          this._es2order = {};
          this.buff = buff;
          this.OnInit();
        };

        _proto.destory = function destory() {
          this.OnDestory();
          this._es2order = null;
          this.buff = null;
          this._isValid = false;
        };

        _proto.effect = function effect(stage, arg) {
          if (!this._isValid) return;
          this.OnEffect(stage, arg);
        };

        _proto.modSelfNum = function modSelfNum(num, option) {
          if (!this._isValid) return;
          this.owner.buff.mod(this.buff.id, num, option);
        };

        _proto.setOrder = function setOrder(effectStage, order) {
          if (!this._isValid) return;
          this._es2order[effectStage] = order;
        };

        _proto.hurtAllEnemys = function hurtAllEnemys(dmg) {
          var _this = this;

          if (!this._isValid) return;
          this.owner.info.getLiveEnemys().forEach(function (e) {
            e.cutHp(dmg, _this.owner, "ABuffCom.hurtAll," + _this.buff.id);
          });
        };

        _proto.listenTo = function listenTo(id) {
          this.owner.buff.listenTo(id);
        };

        _proto.unlistenTo = function unlistenTo(id) {
          this.owner.buff.unlistenTo(id);
        };

        _createClass(ABuffCom, [{
          key: "owner",
          get: function get() {
            return this.buff.owner;
          }
        }, {
          key: "actNum",
          get: function get() {
            return this.owner.actNum;
          }
        }, {
          key: "isValid",
          get: function get() {
            return this._isValid;
          }
        }, {
          key: "es2order",
          get: function get() {
            return this._es2order;
          }
        }]);

        return ABuffCom;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ActBase.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ReslockKit.ts', './tc.ts', './FightPlay.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, ReslockKit, ResName, tc, FightPlay;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ReslockKit = module.default;
      ResName = module.ResName;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      FightPlay = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b9c6b6EjOFJbrDS9Cb09833", "ActBase", undefined);

      var ActBase = exports('ActBase', /*#__PURE__*/function () {
        function ActBase(actor) {
          this.actor = void 0;
          this.actor = actor;
        }

        var _proto = ActBase.prototype;

        _proto.Dispose = function Dispose() {
          this.OnDispose();
          this.actor = null;
        };

        _proto["do"] = function _do(onOver) {
          this.OnDo(onOver);
        };

        _proto.getProp = function getProp(key) {
          return this.actor.info.npcInfo.getProps(key)[0];
        };

        _proto.getProps = function getProps(key) {
          return this.actor.info.npcInfo.getProps(key);
        };

        _proto.getVal = function getVal(key) {
          return this.actor.info.npcInfo.getVal(key);
        };

        _proto.getIntVal = function getIntVal(key) {
          return parseInt(this.getVal(key));
        };

        _proto.calcDmg = function calcDmg(dmg) {
          return tc.p(FightPlay).calcHitDmg(dmg, this.actor, this.target);
        };

        _proto.calcShield2Self = function calcShield2Self(mod) {
          return tc.p(FightPlay).calcShieldMod(mod, this.actor);
        };

        _proto.calcShield2Target = function calcShield2Target(mod) {
          return tc.p(FightPlay).calcShieldMod(mod, this.target);
        };

        _proto.attack_act_byatk_over = function attack_act_byatk_over(act, over) {
          var _this = this;

          this.actor.info.fighterWrap.playAttack(function () {
            act();

            if (_this.target.isDead && !_this.target.isTrueDead) {
              // 复活中
              tc.k(ReslockKit).getLock(ResName.RoundAdvance, function () {
                over();
                tc.k(ReslockKit).retLock(ResName.RoundAdvance);
              });
            } else {
              _this.target.info.fighterWrap.playByatk(function () {
                over();
              });
            }
          });
        };

        _proto.skill_act_over = function skill_act_over(act, over) {
          this.actor.info.fighterWrap.playSkill(function () {
            act();
            over();
          });
        };

        _proto.skill_act_byskill_over = function skill_act_byskill_over(act, over) {
          var _this2 = this;

          this.actor.info.fighterWrap.playSkill(function () {
            act();

            _this2.target.info.fighterWrap.playByskill(function () {
              over();
            });
          });
        };
        /**
         * <to-override>
         * 销毁时调用
         */


        _proto.OnDispose = function OnDispose() {};

        _createClass(ActBase, [{
          key: "intension",
          get: function get() {
            return this.OnGetIntension();
          }
        }, {
          key: "target",
          get: function get() {
            return this.actor.info.getLiveEnemys()[0];
          }
        }, {
          key: "teammates",
          get: function get() {
            return this.actor.info.getTeammates();
          }
        }, {
          key: "liveTeammates",
          get: function get() {
            return this.actor.info.getLiveTeammates();
          }
        }]);

        return ActBase;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ActHelper.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './FightPlay.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, tc, FightPlay;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      FightPlay = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d279bWRXftAAJtSSL7yZ6NK", "ActHelper", undefined);

      var ActHelper = exports('default', /*#__PURE__*/function () {
        function ActHelper(_actor) {
          this._actor = _actor;
        }

        var _proto = ActHelper.prototype;

        _proto.Dispose = function Dispose() {
          this._actor = null;
        };

        _proto.getVal = function getVal(key) {
          return this._actor.info.npcInfo.getVal(key);
        };

        _proto.getIntVal = function getIntVal(key) {
          return parseInt(this.getVal(key));
        };

        _proto.calcDmg = function calcDmg(dmg) {
          return tc.p(FightPlay).calcHitDmg(dmg, this._actor, this.target);
        };

        _proto.attack_act_shake_over = function attack_act_shake_over(act, over) {
          var _this = this;

          this._actor.info.fighterWrap.playAttack(function () {
            act();

            _this.target.info.fighterWrap.playByatk(function () {
              over();
            });
          });
        };

        _proto.attack_act_over = function attack_act_over(act, over) {
          this._actor.info.fighterWrap.playAttack(function () {
            act();
            over();
          });
        };

        _createClass(ActHelper, [{
          key: "target",
          get: function get() {
            return this._actor.info.getLiveEnemys()[0];
          }
        }]);

        return ActHelper;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AddbuffAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './NpcPropFunc.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, NpcPropFunc, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "613f0FHTeBAPpTuCgPoV7tG", "AddbuffAct", undefined);

      var AddbuffAct = exports('AddbuffAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(AddbuffAct, _ActBase);

        function AddbuffAct(actor, suffix) {
          var _this;

          if (suffix === void 0) {
            suffix = "";
          }

          _this = _ActBase.call(this, actor) || this;
          _this._customFunc = void 0;
          _this._customFunc = NpcPropFunc.addbuff + suffix;
          return _this;
        }

        var _proto = AddbuffAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          var _this$_title;

          return {
            icon: IntensionCfg.res.tactics,
            iconTip: '',
            title: (_this$_title = this._title) != null ? _this$_title : "增强",
            content: "\u8FD9\u540D\u654C\u4EBA\u5C06\u8981\u589E\u5F3A\u81EA\u8EAB\u3002"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this2 = this;

          var buffid = parseInt(this.getProp(this._customFunc).args[0]);
          var num = parseInt(this.getProp(this._customFunc).args[1]);
          this.skill_act_over(function () {
            _this2.actor.buff.smartMod(buffid, num, {
              log: "AddbuffAct " + _this2._customFunc
            });
          }, onOver);
        };

        _createClass(AddbuffAct, [{
          key: "_title",
          get: function get() {
            return this.getProp(this._customFunc).args[2];
          }
        }]);

        return AddbuffAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AddTeamBuffAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './NpcPropFunc.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, NpcPropFunc, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3b442imxpBN5p1RmA9esk8f", "AddTeamBuffAct", undefined);

      var AddTeamBuffAct = exports('AddTeamBuffAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(AddTeamBuffAct, _ActBase);

        function AddTeamBuffAct(actor, suffix) {
          var _this;

          if (suffix === void 0) {
            suffix = "";
          }

          _this = _ActBase.call(this, actor) || this;
          _this._customFunc = void 0;
          _this._customFunc = NpcPropFunc.addteambuff + suffix;
          return _this;
        }

        var _proto = AddTeamBuffAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          var _this$_title;

          return {
            icon: IntensionCfg.res.tactics,
            iconTip: '',
            title: (_this$_title = this._title) != null ? _this$_title : "群体增强",
            content: "\u8FD9\u540D\u654C\u4EBA\u5C06\u8981\u589E\u5F3A\u5168\u4F53\u961F\u53CB\uFF08\u5305\u62EC\u81EA\u5DF1\uFF01\uFF09\u3002"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this2 = this;

          this.skill_act_over(function () {
            var buffid = parseInt(_this2.getProp(_this2._customFunc).args[0]);
            var num = parseInt(_this2.getProp(_this2._customFunc).args[1]);

            _this2.liveTeammates.forEach(function (npc) {
              npc.buff.smartMod(buffid, num, {
                log: "AddTeamBuffAct " + _this2._customFunc
              });
            });
          }, onOver);
        };

        _createClass(AddTeamBuffAct, [{
          key: "_title",
          get: function get() {
            return this.getProp(this._customFunc).args[2];
          }
        }]);

        return AddTeamBuffAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AdPlay.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs', './LoadingDlg.ts', './TipDlg.ts', './TimeSys.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PlayBase, LoadingDlg, TipDlg, TimeSys;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlayBase = module.PlayBase;
    }, function (module) {
      LoadingDlg = module.default;
    }, function (module) {
      TipDlg = module.default;
    }, function (module) {
      TimeSys = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d30d8g0oT1NWIx6lOSKZF0z", "AdPlay", undefined);

      var AdPlay = exports('default', /*#__PURE__*/function (_PlayBase) {
        _inheritsLoose(AdPlay, _PlayBase);

        function AdPlay() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _PlayBase.call.apply(_PlayBase, [this].concat(args)) || this;
          _this.playName = "AdPlay";
          return _this;
        }

        var _proto = AdPlay.prototype;

        _proto.OnInit = function OnInit(complete) {
          complete();
        };

        _proto.OnLateInit = function OnLateInit(complete) {
          complete();
        };

        _proto.OnDispose = function OnDispose() {};

        _proto.playAd = function playAd(option) {
          TipDlg.pop("假装有个广告");
          LoadingDlg.show();
          this.sys(TimeSys).delay(0.75, function () {
            LoadingDlg.hide();
            option.onAdRwd();
          });
        };

        _proto._defaultNotSupport = function _defaultNotSupport() {
          TipDlg.pop("暂未支持广告");
        };

        return AdPlay;
      }(PlayBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AExploreNodeHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './PlayerPlay.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, tc, PlayerPlay;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1d021y1MYJKN4JZZ4tFxjMK", "AExploreNodeHandler", undefined);

      var AExploreNodeHandler = exports('AExploreNodeHandler', /*#__PURE__*/function () {
        function AExploreNodeHandler(noedData) {
          this._owner = void 0;
          this._owner = noedData;
        }

        _createClass(AExploreNodeHandler, [{
          key: "player",
          get: function get() {
            return tc.p(PlayerPlay).player;
          }
        }, {
          key: "info",
          get: function get() {
            return this._owner.info;
          }
        }]);

        return AExploreNodeHandler;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AFightCardCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Util.ts', './tc.ts', './FightPlay.ts', './CardPlay.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, pick, tc, FightPlay, CardPlay;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      pick = module.pick;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      FightPlay = module.default;
    }, function (module) {
      CardPlay = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "26045tcH9pN+IU4uE0jAWvc", "AFightCardCom", undefined);
      /**
       * 战斗卡牌组件基类
       */


      var AFightCardCom = exports('AFightCardCom', /*#__PURE__*/function () {
        function AFightCardCom() {
          this._isEnable = void 0;
          this.fightcard = void 0;
          this.caster = void 0;
          this.OnDispose = void 0;
        }

        var _proto = AFightCardCom.prototype;

        _proto.init = function init(fc, caster) {
          this._isEnable = true;
          this.fightcard = fc;
          this.caster = caster;
          this.OnInit();
        };

        _proto.cast = function cast() {
          if (this.isEnable) {
            this.OnCast();
          }
        };

        _proto.onMsg = function onMsg(msg) {
          if (this.isEnable) {
            this.OnMsg(msg);
          }
        };

        _proto.calcShield2Self = function calcShield2Self(mod) {
          return tc.p(FightPlay).calcShieldMod(mod, this.caster);
        };

        _proto.Dispose = function Dispose() {
          var _this$OnDispose;

          (_this$OnDispose = this.OnDispose) == null ? void 0 : _this$OnDispose.call(this);
          this.caster = null;
          this.fightcard = null;
          this._isEnable = false;
        };

        _proto.OnMsg = function OnMsg(msg) {// do nothing
        };

        _createClass(AFightCardCom, [{
          key: "isEnable",
          get: function get() {
            return this._isEnable;
          },
          set: function set(v) {
            this._isEnable = v;
          }
        }, {
          key: "me",
          get: function get() {
            return this.fightcard.caster;
          }
        }, {
          key: "enemys",
          get: function get() {
            return this.fightcard.caster.info.getEnemys();
          }
        }, {
          key: "liveEnemys",
          get: function get() {
            return this.fightcard.caster.info.getLiveEnemys();
          }
        }, {
          key: "choose",
          get: function get() {
            return tc.p(CardPlay).choosingTarget;
          }
        }, {
          key: "randomLiveEnemy",
          get: function get() {
            return pick(this.fightcard.caster.info.getLiveEnemys());
          }
        }]);

        return AFightCardCom;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AFightCom.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('FightMsg', void 0);

      cclegacy._RF.push({}, "93c78LZkMJDRLGCe6IBRJLP", "AFightCom", undefined);

      var FightMsg;

      (function (FightMsg) {
        FightMsg[FightMsg["NEW_FIGHTER_ENTER"] = 0] = "NEW_FIGHTER_ENTER";
      })(FightMsg || (FightMsg = exports('FightMsg', {})));

      var AFightCom = exports('AFightCom', /*#__PURE__*/function () {
        function AFightCom() {
          this.fight = void 0;
        }

        var _proto = AFightCom.prototype;

        _proto.init = function init(fight) {
          this.fight = fight;
          this.OnInit();
        };

        _proto.lateinit = function lateinit() {
          this.OnLateInit();
        };

        _proto.destory = function destory() {
          this.OnDestory();
        };

        _proto.onMsg = function onMsg(msg, arg) {
          this.OnMsg(msg, arg);
        };
        /**
         * <to-override>
         */


        _proto.OnLateInit = function OnLateInit() {};
        /**
         * <to-override>
         * @param msg 
         */


        _proto.OnMsg = function OnMsg(msg, arg) {};

        return AFightCom;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AlertDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DlgBase.ts', './DlgKit.ts', './UIDocker.ts', './tc.ts', './BrownButtonText.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, DlgBase, DlgKit, DlgLayer, UIDocker, tc, BrownButtonText;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgKit = module.DlgKit;
      DlgLayer = module.DlgLayer;
    }, function (module) {
      UIDocker = module.UIDocker;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      BrownButtonText = module.BrownButtonText;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3adc4dcs4NMzZY8xGcVoS+z", "AlertDlg", undefined);

      var AlertDlg = exports('default', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(AlertDlg, _DlgBase);

        function AlertDlg() {
          return _DlgBase.apply(this, arguments) || this;
        }

        AlertDlg.pop = function pop(option) {
          var _yesText, _yesClose, _noText, _noClose;

          var tip = option.tip,
              yesText = option.yesText,
              onYes = option.onYes,
              yesClose = option.yesClose,
              noText = option.noText,
              onNo = option.onNo,
              noClose = option.noClose;
          (_yesText = yesText) != null ? _yesText : yesText = BrownButtonText.queding;
          (_yesClose = yesClose) != null ? _yesClose : yesClose = true;
          (_noText = noText) != null ? _noText : noText = BrownButtonText.quxiao;
          (_noClose = noClose) != null ? _noClose : noClose = true;
          tc.k(DlgKit).fetchDlg(AlertDlg).setData(tip, yesText, onYes, yesClose, noText, onNo, noClose);
        };

        var _proto = AlertDlg.prototype;

        _proto.OnInit = function OnInit() {
          this.dock(UIDocker.Dock.Bubble);
        };

        _proto.OnBgClickClose = function OnBgClickClose() {
          return false;
        };

        _proto.setData = function setData(tip, yesText, onYes, yesClose, noText, onNo, noClose) {
          var _this = this;

          this.getTxt("tip").text = tip;
          this.getBtn("yes").icon = yesText;
          this.getBtn("yes").onClick(function () {
            onYes == null ? void 0 : onYes();

            if (yesClose) {
              _this.close();
            }
          });
          this.getBtn("no").icon = noText;
          this.getBtn("no").onClick(function () {
            onNo == null ? void 0 : onNo();

            if (noClose) {
              _this.close();
            }
          });
        };

        _createClass(AlertDlg, [{
          key: "dlgRes",
          get: function get() {
            return "AlertDlg";
          }
        }, {
          key: "dlgLayer",
          get: function get() {
            return DlgLayer.Topest;
          }
        }]);

        return AlertDlg;
      }(DlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AnfuAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './BuffId.ts', './CardId.ts', './NpcPropFunc.ts', './PlayerFightCardCom.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, BuffId, CardId, NpcPropFunc, PlayerFightCardCom, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      CardId = module.CardId;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "45c09hHbH9O+araB0uc/LMx", "AnfuAct", undefined);

      var AnfuAct = exports('AnfuAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(AnfuAct, _ActBase);

        function AnfuAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = AnfuAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.tactics,
            iconTip: '',
            title: "安抚",
            content: "\u8FD9\u540D\u654C\u4EBA\u5C06\u8981\u5B9E\u884C\u4E00\u4E2A\u8BE1\u8BA1\u3002"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.skill_act_byskill_over(function () {
            var num = _this.huihen;

            _this.target.buff.mod(BuffId.power, -_this.powercut);

            while (num--) {
              _this.target.c.get(PlayerFightCardCom).addCard2Draw(CardId.Huihen);
            }
          }, onOver);
        };

        _createClass(AnfuAct, [{
          key: "powercut",
          get: function get() {
            return parseInt(this.getProp(NpcPropFunc.anfu).args[0]);
          }
        }, {
          key: "huihen",
          get: function get() {
            return parseInt(this.getProp(NpcPropFunc.anfu).args[1]);
          }
        }]);

        return AnfuAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ANpcCom.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1be26cH9dJL4asoWhE8ovLV", "ANpcCom", undefined);

      var ANpcCom = exports('default', /*#__PURE__*/function () {
        function ANpcCom() {
          this.npc = void 0;
          this.OnLateInit = void 0;
          this.OnDead = void 0;
          this.OnEnterFight = void 0;
          this.OnLeaveFight = void 0;
          this.OnLateLeaveFight = void 0;
        }

        var _proto = ANpcCom.prototype;

        _proto.init = function init(npc) {
          this.npc = npc;
          this.OnInit();
        };

        _proto.lateinit = function lateinit() {
          var _this$OnLateInit;

          (_this$OnLateInit = this.OnLateInit) == null ? void 0 : _this$OnLateInit.call(this);
        };

        _proto.onEnterFight = function onEnterFight(fight) {
          var _this$OnEnterFight;

          (_this$OnEnterFight = this.OnEnterFight) == null ? void 0 : _this$OnEnterFight.call(this, fight);
        };

        _proto.onLeaveFight = function onLeaveFight(fight) {
          var _this$OnLeaveFight;

          (_this$OnLeaveFight = this.OnLeaveFight) == null ? void 0 : _this$OnLeaveFight.call(this, fight);
        };

        _proto.onLateLeaveFight = function onLateLeaveFight(fight) {
          var _this$OnLateLeaveFigh;

          (_this$OnLateLeaveFigh = this.OnLateLeaveFight) == null ? void 0 : _this$OnLateLeaveFigh.call(this, fight);
        };

        _proto.ondead = function ondead() {
          var _this$OnDead;

          (_this$OnDead = this.OnDead) == null ? void 0 : _this$OnDead.call(this);
        };

        _proto.destory = function destory() {
          this.OnDestory();
        };

        return ANpcCom;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/APlayerCom.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "12847/zozxJ5q9xwsK4xznH", "APlayerCom", undefined);
      /**
       * 玩家组件基类
       */


      var APlayerCom = exports('APlayerCom', /*#__PURE__*/function () {
        function APlayerCom() {}

        var _proto = APlayerCom.prototype;

        _proto.init = function init() {
          this.OnInit();
        };

        _proto.destory = function destory() {
          this.OnDestory();
        };

        return APlayerCom;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ATreasureBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TopbarDlg.ts', './DlgKit.ts', './tc.ts', './PlayerTreasureCom.ts', './PlayerPlay.ts', './ABuffCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, TopbarDlg, DlgKit, tc, PlayerTreasureCom, PlayerPlay, ABuffCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TopbarDlg = module.default;
    }, function (module) {
      DlgKit = module.DlgKit;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      PlayerTreasureCom = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d00b0mq2vJFxYvvSqXVJT5r", "ATreasureBuffCom", undefined);

      var ATreasureBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(ATreasureBuffCom, _ABuffCom);

        function ATreasureBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = ATreasureBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.OnOnInit();
        };

        _proto.getTVal = function getTVal(key) {
          return this.tinfo.getVal(key);
        };

        _proto.getTIntVal = function getTIntVal(key) {
          return this.tinfo.getIntVal(key);
        };

        _proto.popWrap = function popWrap() {
          tc.k(DlgKit).fetchDlg(TopbarDlg).popTreasure(this.tid);
        };

        _proto.reviseNum = function reviseNum(num) {
          this.t.counter.revise(num, this.buff.info.name);
        };

        _createClass(ATreasureBuffCom, [{
          key: "t",
          get: function get() {
            return tc.p(PlayerPlay).player.c.get(PlayerTreasureCom).get(this.tid);
          }
        }, {
          key: "counterNum",
          get: function get() {
            return this.t.counter.counter;
          }
        }, {
          key: "tinfo",
          get: function get() {
            return this.t.info;
          }
        }]);

        return ATreasureBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ATreasureCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TreasureEffectOrder.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, TreasureEffectOrder;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TreasureEffectOrder = module.TreasureEffectOrder;
    }],
    execute: function () {
      cclegacy._RF.push({}, "00b4chhsgtFWp2QfVFE37b6", "ATreasureCom", undefined);

      var ATreasureCom = exports('default', /*#__PURE__*/function () {
        function ATreasureCom() {
          this._logHandle = void 0;
          this.treasure = void 0;
        }

        var _proto = ATreasureCom.prototype;

        _proto.reviseLog = function reviseLog(subkey, value) {
          this._logHandle.reviseLog(subkey, value);
        };

        _proto.clearLog = function clearLog(subkey) {
          this._logHandle.reviseLog(subkey, null);
        };

        _proto.getLog = function getLog(subkey) {
          return this._logHandle.getLog(subkey);
        };

        _proto.init = function init(treasure, logHandle) {
          this.treasure = treasure;
          this._logHandle = logHandle;
          this.OnInit();
        };

        _proto.effect = function effect(stage, arg) {
          this.OnEffect(stage, arg);
        };

        _proto.getEffectOrder = function getEffectOrder(stage) {
          return this.OnGetEffectOrder(stage);
        };

        _proto.Dispose = function Dispose() {
          this.OnDestory();
          this._logHandle = null;
          this.treasure = null;
        };
        /**
         * <to-override> 
         * 默认顺序为 base。
         * @param stage 生效阶段 
         * @returns 生效顺序
         */


        _proto.OnGetEffectOrder = function OnGetEffectOrder(stage) {
          return TreasureEffectOrder.base;
        };

        _createClass(ATreasureCom, [{
          key: "owner",
          get: function get() {
            return this.treasure.owner;
          }
        }]);

        return ATreasureCom;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AttackAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './NpcPropFunc.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, NpcPropFunc, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f6f95qrHGtKF4kawmkMINGX", "AttackAct", undefined);

      var AttackAct = exports('AttackAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(AttackAct, _ActBase);

        function AttackAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = AttackAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.attack,
            iconTip: '' + this.actualdmg,
            title: "攻势",
            content: "\u8FD9\u540D\u654C\u4EBA\u5C06\u8981\u653B\u51FB\u9020\u6210" + this.actualdmg + "\u70B9\u4F24\u5BB3"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.attack_act_byatk_over(function () {
            _this.target.getHit(_this.actualdmg, _this.actor, "AttackAct");
          }, onOver);
        };

        _createClass(AttackAct, [{
          key: "actualdmg",
          get: function get() {
            return this.calcDmg(parseInt(this.getProp(NpcPropFunc.attack).args[0]));
          }
        }]);

        return AttackAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BaseFightBuffAdder.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './ABuffCom.ts', './BuffNS.ts', './BuffPlay.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, tc, ABuffCom, BuffNS, BuffPlay;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }, function (module) {
      BuffPlay = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "69310JbqAJLcJY1X9rirfdM", "BaseFightBuffAdder", undefined); // 战场buff添加器-基础款
      // 参数
      //      zyBuffId: 要添加战场buffid


      var RoundStartFightBuffAdder = exports('RoundStartFightBuffAdder', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(RoundStartFightBuffAdder, _ABuffCom);

        function RoundStartFightBuffAdder() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ABuffCom.call.apply(_ABuffCom, [this].concat(args)) || this;
          _this.zyBuffId = void 0;
          return _this;
        }

        var _proto = RoundStartFightBuffAdder.prototype;

        _proto.OnInit = function OnInit() {
          // this._idArr = new Set<number>();
          this.zyBuffId = parseInt(tc.p(BuffPlay).propOf(this.buff.id).zyBuffId);
          this.OnSetOrder();
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          var f = this.owner.info.fight;

          if (stage == BuffNS.EffectStage.RoundStart) {
            if (this.owner.actNum == 0) {
              // this._idArr.add(
              f.buff.addBuff(this.zyBuffId, this.buff.num, this.owner, 'enemy'); // );
            }
          } // 战斗结束后对应buff会自动移除

        };

        _proto.OnSetOrder = function OnSetOrder() {
          this.setOrder(BuffNS.EffectStage.RoundStart, BuffNS.EffectOrder.base);
        };

        return RoundStartFightBuffAdder;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BeiShijianglBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts', './BuffPlay.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, tc, ABuffCom, BuffId, BuffNS, BuffPlay;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }, function (module) {
      BuffPlay = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b9a98yLSB5NAYI5xXu+H1Hf", "BeiShijianglBuffCom", undefined);

      var BeiShijianglBuffCom = exports('BeiShijianglBuffCom', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(BeiShijianglBuffCom, _ABuffCom);

        function BeiShijianglBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = BeiShijianglBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.HandCardIn, BuffNS.EffectOrder.last);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HandCardIn) {
            var actNum = this.actNum + 1;

            if (actNum % 2 == 0) {
              var cur = this.owner.buff.numOf(BuffId.enegy);
              var cost = Math.min(parseInt(tc.p(BuffPlay).propOf(this.buff.id).cost), cur);

              if (cost > 0) {
                this.owner.buff.mod(BuffId.enegy, -cost);
              }
            }
          }
        };

        return BeiShijianglBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BeiShufuBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "92bbcdAckBMZrL8aL3cZWQU", "BeiShufuBuffCom", undefined);

      var BeiShufuBuffCom = exports('BeiShufuBuffCom', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(BeiShufuBuffCom, _ABuffCom);

        function BeiShufuBuffCom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ABuffCom.call.apply(_ABuffCom, [this].concat(args)) || this;
          _this._counter = void 0;
          return _this;
        }

        var _proto = BeiShufuBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this._counter = 0;
          this.setOrder(BuffNS.EffectStage.RoundStart, BuffNS.EffectOrder.base);
          this.setOrder(BuffNS.EffectStage.AnyHandCardUsed, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.RoundStart) {
            this._counter = 0;
          } else if (stage == BuffNS.EffectStage.AnyHandCardUsed) {
            this._counter++;

            if (this._counter >= this.buff.num) {
              this.owner.buff.mod(BuffId.Wufadcsp, 1, {
                write: true
              });
            }
          }
        };

        return BeiShufuBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BgDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DlgBase.ts', './DlgKit.ts', './tc.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, DlgBase, DlgKit, DlgLayer, tc;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgKit = module.DlgKit;
      DlgLayer = module.DlgLayer;
    }, function (module) {
      tc = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f477c2KNj1IIKdW/Euf/YcC", "BgDlg", undefined);

      var Bg = exports('Bg', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(Bg, _DlgBase);

        function Bg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._ctrl = void 0;
          return _this;
        }

        var _proto = Bg.prototype;

        _proto.onScene = function onScene(bg) {
          this._ctrl.selectedPage = bg;
        };

        _proto.OnInit = function OnInit() {
          this._ctrl = this.getController("bg");
        };

        _proto.OnClose = function OnClose() {
          Bg._me = null;
        };

        _createClass(Bg, [{
          key: "dlgRes",
          get: function get() {
            return "BgDlg";
          }
        }, {
          key: "dlgLayer",
          get: function get() {
            return DlgLayer.Background;
          }
        }], [{
          key: "me",
          get: function get() {
            if (!this._me) {
              this._me = tc.k(DlgKit).fetchDlg(Bg);
            }

            return this._me;
          }
        }]);

        return Bg;
      }(DlgBase));
      Bg._me = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BianfuAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BuffId.ts', './AttackAct.ts', './JianxiaoAct.ts', './NpcAIBase.ts', './QifeiAct.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, BuffId, AttackAct, JianxiaoAct, NpcAIBase, QifeiAct;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      JianxiaoAct = module.JianxiaoAct;
    }, function (module) {
      NpcAIBase = module.default;
    }, function (module) {
      QifeiAct = module.QifeiAct;
    }],
    execute: function () {
      cclegacy._RF.push({}, "aa29eC0q15NraNogCIGMcqu", "BianfuAI", undefined);

      var BianfuAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(BianfuAI, _NpcAIBase);

        function BianfuAI() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _NpcAIBase.call.apply(_NpcAIBase, [this].concat(args)) || this;
          _this._count = -1;
          return _this;
        }

        var _proto = BianfuAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          if (!this.npc.buff.isMorethan(BuffId.Feixing, 0)) {
            this._count = -1;
            return new QifeiAct(this.npc);
          }

          this._count++;

          if (this._count == 0) {
            return new this.actArr[0](this.npc);
          } else {
            return new this.actArr[1](this.npc);
          }
        };

        _createClass(BianfuAI, [{
          key: "actArr",
          get: function get() {
            return [JianxiaoAct, AttackAct];
          }
        }]);

        return BianfuAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoneAnim.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui-ccc370.mjs', './tc.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, VertAlignType, AlignType, tc;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      VertAlignType = module.VertAlignType;
      AlignType = module.AlignType;
    }, function (module) {
      tc = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3edc2F5RLFHIbVM9Yfd4FEd", "BoneAnim", undefined);

      var BoneAnim = exports('BoneAnim', /*#__PURE__*/function () {
        function BoneAnim(lod3d, owner) {
          this._idleAnim = void 0;
          this._lod3d = void 0;
          this._owner = void 0;
          this._lod3d = lod3d;
          this._owner = owner;
        }

        var _proto = BoneAnim.prototype;

        _proto.config = function config(option) {
          var vAlign = !option.vAlign || option.vAlign == "m" ? VertAlignType.Middle : option.vAlign == "b" ? VertAlignType.Bottom : VertAlignType.Top;
          var align = !option.align || option.align == "c" ? AlignType.Center : option.align == "l" ? AlignType.Left : AlignType.Right;
          this._idleAnim = option.idleAnim;
          this._lod3d.verticalAlign = vAlign;
          this._lod3d.align = align;
          this._lod3d.url = tc.resUrl(option.model);
          this.playAnim(option.idleAnim, true);
        };

        _proto.playAnim = function playAnim(anim, loop, onComplete, thisArg, option) {
          var _option$autoIdle,
              _this = this;

          var autoIdle = (_option$autoIdle = option == null ? void 0 : option.autoIdle) != null ? _option$autoIdle : true;
          this._lod3d.loop = loop;
          this._lod3d.animationName = anim;

          if (!loop) {
            var track = this.skeleton.getCurrent(0);
            this.skeleton.setTrackCompleteListener(track, function () {
              console.log("playAnim Over complete " + autoIdle);

              if (!_this._owner.isClosed) {
                if (autoIdle) {
                  _this._lod3d.loop = true;
                  _this._lod3d.animationName = _this._idleAnim;
                }

                onComplete == null ? void 0 : onComplete.apply(thisArg);
              }

              _this.skeleton.setTrackCompleteListener(track, null);
            });
          }
        };

        _createClass(BoneAnim, [{
          key: "lod3d",
          get: function get() {
            return this._lod3d;
          }
        }, {
          key: "skeleton",
          get: function get() {
            return this._lod3d.content;
          }
        }]);

        return BoneAnim;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BookDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui-ccc370.mjs', './DlgBase.ts', './UIDocker.ts', './ListWrap.ts', './CardPlay.ts', './TreasurePlay.ts', './tc.ts', './CardListItemWrap.ts', './TreasureItemWrap.ts', './DlgKit.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, ListSelectionMode, DlgBase, UIDocker, ListWrap, CardPlay, TreasurePlay, tc, CardListItemWrap, TreasureItemWrap, DlgLayer;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ListSelectionMode = module.ListSelectionMode;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      UIDocker = module.UIDocker;
    }, function (module) {
      ListWrap = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      TreasurePlay = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardListItemWrap = module.default;
    }, function (module) {
      TreasureItemWrap = module.default;
    }, function (module) {
      DlgLayer = module.DlgLayer;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a89abxZHIFKkKxu1fe/h/Ym", "BookDlg", undefined);

      var BookDlg = exports('BookDlg', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(BookDlg, _DlgBase);

        function BookDlg() {
          return _DlgBase.apply(this, arguments) || this;
        }

        var _proto = BookDlg.prototype;

        _proto.OnInit = function OnInit() {
          var _this = this;

          this.dock(UIDocker.Dock.Bubble);
          this.getController('scene').setSelectedPage('book');
          this.getList('list').selectionMode = ListSelectionMode.None;

          this._setCards(tc.p(CardPlay).cardPool.slice());

          this._setTreasures(tc.p(TreasurePlay).exclusivePool.concat(tc.p(TreasurePlay).treasuerPool));

          this.addBtnEvt('back', function () {
            _this.close();
          });
        };

        _proto._setCards = function _setCards(cards) {
          var cplay = tc.p(CardPlay);
          var listWrap = this.wrap(ListWrap, "list");
          listWrap.initList(CardListItemWrap, cards.sort(function (a, b) {
            return cplay.rawInfoOf(a).order - cplay.rawInfoOf(b).order;
          }).map(function (id) {
            return {
              id: id
            };
          }));
        };

        _proto._setTreasures = function _setTreasures(treasures) {
          var tplay = tc.p(TreasurePlay);
          var listWrap = this.wrap(ListWrap, "tlist");
          listWrap.initList(TreasureItemWrap, treasures.sort(function (a, b) {
            return tplay.rawInfoOf(a).order - tplay.rawInfoOf(b).order;
          }).map(function (id) {
            return {
              id: id
            };
          }));
        };

        _proto.OnBgClickClose = function OnBgClickClose() {
          return true;
        };

        _createClass(BookDlg, [{
          key: "dlgRes",
          get: function get() {
            return "CardSetDlg";
          }
        }, {
          key: "dlgLayer",
          get: function get() {
            return DlgLayer.Front;
          }
        }]);

        return BookDlg;
      }(DlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BrownButtonText.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('BrownButtonText', void 0);

      cclegacy._RF.push({}, "edb064MRvdMAJK3fecZBR90", "BrownButtonText", undefined);

      var BrownButtonText;

      (function (BrownButtonText) {
        BrownButtonText["jixu"] = "ui://9fdeszvrq9ozes";
        BrownButtonText["queding"] = "ui://9fdeszvrq9ozex";
        BrownButtonText["quxiao"] = "ui://9fdeszvrq9ozew";
        BrownButtonText["fanqi"] = "ui://9fdeszvrq9ozet";
        BrownButtonText["yichu_kapai"] = "ui://9fdeszvrq9ozez";
        BrownButtonText["diuqi_kapai"] = "ui://9fdeszvrq9ozf1";
        BrownButtonText["guding_kapai"] = "ui://9fdeszvrq9ozf2";
      })(BrownButtonText || (BrownButtonText = exports('BrownButtonText', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Buff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ComModule.ts', './PoolModule.ts', './tc.ts', './BuffPlay.ts', './BuffNS.ts', './ShowOnStatuBuffCom.ts', './ClearOnNumZero.ts', './SignNumCom.ts', './Util.ts', './ShowNum.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, ComModule, PoolModule, tc, BuffPlay, BuffNS, ShowOnStatuBuffCom, ClearOnNumZero, SignNumCom, enumValues, ShowNum;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ComModule = module.ComModule;
    }, function (module) {
      PoolModule = module.PoolModule;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      BuffPlay = module.default;
    }, function (module) {
      BuffNS = module.BuffNS;
    }, function (module) {
      ShowOnStatuBuffCom = module.default;
    }, function (module) {
      ClearOnNumZero = module.default;
    }, function (module) {
      SignNumCom = module.default;
    }, function (module) {
      enumValues = module.enumValues;
    }, function (module) {
      ShowNum = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "16d52JaNqNCB5mUmDXVC5KS", "Buff", undefined);

      var Buff = exports('Buff', /*#__PURE__*/function () {
        Buff.alloc = function alloc(id, num, owner) {
          var b = this._pool.alloc();

          b.reset(id, num, owner);
          return b;
        };

        Buff.free = function free(buff) {
          buff.clean();

          this._pool.free(buff);
        };

        function Buff() {
          this._id = void 0;
          this._num = void 0;
          this._c = void 0;
          this._owner = void 0;
        }

        var _proto = Buff.prototype;

        _proto.modNum = function modNum(num, option) {
          var _option$write;

          var write = (_option$write = option == null ? void 0 : option.write) != null ? _option$write : false;

          if (write) {
            this._num = num;
          } else {
            if (this._c.get(SignNumCom)) {
              this._num += num;
            } else {
              if (num > 0) {
                this._num += num;
              } else {
                this._num = Math.max(0, this._num + num);
              }
            }
          }
        };

        _proto.reset = function reset(id, num, owner) {
          var _this = this;

          var buffComs = tc.p(BuffPlay).getBuffComs(id);
          this._id = id;
          this._num = num;
          this._owner = owner;
          this._c = new ComModule();
          if (buffComs) buffComs.forEach(function ($) {
            return _this._c.add($);
          });

          this._c.each(function (c) {
            return c.init(_this);
          });
        };

        _proto.clean = function clean() {
          this._c.each(function (c) {
            return c.destory();
          });
        };

        _proto.preEffect = function preEffect(stage, arg, beforebaseComs, baseComs, latebaseComs, lastComs) {
          this._c.each(function (c) {
            if (c.isValid) {
              switch (c.es2order[stage]) {
                case BuffNS.EffectOrder.first:
                  c.effect(stage, arg);
                  break;

                case BuffNS.EffectOrder.beforebase:
                  beforebaseComs.push(c);
                  break;

                case BuffNS.EffectOrder.base:
                  baseComs.push(c);
                  break;

                case BuffNS.EffectOrder.latebase:
                  latebaseComs.push(c);
                  break;

                case BuffNS.EffectOrder.last:
                  lastComs.push(c);
                  break;
              }
            }
          });
        }
        /**请仅在单独激活该buff 时调用 */
        ;

        _proto.singleEffect = function singleEffect(stage, arg) {
          var _this2 = this;

          enumValues(BuffNS.EffectOrder, 'number').forEach(function (order) {
            // console.log(this.info.name, this.info.id, this.num, stage, order, arg);
            _this2._c.each(function (e) {
              if (e.es2order[stage] == order) {
                e.effect(stage, arg);
              }
            });
          });
        };

        _proto.report = function report() {
          console.log(this.owner.id, this.info.name, this.info.id, this.num);
        };

        _proto.hasCom = function hasCom(com) {
          return !!this._c.get(com);
        };

        _createClass(Buff, [{
          key: "num",
          get: function get() {
            return this._num;
          }
        }, {
          key: "id",
          get: function get() {
            return this._id;
          }
        }, {
          key: "info",
          get: function get() {
            return tc.p(BuffPlay).infoOf(this._id);
          }
        }, {
          key: "owner",
          get: function get() {
            return this._owner;
          }
          /**是否展示在战斗状态栏 */

        }, {
          key: "isShow",
          get: function get() {
            return !!this._c.get(ShowOnStatuBuffCom);
          }
        }, {
          key: "isShowNum",
          get: function get() {
            return !!this._c.get(ShowNum);
          }
        }, {
          key: "isClearOnNumZero",
          get: function get() {
            return !!this._c.get(ClearOnNumZero);
          }
        }, {
          key: "isSignNum",
          get: function get() {
            return !!this._c.get(SignNumCom);
          }
        }]);

        return Buff;
      }());
      Buff._pool = new PoolModule(function () {
        return new Buff();
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuffIconListWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui-ccc370.mjs', './HoverTipDlg.ts', './UIWrap.ts', './Util.ts', './BuffPlay.ts', './NpcBuffCom.ts', './tc.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, Event, HoverTipDlg, UIWrap, isNull, BuffPlay, NpcBuffCom, tc;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Event = module.Event;
    }, function (module) {
      HoverTipDlg = module.default;
    }, function (module) {
      UIWrap = module.default;
    }, function (module) {
      isNull = module.isNull;
    }, function (module) {
      BuffPlay = module.default;
    }, function (module) {
      NpcBuffCom = module.default;
    }, function (module) {
      tc = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "37658fMZi1GYpwKsLuT6FDG", "BuffIconListWrap", undefined);

      var BuffIconListWrap = exports('BuffIconListWrap', /*#__PURE__*/function (_UIWrap) {
        _inheritsLoose(BuffIconListWrap, _UIWrap);

        function BuffIconListWrap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIWrap.call.apply(_UIWrap, [this].concat(args)) || this;
          _this._fighter = void 0;
          _this._list = void 0;
          _this._itemMap = void 0;
          _this._isShowingTip = void 0;
          return _this;
        }

        var _proto = BuffIconListWrap.prototype;

        _proto.OnInit = function OnInit() {
          this._list = this.fgc.asList;
          this._isShowingTip = false;
          this._itemMap = new Map();
        };

        _proto.OnClose = function OnClose() {
          this._unbindEvent();
        };

        _proto.setFighter = function setFighter(f) {
          this._unbindEvent();

          this._fighter = f;

          this._syncBuffs();

          this._fighter.buff.e.on(NpcBuffCom.Events.BUFF_CHG, this._syncBuffs, this);
        };

        _proto._unbindEvent = function _unbindEvent() {
          if (this._fighter) {
            this._fighter.buff.e.off(NpcBuffCom.Events.BUFF_CHG, this._syncBuffs, this);

            this._fighter = null;
          }
        };

        _proto._syncBuffs = function _syncBuffs(buffId) {
          var _this2 = this;

          if (this._isShowingTip) this._hideTip();
          var buffC = this._fighter.buff;

          if (isNull(buffId)) {
            this._list.removeChildrenToPool();

            this._itemMap.clear();

            buffC.each(function (b) {
              _this2._appendItem(b);

              return true;
            });
          } else {
            var theBuff = buffC.get(buffId);

            if (this._itemMap.has(buffId)) {
              var item = this._itemMap.get(buffId);

              if (theBuff && theBuff.num != 0) {
                this._refreshItem(item, theBuff);
              } else {
                this._list.removeChildToPool(item);

                this._itemMap["delete"](buffId);
              }
            } else if (theBuff) {
              this._appendItem(theBuff);
            }
          }
        };

        _proto._appendItem = function _appendItem(b) {
          var _this3 = this;

          if (!b.isShow) return;

          var item = this._list.addItemFromPool().asCom;

          var buffId = b.id;
          item.on(Event.ROLL_OVER, function () {
            var curBuff = _this3._fighter.buff.get(buffId);

            HoverTipDlg.show(b.info.name, tc.p(BuffPlay).parseDesc(curBuff));
            _this3._isShowingTip = true;
          }, this);
          item.on(Event.ROLL_OUT, this._hideTip, this);

          this._refreshItem(item, b);

          this._itemMap.set(b.id, item);
        };

        _proto._hideTip = function _hideTip() {
          HoverTipDlg.hide();
          this._isShowingTip = false;
        };

        _proto._refreshItem = function _refreshItem(item, b) {
          var icon = item.getChild("icon").asLoader;
          var num = item.getChild("num").as();
          icon.url = tc.resUrl(b.info.icon);

          if (b.isShowNum) {
            num.visible = true;
            num.text = "" + b.num;
          } else {
            num.visible = false;
          }
        };

        return BuffIconListWrap;
      }(UIWrap));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuffId.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('BuffId', void 0);

      cclegacy._RF.push({}, "86a59zPQGFBqa1dq3gCV4Jt", "BuffId", undefined);

      var BuffId;

      (function (BuffId) {
        BuffId[BuffId["collecter"] = -1] = "collecter";
        BuffId[BuffId["hp"] = 0] = "hp";
        BuffId[BuffId["maxhp"] = 1] = "maxhp";
        BuffId[BuffId["shiled"] = 2] = "shiled";
        BuffId[BuffId["power"] = 3] = "power";
        BuffId[BuffId["draw"] = 4] = "draw";
        BuffId[BuffId["coin"] = 5] = "coin";
        BuffId[BuffId["enegy"] = 6] = "enegy";
        BuffId[BuffId["maxenegy"] = 7] = "maxenegy";
        BuffId[BuffId["fragile"] = 8] = "fragile";
        BuffId[BuffId["weak"] = 9] = "weak";
        BuffId[BuffId["changcheng"] = 10] = "changcheng";
        BuffId[BuffId["grow"] = 11] = "grow";
        BuffId[BuffId["poison"] = 12] = "poison";
        BuffId[BuffId["shenshangxs"] = 13] = "shenshangxs";
        BuffId[BuffId["yinren"] = 14] = "yinren";
        BuffId[BuffId["kurouj"] = 15] = "kurouj";
        BuffId[BuffId["fanshangj"] = 16] = "fanshangj";
        BuffId[BuffId["Shixue"] = 17] = "Shixue";
        BuffId[BuffId["Huichun"] = 18] = "Huichun";
        BuffId[BuffId["GelieFeatrue"] = 19] = "GelieFeatrue";
        BuffId[BuffId["Feixing"] = 20] = "Feixing";
        BuffId[BuffId["Xuanyun"] = 21] = "Xuanyun";
        BuffId[BuffId["Fuhuo"] = 22] = "Fuhuo";
        BuffId[BuffId["Kongju"] = 23] = "Kongju";
        BuffId[BuffId["Xuwu"] = 24] = "Xuwu";
        BuffId[BuffId["Chuangshang"] = 25] = "Chuangshang";
        BuffId[BuffId["MeihuoFeature"] = 26] = "MeihuoFeature";
        BuffId[BuffId["Lianxie"] = 27] = "Lianxie";
        BuffId[BuffId["Rongyankj"] = 28] = "Rongyankj";
        BuffId[BuffId["Tizhi"] = 29] = "Tizhi";
        BuffId[BuffId["Lingxiu"] = 30] = "Lingxiu";
        BuffId[BuffId["Zhengzhaobj"] = 31] = "Zhengzhaobj";
        BuffId[BuffId["Shuangmianj"] = 32] = "Shuangmianj";
        BuffId[BuffId["Huoyanj"] = 33] = "Huoyanj";
        BuffId[BuffId["Tudu"] = 34] = "Tudu";
        BuffId[BuffId["Yuxue"] = 35] = "Yuxue";
        BuffId[BuffId["Shaowei"] = 36] = "Shaowei";
        BuffId[BuffId["Qiegq"] = 37] = "Qiegq";
        BuffId[BuffId["Duyun"] = 38] = "Duyun";
        BuffId[BuffId["Zhihuan"] = 39] = "Zhihuan";
        BuffId[BuffId["BeiShijiangl"] = 40] = "BeiShijiangl";
        BuffId[BuffId["BeiShufu"] = 41] = "BeiShufu";
        BuffId[BuffId["Wufadcsp"] = 42] = "Wufadcsp";
        BuffId[BuffId["ChujueBj"] = 43] = "ChujueBj";
        BuffId[BuffId["WangzhezgBj"] = 44] = "WangzhezgBj";
        BuffId[BuffId["Jiewang"] = 500] = "Jiewang";
        BuffId[BuffId["Wang"] = 501] = "Wang";
        BuffId[BuffId["Zibao"] = 502] = "Zibao";
        BuffId[BuffId["Lilcc"] = 503] = "Lilcc";
        BuffId[BuffId["Gangyi"] = 504] = "Gangyi";
        BuffId[BuffId["Fennuyj"] = 505] = "Fennuyj";
        BuffId[BuffId["Shijiangl"] = 506] = "Shijiangl";
        BuffId[BuffId["Shufu"] = 507] = "Shufu";
        BuffId[BuffId["Shangkoudj"] = 508] = "Shangkoudj";
        BuffId[BuffId["ChujueCfq"] = 509] = "ChujueCfq";
        BuffId[BuffId["Wangzhezg"] = 510] = "Wangzhezg";
        BuffId[BuffId["Meihuo"] = 1000] = "Meihuo";
        BuffId[BuffId["Zhuoshao"] = 1002] = "Zhuoshao";
        BuffId[BuffId["Tuifei"] = 1003] = "Tuifei";
        BuffId[BuffId["Huihen"] = 1004] = "Huihen";
        BuffId[BuffId["Gelie"] = 1005] = "Gelie";
        BuffId[BuffId["Qiangzhuang"] = 2000] = "Qiangzhuang";
        BuffId[BuffId["Xiaoyuand"] = 2001] = "Xiaoyuand";
        BuffId[BuffId["Nengliangyj"] = 2002] = "Nengliangyj";
        BuffId[BuffId["Xuebao"] = 2003] = "Xuebao";
        BuffId[BuffId["Yinsheny"] = 2004] = "Yinsheny";
        BuffId[BuffId["Zimuj"] = 2005] = "Zimuj";
        BuffId[BuffId["TreasureFeixing"] = 2006] = "TreasureFeixing";
        BuffId[BuffId["Liandao"] = 2007] = "Liandao";
        BuffId[BuffId["Yuandun"] = 2008] = "Yuandun";
        BuffId[BuffId["Cizhen"] = 2009] = "Cizhen";
        BuffId[BuffId["CizhenZf"] = 2010] = "CizhenZf";
        BuffId[BuffId["Keji"] = 2011] = "Keji";
        BuffId[BuffId["Xipaiq"] = 2012] = "Xipaiq";
        BuffId[BuffId["Lazhu"] = 2013] = "Lazhu";
        BuffId[BuffId["Lueduo"] = 2014] = "Lueduo";
        BuffId[BuffId["Jijiub"] = 2015] = "Jijiub";
        BuffId[BuffId["Duyaop"] = 2016] = "Duyaop";
        BuffId[BuffId["DuyaopZz"] = 2017] = "DuyaopZz";
        BuffId[BuffId["Pojiad"] = 2018] = "Pojiad";
        BuffId[BuffId["Miyao"] = 2019] = "Miyao";
        BuffId[BuffId["MiyaoZz"] = 2020] = "MiyaoZz";
        BuffId[BuffId["Hundeng"] = 2021] = "Hundeng";
        BuffId[BuffId["Qiangtou"] = 2022] = "Qiangtou";
        BuffId[BuffId["QiangtouZf"] = 2023] = "QiangtouZf";
        BuffId[BuffId["Yishib"] = 2024] = "Yishib";
        BuffId[BuffId["Xingfenj"] = 2025] = "Xingfenj";
        BuffId[BuffId["Shizij"] = 2026] = "Shizij";
        BuffId[BuffId["Suozij"] = 2027] = "Suozij";
        BuffId[BuffId["Dunang"] = 2028] = "Dunang";
        BuffId[BuffId["DunangZz"] = 2029] = "DunangZz";
        BuffId[BuffId["Shuijingq"] = 2030] = "Shuijingq";
        BuffId[BuffId["Chunqiub"] = 2031] = "Chunqiub";
        BuffId[BuffId["Dalian"] = 2032] = "Dalian";
        BuffId[BuffId["Lunpan"] = 2033] = "Lunpan";
        BuffId[BuffId["Chaoqiangll"] = 10000] = "Chaoqiangll";
        BuffId[BuffId["Jueduify"] = 10001] = "Jueduify";
        BuffId[BuffId["Wuxianhf"] = 10002] = "Wuxianhf";
      })(BuffId || (BuffId = exports('BuffId', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuffNS.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('BuffNS', void 0);

      cclegacy._RF.push({}, "de723b3Nn5NCIQJ+QKJtcGd", "BuffNS", undefined);
      /** Npc Buff namsespace */


      var BuffNS;

      (function (_BuffNS) {
        var EffectStage; // 监听的buff的数量变化时激发

        (function (EffectStage) {
          EffectStage[EffectStage["EnterFight"] = 0] = "EnterFight";
          EffectStage[EffectStage["RoundStart"] = 1] = "RoundStart";
          EffectStage[EffectStage["HandCardIn"] = 2] = "HandCardIn";
          EffectStage[EffectStage["RoundEnd"] = 3] = "RoundEnd";
          EffectStage[EffectStage["LeaveFight"] = 4] = "LeaveFight";
          EffectStage[EffectStage["AnyHandCardUsed"] = 5] = "AnyHandCardUsed";
          EffectStage[EffectStage["Hit"] = 6] = "Hit";
          EffectStage[EffectStage["HitOther"] = 7] = "HitOther";
          EffectStage[EffectStage["Hurt"] = 8] = "Hurt";
          EffectStage[EffectStage["HurtOther"] = 9] = "HurtOther";
          EffectStage[EffectStage["OnRemove"] = 10] = "OnRemove";
          EffectStage[EffectStage["OnRenew"] = 11] = "OnRenew";
          EffectStage[EffectStage["OnAdd"] = 12] = "OnAdd";
          EffectStage[EffectStage["AnyEnemyDead"] = 13] = "AnyEnemyDead";
          EffectStage[EffectStage["AnyTeammateTrueDead"] = 14] = "AnyTeammateTrueDead";
          EffectStage[EffectStage["OnTryRevive"] = 15] = "OnTryRevive";
          EffectStage[EffectStage["OnShuffle"] = 16] = "OnShuffle";
          EffectStage[EffectStage["OnListenBuffMod"] = 17] = "OnListenBuffMod";
        })(EffectStage || (EffectStage = {}));

        _BuffNS.EffectStage = EffectStage;
        var EffectOrder;

        (function (EffectOrder) {
          EffectOrder[EffectOrder["first"] = 0] = "first";
          EffectOrder[EffectOrder["beforebase"] = 1] = "beforebase";
          EffectOrder[EffectOrder["base"] = 2] = "base";
          EffectOrder[EffectOrder["latebase"] = 3] = "latebase";
          EffectOrder[EffectOrder["last"] = 4] = "last";
        })(EffectOrder || (EffectOrder = {}));

        _BuffNS.EffectOrder = EffectOrder;
      })(BuffNS || (BuffNS = exports('BuffNS', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuffPlay.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs', './Xls.ts', './Util.ts', './SignNumCom.ts', './BaseFightBuffAdder.ts', './BeiShijianglBuffCom.ts', './BeiShufuBuffCom.ts', './BuffId.ts', './ChaoqiangllBuff.ts', './ChuangshangBuffCom.ts', './ChujueCfq.ts', './ChunqiubBuff.ts', './CizhenBuffCom.ts', './ClearOnDead.ts', './ClearOnLeaveFight.ts', './ClearOnNumZero.ts', './ClearOnRoundStart.ts', './DalianBuff.ts', './Debuff.ts', './DecOnRoundEnd.ts', './DecOnRoundStart.ts', './DuyaopZzBuff.ts', './DuyunBuff.ts', './EnergyCom.ts', './EnterFightFightBuffAdder.ts', './FanshangjBuffCom.ts', './FeixingBuffCom.ts', './FennuyjBuffCom.ts', './FuhuoBuffCom.ts', './GelieBuffCom.ts', './GelieFeatrueBuffCom.ts', './GrowCom.ts', './HuichunBuffCom.ts', './HuihenBuffCom.ts', './HundengBuff.ts', './HuoyanjBuff.ts', './JiewangBuffCom.ts', './JijiubBuff.ts', './JueduifyBuff.ts', './KuroujBuffCom.ts', './LazhuBuff.ts', './LiandaoBuffCom.ts', './LianxieBuffCom.ts', './LingxiuBuffCom.ts', './LueduoBuff.ts', './LunpanBuff.ts', './Maxhp.ts', './CollecterBuff.ts', './MeihuoBuffCom.ts', './MeihuoFeatureBuff.ts', './MiyaoZzBuff.ts', './NengliangyjBuff.ts', './PoisonCom.ts', './PojiadBuff.ts', './QiangtouBuff.ts', './QiangzhuangBuff.ts', './QiegqBuff.ts', './RongyankjBuffCom.ts', './ShaoweiBuff.ts', './ShiledCom.ts', './CoinBuff.ts', './ShixueBuffCom.ts', './ShizijBuff.ts', './ShowNum.ts', './ShowOnStatuBuffCom.ts', './ShuangmianjBuff.ts', './ShuijingqBuff.ts', './TreasureFeixingBuffCom.ts', './TuifeiBuffCom.ts', './WangzhezgBj.ts', './WuxianhfBuff.ts', './XiaoyuandBuff.ts', './XingfenjBuff.ts', './XipaiqBuff.ts', './XuanyunBuffCom.ts', './XuebaoBuff.ts', './YinrenBuffCom.ts', './YinshenyBuff.ts', './YishibBuff.ts', './YuanDunBuffCom.ts', './YuxueBuff.ts', './ZhihuanBuff.ts', './ZhuoshaoBuffCom.ts', './ZibaoBuffCom.ts', './ZimujBuff.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PlayBase, Xls, emptyString, SignNumCom, RoundStartFightBuffAdder, BeiShijianglBuffCom, BeiShufuBuffCom, BuffId, ChaoqiangllBuff, ChuangshangBuffCom, ChujueCfq, ChunqiubBuff, CizhenSjBuffCom, CizhenZfBuffCom, ClearOnDead, ClearOnLeaveFight, ClearOnNumZero, ClearOnRoundStart, DalianBuff, Debuff, DecOnRoundEnd, DecOnRoundStart, DuyaopZzBuff, DuyunBuff, EnergyCom, EnterFightFightBuffAdder, FanshangjBuffCom, FeixingBuffCom, FennuyjBuffCom, FuhuoBuffCom, GelieBuffCom, GelieFeatrueBuffCom, GrowCom, HuichunBuffCom, HuihenBuffCom, HundengBuff, HuoyanjBuff, JiewangBuffCom, JijiubBuff, JueduifyBuff, KuroujBuffCom, LazhuBuff, LiandaoBuffCom, LianxieBuffCom, LingxiuBuffCom, LueduoBuff, LunpanBuff, Maxhp, CollecterBuff, MeihuoBuffCom, MeihuoFeatureBuff, MiyaoZzBuff, NengliangyjBuff, PoisonCom, PojiadBuff, QiangtouBuff, QiangtouZfBuff, QiangzhuangBuff, QiegqBuff, RongyankjBuffCom, ShaoweiBuff, ShiledCom, CoinBuff, ShixueBuffCom, ShizijBuff, ShowNum, ShowOnStatuBuffCom, ShuangmianjBuff, ShuijingqBuff, TreasureFeixingBuffCom, TuifeiBuffCom, WangzhezgBj, WuxianhfBuff, XiaoyuandBuff, XingfenjBuff, XipaiqBuff, XuanyunBuffCom, XuebaoBuff, YinrenBuffCom, YinshenyBuff, YishibBuff, YuanDunBuffCom, YuxueBuff, ZhihuanBuff, ZhuoshaoBuffCom, ZibaoBuffCom, ZimujBuff;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlayBase = module.PlayBase;
    }, function (module) {
      Xls = module.default;
    }, function (module) {
      emptyString = module.emptyString;
    }, function (module) {
      SignNumCom = module.default;
    }, function (module) {
      RoundStartFightBuffAdder = module.RoundStartFightBuffAdder;
    }, function (module) {
      BeiShijianglBuffCom = module.BeiShijianglBuffCom;
    }, function (module) {
      BeiShufuBuffCom = module.BeiShufuBuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      ChaoqiangllBuff = module.default;
    }, function (module) {
      ChuangshangBuffCom = module.default;
    }, function (module) {
      ChujueCfq = module.default;
    }, function (module) {
      ChunqiubBuff = module.ChunqiubBuff;
    }, function (module) {
      CizhenSjBuffCom = module.CizhenSjBuffCom;
      CizhenZfBuffCom = module.CizhenZfBuffCom;
    }, function (module) {
      ClearOnDead = module.default;
    }, function (module) {
      ClearOnLeaveFight = module.default;
    }, function (module) {
      ClearOnNumZero = module.default;
    }, function (module) {
      ClearOnRoundStart = module.default;
    }, function (module) {
      DalianBuff = module.DalianBuff;
    }, function (module) {
      Debuff = module.Debuff;
    }, function (module) {
      DecOnRoundEnd = module.default;
    }, function (module) {
      DecOnRoundStart = module.default;
    }, function (module) {
      DuyaopZzBuff = module.DuyaopZzBuff;
    }, function (module) {
      DuyunBuff = module.DuyunBuff;
    }, function (module) {
      EnergyCom = module.default;
    }, function (module) {
      EnterFightFightBuffAdder = module.EnterFightFightBuffAdder;
    }, function (module) {
      FanshangjBuffCom = module.default;
    }, function (module) {
      FeixingBuffCom = module.default;
    }, function (module) {
      FennuyjBuffCom = module.FennuyjBuffCom;
    }, function (module) {
      FuhuoBuffCom = module.default;
    }, function (module) {
      GelieBuffCom = module.default;
    }, function (module) {
      GelieFeatrueBuffCom = module.default;
    }, function (module) {
      GrowCom = module.default;
    }, function (module) {
      HuichunBuffCom = module.default;
    }, function (module) {
      HuihenBuffCom = module.default;
    }, function (module) {
      HundengBuff = module.HundengBuff;
    }, function (module) {
      HuoyanjBuff = module.HuoyanjBuff;
    }, function (module) {
      JiewangBuffCom = module.JiewangBuffCom;
    }, function (module) {
      JijiubBuff = module.JijiubBuff;
    }, function (module) {
      JueduifyBuff = module.default;
    }, function (module) {
      KuroujBuffCom = module.default;
    }, function (module) {
      LazhuBuff = module.LazhuBuff;
    }, function (module) {
      LiandaoBuffCom = module.default;
    }, function (module) {
      LianxieBuffCom = module.default;
    }, function (module) {
      LingxiuBuffCom = module.default;
    }, function (module) {
      LueduoBuff = module.LueduoBuff;
    }, function (module) {
      LunpanBuff = module.LunpanBuff;
    }, function (module) {
      Maxhp = module.default;
    }, function (module) {
      CollecterBuff = module.CollecterBuff;
    }, function (module) {
      MeihuoBuffCom = module.default;
    }, function (module) {
      MeihuoFeatureBuff = module.default;
    }, function (module) {
      MiyaoZzBuff = module.MiyaoZzBuff;
    }, function (module) {
      NengliangyjBuff = module.default;
    }, function (module) {
      PoisonCom = module.default;
    }, function (module) {
      PojiadBuff = module.PojiadBuff;
    }, function (module) {
      QiangtouBuff = module.QiangtouBuff;
      QiangtouZfBuff = module.QiangtouZfBuff;
    }, function (module) {
      QiangzhuangBuff = module.default;
    }, function (module) {
      QiegqBuff = module.QiegqBuff;
    }, function (module) {
      RongyankjBuffCom = module.default;
    }, function (module) {
      ShaoweiBuff = module.ShaoweiBuff;
    }, function (module) {
      ShiledCom = module.default;
    }, function (module) {
      CoinBuff = module.CoinBuff;
    }, function (module) {
      ShixueBuffCom = module.default;
    }, function (module) {
      ShizijBuff = module.ShizijBuff;
    }, function (module) {
      ShowNum = module.default;
    }, function (module) {
      ShowOnStatuBuffCom = module.default;
    }, function (module) {
      ShuangmianjBuff = module.ShuangmianjBuff;
    }, function (module) {
      ShuijingqBuff = module.ShuijingqBuff;
    }, function (module) {
      TreasureFeixingBuffCom = module.default;
    }, function (module) {
      TuifeiBuffCom = module.default;
    }, function (module) {
      WangzhezgBj = module.WangzhezgBj;
    }, function (module) {
      WuxianhfBuff = module.default;
    }, function (module) {
      XiaoyuandBuff = module.default;
    }, function (module) {
      XingfenjBuff = module.XingfenjBuff;
    }, function (module) {
      XipaiqBuff = module.XipaiqBuff;
    }, function (module) {
      XuanyunBuffCom = module.default;
    }, function (module) {
      XuebaoBuff = module.default;
    }, function (module) {
      YinrenBuffCom = module.default;
    }, function (module) {
      YinshenyBuff = module.default;
    }, function (module) {
      YishibBuff = module.YishibBuff;
    }, function (module) {
      YuanDunBuffCom = module.default;
    }, function (module) {
      YuxueBuff = module.YuxueBuff;
    }, function (module) {
      ZhihuanBuff = module.ZhihuanBuff;
    }, function (module) {
      ZhuoshaoBuffCom = module.default;
    }, function (module) {
      ZibaoBuffCom = module.ZibaoBuffCom;
    }, function (module) {
      ZimujBuff = module.default;
    }],
    execute: function () {
      var _BuffPlay$_idBuff;

      cclegacy._RF.push({}, "7130elRNG5NpZele4qGAIlB", "BuffPlay", undefined);

      var BuffPlay = exports('default', /*#__PURE__*/function (_PlayBase) {
        _inheritsLoose(BuffPlay, _PlayBase);

        function BuffPlay() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _PlayBase.call.apply(_PlayBase, [this].concat(args)) || this;
          _this._propCache = void 0;
          _this.playName = "BuffPlay";
          return _this;
        }

        var _proto = BuffPlay.prototype;

        _proto.OnInit = function OnInit(complete) {
          complete();
        };

        _proto.OnLateInit = function OnLateInit(complete) {
          complete();
        };

        _proto.OnDispose = function OnDispose() {
          this._propCache.clear();

          this._propCache = null;
        };

        _proto.infoOf = function infoOf(id) {
          return Xls.buffDatasById[id];
        };

        _proto.propOf = function propOf(id) {
          var rawprop = Xls.buffDatasById[id].prop;
          if (emptyString(rawprop)) return null;
          if (!this._propCache) this._propCache = new Map();

          var ret = this._propCache.get(id);

          if (!ret) {
            ret = Xls.buffDatasById[id].prop.split("\n").reduce(function (pre, pair) {
              var part = pair.split("=");
              pre[part[0]] = part[1];
              return pre;
            }, {});

            this._propCache.set(id, ret);
          }

          return ret;
        };

        _proto.getBuffComs = function getBuffComs(id) {
          return BuffPlay._idBuff[id];
        };

        _proto.parseDesc = function parseDesc(buff) {
          if (buff) {
            var desc = buff.num > 0 ? buff.info.desc : buff.info.dedesc;
            var rawprops = desc.match(/(?<=\【)(.+?)(?=\】)/g);
            var props = this.propOf(buff.id);

            if (rawprops) {
              rawprops.forEach(function (rawprop) {
                var _rawprop$split = rawprop.split("("),
                    func = _rawprop$split[0],
                    rawArgs = _rawprop$split[1];

                if (func == 'num') {
                  var scaleInt = 1;
                  var add = 0;
                  var base = buff.num;

                  if (rawArgs) {
                    var args = rawArgs.replace(')', '').split(',');
                    args[0] && (scaleInt = parseInt(args[0]));
                    args[1] && (add = parseInt(args[1]));
                  }

                  rawprop = "\u3010" + rawprop + "\u3011";
                  desc = desc.replace(rawprop, "" + (base * scaleInt + add));
                } else {
                  desc = desc.replace("\u3010" + rawprop + "\u3011", props[func]);
                }
              });
            }

            return desc;
          } else {
            return "";
          }
        };

        return BuffPlay;
      }(PlayBase));
      BuffPlay._idBuff = (_BuffPlay$_idBuff = {}, _BuffPlay$_idBuff[BuffId.collecter] = [CollecterBuff], _BuffPlay$_idBuff[BuffId.maxhp] = [Maxhp], _BuffPlay$_idBuff[BuffId.shiled] = [ShiledCom, ClearOnLeaveFight, ShowOnStatuBuffCom, ClearOnNumZero, ShowNum], _BuffPlay$_idBuff[BuffId.coin] = [CoinBuff], _BuffPlay$_idBuff[BuffId.power] = [ClearOnLeaveFight, ShowOnStatuBuffCom, ClearOnNumZero, SignNumCom, ShowNum], _BuffPlay$_idBuff[BuffId.enegy] = [EnergyCom, ClearOnLeaveFight], _BuffPlay$_idBuff[BuffId.fragile] = [DecOnRoundStart, ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero, ClearOnDead, Debuff, ShowNum], _BuffPlay$_idBuff[BuffId.weak] = [DecOnRoundStart, ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero, ClearOnDead, Debuff, ShowNum], _BuffPlay$_idBuff[BuffId.changcheng] = [ShowOnStatuBuffCom, ClearOnLeaveFight], _BuffPlay$_idBuff[BuffId.grow] = [GrowCom, ShowOnStatuBuffCom, ClearOnLeaveFight, ShowNum], _BuffPlay$_idBuff[BuffId.poison] = [PoisonCom, ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero, ClearOnDead, Debuff, ShowNum], _BuffPlay$_idBuff[BuffId.shenshangxs] = [DecOnRoundEnd, ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.yinren] = [YinrenBuffCom, ShowOnStatuBuffCom, ClearOnLeaveFight, ShowNum], _BuffPlay$_idBuff[BuffId.kurouj] = [KuroujBuffCom, ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.fanshangj] = [FanshangjBuffCom, ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Shixue] = [ShixueBuffCom, ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Huichun] = [HuichunBuffCom, ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero, ShowNum], _BuffPlay$_idBuff[BuffId.GelieFeatrue] = [GelieFeatrueBuffCom, ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Feixing] = [FeixingBuffCom, ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Xuanyun] = [XuanyunBuffCom, ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero, ClearOnDead, Debuff], _BuffPlay$_idBuff[BuffId.Fuhuo] = [FuhuoBuffCom, ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Kongju] = [DecOnRoundEnd, ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero, ClearOnDead, Debuff, ShowNum], _BuffPlay$_idBuff[BuffId.Xuwu] = [ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Chuangshang] = [ChuangshangBuffCom, ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.MeihuoFeature] = [MeihuoFeatureBuff, ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Lianxie] = [LianxieBuffCom, ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Rongyankj] = [RongyankjBuffCom, ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Tizhi] = [ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero, SignNumCom, ShowNum], _BuffPlay$_idBuff[BuffId.Lingxiu] = [LingxiuBuffCom, ShowOnStatuBuffCom, ClearOnLeaveFight, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Zhengzhaobj] = [ClearOnLeaveFight], _BuffPlay$_idBuff[BuffId.Shuangmianj] = [ShuangmianjBuff, ClearOnNumZero, ClearOnLeaveFight, ClearOnDead, ShowOnStatuBuffCom], _BuffPlay$_idBuff[BuffId.Huoyanj] = [HuoyanjBuff, ClearOnNumZero, ClearOnLeaveFight, ClearOnRoundStart, ShowOnStatuBuffCom], _BuffPlay$_idBuff[BuffId.Tudu] = [ClearOnNumZero, ClearOnLeaveFight, ClearOnRoundStart, ShowOnStatuBuffCom], _BuffPlay$_idBuff[BuffId.Yuxue] = [YuxueBuff, ClearOnLeaveFight, ShowOnStatuBuffCom, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Shaowei] = [ShaoweiBuff, ClearOnLeaveFight, ShowOnStatuBuffCom, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Qiegq] = [QiegqBuff, ClearOnLeaveFight, ShowOnStatuBuffCom, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Duyun] = [DuyunBuff, ClearOnLeaveFight, ShowOnStatuBuffCom, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Zhihuan] = [ZhihuanBuff, ClearOnLeaveFight, ShowOnStatuBuffCom, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.BeiShijiangl] = [BeiShijianglBuffCom, ShowOnStatuBuffCom, ClearOnLeaveFight], _BuffPlay$_idBuff[BuffId.BeiShufu] = [BeiShufuBuffCom, ShowOnStatuBuffCom, ClearOnLeaveFight], _BuffPlay$_idBuff[BuffId.Wufadcsp] = [ClearOnRoundStart, ClearOnLeaveFight], _BuffPlay$_idBuff[BuffId.ChujueBj] = [ClearOnLeaveFight], _BuffPlay$_idBuff[BuffId.WangzhezgBj] = [WangzhezgBj, ClearOnLeaveFight], _BuffPlay$_idBuff[BuffId.Jiewang] = [JiewangBuffCom, ShowOnStatuBuffCom], _BuffPlay$_idBuff[BuffId.Wang] = [ShuangmianjBuff, ShowOnStatuBuffCom], _BuffPlay$_idBuff[BuffId.Zibao] = [ZibaoBuffCom, ShowOnStatuBuffCom, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Lilcc] = [GrowCom, ShowOnStatuBuffCom], _BuffPlay$_idBuff[BuffId.Gangyi] = [YuxueBuff, ShowOnStatuBuffCom], _BuffPlay$_idBuff[BuffId.Fennuyj] = [FennuyjBuffCom, ShowOnStatuBuffCom], _BuffPlay$_idBuff[BuffId.Shijiangl] = [EnterFightFightBuffAdder, ShowOnStatuBuffCom], _BuffPlay$_idBuff[BuffId.Shufu] = [EnterFightFightBuffAdder, ShowOnStatuBuffCom], _BuffPlay$_idBuff[BuffId.Shangkoudj] = [ChuangshangBuffCom, ShowOnStatuBuffCom], _BuffPlay$_idBuff[BuffId.ChujueCfq] = [ChujueCfq], _BuffPlay$_idBuff[BuffId.Wangzhezg] = [EnterFightFightBuffAdder, ShowOnStatuBuffCom], _BuffPlay$_idBuff[BuffId.Meihuo] = [MeihuoBuffCom, ClearOnLeaveFight, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Zhuoshao] = [ZhuoshaoBuffCom, ClearOnLeaveFight, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Tuifei] = [TuifeiBuffCom, ClearOnLeaveFight, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Huihen] = [HuihenBuffCom, ClearOnLeaveFight, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Gelie] = [GelieBuffCom, ClearOnLeaveFight, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Qiangzhuang] = [QiangzhuangBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Xiaoyuand] = [XiaoyuandBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Nengliangyj] = [NengliangyjBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Xuebao] = [XuebaoBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Yinsheny] = [YinshenyBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Zimuj] = [ZimujBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.TreasureFeixing] = [TreasureFeixingBuffCom, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Liandao] = [LiandaoBuffCom, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Yuandun] = [YuanDunBuffCom, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Cizhen] = [CizhenSjBuffCom, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.CizhenZf] = [CizhenZfBuffCom, ClearOnNumZero, ClearOnLeaveFight], _BuffPlay$_idBuff[BuffId.Keji] = [ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Xipaiq] = [XipaiqBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Lazhu] = [LazhuBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Lueduo] = [LueduoBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Jijiub] = [JijiubBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Duyaop] = [RoundStartFightBuffAdder, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.DuyaopZz] = [DuyaopZzBuff, ClearOnNumZero, ClearOnLeaveFight], _BuffPlay$_idBuff[BuffId.Pojiad] = [PojiadBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Miyao] = [RoundStartFightBuffAdder, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.MiyaoZz] = [MiyaoZzBuff, ClearOnNumZero, ClearOnLeaveFight], _BuffPlay$_idBuff[BuffId.Hundeng] = [HundengBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Qiangtou] = [QiangtouBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.QiangtouZf] = [QiangtouZfBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Yishib] = [YishibBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Xingfenj] = [XingfenjBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Shizij] = [ShizijBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Suozij] = [ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Dunang] = [RoundStartFightBuffAdder, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.DunangZz] = [ClearOnNumZero, ClearOnLeaveFight], _BuffPlay$_idBuff[BuffId.Shuijingq] = [ShuijingqBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Chunqiub] = [ChunqiubBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Dalian] = [DalianBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Lunpan] = [LunpanBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Chaoqiangll] = [ChaoqiangllBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Jueduify] = [JueduifyBuff, ClearOnNumZero], _BuffPlay$_idBuff[BuffId.Wuxianhf] = [WuxianhfBuff, ClearOnNumZero], _BuffPlay$_idBuff);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardBuyDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TipDlg.ts', './UIDocker.ts', './BuffId.ts', './PlayerCardSetCom.ts', './PlayerPlay.ts', './tc.ts', './CardIntroDlg.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, TipDlg, UIDocker, BuffId, PlayerCardSetCom, PlayerPlay, tc, CardIntroDlg;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TipDlg = module.default;
    }, function (module) {
      UIDocker = module.UIDocker;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      PlayerCardSetCom = module.PlayerCardSetCom;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardIntroDlg = module.CardIntroDlg;
    }],
    execute: function () {
      cclegacy._RF.push({}, "48173Dk9dRBa6boNSWwKzLC", "CardBuyDlg", undefined);

      var CardBuyDlg = exports('CardBuyDlg', /*#__PURE__*/function (_CardIntroDlg) {
        _inheritsLoose(CardBuyDlg, _CardIntroDlg);

        function CardBuyDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _CardIntroDlg.call.apply(_CardIntroDlg, [this].concat(args)) || this;
          _this._id = void 0;
          _this._price = void 0;
          _this._onSold = void 0;
          return _this;
        }

        var _proto = CardBuyDlg.prototype;

        _proto.exSetup = function exSetup(id, price, onSold) {
          _CardIntroDlg.prototype.setup.call(this, id);

          this._id = id;
          this._price = price;
          this.getTxt("coin").text = '' + price;
          this._onSold = onSold;
          return this;
        };

        _proto.OnInit = function OnInit() {
          this.dock(UIDocker.Dock.Top);

          _CardIntroDlg.prototype.OnInit.call(this);

          this.getController("salemode").selectedIndex = 1;
          this.addBtnEvt("buy", this._buy);
          this.addBtnEvt("close", this.close);
        };

        _proto._buy = function _buy(e) {
          var price = this._price;
          var player = tc.p(PlayerPlay).player;
          var playerCoin = player.buff.numOf(BuffId.coin);

          if (playerCoin < price) {
            TipDlg.pop("金币不足");
            e();
          } else {
            player.buff.mod(BuffId.coin, -price);
            player.c.get(PlayerCardSetCom).addCard(this._id);
            this.close();

            this._onSold();
          }
        };

        return CardBuyDlg;
      }(CardIntroDlg));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardCfg.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c8911WxYz5IcoZTmzI7f3X7", "CardCfg", undefined);

      var CardCfg = exports('default', {
        color: {
          "白板": "#FFFFFF",
          "蓝色": "#0099FF",
          "绿色": "#00FF00",
          "紫色": "#FF00FF",
          "黑色": "#9999FF"
        }
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardConfirmDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui-ccc370.mjs', './DlgBase.ts', './DlgKit.ts', './ListWrap.ts', './CardPlay.ts', './PlayerCardSetCom.ts', './PlayerPlay.ts', './tc.ts', './CardListItemWrap.ts', './AlertDlg.ts', './TipDlg.ts', './BrownButtonText.ts', './UIDocker.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, ListSelectionMode, DlgBase, DlgKit, ListWrap, CardPlay, PlayerCardSetCom, PlayerPlay, tc, CardListItemWrap, AlertDlg, TipDlg, BrownButtonText, UIDocker;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ListSelectionMode = module.ListSelectionMode;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgKit = module.DlgKit;
    }, function (module) {
      ListWrap = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      PlayerCardSetCom = module.PlayerCardSetCom;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardListItemWrap = module.default;
    }, function (module) {
      AlertDlg = module.default;
    }, function (module) {
      TipDlg = module.default;
    }, function (module) {
      BrownButtonText = module.BrownButtonText;
    }, function (module) {
      UIDocker = module.UIDocker;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5bb4fjIEbVHsoFswQ+6vZpZ", "CardConfirmDlg", undefined);

      var CardConfirmDlg = exports('default', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(CardConfirmDlg, _DlgBase);

        function CardConfirmDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._tipFormat = void 0;
          _this._title = void 0;
          _this._back = void 0;
          _this._confirmBtn = void 0;
          _this._mustChoose = void 0;
          _this._backVis = void 0;
          _this._listWrap = void 0;
          _this._onConfirm = void 0;
          _this._onConfirmMulti = void 0;
          return _this;
        }

        CardConfirmDlg.pop = function pop(cards, option) {
          tc.k(DlgKit).fetchDlg(CardConfirmDlg)._setData(cards, option);
        };

        CardConfirmDlg.popRemove = function popRemove(onRemoveOver) {
          var player = tc.p(PlayerPlay).player;
          var nonfixedCards = player.c.get(PlayerCardSetCom).nonfixedCards;

          if (nonfixedCards.length > 0) {
            this.pop(nonfixedCards, {
              title: "请选择要移除的卡牌",
              tipFormat: '确认移除 {cardname} 吗？',
              backVis: true,
              multi: false,
              confirmBtnText: BrownButtonText.yichu_kapai,
              onConfirm: function onConfirm(card) {
                tc.p(PlayerPlay).player.c.get(PlayerCardSetCom).rmCard(card);
                TipDlg.pop("\u5DF2\u79FB\u9664 " + tc.p(CardPlay).infoOf(card).name);
                onRemoveOver();
              }
            });
          } else {
            TipDlg.pop('没有可移除的卡牌');
          }
        };

        var _proto = CardConfirmDlg.prototype;

        _proto.OnInit = function OnInit() {
          var _this2 = this;

          this.dock(UIDocker.Dock.Bottom); // this._title = this.getTxt("title");

          this._back = this.getBtn("back");
          this._confirmBtn = this.getBtn("confirmMulti");
          this._listWrap = this.wrap(ListWrap, "list");

          this._back.onClick(function () {
            _this2.close();
          });
        };

        _proto._setData = function _setData(cards, option) {
          var _option$mustChoose,
              _option$confirmBtnTex,
              _this3 = this;

          this._backVis = option.backVis;
          this._mustChoose = (_option$mustChoose = option.mustChoose) != null ? _option$mustChoose : true;
          this._tipFormat = option.tipFormat;
          var clist = this._listWrap.fgc.asList; // this._title.text = option.title;

          this._back.visible = option.backVis;
          this._confirmBtn.icon = (_option$confirmBtnTex = option.confirmBtnText) != null ? _option$confirmBtnTex : BrownButtonText.queding;
          this._onConfirm = option.onConfirm;
          this._onConfirmMulti = option.onConfirmMulti;
          this.getController('scene').setSelectedPage("confirm");

          this._listWrap.initList(CardListItemWrap, cards.map(function (card) {
            return {
              id: card
            };
          }));

          var mustChoose = this._mustChoose && cards.length > 0;

          if (!option.multi) {
            clist.selectionMode = ListSelectionMode.Single;
            this.addBtnEvt(this._confirmBtn, function (enableBtn) {
              var selected = clist.getSelection()[0];

              if (selected) {
                _this3._onConfirm(cards[selected]);

                _this3.close();
              } else {
                if (mustChoose) {
                  TipDlg.pop("请选择一张卡牌");
                  enableBtn();
                } else {
                  _this3.close();
                }
              }
            });
          } else {
            clist.selectionMode = ListSelectionMode.Multiple_SingleClick;
            this.addBtnEvt(this._confirmBtn, function (enableBtn) {
              var selected = clist.getSelection().map(function (i) {
                return cards[i];
              });

              if (selected.length > 0) {
                _this3._onConfirmMulti(selected, clist.getSelection());

                _this3.close();
              } else {
                if (mustChoose) {
                  TipDlg.pop("请至少选择一张卡牌");
                  enableBtn();
                } else {
                  _this3.close();
                }
              }
            });
          }
        };

        _proto.OnBgClickClose = function OnBgClickClose() {
          return this._backVis;
        };

        _proto._onClickItem = function _onClickItem(id) {
          var _this4 = this;

          AlertDlg.pop({
            tip: this._tipFormat.format({
              cardname: tc.p(CardPlay).infoOf(id).name
            }),
            onYes: function onYes() {
              _this4.close();

              _this4._onConfirm(id);
            }
          });
        };

        _createClass(CardConfirmDlg, [{
          key: "dlgRes",
          get: function get() {
            return "CardSetDlg";
          }
        }]);

        return CardConfirmDlg;
      }(DlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardEffecter.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Util.ts', './tc.ts', './BuffId.ts', './FightPlay.ts', './PlayerFightCardCom.ts', './PlayerBuffCom.ts', './CardPlay.ts', './FightCardSeekLogic.ts'], function (exports) {
  'use strict';

  var _createClass, _inheritsLoose, cclegacy, notNull, pick, floorToZero, randomInt, isNull, tc, BuffId, FightPlay, PlayerFightCardCom, PlayerBuffCom, CardPlay, FightCardSeekLogic;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      notNull = module.notNull;
      pick = module.pick;
      floorToZero = module.floorToZero;
      randomInt = module.randomInt;
      isNull = module.isNull;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      FightPlay = module.default;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      PlayerBuffCom = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      FightCardSeekLogic = module.FightCardSeekLogic;
    }],
    execute: function () {
      cclegacy._RF.push({}, "62243XSfQNLF6ZYF54xe24A", "CardEffecter", undefined);

      function isSeekSelf(v) {
        return v == FightCardSeekLogic.Self;
      }

      function isSeekChooseOne(v) {
        return v == FightCardSeekLogic.ChooseOne;
      }

      function isSeekEnemys(v) {
        return v == FightCardSeekLogic.Enemys;
      }

      function isSeekRandomEnemy(v) {
        return v == FightCardSeekLogic.RandomEnemy;
      }
      /** 寻敌路由器 */


      function seekRouter(v, self, choose, enemys, rdmEnemy) {
        if (isSeekSelf(v)) return self();else if (isSeekChooseOne(v)) return choose();else if (isSeekEnemys(v)) return enemys();else if (isSeekRandomEnemy) return rdmEnemy();
      }

      var ACardEffecter = exports('ACardEffecter', /*#__PURE__*/function () {
        function ACardEffecter(fc, prop) {
          this.fightcard = void 0;
          this._prop = void 0;
          this.onReplacerChange = void 0;
          this.fightcard = fc;
          this._prop = prop;
          this.onReplacerChange = ACardEffecter._default_empty_callback;
          this.me.buff.e.on(PlayerBuffCom.Events.BUFF_CHG, this._onBuffChg, this);
          this.OnCreate();
        }

        var _proto = ACardEffecter.prototype;

        _proto._onBuffChg = function _onBuffChg(id) {
          if (id == BuffId.power || id == BuffId.Kongju || id == BuffId.Tizhi || id == BuffId.QiangtouZf || id == BuffId.CizhenZf) {
            this.onReplacerChange();
          }
        }
        /**根据索敌逻辑获取敌人 */
        ;

        _proto.seek = function seek(logic) {
          var _this = this;

          return seekRouter(logic, function () {
            return [_this.me];
          }, function () {
            return [_this.choose];
          }, function () {
            return _this.liveEnemys;
          }, function () {
            return [_this.randomLiveEnemy];
          }).filter(function ($) {
            return notNull($);
          });
        }
        /**卡牌释放效果 */
        ;
        /**进入手牌时进行 */


        _proto.enterHand = function enterHand() {
          this.OnEnterHand();
        }
        /**离开手牌时进行 */
        ;

        _proto.leaveHand = function leaveHand() {
          this.OnLeaveHand();
        };

        _proto.Dispose = function Dispose() {
          var _this$me$buff$e;

          (_this$me$buff$e = this.me.buff.e) == null ? void 0 : _this$me$buff$e.off(PlayerBuffCom.Events.BUFF_CHG, this._onBuffChg, this);
          this.onReplacerChange = null;
          this.OnDispose();
          this.fightcard = null;
        };

        _proto.getArg = function getArg(index) {
          return this.prop.args[index];
        };

        _proto.getIntArg = function getIntArg(index) {
          return parseInt(this.getArg(index));
        };
        /**
         * <to-override
         * 进入手牌时调用
         */


        _proto.OnEnterHand = function OnEnterHand() {};
        /**
         * <to-override>
         * 离开手牌时调用
         */


        _proto.OnLeaveHand = function OnLeaveHand() {};

        _createClass(ACardEffecter, [{
          key: "prop",
          get: function get() {
            return this._prop;
          }
        }, {
          key: "origin",
          get: function get() {
            return this._prop.rawprop;
          }
        }, {
          key: "me",
          get: function get() {
            return this.fightcard.caster;
          }
        }, {
          key: "enemys",
          get: function get() {
            return this.fightcard.caster.info.getEnemys();
          }
        }, {
          key: "liveEnemys",
          get: function get() {
            return this.fightcard.caster.info.getLiveEnemys();
          }
        }, {
          key: "randomLiveEnemy",
          get: function get() {
            return pick(this.liveEnemys);
          }
        }, {
          key: "choose",
          get: function get() {
            return tc.p(CardPlay).choosingTarget;
          }
        }]);

        return ACardEffecter;
      }());

      ACardEffecter._default_empty_callback = function () {};

      var BuffEffectBase = /*#__PURE__*/function (_ACardEffecter) {
        _inheritsLoose(BuffEffectBase, _ACardEffecter);

        function BuffEffectBase() {
          return _ACardEffecter.apply(this, arguments) || this;
        }

        var _proto2 = BuffEffectBase.prototype;

        _proto2.castEffect = function castEffect() {
          var _this2 = this;

          var odds = this.OnGetOdds();

          if (randomInt(0, 100) < odds) {
            var targets = this.seek(this.getIntArg(1));
            targets.forEach(function (target) {
              target.buff.mod(_this2.buffId, _this2.OnGetBuffNum(target));
            });
          }
        };

        _proto2.OnCreate = function OnCreate() {};

        _proto2.OnDispose = function OnDispose() {};

        _proto2.OnGetReplacer = function OnGetReplacer(singleTarget) {
          return this.getArg(0);
        };

        _proto2.OnGetBuffNum = function OnGetBuffNum(target) {
          return this.getIntArg(0);
        };

        _proto2.OnGetOdds = function OnGetOdds() {
          var odds = this.getArg(2);
          if (isNull(odds)) return 100;else return parseInt(odds);
        };

        _createClass(BuffEffectBase, [{
          key: "replacer",
          get: function get() {
            var _this3 = this;

            return seekRouter(this.getIntArg(1), function () {
              return _this3.OnGetReplacer(_this3.me);
            }, function () {
              return _this3.OnGetReplacer(_this3.choose);
            }, function () {
              return _this3.OnGetReplacer(null);
            }, function () {
              return _this3.OnGetReplacer(null);
            });
          }
        }]);

        return BuffEffectBase;
      }(ACardEffecter);

      var CardPowerEffect = exports('CardPowerEffect', /*#__PURE__*/function (_BuffEffectBase) {
        _inheritsLoose(CardPowerEffect, _BuffEffectBase);

        function CardPowerEffect() {
          return _BuffEffectBase.apply(this, arguments) || this;
        }

        _createClass(CardPowerEffect, [{
          key: "buffId",
          get: function get() {
            return BuffId.power;
          }
        }]);

        return CardPowerEffect;
      }(BuffEffectBase));
      var CardFragileEffect = exports('CardFragileEffect', /*#__PURE__*/function (_BuffEffectBase2) {
        _inheritsLoose(CardFragileEffect, _BuffEffectBase2);

        function CardFragileEffect() {
          return _BuffEffectBase2.apply(this, arguments) || this;
        }

        _createClass(CardFragileEffect, [{
          key: "buffId",
          get: function get() {
            return BuffId.fragile;
          }
        }]);

        return CardFragileEffect;
      }(BuffEffectBase));
      var CardShiledEffect = exports('CardShiledEffect', /*#__PURE__*/function (_BuffEffectBase3) {
        _inheritsLoose(CardShiledEffect, _BuffEffectBase3);

        function CardShiledEffect() {
          return _BuffEffectBase3.apply(this, arguments) || this;
        }

        var _proto3 = CardShiledEffect.prototype;

        _proto3.OnGetReplacer = function OnGetReplacer(target) {
          if (target == null) return "";
          return '' + this.OnGetBuffNum(target);
        };

        _proto3.OnGetBuffNum = function OnGetBuffNum(target) {
          return tc.p(FightPlay).calcShieldMod(this.getIntArg(0), target);
        };

        _createClass(CardShiledEffect, [{
          key: "buffId",
          get: function get() {
            return BuffId.shiled;
          }
        }]);

        return CardShiledEffect;
      }(BuffEffectBase));
      var CardWeakEffect = exports('CardWeakEffect', /*#__PURE__*/function (_BuffEffectBase4) {
        _inheritsLoose(CardWeakEffect, _BuffEffectBase4);

        function CardWeakEffect() {
          return _BuffEffectBase4.apply(this, arguments) || this;
        }

        _createClass(CardWeakEffect, [{
          key: "buffId",
          get: function get() {
            return BuffId.weak;
          }
        }]);

        return CardWeakEffect;
      }(BuffEffectBase));
      var CardHitEffect = exports('CardHitEffect', /*#__PURE__*/function (_ACardEffecter2) {
        _inheritsLoose(CardHitEffect, _ACardEffecter2);

        function CardHitEffect() {
          return _ACardEffecter2.apply(this, arguments) || this;
        }

        var _proto4 = CardHitEffect.prototype;

        _proto4.OnDispose = function OnDispose() {
          if (this._seekchoose) {
            tc.p(CardPlay).e.off(CardPlay.Events.CHOSSING_TARGET_CHG, this._onChossingTargetChg, this);
          }
        };

        _proto4.OnCreate = function OnCreate() {
          if (this._seekchoose) {
            tc.p(CardPlay).e.on(CardPlay.Events.CHOSSING_TARGET_CHG, this._onChossingTargetChg, this);
          }
        };

        _proto4.castEffect = function castEffect() {
          var _this4 = this;

          var from = this.me;
          var fTuduNum = from.buff.numOf(BuffId.Tudu);
          var to = this.seek(this.getIntArg(1));
          to.forEach(function ($) {
            $.getHit(tc.p(FightPlay).calcHitDmg(_this4.getIntArg(0), from, $), from, _this4.fightcard.info.name);

            if (fTuduNum > 0 && !$.isDead) {
              $.buff.mod(BuffId.poison, fTuduNum);
            }
          });
        };

        _proto4._onChossingTargetChg = function _onChossingTargetChg() {
          this.onReplacerChange();
        };

        _createClass(CardHitEffect, [{
          key: "replacer",
          get: function get() {
            var _this5 = this;

            return seekRouter(this.getIntArg(1), function () {
              return '' + tc.p(FightPlay).calcHitDmg(_this5.getIntArg(0), _this5.me, _this5.me);
            }, function () {
              return '' + tc.p(FightPlay).calcHitDmg(_this5.getIntArg(0), _this5.me, _this5.choose);
            }, function () {
              return '' + tc.p(FightPlay).calcHitDmg(_this5.getIntArg(0), _this5.me);
            }, function () {
              return '' + tc.p(FightPlay).calcHitDmg(_this5.getIntArg(0), _this5.me);
            });
          }
        }, {
          key: "_seekchoose",
          get: function get() {
            return isSeekChooseOne(this.getIntArg(1));
          }
        }]);

        return CardHitEffect;
      }(ACardEffecter));
      var CardHurtEffect = exports('CardHurtEffect', /*#__PURE__*/function (_ACardEffecter3) {
        _inheritsLoose(CardHurtEffect, _ACardEffecter3);

        function CardHurtEffect() {
          return _ACardEffecter3.apply(this, arguments) || this;
        }

        var _proto5 = CardHurtEffect.prototype;

        _proto5.OnDispose = function OnDispose() {};

        _proto5.OnCreate = function OnCreate() {};

        _proto5.castEffect = function castEffect() {
          var _this6 = this;

          var from = this.me;
          var to = this.seek(this.getIntArg(1));
          to.forEach(function ($) {
            return $.cutHp(_this6.getIntArg(0), from, _this6.fightcard.info.name);
          });
        };

        _createClass(CardHurtEffect, [{
          key: "replacer",
          get: function get() {
            return this.getArg(0);
          }
        }]);

        return CardHurtEffect;
      }(ACardEffecter));
      var CardDrawEffect = exports('CardDrawEffect', /*#__PURE__*/function (_ACardEffecter4) {
        _inheritsLoose(CardDrawEffect, _ACardEffecter4);

        function CardDrawEffect() {
          return _ACardEffecter4.apply(this, arguments) || this;
        }

        var _proto6 = CardDrawEffect.prototype;

        _proto6.castEffect = function castEffect() {
          this.me.c.get(PlayerFightCardCom).wrapdraw(this.getIntArg(0));
        };

        _proto6.OnCreate = function OnCreate() {};

        _proto6.OnDispose = function OnDispose() {};

        _createClass(CardDrawEffect, [{
          key: "replacer",
          get: function get() {
            return this.getArg(0);
          }
        }]);

        return CardDrawEffect;
      }(ACardEffecter));
      var CardRecoverEffect = exports('CardRecoverEffect', /*#__PURE__*/function (_ACardEffecter5) {
        _inheritsLoose(CardRecoverEffect, _ACardEffecter5);

        function CardRecoverEffect() {
          return _ACardEffecter5.apply(this, arguments) || this;
        }

        var _proto7 = CardRecoverEffect.prototype;

        _proto7.castEffect = function castEffect() {
          this.me.recoverHp(this.getIntArg(0), this.fightcard.info.name);
        };

        _proto7.OnCreate = function OnCreate() {};

        _proto7.OnDispose = function OnDispose() {};

        _createClass(CardRecoverEffect, [{
          key: "replacer",
          get: function get() {
            return this.getArg(0);
          }
        }]);

        return CardRecoverEffect;
      }(ACardEffecter));
      var CardEnergyEffect = exports('CardEnergyEffect', /*#__PURE__*/function (_ACardEffecter6) {
        _inheritsLoose(CardEnergyEffect, _ACardEffecter6);

        function CardEnergyEffect() {
          return _ACardEffecter6.apply(this, arguments) || this;
        }

        var _proto8 = CardEnergyEffect.prototype;

        _proto8.castEffect = function castEffect() {
          this.me.buff.mod(BuffId.enegy, this.getIntArg(0));
        };

        _proto8.OnCreate = function OnCreate() {};

        _proto8.OnDispose = function OnDispose() {};

        _createClass(CardEnergyEffect, [{
          key: "replacer",
          get: function get() {
            return this.getArg(0);
          }
        }]);

        return CardEnergyEffect;
      }(ACardEffecter));
      var CardGiddyEffect = exports('CardGiddyEffect', /*#__PURE__*/function (_BuffEffectBase5) {
        _inheritsLoose(CardGiddyEffect, _BuffEffectBase5);

        function CardGiddyEffect() {
          return _BuffEffectBase5.apply(this, arguments) || this;
        }

        _createClass(CardGiddyEffect, [{
          key: "buffId",
          get: function get() {
            return BuffId.Xuanyun;
          }
        }]);

        return CardGiddyEffect;
      }(BuffEffectBase));
      var CardPoisonEffect = exports('CardPoisonEffect', /*#__PURE__*/function (_BuffEffectBase6) {
        _inheritsLoose(CardPoisonEffect, _BuffEffectBase6);

        function CardPoisonEffect() {
          return _BuffEffectBase6.apply(this, arguments) || this;
        }

        _createClass(CardPoisonEffect, [{
          key: "buffId",
          get: function get() {
            return BuffId.poison;
          }
        }]);

        return CardPoisonEffect;
      }(BuffEffectBase));
      var CardBuffEffect = exports('CardBuffEffect', /*#__PURE__*/function (_ACardEffecter7) {
        _inheritsLoose(CardBuffEffect, _ACardEffecter7);

        function CardBuffEffect() {
          return _ACardEffecter7.apply(this, arguments) || this;
        }

        var _proto9 = CardBuffEffect.prototype;

        _proto9.castEffect = function castEffect() {
          this.me.buff.mod(this.getIntArg(1), this.getIntArg(0));
        };

        _proto9.OnCreate = function OnCreate() {};

        _proto9.OnDispose = function OnDispose() {};

        _createClass(CardBuffEffect, [{
          key: "replacer",
          get: function get() {
            return this.getArg(0);
          }
        }]);

        return CardBuffEffect;
      }(ACardEffecter));
      var CardHandBuffEffect = exports('CardHandBuffEffect', /*#__PURE__*/function (_ACardEffecter8) {
        _inheritsLoose(CardHandBuffEffect, _ACardEffecter8);

        function CardHandBuffEffect() {
          return _ACardEffecter8.apply(this, arguments) || this;
        }

        var _proto10 = CardHandBuffEffect.prototype;

        _proto10.castEffect = function castEffect() {};

        _proto10.OnEnterHand = function OnEnterHand() {
          this.me.buff.mod(this.getIntArg(1), this.getIntArg(0));
        };

        _proto10.OnLeaveHand = function OnLeaveHand() {
          this.me.buff.mod(this.getIntArg(1), -this.getIntArg(0));
        };

        _proto10.OnCreate = function OnCreate() {};

        _proto10.OnDispose = function OnDispose() {};

        _createClass(CardHandBuffEffect, [{
          key: "replacer",
          get: function get() {
            return this.getArg(0);
          }
        }]);

        return CardHandBuffEffect;
      }(ACardEffecter));
      var CardBuffScaleEffect = exports('CardBuffScaleEffect', /*#__PURE__*/function (_ACardEffecter9) {
        _inheritsLoose(CardBuffScaleEffect, _ACardEffecter9);

        function CardBuffScaleEffect() {
          return _ACardEffecter9.apply(this, arguments) || this;
        }

        var _proto11 = CardBuffScaleEffect.prototype;

        _proto11.castEffect = function castEffect() {
          var scale = this.getIntArg(0);
          var buffId = this.getIntArg(1);
          var targets = this.seek(this.getIntArg(2));
          targets.forEach(function (t) {
            var buffNum = t.buff.numOf(buffId);

            if (buffNum != 0) {
              var modNum = floorToZero(buffNum * scale / 100);
              if (modNum != 0) t.buff.mod(buffId, modNum);
            }
          });
        };

        _proto11.OnCreate = function OnCreate() {};

        _proto11.OnDispose = function OnDispose() {};

        _createClass(CardBuffScaleEffect, [{
          key: "replacer",
          get: function get() {
            return "";
          }
        }]);

        return CardBuffScaleEffect;
      }(ACardEffecter));
      var CardRmdebuffEffect = exports('CardRmdebuffEffect', /*#__PURE__*/function (_ACardEffecter10) {
        _inheritsLoose(CardRmdebuffEffect, _ACardEffecter10);

        function CardRmdebuffEffect() {
          return _ACardEffecter10.apply(this, arguments) || this;
        }

        var _proto12 = CardRmdebuffEffect.prototype;

        _proto12.castEffect = function castEffect() {
          var _this7 = this;

          this.seek(this.getIntArg(0)).forEach(function ($) {
            $.buff.rmDebuff(_this7.fightcard.info.name);
          });
        };

        _proto12.OnCreate = function OnCreate() {};

        _proto12.OnDispose = function OnDispose() {};

        _createClass(CardRmdebuffEffect, [{
          key: "replacer",
          get: function get() {
            return "";
          }
        }]);

        return CardRmdebuffEffect;
      }(ACardEffecter));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardId.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('CardId', void 0);

      cclegacy._RF.push({}, "65e2264SXVNl5HIdWJU4a52", "CardId", undefined);
      /** 前两个字全拼，之后的简写 */


      var CardId; // #endregion

      (function (CardId) {
        CardId[CardId["Ciji"] = 1000] = "Ciji";
        CardId[CardId["Mengji"] = 1001] = "Mengji";
        CardId[CardId["Huikan"] = 1002] = "Huikan";
        CardId[CardId["Juhe"] = 1100] = "Juhe";
        CardId[CardId["Huishout"] = 1102] = "Huishout";
        CardId[CardId["Feiti"] = 1104] = "Feiti";
        CardId[CardId["Xuezhan"] = 1200] = "Xuezhan";
        CardId[CardId["Luanwu"] = 1201] = "Luanwu";
        CardId[CardId["Fenliyj"] = 1202] = "Fenliyj";
        CardId[CardId["Touxi"] = 1203] = "Touxi";
        CardId[CardId["Zhongzhan"] = 1204] = "Zhongzhan";
        CardId[CardId["Duren"] = 1205] = "Duren";
        CardId[CardId["Dunji"] = 1206] = "Dunji";
        CardId[CardId["Touchui"] = 1207] = "Touchui";
        CardId[CardId["Tunshi"] = 1208] = "Tunshi";
        CardId[CardId["Ruodiangj"] = 1209] = "Ruodiangj";
        CardId[CardId["Zhaojia"] = 2000] = "Zhaojia";
        CardId[CardId["Jianshou"] = 2001] = "Jianshou";
        CardId[CardId["Shuangmianj"] = 2100] = "Shuangmianj";
        CardId[CardId["Zashua"] = 2200] = "Zashua";
        CardId[CardId["Yuanjun"] = 2201] = "Yuanjun";
        CardId[CardId["Huoyanj"] = 2202] = "Huoyanj";
        CardId[CardId["Pingzhang"] = 2203] = "Pingzhang";
        CardId[CardId["Toudu"] = 3100] = "Toudu";
        CardId[CardId["Konghe"] = 3101] = "Konghe";
        CardId[CardId["Ruodianxz"] = 3102] = "Ruodianxz";
        CardId[CardId["Sanzhis"] = 3103] = "Sanzhis";
        CardId[CardId["Fanzhao"] = 3104] = "Fanzhao";
        CardId[CardId["Yinren"] = 3200] = "Yinren";
        CardId[CardId["Cuihua"] = 3201] = "Cuihua";
        CardId[CardId["Dongcha"] = 3202] = "Dongcha";
        CardId[CardId["Jiaoxie"] = 3203] = "Jiaoxie";
        CardId[CardId["Baozashk"] = 3205] = "Baozashk";
        CardId[CardId["Tudu"] = 3206] = "Tudu";
        CardId[CardId["Duyaop"] = 3207] = "Duyaop";
        CardId[CardId["Juejing"] = 3208] = "Juejing";
        CardId[CardId["Wenyi"] = 3300] = "Wenyi";
        CardId[CardId["Shengguang"] = 3301] = "Shengguang";
        CardId[CardId["Jisi"] = 3302] = "Jisi";
        CardId[CardId["Yinian"] = 3303] = "Yinian";
        CardId[CardId["Shenshangxs"] = 3304] = "Shenshangxs";
        CardId[CardId["Dutu"] = 3305] = "Dutu";
        CardId[CardId["Bianta"] = 4100] = "Bianta";
        CardId[CardId["Jingjij"] = 4200] = "Jingjij";
        CardId[CardId["Yuxue"] = 4201] = "Yuxue";
        CardId[CardId["Shaowei"] = 4202] = "Shaowei";
        CardId[CardId["Qiegq"] = 4203] = "Qiegq";
        CardId[CardId["Gushou"] = 4300] = "Gushou";
        CardId[CardId["Gaonengdb"] = 4301] = "Gaonengdb";
        CardId[CardId["Duyun"] = 4302] = "Duyun";
        CardId[CardId["Meihuo"] = 5000] = "Meihuo";
        CardId[CardId["Shangkou"] = 5001] = "Shangkou";
        CardId[CardId["Zhuoshao"] = 5002] = "Zhuoshao";
        CardId[CardId["Tuifei"] = 5003] = "Tuifei";
        CardId[CardId["Huihen"] = 5004] = "Huihen";
        CardId[CardId["Gelie"] = 5005] = "Gelie";
      })(CardId || (CardId = exports('CardId', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardIntroDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CardListItemWrap.ts', './DlgBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, CardListItemWrap, DlgBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      CardListItemWrap = module.default;
    }, function (module) {
      DlgBase = module.DlgBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "78916X29w9GvJ6QnFHJ/8uo", "CardIntroDlg", undefined);

      var CardIntroDlg = exports('CardIntroDlg', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(CardIntroDlg, _DlgBase);

        function CardIntroDlg() {
          return _DlgBase.apply(this, arguments) || this;
        }

        var _proto = CardIntroDlg.prototype;

        _proto.setup = function setup(c) {
          this.wrap(CardListItemWrap, "card").refresh({
            id: c
          }, 0);
        };

        _proto.OnInit = function OnInit() {};

        _createClass(CardIntroDlg, [{
          key: "dlgRes",
          get: function get() {
            return "CardIntroDlg";
          }
        }]);

        return CardIntroDlg;
      }(DlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Util.ts', './tc.ts', './CardType.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, deepClone, tc, CardType;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      deepClone = module.deepClone;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardType = module.CardType;
    }],
    execute: function () {
      exports('CardPropFunc', void 0);

      cclegacy._RF.push({}, "ac26cQngzVDr7Qmmc/qev9Y", "CardItem", undefined);

      var CardPropFunc;

      (function (CardPropFunc) {
        CardPropFunc["hit"] = "hit";
        CardPropFunc["power"] = "power";
        CardPropFunc["fragile"] = "fragile";
        CardPropFunc["shiled"] = "shiled";
        CardPropFunc["weak"] = "weak";
        CardPropFunc["draw"] = "draw";
        CardPropFunc["hurt"] = "hurt";
        CardPropFunc["recover"] = "recover";
        CardPropFunc["energy"] = "energy";
        CardPropFunc["buff"] = "buff";
        CardPropFunc["poison"] = "poison";
        CardPropFunc["handbuff"] = "handbuff";
        CardPropFunc["giddy"] = "giddy";
        CardPropFunc["buffscale"] = "buffscale";
        CardPropFunc["val"] = "val";
        CardPropFunc["rmdebuff"] = "rmdebuff";
      })(CardPropFunc || (CardPropFunc = exports('CardPropFunc', {})));

      var CardItem = exports('default', /*#__PURE__*/function () {
        function CardItem(_data) {
          var _this = this;

          this._props = void 0;
          this._desc = void 0;
          this._data = _data;
          this._props = [];
          var rawprops = this.rawdesc.match(/(?<=\【)(.+?)(?=\】)/g);
          var desc = deepClone(this.rawdesc);

          if (rawprops) {
            rawprops.forEach(function (rawprop) {
              var _rawprop$split = rawprop.split("("),
                  func = _rawprop$split[0],
                  rawArgs = _rawprop$split[1];

              var args = rawArgs.replace(')', '').split(',');
              rawprop = "\u3010" + rawprop + "\u3011";

              _this._props.push({
                func: func,
                args: args,
                rawprop: rawprop
              });

              desc = desc.replace(rawprop, args[0]);
            });
          }

          this._desc = desc;
        }

        _createClass(CardItem, [{
          key: "id",
          get: function get() {
            return this._data.id;
          }
        }, {
          key: "name",
          get: function get() {
            return this._data.name;
          }
        }, {
          key: "cost",
          get: function get() {
            return this._data.cost;
          }
        }, {
          key: "skin",
          get: function get() {
            return tc.resUrl(this._data.skin);
          }
        }, {
          key: "desc",
          get: function get() {
            return this._desc;
          }
        }, {
          key: "props",
          get: function get() {
            return this._props;
          }
        }, {
          key: "rawdesc",
          get: function get() {
            return this._data.desc;
          }
        }, {
          key: "type",
          get: function get() {
            return this._data.type;
          }
        }, {
          key: "isAttack",
          get: function get() {
            return this.type == CardType.Attack;
          }
        }, {
          key: "isDefend",
          get: function get() {
            return this.type == CardType.Defend;
          }
        }, {
          key: "isAbility",
          get: function get() {
            return this.type == CardType.Ability;
          }
        }, {
          key: "cantUse",
          get: function get() {
            return this.cant_use === 1;
          }
        }, {
          key: "cant_use",
          get: function get() {
            return this._data.cant_use;
          }
        }, {
          key: "rare",
          get: function get() {
            return this.card_rare;
          }
        }, {
          key: "card_rare",
          get: function get() {
            return this._data.card_rare;
          }
        }, {
          key: "isCost",
          get: function get() {
            return this._data.is_cost === 1;
          }
        }, {
          key: "is_cost",
          get: function get() {
            return this._data.is_cost;
          }
        }, {
          key: "order",
          get: function get() {
            return this._data.order;
          }
        }]);

        return CardItem;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardListItem4SaleWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './CardListItemWrap.ts', './DlgKit.ts', './CardIntroDlg.ts', './CardBuyDlg.ts', './ItemFly.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, tc, CardListItemWrap, DlgKit, CardIntroDlg, CardBuyDlg, ItemFly;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardListItemWrap = module.default;
    }, function (module) {
      DlgKit = module.DlgKit;
    }, function (module) {
      CardIntroDlg = module.CardIntroDlg;
    }, function (module) {
      CardBuyDlg = module.CardBuyDlg;
    }, function (module) {
      ItemFly = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "420842mJnFIZ5oK6qCaCjFf", "CardListItem4SaleWrap", undefined);

      var CardListItem4SaleWrap = exports('CardListItem4SaleWrap', /*#__PURE__*/function (_CardListItemWrap) {
        _inheritsLoose(CardListItem4SaleWrap, _CardListItemWrap);

        function CardListItem4SaleWrap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _CardListItemWrap.call.apply(_CardListItemWrap, [this].concat(args)) || this;
          _this._buyBtn = void 0;
          _this._coin = void 0;
          _this._salemodeCtrl = void 0;
          return _this;
        }

        var _proto = CardListItem4SaleWrap.prototype;

        _proto.OnInit = function OnInit() {
          _CardListItemWrap.prototype.OnInit.call(this);

          this._coin = this.getTxt("coin");
          this._salemodeCtrl = this.getController("salemode");
          this._buyBtn = this.getBtn("buy");
          this._salemodeCtrl.selectedIndex = 1;
          this.addBtnEvt(this._buyBtn, this._dealBuy);
        };

        _proto.OnRefresh = function OnRefresh(data, index) {
          _CardListItemWrap.prototype.OnRefresh.call(this, data, index);

          this._coin.text = data.coin.toString();
        };

        _proto._dealBuy = function _dealBuy(e) {
          if (this._salemodeCtrl.selectedIndex == 1) {
            tc.k(DlgKit).fetchDlg(CardBuyDlg).exSetup(this.curData.id, this.curData.coin, this._onSold.bind(this)); // tc.k(DlgKit).fetchDlg(TreasureBuyDlg).setup(this.tid, this._coin, this._onSold.bind(this))
          } else {
            tc.k(DlgKit).fetchDlg(CardIntroDlg).setup(this.curData.id); // TreasureIntroDlg.pop(this.tid);
          }

          e(); // // this._buyBtn.enabled = false;
          // const coin = this.curData.coin;
          // const player = tc.p(PlayerPlay).player;
          // const playerCoin = player.buff.numOf(BuffId.coin);
          // if (playerCoin > coin) {
          //     player.buff.mod(BuffId.coin, -coin);
          //     player.c.get(PlayerCardSetCom).addCard(this.curData.id);
          //     this.fgc.alpha = 0;
          // } else {
          //     TipDlg.pop("金币不足");
          //     // this._buyBtn.enabled = true;
          // }
        };

        _proto._onSold = function _onSold() {
          this._salemodeCtrl.selectedIndex = 2;
          ItemFly.flyCard(0.3, 1, this.curData.id, this.fgc);
        };

        return CardListItem4SaleWrap;
      }(CardListItemWrap));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardListItemWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CardCfg.ts', './ListItem.ts', './CardPlay.ts', './tc.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, Color, CardCfg, ListItem, CardPlay, tc;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
    }, function (module) {
      CardCfg = module.default;
    }, function (module) {
      ListItem = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      tc = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b45ecpiJwNAU4Z7Usy+C1Qu", "CardListItemWrap", undefined);

      var CardListItemWrap = exports('default', /*#__PURE__*/function (_ListItem) {
        _inheritsLoose(CardListItemWrap, _ListItem);

        function CardListItemWrap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ListItem.call.apply(_ListItem, [this].concat(args)) || this;
          _this._nameTxt = void 0;
          _this._skin = void 0;
          _this._frame = void 0;
          _this._cost = void 0;
          _this._desc = void 0;
          _this._isCost = void 0;
          return _this;
        }

        var _proto = CardListItemWrap.prototype; // private _onClickCard: Action1<CardId>;

        _proto.OnInit = function OnInit() {
          this._nameTxt = this.getTxt("name");
          this._skin = this.getLoader("skin");
          this._desc = this.getTxt("desc");
          this._cost = this.getTxt("cost");
          this._isCost = this.getTxt("isCost");
          this._frame = this.getLoader("frame"); // this._onClickCard = null;

          this.addBtnEvt("", this._dealClick);
        };

        _proto.OnRefresh = function OnRefresh(data, index) {
          var cardPlay = tc.p(CardPlay);
          var info = cardPlay.infoOf(data.id);
          this._nameTxt.text = info.name;
          this._skin.url = info.skin;
          this._desc.text = info.desc.replace(/###.*/g, "");
          this._cost.visible = !info.cantUse;
          this._cost.text = info.cost < 0 ? 'X' : '' + info.cost;
          this._isCost.visible = info.isCost;
          this._frame.color = new Color(CardCfg.color[info.rare]);
        };

        _proto._dealClick = function _dealClick(enableBtn) {
          var _this$curData$onClick, _this$curData;

          (_this$curData$onClick = (_this$curData = this.curData).onClick) == null ? void 0 : _this$curData$onClick.call(_this$curData, this.curData.id);
          enableBtn();
        };

        return CardListItemWrap;
      }(ListItem));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardPlay.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs', './Xls.ts', './UserKit.ts', './Util.ts', './tc.ts', './CardId.ts', './CardItem.ts', './CardRare.ts', './DutuCom.ts', './FenliyjCom.ts', './LuanwuCom.ts', './ManyCardsCom.ts', './NormalEffecterCom.ts', './RuodiangjCom.ts', './SeekLogicCom.ts', './TunshiCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, EventTarget, PlayBase, Xls, UserKit, enumValues, pick, tc, CardId, CardItem, CardRare, DutuCom, FenliyjCom, LuanwuCom, TouxiCom, DunjiCom, FanzhaoCom, DongchaCom, DuyaopCardEffect, NormalEffecterCom, RuodiangjCom, SeekChooseOne, SeekEnemys, SeekSelf, SeekRandomEnemy, TunshiCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }, function (module) {
      PlayBase = module.PlayBase;
    }, function (module) {
      Xls = module.default;
    }, function (module) {
      UserKit = module.default;
    }, function (module) {
      enumValues = module.enumValues;
      pick = module.pick;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardId = module.CardId;
    }, function (module) {
      CardItem = module.default;
    }, function (module) {
      CardRare = module.CardRare;
    }, function (module) {
      DutuCom = module.default;
    }, function (module) {
      FenliyjCom = module.default;
    }, function (module) {
      LuanwuCom = module.default;
    }, function (module) {
      TouxiCom = module.TouxiCom;
      DunjiCom = module.DunjiCom;
      FanzhaoCom = module.FanzhaoCom;
      DongchaCom = module.DongchaCom;
      DuyaopCardEffect = module.DuyaopCardEffect;
    }, function (module) {
      NormalEffecterCom = module.default;
    }, function (module) {
      RuodiangjCom = module.default;
    }, function (module) {
      SeekChooseOne = module.SeekChooseOne;
      SeekEnemys = module.SeekEnemys;
      SeekSelf = module.SeekSelf;
      SeekRandomEnemy = module.SeekRandomEnemy;
    }, function (module) {
      TunshiCom = module.default;
    }],
    execute: function () {
      var _CardPlay$_idCard;

      cclegacy._RF.push({}, "ed2b9SNOa9PE7vRBKJ2coIQ", "CardPlay", undefined);

      var CardPlay = exports('default', /*#__PURE__*/function (_PlayBase) {
        _inheritsLoose(CardPlay, _PlayBase);

        function CardPlay() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _PlayBase.call.apply(_PlayBase, [this].concat(args)) || this;
          _this._tmpArr = void 0;
          _this._bluePool = void 0;
          _this._purplePool = void 0;
          _this._cardPool = void 0;
          _this._isChoosing = void 0;
          _this._choosingTarget = void 0;
          _this._cardItemCache = void 0;
          _this._e = void 0;
          _this.playName = "CardPlay";
          return _this;
        }

        var _proto = CardPlay.prototype;

        _proto.OnInit = function OnInit(complete) {
          var _this2 = this;

          this._tmpArr = [];
          this._cardPool = [];
          this._bluePool = [];
          this._purplePool = [];
          enumValues(CardId, "number").filter(function (c) {
            var rare = Xls.cardDatasById[c].card_rare;

            switch (rare) {
              case CardRare.White:
              case CardRare.Green:
                _this2._cardPool.push(c);

                break;

              case CardRare.Blue:
                _this2._bluePool.push(c);

                break;

              case CardRare.Purple:
                _this2._purplePool.push(c);

                break;
            }
          });
          this._cardItemCache = new Map();
          this._e = new EventTarget();
          complete();
        };

        _proto.OnLateInit = function OnLateInit(complete) {
          complete();
        };

        _proto.OnDispose = function OnDispose() {
          this._tmpArr = null;
          this._cardPool = null;
          this._cardItemCache = null;
          this._e = null;
          this._purplePool = null;
          this._bluePool = null;
        };

        _proto.loadUserdata = function loadUserdata() {
          var cardUnlock = tc.k(UserKit).cardUnlock;
          this._cardPool = this._cardPool.concat(cardUnlock);
          this._cardPool = this._cardPool.filter(function (v, i, a) {
            return a.indexOf(v) === i;
          });
        }
        /**解锁卡牌，优先随机解锁蓝色，其次紫色 */
        ;

        _proto.unlockcard = function unlockcard(num) {
          var _this$_cardPool;

          var rlt = [];
          var curSaveUnlock = tc.k(UserKit).cardUnlock;

          var lockingBlue = this._bluePool.filter(function (c) {
            return !curSaveUnlock.includes(c);
          });

          var lockingPurple = this._purplePool.filter(function (c) {
            return !curSaveUnlock.includes(c);
          }); // console.log("lockingBlue", lockingBlue)
          // console.log("lockingPurple", lockingPurple)


          for (var i = 0; i < num; i++) {
            if (lockingBlue.length > 0) {
              var card = pick(lockingBlue);
              lockingBlue.remove(card);
              rlt.push(card);
            } else if (lockingPurple.length > 0) {
              var _card = pick(lockingPurple);

              lockingPurple.remove(_card);
              rlt.push(_card);
            }
          }

          (_this$_cardPool = this._cardPool).push.apply(_this$_cardPool, rlt);

          curSaveUnlock.push.apply(curSaveUnlock, rlt);
          tc.k(UserKit).cardUnlock = curSaveUnlock;
          return rlt;
        };

        _proto.rawInfoOf = function rawInfoOf(id) {
          return Xls.cardDatasById[id];
        };

        _proto.infoOf = function infoOf(id) {
          if (!this._cardItemCache) {
            this._cardItemCache = new Map();
          }

          if (!this._cardItemCache.has(id)) {
            this._cardItemCache.set(id, new CardItem(Xls.cardDatasById[id]));
          }

          return this._cardItemCache.get(id);
        }
        /**根据 id 返回对应的卡牌释放组件 */
        ;

        _proto.getCastComs = function getCastComs(id) {
          return CardPlay._idCard[id];
        };

        _proto.isAttack = function isAttack(cardId) {
          return this.infoOf(cardId).isAttack;
        };

        _proto.isDefend = function isDefend(cardId) {
          return this.infoOf(cardId).isDefend;
        }
        /**
         * 从卡池中随机X张不同的卡牌。（不包含诅咒）
         * @param exclude 
         * @returns 
         */
        ;

        _proto.randomCardsFromPool = function randomCardsFromPool(num, option) {
          if (num < 1) return;
          var exclude = option == null ? void 0 : option.exclude;
          var limitRare = option == null ? void 0 : option.limitRare;
          this._tmpArr = this._cardPool.slice();

          if (limitRare) {
            this._tmpArr = this._tmpArr.filter(function (id) {
              return limitRare.includes(Xls.cardDatasById[id].card_rare);
            });
          }

          if (exclude) {
            this._tmpArr = this._tmpArr.filter(function (id) {
              return !exclude.includes(id);
            });
          }

          var ret = [];

          while (ret.length < num && this._tmpArr.length > 0) {
            var card = pick(this._tmpArr);
            ret.push(card);

            this._tmpArr.remove(card);
          }

          return ret;
        };

        _createClass(CardPlay, [{
          key: "cardPool",
          get: function get() {
            return this._cardPool.slice();
          }
        }, {
          key: "choosingTarget",
          get: function get() {
            return this._choosingTarget;
          },
          set: function set(value) {
            if (this._choosingTarget !== value) {
              this._choosingTarget = value;

              this._e.emit(CardPlay.Events.CHOSSING_TARGET_CHG, this._choosingTarget);
            }
          }
        }, {
          key: "isChoosing",
          get: function get() {
            return this._isChoosing;
          },
          set: function set(value) {
            this._isChoosing = value;
          }
        }, {
          key: "lockingCardNum",
          get: function get() {
            return this._bluePool.length + this._purplePool.length - tc.k(UserKit).cardUnlock.length;
          }
        }, {
          key: "bluePoolSize",
          get: function get() {
            return this._bluePool.length;
          }
        }, {
          key: "purplePoolSize",
          get: function get() {
            return this._purplePool.length;
          }
        }, {
          key: "e",
          get: function get() {
            return this._e;
          }
        }]);

        return CardPlay;
      }(PlayBase));
      CardPlay.Events = {
        CHOSSING_TARGET_CHG: "CHOSSING_TARGET_CHG"
      };
      CardPlay._idCard = (_CardPlay$_idCard = {}, _CardPlay$_idCard[CardId.Ciji] = [NormalEffecterCom, SeekChooseOne], _CardPlay$_idCard[CardId.Huikan] = [NormalEffecterCom, SeekEnemys], _CardPlay$_idCard[CardId.Mengji] = [NormalEffecterCom, SeekChooseOne], _CardPlay$_idCard[CardId.Juhe] = [NormalEffecterCom, SeekChooseOne], _CardPlay$_idCard[CardId.Huishout] = [NormalEffecterCom, SeekChooseOne], _CardPlay$_idCard[CardId.Xuezhan] = [NormalEffecterCom, SeekChooseOne], _CardPlay$_idCard[CardId.Ruodiangj] = [RuodiangjCom, SeekChooseOne], _CardPlay$_idCard[CardId.Tunshi] = [TunshiCom, SeekChooseOne], _CardPlay$_idCard[CardId.Konghe] = [NormalEffecterCom, SeekEnemys], _CardPlay$_idCard[CardId.Fenliyj] = [FenliyjCom, SeekChooseOne], _CardPlay$_idCard[CardId.Zhaojia] = [NormalEffecterCom, SeekEnemys], _CardPlay$_idCard[CardId.Jianshou] = [NormalEffecterCom, SeekEnemys], _CardPlay$_idCard[CardId.Pingzhang] = [NormalEffecterCom, SeekEnemys], _CardPlay$_idCard[CardId.Jisi] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Juejing] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Gushou] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Gaonengdb] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Luanwu] = [LuanwuCom, SeekChooseOne], _CardPlay$_idCard[CardId.Toudu] = [NormalEffecterCom, SeekChooseOne], _CardPlay$_idCard[CardId.Shenshangxs] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Yinren] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Dutu] = [DutuCom, SeekSelf], _CardPlay$_idCard[CardId.Bianta] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Jingjij] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Feiti] = [NormalEffecterCom, SeekChooseOne], _CardPlay$_idCard[CardId.Touxi] = [TouxiCom, SeekChooseOne], _CardPlay$_idCard[CardId.Zhongzhan] = [NormalEffecterCom, SeekChooseOne], _CardPlay$_idCard[CardId.Duren] = [NormalEffecterCom, SeekChooseOne], _CardPlay$_idCard[CardId.Dunji] = [DunjiCom, SeekChooseOne], _CardPlay$_idCard[CardId.Touchui] = [NormalEffecterCom, SeekChooseOne], _CardPlay$_idCard[CardId.Shuangmianj] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Zashua] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Yuanjun] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Huoyanj] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Ruodianxz] = [NormalEffecterCom, SeekEnemys], _CardPlay$_idCard[CardId.Sanzhis] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Fanzhao] = [FanzhaoCom, SeekSelf], _CardPlay$_idCard[CardId.Cuihua] = [NormalEffecterCom, SeekChooseOne], _CardPlay$_idCard[CardId.Dongcha] = [DongchaCom, SeekChooseOne], _CardPlay$_idCard[CardId.Jiaoxie] = [NormalEffecterCom, SeekChooseOne], _CardPlay$_idCard[CardId.Baozashk] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Yinian] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Tudu] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Duyaop] = [DuyaopCardEffect, SeekRandomEnemy], _CardPlay$_idCard[CardId.Wenyi] = [NormalEffecterCom, SeekEnemys], _CardPlay$_idCard[CardId.Shengguang] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Yuxue] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Shaowei] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Qiegq] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Duyun] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Meihuo] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Shangkou] = [SeekSelf], _CardPlay$_idCard[CardId.Zhuoshao] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Tuifei] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Huihen] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard[CardId.Gelie] = [NormalEffecterCom, SeekSelf], _CardPlay$_idCard);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardRare.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('CardRare', void 0);

      cclegacy._RF.push({}, "f5cb9ZdnapCda6Jb6wwxn/e", "CardRare", undefined);

      var CardRare;

      (function (CardRare) {
        CardRare["White"] = "\u767D\u677F";
        CardRare["Green"] = "\u7EFF\u8272";
        CardRare["Blue"] = "\u84DD\u8272";
        CardRare["Purple"] = "\u7D2B\u8272";
        CardRare["Black"] = "\u9ED1\u8272";
      })(CardRare || (CardRare = exports('CardRare', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardRwdDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DlgBase.ts', './DlgKit.ts', './BuffId.ts', './PlayerCardSetCom.ts', './PlayerTreasureCom.ts', './PlayerPlay.ts', './TreasureId.ts', './TreasurePlay.ts', './tc.ts', './PreviewCardWrap.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, DlgBase, DlgKit, BuffId, PlayerCardSetCom, PlayerTreasureCom, PlayerPlay, TreasureId, TreasurePlay, tc, PreviewCardWrap;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgKit = module.DlgKit;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      PlayerCardSetCom = module.PlayerCardSetCom;
    }, function (module) {
      PlayerTreasureCom = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      TreasurePlay = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      PreviewCardWrap = module.PreviewCardWrap;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1ec85VVgxdARKV4fr0Blokj", "CardRwdDlg", undefined);

      var CardRwdDlg = exports('default', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(CardRwdDlg, _DlgBase);

        function CardRwdDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._list = void 0;
          _this._onOver = void 0;
          return _this;
        }

        CardRwdDlg.popRwd = function popRwd(onOver, cards) {
          var dlg = tc.k(DlgKit).fetchDlg(CardRwdDlg);
          dlg._onOver = onOver;

          dlg._showAsReward(cards);
        };

        CardRwdDlg.popView = function popView(title, cards) {
          var dlg = tc.k(DlgKit).fetchDlg(CardRwdDlg);

          dlg._showAsView(title, cards);
        };

        var _proto = CardRwdDlg.prototype;

        _proto.OnInit = function OnInit() {
          var _this2 = this;

          this._list = this.getList("list");
          this._onOver = null;
          this.addBtnEvt("close", function (enableBtn) {
            _this2.close();
          });
        };

        _proto._showAsReward = function _showAsReward(cards) {
          var _this3 = this;

          var pplay = tc.p(PlayerPlay);
          var player = pplay.player;
          var tplay = tc.p(TreasurePlay);
          var hasQiandai = player.c.get(PlayerTreasureCom).has(TreasureId.Qiandai);
          var hasYaogao = player.c.get(PlayerTreasureCom).has(TreasureId.Yaogao);

          if (hasQiandai) {
            var qiandai = tplay.infoOf(TreasureId.Qiandai);
            var qiandaiCoin = qiandai.getIntVal('coin');
            var qiandaiBtn = this.getBtn('gaincoin');
            qiandaiBtn.visible = true;
            qiandaiBtn.text = "\u8DF3\u8FC7\u5E76\u83B7\u5F97" + qiandaiCoin + "\u679A\u91D1\u5E01";
            this.addBtnEvt(qiandaiBtn, function (enableBtn) {
              tplay.pop(TreasureId.Qiandai);
              player.buff.mod(BuffId.coin, qiandaiCoin);

              _this3.close();
            });
          }

          if (hasYaogao) {
            var yaogao = tplay.infoOf(TreasureId.Yaogao);
            var yaogaoRecvoer = yaogao.getIntVal('recover');
            var yaogaoBtn = this.getBtn('recover');
            yaogaoBtn.visible = true;
            yaogaoBtn.text = "\u8DF3\u8FC7\u5E76\u6062\u590D" + yaogaoRecvoer + "\u70B9\u751F\u547D";
            this.addBtnEvt(yaogaoBtn, function (enableBtn) {
              tplay.pop(TreasureId.Yaogao);
              player.recoverHp(yaogaoRecvoer, yaogao.name);

              _this3.close();
            });
          }

          cards.forEach(function (card, idx) {
            var item = _this3._list.addItemFromPool();

            var wrap = _this3.wrap(PreviewCardWrap, item);

            wrap.showCard(card, function (id) {
              tc.p(PlayerPlay).player.c.get(PlayerCardSetCom).addCard(id);

              _this3.close();
            });
          });
        };

        _proto._showAsView = function _showAsView(title, cards) {
          var _this4 = this;

          this.getTxt('title').text = title;
          this.getBtn('close').text = "确认";
          cards.forEach(function (card, idx) {
            var item = _this4._list.addItemFromPool();

            var wrap = _this4.wrap(PreviewCardWrap, item);

            wrap.showCard(card);
          });
        };

        _proto.OnClose = function OnClose() {
          var _this$_onOver;

          (_this$_onOver = this._onOver) == null ? void 0 : _this$_onOver.call(this);
        };

        _proto.OnBgClickClose = function OnBgClickClose() {
          return false;
        };

        _createClass(CardRwdDlg, [{
          key: "dlgRes",
          get: function get() {
            return "CardRwdDlg";
          }
        }]);

        return CardRwdDlg;
      }(DlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardSetDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui-ccc370.mjs', './DlgBase.ts', './DlgKit.ts', './ListWrap.ts', './UIDocker.ts', './CardPlay.ts', './tc.ts', './CardListItemWrap.ts', './GMDlg.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, ListSelectionMode, DlgBase, DlgKit, DlgLayer, ListWrap, UIDocker, CardPlay, tc, CardListItemWrap, CardGMDlg;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ListSelectionMode = module.ListSelectionMode;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgKit = module.DlgKit;
      DlgLayer = module.DlgLayer;
    }, function (module) {
      ListWrap = module.default;
    }, function (module) {
      UIDocker = module.UIDocker;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardListItemWrap = module.default;
    }, function (module) {
      CardGMDlg = module.CardGMDlg;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7dd4biruZ1JHam4Pz9DRHws", "CardSetDlg", undefined);

      var CardSetDlg = exports('default', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(CardSetDlg, _DlgBase);

        function CardSetDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._gm = void 0;
          return _this;
        }

        CardSetDlg.pop = function pop(cards, byOrder) {
          if (byOrder === void 0) {
            byOrder = true;
          }

          if (byOrder) {
            var cplay = tc.p(CardPlay);
            cards = cards.slice().sort(function (a, b) {
              return cplay.rawInfoOf(a).order - cplay.rawInfoOf(b).order;
            });
          }

          var dlg = tc.k(DlgKit).fetchDlg(CardSetDlg);

          dlg._setCards(cards);

          return dlg;
        };

        CardSetDlg.popWithGM = function popWithGM(cards, byOrder) {
          if (byOrder === void 0) {
            byOrder = true;
          }

          var dlg = this.pop(cards, byOrder);

          dlg._showGM();

          return dlg;
        };

        var _proto = CardSetDlg.prototype;

        _proto.OnInit = function OnInit() {
          var _this2 = this;

          this.dock(UIDocker.Dock.Bottom);
          this._gm = this.getBtn('gm');
          this.getController('scene').setSelectedPage("view");
          this.getList("list").selectionMode = ListSelectionMode.None;
          this.addBtnEvt("back", function () {
            _this2.close();
          });
          this.addBtnEvt(this._gm, function (enbalbeBtn) {
            CardGMDlg.pop();
            enbalbeBtn();
          });
        };

        _proto._showGM = function _showGM() {
          this._gm.visible = true;
        };

        _proto._setCards = function _setCards(cards) {
          var listWrap = this.wrap(ListWrap, "list");
          listWrap.initList(CardListItemWrap, cards.map(function (id) {
            return {
              id: id
            };
          }));
        };

        _proto.OnGetBgAlpha = function OnGetBgAlpha() {
          return 0.7;
        };

        _createClass(CardSetDlg, [{
          key: "dlgRes",
          get: function get() {
            return "CardSetDlg";
          }
        }, {
          key: "dlgLayer",
          get: function get() {
            return DlgLayer.Front;
          }
        }]);

        return CardSetDlg;
      }(DlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardType.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('CardType', void 0);

      cclegacy._RF.push({}, "561b1rPUz9NVoGnaRYL8v8z", "CardType", undefined);
      /** 卡牌类别 */


      var CardType;

      (function (CardType) {
        CardType["Attack"] = "\u653B\u51FB";
        CardType["Defend"] = "\u9632\u5FA1";
        CardType["Skill"] = "\u6280\u80FD";
        CardType["Ability"] = "\u80FD\u529B";
        CardType["Curse"] = "\u8BC5\u5492";
      })(CardType || (CardType = exports('CardType', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ChaoqiangllBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './NpcBuffCom.ts', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, NpcBuffCom, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      NpcBuffCom = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7ee9cjHKYpLpZxpuUB+1QKD", "ChaoqiangllBuff", undefined);

      var ChaoqiangllBuff = exports('default', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(ChaoqiangllBuff, _ATreasureBuffCom);

        function ChaoqiangllBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = ChaoqiangllBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.HandCardIn, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HandCardIn) {
            this.buff.owner.c.get(NpcBuffCom).mod(BuffId.power, 99);
            this.popWrap();
          }
        };

        _createClass(ChaoqiangllBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Liliangsq;
          }
        }]);

        return ChaoqiangllBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ChuangshangBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CardId.ts', './PlayerFightCardCom.ts', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, CardId, PlayerFightCardCom, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      CardId = module.CardId;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b15efva0CdG/Ycl8fZDiSoE", "ChuangshangBuffCom", undefined);

      var ChuangshangBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(ChuangshangBuffCom, _ABuffCom);

        function ChuangshangBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = ChuangshangBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.HurtOther, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HurtOther) {
            if (arg.hurtTarget.info.isPlayer) {
              var _arg$hurtTarget$c$get, _arg$hurtTarget$c$get2;

              (_arg$hurtTarget$c$get = arg.hurtTarget.c.get(PlayerFightCardCom)) == null ? void 0 : _arg$hurtTarget$c$get.addCard2Draw(CardId.Shangkou);
              (_arg$hurtTarget$c$get2 = arg.hurtTarget.c.get(PlayerFightCardCom)) == null ? void 0 : _arg$hurtTarget$c$get2.addCard2Draw(CardId.Shangkou);
            }
          }
        };

        return ChuangshangBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ChujueAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './BuffId.ts', './NpcPropFunc.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, BuffId, NpcPropFunc, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8242bkXfkVEzIBcJ3W7OHQb", "ChujueAct", undefined);

      var ChujueAct = exports('ChujueAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(ChujueAct, _ActBase);

        function ChujueAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = ChujueAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.attack,
            iconTip: '' + this.actualdmg,
            title: "处决",
            content: "\u8FD9\u540D\u654C\u4EBA\u5C06\u8981\u653B\u51FB\u9020\u6210" + this.actualdmg + "\u70B9\u4F24\u5BB3"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.attack_act_byatk_over(function () {
            _this.target.getHit(_this.actualdmg, _this.actor, "ChujueAct");

            _this.actor.buff.rm(BuffId.ChujueBj);
          }, onOver);
        };

        _createClass(ChujueAct, [{
          key: "actualdmg",
          get: function get() {
            return this.calcDmg(parseInt(this.getProp(NpcPropFunc.chujue).args[0]));
          }
        }]);

        return ChujueAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ChujueCfq.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './NpcAICom.ts', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts', './BuffPlay.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, tc, NpcAICom, ABuffCom, BuffId, BuffNS, BuffPlay;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      NpcAICom = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }, function (module) {
      BuffPlay = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8a9c5UFCzBLy4Zm/jOzjY92", "ChujueCfq", undefined);

      var ChujueCfq = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(ChujueCfq, _ABuffCom);

        function ChujueCfq() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ABuffCom.call.apply(_ABuffCom, [this].concat(args)) || this;
          _this._costA = void 0;
          _this._costB = void 0;
          return _this;
        }

        var _proto = ChujueCfq.prototype;

        _proto.OnInit = function OnInit() {
          this._costA = false;
          this._costB = false;
          this.setOrder(BuffNS.EffectStage.Hurt, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {
          this._costA = null;
          this._costB = null;
        };

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.Hurt) {
            var hp = this.owner.buff.numOf(BuffId.hp);

            if (!this._costA) {
              if (hp <= this.a) {
                if (!this.owner.buff.isMorethan(BuffId.ChujueBj, 0)) {
                  this.owner.buff.mod(BuffId.ChujueBj, 2, {
                    write: true
                  });
                  this.owner.c.get(NpcAICom).refreshAction();
                }

                this._costA = true;
              }
            }

            if (!this._costB) {
              if (hp <= this.b) {
                if (!this.owner.buff.isMorethan(BuffId.ChujueBj, 0)) {
                  this.owner.buff.mod(BuffId.ChujueBj, 2, {
                    write: true
                  });
                  this.owner.c.get(NpcAICom).refreshAction();
                }

                this._costB = true;
              }
            }
          }
        };

        _createClass(ChujueCfq, [{
          key: "a",
          get: function get() {
            return parseInt(tc.p(BuffPlay).propOf(this.buff.id).a);
          }
        }, {
          key: "b",
          get: function get() {
            return parseInt(tc.p(BuffPlay).propOf(this.buff.id).b);
          }
        }]);

        return ChujueCfq;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ChunqiubBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Util.ts', './tc.ts', './PlayerFightCardCom.ts', './PlayerPlay.ts', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, randomInt, tc, PlayerFightCardCom, PlayerPlay, TreasureId, ATreasureBuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      randomInt = module.randomInt;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8da96lx1dVPaaWp+axenaLL", "ChunqiubBuff", undefined); // 每个回合，随机一张手牌耗能变为0


      var ChunqiubBuff = exports('ChunqiubBuff', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(ChunqiubBuff, _ATreasureBuffCom);

        function ChunqiubBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = ChunqiubBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.HandCardIn, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HandCardIn) {
            var hands = tc.p(PlayerPlay).player.c.get(PlayerFightCardCom).hand.map(function (c) {
              return c;
            }).filter(function (c) {
              return c.cost !== 0;
            }).filter(function (c) {
              return !c.info.cantUse;
            });

            if (hands.length > 0) {
              var card = hands[randomInt(0, hands.length - 1)];
              card.costCom.mod2zero = true;
              this.popWrap();
            }
          }
        };

        _createClass(ChunqiubBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Chunqiub;
          }
        }]);

        return ChunqiubBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CizhenBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './CardPlay.ts', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, tc, CardPlay, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e83b42NrehBKbC16aDxvWEo", "CizhenBuffCom", undefined); // add CizhenZyBuffCom on fight start


      var CizhenSjBuffCom = exports('CizhenSjBuffCom', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(CizhenSjBuffCom, _ATreasureBuffCom);

        function CizhenSjBuffCom() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = CizhenSjBuffCom.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.HandCardIn, BuffNS.EffectOrder.first);
          this.setOrder(BuffNS.EffectStage.LeaveFight, BuffNS.EffectOrder.base);
          this.setOrder(BuffNS.EffectStage.AnyHandCardUsed, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HandCardIn) {
            if (this.actNum == 0) {
              this.owner.buff.mod(BuffId.CizhenZf, this.buff.num, {
                write: true
              });
              this.popWrap();
            }
          }
        };

        _createClass(CizhenSjBuffCom, [{
          key: "tid",
          get: function get() {
            return TreasureId.Cizhen;
          }
        }]);

        return CizhenSjBuffCom;
      }(ATreasureBuffCom)); // next attack card's dmg will be added by layers of this buff

      var CizhenZfBuffCom = exports('CizhenZfBuffCom', /*#__PURE__*/function (_ATreasureBuffCom2) {
        _inheritsLoose(CizhenZfBuffCom, _ATreasureBuffCom2);

        function CizhenZfBuffCom() {
          return _ATreasureBuffCom2.apply(this, arguments) || this;
        }

        var _proto2 = CizhenZfBuffCom.prototype;

        _proto2.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.AnyHandCardUsed, BuffNS.EffectOrder.base);
        };

        _proto2.OnDestory = function OnDestory() {};

        _proto2.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.AnyHandCardUsed) {
            if (tc.p(CardPlay).isAttack(arg.cardUsed)) {
              this.owner.buff.rm(this.buff.id);
              this.popWrap();
            }
          }
        };

        _createClass(CizhenZfBuffCom, [{
          key: "tid",
          get: function get() {
            return TreasureId.Cizhen;
          }
        }]);

        return CizhenZfBuffCom;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ClearOnDead.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4d40dWZV2RKC5JhRiwmMJ8w", "ClearOnDead", undefined);

      var ClearOnDead = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(ClearOnDead, _ABuffCom);

        function ClearOnDead() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = ClearOnDead.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {};

        return ClearOnDead;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ClearOnLeaveFight.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6e312V/vVtCaJn6Cseh/mpc", "ClearOnLeaveFight", undefined);

      var ClearOnLeaveFight = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(ClearOnLeaveFight, _ABuffCom);

        function ClearOnLeaveFight() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = ClearOnLeaveFight.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.LeaveFight, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.LeaveFight) {
            this.owner.buff.rm(this.buff.id);
          }
        };

        return ClearOnLeaveFight;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ClearOnNumZero.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "24880uZtjhJlraToPclaqGf", "ClearOnNumZero", undefined);

      var ClearOnNumZero = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(ClearOnNumZero, _ABuffCom);

        function ClearOnNumZero() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = ClearOnNumZero.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {};

        return ClearOnNumZero;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ClearOnRoundStart.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3632ckkoSJBv465e6dmCtKj", "ClearOnRoundStart", undefined);

      var ClearOnRoundStart = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(ClearOnRoundStart, _ABuffCom);

        function ClearOnRoundStart() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = ClearOnRoundStart.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.RoundStart, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage === BuffNS.EffectStage.RoundStart) {
            this.owner.buff.rm(this.buff.id);
          }
        };

        return ClearOnRoundStart;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CoinBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlayerExploreCom.ts', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PlayerExploreCom, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlayerExploreCom = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a01e8ELK+NBaJsq3yl5KikF", "CoinBuff", undefined);

      var CoinBuff = exports('CoinBuff', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(CoinBuff, _ABuffCom);

        function CoinBuff() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ABuffCom.call.apply(_ABuffCom, [this].concat(args)) || this;
          _this._pExp = void 0;
          return _this;
        }

        var _proto = CoinBuff.prototype;

        _proto.OnInit = function OnInit() {
          this._pExp = this.owner.c.get(PlayerExploreCom);
          this.setOrder(BuffNS.EffectStage.OnAdd, BuffNS.EffectOrder.base);
          this.setOrder(BuffNS.EffectStage.OnRenew, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.OnAdd || stage == BuffNS.EffectStage.OnRenew) {
            var max = Math.max(this._pExp.maxCoin, this.buff.num);

            if (max != this._pExp.maxCoin) {
              this._pExp.maxCoin = max;
              console.log("udpate...");
            }
          }
        };

        return CoinBuff;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CoinRwdDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DlgBase.ts', './DlgKit.ts', './BuffId.ts', './PlayerPlay.ts', './tc.ts', './TipDlg.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, DlgBase, DlgKit, BuffId, PlayerPlay, tc, TipDlg;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgKit = module.DlgKit;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      TipDlg = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c2746B4i65NrZZueu0R7n6H", "CoinRwdDlg", undefined);

      var CoinRwdDlg = exports('default', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(CoinRwdDlg, _DlgBase);

        function CoinRwdDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._coin = void 0;
          _this._coinNumText = void 0;
          _this._onConfirm = void 0;
          return _this;
        }

        CoinRwdDlg.pop = function pop(coin, onConfirm) {
          var dlg = tc.k(DlgKit).fetchDlg(CoinRwdDlg);

          dlg._setData(coin, onConfirm);

          return dlg;
        };

        var _proto = CoinRwdDlg.prototype;

        _proto.OnInit = function OnInit() {
          var _this2 = this;

          this._coinNumText = this.getTxt("coinnum");
          this.addBtnEvt('confirm', function (enableBtn) {
            var player = tc.p(PlayerPlay).player;
            TipDlg.pop("此处应有一个撒金币动画");

            _this2.addDelay(1, function () {
              player.buff.mod(BuffId.coin, _this2._coin);

              _this2.close();

              _this2._onConfirm == null ? void 0 : _this2._onConfirm();
            });
          });
        };

        _proto._setData = function _setData(coin, onConfirm) {
          this._coin = coin;
          this._coinNumText.text = coin + "\u679A\u91D1\u5E01";
          this._onConfirm = onConfirm;
        };

        _proto.OnBgClickClose = function OnBgClickClose() {
          return false;
        };

        _createClass(CoinRwdDlg, [{
          key: "dlgRes",
          get: function get() {
            return "CoinRwdDlg";
          }
        }]);

        return CoinRwdDlg;
      }(DlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CollecterBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlayerExploreCom.ts', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PlayerExploreCom, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlayerExploreCom = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "99febgFL81HkLsjexgWuSFt", "CollecterBuff", undefined);

      var CollecterBuff = exports('CollecterBuff', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(CollecterBuff, _ABuffCom);

        function CollecterBuff() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ABuffCom.call.apply(_ABuffCom, [this].concat(args)) || this;
          _this._pExp = void 0;
          return _this;
        }

        var _proto = CollecterBuff.prototype;

        _proto.OnInit = function OnInit() {
          this._pExp = this.owner.c.get(PlayerExploreCom);
          this.setOrder(BuffNS.EffectStage.HurtOther, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HurtOther) {
            var max = Math.max(this._pExp.maxHurt, arg.hurt);

            if (max != this._pExp.maxHurt) {
              this._pExp.maxHurt = max;
              console.log("colectore update...");
            }
          }
        };

        return CollecterBuff;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ComModule.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "16317FKPVlGkpRymR5um6PJ", "ComModule", undefined);
      /**一个组件模块。把它作为成员，你就可以拥有组件了！ */


      var ComModule = exports('ComModule', /*#__PURE__*/function () {
        function ComModule() {
          this._comList = void 0;
          this._rmLock = void 0;
          this._comList = [];
          this._rmLock = false;
        }
        /**
         * 获取对应组件
         * @param type
         * @returns
         */


        var _proto = ComModule.prototype;

        _proto.get = function get(type) {
          for (var index = 0; index < this._comList.length; index++) {
            var com = this._comList[index];

            if (com instanceof type) {
              return com;
            }
          }

          return null;
        }
        /**
         * 增加对应组件
         * @param type
         * @returns
         */
        ;

        _proto.add = function add(type) {
          var com = new type();

          this._comList.push(com);

          return com;
        }
        /**
         * 移除对应组件
         * @param type 
         */
        ;

        _proto.rm = function rm(type) {
          if (this._rmLock) throw "rmCom locking";

          var index = this._comList.findIndex(function (com) {
            return com instanceof type;
          });

          if (index > -1) {
            this._comList.splice(index, 1);
          }
        }
        /**
         * 遍历所有组件。
         * @param walk 遍历方法，期间不能 rmCom。
         */
        ;

        _proto.each = function each(walk) {
          this._rmLock = true;

          this._comList.forEach(walk);

          this._rmLock = false;
        };

        return ComModule;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Config.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "76cbdfXYz9KV69ycpe815qi", "Config", undefined);

var datas = exports('default', 
{buff:{0: {id:0,name:'test'} } }
);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ConfigTypeDefind.ts", ['cc'], function () {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "90a00czpsxMUYFTFNuEqMRH", "ConfigTypeDefind", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DalianBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TimeSys.ts', './tc.ts', './PlayerFightCardCom.ts', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, TimeSys, tc, PlayerFightCardCom, TreasureId, ATreasureBuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TimeSys = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e1a82gLIe5DQZOqK96MrZcR", "DalianBuff", undefined);

      var DalianBuff = exports('DalianBuff', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(DalianBuff, _ATreasureBuffCom);

        function DalianBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = DalianBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.AnyHandCardUsed, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          var _this = this;

          if (stage == BuffNS.EffectStage.AnyHandCardUsed) {
            var fcc = this.owner.c.get(PlayerFightCardCom);
            tc.s(TimeSys).nextFrame(function () {
              if (fcc.hand.length < 1) {
                fcc.wrapdraw(1);

                _this.popWrap();
              }
            });
          }
        };

        _createClass(DalianBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Dalian;
          }
        }]);

        return DalianBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DalilAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './BuffId.ts', './NpcPropFunc.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, BuffId, NpcPropFunc, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0f7bev4O9lIJ4PXugVQvcPg", "DalilAct", undefined);

      var DalilAct = exports('DalilAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(DalilAct, _ActBase);

        function DalilAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = DalilAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.tactics,
            iconTip: '',
            title: "大力量",
            content: "\u8FD9\u540D\u654C\u4EBA\u5C06\u8981\u8D4B\u4E88\u81EA\u5DF1" + this.power + "\u5C42\u529B\u91CF"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.skill_act_over(function () {
            _this.actor.buff.mod(BuffId.power, _this.power);
          }, onOver);
        };

        _createClass(DalilAct, [{
          key: "power",
          get: function get() {
            return parseInt(this.getProp(NpcPropFunc.dali).args[0]);
          }
        }]);

        return DalilAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Debuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6be5exgHl1Am75KLTuS0kCI", "Debuff", undefined);
      /**减益效果标记 */


      var Debuff = exports('Debuff', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(Debuff, _ABuffCom);

        function Debuff() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = Debuff.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {};

        return Debuff;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DecOnRoundEnd.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "88809fv1WJKq7Fnf3hPKwlU", "DecOnRoundEnd", undefined);

      var DecOnRoundEnd = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(DecOnRoundEnd, _ABuffCom);

        function DecOnRoundEnd() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = DecOnRoundEnd.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.RoundEnd, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage === BuffNS.EffectStage.RoundEnd) {
            this.owner.buff.mod(this.buff.id, -1);
          }
        };

        return DecOnRoundEnd;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DecOnRoundStart.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5c3e1h1B6xFSo2gnRb86SvL", "DecOnRoundStart", undefined);

      var DecOnRoundStart = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(DecOnRoundStart, _ABuffCom);

        function DecOnRoundStart() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = DecOnRoundStart.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.RoundStart, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage === BuffNS.EffectStage.RoundStart) {
            this.owner.buff.mod(this.buff.id, -1);
          }
        };

        return DecOnRoundStart;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DlgBase.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui-ccc370.mjs', './tc.ts', './DlgKit.ts', './UIBase.ts', './UIDocker.ts', './Util.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, Color, GLoader, LoaderFillType, GGraph, tc, DlgLayer, DlgKit, UIBase, UIDocker, deepClone;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
    }, function (module) {
      GLoader = module.GLoader;
      LoaderFillType = module.LoaderFillType;
      GGraph = module.GGraph;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      DlgLayer = module.DlgLayer;
      DlgKit = module.DlgKit;
    }, function (module) {
      UIBase = module.default;
    }, function (module) {
      UIDocker = module.UIDocker;
    }, function (module) {
      deepClone = module.deepClone;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0bb65XpL9ZA8qHVXUnY2BDz", "DlgBase", undefined);

      var DockCompleteDo;

      (function (DockCompleteDo) {
        DockCompleteDo[DockCompleteDo["None"] = 0] = "None";
        DockCompleteDo[DockCompleteDo["Hide"] = 1] = "Hide";
        DockCompleteDo[DockCompleteDo["Close"] = 2] = "Close";
      })(DockCompleteDo || (DockCompleteDo = {}));

      var DlgBase = exports('DlgBase', /*#__PURE__*/function (_UIBase) {
        _inheritsLoose(DlgBase, _UIBase);

        function DlgBase() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIBase.call.apply(_UIBase, [this].concat(args)) || this;
          _this._bg = null;
          _this._docker = void 0;
          _this._isClosing = void 0;
          _this._internal_isShow = void 0;
          return _this;
        }

        var _proto = DlgBase.prototype;

        _proto.init = function init(fgc) {
          _UIBase.prototype.init.call(this, fgc);

          this._isClosing = false;
          this._internal_isShow = true;
          this.node.name = this.dlgRes;

          this._initBlackGraph();

          this._initCloseButton();

          this.OnInit();
        };

        _proto.show = function show() {
          if (this._internal_isShow) return;
          if (this.isClosed || this.isClosing) return;

          _UIBase.prototype.show.call(this);

          this._bg && (this._bg.visible = true);

          this._dockOut();

          this._internal_isShow = true;
        };

        _proto.hide = function hide() {
          if (!this._internal_isShow) return;
          if (this.isClosed || this.isClosing) return;

          this._dockBack(DockCompleteDo.Hide);

          this._internal_isShow = false;
        };

        _proto._internal_hide = function _internal_hide() {
          _UIBase.prototype.hide.call(this);

          this._bg && (this._bg.visible = false);
        };

        _proto._initCloseButton = function _initCloseButton() {
          var closeBtn = this.getChild(DlgBase.SystemCtrl.CloseButton);

          if (closeBtn) {
            closeBtn.onClick(this.close, this);
          }
        };

        _proto._initBlackGraph = function _initBlackGraph() {
          var _this2 = this;

          var blackGraph = this.getChild(DlgBase.SystemCtrl.BlackGraph);

          if (!blackGraph) {
            var bgAlpha = Math.floor(this.OnGetBgAlpha() * 255);

            if (bgAlpha > 0) {
              var bgType = this.OnGetBgType();

              if (bgType == "loader") {
                var bg = new GLoader();
                var w = this.fgc.width;
                var h = this.fgc.height;
                bg.setPosition(-w, -h);
                bg.setSize(w * 3, h * 3);
                bg.fill = LoaderFillType.ScaleFree;
                bg.color = new Color(0, 0, 0, bgAlpha);
                bg.url = this.OnGetBgLoaderResUrl();
                bg.touchable = true;
                var rootInParentIndex = this.fgc.parent.getChildIndex(this.fgc);
                this.fgc.parent.addChildAt(bg, rootInParentIndex);
                this.fgc.opaque = false;
                blackGraph = bg;
              } else {
                var _bg = new GGraph();

                var _w = this.fgc.width;
                var _h = this.fgc.height;
                var blackColor = new Color(0, 0, 0, bgAlpha);

                _bg.setPosition(-_w, -_h);

                _bg.setSize(_w * 3, _h * 3);

                _bg.drawRect(0, blackColor, blackColor);

                var _rootInParentIndex = this.fgc.parent.getChildIndex(this.fgc);

                this.fgc.parent.addChildAt(_bg, _rootInParentIndex);
                this.fgc.opaque = false;
                blackGraph = _bg;
              }
            }
          }

          if (blackGraph) {
            blackGraph.onClick(function () {
              if (_this2.OnBgClickClose()) {
                _this2.close();
              }
            }, this);
            this._bg = blackGraph;
          }
        };

        _proto.close = function close() {
          if (this.isClosed || this.isClosing) {
            console.warn("dlg alredy closed.");
            return;
          }

          this._isClosing = true;
          this.fgc.touchable = false;

          this._dockBack(DockCompleteDo.Close);
        }
        /**
        * 启用停靠
        * @param target 停靠执行的ui对象，名字或者对象实例，可选，默认DlgBase.SystemCtrl.Docker
        * @param bg 停靠界面背景对象执行alpha渐变的对象，可选，默认DlgBase.SystemCtrl.Black
        * @param dockPars target停靠参数，默认UIDocker.Dock.Left
        * @param bgDockPars bg停靠参数，默认UIDocker.Dock.Fade
        */
        ;

        _proto.dock = function dock(dockPars, bgDockPars) {
          this._docker = UIDocker.destroy(this._docker);
          dockPars || (dockPars = UIDocker.Dock.Left);
          bgDockPars || (bgDockPars = UIDocker.Dock.Fade);
          var docker = UIDocker.create(this.fgc, dockPars);

          if (this._bg) {
            var bgPars = deepClone(bgDockPars);
            bgPars.out_dur = dockPars.out_dur;
            bgPars.back_dur = dockPars.back_dur;
            var bgdocker = UIDocker.create(this._bg, bgPars);
            docker.take(bgdocker);
          }

          dockPars.pivotX && (this.fgc.pivotX = dockPars.pivotX);
          dockPars.pivotY && (this.fgc.pivotY = dockPars.pivotY);
          this._docker = docker;

          this._dockOut();
        }
        /**
         * 提到最上层
         */
        ;

        _proto.moveToFront = function moveToFront() {
          if (this._bg) {
            this._bg.parent.setChildIndex(this._bg, this._bg.parent.numChildren - 1);
          }

          _UIBase.prototype.moveToFront.call(this);
        };

        _proto._handleDockOver = function _handleDockOver(reverse, completeDo) {
          if (reverse) {
            if (completeDo === DockCompleteDo.Hide) {
              this._internal_hide();
            } else if (completeDo === DockCompleteDo.Close) {
              this._internal_close();
            }
          } else {
            this.OnDockOut();
            this.fgc.touchable = true;
          }
        }
        /**
         * 停靠出来并显示（内部调用）
         */
        ;

        _proto._dockOut = function _dockOut() {
          if (this._docker) {
            this._docker.dockOut(this._handleDockOver.bind(this, false, DockCompleteDo.None));
          } else {
            this._handleDockOver(false, DockCompleteDo.None);
          }
        };

        _proto._dockBack = function _dockBack(completeDo) {
          if (this._docker) {
            this._docker.dockBack(this._handleDockOver.bind(this, true, completeDo));
          } else {
            this._handleDockOver(true, completeDo);
          }
        };

        _proto._internal_close = function _internal_close() {
          console.log(this.dlgRes, "_internal_close");
          this.OnClose();

          _UIBase.prototype.close.call(this);

          if (this._bg) {
            this._bg.dispose();

            this._bg = null;
          }
        }
        /**
         * <To-Override>
         * 弹窗关闭时调用
         */
        ;

        _proto.OnClose = function OnClose() {};
        /**
         * <To-Override>
         * 窗口进入的停靠动画结束
         */


        _proto.OnDockOut = function OnDockOut() {}
        /**
         * 点击背景是否关闭
         */
        ;

        _proto.OnBgClickClose = function OnBgClickClose() {
          return true;
        }
        /**
         * 获取背景透明度，0表示不需要背景
        */
        ;

        _proto.OnGetBgAlpha = function OnGetBgAlpha() {
          return 0.7;
        }
        /**
         * 背景透明度大于0时有效。背景类型
         * @returns "loader" | "graph"
         */
        ;

        _proto.OnGetBgType = function OnGetBgType() {
          return "loader";
        }
        /**
         * 背景类型为 "loader" 时起作用
         * @returns 背景Loader资源路径
         */
        ;

        _proto.OnGetBgLoaderResUrl = function OnGetBgLoaderResUrl() {
          return "ui://9fdeszvrl5pz1c";
        }
        /**
         * <To-override>
         * 弹窗初始化时调用
         */
        ;

        _createClass(DlgBase, [{
          key: "dlgPak",
          get: function get() {
            return "Main";
          }
        }, {
          key: "dlgLayer",
          get: function get() {
            return DlgLayer.Base;
          }
        }, {
          key: "dlgKit",
          get: function get() {
            return tc.k(DlgKit);
          }
        }, {
          key: "isClosing",
          get: function get() {
            return this._isClosing;
          }
        }]);

        return DlgBase;
      }(UIBase));
      DlgBase.SystemCtrl = {
        /**
         * 关闭按钮
         */
        CloseButton: 'sys_closeButton',

        /**
         * 黑色半透明遮罩。如果 dlg 中没有设置，则会自动创建一个。
         */
        BlackGraph: 'sys_black'
      };

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DlgKit.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs', './fairygui-ccc370.mjs', './Util.ts', './FUISys.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, KitBase, GComponent, getEnumName, FUISys;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      KitBase = module.KitBase;
    }, function (module) {
      GComponent = module.GComponent;
    }, function (module) {
      getEnumName = module.getEnumName;
    }, function (module) {
      FUISys = module.FUISys;
    }],
    execute: function () {
      exports('DlgLayer', void 0);

      cclegacy._RF.push({}, "f644dtQ7pBOq6y4AL9zPu4E", "DlgKit", undefined);

      var DlgLayer;

      (function (DlgLayer) {
        DlgLayer[DlgLayer["Background"] = 0] = "Background";
        DlgLayer[DlgLayer["Base"] = 1] = "Base";
        DlgLayer[DlgLayer["Front"] = 2] = "Front";
        DlgLayer[DlgLayer["Topest"] = 3] = "Topest";
        DlgLayer[DlgLayer["GM"] = 4] = "GM";
        DlgLayer[DlgLayer["ItemFly"] = 5] = "ItemFly";
      })(DlgLayer || (DlgLayer = exports('DlgLayer', {})));

      var DlgKit = exports('DlgKit', /*#__PURE__*/function (_KitBase) {
        _inheritsLoose(DlgKit, _KitBase);

        function DlgKit() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _KitBase.call.apply(_KitBase, [this].concat(args)) || this;
          _this.kitName = "DlgKit";
          _this._uiSys = void 0;
          _this._layers = void 0;
          _this._dlgList = void 0;
          return _this;
        }

        var _proto = DlgKit.prototype;

        _proto.OnInit = function OnInit(complete) {
          this._uiSys = this.sys(FUISys);
          this._layers = new Map();
          this._dlgList = [];

          this._getLayer(DlgLayer.Base); // Base层先实例化出来


          complete();
        };

        _proto.OnLateInit = function OnLateInit(complete) {
          complete();
        };

        _proto.OnDispose = function OnDispose() {};

        _proto._getLayer = function _getLayer(layer) {
          if (this._layers.has(layer)) {
            return this._layers.get(layer);
          } else {
            var layerCom = new GComponent();
            layerCom.node.name = getEnumName(DlgLayer, layer);

            this._uiSys.root.addChild(layerCom);

            this._uiSys.root.setChildIndex(layerCom, layer);

            this._layers.set(layer, layerCom);

            return layerCom;
          }
        };

        _proto.fetchDlg = function fetchDlg(dlgCtrlType) {
          for (var index = 0; index < this._dlgList.length; index++) {
            var dlg = this._dlgList[index];

            if (!dlg.isClosed && dlg instanceof dlgCtrlType) {
              return dlg;
            }
          }

          var dlgCtrl = new dlgCtrlType();

          var fgo = this._uiSys.createObject(dlgCtrl.dlgPak, dlgCtrl.dlgRes).asCom;

          console.log("... create dlg 【" + dlgCtrl.dlgRes + "】");

          this._getLayer(dlgCtrl.dlgLayer).addChild(fgo);

          dlgCtrl.init(fgo);

          this._dlgList.push(dlgCtrl);

          return dlgCtrl;
        };

        _proto.closeDlg = function closeDlg(dlgCtrlType) {
          this._dlgList.removeAll(function (dlg) {
            return dlg.isClosed;
          });

          for (var index = 0; index < this._dlgList.length; index++) {
            var dlg = this._dlgList[index];

            if (dlg instanceof dlgCtrlType) {
              dlg.close();
            }
          }
        };

        return DlgKit;
      }(KitBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DutuCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlayerFightCardCom.ts', './AFightCardCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PlayerFightCardCom, AFightCardCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      AFightCardCom = module.AFightCardCom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e7398a+ozVEbazw/2c+NDVb", "DutuCom", undefined);

      var DutuCom = exports('default', /*#__PURE__*/function (_AFightCardCom) {
        _inheritsLoose(DutuCom, _AFightCardCom);

        function DutuCom() {
          return _AFightCardCom.apply(this, arguments) || this;
        }

        var _proto = DutuCom.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnCast = function OnCast() {
          var fcc = this.caster.c.get(PlayerFightCardCom);
          var num = fcc.hand.length;
          fcc.discardAll();
          fcc.wrapdraw(num);
        };

        return DutuCom;
      }(AFightCardCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DuyaopZzBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ee083wZrh9O46QDIaDDejCO", "DuyaopZzBuff", undefined); // 获得中毒效果时，中毒+【num】


      var DuyaopZzBuff = exports('DuyaopZzBuff', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(DuyaopZzBuff, _ATreasureBuffCom);

        function DuyaopZzBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = DuyaopZzBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.listenTo(BuffId.poison);
          this.setOrder(BuffNS.EffectStage.OnListenBuffMod, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.OnListenBuffMod) {
            if (arg.listenBuffId != BuffId.poison) return;

            if (arg.modnum > 0 && arg.log != this.buff.id.toString()) {
              this.owner.buff.mod(BuffId.poison, this.buff.num, {
                log: this.buff.id.toString()
              });
              this.popWrap();
            }
          }
        };

        _createClass(DuyaopZzBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Duyaop;
          }
        }]);

        return DuyaopZzBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DuyunBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts', './BuffPlay.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, tc, ABuffCom, BuffId, BuffNS, BuffPlay;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }, function (module) {
      BuffPlay = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "68f44BAJFVJzYSYVc6CtqLk", "DuyunBuff", undefined);

      var DuyunBuff = exports('DuyunBuff', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(DuyunBuff, _ABuffCom);

        function DuyunBuff() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = DuyunBuff.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.RoundEnd, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          var _this = this;

          if (stage == BuffNS.EffectStage.RoundEnd) {
            var poison = parseInt(tc.p(BuffPlay).propOf(this.buff.id).poison);
            this.owner.info.getLiveEnemys().forEach(function ($) {
              $.buff.mod(BuffId.poison, poison * _this.buff.num);
            });
          }
        };

        return DuyunBuff;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ElangAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AttackAct.ts', './JianxiaoAct.ts', './NpcAIBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AttackAct, JianxiaoAct, NpcAIBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      JianxiaoAct = module.JianxiaoAct;
    }, function (module) {
      NpcAIBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "50317rmzrRHNZ5IDP6qGzvT", "ElangAI", undefined);

      var ElangAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(ElangAI, _NpcAIBase);

        function ElangAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = ElangAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          if (actNum % 2 == 0) {
            return new AttackAct(this.npc);
          } else {
            return new JianxiaoAct(this.npc);
          }
        };

        return ElangAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EmoAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AttackAct.ts', './NpcAIBase.ts', './RongyanAct.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AttackAct, NpcAIBase, RongyanAct;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      NpcAIBase = module.default;
    }, function (module) {
      RongyanAct = module.RongyanAct;
    }],
    execute: function () {
      cclegacy._RF.push({}, "90075MfPNJBRbvzwDHptR6A", "EmoAI", undefined);

      var EmoAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(EmoAI, _NpcAIBase);

        function EmoAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = EmoAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          if (actNum % 2 == 0) {
            return new RongyanAct(this.npc);
          } else {
            return new AttackAct(this.npc);
          }
        };

        return EmoAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EnergyCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "15f76JaCzZKeLrKJtY+Y3Kc", "EnergyCom", undefined);

      var EnergyCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(EnergyCom, _ABuffCom);

        function EnergyCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = EnergyCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.RoundStart, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.RoundStart) {
            var f = this.buff.owner;
            var cur = f.buff.numOf(BuffId.enegy);
            var max = f.buff.numOf(BuffId.maxenegy);

            if (cur < max) {
              f.buff.mod(BuffId.enegy, max, {
                write: true
              });
            }
          }
        };

        return EnergyCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EnergyCostCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Util.ts', './BuffId.ts', './AFightCardCom.ts', './FightCardMsg.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, EventTarget, randomInt, notNull, BuffId, AFightCardCom, FightCardMsg;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }, function (module) {
      randomInt = module.randomInt;
      notNull = module.notNull;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      AFightCardCom = module.AFightCardCom;
    }, function (module) {
      FightCardMsg = module.FightCardMsg;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4f9539Z2hFAZrLZAmq9F3QD", "EnergyCostCom", undefined);

      var EnergyCostCom = exports('default', /*#__PURE__*/function (_AFightCardCom) {
        _inheritsLoose(EnergyCostCom, _AFightCardCom);

        function EnergyCostCom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _AFightCardCom.call.apply(_AFightCardCom, [this].concat(args)) || this;
          _this._mod_zhihuan = void 0;
          _this._mod2zero = void 0;
          _this._e = void 0;

          _this.OnDispose = function () {
            _this._e = null;
            _this._mod_zhihuan = null;
            _this._mod2zero = null;
          };

          return _this;
        }

        var _proto = EnergyCostCom.prototype;

        _proto.OnInit = function OnInit() {
          this._e = new EventTarget();
          this._mod_zhihuan = null;
          this._mod2zero = false;
        };

        _proto.OnCast = function OnCast() {
          if (this.cost > 0) {
            this.caster.buff.mod(BuffId.enegy, -this.cost);
          }

          this._mod2zero = false;
        };

        _proto.OnMsg = function OnMsg(msg) {
          if (this.caster.buff.isMorethan(BuffId.Zhihuan, 0)) {
            if (msg == FightCardMsg.EnterHand || msg == FightCardMsg.Zhihuan) {
              this._mod_zhihuan = randomInt(1, 4);

              this._e.emit(EnergyCostCom.Events.COST_CHANGE);
            }
          }
        };

        _createClass(EnergyCostCom, [{
          key: "e",
          get: function get() {
            return this._e;
          }
        }, {
          key: "mod2zero",
          get: function get() {
            return this._mod2zero;
          },
          set: function set(value) {
            if (value == this._mod2zero) return;
            this._mod2zero = value;

            this._e.emit(EnergyCostCom.Events.COST_CHANGE);
          }
        }, {
          key: "cost",
          get: function get() {
            if (this._mod2zero) return 0;
            if (notNull(this._mod_zhihuan)) return this._mod_zhihuan;
            return Math.max(0, this.fightcard.info.cost);
          }
        }]);

        return EnergyCostCom;
      }(AFightCardCom));
      EnergyCostCom.Events = {
        /**消耗改变 */
        COST_CHANGE: "COST_CHANGE"
      };

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EnterFightFightBuffAdder.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BuffNS.ts', './BaseFightBuffAdder.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, BuffNS, RoundStartFightBuffAdder;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BuffNS = module.BuffNS;
    }, function (module) {
      RoundStartFightBuffAdder = module.RoundStartFightBuffAdder;
    }],
    execute: function () {
      cclegacy._RF.push({}, "dbd508++pNCL6JuYC7+Y47u", "EnterFightFightBuffAdder", undefined);
      /**
       * 战场buff添加器-进入战斗时添加
      // 参数
      //      zyBuffId: 要添加战场buffid
       */


      var EnterFightFightBuffAdder = exports('EnterFightFightBuffAdder', /*#__PURE__*/function (_RoundStartFightBuffA) {
        _inheritsLoose(EnterFightFightBuffAdder, _RoundStartFightBuffA);

        function EnterFightFightBuffAdder() {
          return _RoundStartFightBuffA.apply(this, arguments) || this;
        }

        var _proto = EnterFightFightBuffAdder.prototype;

        _proto.OnSetOrder = function OnSetOrder() {
          this.setOrder(BuffNS.EffectStage.EnterFight, BuffNS.EffectOrder.base);
        };

        _proto.OnEffect = function OnEffect(stage, arg) {
          var f = this.owner.info.fight;

          if (stage == BuffNS.EffectStage.EnterFight) {
            // this._idArr.add(
            f.buff.addBuff(this.zyBuffId, this.buff.num, this.owner, 'enemy'); // );
          }
        };

        return EnterFightFightBuffAdder;
      }(RoundStartFightBuffAdder));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EntryDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DlgBase.ts', './UserKit.ts', './ExplorePlay.ts', './PlayerExploreCom.ts', './PlayerPlay.ts', './ProcessSys.ts', './tc.ts', './AlertDlg.ts', './BrownButtonText.ts', './BgDlg.ts', './GMDlg.ts', './HeroChooseDlg.ts', './TopbarDlg.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, DlgBase, UserKit, UserGameState, ExplorePlay, PlayerExploreCom, PlayerPlay, ProcessSys, tc, AlertDlg, BrownButtonText, Bg, GMDlg, HeroChooseDlg, TopbarDlg;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      UserKit = module.default;
      UserGameState = module.UserGameState;
    }, function (module) {
      ExplorePlay = module.default;
    }, function (module) {
      PlayerExploreCom = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      ProcessSys = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      AlertDlg = module.default;
    }, function (module) {
      BrownButtonText = module.BrownButtonText;
    }, function (module) {
      Bg = module.Bg;
    }, function (module) {
      GMDlg = module.default;
    }, function (module) {
      HeroChooseDlg = module.HeroChooseDlg;
    }, function (module) {
      TopbarDlg = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6303d+WLNdAaK3d0P0e1XoC", "EntryDlg", undefined);

      var EntryDlg = exports('EntryDlg', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(EntryDlg, _DlgBase);

        function EntryDlg() {
          return _DlgBase.apply(this, arguments) || this;
        }

        var _proto = EntryDlg.prototype;

        _proto.OnInit = function OnInit() {
          var _this = this;

          GMDlg.bindGMBtn(this.getBtn('gm')); // this.getController("unfinishGame").setSelectedPage(tc.k(UserKit).gameState != UserGameState.NotStart ? "yes" : "no");
          // this.addBtnEvt('continue', () => {
          //     const state = tc.k(UserKit).gameState;
          //     if (state == UserGameState.Preparing) {
          //         this.dlgKit.fetchDlg(PreparDlg)
          //         this.close();
          //     } else if (state == UserGameState.Exploreing) {
          //         tc.p(PlayerPlay).player.c.get(PlayerSaveCom).load();
          //         this.dlgKit.fetchDlg(TopbarDlg);
          //         this.dlgKit.fetchDlg(ExploreDlg)
          //         this.close();
          //     }
          // })
          // this.addBtnEvt('drop', (enableBtn) => {
          //     AlertDlg.pop({
          //         tip: "你确定放弃当前游戏吗？",
          //         onYes: () => {
          //             tc.k(UserKit).dropgame()
          //             tc.p(PlayerPlay).disposePlayer();
          //             this.getController("unfinishGame").setSelectedPage(tc.k(UserKit).gameState != UserGameState.NotStart ? "yes" : "no");
          //             enableBtn();
          //         },
          //         onNo: () => {
          //             enableBtn();
          //         }
          //     })
          // })

          this.dealNonFinishSave();
          this.addBtnEvt('newgame', function (enableBtn) {
            _this.dlgKit.fetchDlg(HeroChooseDlg);

            enableBtn();
          });
          this.addBtnEvt('exit', function () {
            tc.s(ProcessSys).exit();
          }); // this.addEvt(tc.k(UserKit).e, UserKit.Events.DIAMOND_CHG, () => {
          //     this.getTxt('diamond').setVar('cur', '' + tc.k(UserKit).diamond).flushVars();
          // })
          // this.getTxt('diamond').setVar('cur', '' + tc.k(UserKit).diamond).flushVars();
        };

        _proto.dealNonFinishSave = function dealNonFinishSave() {
          var _this2 = this;

          var state = tc.k(UserKit).gameState;

          if (state != UserGameState.NotStart) {
            AlertDlg.pop({
              tip: "  您有一个未完成的游戏，是否选择继续？",
              onYes: function onYes() {
                var player = tc.p(PlayerPlay).createPlayerFromUserdata();
                TopbarDlg.me.onScene("exploring");

                if (state == UserGameState.FightReawrding) {
                  Bg.me.onScene("fight");
                  tc.p(ExplorePlay).claimFightWinReawrds(function () {
                    tc.p(ExplorePlay).continueExplore();
                  });
                } else if (state == UserGameState.Countering) {
                  // 重新进入对应事件节点
                  Bg.me.onScene("fight");
                  tc.p(ExplorePlay).enterNode(player.c.get(PlayerExploreCom).curStopId);
                }

                _this2.close();
              },
              onNo: function onNo() {
                tc.k(UserKit).dropgame();
              },
              yesText: BrownButtonText.jixu,
              noText: BrownButtonText.fanqi
            });
          }
        };

        _proto.OnGetBgAlpha = function OnGetBgAlpha() {
          return 0;
        };

        _createClass(EntryDlg, [{
          key: "dlgRes",
          get: function get() {
            return "EntryDlg";
          }
        }]);

        return EntryDlg;
      }(DlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EntryPlay.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs', './BgDlg.ts', './EntryDlg.ts', './DlgKit.ts', './tc.ts', './CardPlay.ts', './TreasurePlay.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, PlayBase, Bg, EntryDlg, DlgKit, tc, CardPlay, TreasurePlay;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      PlayBase = module.PlayBase;
    }, function (module) {
      Bg = module.Bg;
    }, function (module) {
      EntryDlg = module.EntryDlg;
    }, function (module) {
      DlgKit = module.DlgKit;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      TreasurePlay = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "67447t5nqhM+6cZ++sP591e", "EntryPlay", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var EntryPlay = exports('EntryPlay', /*#__PURE__*/function (_PlayBase) {
        _inheritsLoose(EntryPlay, _PlayBase);

        function EntryPlay() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _PlayBase.call.apply(_PlayBase, [this].concat(args)) || this;
          _this.playName = "EntryPlay";
          return _this;
        }

        var _proto = EntryPlay.prototype;

        _proto.OnInit = function OnInit(complete) {
          complete();
        };

        _proto.OnLateInit = function OnLateInit(complete) {
          complete();
        };

        _proto.OnDispose = function OnDispose() {};

        _proto.play = function play() {
          tc.p(CardPlay).loadUserdata();
          tc.p(TreasurePlay).loadUserdata();
          this.kit(DlgKit).fetchDlg(Bg);
          this.kit(DlgKit).fetchDlg(EntryDlg);
        };

        return EntryPlay;
      }(PlayBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ExploreCfg.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a1e38e+LMtBUZBwmYqBz8nb", "ExploreCfg", undefined);

      var ExploreCfg = exports('default', {
        mapdotRes: ["Main", "MapStop"],
        maplinedotRes: ["Main", "linedot"],
        // 篝火配置
        fire: {
          //  回复 30% 的血量
          recover: 30
        },
        // 垂直间隙
        ySpace: [300, 500],
        dropTreasure: {
          3: ['普通', '稀有'],
          4: ['稀有', '史诗']
        },
        // 同一组的节点的事件不能重复
        noSameEventIdInGroups: [[11, 21, 31], [12, 22, 32], [61, 71, 81], [62, 72, 82], [111, 121, 131], [112, 122, 132]],
        are3boss: 151,
        // 关卡地图设置
        //  [0] number       节点id`
        //  [1] list<number> 节点前序节点
        //  [2] number       区域id
        //  [3] number|list<list<number>> 关卡类型 见 ExploreEvent.ts
        //          number: 0-6 代表关卡类型
        //          list<list<number>> 关卡类型随机池
        //              [0] number 0-6 代表关卡类型
        //              [1] number 代表权重
        level1: [
        /** 17 关 */
        [171, [161, 162], 4, 5],
        /** 16 关 */
        [161, [151], 4, 0], [162, [151], 4, 1],
        /** 15 关 */
        [151, [141, 142], 3, 4],
        /** 14 关 */
        [141, [131], 3, 1], [142, [132], 3, 0],
        /** 13 关 */
        [131, [121], 3, 2], [132, [122], 3, 2],
        /** 12 关 */
        [121, [111], 3, [[3, 50], [2, 50]]], [122, [112], 3, [[3, 50], [2, 50]]],
        /** 11 关 */
        [111, [101], 3, 2], [112, [101], 3, 2],
        /** 10 关 */
        [101, [91, 92], 2, 4],
        /** 9 关 */
        [91, [81], 2, 0], [92, [82], 2, 1],
        /** 8 关 */
        [81, [71], 2, 2], [82, [72], 2, 2],
        /** 7 关 */
        [71, [61], 2, [[3, 40], [2, 60]]], [72, [62], 2, [[3, 40], [2, 60]]],
        /** 6 关 */
        [61, [51], 2, 2], [62, [51], 2, 2],
        /** 5 关 */
        [51, [41, 42], 1, 4],
        /** 4 关 */
        [41, [31], 1, 1], [42, [32], 1, 0],
        /** 3 关 */
        [31, [21], 1, 2], [32, [22], 1, 2],
        /** 2 关 */
        [21, [11], 1, [[3, 30], [2, 70]]], [22, [12], 1, [[3, 30], [2, 70]]],
        /** 1 关 */
        [11, null, 1, 2], [12, null, 1, 2]]
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ExploreDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DlgBase.ts', './DlgKit.ts', './UIDocker.ts', './tc.ts', './MapWrap.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, DlgBase, DlgKit, DlgLayer, UIDocker, tc, MapWrap;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgKit = module.DlgKit;
      DlgLayer = module.DlgLayer;
    }, function (module) {
      UIDocker = module.UIDocker;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      MapWrap = module.MapWrap;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6a3722Lj1dBU5QextOPsTq9", "ExploreDlg", undefined);

      var ExploreDlg = exports('ExploreDlg', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(ExploreDlg, _DlgBase);

        function ExploreDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._mapWrap = void 0;
          _this._exitCtrl = void 0;
          return _this;
        }

        ExploreDlg.hide = function hide() {
          if (this._me) this._me.hide();
        };

        ExploreDlg.show = function show(scene) {
          this.me.show();
          this.me.refresh(scene);
        };

        ExploreDlg.close = function close() {
          if (this._me) this._me.close();
        };

        var _proto = ExploreDlg.prototype;

        _proto.OnInit = function OnInit() {
          this._exitCtrl = this.getController("exitable");
          this.addBtnEvt("exit", this._onExit);
          this.dock(UIDocker.Dock.Bottom);
          this._mapWrap = this.wrap(MapWrap, "map");
        };

        _proto.refresh = function refresh(scene) {
          if (scene == 'explore') {
            this._exitCtrl.selectedIndex = 1;
          } else {
            this._exitCtrl.selectedIndex = 0;
          }

          this._mapWrap.refresh(scene);

          console.log(scene);
        };

        _proto._onExit = function _onExit(enableBtn) {
          this.hide();
          enableBtn();
        };

        _proto.OnClose = function OnClose() {
          ExploreDlg._me = null;
        };

        _proto.OnGetBgAlpha = function OnGetBgAlpha() {
          return 0.8;
        };

        _proto.OnBgClickClose = function OnBgClickClose() {
          return false;
        };

        _createClass(ExploreDlg, [{
          key: "dlgRes",
          get: function get() {
            return "ExploreDlg";
          }
        }, {
          key: "dlgLayer",
          get: function get() {
            return DlgLayer.Front;
          }
        }], [{
          key: "me",
          get: function get() {
            if (!this._me) {
              this._me = tc.k(DlgKit).fetchDlg(ExploreDlg);
            }

            return this._me;
          }
        }]);

        return ExploreDlg;
      }(DlgBase));
      ExploreDlg._me = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ExploreEvent.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('ExploreEvent', void 0);

      cclegacy._RF.push({}, "c1c54YUjKpAL5YxiIuUE4Yn", "ExploreEvent", undefined);

      var ExploreEvent;

      (function (ExploreEvent) {
        ExploreEvent[ExploreEvent["Fire"] = 0] = "Fire";
        ExploreEvent[ExploreEvent["Shop"] = 1] = "Shop";
        ExploreEvent[ExploreEvent["Fight"] = 2] = "Fight";
        ExploreEvent[ExploreEvent["Pro"] = 3] = "Pro";
        ExploreEvent[ExploreEvent["Boss"] = 4] = "Boss";
        ExploreEvent[ExploreEvent["BigBoss"] = 5] = "BigBoss";
        ExploreEvent[ExploreEvent["Unknwon"] = 6] = "Unknwon";
      })(ExploreEvent || (ExploreEvent = exports('ExploreEvent', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ExploreEventItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ExploreCfg.ts', './Util.ts', './ExploreEvent.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, ExploreCfg, pickWeightsBy, emptyString, ExploreEvent;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ExploreCfg = module.default;
    }, function (module) {
      pickWeightsBy = module.pickWeightsBy;
      emptyString = module.emptyString;
    }, function (module) {
      ExploreEvent = module.ExploreEvent;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7be30Cyp+9F0avQXpqb/QLB", "ExploreEventItem", undefined);
      /**事件内部的 fightwith 数据项目 */


      var ExploreEventItem = exports('ExploreEventItem', /*#__PURE__*/function () {
        function ExploreEventItem(_data) {
          this._type = void 0;
          this._fightWith = void 0;
          this._data = _data;
          if (this._data.id === 0) this._type = ExploreEvent.Fire;else if (this._data.id > 9 && this._data.id < 21) this._type = ExploreEvent.Shop;else {
            switch (this._data.id / 100 >> 0) {
              case 1:
                this._type = ExploreEvent.Fight;
                break;

              case 2:
                this._type = ExploreEvent.Pro;
                break;

              case 3:
                this._type = ExploreEvent.Boss;
                break;

              case 4:
                this._type = ExploreEvent.BigBoss;
                break;

              case 5:
                this._type = ExploreEvent.Unknwon;
                break;

              default:
                console.error("unknown type for id " + this._data.id);
                break;
            }
          }

          if (!emptyString(this.fight_with)) {
            this._fightWith = this.fight_with.split("\n").map(function (line) {
              var _line$split = line.split(" "),
                  npcs = _line$split[0],
                  weight = _line$split[1];

              return {
                npcs: npcs.split(",").map(function (npc) {
                  return parseInt(npc);
                }),
                weight: weight ? parseInt(weight) : 100
              };
            });
          }
        }

        var _proto = ExploreEventItem.prototype;

        _proto.fightWithBySeed = function fightWithBySeed(seed) {
          return this.fightWith[pickWeightsBy(this.fightWith, {
            seed: seed,
            fieldName: "weight"
          })].npcs;
        };

        _createClass(ExploreEventItem, [{
          key: "id",
          get: function get() {
            return this._data.id;
          }
        }, {
          key: "name",
          get: function get() {
            return this._data.name;
          }
        }, {
          key: "type",
          get: function get() {
            return this._type;
          }
        }, {
          key: "weight",
          get: function get() {
            return this._data.weight;
          }
        }, {
          key: "area",
          get: function get() {
            return this._data.area;
          }
        }, {
          key: "fight_with",
          get: function get() {
            return this._data.fight_with;
          }
        }, {
          key: "fightWith",
          get: function get() {
            return this._fightWith;
          }
        }, {
          key: "dropTreasure",
          get: function get() {
            return ExploreCfg.dropTreasure[this._type];
          }
        }]);

        return ExploreEventItem;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ExploreNodeData.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './ExploreEvent.ts', './ExplorePlay.ts', './FightEvent.ts', './FireEvent.ts', './ShopEvent.ts', './UnknwonEvent.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, tc, ExploreEvent, ExplorePlay, FightEvent, FireEvent, ShopEvent, UnknwonEvent;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      ExploreEvent = module.ExploreEvent;
    }, function (module) {
      ExplorePlay = module.default;
    }, function (module) {
      FightEvent = module.FightEvent;
    }, function (module) {
      FireEvent = module.FireEvent;
    }, function (module) {
      ShopEvent = module.ShopEvent;
    }, function (module) {
      UnknwonEvent = module.UnknwonEvent;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b0192kIC79IrbSM/wsw/Wfx", "ExploreNodeData", undefined);

      var ExploreNodeData = exports('default', /*#__PURE__*/function () {
        function ExploreNodeData(id) {
          this._eventId = void 0;
          this._handler = void 0;
          this._eventId = id;
          var eventType = this.info.type;

          if (eventType == ExploreEvent.Fight || eventType == ExploreEvent.Pro || eventType == ExploreEvent.Boss || eventType == ExploreEvent.BigBoss) {
            this._handler = new FightEvent(this);
          } else if (eventType == ExploreEvent.Shop) {
            this._handler = new ShopEvent(this);
          } else if (eventType == ExploreEvent.Fire) {
            this._handler = new FireEvent(this);
          } else if (eventType == ExploreEvent.Unknwon) {
            this._handler = new UnknwonEvent(this);
          }
        }

        var _proto = ExploreNodeData.prototype;

        _proto.exec = function exec() {
          this._handler.exec();
        };

        _createClass(ExploreNodeData, [{
          key: "info",
          get: function get() {
            return tc.p(ExplorePlay).infoOf(this._eventId);
          }
        }]);

        return ExploreNodeData;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ExplorePlay.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs', './Xls.ts', './ExploreCfg.ts', './ExploreDlg.ts', './FireDlg.ts', './PreparDlg.ts', './TopbarDlg.ts', './DlgKit.ts', './UserKit.ts', './YTree.ts', './Util.ts', './tc.ts', './PlayerExploreCom.ts', './PlayerPlay.ts', './TreasureId.ts', './TreasurePlay.ts', './TrueEndPlay.ts', './ExploreEvent.ts', './ExploreEventItem.ts', './ExploreNodeData.ts', './NpcPlay.ts', './FightRwdDlg.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, AsyncTask, PlayBase, Xls, ExploreCfg, ExploreDlg, FireDlg, PreparDlg, TopbarDlg, DlgKit, UserKit, UserGameState, YTreeNode, YTree, pickWeights, pickWeightsBy, randomInt, isNull, tc, PlayerExploreCom, PlayerPlay, TreasureId, TreasurePlay, TrueEndPlay, ExploreEvent, ExploreEventItem, ExploreNodeData, NpcPlay, FightRwdDlg;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AsyncTask = module.AsyncTask;
      PlayBase = module.PlayBase;
    }, function (module) {
      Xls = module.default;
    }, function (module) {
      ExploreCfg = module.default;
    }, function (module) {
      ExploreDlg = module.ExploreDlg;
    }, function (module) {
      FireDlg = module.default;
    }, function (module) {
      PreparDlg = module.PreparDlg;
    }, function (module) {
      TopbarDlg = module.default;
    }, function (module) {
      DlgKit = module.DlgKit;
    }, function (module) {
      UserKit = module.default;
      UserGameState = module.UserGameState;
    }, function (module) {
      YTreeNode = module.YTreeNode;
      YTree = module.YTree;
    }, function (module) {
      pickWeights = module.pickWeights;
      pickWeightsBy = module.pickWeightsBy;
      randomInt = module.randomInt;
      isNull = module.isNull;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      PlayerExploreCom = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      TreasurePlay = module.default;
    }, function (module) {
      TrueEndPlay = module.TrueEndPlay;
    }, function (module) {
      ExploreEvent = module.ExploreEvent;
    }, function (module) {
      ExploreEventItem = module.ExploreEventItem;
    }, function (module) {
      ExploreNodeData = module.default;
    }, function (module) {
      NpcPlay = module.default;
    }, function (module) {
      FightRwdDlg = module.FightRwdDlg;
    }],
    execute: function () {
      cclegacy._RF.push({}, "818277AuoFMPbRaceTY3f37", "ExplorePlay", undefined);

      var ExplorePlay = exports('default', /*#__PURE__*/function (_PlayBase) {
        _inheritsLoose(ExplorePlay, _PlayBase);

        function ExplorePlay() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _PlayBase.call.apply(_PlayBase, [this].concat(args)) || this;
          _this._tree = void 0;
          _this._eventItemCache = void 0;
          _this._eventPool = void 0;
          _this.playName = "ExplorePlay";
          return _this;
        }

        var _proto = ExplorePlay.prototype;

        _proto.OnInit = function OnInit(complete) {
          complete();
        };

        _proto.OnLateInit = function OnLateInit(complete) {
          this._initEventPool();

          complete();
        };

        _proto._initEventPool = function _initEventPool() {
          var _this2 = this;

          this._eventPool = [];
          Xls.eventDatasArray.forEach(function (value, index) {
            // console.log(value);
            var id = value.id;

            var item = _this2.infoOf(id);

            var areaArr = item.area;
            var type = item.type;
            areaArr.forEach(function (area) {
              var poolItem = _this2._eventPool.find(function (i) {
                return i.area == area && i.type == type;
              });

              if (poolItem == null) {
                _this2._eventPool.push({
                  area: area,
                  type: type,
                  list: [{
                    id: id,
                    weight: item.weight
                  }]
                });
              } else {
                poolItem.list.push({
                  id: id,
                  weight: item.weight
                });
              }
            });
          });
          console.log("eventPool");
          console.log(this._eventPool);
        };

        _proto.OnDispose = function OnDispose() {
          this._eventItemCache = null;
        };

        _proto.buildTree = function buildTree(seed) {
          this._tree = this._buildTree(seed);
        };

        _proto._buildTree = function _buildTree(seed) {
          var _this3 = this;

          var ep = tc.p(ExplorePlay);
          var rootCfg = ep.getLevelCfgByIndex(0);
          var nodeMap = new Map();
          var tmpEventRecords = []; // 生成节点

          ExploreCfg.level1.forEach(function (lCfg) {
            var id = lCfg[0];
            var area = lCfg[2];
            var eventType = lCfg[3];

            if (eventType instanceof Array) {
              if (eventType[0] instanceof Array) {
                var index = pickWeights(eventType.map(function (arr) {
                  return arr[1];
                }), seed);
                eventType = eventType[index][0];
                seed++;
              } else {
                throw "Cfg Error";
              }
            } // console.log(id, eventType);


            var poolItem = _this3._eventPool.find(function (i) {
              return i.type == eventType && i.area == area;
            });

            var eventId = 0;

            if (poolItem) {
              eventId = poolItem.list[pickWeightsBy(poolItem.list, {
                seed: seed++,
                fieldName: "weight"
              })].id;
            }

            tmpEventRecords.push([id, eventType, area, eventId, poolItem]);
          });
          ExploreCfg.noSameEventIdInGroups.forEach(function (group) {
            var groupItems = tmpEventRecords.filter(function (item) {
              return group.includes(item[0]);
            });
            var noSameEvent = groupItems.filter(function (item, idx) {
              return groupItems.findIndex(function (i) {
                return i[3] == item[3];
              }) == idx;
            }).length == groupItems.length;

            while (!noSameEvent) {
              var index = randomInt(0, groupItems.length - 1, seed);
              var item = groupItems[index];
              var poolItem = item[4];
              var eventId = poolItem.list[pickWeightsBy(poolItem.list, {
                seed: seed++,
                fieldName: "weight"
              })].id; // console.log("replace event id", item[0], item[3] + "->" + eventId)

              item[3] = eventId;
              noSameEvent = groupItems.filter(function (item, idx) {
                return groupItems.findIndex(function (i) {
                  return i[3] == item[3];
                }) == idx;
              }).length == groupItems.length;
            }
          });
          tmpEventRecords.forEach(function (item) {
            var id = item[0];
            var eventId = item[3]; // console.log(id, eventId);

            nodeMap.set(id, new YTreeNode(id, new ExploreNodeData(eventId)));
          }); // 将节点连接

          var addPre = function addPre(node, preLevels) {
            if (preLevels == null) return;
            preLevels.forEach(function (l) {
              var lCfg = ep.getLevelCfgById(l);
              var lnode = nodeMap.get(l);
              node.addChild(lnode);
              addPre(lnode, lCfg.preLevels);
            });
          };

          var root = nodeMap.get(rootCfg.id);
          var tree = new YTree(root);
          addPre(root, rootCfg.preLevels);
          return tree;
        };

        _proto.infoOf = function infoOf(id) {
          if (!this._eventItemCache) {
            this._eventItemCache = new Map();
          }

          if (!this._eventItemCache.has(id)) {
            this._eventItemCache.set(id, new ExploreEventItem(Xls.eventDatasById[id]));
          }

          return this._eventItemCache.get(id);
        };

        _proto.getLevelCfgByIndex = function getLevelCfgByIndex(index) {
          var cfg = ExploreCfg.level1[index];
          return {
            id: cfg[0],
            preLevels: cfg[1]
          };
        };

        _proto.getLevelCfgById = function getLevelCfgById(levelId) {
          var idx = ExploreCfg.level1.findIndex(function (cfg) {
            return cfg[0] === levelId;
          });
          if (idx < 0) console.error("invalid levelId " + levelId);else return this.getLevelCfgByIndex(idx);
        };

        _proto.claimDiamondReward = function claimDiamondReward() {
          var player = tc.p(PlayerPlay).player;
          var exploreCom = player.c.get(PlayerExploreCom);

          var curStop = this._tree.getNode(exploreCom.curStopId);

          var curStopInfo = curStop.data.info;
          var npcs = curStopInfo.fightWithBySeed(player.seed.mapSeed);
          var diamondRwd = tc.p(NpcPlay).diamondOf(npcs);
          player.c.get(PlayerExploreCom).diamond += diamondRwd;
        };

        _proto.checkGameEndOnWin = function checkGameEndOnWin(onGameComplete, onGameAbort, onGameContinue) {
          var player = tc.p(PlayerPlay).player;
          var tePlay = tc.p(TrueEndPlay);
          var exploreCom = player.c.get(PlayerExploreCom);

          var curStop = this._tree.getNode(exploreCom.curStopId);

          var curStopInfo = curStop.data.info;
          var isArea3Boss = ExploreCfg.are3boss === curStop.id;
          var isGameComplete = curStopInfo.type == ExploreEvent.BigBoss;
          if (isArea3Boss) tePlay.onPassArea3Boss();

          if (isGameComplete) {
            onGameComplete();
            return;
          }

          var isGameAbort = isArea3Boss && !tePlay.isTrueEndAvailable();

          if (isGameAbort) {
            onGameAbort();
            return;
          }

          onGameContinue();
        } // 进入对应的事件
        ;

        _proto.enterNode = function enterNode(nodeId) {
          var node = this._tree.getNode(nodeId);

          var player = tc.p(PlayerPlay).player;

          this._firstEventCheck();

          tc.k(UserKit).gameState = UserGameState.Countering;
          ExploreDlg.hide();
          player.save.save();
          player.c.get(PlayerExploreCom).moveTo(nodeId);
          node.data.exec();
        };

        _proto._firstEventCheck = function _firstEventCheck() {
          if (tc.k(UserKit).gameState == UserGameState.NotStart) {
            tc.k(UserKit).gameState = UserGameState.FightReawrding;
            tc.k(DlgKit).closeDlg(PreparDlg);
            TopbarDlg.me.onScene("exploring");
          }
        };

        _proto.claimFightWinReawrds = function claimFightWinReawrds(onDealOver) {
          var player = tc.p(PlayerPlay).player;
          var treasurePlay = tc.p(TreasurePlay);
          var exploreCom = player.c.get(PlayerExploreCom);

          var curStopInfo = this._tree.getNode(exploreCom.curStopId).data.info;

          var npcs = curStopInfo.fightWithBySeed(player.seed.mapSeed);
          var coinRwd = tc.p(NpcPlay).coinOf(npcs);
          var asyncTask = new AsyncTask();
          tc.k(UserKit).gameState = UserGameState.FightReawrding;
          player.save.save();
          asyncTask.Then(function (c) {
            var _curStopInfo$dropTrea;

            var treaRwd = null;

            if (((_curStopInfo$dropTrea = curStopInfo.dropTreasure) == null ? void 0 : _curStopInfo$dropTrea.length) > 0) {
              treaRwd = treasurePlay.randomNonOwnTreasure(3, {
                limitRare: curStopInfo.dropTreasure,
                downpick: true
              });

              for (var index = 0; index < 3; index++) {
                if (isNull(treaRwd[index])) {
                  treaRwd[index] = TreasureId.Shitou;
                }
              }
            }

            tc.k(DlgKit).fetchDlg(FightRwdDlg).setup({
              cardRwd: curStopInfo.type != ExploreEvent.BigBoss,
              treaRwd: treaRwd,
              coinRwd: coinRwd,
              onClaimOver: c
            });
          }); // if (coinRwd > 0) {
          //     asyncTask.Then((c) => {
          //         CoinRwdDlg.pop(coinRwd, () => {
          //             c()
          //         })
          //     })
          // }
          // if (curStopInfo.type != ExploreEvent.BigBoss) {
          //     asyncTask.Then((c) => {
          //         CardRwdDlg.popRwd(() => {
          //             c()
          //         }, tc.p(CardPlay).randomCardsFromPool(3));
          //     })
          // }
          // if (curStopInfo.dropTreasure?.length > 0) {
          //     asyncTask.Then((c) => {
          //         TreasureRwdDlg.pop(tid,         //         const treasure = treasurePlay.randomNonOwnTreasure(1, {
          //             limitRare: curStopInfo.dropTreasure as TreasureRare[],
          //             downpick: true,
          //         });
          //         const tid = treasure[0] ?? TreasureId.Shitou'reward', () => {
          //             player.c.get(PlayerTreasureCom).add(tid);
          //             c();
          //         })
          //     })
          // }

          if (curStopInfo.type == ExploreEvent.Boss) {
            asyncTask.Then(function (c) {
              FireDlg.pop(c);
            });
          }

          asyncTask.Start(onDealOver);
        }
        /**继续探索 */
        ;

        _proto.continueExplore = function continueExplore() {
          var curStopId = tc.p(PlayerPlay).player.c.get(PlayerExploreCom).curStopId;

          var node = this._tree.getNode(curStopId);

          var needChoose = node.parents.length > 1;

          if (needChoose) {
            ExploreDlg.show('explore');
          } else {
            tc.p(ExplorePlay).enterNode(node.parents[0].id);
          }
        };

        _createClass(ExplorePlay, [{
          key: "tree",
          get: function get() {
            return this._tree;
          }
        }]);

        return ExplorePlay;
      }(PlayBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FanshangjBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "71bb6krIFxA9YiTyPYkCVdP", "FanshangjBuffCom", undefined);

      var FanshangjBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(FanshangjBuffCom, _ABuffCom);

        function FanshangjBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = FanshangjBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.Hurt, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.Hurt) {
            var hurtSource = arg.hurtSource;

            if (hurtSource) {
              hurtSource.getHit(this.buff.num, null, this.buff.info.name);
            }
          }
        };

        return FanshangjBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FeixingBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts', './BuffPlay.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, tc, ABuffCom, BuffId, BuffNS, BuffPlay;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }, function (module) {
      BuffPlay = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c1895gQzd5DHqSTS9MMw9lb", "FeixingBuffCom", undefined);

      var FeixingBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(FeixingBuffCom, _ABuffCom);

        function FeixingBuffCom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ABuffCom.call.apply(_ABuffCom, [this].concat(args)) || this;
          _this._times = void 0;
          return _this;
        }

        var _proto = FeixingBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          var props = tc.p(BuffPlay).propOf(this.buff.id);
          this._times = parseInt(props.times);
          this.setOrder(BuffNS.EffectStage.RoundStart, BuffNS.EffectOrder.base);
          this.setOrder(BuffNS.EffectStage.Hurt, BuffNS.EffectOrder.base);
          this.setOrder(BuffNS.EffectStage.OnRemove, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.RoundStart) {
            this.owner.buff.mod(this.buff.id, this._times, {
              write: true
            });
          } else if (stage == BuffNS.EffectStage.Hurt) {
            this.owner.buff.mod(this.buff.id, -1);
          } else if (stage == BuffNS.EffectStage.OnRemove) {
            this.owner.buff.mod(BuffId.Xuanyun, 1);
          }
        };

        return FeixingBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FenliyjCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BuffId.ts', './CardItem.ts', './AFightCardCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, BuffId, CardPropFunc, AFightCardCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      CardPropFunc = module.CardPropFunc;
    }, function (module) {
      AFightCardCom = module.AFightCardCom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2824dCRWztB1rvpNT03sczq", "FenliyjCom", undefined);

      var FenliyjCom = exports('default', /*#__PURE__*/function (_AFightCardCom) {
        _inheritsLoose(FenliyjCom, _AFightCardCom);

        function FenliyjCom() {
          return _AFightCardCom.apply(this, arguments) || this;
        }

        var _proto = FenliyjCom.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnCast = function OnCast() {
          var buff = this.caster.buff;
          var hit = this.fightcard.fightCardHandler.getPropDealerByFunc(CardPropFunc.hit)[0];
          var num = buff.numOf(BuffId.enegy);
          buff.mod(BuffId.enegy, -num);

          while (num--) {
            hit.castEffect();
          }
        };

        return FenliyjCom;
      }(AFightCardCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FennuyjAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './tc.ts', './BuffId.ts', './BuffPlay.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, tc, BuffId, BuffPlay, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffPlay = module.default;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "906afikeExCRZHmCU1jdPUO", "FennuyjAct", undefined);

      var FennuyjAct = exports('FennuyjAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(FennuyjAct, _ActBase);

        function FennuyjAct(act) {
          var _this;

          _this = _ActBase.call(this, act) || this;
          _this._bplay = void 0;
          _this._bplay = tc.p(BuffPlay);
          return _this;
        }

        var _proto = FennuyjAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.attack,
            iconTip: '' + this.actualdmg,
            title: "愤怒一击",
            content: "\u8FD9\u540D\u654C\u4EBA\u5C06\u8981\u653B\u51FB\u9020\u6210" + this.actualdmg + "\u70B9\u4F24\u5BB3\uFF0C\u800C\u540E\u7729\u6655\u3002"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this2 = this;

          var actor = this.actor;
          this.attack_act_byatk_over(function () {
            _this2.target.getHit(_this2.actualdmg, actor, "AttackAct");
          }, function () {
            onOver();
            actor.buff.mod(BuffId.Xuanyun, 1);
          });
        };

        _createClass(FennuyjAct, [{
          key: "actualdmg",
          get: function get() {
            return this.calcDmg(parseInt(this._bplay.propOf(BuffId.Fennuyj).dmg));
          }
        }]);

        return FennuyjAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FennuyjBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FennuyjAct.ts', './NpcAICom.ts', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, FennuyjAct, NpcAICom, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FennuyjAct = module.FennuyjAct;
    }, function (module) {
      NpcAICom = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f7b59HaxsdCZI16a9vSnhm/", "FennuyjBuffCom", undefined);

      var FennuyjBuffCom = exports('FennuyjBuffCom', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(FennuyjBuffCom, _ABuffCom);

        function FennuyjBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = FennuyjBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.AnyTeammateTrueDead, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          var _this = this;

          if (stage == BuffNS.EffectStage.AnyTeammateTrueDead) {
            var aiCom = this.owner.c.get(NpcAICom);

            if (aiCom) {
              aiCom.addUrgentAction(function () {
                return new FennuyjAct(_this.owner);
              });
              aiCom.refreshAction();
            }
          }
        };

        return FennuyjBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FgoPool.ts", ['cc', './fairygui-ccc370.mjs', './PoolModule.ts'], function (exports) {
  'use strict';

  var cclegacy, GObjectPool, PoolModule;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GObjectPool = module.GObjectPool;
    }, function (module) {
      PoolModule = module.PoolModule;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7123bBaA1JE5IJSdQLWD034", "FgoPool", undefined);

      var FgoPool = exports('default', /*#__PURE__*/function () {
        FgoPool.alloc = function alloc(url) {
          var item = this._poolOfpool.alloc();

          item.reset(url);
          return item;
        };

        function FgoPool() {
          this._pool = void 0;
          this._url = void 0;
          this._pool = new GObjectPool();
        }

        var _proto = FgoPool.prototype;

        _proto.get = function get() {
          // console.log('get', this._url, this._pool.count);
          return this._pool.getObject(this._url);
        };

        _proto.ret = function ret(obj) {
          // console.log('ret', this._url, this._pool.count);
          this._pool.returnObject(obj);

          obj.removeFromParent();
        };

        _proto.reset = function reset(url) {
          this._pool.clear();

          this._url = url;
        };

        return FgoPool;
      }());
      FgoPool._poolOfpool = new PoolModule(function () {
        return new FgoPool();
      }, function (p) {
        return p.reset("");
      });
      FgoPool.free = FgoPool._poolOfpool.free.bind(FgoPool._poolOfpool);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Fight.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TCStageMachine.ts', './ComModule.ts', './tc.ts', './BuffNS.ts', './AFightCom.ts', './FightBuffCom.ts', './FightPlay.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, EventTarget, TCStage, TCStep, TCStageMachine, ComModule, tc, BuffNS, FightMsg, FightBuffCom, FightPlay;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }, function (module) {
      TCStage = module.TCStage;
      TCStep = module.TCStep;
      TCStageMachine = module.default;
    }, function (module) {
      ComModule = module.ComModule;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      BuffNS = module.BuffNS;
    }, function (module) {
      FightMsg = module.FightMsg;
    }, function (module) {
      FightBuffCom = module.FightBuffCom;
    }, function (module) {
      FightPlay = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6576drdKgJCUrxf12JHdMc5", "Fight", undefined);

      var Fight = exports('default', /*#__PURE__*/function () {
        function Fight(our, enemys) {
          var _this = this;

          this._lastActor = void 0;
          this._our = void 0;
          this._enemys = void 0;
          this._enemysGrave = [];
          this._stg = void 0;
          this._e = void 0;
          this._c = void 0;
          this._e = new EventTarget();
          this._c = new ComModule();
          this._stg = new TCStageMachine([{
            stage: TCStage.FIGHT__WAIT_START,
            need: []
          }, {
            stage: TCStage.FIGHT__FIGHTING,
            need: [TCStep.FIGHT__OPEN_ANIM]
          }, {
            stage: TCStage.FIGHT__END,
            need: [TCStep.FIGHT__END]
          }]);
          this._lastActor = null;
          this._our = our;
          this._enemys = enemys;
          this._enemysGrave = [];
          our.forEach(function (f) {
            return f.enterFight(_this);
          });
          enemys.forEach(function (f) {
            return f.enterFight(_this);
          });

          this._c.add(FightBuffCom);

          this._c.each(function (c) {
            return c.init(_this);
          });

          this._c.each(function (c) {
            return c.lateinit();
          });

          [].concat(this._our, this.enemys).forEach(function ($) {
            return $.buff.effect(BuffNS.EffectStage.EnterFight, {
              log: "Fight.construct"
            });
          });
        }

        var _proto = Fight.prototype;

        _proto.addEnemy = function addEnemy(f) {
          if (f.isDead) {
            throw new Error("不能添加已经死亡的敌人");
          }

          var deadIndex = this._enemys.findIndex(function (e) {
            return e.isTrueDead;
          });

          var dead = this._enemys[deadIndex];

          this._enemys.splice(deadIndex, 1, f);

          f.enterFight(this);
          console.log("Fight.addEnemy", f);

          this._c.each(function (c) {
            return c.onMsg(FightMsg.NEW_FIGHTER_ENTER, {
              newFighter: f
            });
          });

          f.buff.effect(BuffNS.EffectStage.EnterFight, {
            log: "Fight.addEnemy"
          });

          this._e.emit(Fight.Events.NEW_ENEMY, dead, f);
        };

        _proto.Dispose = function Dispose() {
          var _this2 = this;

          this._c.each(function (c) {
            return c.destory();
          });

          this._our.forEach(function (f) {
            if (!f.isDead) {
              f.leaveFight(_this2);
            }
          });

          this._enemys.forEach(function (f) {
            return f.Dispose();
          });

          this._enemysGrave.forEach(function (f) {
            return f.Dispose();
          });

          this._c = null;
          this._e = null;
          this._lastActor = null;
          this._our = null;
          this._enemys = null;
          this._enemysGrave = null;
          this._stg = null;
        };

        _proto.startFight = function startFight() {
          if (this._stg.cur == TCStage.FIGHT__WAIT_START) {
            this._stg.done(TCStep.FIGHT__OPEN_ANIM);

            this._lastActor = null;
            this.nextRound();
          }
        };

        _proto.endFight = function endFight() {
          tc.p(FightPlay).endFight();
        };

        _proto.nextRound = function nextRound() {
          if (this._stg.cur == TCStage.FIGHT__FIGHTING) {
            var actor = this._lastActor;

            do {
              actor = this._getNextActor(actor);
            } while (actor.isTrueDead);

            this._lastActor = actor;
            actor.onRoundStart();

            this._e.emit(Fight.Events.ROUND_START, actor);
          }
        };

        _proto._getNextActor = function _getNextActor(lastActor) {
          var quene = this._our.concat(this.enemys);

          var index = quene.indexOf(lastActor);

          if (index < 0) {
            index = 0;
          } else {
            index++;
          }

          if (index >= quene.length) {
            index = 0;
          }

          return quene[index];
        };

        _proto.onFighterDead = function onFighterDead(fighter) {
          var isPlayer = fighter.info.isPlayer;
          console.log("Fight.onFighterDead", fighter.info.npcInfo.name, fighter);

          if (!isPlayer) {
            fighter.dead();
          }

          var liveTeammates = fighter.info.getLiveTeammates();
          liveTeammates.forEach(function (teammate) {
            if (teammate == fighter) return;
            teammate.buff.effect(BuffNS.EffectStage.AnyTeammateTrueDead, {
              log: 'fight.onFighterDead'
            });
          });

          if (this._stg.cur !== TCStage.FIGHT__END) {
            if (isPlayer) {
              this._stg.done(TCStep.FIGHT__END);

              this._e.emit(Fight.Events.FIGHT_END, false);
            } else {
              if (liveTeammates.length < 1) {
                this._stg.done(TCStep.FIGHT__END);

                this._e.emit(Fight.Events.FIGHT_END, true);
              }
            }
          }
        };

        _createClass(Fight, [{
          key: "c",
          get: // 敌人墓地
          function get() {
            return this._c;
          }
        }, {
          key: "e",
          get: function get() {
            return this._e;
          }
        }, {
          key: "our",
          get: function get() {
            return this._our;
          }
        }, {
          key: "enemys",
          get: function get() {
            return this._enemys;
          }
        }, {
          key: "buff",
          get: function get() {
            return this._c.get(FightBuffCom);
          }
        }, {
          key: "liveEnemys",
          get: function get() {
            return this._enemys.filter(function (e) {
              return !e.isTrueDead;
            });
          }
        }, {
          key: "isFightEnd",
          get: function get() {
            return this._stg.cur == TCStage.FIGHT__END;
          }
        }]);

        return Fight;
      }());
      Fight.Events = {
        ROUND_START: "ROUND_START",
        TREASURE_EFFECT: "TREASURE_EFFECT",
        FIGHT_END: "FIGHT_END",
        NEW_ENEMY: "NEW_ENEMY"
      };

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FightBottomAreaWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs', './FightCfg.ts', './CardSetDlg.ts', './UIWrap.ts', './FreeList.ts', './Util.ts', './BuffId.ts', './BuffNS.ts', './FightPlay.ts', './NpcBuffCom.ts', './PlayerFightCardCom.ts', './tc.ts', './HandCardWrap.ts', './PreviewCardWrap.ts', './SeekLineWrap.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, tween, AsyncTask, FightCfg, CardSetDlg, UIWrap, FreeList, isNull, BuffId, BuffNS, FightPlay, NpcBuffCom, PlayerFightCardCom, tc, HandCardState, HandCardWrap, PreviewCardWrap, SeekLineWrap;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
    }, function (module) {
      AsyncTask = module.AsyncTask;
    }, function (module) {
      FightCfg = module.default;
    }, function (module) {
      CardSetDlg = module.default;
    }, function (module) {
      UIWrap = module.default;
    }, function (module) {
      FreeList = module.FreeList;
    }, function (module) {
      isNull = module.isNull;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }, function (module) {
      FightPlay = module.default;
    }, function (module) {
      NpcBuffCom = module.default;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      HandCardState = module.HandCardState;
      HandCardWrap = module.default;
    }, function (module) {
      PreviewCardWrap = module.PreviewCardWrap;
    }, function (module) {
      SeekLineWrap = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1e955VFKP1EjJcMd4wtjYbT", "FightBottomAreaWrap", undefined);

      var DashBoardState;

      (function (DashBoardState) {
        DashBoardState[DashBoardState["Inited"] = 0] = "Inited";
        DashBoardState[DashBoardState["Idle"] = 1] = "Idle";
        DashBoardState[DashBoardState["HandIning"] = 2] = "HandIning";
        DashBoardState[DashBoardState["Operation"] = 3] = "Operation";
        DashBoardState[DashBoardState["HandOuting"] = 4] = "HandOuting";
        DashBoardState[DashBoardState["Waiting"] = 5] = "Waiting";
        DashBoardState[DashBoardState["WaitReload"] = 6] = "WaitReload";
        DashBoardState[DashBoardState["WaitHandIn"] = 7] = "WaitHandIn";
      })(DashBoardState || (DashBoardState = {}));

      var FightBottomAreaWrap = exports('default', /*#__PURE__*/function (_UIWrap) {
        _inheritsLoose(FightBottomAreaWrap, _UIWrap);

        function FightBottomAreaWrap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIWrap.call.apply(_UIWrap, [this].concat(args)) || this;
          _this._hand = void 0;
          _this._in = void 0;
          _this._outDiscard = void 0;
          _this._outCost = void 0;
          _this._outSwallow = void 0;
          _this._castline = void 0;
          _this._draw = void 0;
          _this._discard = void 0;
          _this._end = void 0;
          _this._cost = void 0;
          _this._fighter = void 0;
          _this._fcc = void 0;
          _this._enegyTxt = void 0;
          _this._preview = void 0;
          _this._seekline = void 0;
          _this._state = void 0;
          _this._handCardWrapList = void 0;
          return _this;
        }

        var _proto = FightBottomAreaWrap.prototype;

        _proto.OnInit = function OnInit() {
          this._in = this.getCom("in");
          this._hand = this.getCom("hand");
          this._outDiscard = this.getCom("outDiscard");
          this._outCost = this.getCom("outCost");
          this._outSwallow = this.getCom("outSwallow");
          this._castline = this.getCom("castline");
          this._draw = this.getBtn("draw");
          this._discard = this.getBtn("discard");
          this._end = this.getBtn("end");
          this._cost = this.getBtn("cost");
          this._enegyTxt = this.getTxt('enegyTxt');
          this._seekline = this.wrap(SeekLineWrap, 'seekline');
          this._preview = this.wrap(PreviewCardWrap, "preview");
          this._state = DashBoardState.Inited;
          this._handCardWrapList = new FreeList();

          this._seekline.config(100);

          this._end.onClick(this._onClickEnd, this);

          this._draw.onClick(this._onClickDraw, this);

          this._cost.onClick(this._onClickCost, this);

          this._discard.onClick(this._onClickDiscard, this);
        };

        _proto.OnClose = function OnClose() {
          this._seekline = null;
          this._preview = null;

          this._handCardWrapList.clear();

          this._handCardWrapList = null;
        };

        _proto.setFighter = function setFighter(f) {
          if (this._state != DashBoardState.Inited) return;
          if (this._fighter) return;
          var fcc = this._fcc = f.c.get(PlayerFightCardCom);
          this._fighter = f;
          this._draw.title = "" + fcc.drawpile.length;
          this._discard.title = "" + fcc.discardpile.length;
          this._cost.visible = false;

          this._syncEnegy();

          this.addEvt(f.buff.e, NpcBuffCom.Events.BUFF_CHG, this._syncEnegy);
          this.addEvt(fcc.e, PlayerFightCardCom.Events.COST_UPT, this._onCostUpt);
          this.addEvt(fcc.e, PlayerFightCardCom.Events.HAND_CHANGE, this._onHandChange);
          this.addEvt(fcc.e, PlayerFightCardCom.Events.DRAW_UPT, this._onDrawUpt);
          this.addEvt(fcc.e, PlayerFightCardCom.Events.DISCARD_UPT, this._onDiscardUpt);
          this._state = DashBoardState.Idle;
        };

        _proto.onRoundStart = function onRoundStart() {
          this._state = DashBoardState.WaitHandIn;
        };

        _proto.playUIIn = function playUIIn(onIn) {
          this.fgc.getTransition("uiout").playReverse(onIn);
        };

        _proto.playUIOut = function playUIOut(onOut) {
          this.fgc.getTransition("uiout").play(onOut);
        };

        _proto.playHandsIn = function playHandsIn(hands, discard, costed, onHandsIn, needReload) {
          var _this2 = this;

          if (this._state != DashBoardState.WaitHandIn && this._state != DashBoardState.WaitReload) return; // console.log("FBAW", "playHandsIn")

          this._state = DashBoardState.HandIning;

          this._ajustHands(hands, discard, costed, function () {
            if (needReload) {
              _this2._state = DashBoardState.WaitReload;
            } else {
              _this2._state = DashBoardState.Operation;
            }

            onHandsIn();
          });
        };

        _proto._onHandChange = function _onHandChange(hands, discard, costed) {
          if (this._state == DashBoardState.Operation || this._state == DashBoardState.Waiting) {
            // console.log("FBAW", "_onHandChange", hands)
            this._ajustHands(hands, discard, costed);
          }
        };

        _proto._onCostUpt = function _onCostUpt(costed) {
          this._cost.visible = costed.length > 0;
          this._cost.title = '' + costed.length;
        };

        _proto._ajustHands = function _ajustHands(hands, discard, costed, onAjustOver) {
          var _this3 = this;

          var task = new AsyncTask();
          var actionArr = [];
          var cardWraps = this._handCardWrapList;
          cardWraps.foreach_safe(function (cardWrap) {
            if (!hands.findFirstIf(function (c) {
              return cardWrap.isCard(c);
            })) {
              if (discard.findFirstIf(function (c) {
                return cardWrap.isCard(c);
              })) {
                actionArr.push(cardWrap.handOutDiscard.bind(cardWrap));
              } else if (costed.findFirstIf(function (c) {
                return cardWrap.isCard(c);
              })) {
                actionArr.push(cardWrap.handOutCost.bind(cardWrap));
              } else {
                actionArr.push(cardWrap.handOutSwallow.bind(cardWrap));
              }

              cardWraps.remove(cardWrap);
            }

            return true;
          });
          var index = -1;
          hands.foreach_unsafe(function (c) {
            index++;
            var cardInHand = cardWraps.findFirstIf(function (wrap) {
              return wrap.isCard(c);
            });

            if (cardInHand && cardInHand.state !== HandCardState.HandIning) {
              cardInHand.setHandPos(index, hands.length);
              cardInHand.syncCastState();
              actionArr.push(cardInHand.repos.bind(cardInHand));
            } else {
              var cardWrap = cardInHand;

              if (!cardWrap) {
                var cardFgo = tc.p(FightPlay).cardFgoPool.get().asCom;
                cardWrap = _this3.wrap(HandCardWrap, cardFgo);
                cardFgo.setPivot(0.5, 0.5, true);
                cardWrap.setData(c, {
                  "in": _this3._in,
                  hand: _this3._hand,
                  outDiscard: _this3._outDiscard,
                  outCost: _this3._outCost,
                  outSwallow: _this3._outSwallow,
                  preview: _this3._preview,
                  seekline: _this3._seekline,
                  castY: _this3._castline.y
                });

                _this3._hand.addChild(cardFgo);

                cardWraps.push(cardWrap);
              }

              cardWrap.setHandPos(index, hands.length);
              actionArr.push(cardWrap.handIn.bind(cardWrap));
            }

            return true;
          });
          task.Then(actionArr);
          task.Start(function () {
            onAjustOver == null ? void 0 : onAjustOver();
          });
        };

        _proto.playShuffle = function playShuffle(onShuffled) {
          var _this4 = this;

          var _FightCfg$reloadAnim = FightCfg.reloadAnim,
              dur = _FightCfg$reloadAnim.dur,
              scale = _FightCfg$reloadAnim.scale,
              scaleDur0 = _FightCfg$reloadAnim.scaleDur0,
              scaleDur1 = _FightCfg$reloadAnim.scaleDur1;
          var discardNum = parseInt(this._discard.title);
          tween(this._draw).to(scaleDur0, {
            scaleX: 1 + scale,
            scaleY: 1 + scale
          }).start();
          tween(this._discard).to(scaleDur0, {
            scaleX: 1 - scale,
            scaleY: 1 - scale
          }).start();
          tween({
            draw: parseInt(this._draw.title),
            discard: discardNum
          }).to(dur, {
            draw: discardNum,
            discard: 0
          }, {
            onUpdate: function onUpdate(target, ratio) {
              _this4._draw.title = "" + Math.ceil(target['draw']);
              _this4._discard.title = "" + Math.floor(target['discard']);
            }
          }).call(function () {
            tween(_this4._draw).to(scaleDur1, {
              scaleX: 1,
              scaleY: 1
            }).start();
            tween(_this4._discard).to(scaleDur1, {
              scaleX: 1,
              scaleY: 1
            }).call(onShuffled).start();
          }).start();
        };

        _proto._onClickEnd = function _onClickEnd() {
          var _this5 = this;

          if (this._state != DashBoardState.Operation) return;

          var fcc = this._fighter.c.get(PlayerFightCardCom);

          this._state = DashBoardState.Waiting;

          this._fighter.buff.effect(BuffNS.EffectStage.RoundEnd, {
            log: "UserClickEnd"
          });

          var isKeji = this._fighter.buff.isMorethan(BuffId.Keji, 0);

          var noCardUsed = fcc.handcastLastRound.length < 1;
          var isDiscardAll = !(isKeji && noCardUsed);
          if (isDiscardAll) fcc.discardAll();
          this.addDelay(FightCfg.handOutAnim.dur, function () {
            _this5._fighter.info.fight.nextRound();
          });
        };

        _proto._onClickDraw = function _onClickDraw() {
          CardSetDlg.pop(this._fcc.drawpile.map(function (f) {
            return f.info.id;
          }));
        };

        _proto._onClickCost = function _onClickCost() {
          CardSetDlg.pop(this._fcc.costpile.map(function (f) {
            return f.info.id;
          }));
        };

        _proto._onClickDiscard = function _onClickDiscard() {
          CardSetDlg.pop(this._fcc.discardpile.map(function (f) {
            return f.info.id;
          }));
        };

        _proto._onDrawUpt = function _onDrawUpt(draw) {
          this._draw.title = "" + draw.length;
        };

        _proto._onDiscardUpt = function _onDiscardUpt(discard) {
          this._discard.title = "" + discard.length;
        };

        _proto._syncEnegy = function _syncEnegy(buffId) {
          if (isNull(buffId) || buffId === BuffId.enegy || buffId === BuffId.maxenegy) {
            this._enegyTxt.setVar('cur', '' + this._fighter.buff.numOf(BuffId.enegy)).setVar('max', '' + this._fighter.buff.numOf(BuffId.maxenegy)).flushVars();
          }
        };

        return FightBottomAreaWrap;
      }(UIWrap));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FightBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AFightCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, FightMsg, AFightCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FightMsg = module.FightMsg;
      AFightCom = module.AFightCom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "51df53EscdEK65O//0Jox8S", "FightBuffCom", undefined);

      var FightBuffCom = exports('FightBuffCom', /*#__PURE__*/function (_AFightCom) {
        _inheritsLoose(FightBuffCom, _AFightCom);

        function FightBuffCom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _AFightCom.call.apply(_AFightCom, [this].concat(args)) || this;
          _this.TAG = "FightBuffCom";
          _this._gid = void 0;
          _this._buffs = void 0;
          return _this;
        }

        var _proto = FightBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this._gid = -1;
          this._buffs = [];
        };

        _proto.OnDestory = function OnDestory() {
          this._gid = null;
          this._buffs = null;
        };

        _proto.addBuff = function addBuff(buffId, num, from, target) {
          var fromPlayer = from.info.isPlayer;
          var isOur = fromPlayer && target === 'our' || !fromPlayer && target === 'enemy';
          var isEnemy = fromPlayer && target === 'enemy' || !fromPlayer && target === 'our';
          var gid = this._gid++;
          target = isOur ? 'our' : isEnemy ? 'enemy' : 'all';
          var buff = {
            id: gid,
            buff: buffId,
            num: num,
            target: target
          };

          this._applyBuff(buff);

          this._buffs.push(buff);

          return gid;
        };

        _proto.removeBuff = function removeBuff(id) {
          var buff = this._buffs.removeFirst(function (b) {
            return b.id === id;
          });

          this._applyBuff(buff, true);
        };

        _proto._applyBuff = function _applyBuff(buff, isRevert) {
          var _this2 = this;

          if (isRevert === void 0) {
            isRevert = false;
          }

          var b = buff.buff,
              num = buff.num,
              target = buff.target;
          var npcs = target === 'our' ? this.fight.our : target === 'enemy' ? this.fight.enemys : this.fight.our.concat(this.fight.enemys);
          npcs.forEach(function (npc) {
            if (!npc.isTrueDead) {
              console.log(_this2.TAG, npc.info.npcInfo.name, isRevert ? "撤销" : "应用", buff.buff, buff.num);
              npc.buff.mod(b, isRevert ? -num : num);
            }
          });
        };

        _proto._getBelong = function _getBelong(npc) {
          return npc.info.isPlayer ? 'our' : 'enemy';
        };

        _proto._applyExistBuffTo = function _applyExistBuffTo(npc) {
          var _this3 = this;

          if (npc.isTrueDead) return;

          this._buffs.forEach(function (buff) {
            var belong = _this3._getBelong(npc);

            if (buff.target === 'all' || buff.target === belong) {
              console.log(_this3.TAG, npc.info.npcInfo.name, buff.buff, buff.num);
              npc.buff.mod(buff.buff, buff.num);
            }
          });
        };

        _proto.OnMsg = function OnMsg(msg, arg) {
          switch (msg) {
            case FightMsg.NEW_FIGHTER_ENTER:
              var fighter = arg.newFighter;

              this._applyExistBuffTo(fighter);

              break;
          }
        };

        return FightBuffCom;
      }(AFightCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FightCard.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ReslockKit.ts', './ComModule.ts', './PoolModule.ts', './tc.ts', './BuffId.ts', './BuffNS.ts', './PlayerFightCardCom.ts', './CardPlay.ts', './FightCardMsg.ts', './EnergyCostCom.ts', './FightCardHandler.ts', './FightCardSeekLogic.ts', './SeekLogicCom.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, EventTarget, ReslockKit, ResName, ComModule, PoolModule, tc, BuffId, BuffNS, PlayerFightCardCom, CardPlay, FightCardMsg, EnergyCostCom, FightCardHandler, FightCardSeekLogic, SeekSelf, SeekChooseOne, SeekEnemys, SeekRandomEnemy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }, function (module) {
      ReslockKit = module.default;
      ResName = module.ResName;
    }, function (module) {
      ComModule = module.ComModule;
    }, function (module) {
      PoolModule = module.PoolModule;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      FightCardMsg = module.FightCardMsg;
    }, function (module) {
      EnergyCostCom = module.default;
    }, function (module) {
      FightCardHandler = module.FightCardHandler;
    }, function (module) {
      FightCardSeekLogic = module.FightCardSeekLogic;
    }, function (module) {
      SeekSelf = module.SeekSelf;
      SeekChooseOne = module.SeekChooseOne;
      SeekEnemys = module.SeekEnemys;
      SeekRandomEnemy = module.SeekRandomEnemy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "82d09TGgTREhrskRkjgxf0Q", "FightCard", undefined);

      var FightCard = exports('default', /*#__PURE__*/function () {
        FightCard.alloc = function alloc(id, caster) {
          var fc = this._pool.alloc();

          fc._reset(id, caster);

          return fc;
        };

        FightCard.free = function free(card) {
          card._clean();

          this._pool.free(card);
        };

        function FightCard() {
          this._id = void 0;
          this._caster = void 0;
          this._e = void 0;
          this._fightCardHandler = void 0;
          this._c = void 0;
        }

        var _proto = FightCard.prototype;

        _proto._reset = function _reset(id, caster) {
          var _this = this;

          this._id = id;
          this._caster = caster;
          this._fightCardHandler = new FightCardHandler(this);
          this._e = new EventTarget();
          this._c = new ComModule();

          this._c.add(EnergyCostCom);

          tc.p(CardPlay).getCastComs(id).forEach(function (com) {
            return _this._c.add(com);
          });

          this._c.each(function (c) {
            c.init(_this, caster);
          });

          this._fightCardHandler.onDescChange = function (newDesc) {
            _this._e.emit(FightCard.Events.DESC_CHANGE, newDesc);
          };
        };

        _proto._clean = function _clean() {
          var _this$_fightCardHandl, _this$_c;

          (_this$_fightCardHandl = this._fightCardHandler) == null ? void 0 : _this$_fightCardHandl.Dispose();
          this._fightCardHandler = null;
          (_this$_c = this._c) == null ? void 0 : _this$_c.each(function (c) {
            return c.Dispose();
          });
        }
        /**作为手牌使用 */
        ;

        _proto.useAsHandCard = function useAsHandCard() {
          var _this2 = this;

          var fcc = this.caster.c.get(PlayerFightCardCom);
          var seeklogic = this.seeklogic;
          var isInHand = fcc.hand.findFirstIf(function (c) {
            return c == _this2;
          });

          if (!isInHand) {
            console.error("card not in hand cant useAsHandCard!");
            return;
          }

          if (this.isAbility) {
            this.caster.c.get(PlayerFightCardCom).swallow(this);
          } else if (this.isCost) {
            this.caster.c.get(PlayerFightCardCom).cost(this);
          } else {
            this.caster.c.get(PlayerFightCardCom).discard(this);
          }

          this.cast();
          fcc.recordCardCast(this.info.id);
          this.caster.buff.effect(BuffNS.EffectStage.AnyHandCardUsed, {
            log: "FightCard.useAsHandCard." + this.info.name,
            cardUsed: this.info.id,
            cardUsedSeeklogic: seeklogic
          });
        }
        /**释放 */
        ;

        _proto.cast = function cast() {
          var _this3 = this;

          tc.k(ReslockKit).getLock(ResName.RoundAdvance, function () {
            _this3._c.each(function (c) {
              return c.cast();
            });

            if (_this3.isAttack && _this3._caster.buff.isMorethan(BuffId.shenshangxs, 0)) {
              _this3.freecast(false);
            }

            _this3._e.emit(FightCard.Events.CASTED);

            tc.k(ReslockKit).retLock(ResName.RoundAdvance);
          });
        }
        /**无视能量消耗直接释放 */
        ;

        _proto.freecast = function freecast(dispatchEvt) {
          if (dispatchEvt === void 0) {
            dispatchEvt = true;
          }

          var costcom = this._c.get(EnergyCostCom);

          costcom.isEnable = false;

          this._c.each(function (c) {
            return c.cast();
          });

          costcom.isEnable = true;
          dispatchEvt && this._e.emit(FightCard.Events.CASTED);
        };

        _proto.enterHand = function enterHand() {
          this._fightCardHandler.enterHand();

          this._c.each(function (c) {
            return c.onMsg(FightCardMsg.EnterHand);
          });
        };

        _proto.leaveHand = function leaveHand() {
          this._fightCardHandler.leaveHand();

          this._c.each(function (c) {
            return c.onMsg(FightCardMsg.LeaveHand);
          });
        };

        _createClass(FightCard, [{
          key: "caster",
          get: function get() {
            return this._caster;
          }
        }, {
          key: "fightCardHandler",
          get: function get() {
            return this._fightCardHandler;
          }
        }, {
          key: "e",
          get: function get() {
            return this._e;
          }
        }, {
          key: "c",
          get: function get() {
            return this._c;
          }
        }, {
          key: "info",
          get: function get() {
            return tc.p(CardPlay).infoOf(this._id);
          }
        }, {
          key: "name",
          get: function get() {
            return this.info.name;
          }
        }, {
          key: "desc",
          get: function get() {
            // return this._fightCardHandler.desc + (this.isCost ? FightCfg.cardCostTip : "");
            return this._fightCardHandler.desc;
          }
        }, {
          key: "cost",
          get: function get() {
            return this._c.get(EnergyCostCom).cost;
          }
        }, {
          key: "costCom",
          get: function get() {
            return this._c.get(EnergyCostCom);
          }
        }, {
          key: "isAbility",
          get: function get() {
            return this.info.isAbility;
          }
        }, {
          key: "isAttack",
          get: function get() {
            return this.info.isAttack;
          }
        }, {
          key: "isCost",
          get: function get() {
            return this.info.isCost;
          }
        }, {
          key: "canUse",
          get: function get() {
            return !this.info.cantUse && this.caster.buff.isMorethan(BuffId.enegy, this.cost - 1) && !this.caster.buff.isMorethan(BuffId.Wufadcsp, 0);
          }
        }, {
          key: "seeklogic",
          get: function get() {
            if (this._c.get(SeekSelf)) return FightCardSeekLogic.Self;else if (this._c.get(SeekChooseOne)) return FightCardSeekLogic.ChooseOne;else if (this._c.get(SeekEnemys)) return FightCardSeekLogic.Enemys;else if (this._c.get(SeekRandomEnemy)) return FightCardSeekLogic.RandomEnemy;
            console.error("cant get seeklogic");
          }
        }]);

        return FightCard;
      }());
      FightCard.Events = {
        /**卡牌释放 */
        CASTED: "CASTED",

        /**描述改变 */
        DESC_CHANGE: "DESC_CHANGE"
      };
      FightCard._pool = new PoolModule(function () {
        return new FightCard();
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FightCardHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CardEffecter.ts', './CardItem.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, CardHitEffect, CardPowerEffect, CardFragileEffect, CardShiledEffect, CardWeakEffect, CardDrawEffect, CardHurtEffect, CardRecoverEffect, CardEnergyEffect, CardBuffEffect, CardPoisonEffect, CardHandBuffEffect, CardGiddyEffect, CardBuffScaleEffect, CardRmdebuffEffect, CardPropFunc;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      CardHitEffect = module.CardHitEffect;
      CardPowerEffect = module.CardPowerEffect;
      CardFragileEffect = module.CardFragileEffect;
      CardShiledEffect = module.CardShiledEffect;
      CardWeakEffect = module.CardWeakEffect;
      CardDrawEffect = module.CardDrawEffect;
      CardHurtEffect = module.CardHurtEffect;
      CardRecoverEffect = module.CardRecoverEffect;
      CardEnergyEffect = module.CardEnergyEffect;
      CardBuffEffect = module.CardBuffEffect;
      CardPoisonEffect = module.CardPoisonEffect;
      CardHandBuffEffect = module.CardHandBuffEffect;
      CardGiddyEffect = module.CardGiddyEffect;
      CardBuffScaleEffect = module.CardBuffScaleEffect;
      CardRmdebuffEffect = module.CardRmdebuffEffect;
    }, function (module) {
      CardPropFunc = module.CardPropFunc;
    }],
    execute: function () {
      var _FightCardHandler$_di;

      cclegacy._RF.push({}, "0bc29mzXUBEZr3O0BZS0PO4", "FightCardHandler", undefined);

      var FightCardHandler = exports('FightCardHandler', /*#__PURE__*/function () {
        function FightCardHandler(fc) {
          var _this = this;

          this._fc = void 0;
          this._propdealers = void 0;
          this._valDict = void 0;
          this.onDescChange = void 0;
          this._fc = fc;
          this._propdealers = [];
          this._valDict = {};
          fc.info.props.forEach(function (prop) {
            if (prop.func == CardPropFunc.val) {
              _this._valDict[prop.args[0]] = prop.args[1];
              return;
            }

            var dealerType = FightCardHandler._dict[prop.func];

            if (dealerType) {
              var dealer = new dealerType(fc, prop);

              dealer.onReplacerChange = function () {
                _this.onDescChange == null ? void 0 : _this.onDescChange(_this.desc);
              };

              _this._propdealers.push(dealer);
            }
          });
        }

        var _proto = FightCardHandler.prototype;

        _proto.Dispose = function Dispose() {
          this._propdealers.forEach(function (prop) {
            return prop.Dispose();
          });

          this._fc = null;
        };

        _proto.castEffect = function castEffect() {
          this._propdealers.forEach(function (prop) {
            return prop.castEffect();
          });
        };

        _proto.enterHand = function enterHand() {
          this._propdealers.forEach(function (prop) {
            return prop.enterHand();
          });
        };

        _proto.leaveHand = function leaveHand() {
          this._propdealers.forEach(function (prop) {
            return prop.leaveHand();
          });
        };

        _proto.getPropDealerByFunc = function getPropDealerByFunc(func) {
          return this._propdealers.filter(function ($) {
            return $.prop.func == func;
          });
        };

        _proto.getVal = function getVal(key) {
          return this._valDict[key];
        };

        _proto.getIntVal = function getIntVal(key) {
          return parseInt(this._valDict[key]);
        };

        _createClass(FightCardHandler, [{
          key: "_rawdesc",
          get: function get() {
            return this._fc.info.rawdesc;
          }
        }, {
          key: "desc",
          get: function get() {
            var desc = this._rawdesc.replace(/###.*/g, "");

            this._propdealers.forEach(function (p) {
              desc = desc.replace(p.origin, p.replacer);
            });

            return desc;
          }
        }, {
          key: "propdealers",
          get: function get() {
            return this._propdealers;
          }
        }]);

        return FightCardHandler;
      }());
      FightCardHandler._dict = (_FightCardHandler$_di = {}, _FightCardHandler$_di[CardPropFunc.hit] = CardHitEffect, _FightCardHandler$_di[CardPropFunc.power] = CardPowerEffect, _FightCardHandler$_di[CardPropFunc.fragile] = CardFragileEffect, _FightCardHandler$_di[CardPropFunc.shiled] = CardShiledEffect, _FightCardHandler$_di[CardPropFunc.weak] = CardWeakEffect, _FightCardHandler$_di[CardPropFunc.draw] = CardDrawEffect, _FightCardHandler$_di[CardPropFunc.hurt] = CardHurtEffect, _FightCardHandler$_di[CardPropFunc.recover] = CardRecoverEffect, _FightCardHandler$_di[CardPropFunc.energy] = CardEnergyEffect, _FightCardHandler$_di[CardPropFunc.buff] = CardBuffEffect, _FightCardHandler$_di[CardPropFunc.poison] = CardPoisonEffect, _FightCardHandler$_di[CardPropFunc.handbuff] = CardHandBuffEffect, _FightCardHandler$_di[CardPropFunc.giddy] = CardGiddyEffect, _FightCardHandler$_di[CardPropFunc.buffscale] = CardBuffScaleEffect, _FightCardHandler$_di[CardPropFunc.rmdebuff] = CardRmdebuffEffect, _FightCardHandler$_di);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FightCardMsg.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('FightCardMsg', void 0);

      cclegacy._RF.push({}, "f8cfaddAxxOPIGf5MRraS/s", "FightCardMsg", undefined);

      var FightCardMsg;

      (function (FightCardMsg) {
        FightCardMsg[FightCardMsg["EnterHand"] = 0] = "EnterHand";
        FightCardMsg[FightCardMsg["LeaveHand"] = 1] = "LeaveHand";
        FightCardMsg[FightCardMsg["Zhihuan"] = 2] = "Zhihuan";
      })(FightCardMsg || (FightCardMsg = exports('FightCardMsg', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FightCardSeekLogic.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('FightCardSeekLogic', void 0);

      cclegacy._RF.push({}, "8a020SZMQdBJKErqgrZpGRx", "FightCardSeekLogic", undefined);

      var FightCardSeekLogic;

      (function (FightCardSeekLogic) {
        FightCardSeekLogic[FightCardSeekLogic["ChooseOne"] = 0] = "ChooseOne";
        FightCardSeekLogic[FightCardSeekLogic["Self"] = 1] = "Self";
        FightCardSeekLogic[FightCardSeekLogic["Enemys"] = 2] = "Enemys";
        FightCardSeekLogic[FightCardSeekLogic["RandomEnemy"] = 3] = "RandomEnemy";
      })(FightCardSeekLogic || (FightCardSeekLogic = exports('FightCardSeekLogic', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FightCfg.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2dd3d0g9ZtDc7QDJLsum13a", "FightCfg", undefined);

      var FightCfg = exports('default', {
        //#region UI相关
        cardRes: ["Main", "Card"],
        cardCostTip: "\n[color=#FFCC00]消耗[/color]",
        handsInAnim: {
          dur0: 0.2 / 2,
          dur1: 0.5 / 2,
          sill: 80,
          dur12delay: 1,
          alphaFrom: 0,
          scaleFrom: 0.1
        },
        reloadAnim: {
          dur: 0.2 / 2,
          scale: 0.1,
          scaleDur0: 0.1 / 2,
          scaleDur1: 0.1 / 2
        },
        // 不同数量的敌人，皮套之间的空隙
        enemysColGap: [0, 40, 30, 30],
        handOutAnim: {
          dur: .2
        },
        //#endregion
        //#region 数值
        buff: {
          // 易伤增幅百分比
          fragileScale: 50,
          // 虚弱减幅百分比
          weakScale: 25,
          // 飞行减伤百分比
          feixingScale: 50
        } //#endregion

      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FightDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FightCfg.ts', './DlgBase.ts', './DlgKit.ts', './UserKit.ts', './BuffNS.ts', './ExplorePlay.ts', './Fight.ts', './PlayerCardSetCom.ts', './PlayerExploreCom.ts', './PlayerTreasureCom.ts', './PlayerPlay.ts', './tc.ts', './FightBottomAreaWrap.ts', './NpcFighterWrap.ts', './PlayerFighterWrap.ts', './EntryDlg.ts', './ExploreDlg.ts', './FightFailDlg.ts', './TopbarDlg.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, FightCfg, DlgBase, DlgKit, UserKit, BuffNS, ExplorePlay, Fight, PlayerCardSetCom, PlayerExploreCom, PlayerTreasureCom, PlayerPlay, tc, FightBottomAreaWrap, NpcFighterWrap, PlayerFighterWrap, EntryDlg, ExploreDlg, FightFailDlg, TopbarDlg;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FightCfg = module.default;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgKit = module.DlgKit;
    }, function (module) {
      UserKit = module.default;
    }, function (module) {
      BuffNS = module.BuffNS;
    }, function (module) {
      ExplorePlay = module.default;
    }, function (module) {
      Fight = module.default;
    }, function (module) {
      PlayerCardSetCom = module.PlayerCardSetCom;
    }, function (module) {
      PlayerExploreCom = module.default;
    }, function (module) {
      PlayerTreasureCom = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      FightBottomAreaWrap = module.default;
    }, function (module) {
      NpcFighterWrap = module.NpcFighterWrap;
    }, function (module) {
      PlayerFighterWrap = module.PlayerFighterWrap;
    }, function (module) {
      EntryDlg = module.EntryDlg;
    }, function (module) {
      ExploreDlg = module.ExploreDlg;
    }, function (module) {
      FightFailDlg = module.FightFailDlg;
    }, function (module) {
      TopbarDlg = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8f7f1r+cR1MIpWFpBuNc065", "FightDlg", undefined);

      var FightDlg = exports('FightDlg', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(FightDlg, _DlgBase);

        function FightDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._eNumCtrl = void 0;
          _this._enemysList = void 0;
          _this._me = void 0;
          _this._enemys = void 0;
          _this._bottomArea = void 0;
          _this._fight = void 0;
          _this._ePlay = void 0;
          return _this;
        }

        var _proto = FightDlg.prototype;

        _proto.OnInit = function OnInit() {
          this._ePlay = tc.p(ExplorePlay);
          this._me = this.wrap(PlayerFighterWrap, "our");
          this._enemysList = this.getList("enemys");
          this._eNumCtrl = this.getController('eNum');
          this._enemys = [];
          this._bottomArea = this.wrap(FightBottomAreaWrap, "bottomArea");
        };

        _proto.setFight = function setFight(fight) {
          this._fight = fight;
          this.addEvt(fight.e, Fight.Events.NEW_ENEMY, this.addEnemy);
          this.addEvt(fight.e, Fight.Events.ROUND_START, this._onRoundStart);
          this.addEvt(fight.e, Fight.Events.FIGHT_END, this._onFightEnd);

          this._bottomArea.setFighter(fight.our[0]);

          this._me.setData(fight.our[0], this._bottomArea);

          this._eNumCtrl.setSelectedPage(fight.enemys.length + '');

          this._enemysList.columnGap = FightCfg.enemysColGap[fight.enemys.length - 1];

          for (var index = 0; index < fight.enemys.length; index++) {
            var enemy = fight.enemys[index];

            var enemyFgo = this._enemysList.addItemFromPool();

            var enemyWrap = this.wrap(NpcFighterWrap, enemyFgo);
            enemyWrap.setFighter(enemy);

            this._enemys.push([enemy, enemyWrap]);
          }

          this._playOpenAnim();
        };

        _proto.addEnemy = function addEnemy(dead, _new) {
          var deadItem = this._enemys.find(function (_ref) {
            var e = _ref[0];
            return e == dead;
          });

          if (deadItem) {
            var enemyWrap = deadItem[1];
            enemyWrap.setFighter(_new);
            enemyWrap.show();
            deadItem[0] = _new;
          } else {
            throw "no dead enemy, can't add new enemy";
          }
        } // #region FightEventListner
        ;

        _proto._onRoundStart = function _onRoundStart(fighter) {
          if (fighter.info.isPlayer) {
            this._onPlayerRoundStart(fighter);
          } else {
            this._onNpcRoundStart(fighter);
          }
        };

        _proto._onPlayerRoundStart = function _onPlayerRoundStart(fighter) {
          this._me.roundStartDraw(function () {
            fighter.buff.effect(BuffNS.EffectStage.HandCardIn, {
              log: "FightDlg-Player-HandCardIn"
            });
          });
        };

        _proto._onNpcRoundStart = function _onNpcRoundStart(fighter) {
          var _this2 = this;

          fighter.buff.effect(BuffNS.EffectStage.HandCardIn, {
            log: "FightDlg-Npc-HandCardIn"
          });

          if (!fighter.isDead) {
            this._enemys.find(function (_ref2) {
              var e = _ref2[0];
              return e == fighter;
            })[1].onRoundStart(function () {
              fighter.buff.effect(BuffNS.EffectStage.RoundEnd, {
                log: "FightDlg-Npc-RoundEnd"
              });

              _this2._fight.nextRound();
            });
          } else {
            this._fight.nextRound();
          }
        };

        _proto._onGameComplete = function _onGameComplete() {
          var _this3 = this;

          this.addDelay(1, function () {
            _this3._settleGame(true);
          });
        };

        _proto._onGameAbort = function _onGameAbort() {
          var _this4 = this;

          this.addDelay(1, function () {
            _this4._me.playDead(function () {
              _this4._playFailAnim();
            });
          });
        };

        _proto._onGameContinue = function _onGameContinue() {
          var _this5 = this;

          this._ePlay.claimFightWinReawrds(function () {
            _this5.close();

            _this5._fight.endFight();

            tc.p(ExplorePlay).continueExplore();
          });
        };

        _proto._onFightEnd = function _onFightEnd(win) {
          var _this6 = this;

          console.log("FightDlg._onFightEnd " + win ? "win" : "lose");

          if (win) {
            this._bottomArea.playUIOut(function () {
              _this6._ePlay.claimDiamondReward();

              _this6._ePlay.checkGameEndOnWin(_this6._onGameComplete.bind(_this6), _this6._onGameAbort.bind(_this6), _this6._onGameContinue.bind(_this6));
            });
          } else {
            this._me.playDead(function () {
              _this6._playFailAnim();
            });
          }
        } // #endregion
        ;

        _proto._playOpenAnim = function _playOpenAnim() {
          var _this7 = this;

          this._bottomArea.playUIIn(function () {
            _this7._fight.startFight();
          });
        };

        _proto._playFailAnim = function _playFailAnim() {
          this._settleGame(false);
        } // 结算游戏
        ;

        _proto._settleGame = function _settleGame(win) {
          var _this8 = this;

          var pplay = tc.p(PlayerPlay);
          var p = pplay.player;
          var pExp = p.c.get(PlayerExploreCom);
          var pCardSet = p.c.get(PlayerCardSetCom);
          var pTreasure = p.c.get(PlayerTreasureCom);

          tc.k(DlgKit).fetchDlg(FightFailDlg).setup(win, {
            diamond: pExp.diamond,
            maxCoin: pExp.maxCoin,
            cardNum: pCardSet.cards.length,
            maxDmg: pExp.maxHurt,
            treasureNum: pTreasure.treasures.length
          }).onConfirm = function () {
            _this8.close();

            _this8._fight.endFight();

            tc.k(UserKit).dropgame();
            tc.p(PlayerPlay).disposePlayer();
            ExploreDlg.close();
            tc.k(DlgKit).closeDlg(TopbarDlg);
            tc.k(DlgKit).fetchDlg(EntryDlg);
          };
        };

        _proto.OnGetBgAlpha = function OnGetBgAlpha() {
          return 0;
        };

        _createClass(FightDlg, [{
          key: "dlgRes",
          get: function get() {
            return "FightDlg";
          }
        }]);

        return FightDlg;
      }(DlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FightEvent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './FightPlay.ts', './AExploreNodeHandler.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, tc, FightPlay, AExploreNodeHandler;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      FightPlay = module.default;
    }, function (module) {
      AExploreNodeHandler = module.AExploreNodeHandler;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9313aD/pRpD3K3r9KnWdRjn", "FightEvent", undefined);

      var FightEvent = exports('FightEvent', /*#__PURE__*/function (_AExploreNodeHandler) {
        _inheritsLoose(FightEvent, _AExploreNodeHandler);

        function FightEvent() {
          return _AExploreNodeHandler.apply(this, arguments) || this;
        }

        var _proto = FightEvent.prototype;

        _proto.exec = function exec() {
          var player = this.player;
          var npcs = this.info.fightWithBySeed(player.seed.mapSeed);
          tc.p(FightPlay).startFight(npcs);
        };

        return FightEvent;
      }(AExploreNodeHandler));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FightFailDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DlgBase.ts', './DlgKit.ts', './UserKit.ts', './tc.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, DlgBase, DlgLayer, UserKit, tc;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgLayer = module.DlgLayer;
    }, function (module) {
      UserKit = module.default;
    }, function (module) {
      tc = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d38433GmqtBtaZRuu5Ejbkk", "FightFailDlg", undefined);

      var FightFailDlg = exports('FightFailDlg', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(FightFailDlg, _DlgBase);

        function FightFailDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._diamondRwd = void 0;
          _this._diamond = void 0;
          _this._summary = void 0;
          _this._sceneCtrl = void 0;
          _this.onConfirm = void 0;
          return _this;
        }

        var _proto = FightFailDlg.prototype;

        _proto.setup = function setup(win, data) {
          this._sceneCtrl.setSelectedPage(win ? "win" : "lose");

          this._diamondRwd = Math.floor(data.diamond * (win ? 1 : 0.7));
          this._diamond.text = ('X' + data.diamond).sill(" ");
          this._summary.text = data.cardNum + "\n" + data.treasureNum + "\n" + data.maxDmg + "\n" + data.maxCoin;
          return this;
        };

        _proto.OnInit = function OnInit() {
          var _this2 = this;

          this._sceneCtrl = this.getController("scene");
          this.fgc.getTransition("fail").play(function () {
            _this2.addBtnEvt('confirm', function () {
              tc.k(UserKit).diamond += _this2._diamondRwd;

              _this2.onConfirm();

              _this2.close();
            });
          });
          this._diamond = this.getTxt("diamond");
          this._summary = this.getTxt("summary");
        };

        _proto.OnBgClickClose = function OnBgClickClose() {
          return false;
        };

        _createClass(FightFailDlg, [{
          key: "dlgRes",
          get: function get() {
            return "FightFailDlg";
          }
        }, {
          key: "dlgLayer",
          get: function get() {
            return DlgLayer.Front;
          }
        }]);

        return FightFailDlg;
      }(DlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FightPlay.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs', './FightCfg.ts', './FightDlg.ts', './DlgKit.ts', './FUISys.ts', './tc.ts', './BuffId.ts', './BuffPlay.ts', './CardPlay.ts', './NpcFighter.ts', './PlayerPlay.ts', './Fight.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, PlayBase, FightCfg, FightDlg, DlgKit, FUISys, tc, BuffId, BuffPlay, CardPlay, NpcFighter, PlayerPlay, Fight;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlayBase = module.PlayBase;
    }, function (module) {
      FightCfg = module.default;
    }, function (module) {
      FightDlg = module.FightDlg;
    }, function (module) {
      DlgKit = module.DlgKit;
    }, function (module) {
      FUISys = module.FUISys;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffPlay = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      NpcFighter = module.NpcFighter;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      Fight = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d36f6a/hghMJJWyJG2+cNdj", "FightPlay", undefined);

      var FightPlay = exports('default', /*#__PURE__*/function (_PlayBase) {
        _inheritsLoose(FightPlay, _PlayBase);

        function FightPlay() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _PlayBase.call.apply(_PlayBase, [this].concat(args)) || this;
          _this._buffPlay = void 0;
          _this._curFight = void 0;
          _this._cardFgoPool = void 0;
          _this.playName = "FightPlay";
          return _this;
        }

        var _proto = FightPlay.prototype;

        _proto.OnInit = function OnInit(complete) {
          var fui = this.sys(FUISys);
          this._cardFgoPool = fui.allocPool(fui.toUrl(FightCfg.cardRes[0], FightCfg.cardRes[1]));
          complete();
        };

        _proto.OnLateInit = function OnLateInit(complete) {
          this._buffPlay = tc.p(BuffPlay);
          complete();
        };

        _proto.OnDispose = function OnDispose() {};

        _proto.startFight = function startFight(enemysNpcId) {
          if (this._curFight) {
            console.error("already have a fight");
            return;
          }

          var dlg = this.kit(DlgKit).fetchDlg(FightDlg);
          var enemys = enemysNpcId.map(function (id) {
            return new NpcFighter(id);
          });
          this._curFight = new Fight([tc.p(PlayerPlay).player], enemys);
          dlg.setFight(this._curFight);
        };

        _proto.endFight = function endFight() {
          tc.p(CardPlay).choosingTarget = null;

          this._curFight.Dispose();

          this._curFight = null;
        }
        /**计算打击伤害 */
        ;

        _proto.calcHitDmg = function calcHitDmg(base, from, to) {
          var upFinal = base;
          var upScale = 100;

          if (from) {
            var fromPower = from.buff.numOf(BuffId.power);
            var fromCizhenZf = from.buff.numOf(BuffId.CizhenZf);
            var fromQiangtouZf = from.buff.numOf(BuffId.QiangtouZf) > 0 ? base + fromPower : 0;
            upFinal += fromPower + fromCizhenZf + fromQiangtouZf;

            if (from.buff.isMorethan(BuffId.weak, 0)) {
              upFinal -= upFinal * parseInt(this._buffPlay.propOf(BuffId.weak).scale) / 100;
            }
          }

          if (to) {
            var isXuwu = to.buff.isMorethan(BuffId.Xuwu, 0);

            if (isXuwu) {
              return 1;
            }

            var isFlying = to.buff.isMorethan(BuffId.Feixing, 0);
            var isFragile = to.buff.isMorethan(BuffId.fragile, 0);

            if (isFragile) {
              upScale += parseInt(this._buffPlay.propOf(BuffId.fragile).scale);
            }

            if (isFlying) {
              upScale -= parseInt(this._buffPlay.propOf(BuffId.Feixing).scale);
            }
          }

          return Math.max(1, Math.floor(upFinal * upScale / 100));
        }
        /**计算护甲修改值 */
        ;

        _proto.calcShieldMod = function calcShieldMod(base, to) {
          if (base < 1) return base;
          var toTizhi = to.buff.numOf(BuffId.Tizhi);
          var toKuju = to.buff.get(BuffId.Kongju);
          var upFinal = base + toTizhi;
          var scale = 100;

          if (toKuju) {
            scale -= parseInt(this._buffPlay.propOf(BuffId.Kongju).scale);
          }

          return Math.max(1, Math.floor(upFinal * scale / 100));
        };

        _createClass(FightPlay, [{
          key: "cardFgoPool",
          get: function get() {
            return this._cardFgoPool;
          }
        }]);

        return FightPlay;
      }(PlayBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FightRwdChooseWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './PlayerPlay.ts', './TreasurePlay.ts', './UIWrap.ts', './PreviewCardWrap.ts', './PlayerCardSetCom.ts', './AdPlay.ts', './TreasureItemWrap.ts', './TreasureConfirmDlg.ts', './DlgKit.ts', './ItemFly.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, tc, PlayerPlay, TreasurePlay, UIWrap, PreviewCardWrap, PlayerCardSetCom, AdPlay, TreasureItemWrap, TreasureConfirmDlg, DlgKit, ItemFly;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      TreasurePlay = module.default;
    }, function (module) {
      UIWrap = module.default;
    }, function (module) {
      PreviewCardWrap = module.PreviewCardWrap;
    }, function (module) {
      PlayerCardSetCom = module.PlayerCardSetCom;
    }, function (module) {
      AdPlay = module.default;
    }, function (module) {
      TreasureItemWrap = module.default;
    }, function (module) {
      TreasureConfirmDlg = module.TreasureConfirmDlg;
    }, function (module) {
      DlgKit = module.DlgKit;
    }, function (module) {
      ItemFly = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "aba6cTe3MhEIpcpGZh/EGqZ", "FightRwdChooseWrap", undefined);

      var FightRwdChooseWrap = exports('FightRwdChooseWrap', /*#__PURE__*/function (_UIWrap) {
        _inheritsLoose(FightRwdChooseWrap, _UIWrap);

        function FightRwdChooseWrap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIWrap.call.apply(_UIWrap, [this].concat(args)) || this;
          _this._pplay = void 0;
          _this._tplay = void 0;
          _this._adplay = void 0;
          _this._player = void 0;
          _this._ctrl = void 0;
          return _this;
        }

        var _proto = FightRwdChooseWrap.prototype;

        _proto.setupCard = function setupCard(cardId, onChoose) {
          var _this2 = this;

          var cardGo = this.getChild("card");
          this._ctrl.selectedIndex = 0;
          this.wrap(PreviewCardWrap, cardGo).showCard(cardId, function (id) {
            cardGo.visible = false;

            _this2._player.c.get(PlayerCardSetCom).addCard(id);

            ItemFly.flyCard(0, 1, id, cardGo);
            onChoose();
          });
        };

        _proto.setupExtra = function setupExtra(option) {
          var _this3 = this;

          var aim = option.aim;
          this._ctrl.selectedIndex = 1;
          this.addBtnEvt("addExtraRwd", function (e) {
            console.log("addExtraRwd");

            _this3._adplay.playAd({
              onAdRwd: function onAdRwd() {
                option.onExtra();

                if (aim == "card") {
                  _this3.setupCard(option.cardId, option.passonOnChoose);
                } else if (aim == "trea") {
                  _this3.setupTrea(option.treaId, option.passonOnChoose);
                }
              }
            });
          });
        };

        _proto.setupTrea = function setupTrea(treaId, onChoose) {
          var _this4 = this;

          this._ctrl.selectedIndex = 2;
          var go = this.getChild("trea");
          this.wrap(TreasureItemWrap, go).refresh({
            id: treaId,
            iconPopIntro: false
          }, 0);
          this.addBtnEvt("trea", function (e) {
            tc.k(DlgKit).fetchDlg(TreasureConfirmDlg).setup(treaId, function (tid) {
              go.visible = false;
              _this4.fgc.touchable = false;

              _this4.addDelay(.3, function () {
                ItemFly.flyTreasure(0, 1, tid, function () {
                  _this4._player.treasure.add(tid);
                }, go, null, go.scaleX);
                onChoose();
              });
            });
            e();
          });
        };

        _proto.OnInit = function OnInit() {
          this._pplay = tc.p(PlayerPlay);
          this._tplay = tc.p(TreasurePlay);
          this._adplay = tc.p(AdPlay);
          this._player = this._pplay.player;
          this._ctrl = this.getController("type");
        };

        return FightRwdChooseWrap;
      }(UIWrap));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FightRwdDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DlgBase.ts', './Util.ts', './ItemFly.ts', './TipDlg.ts', './tc.ts', './PlayerPlay.ts', './BuffId.ts', './UIDocker.ts', './RewardChooseDlg.ts', './CardPlay.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, DlgBase, isNull, ItemFly, TipDlg, tc, PlayerPlay, BuffId, UIDocker, RewardChooseDlg, CardPlay;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      isNull = module.isNull;
    }, function (module) {
      ItemFly = module.default;
    }, function (module) {
      TipDlg = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      UIDocker = module.UIDocker;
    }, function (module) {
      RewardChooseDlg = module.RewardChooseDlg;
    }, function (module) {
      CardPlay = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7ea6e7mQbBDJbiiYLeMB5DB", "FightRwdDlg", undefined);

      var FightRwdDlg = exports('FightRwdDlg', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(FightRwdDlg, _DlgBase);

        function FightRwdDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._continue = void 0;
          _this._rwdList = void 0;
          _this._cardRwd = void 0;
          _this._treaRwd = void 0;
          _this._coinRwd = void 0;
          _this._curCards = void 0;
          _this._curTreasures = void 0;
          _this._coinNum = void 0;
          _this._rwdNum = void 0;
          _this._claimNum = void 0;
          _this._onClaimOver = void 0;
          return _this;
        }

        var _proto = FightRwdDlg.prototype;

        _proto.setup = function setup(option) {
          var rwdNum = 0;

          if (!option.cardRwd) {
            this._rwdList.getChild("cardRwd").dispose();
          } else {
            rwdNum++;
          }

          if (isNull(option.treaRwd)) {
            this._rwdList.getChild("treaRwd").dispose();
          } else {
            rwdNum++;
          }

          if (isNull(option.coinRwd) || option.coinRwd < 1) {
            this._rwdList.getChild("coinRwd").dispose();
          } else {
            this._coinNum = option.coinRwd;
            this._coinRwd.title = 'X' + option.coinRwd.toString();
            rwdNum++;
          }

          this._curCards = tc.p(CardPlay).randomCardsFromPool(3);
          this._curTreasures = option.treaRwd;
          this._rwdNum = rwdNum;
          this._onClaimOver = option.onClaimOver;
          FightRwdDlg.extraCard = false;
          FightRwdDlg.extraTrea = false;
          return this;
        };

        _proto.OnInit = function OnInit() {
          this.dock(UIDocker.Dock.GhostUp);
          this._continue = this.getBtn("continue");
          this._rwdList = this.getList("rwdList");
          this._claimNum = 0;
          this._rwdNum = 0;
          this._coinNum = 0;
          this._onClaimOver = null;

          var cardRwd = this._cardRwd = this._rwdList.getChild("cardRwd");

          var treaRwd = this._treaRwd = this._rwdList.getChild("treaRwd");

          var coinRwd = this._coinRwd = this._rwdList.getChild("coinRwd");

          this.addBtnEvt(cardRwd, this._onCardRwd);
          this.addBtnEvt(treaRwd, this._onTreaRwd);
          this.addBtnEvt(coinRwd, this._onCoinRwd);
          this.addBtnEvt(this._continue, this._onContinue);
        };

        _proto.OnBgClickClose = function OnBgClickClose() {
          return false;
        };

        _proto._onContinue = function _onContinue(enableBtn) {
          var _this$_onClaimOver;

          if (this._claimNum < this._rwdNum) {
            TipDlg.pop("有尚未领取的奖励");
            enableBtn();
            return;
          }

          this.close();
          (_this$_onClaimOver = this._onClaimOver) == null ? void 0 : _this$_onClaimOver.call(this);
        };

        _proto._onCardRwd = function _onCardRwd(enableBtn) {
          var _this2 = this;

          this.dlgKit.fetchDlg(RewardChooseDlg).setupForCard({
            cards: this._curCards,
            onChoose: function onChoose() {
              _this2._claimNum++;
              _this2._cardRwd.enabled = false;
              _this2._cardRwd.alpha = 0.5;
            }
          });
          enableBtn();
        };

        _proto._onTreaRwd = function _onTreaRwd(enableBtn) {
          var _this3 = this;

          this.dlgKit.fetchDlg(RewardChooseDlg).setupForTreasure({
            treas: this._curTreasures,
            onChoose: function onChoose() {
              _this3._claimNum++;
              _this3._treaRwd.enabled = false;
              _this3._treaRwd.alpha = .5;
            }
          });
          enableBtn();
        };

        _proto._onCoinRwd = function _onCoinRwd() {
          var player = tc.p(PlayerPlay).player;
          var coin = this._coinNum;
          ItemFly.flyCoin(coin, this._coinRwd.getChild("icon"));
          player.buff.mod(BuffId.coin, coin);
          this._coinRwd.alpha = 0.5;
          this._claimNum++;
        };

        _createClass(FightRwdDlg, [{
          key: "dlgRes",
          get: function get() {
            return "FightRwdDlg";
          }
        }]);

        return FightRwdDlg;
      }(DlgBase));
      FightRwdDlg.extraCard = false;
      FightRwdDlg.extraTrea = false;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FireDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui-ccc370.mjs', './ExploreCfg.ts', './DlgBase.ts', './DlgKit.ts', './BuffId.ts', './PlayerTreasureCom.ts', './PlayerPlay.ts', './TreasureId.ts', './TreasurePlay.ts', './tc.ts', './CardConfirmDlg.ts', './HoverTipDlg.ts', './LoadingDlg.ts', './TipDlg.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, Event, ExploreCfg, DlgBase, DlgKit, BuffId, PlayerTreasureCom, PlayerPlay, TreasureId, TreasurePlay, tc, CardConfirmDlg, HoverTipDlg, LoadingDlg, TipDlg;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Event = module.Event;
    }, function (module) {
      ExploreCfg = module.default;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgKit = module.DlgKit;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      PlayerTreasureCom = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      TreasurePlay = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardConfirmDlg = module.default;
    }, function (module) {
      HoverTipDlg = module.default;
    }, function (module) {
      LoadingDlg = module.default;
    }, function (module) {
      TipDlg = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6377aL7fjVGM72110KKgsMA", "FireDlg", undefined);

      var FireDlg = exports('default', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(FireDlg, _DlgBase);

        function FireDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._recover = void 0;
          _this._remove = void 0;
          _this._seek = void 0;
          _this._onOver = void 0;
          return _this;
        }

        FireDlg.pop = function pop(onOver) {
          var dlg = tc.k(DlgKit).fetchDlg(FireDlg);

          dlg._setOnOver(onOver);

          return dlg;
        };

        var _proto = FireDlg.prototype;

        _proto.OnInit = function OnInit() {
          var _this2 = this;

          var tplay = tc.p(TreasurePlay);
          var player = tc.p(PlayerPlay).player;
          var playerTreasuer = player.c.get(PlayerTreasureCom);
          var buff = player.buff;
          var maxRecover = buff.numOf(BuffId.maxhp) - buff.numOf(BuffId.hp);
          var baozhenExtraRecover = playerTreasuer.has(TreasureId.Baozhen) ? tplay.infoOf(TreasureId.Baozhen).getIntVal('extra') : 0;
          var hpRecover = Math.min(maxRecover, Math.floor(buff.numOf(BuffId.maxhp) * ExploreCfg.fire.recover * 0.01) + baozhenExtraRecover);
          var btnList = this.getList("btns");
          this._recover = btnList.getChild("recover");
          this._remove = btnList.getChild("remove");
          this._seek = btnList.getChild("seek"); // this._recover.title = `休息(回复 ${hpRecover} 点血量)`

          this.addFgoEvt(this._recover, Event.ROLL_OVER, function () {
            HoverTipDlg.show("休息", "\u5C06\u56DE\u590D " + hpRecover + " \u70B9\u8840\u91CF");
          });
          this.addFgoEvt(this._recover, Event.ROLL_OUT, function () {
            HoverTipDlg.hide();
          });

          this._recover.onClick(function () {
            LoadingDlg.delay(1, function () {
              player.recoverHp(hpRecover, "FireDlg");
              TipDlg.pop("\u56DE\u590D " + hpRecover + " \u70B9\u8840\u91CF");

              _this2._exitEvent();
            });
          });

          this._remove.onClick(function () {
            CardConfirmDlg.popRemove(function () {
              _this2._exitEvent();
            });
          });

          this._seek.removeFromParent(); // this.addBtnEvt('exit', (enableBtn) => {
          //     AlertDlg.pop({
          //         tip: "是否确认离开",
          //         onYes: () => {
          //             this._exitEvent();
          //             enableBtn()
          //         },
          //         onNo: () => {
          //             enableBtn()
          //         }
          //     })
          // })

        };

        _proto._setOnOver = function _setOnOver(onOver) {
          this._onOver = onOver;
        };

        _proto._exitEvent = function _exitEvent() {
          var _this$_onOver;

          (_this$_onOver = this._onOver) == null ? void 0 : _this$_onOver.call(this);
          this.close();
        };

        _proto.OnGetBgAlpha = function OnGetBgAlpha() {
          return 0;
        };

        _createClass(FireDlg, [{
          key: "dlgRes",
          get: function get() {
            return "FireDlg";
          }
        }]);

        return FireDlg;
      }(DlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FireEvent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FireDlg.ts', './tc.ts', './AExploreNodeHandler.ts', './ExplorePlay.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, FireDlg, tc, AExploreNodeHandler, ExplorePlay;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FireDlg = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      AExploreNodeHandler = module.AExploreNodeHandler;
    }, function (module) {
      ExplorePlay = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bec65XEhddPJr39AAzt6+/e", "FireEvent", undefined);

      var FireEvent = exports('FireEvent', /*#__PURE__*/function (_AExploreNodeHandler) {
        _inheritsLoose(FireEvent, _AExploreNodeHandler);

        function FireEvent() {
          return _AExploreNodeHandler.apply(this, arguments) || this;
        }

        var _proto = FireEvent.prototype;

        _proto.exec = function exec() {
          FireDlg.pop(function () {
            tc.p(ExplorePlay).continueExplore();
          });
        };

        return FireEvent;
      }(AExploreNodeHandler));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FreeList.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Util.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, isNull;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      isNull = module.isNull;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a4550groWZLrbKGqla6ARjl", "FreeList", undefined);

      var FreeListIterator = exports('FreeListIterator', /*#__PURE__*/function () {
        function FreeListIterator(list) {
          this._list = void 0;
          this._next = void 0;
          this._list = list;
          this._next = 0;
        }

        var _proto = FreeListIterator.prototype;

        _proto.hasNext = function hasNext() {
          return this._next < this._list.size;
        };

        _proto.peekNext = function peekNext() {
          return this._list.at(this._next);
        };

        _proto.getNext = function getNext() {
          return this._list.at(this._next++);
        };

        _proto.moveNext = function moveNext() {
          ++this._next;
        };

        _createClass(FreeListIterator, [{
          key: "nextIndex",
          get: function get() {
            return this._next;
          }
        }, {
          key: "_nextIndex",
          get: function get() {
            return this._next;
          },
          set: function set(value) {
            this._next = value;
          }
        }]);

        return FreeListIterator;
      }());
      /**
       * 一个自由的list，在使用遍历器遍历的过程中，可以删除任意元素
       */

      var FreeList = exports('FreeList', /*#__PURE__*/function () {
        function FreeList(ary) {
          this._ary = void 0;
          this._it = void 0;
          this._tempIts = void 0;
          this._poolIts = void 0;
          this._ary = ary || [];
          this._it = new FreeListIterator(this);
        }
        /**
         * re-get the iterator of list
         */


        var _proto2 = FreeList.prototype;
        /**
         * begin a safe visit with iterator
         * @returns iterator for visiting
         */

        _proto2.beginVisit = function beginVisit() {
          var it;

          if (!this._tempIts) {
            this._tempIts = [];
          }

          if (this._poolIts && this._poolIts.length > 0) {
            it = this._poolIts.pop();
          } else {
            it = new FreeListIterator(this);
          }

          it._nextIndex = 0;

          this._tempIts.push(it);

          return it;
        }
        /**
         * End a visit
         * @param iit 
         */
        ;

        _proto2.endVisit = function endVisit(iit) {
          var it = iit;

          var idx = this._tempIts.indexOf(it);

          if (idx !== -1) {
            this._tempIts.splice(idx, 1);

            if (!this._poolIts) {
              this._poolIts = [];
            }

            this._poolIts.push(it);
          }
        }
        /**
         * elm count of list
         */
        ;
        /**
         * return elm at index of i
         */


        _proto2.at = function at(i) {
          return this._ary[i];
        }
        /**
         * 返回列表的第一个元素，失败就返回空
         */
        ;
        /**
         * add t at the end of list
         * @param t
         */


        _proto2.push = function push(t) {
          this._adjustItByAdd(this._ary.length, 1);

          return this._ary.push(t);
        }
        /**
         * remove the last elm
         */
        ;

        _proto2.pop = function pop() {
          if (this._ary.length > 0) {
            this._adjustItByRemove(this._ary.length - 1, 1);

            return this._ary.pop();
          }

          return undefined;
        }
        /**
         * add t at the front of list
         * @param t
         */
        ;

        _proto2.unshift = function unshift(t) {
          this._adjustItByAdd(0, 1);

          return this._ary.unshift(t);
        }
        /**
         * remove elm at the front of list
         */
        ;

        _proto2.shift = function shift() {
          if (this._ary.length > 0) {
            this._adjustItByRemove(0, 1);

            return this._ary.shift();
          }

          return undefined;
        }
        /**
         * 查找给定元素在列表中的索引，失败返回-1
         * @param t 待查找元素
         * @param startIdx 开始查找位置，可选，默认0
         * @returns 指定元素在列表中的索引，没有找到返回-1
         */
        ;

        _proto2.indexOf = function indexOf(t, startIdx) {
          return this._ary.indexOf(t, startIdx);
        }
        /**
         * 查找符合条件的元素在列表中的索引，失败返回-1
         * @param condition 添加判断函数，返回true表示符合条件
         * @param startIdx 开始查找位置，可选，默认0
         * @returns （第一个）符合条件的元素在列表中的索引，没有找到返回-1
         */
        ;

        _proto2.indexIf = function indexIf(condition, startIdx) {
          if (!startIdx) {
            startIdx = 0;
          }

          for (var i = startIdx; i < this._ary.length; ++i) {
            if (condition(this._ary[i])) {
              return i;
            }
          }

          return -1;
        }
        /**
         * 查找第一个符合条件的元素，返回元素本身
         * @param condition 条件判断函数
         * @returns （第一个）符合条件的函数，没有找到返回空
         */
        ;

        _proto2.findFirstIf = function findFirstIf(condition) {
          for (var i = 0; i < this._ary.length; ++i) {
            if (condition(this._ary[i])) {
              return this._ary[i];
            }
          }

          return undefined;
        }
        /**
         * 移除给定元素
         * @param t 待移除的元素
         * @returns 移除成功返回被移除的元素，移除失败返回空
         */
        ;

        _proto2.remove = function remove(t) {
          return this.removeAt(this.indexOf(t));
        }
        /**
         * 移除给定位置的元素
         * @param idx 待移除的元素的位置
         * @returns 移除成功返回被移除的元素，移除失败返回空
         */
        ;

        _proto2.removeAt = function removeAt(idx) {
          if (idx >= 0 && idx < this._ary.length) {
            this._adjustItByRemove(idx, 1);

            var ret = this._ary[idx];

            this._ary.splice(idx, 1);

            return ret;
          }

          return undefined;
        };

        _proto2.splice = function splice(startIdx, len) {
          var idx = startIdx;

          if (idx >= 0 && idx < this._ary.length) {
            len = Math.min(len, this._ary.length - idx);

            this._adjustItByRemove(idx, len);

            return this._ary.splice(idx, len);
          }

          return undefined;
        }
        /**
         * 移除第一个符合条件的元素
         */
        ;

        _proto2.removeFirstIf = function removeFirstIf(callback, startIdx) {
          if (!startIdx) {
            startIdx = 0;
          }

          for (var i = startIdx; i < this._ary.length; ++i) {
            if (callback(this._ary[i])) {
              return this.removeAt(i);
            }
          }

          return undefined;
        }
        /**
         * 移除所有符合条件的元素
         */
        ;

        _proto2.removeIf = function removeIf(callback) {
          var array = this._ary;

          if (array.length == 0) {
            return;
          }

          var index = 0;
          var current = 0;

          for (; index < array.length; index++) {
            if (!callback(array[index])) {
              array[current++] = array[index];
            }
          }

          if (current < index) {
            this._adjustItByRemove(current, index - current);

            array.splice(current, index - current);
          }
        }
        /**
         * 插入元素
         */
        ;

        _proto2.insert = function insert(t, idx) {
          if (idx < 0 || idx >= this._ary.length) {
            return this.push(t);
          }

          this._adjustItByAdd(idx, 1);

          this._ary.splice(idx, 0, t);

          return this._ary.length;
        }
        /**
         * 遍历元素，遍历期间不能删除元素（否则行为未知）
         * @param loop 遍历函数，返回false表示退出遍历，返回其它继续遍历
         * @param startIdx 开始遍历索引，可选，默认从0开始遍历
         * @return 是否完全遍历，返回false表示中间退出了
         */
        ;

        _proto2.foreach_unsafe = function foreach_unsafe(loop, startIdx) {
          startIdx || (startIdx = 0);

          for (var i = startIdx; i < this._ary.length; ++i) {
            if (loop(this._ary[i]) === false) {
              return false;
            }
          }

          return true;
        }
        /**
         * 遍历元素，遍历期间可以任意添加删除元素
         * @param loop 遍历函数，返回false表示退出遍历
         * @param startIdx 遍历开始索引，可选，默认0
         * @return 是否完全遍历，返回false表示中间退出了
         */
        ;

        _proto2.foreach = function foreach(loop, startIdx) {
          startIdx || (startIdx = 0);
          var it = this.it;

          while (it.hasNext()) {
            if (it.nextIndex < startIdx) {
              //未到索引区域
              it.moveNext();
              continue;
            }

            if (loop(it.getNext()) === false) {
              //退出
              return false;
            }
          }

          return true;
        }
        /**
         * 遍历元素（绝对安全版本），遍历期间可以任意添加删除元素
         * @param loop 遍历函数，返回false表示退出遍历
         * @param startIdx 遍历开始索引，可选，默认0
         * @return 是否完全遍历，返回false表示中间退出了
         */
        ;

        _proto2.foreach_safe = function foreach_safe(loop, startIdx) {
          var ret = true;
          startIdx || (startIdx = 0);
          var it = this.beginVisit();

          while (it.hasNext()) {
            if (it.nextIndex < startIdx) {
              //未到索引区域
              it.moveNext();
              continue;
            }

            if (loop(it.getNext()) === false) {
              //退出
              ret = false;
              break;
            }
          }

          this.endVisit(it);
          return ret;
        };

        _proto2.map = function map(mapFunc) {
          var rltArr = [];
          var index = 0;
          this.foreach_unsafe(function (item) {
            rltArr.push(mapFunc(item, index++));
            return true;
          });
          return rltArr;
        }
        /**
         * 清理列表
         */
        ;

        _proto2.clear = function clear() {
          this._it._nextIndex = 0;
          this._ary.length = 0;

          if (this._tempIts) {
            for (var i = 0; i < this._tempIts.length; ++i) {
              var it = this._tempIts[i];
              it._nextIndex = 0;
            }
          }
        }
        /**
         * 列表克隆
         * @param from 待克隆的起始元素索引，可选，默认0
         * @param len 克隆数量，可选，不填表示从from拷贝到列表末尾
         * @returns 克隆列表
         */
        ;

        _proto2.clone = function clone(from, len) {
          return this.copyTo(new FreeList(), from, len);
        }
        /**
         * 列表拷贝
         * @param dst 目标列表
         * @param from 其实元素索引，可选，默认0
         * @param len 拷贝数量，可选，不填表示从from拷贝到列表末尾
         * @returns 目标列表
         */
        ;

        _proto2.copyTo = function copyTo(dst, from, len) {
          from = Math.max(0, from || 0);

          if (isNull(len)) {
            len = this._ary.length;
          }

          var endIdx = Math.min(from + len, this._ary.length);

          for (var i = from; i < endIdx; ++i) {
            dst.push(this._ary[i]);
          }

          return dst;
        };

        _proto2._adjustItByAdd = function _adjustItByAdd(index, count) {
          if (this._it._nextIndex > index) {
            this._it._nextIndex += count;
          }

          if (this._tempIts) {
            for (var i = 0; i < this._tempIts.length; ++i) {
              var it = this._tempIts[i];

              if (it._nextIndex > index) {
                it._nextIndex += count;
              }
            }
          }
        };

        _proto2._adjustItByRemove = function _adjustItByRemove(index, count) {
          if (this._it._nextIndex > index) {
            var endIdx = index + count;
            this._it._nextIndex = Math.max(endIdx, this._it._nextIndex) - count;
          }

          if (this._tempIts) {
            for (var i = 0; i < this._tempIts.length; ++i) {
              var it = this._tempIts[i];

              if (it._nextIndex > index) {
                it._nextIndex = Math.max(index + count, it._nextIndex) - count;
              }
            }
          }
        };

        _createClass(FreeList, [{
          key: "it",
          get: function get() {
            this._it._nextIndex = 0;
            return this._it;
          }
        }, {
          key: "size",
          get: function get() {
            return this._ary.length;
          }
          /**
           * elm count of list
           */

        }, {
          key: "length",
          get: function get() {
            return this._ary.length;
          }
        }, {
          key: "front",
          get: function get() {
            return this._ary[0];
          }
          /**
           * 返回列表的最后一个元素，失败就返回空
           */

        }, {
          key: "back",
          get: function get() {
            return this._ary[this._ary.length - 1];
          }
        }]);

        return FreeList;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FuhuoBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Util.ts', './tc.ts', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts', './BuffPlay.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, randomInt, tc, ABuffCom, BuffId, BuffNS, BuffPlay;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      randomInt = module.randomInt;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }, function (module) {
      BuffPlay = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7e19dXpAfFNwqVz4uvQs21F", "FuhuoBuffCom", undefined);

      var FuhuoBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(FuhuoBuffCom, _ABuffCom);

        function FuhuoBuffCom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ABuffCom.call.apply(_ABuffCom, [this].concat(args)) || this;
          _this._odds = void 0;
          _this._maxhp2hp = void 0;
          return _this;
        }

        var _proto = FuhuoBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this._odds = parseInt(tc.p(BuffPlay).propOf(this.buff.id).odds);
          this._maxhp2hp = parseInt(tc.p(BuffPlay).propOf(this.buff.id).maxhp2hp);
          this.setOrder(BuffNS.EffectStage.OnTryRevive, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {
          this._odds = null;
          this._maxhp2hp = null;
        };

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.OnTryRevive) {
            if (randomInt(0, 100) < this._odds) {
              if (arg.reviveCallback(Math.ceil(this.owner.buff.numOf(BuffId.maxhp) * this._maxhp2hp / 100))) {
                this.modSelfNum(-1);
              }
            }
          }
        };

        return FuhuoBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FUISys.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs', './fairygui-ccc370.mjs', './FgoPool.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, UITransform, Widget, Vec2, SysBase, GRoot, UIPackage, GObjectPool, FgoPool;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      UITransform = module.UITransform;
      Widget = module.Widget;
      Vec2 = module.Vec2;
    }, function (module) {
      SysBase = module.SysBase;
    }, function (module) {
      GRoot = module.GRoot;
      UIPackage = module.UIPackage;
      GObjectPool = module.GObjectPool;
    }, function (module) {
      FgoPool = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e89c2KRGCNFDoEUpyHxuQ9u", "FUISys", undefined);

      var FUISys = exports('FUISys', /*#__PURE__*/function (_SysBase) {
        _inheritsLoose(FUISys, _SysBase);

        function FUISys() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _SysBase.call.apply(_SysBase, [this].concat(args)) || this;
          _this.sysName = "FUISys";
          _this._allUILoaded = false;
          _this._UILoadedCB = void 0;
          _this._fgoPool = void 0;
          return _this;
        }

        var _proto = FUISys.prototype;

        _proto.OnInit = function OnInit(complete) {
          GRoot.create();
          this.root.node.getComponent(UITransform).setContentSize(1920, 1080);
          var rootWidget = this.root.node.addComponent(Widget);
          rootWidget.isAlignHorizontalCenter = true;
          UIPackage.loadPackage("UI/Main", this._onUILoaded.bind(this));
          this._fgoPool = new GObjectPool();
          complete();
        };

        _proto.OnLateInit = function OnLateInit(complete) {
          if (this._allUILoaded) {
            complete();
          } else {
            this._UILoadedCB = complete;
          }
        };

        _proto.OnDispose = function OnDispose() {};

        _proto._onUILoaded = function _onUILoaded() {
          var _this$_UILoadedCB;

          this._allUILoaded = true;
          (_this$_UILoadedCB = this._UILoadedCB) == null ? void 0 : _this$_UILoadedCB.call(this);
        };

        _proto.createObject = function createObject(pak, name) {
          return UIPackage.createObject(pak, name);
        };

        _proto.toUrl = function toUrl(pak, name) {
          return UIPackage.getItemURL(pak, name);
        };

        _proto.toUrlByArr = function toUrlByArr(pair) {
          return UIPackage.getItemURL(pair[0], pair[1]);
        };

        _proto.allocPool = function allocPool(url) {
          return FgoPool.alloc(url);
        };

        _proto.freePool = function freePool(pool) {
          FgoPool.free(pool);
        };

        _proto.centerOfGlobal = function centerOfGlobal(fgo) {
          var pivotX = fgo.pivotAsAnchor ? 0.5 - fgo.pivotX : 0.5;
          var pivotY = fgo.pivotAsAnchor ? 0.5 - fgo.pivotY : 0.5;
          var localCenter = new Vec2(fgo.width * pivotX, fgo.height * pivotY);
          return fgo.localToGlobal(localCenter.x, localCenter.y);
        };

        _createClass(FUISys, [{
          key: "fgoPool",
          get: function get() {
            return this._fgoPool;
          }
        }, {
          key: "root",
          get: function get() {
            return GRoot.inst;
          }
        }]);

        return FUISys;
      }(SysBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FushiAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './BuffId.ts', './NpcPropFunc.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, BuffId, NpcPropFunc, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "341d4aWxgNHbpVp/PS1cBQy", "FushiAct", undefined);

      var FushiAct = exports('FushiAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(FushiAct, _ActBase);

        function FushiAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = FushiAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            title: "腐蚀攻击",
            icon: IntensionCfg.res.tactics,
            iconTip: '',
            content: "\u8FD9\u540D\u654C\u4EBA\u65BD\u52A02\u79CD\u8D1F\u9762\u6548\u679C\u3002"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.skill_act_byskill_over(function () {
            _this.target.buff.mod(BuffId.fragile, _this.fragile);

            _this.target.buff.mod(BuffId.weak, _this.weak);
          }, onOver);
        };

        _createClass(FushiAct, [{
          key: "fragile",
          get: function get() {
            return parseInt(this.getProp(NpcPropFunc.fushi).args[0]);
          }
        }, {
          key: "weak",
          get: function get() {
            return parseInt(this.getProp(NpcPropFunc.fushi).args[1]);
          }
        }]);

        return FushiAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameGM.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f8eb0+MkVZLkqrnJpi/s1lD", "GameGM", undefined);
      /*
      * 游戏GM指令实现
      */


      var GameGM = exports('default', /*#__PURE__*/function () {
        function GameGM() {}

        GameGM.handleGM = function handleGM(gmd) {
          var func = GameGM[gmd.cmd];

          if (func) {
            func.apply(this, [gmd]);
            return true;
          } else {
            return false;
          }
        };

        GameGM.debuging = function debuging() {
          this.isDebuging = true;
          console.log("now is debuging");
        };

        return GameGM;
      }());
      GameGM.isDebuging = false;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GebulAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AttackAct.ts', './NpcAIBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AttackAct, NpcAIBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      NpcAIBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0d0e4lYEZlCgLzW3yh0Lop8", "GebulAI", undefined);

      var GebulAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(GebulAI, _NpcAIBase);

        function GebulAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = GebulAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          return new AttackAct(this.npc);
        };

        return GebulAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GebulgsAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AttackAct.ts', './MiaozhunAct.ts', './MulAttackAct.ts', './NpcAIBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AttackAct, MiaozhunAct, MulAttackAct, NpcAIBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      MiaozhunAct = module.MiaozhunAct;
    }, function (module) {
      MulAttackAct = module.default;
    }, function (module) {
      NpcAIBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "61eb2rhv2ZGva7PVjn+7EFK", "GebulgsAI", undefined);

      var GebulgsAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(GebulgsAI, _NpcAIBase);

        function GebulgsAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = GebulgsAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          if (actNum % 3 == 0) {
            return new MiaozhunAct(this.npc);
          } else if (actNum % 3 == 1) {
            return new AttackAct(this.npc);
          } else {
            return new MulAttackAct(this.npc);
          }
        };

        return GebulgsAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GelieBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "fa875FHvhhCrZFkuZQQXI2Y", "GelieBuffCom", undefined);

      var GelieBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(GelieBuffCom, _ABuffCom);

        function GelieBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = GelieBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.AnyHandCardUsed, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.AnyHandCardUsed) {
            this.owner.cutHp(this.buff.num, null, this.buff.info.name);
          }
        };

        return GelieBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GelieFeatrueBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CardId.ts', './PlayerFightCardCom.ts', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, CardId, PlayerFightCardCom, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      CardId = module.CardId;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "affa5wEYQtBdJK+2tHH+vv6", "GelieFeatrueBuffCom", undefined);

      var GelieFeatrueBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(GelieFeatrueBuffCom, _ABuffCom);

        function GelieFeatrueBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = GelieFeatrueBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.HurtOther, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HurtOther) {
            if (arg.hurtTarget.info.isPlayer) {
              var _arg$hurtTarget$c$get;

              (_arg$hurtTarget$c$get = arg.hurtTarget.c.get(PlayerFightCardCom)) == null ? void 0 : _arg$hurtTarget$c$get.addCard2Draw(CardId.Gelie);
            }
          }
        };

        return GelieFeatrueBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GivebuffAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './NpcPropFunc.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, NpcPropFunc, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d731aMa/vhJrJiVcO5GiXDB", "GivebuffAct", undefined);
      /** give buff to player */


      var GivebuffAct = exports('GivebuffAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(GivebuffAct, _ActBase);

        function GivebuffAct(actor, suffix) {
          var _this;

          if (suffix === void 0) {
            suffix = "";
          }

          _this = _ActBase.call(this, actor) || this;
          _this._customFunc = void 0;
          _this._customFunc = NpcPropFunc.givebuff + suffix;
          return _this;
        }

        var _proto = GivebuffAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          var _this$_title;

          return {
            icon: IntensionCfg.res.tactics,
            iconTip: '',
            title: (_this$_title = this._title) != null ? _this$_title : "诡计",
            content: "\u8FD9\u540D\u654C\u4EBA\u5C06\u8981\u5B9E\u884C\u4E00\u4E2A\u8BE1\u8BA1\u3002"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this2 = this;

          this.skill_act_byskill_over(function () {
            _this2.target.buff.smartMod(parseInt(_this2.getProp(_this2._customFunc).args[0]), parseInt(_this2.getProp(_this2._customFunc).args[1]), {
              log: "GivebuffAct " + _this2._customFunc
            });
          }, onOver);
        };

        _createClass(GivebuffAct, [{
          key: "_title",
          get: function get() {
            return this.getProp(this._customFunc).args[2];
          }
        }]);

        return GivebuffAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GMCmd.ts", ['cc', './Util.ts', './TipDlg.ts'], function (exports) {
  'use strict';

  var cclegacy, isNull, TipDlg;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      isNull = module.isNull;
    }, function (module) {
      TipDlg = module.default;
    }],
    execute: function () {
      exports('Private', void 0);

      cclegacy._RF.push({}, "0449f90I0dHf42swoQLC4bT", "GMCmd", undefined);

      var Private;
      /**
       * gm指令
       */

      (function (_Private) {
        var GM;

        (function (_GM) {
          var GMD = /*#__PURE__*/function () {
            function GMD() {
              this.execStr = void 0;
              this.cmd = void 0;
              this.arg = void 0;
              this.args = void 0;
            }

            var _proto = GMD.prototype;

            _proto.parse = function parse(inputStr) {
              if (isNull(inputStr)) {
                return false;
              }

              inputStr.trim();
              var words = new Array();
              var start = 0;

              while (start < inputStr.length) {
                var cur = inputStr.indexOf(' ', start);

                if (cur === -1) {
                  words.push(inputStr.substr(start));
                  break;
                } else {
                  var len = cur - start;

                  if (len > 0) {
                    words.push(inputStr.substr(start, len));
                  }

                  start = cur + 1;
                }
              }

              if (words.length === 0) {
                return false;
              }

              this.cmd = words[0];
              words.splice(0, 1);
              this.args = words;
              this.arg = words.length > 0 ? words[0] : undefined;
              return true;
            };

            return GMD;
          }();

          _GM.GMD = GMD;
        })(GM || (GM = _Private.GM || (_Private.GM = {})));
      })(Private || (Private = exports('Private', {})));

      var GMCmd = exports('default', /*#__PURE__*/function () {
        function GMCmd() {}
        /**
         * 设置GM指令实现函数
         */


        GMCmd.setImpl = function setImpl(func) {
          this._impl = func;
        }
        /**
         * 执行gm指令
         * @param cmdStr gm指令
         */
        ;

        GMCmd.exec_cmd = function exec_cmd(cmdStr) {
          if (!GMCmd._gmd) {
            GMCmd._gmd = new Private.GM.GMD();
          }

          var gmd = GMCmd._gmd;

          if (!gmd.parse(cmdStr)) {
            TipDlg.pop('gm指令解析失败');
            return;
          }

          GMCmd._do_gmd(gmd);
        };

        GMCmd._do_gmd = function _do_gmd(gmd) {
          if (GMCmd._impl && GMCmd._impl(gmd)) {
            return;
          } // MessageTip.popWarnTip(format_string('未知gm指令：{0}', gmd.cmd));


          console.warn("\u672A\u77E5gm\u6307\u4EE4\uFF1A" + gmd.cmd);
        };

        return GMCmd;
      }());
      GMCmd._impl = void 0;
      GMCmd._gmd = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GMDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DlgKit.ts', './UserKit.ts', './Util.ts', './BuffId.ts', './BuffPlay.ts', './CardId.ts', './CardPlay.ts', './PlayerCardSetCom.ts', './PlayerSaveCom.ts', './PlayerTreasureCom.ts', './PlayerPlay.ts', './TreasureId.ts', './TreasurePlay.ts', './TreasureRare.ts', './TrueEndPlay.ts', './ProcessSys.ts', './TimeSys.ts', './tc.ts', './AlertDlg.ts', './TipDlg.ts', './GMCmd.ts', './GMDlgBase.ts', './ItemFly.ts', './TopbarDlg.ts', './FUISys.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, Vec2, DlgKit, DlgLayer, UserKit, randomInt, enumValues, BuffId, BuffPlay, CardId, CardPlay, PlayerCardSetCom, PlayerSaveCom, PlayerTreasureCom, PlayerPlay, TreasureId, TreasurePlay, TreasureRare, TrueEndPlay, ProcessSys, TimeSys, tc, AlertDlg, TipDlg, GMCmd, GMDlgBase, ItemFly, CoinFlyItem, CardFlyItem, TreasureFlyItem, TopbarDlg, FUISys;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec2 = module.Vec2;
    }, function (module) {
      DlgKit = module.DlgKit;
      DlgLayer = module.DlgLayer;
    }, function (module) {
      UserKit = module.default;
    }, function (module) {
      randomInt = module.randomInt;
      enumValues = module.enumValues;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffPlay = module.default;
    }, function (module) {
      CardId = module.CardId;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      PlayerCardSetCom = module.PlayerCardSetCom;
    }, function (module) {
      PlayerSaveCom = module.PlayerSaveCom;
    }, function (module) {
      PlayerTreasureCom = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      TreasurePlay = module.default;
    }, function (module) {
      TreasureRare = module.TreasureRare;
    }, function (module) {
      TrueEndPlay = module.TrueEndPlay;
    }, function (module) {
      ProcessSys = module.default;
    }, function (module) {
      TimeSys = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      AlertDlg = module.default;
    }, function (module) {
      TipDlg = module.default;
    }, function (module) {
      GMCmd = module.default;
    }, function (module) {
      GMDlgBase = module.default;
    }, function (module) {
      ItemFly = module.default;
      CoinFlyItem = module.CoinFlyItem;
      CardFlyItem = module.CardFlyItem;
      TreasureFlyItem = module.TreasureFlyItem;
    }, function (module) {
      TopbarDlg = module.default;
    }, function (module) {
      FUISys = module.FUISys;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0506a3RsilESKXlZon2+NAH", "GMDlg", undefined);
      /*
      * GM首页
      */


      var GMDlg = exports('default', /*#__PURE__*/function (_GMDlgBase) {
        _inheritsLoose(GMDlg, _GMDlgBase);

        function GMDlg() {
          return _GMDlgBase.apply(this, arguments) || this;
        }

        GMDlg.bindGMBtn = function bindGMBtn(btn) {
          if (this._gmbtn) {
            btn.visible = false;
            return;
          }

          tc.k(DlgKit)._getLayer(DlgLayer.GM).addChild(btn);

          btn.draggable = true;
          btn.onClick(function () {
            tc.k(DlgKit).fetchDlg(GMDlg);
          });
          this._gmbtn = btn;
        };

        var _proto = GMDlg.prototype;

        _proto.OnInit = function OnInit() {
          var _this = this;

          _GMDlgBase.prototype.OnInit.call(this, function (cmdInput) {
            GMCmd.exec_cmd(cmdInput);
          });

          this._addBtn("清除数据", function () {
            _this.close();

            AlertDlg.pop({
              tip: "清除数据后你将丢失所有的游戏进度，是否确认？",
              onYes: function onYes() {
                tc.k(UserKit).clear();
                tc.k(UserKit).lock();
                TipDlg.pop("即将退出游戏");
                tc.s(TimeSys).delay(2, function () {
                  tc.s(ProcessSys).exit();
                });
              }
            });
          });

          this._addBtn('+100钻石', function () {
            console.log("+100钻石");
            tc.k(UserKit).diamond += 100;
          });

          this._addBtn("强制保存", function () {
            var _tc$p, _tc$p$player, _tc$p$player$c$get;

            (_tc$p = tc.p(PlayerPlay)) == null ? void 0 : (_tc$p$player = _tc$p.player) == null ? void 0 : (_tc$p$player$c$get = _tc$p$player.c.get(PlayerSaveCom)) == null ? void 0 : _tc$p$player$c$get.save();
            TipDlg.pop("已尝试保存.");

            _this.close();
          });

          this._addBtn("获取所有已解锁宝物", function () {
            var _tc$p2, _tc$p2$player;

            var treasureCom = (_tc$p2 = tc.p(PlayerPlay)) == null ? void 0 : (_tc$p2$player = _tc$p2.player) == null ? void 0 : _tc$p2$player.c.get(PlayerTreasureCom);
            tc.p(TreasurePlay).treasuerPool.forEach(function (id) {
              treasureCom.add(id);
            });

            _this.close();
          });

          this._addBtn("解锁所有", function () {
            tc.p(TreasurePlay).unlockTreasure(999);
            tc.p(CardPlay).unlockcard(999);
          });

          this._addBtn("+1第三章通关次数", function () {
            tc.p(TrueEndPlay).onPassArea3Boss();
          });

          this._addBtn("测试飞道具", function () {
            var topbar = tc.k(DlgKit).fetchDlg(TopbarDlg);
            var root = tc.s(FUISys).root;
            ItemFly.directFly(1, CoinFlyItem.me, new Vec2(randomInt(0, root.width), randomInt(0, root.height)), topbar.coinTxt);
          });

          this._addBtn("测试飞道具2", function () {
            var topbar = tc.k(DlgKit).fetchDlg(TopbarDlg);
            var root = tc.s(FUISys).root;
            ItemFly.boomFly(20, CoinFlyItem.me, 15, new Vec2(randomInt(0, root.width), randomInt(0, root.height)), topbar.coinTxt);
          });

          this._addBtn("测试飞道具3", function () {
            var topbar = tc.k(DlgKit).fetchDlg(TopbarDlg);
            var root = tc.s(FUISys).root;
            ItemFly.rotaingFly(1, CoinFlyItem.me, new Vec2(200, 200), topbar.coinTxt);
          });

          this._addBtn("测试飞牌", function () {
            var topbar = tc.k(DlgKit).fetchDlg(TopbarDlg);
            var root = tc.s(FUISys).root;
            ItemFly.rotatingDirFly(1, CardFlyItem.me.custom(1, CardId.Shengguang), new Vec2(root.width >> 1, root.height >> 1), topbar.deck, 0.7);
          });

          this._addBtn("测试飞圣物", function () {
            var topbar = tc.k(DlgKit).fetchDlg(TopbarDlg);
            var root = tc.s(FUISys).root;
            ItemFly.rotatingDirFly(1, TreasureFlyItem.me.custom(1, TreasureId.Baozhen), new Vec2(root.width >> 1, root.height >> 1), topbar.lastTreasure, 0.7);
          });
        };

        return GMDlg;
      }(GMDlgBase));
      GMDlg._gmbtn = void 0;
      var CardGMDlg = exports('CardGMDlg', /*#__PURE__*/function (_GMDlgBase2) {
        _inheritsLoose(CardGMDlg, _GMDlgBase2);

        function CardGMDlg() {
          return _GMDlgBase2.apply(this, arguments) || this;
        }

        CardGMDlg.pop = function pop() {
          tc.k(DlgKit).fetchDlg(CardGMDlg);
        };

        var _proto2 = CardGMDlg.prototype;

        _proto2.OnInit = function OnInit() {
          var _this2 = this;

          _GMDlgBase2.prototype.OnInit.call(this, null);

          enumValues(CardId, 'number').forEach(function (id) {
            var info = tc.p(CardPlay).infoOf(id);

            _this2._addBtn('+"' + info.name + '"', function () {
              tc.p(PlayerPlay).player.c.get(PlayerCardSetCom).addCard(id);

              _this2.close();
            });
          });
        };

        return CardGMDlg;
      }(GMDlgBase));
      /**
       * 针对Npc的GM
       */

      var NpcGMDlg = exports('NpcGMDlg', /*#__PURE__*/function (_GMDlgBase3) {
        _inheritsLoose(NpcGMDlg, _GMDlgBase3);

        function NpcGMDlg() {
          var _this3;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this3 = _GMDlgBase3.call.apply(_GMDlgBase3, [this].concat(args)) || this;
          _this3._npc = void 0;
          _this3._num = void 0;
          return _this3;
        }

        NpcGMDlg.pop = function pop(npc) {
          tc.k(DlgKit).fetchDlg(NpcGMDlg)._npc = npc;
        };

        var _proto3 = NpcGMDlg.prototype;

        _proto3.OnInit = function OnInit() {
          var _this4 = this;

          this._num = 1;

          _GMDlgBase3.prototype.OnInit.call(this, function (cmdInput) {
            try {
              var newNum = parseInt(cmdInput);
              _this4._num = newNum;
              TipDlg.pop("现在层数为:" + newNum);
            } catch (e) {
              console.error(e);
            }
          });

          this._addBtn("扣剩下1血", function () {
            _this4._npc.cutHp(Math.max(0, _this4._npc.buff.numOf(BuffId.hp) - 1), null, "GM-cut");

            _this4.close();
          });

          this._addNextLine();

          enumValues(BuffId, 'number').forEach(function (id) {
            var info = tc.p(BuffPlay).infoOf(id);

            _this4._addBtn('+buff"' + info.name + '"', function () {
              _this4._npc.buff.mod(id, _this4._num);
            });

            _this4._addBtn('-buff"' + info.name + '"', function () {
              _this4._npc.buff.mod(id, -_this4._num);
            });
          });
        };

        return NpcGMDlg;
      }(GMDlgBase));
      var TreasureGMDlg = exports('TreasureGMDlg', /*#__PURE__*/function (_GMDlgBase4) {
        _inheritsLoose(TreasureGMDlg, _GMDlgBase4);

        function TreasureGMDlg() {
          return _GMDlgBase4.apply(this, arguments) || this;
        }

        TreasureGMDlg.pop = function pop() {
          tc.k(DlgKit).fetchDlg(TreasureGMDlg);
        };

        var _proto4 = TreasureGMDlg.prototype;

        _proto4.OnInit = function OnInit() {
          _GMDlgBase4.prototype.OnInit.call(this, null);

          var allTreasuers = enumValues(TreasureId, 'number');
          allTreasuers.filter(function (id) {
            return tc.p(TreasurePlay).infoOf(id).rare == TreasureRare.Exclusive;
          }).forEach(this._addTreasureBtn.bind(this));

          this._addNextLine();

          allTreasuers.filter(function (id) {
            return tc.p(TreasurePlay).infoOf(id).rare == TreasureRare.Common;
          }).forEach(this._addTreasureBtn.bind(this));

          this._addNextLine();

          allTreasuers.filter(function (id) {
            return tc.p(TreasurePlay).infoOf(id).rare == TreasureRare.Rare;
          }).forEach(this._addTreasureBtn.bind(this));

          this._addNextLine();

          allTreasuers.filter(function (id) {
            return tc.p(TreasurePlay).infoOf(id).rare == TreasureRare.Epic;
          }).forEach(this._addTreasureBtn.bind(this));

          this._addNextLine();

          allTreasuers.filter(function (id) {
            return tc.p(TreasurePlay).infoOf(id).rare == TreasureRare.System;
          }).forEach(this._addTreasureBtn.bind(this));

          this._addNextLine();
        };

        _proto4._addTreasureBtn = function _addTreasureBtn(id) {
          var _this5 = this;

          var info = tc.p(TreasurePlay).infoOf(id);

          this._addBtn('+"' + info.name + '"', function () {
            var player = tc.p(PlayerPlay).player;

            _this5.close();

            player.c.get(PlayerTreasureCom).add(id);
          });
        };

        return TreasureGMDlg;
      }(GMDlgBase));
      var MapStopGMDlg = exports('MapStopGMDlg', /*#__PURE__*/function (_GMDlgBase5) {
        _inheritsLoose(MapStopGMDlg, _GMDlgBase5);

        function MapStopGMDlg() {
          return _GMDlgBase5.apply(this, arguments) || this;
        }

        var _proto5 = MapStopGMDlg.prototype;

        _proto5.setup = function setup(treenode, forceIn) {
          var _this6 = this;

          this._addBtn("节点ID " + treenode.id);

          this._addBtn("事件名称 " + treenode.data.info.name);

          this._addBtn("事件ID " + treenode.data.info.id);

          this._addNextLine();

          this._addBtn("强制进入", function () {
            forceIn();

            _this6.close();
          });

          return this;
        };

        _proto5.OnInit = function OnInit() {
          _GMDlgBase5.prototype.OnInit.call(this, null);
        };

        return MapStopGMDlg;
      }(GMDlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GMDlgBase.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DlgBase.ts', './DlgKit.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, DlgBase, DlgLayer;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgLayer = module.DlgLayer;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d37168irttJhrri5f6PrHoZ", "GMDlgBase", undefined);
      /*
      * GM指令页基类;
      */


      var GMDlgBase = exports('default', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(GMDlgBase, _DlgBase);

        function GMDlgBase() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._list = void 0;
          _this._curBtnNum = void 0;
          return _this;
        }

        var _proto = GMDlgBase.prototype;

        _proto.OnInit = function OnInit(cmdHandle) {
          var _this2 = this;

          this.dock();
          this._curBtnNum = 0;
          this._list = this.getList("list");

          if (cmdHandle) {
            this.getController("withInput").setSelectedPage("yes");
            this.getBtn('cmdBtn').onClick(function () {
              cmdHandle(_this2.getCom('cmdInput').as().text);
            }, this);
          } else {
            this.getController("withInput").setSelectedPage("no");
          }
        }
        /**往按钮列表里面添加一个按钮 */
        ;

        _proto._addBtn = function _addBtn(title, func) {
          var btn = this._list.addItem().asBtn;

          btn.text = title;

          if (func) {
            btn.onClick(function () {
              func(btn);
            });
          }

          this._curBtnNum++;
        }
        /** 通过添加空白按钮来达成换行 */
        ;

        _proto._addNextLine = function _addNextLine() {
          while (this._curBtnNum % GMDlgBase.lineSize != 0) {
            this._addBtn('');
          }
        };

        _proto.OnGetBgAlpha = function OnGetBgAlpha() {
          return 0;
        };

        _createClass(GMDlgBase, [{
          key: "dlgRes",
          get: function get() {
            return "GMDlg";
          }
        }, {
          key: "dlgLayer",
          get: function get() {
            return DlgLayer.GM;
          }
        }]);

        return GMDlgBase;
      }(DlgBase));
      GMDlgBase.lineSize = 8;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GrowCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1b092nDeQdBVJl2Wx3DfzUH", "GrowCom", undefined);

      var GrowCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(GrowCom, _ABuffCom);

        function GrowCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = GrowCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.RoundEnd, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.RoundEnd) {
            this.owner.buff.mod(BuffId.power, this.buff.num);
          }
        };

        return GrowCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GuanjiaAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LiliangACt.ts', './MulAttackAct.ts', './NpcAIBase.ts', './ShangkoudjAct.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, LiliangAct, MulAttackAct, NpcAIBase, ShangkoudjAct;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      LiliangAct = module.LiliangAct;
    }, function (module) {
      MulAttackAct = module.default;
    }, function (module) {
      NpcAIBase = module.default;
    }, function (module) {
      ShangkoudjAct = module.ShangkoudjAct;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a7c8ag85SdCrY8HlqQzST/b", "GuanjiaAI", undefined);

      var GuanjiaAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(GuanjiaAI, _NpcAIBase);

        function GuanjiaAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = GuanjiaAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          return new (this.loopAct(actNum, 3, LiliangAct, ShangkoudjAct, MulAttackAct))(this.npc);
        };

        return GuanjiaAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HandCardWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui-ccc370.mjs', './CardCfg.ts', './FightCfg.ts', './UIWrap.ts', './XTween.ts', './Util.ts', './BuffId.ts', './CardPlay.ts', './EnergyCostCom.ts', './FightCard.ts', './FightCardSeekLogic.ts', './FightPlay.ts', './NpcBuffCom.ts', './InputSys.ts', './tc.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, Vec2, Color, tween, lerp, Event, CardCfg, FightCfg, UIWrap, XTween, notNull, BuffId, CardPlay, EnergyCostCom, FightCard, FightCardSeekLogic, FightPlay, NpcBuffCom, tc;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec2 = module.Vec2;
      Color = module.Color;
      tween = module.tween;
      lerp = module.lerp;
    }, function (module) {
      Event = module.Event;
    }, function (module) {
      CardCfg = module.default;
    }, function (module) {
      FightCfg = module.default;
    }, function (module) {
      UIWrap = module.default;
    }, function (module) {
      XTween = module.default;
    }, function (module) {
      notNull = module.notNull;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      EnergyCostCom = module.default;
    }, function (module) {
      FightCard = module.default;
    }, function (module) {
      FightCardSeekLogic = module.FightCardSeekLogic;
    }, function (module) {
      FightPlay = module.default;
    }, function (module) {
      NpcBuffCom = module.default;
    }, null, function (module) {
      tc = module.default;
    }],
    execute: function () {
      exports('HandCardState', void 0);

      cclegacy._RF.push({}, "44b5drF6e1FJJGoStD/OV7l", "HandCardWrap", undefined);

      var HandCardState;

      (function (HandCardState) {
        HandCardState[HandCardState["Inited"] = 0] = "Inited";
        HandCardState[HandCardState["SetDataed"] = 1] = "SetDataed";
        HandCardState[HandCardState["HandIning"] = 2] = "HandIning";
        HandCardState[HandCardState["Idle"] = 3] = "Idle";
        HandCardState[HandCardState["HandOuting"] = 4] = "HandOuting";
        HandCardState[HandCardState["PreviewOnly"] = 5] = "PreviewOnly";
        HandCardState[HandCardState["CastDetecting"] = 6] = "CastDetecting";
        HandCardState[HandCardState["CastReady"] = 7] = "CastReady";
        HandCardState[HandCardState["Seeking"] = 8] = "Seeking";
        HandCardState[HandCardState["Reposing"] = 9] = "Reposing";
        HandCardState[HandCardState["Casting"] = 10] = "Casting";
        HandCardState[HandCardState["HnadOuted"] = 11] = "HnadOuted";
      })(HandCardState || (HandCardState = exports('HandCardState', {})));

      var HandCardCastState;

      (function (HandCardCastState) {
        HandCardCastState[HandCardCastState["CantUse"] = 0] = "CantUse";
        HandCardCastState[HandCardCastState["CanUse"] = 1] = "CanUse";
      })(HandCardCastState || (HandCardCastState = {}));

      var HandCardWrap = exports('default', /*#__PURE__*/function (_UIWrap) {
        _inheritsLoose(HandCardWrap, _UIWrap);

        function HandCardWrap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIWrap.call.apply(_UIWrap, [this].concat(args)) || this;
          _this._card = void 0;
          _this._in = void 0;
          _this._hand = void 0;
          _this._outDiscard = void 0;
          _this._outCost = void 0;
          _this._outSwallow = void 0;
          _this._castY = void 0;
          _this._index = void 0;
          _this._handLen = void 0;
          _this._descTxt = void 0;
          _this._costTxt = void 0;
          _this._frame = void 0;
          _this._isCostTxt = void 0;
          _this._preview = void 0;
          _this._exIndex = void 0;
          _this._state = void 0;
          _this._castState = void 0;
          _this._evtPosOnTouchBegin = void 0;
          _this._stateCtrl = void 0;
          _this._seekTween = void 0;
          _this._seekline = void 0;
          _this._cardplay = void 0;
          _this._handInTween = void 0;
          _this._reposTween = void 0;
          _this._touchBeginPos = void 0;
          return _this;
        }

        var _proto = HandCardWrap.prototype;

        _proto.OnInit = function OnInit() {
          this._state = HandCardState.Inited;
          this._castState = HandCardCastState.CantUse;
          this._descTxt = this.getTxt("desc");
          this._costTxt = this.getTxt('cost');
          this._isCostTxt = this.getTxt("isCost");
          this._frame = this.getLoader("frame");
          this._stateCtrl = this.getController("state");
          this._seekTween = null;
          this._handInTween = null;
          this._reposTween = null;
          this._touchBeginPos = new Vec2();
          this._cardplay = tc.p(CardPlay);
          this.addFgoEvt(this.fgc, Event.ROLL_OVER, this._onRollOver, this);
          this.addFgoEvt(this.fgc, Event.ROLL_OUT, this._onRollOut, this);
          this.addFgoEvt(this.fgc, Event.TOUCH_BEGIN, this._onTouchBegin, this);
          this.addFgoEvt(this.fgc, Event.TOUCH_MOVE, this._onTouchMove, this);
          this.addFgoEvt(this.fgc, Event.TOUCH_END, this._onTouchEnd, this);
        };

        _proto.OnClose = function OnClose() {
          var _this$_handInTween, _this$_reposTween, _this$_seekTween;

          (_this$_handInTween = this._handInTween) == null ? void 0 : _this$_handInTween.stop();
          (_this$_reposTween = this._reposTween) == null ? void 0 : _this$_reposTween.stop();
          (_this$_seekTween = this._seekTween) == null ? void 0 : _this$_seekTween.stop();
        };

        _proto.OnDisposeSelfFgo = function OnDisposeSelfFgo(selfFgo) {
          tc.p(FightPlay).cardFgoPool.ret(selfFgo);
        };

        _proto.setData = function setData(fc, option) {
          if (this._state !== HandCardState.Inited) return;
          this._state = HandCardState.SetDataed;
          this._card = fc;
          this._in = option["in"];
          this._hand = option.hand;
          this._outDiscard = option.outDiscard;
          this._outCost = option.outCost;
          this._outSwallow = option.outSwallow;
          this._preview = option.preview;
          this._seekline = option.seekline;
          this._castY = option.castY;
          this.getLabel("name").text = fc.info.name;
          this.getLoader("skin").url = fc.info.skin;
          this._frame.color = new Color(CardCfg.color[fc.info.rare]);
          this._descTxt.text = fc.desc;
          this._isCostTxt.visible = fc.isCost;
          this.syncCastState();
          this.addEvt(fc.e, FightCard.Events.DESC_CHANGE, this._onDescChange, this);
          this.addEvt(fc.c.get(EnergyCostCom).e, EnergyCostCom.Events.COST_CHANGE, this.syncCastState, this);
          this.addEvt(fc.caster.c.get(NpcBuffCom).e, NpcBuffCom.Events.BUFF_CHG, this._onBuffChg, this);
        };

        _proto.syncCastState = function syncCastState() {
          this._costTxt.visible = !this._card.info.cantUse;
          this._costTxt.text = this._card.cost < 0 ? 'X' : '' + this._card.cost;

          if (this._card.canUse) {
            this._castState = HandCardCastState.CanUse;

            this._stateCtrl.setSelectedPage('use');
          } else {
            this._castState = HandCardCastState.CantUse;

            this._stateCtrl.setSelectedPage('idle');
          }
        };

        _proto.setHandPos = function setHandPos(index, handLen) {
          this._index = index;
          this._handLen = handLen;
        };

        _proto.handIn = function handIn(onIn) {
          var _this2 = this;

          if (this._state === HandCardState.HandIning) {
            this._handInTween.stop();
          } else if (this._state !== HandCardState.SetDataed) return;

          this._state = HandCardState.HandIning;
          var _FightCfg$handsInAnim = FightCfg.handsInAnim,
              dur0 = _FightCfg$handsInAnim.dur0,
              dur1 = _FightCfg$handsInAnim.dur1,
              dur12delay = _FightCfg$handsInAnim.dur12delay,
              alphaFrom = _FightCfg$handsInAnim.alphaFrom,
              scaleFrom = _FightCfg$handsInAnim.scaleFrom;
          var delayPart = dur1 * dur12delay / this._handLen;
          var fgc = this.fgc;
          var index = this._index;
          var delay = delayPart * index;

          var _this$_getHandInPos = this._getHandInPos(),
              x = _this$_getHandInPos.x,
              y = _this$_getHandInPos.y,
              midX = _this$_getHandInPos.midX;

          fgc.x = this._in.x - this._hand.x;
          fgc.y = this._in.y - this._hand.y;
          fgc.alpha = alphaFrom;
          fgc.scaleX = scaleFrom;
          fgc.scaleY = scaleFrom;
          this._handInTween = new XTween(fgc);

          this._handInTween.onCompleteNow(function () {
            fgc.alpha = 1;
            fgc.scaleX = 1;
            fgc.scaleY = 1;
            _this2._state = HandCardState.Idle;
            onIn == null ? void 0 : onIn();
          }).delay(delay).to(dur0, {
            alpha: 1,
            x: midX,
            y: y,
            scaleX: 1,
            scaleY: 1
          }).to(dur1 - delay, {
            x: x,
            y: y
          }).call(function () {
            _this2._handInTween = null;
            _this2._state = HandCardState.Idle;
            onIn == null ? void 0 : onIn();
          }).start();
        };

        _proto.handOutDiscard = function handOutDiscard(onOut) {
          this._handOut('discard', onOut);
        };

        _proto.handOutCost = function handOutCost(onOut) {
          this._handOut('cost', onOut);
        };

        _proto.handOutSwallow = function handOutSwallow(onOut) {
          this._handOut('swallow', onOut);
        };

        _proto._handOut = function _handOut(toWhere, onOut) {
          var _this3 = this;

          if (this._state == HandCardState.HnadOuted) return;
          if (this._state == HandCardState.HandOuting) return;
          this._state = HandCardState.HandOuting;

          if (this._handInTween) {
            this._handInTween.completeNow();

            this._handInTween = null;
          }

          if (this._seekTween) {
            this._seekTween.stop();

            this._seekTween = null;
          }

          if (this._reposTween) {
            this._reposTween.completeNow();

            this._reposTween = null;
          }

          var out = toWhere == "cost" ? this._outCost : toWhere == "swallow" ? this._outSwallow : this._outDiscard; // console.log(this._index, this._card.info.name, 'hand out start');

          tween(this.fgc).to(FightCfg.handOutAnim.dur, {
            x: out.x - this._hand.x,
            y: out.y - this._hand.y,
            scaleX: 0,
            scaleY: 0,
            alpha: 0
          }).call(function () {
            // console.log(this._index, this._card.info.name, 'hand out end suc');
            _this3._state = HandCardState.HnadOuted;
            onOut == null ? void 0 : onOut();

            _this3.close();
          }).start();
        };

        _proto.repos = function repos(onPos) {
          if (this._state == HandCardState.HandOuting) return;
          if (this._state == HandCardState.HnadOuted) return;
          this._state = HandCardState.Reposing;

          this._repos(onPos);
        };

        _proto.isCard = function isCard(card) {
          return this._card == card;
        };

        _proto._onRollOver = function _onRollOver() {
          if (this._state !== HandCardState.Idle) return;
          if (this._cardplay.isChoosing) return;
          this._state = HandCardState.PreviewOnly;

          this._moveFront();
        };

        _proto._onRollOut = function _onRollOut() {
          if (this._state != HandCardState.PreviewOnly) return;
          this._state = HandCardState.Reposing;

          this._repos();
        };

        _proto._onTouchBegin = function _onTouchBegin(evt) {
          if (this._castState != HandCardCastState.CanUse) return;
          if (this._state != HandCardState.Idle && this._state != HandCardState.HandIning) return;

          if (this._state == HandCardState.HandIning) {
            this._handInTween.completeNow();

            this._handInTween = null;
          } else if (this._state == HandCardState.Idle) {
            this._moveFront();
          }

          this._state = HandCardState.CastDetecting;
          evt.captureTouch();

          this._touchBeginPos.set(this.fgc.x, this.fgc.y);

          this._evtPosOnTouchBegin = new Vec2(evt.pos);
        };

        _proto._onTouchMove = function _onTouchMove(evt) {
          if (this._state == HandCardState.CastDetecting || this._state == HandCardState.CastReady) {
            // const pos = this._getFrontPos();
            var pos = this._touchBeginPos;
            var movement = new Vec2(evt.pos).subtract(this._evtPosOnTouchBegin);
            var needSeek = this._card.seeklogic == FightCardSeekLogic.ChooseOne;
            var inCastArea = this.fgc.y < this._castY;
            tc.tmpVec2.set(pos.x, pos.y).add(movement);
            this.fgc.setPosition(tc.tmpVec2.x, tc.tmpVec2.y);

            if (this._state == HandCardState.CastDetecting) {
              if (inCastArea) {
                if (needSeek) {
                  this._state = HandCardState.Seeking;

                  this._seekline.show();

                  this._cardplay.choosingTarget = null;
                  this._cardplay.isChoosing = true;

                  this._move2Seek();
                } else {
                  this._stateCtrl.setSelectedPage('cast');

                  this._state = HandCardState.CastReady;
                }
              }
            } else if (this._state == HandCardState.CastReady) {
              if (!inCastArea) {
                this._stateCtrl.setSelectedPage('use');

                this._state = HandCardState.CastDetecting;
              }
            }
          } else if (this._state == HandCardState.Seeking) {
            tc.tmpVec22 = this.fgc.parent.localToGlobal(this.fgc.x, this.fgc.y);

            this._seekline.draw(tc.tmpVec22.x, tc.tmpVec22.y, evt.pos.x, evt.pos.y);
          }
        };

        _proto._onTouchEnd = function _onTouchEnd() {
          var _this4 = this;

          if (this._state == HandCardState.CastDetecting) {
            this._state = HandCardState.Reposing;

            this._repos();
          } else if (this._state == HandCardState.CastReady) {
            this._state = HandCardState.Casting;

            this._card.caster.info.fighterWrap.playAttack(function () {
              _this4._cast();
            });
          } else if (this._state == HandCardState.Seeking) {
            var _this$_seekTween2;

            this._seekline.hide();

            this._cardplay.isChoosing = false;
            (_this$_seekTween2 = this._seekTween) == null ? void 0 : _this$_seekTween2.stop();

            if (this._cardplay.choosingTarget) {
              this._state = HandCardState.Casting;

              this._card.caster.info.fighterWrap.playAttack(function () {
                _this4._cast();
              });
            } else {
              this._state = HandCardState.Reposing;

              this._repos();
            }
          }
        };

        _proto._cast = function _cast() {
          this._card.useAsHandCard();

          this._cardplay.choosingTarget = null;
        };

        _proto._moveFront = function _moveFront() {
          this._preview.showFightCard(this._card);

          this._exIndex = this.fgc.parent.getChildIndex(this.fgc);
          this.fgc.parent.setChildIndex(this.fgc, 999);
          this.fgc.setScale(1.2, 1.2);
          this.fgc.y = this._getFrontPos().y;
        };

        _proto._repos = function _repos(onPos) {
          var _this5 = this;

          var pos = this._getHandInPos();

          if (notNull(this._exIndex)) {
            this._preview.hideWithCountCheck();

            this.fgc.parent.setChildIndex(this.fgc, this._exIndex);
            this._exIndex = null;
          }

          if (this._seekTween) {
            this._seekTween.stop();

            this._seekTween = null;
          }

          if (this._reposTween) {
            this._reposTween.stop();

            this._reposTween = null;
          }

          this._reposTween = new XTween(this.fgc);

          this._reposTween.onCompleteNow(function () {
            _this5.fgc.scaleX = 1;
            _this5.fgc.scaleY = 1;
            _this5._state = HandCardState.Idle;
            onPos == null ? void 0 : onPos();
          }).to(0.1, {
            scaleX: 1,
            scaleY: 1,
            x: pos.x,
            y: pos.y
          }).call(function () {
            _this5._reposTween = null;

            var checkPos = _this5._getHandInPos();

            if (_this5.fgc.x !== checkPos.x && _this5.fgc.y !== checkPos.y) {
              _this5._repos(onPos);

              return;
            }

            _this5._state = HandCardState.Idle;
            onPos == null ? void 0 : onPos();
          }).start();
        };

        _proto._move2Seek = function _move2Seek() {
          var _this$_seekTween3,
              _this6 = this;

          (_this$_seekTween3 = this._seekTween) == null ? void 0 : _this$_seekTween3.stop();

          var pos = this._getSeekPos();

          this._seekTween = tween(this.fgc).to(0.1, {
            x: pos.x,
            y: pos.y
          }).call(function () {
            _this6._seekTween = null;
          }).start();
        };

        _proto._onDescChange = function _onDescChange(newDesc) {
          this._descTxt.text = newDesc;
        };

        _proto._onBuffChg = function _onBuffChg(buffId) {
          if (buffId == BuffId.enegy || buffId == BuffId.Wufadcsp) {
            this.syncCastState();
          }
        };

        _proto._getIdlePos = function _getIdlePos() {
          var sill = FightCfg.handsInAnim.sill;
          var endStartX = 0 - (this._handLen - 1) * sill;
          var endX = endStartX + this._index * sill * 2;
          return {
            x: endX,
            y: 0
          };
        };

        _proto._getSeekPos = function _getSeekPos() {
          return {
            x: 0,
            y: -50
          };
        };

        _proto._getFrontPos = function _getFrontPos() {
          var idlePos = this._getIdlePos();

          return {
            x: idlePos.x,
            y: idlePos.y - 50
          };
        };

        _proto._getHandInPos = function _getHandInPos() {
          var idlePos = this._getIdlePos();

          var midX = lerp(0, idlePos.x, this._index / this._handLen);
          return {
            x: idlePos.x,
            y: idlePos.y,
            midX: midX
          };
        };

        _createClass(HandCardWrap, [{
          key: "state",
          get: function get() {
            return this._state;
          }
        }]);

        return HandCardWrap;
      }(UIWrap));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HeroChooseDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui-ccc370.mjs', './PlayerCfg.ts', './DlgBase.ts', './DlgKit.ts', './UIDocker.ts', './NpcId.ts', './NpcPlay.ts', './PlayerPreparCom.ts', './PlayerPlay.ts', './tc.ts', './EntryDlg.ts', './HeroIntroWrap.ts', './PreparDlg.ts', './TipDlg.ts', './TopbarDlg.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, Event, PlayerCfg, DlgBase, DlgKit, UIDocker, NpcId, NpcPlay, PlayerPreparCom, PlayerPlay, tc, EntryDlg, HeroIntroWrap, PreparDlg, TipDlg, TopbarDlg;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Event = module.Event;
    }, function (module) {
      PlayerCfg = module.default;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgKit = module.DlgKit;
    }, function (module) {
      UIDocker = module.UIDocker;
    }, function (module) {
      NpcId = module.NpcId;
    }, function (module) {
      NpcPlay = module.default;
    }, function (module) {
      PlayerPreparCom = module.PlayerPreparCom;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      EntryDlg = module.EntryDlg;
    }, function (module) {
      HeroIntroWrap = module.HeroIntroWrap;
    }, function (module) {
      PreparDlg = module.PreparDlg;
    }, function (module) {
      TipDlg = module.default;
    }, function (module) {
      TopbarDlg = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8bd58XJDe1Afp6q3YgTdaCP", "HeroChooseDlg", undefined);

      var HeroChooseDlg = exports('HeroChooseDlg', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(HeroChooseDlg, _DlgBase);

        function HeroChooseDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._intro = void 0;
          return _this;
        }

        HeroChooseDlg.pop = function pop() {
          tc.k(DlgKit).fetchDlg(HeroChooseDlg);
        };

        var _proto = HeroChooseDlg.prototype;

        _proto.OnInit = function OnInit() {
          var _this2 = this;

          this.dock(UIDocker.Dock.Fade);
          var list = this.getList("list");
          var nplay = tc.p(NpcPlay);
          var pplay = tc.p(PlayerPlay);
          list.removeChildrenToPool();
          this._intro = this.wrap(HeroIntroWrap, "intro");
          PlayerCfg.availableCharecter.forEach(function (heroId) {
            var info = nplay.infoOf(heroId);
            var icon = list.addItemFromPool().asBtn;
            icon.icon = tc.resUrl(info.getVal('icon'));
            icon.data = heroId;
          });
          list.on(Event.CLICK_ITEM, this._onClick, this);
          list.selectedIndex = 0;

          this._onClick({
            data: NpcId.C1
          });

          this.addBtnEvt("start", function (enbaleBtn) {
            var playerId = PlayerCfg.availableCharecter[list.selectedIndex];

            if (pplay.checkHeroUnlock(playerId)) {
              var p = pplay.createPlayer(playerId);
              p.c.get(PlayerPreparCom).claimOpenGift();
              TopbarDlg.me.onScene("prepar");

              _this2.dlgKit.fetchDlg(PreparDlg);

              _this2.close();

              _this2.dlgKit.closeDlg(EntryDlg);
            } else {
              TipDlg.pop("未激活该角色");
              enbaleBtn();
            }
          });
        };

        _proto.OnBgClickClose = function OnBgClickClose() {
          return false;
        };

        _proto._onClick = function _onClick(item) {
          var npcId = item.data;

          this._intro.refresh(npcId);
        };

        _createClass(HeroChooseDlg, [{
          key: "dlgRes",
          get: function get() {
            return "HeroChooseDlg";
          }
        }]);

        return HeroChooseDlg;
      }(DlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HeroIntroWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIWrap.ts', './UserKit.ts', './NpcPlay.ts', './PlayerPlay.ts', './TreasurePlay.ts', './tc.ts', './AlertDlg.ts', './LoadingDlg.ts', './TipDlg.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, UIWrap, UserKit, NpcPlay, PlayerPlay, TreasurePlay, tc, AlertDlg, LoadingDlg, TipDlg;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIWrap = module.default;
    }, function (module) {
      UserKit = module.default;
    }, function (module) {
      NpcPlay = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      TreasurePlay = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      AlertDlg = module.default;
    }, function (module) {
      LoadingDlg = module.default;
    }, function (module) {
      TipDlg = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "55c92lpDwNMOISrv1ZGmveT", "HeroIntroWrap", undefined);

      var HeroIntroWrap = exports('HeroIntroWrap', /*#__PURE__*/function (_UIWrap) {
        _inheritsLoose(HeroIntroWrap, _UIWrap);

        function HeroIntroWrap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIWrap.call.apply(_UIWrap, [this].concat(args)) || this;
          _this._npcId = void 0;
          _this._dCostNum = void 0;
          _this._cName = void 0;
          _this._hpName = void 0;
          _this._eNum = void 0;
          _this._tName = void 0;
          _this._tDesc = void 0;
          _this._dCost = void 0;
          _this._activeBtn = void 0;
          _this._sceneCtrl = void 0;
          return _this;
        }

        var _proto = HeroIntroWrap.prototype;

        _proto.refresh = function refresh(npcId) {
          var info = tc.p(NpcPlay).infoOf(npcId);
          var openT = info.getIntVal("openTreasure");
          var t = tc.p(TreasurePlay).rawInfoOf(openT);
          var isUnlock = tc.p(PlayerPlay).checkHeroUnlock(npcId);
          var dCost = info.getIntVal("dCost");
          this._npcId = npcId;
          this._dCostNum = dCost;
          this._cName.text = info.name;
          this._hpName.text = info.baseHp.toString();
          this._eNum.text = info.getVal("maxEnergy") + "点";
          this._tName.text = t.name;
          this._tDesc.text = t.desc;
          this._dCost.text = "X" + dCost;

          this._sceneCtrl.setSelectedIndex(isUnlock ? 1 : 0);

          return this;
        };

        _proto.OnInit = function OnInit() {
          this._sceneCtrl = this.getController("scene");
          this._cName = this.getTxt("cName");
          this._hpName = this.getTxt("hpNum");
          this._eNum = this.getTxt("eNum");
          this._tName = this.getTxt("tName");
          this._tDesc = this.getTxt("tDesc");
          this._dCost = this.getTxt("dCost");
          this._activeBtn = this.getBtn("active");
          this.addBtnEvt(this._activeBtn, this._active);
        };

        _proto._active = function _active(enbaleBtn) {
          var _this2 = this;

          var curD = tc.k(UserKit).diamond;

          if (curD > this._dCostNum) {
            AlertDlg.pop({
              tip: "\u6D88\u8017 " + this._dCostNum + " \u94BB\u77F3\u6FC0\u6D3B \"" + this._cName.text + "\" \uFF1F",
              onYes: function onYes() {
                LoadingDlg.show();
                tc.k(UserKit).diamond -= _this2._dCostNum;

                _this2.addDelay(1, function () {
                  tc.p(PlayerPlay).unlockHero(_this2._npcId);
                  LoadingDlg.hide();
                  TipDlg.pop("激活成功");

                  _this2.refresh(_this2._npcId);

                  enbaleBtn();
                });
              },
              onNo: function onNo() {
                enbaleBtn();
              }
            });
          } else {
            TipDlg.pop("钻石不足");
            enbaleBtn();
          }
        };

        return HeroIntroWrap;
      }(UIWrap));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HoverTipDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UICfg.ts', './DlgBase.ts', './DlgKit.ts', './FUISys.ts', './tc.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, rect, UICfg, DlgBase, DlgKit, DlgLayer, FUISys, tc;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      rect = module.rect;
    }, function (module) {
      UICfg = module.default;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgKit = module.DlgKit;
      DlgLayer = module.DlgLayer;
    }, function (module) {
      FUISys = module.FUISys;
    }, function (module) {
      tc = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b0854/fi41O85S1wTrYoGEX", "HoverTipDlg", undefined);

      var HoverTipDlg = exports('default', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(HoverTipDlg, _DlgBase);

        function HoverTipDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._title = void 0;
          _this._content = void 0;
          return _this;
        }

        HoverTipDlg.show = function show(title, content) {
          if (!this._dlg) {
            this._dlg = tc.k(DlgKit).fetchDlg(HoverTipDlg);
          }

          var touchPos = tc.s(FUISys).root.getTouchPosition(0);

          if (HoverTipDlg.safeArea.contains(touchPos)) {
            if (touchPos.x > UICfg.midX) {
              // 在右边，显示在左边
              this._dlg._setPosCtrl('left');
            } else {
              // 在左边，显示在右边
              this._dlg._setPosCtrl('right');
            }
          } else {
            // 不在安全区域内，显示在安全区域内
            this._dlg._setPosCtrl('mid');
          }

          this._dlg.setData(title, content);

          this._dlg.show();
        };

        HoverTipDlg.hide = function hide() {
          var _this$_dlg;

          (_this$_dlg = this._dlg) == null ? void 0 : _this$_dlg.hide();
        };

        var _proto = HoverTipDlg.prototype;

        _proto.OnInit = function OnInit() {
          if (HoverTipDlg._dlg != null) this.close();
          this._title = this.getTxt("title");
          this._content = this.getTxt("content");
        };

        _proto.setData = function setData(title, content) {
          this._title.text = title;
          this._content.text = content;
        };

        _proto._setPosCtrl = function _setPosCtrl(pos) {
          this.getController('pos').setSelectedPage(pos);
        };

        _proto.OnGetBgAlpha = function OnGetBgAlpha() {
          return 0;
        };

        _createClass(HoverTipDlg, [{
          key: "dlgRes",
          get: function get() {
            return "HoverTipDlg";
          }
        }, {
          key: "dlgLayer",
          get: function get() {
            return DlgLayer.Front;
          }
        }], [{
          key: "safeArea",
          get: function get() {
            if (!this._safeArea) {
              var _UICfg$hoverTipSafeAr = UICfg.hoverTipSafeArea,
                  x = _UICfg$hoverTipSafeAr.x,
                  y = _UICfg$hoverTipSafeAr.y,
                  w = _UICfg$hoverTipSafeAr.w,
                  h = _UICfg$hoverTipSafeAr.h;
              this._safeArea = rect(x, y, w, h);
            }

            return this._safeArea;
          }
        }]);

        return HoverTipDlg;
      }(DlgBase));
      HoverTipDlg._dlg = void 0;
      HoverTipDlg._safeArea = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HuanmoAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Util.ts', './BuffId.ts', './AttackAct.ts', './MengjiAct.ts', './NpcAIBase.ts', './ReviveAct.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, isNull, BuffId, AttackAct, MengjiAct, NpcAIBase, ReviveAct;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      isNull = module.isNull;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      MengjiAct = module.MengjiAct;
    }, function (module) {
      NpcAIBase = module.default;
    }, function (module) {
      ReviveAct = module.ReviveAct;
    }],
    execute: function () {
      cclegacy._RF.push({}, "52369WED/1OiK7YwT/l9DK6", "HuanmoAI", undefined);

      var HuanmoAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(HuanmoAI, _NpcAIBase);

        function HuanmoAI() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _NpcAIBase.call.apply(_NpcAIBase, [this].concat(args)) || this;
          _this._deadActNum = null;
          _this._startActNum = 0;
          return _this;
        }

        var _proto = HuanmoAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          var _this2 = this;

          if (this.npc.isDead) {
            if (isNull(this._deadActNum)) {
              this._deadActNum = actNum;
            }

            if (actNum == this._deadActNum) {
              //     return new PreparReviveAct(this.npc);
              // } else if (actNum == this._deadActNum + 1) {
              return new ReviveAct(this.npc, function () {
                _this2._startActNum = _this2._deadActNum;
                _this2._deadActNum = null;

                _this2.npc.buff.mod(BuffId.Lianxie, 1);
              });
            }
          }

          var no = (actNum - this._startActNum) % 2;

          if (no == 0) {
            return new AttackAct(this.npc);
          } else {
            return new MengjiAct(this.npc);
          }
        };

        return HuanmoAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HuichunBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "022c8Vv0cJO3pI/0AcM45rM", "HuichunBuffCom", undefined);

      var HuichunBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(HuichunBuffCom, _ABuffCom);

        function HuichunBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = HuichunBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.RoundEnd, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.RoundEnd) {
            this.owner.recoverHp(this.buff.num, this.buff.info.name);
          }
        };

        return HuichunBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HuihenBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlayerFightCardCom.ts', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PlayerFightCardCom, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b7f35QEMjFCoYcL5fxrWM+V", "HuihenBuffCom", undefined);

      var HuihenBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(HuihenBuffCom, _ABuffCom);

        function HuihenBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = HuihenBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.RoundEnd, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.RoundEnd) {
            var fcc = this.owner.c.get(PlayerFightCardCom);

            if (fcc.hand.length > 0) {
              this.owner.cutHp(fcc.hand.length * this.buff.num, null, this.buff.info.name);
            }
          }
        };

        return HuihenBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HundengBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './CardPlay.ts', './PlayerFightCardCom.ts', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, tc, CardPlay, PlayerFightCardCom, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a0bbbpUoH9FjKxMuivDccHq", "HundengBuff", undefined); // 本回合不打出攻击牌，下回合能量+【num】


      var HundengBuff = exports('HundengBuff', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(HundengBuff, _ATreasureBuffCom);

        function HundengBuff() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ATreasureBuffCom.call.apply(_ATreasureBuffCom, [this].concat(args)) || this;
          _this._energyAdd = void 0;
          return _this;
        }

        var _proto = HundengBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this._energyAdd = 0;
          this.setOrder(BuffNS.EffectStage.RoundEnd, BuffNS.EffectOrder.base);
          this.setOrder(BuffNS.EffectStage.HandCardIn, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.RoundEnd) {
            var everAttack = false;
            this.owner.c.get(PlayerFightCardCom).handcastLastRound.foreach_unsafe(function (id) {
              if (tc.p(CardPlay).infoOf(id).isAttack) {
                everAttack = true;
                return false;
              }

              return true;
            });

            if (!everAttack) {
              this._energyAdd += this.buff.num;
            }
          } else if (this._energyAdd > 0 && stage == BuffNS.EffectStage.HandCardIn) {
            this.owner.buff.mod(BuffId.enegy, this._energyAdd);
            this._energyAdd = 0;
            this.popWrap();
          }
        };

        _createClass(HundengBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Hundeng;
          }
        }]);

        return HundengBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HuoyanjBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "07e42vuPU9M4r1jrBaPXQMr", "HuoyanjBuff", undefined);

      var HuoyanjBuff = exports('HuoyanjBuff', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(HuoyanjBuff, _ABuffCom);

        function HuoyanjBuff() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = HuoyanjBuff.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.Hit, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.Hit) {
            var hitSource = arg.hitSource;

            if (hitSource) {
              hitSource.getHit(this.buff.num, null, this.buff.info.name);
            }
          }
        };

        return HuoyanjBuff;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IAct.ts", ['cc'], function () {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "eb3b820X5xHa54dxTXEbx0q", "IAct", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IFighterWrap.ts", ['cc'], function () {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "01204Ek5O1BbJZ+393A/IC9", "IFighterWrap", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ILoopFunction.ts", ['cc'], function () {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7ab12zfePVHsplbUd7S6OLX", "ILoopFunction", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/INpc.ts", ['cc'], function () {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ffbedvGHPpBqrt/+0SZ30aO", "INpc", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/INpcAI.ts", ['cc'], function () {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0ef54LbEClIIaTjZbnWnRl/", "INpcAI", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InputSys.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, input, Input, SysBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      input = module.input;
      Input = module.Input;
    }, function (module) {
      SysBase = module.SysBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1964f5ftxlG3Y7Amyj3+txz", "InputSys", undefined);

      var InputSys = exports('default', /*#__PURE__*/function (_SysBase) {
        _inheritsLoose(InputSys, _SysBase);

        function InputSys() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _SysBase.call.apply(_SysBase, [this].concat(args)) || this;
          _this._keyClickMap = void 0;
          _this.sysName = "InputSys";
          return _this;
        }

        var _proto = InputSys.prototype;

        _proto.OnInit = function OnInit(complete) {
          complete();
        };

        _proto.OnLateInit = function OnLateInit(complete) {
          complete();
        };

        _proto.OnDispose = function OnDispose() {
          input.off(Input.EventType.KEY_DOWN, this._onKeyDown, this);
          input.off(Input.EventType.KEY_UP, this._onKeyUp, this);
        };

        _proto._onKeyDown = function _onKeyDown(e) {
          if (!this._keyClickMap) return;

          if (this._keyClickMap.has(e.keyCode)) {
            // console.log(e.keyCode, "down")
            this._keyClickMap.set(e.keyCode, true);
          }
        };

        _proto._onKeyUp = function _onKeyUp(e) {
          if (!this._keyClickMap) return;

          if (this._keyClickMap.has(e.keyCode)) {
            // console.log(e.keyCode, "up");
            this._keyClickMap.set(e.keyCode, false);
          }
        };

        _proto.listenKey = function listenKey(keycode) {
          if (!this._keyClickMap) {
            this._keyClickMap = new Map();
            input.on(Input.EventType.KEY_DOWN, this._onKeyDown, this);
            input.on(Input.EventType.KEY_UP, this._onKeyUp, this);
          }

          this._keyClickMap.set(keycode, false);
        };

        _proto.getKeyDown = function getKeyDown(keycode) {
          if (!this._keyClickMap.has(keycode)) {
            console.warn("did not listen keycode " + keycode);
            return;
          } // console.log(keycode, this._keyClickMap.get(keycode));


          return this._keyClickMap.get(keycode);
        };

        return InputSys;
      }(SysBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Intension.ts", ['cc'], function () {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "31f3b4sOepP3bakaq8ZiKf7", "Intension", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IntensionCfg.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "63231MFkJpJiI5O25eRJbeK", "IntensionCfg", undefined);

      var IntensionCfg = exports('default', {
        res: {
          attack: "intentsion_0",
          tactics: "intentsion_2",
          attack_tactics: "intentsion_4",
          xuanyun: "intentsion_5",
          revive: 'intentsion_6'
        }
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ItemFly.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UICfg.ts', './DlgBase.ts', './DlgKit.ts', './Util.ts', './FUISys.ts', './tc.ts', './TopbarDlg.ts', './CardPlay.ts', './CardCfg.ts', './TreasurePlay.ts'], function (exports) {
  'use strict';

  var _createClass, _inheritsLoose, cclegacy, Color, Vec2, tween, UICfg, DlgBase, DlgKit, DlgLayer, randomInt, random, FUISys, tc, TopbarDlg, CardPlay, CardCfg, TreasurePlay;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
      Vec2 = module.Vec2;
      tween = module.tween;
    }, function (module) {
      UICfg = module.default;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgKit = module.DlgKit;
      DlgLayer = module.DlgLayer;
    }, function (module) {
      randomInt = module.randomInt;
      random = module.random;
    }, function (module) {
      FUISys = module.FUISys;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      TopbarDlg = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      CardCfg = module.default;
    }, function (module) {
      TreasurePlay = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5c0a1o2bAdPD6989RKluUzS", "ItemFly", undefined);

      var CoinFlyItem = exports('CoinFlyItem', /*#__PURE__*/function () {
        function CoinFlyItem() {
          this._pool = void 0;
          this._pool = tc.s(FUISys).allocPool(tc.resUrl(UICfg.res.coin));
        }

        var _proto = CoinFlyItem.prototype;

        _proto.numToGonum = function numToGonum(num) {
          return Math.ceil(num / 10);
        };

        _proto.alloc = function alloc() {
          return this._pool.get();
        };

        _proto.free = function free(obj) {
          this._pool.ret(obj);
        };

        _createClass(CoinFlyItem, null, [{
          key: "me",
          get: function get() {
            if (!this._me) {
              this._me = new CoinFlyItem();
            }

            return this._me;
          }
        }]);

        return CoinFlyItem;
      }());
      CoinFlyItem._me = void 0;
      var DiamondFlyItem = exports('DiamondFlyItem', /*#__PURE__*/function () {
        function DiamondFlyItem() {
          this._pool = void 0;
          this._pool = tc.s(FUISys).allocPool(tc.resUrl(UICfg.res.diamond));
        }

        var _proto2 = DiamondFlyItem.prototype;

        _proto2.alloc = function alloc() {
          return this._pool.get();
        };

        _proto2.free = function free(obj) {
          this._pool.ret(obj);
        };

        _proto2.numToGonum = function numToGonum(num) {
          return Math.ceil(num / 10);
        };

        _createClass(DiamondFlyItem, null, [{
          key: "me",
          get: function get() {
            if (!this._me) {
              this._me = new DiamondFlyItem();
            }

            return this._me;
          }
        }]);

        return DiamondFlyItem;
      }());
      DiamondFlyItem._me = void 0;
      var CardFlyItem = exports('CardFlyItem', /*#__PURE__*/function () {
        var _proto3 = CardFlyItem.prototype;

        _proto3.custom = function custom(scale, id) {
          this._scale = scale;
          this._id = id;
          return this;
        };

        function CardFlyItem() {
          this._pool = void 0;
          this._id = void 0;
          this._scale = void 0;
          this._pool = tc.s(FUISys).allocPool(tc.resUrl(UICfg.res.card));
        }

        _proto3.alloc = function alloc() {
          var obj = this._pool.get().asCom;

          var cardPlay = tc.p(CardPlay);
          var info = cardPlay.infoOf(this._id);
          obj.setScale(this._scale, this._scale);
          obj.getChild("name").asTextField.text = info.name;
          obj.getChild("desc").asTextField.text = info.desc.replace(/###.*/g, "");
          obj.getChild("frame").asLoader.color = new Color(CardCfg.color[info.rare]);
          obj.getChild("cost").asTextField.text = info.cost < 0 ? 'X' : '' + info.cost;
          obj.getChild("isCost").visible = info.isCost;
          obj.getChild("skin").asLoader.url = info.skin;
          return obj;
        };

        _proto3.free = function free(obj) {
          this._pool.ret(obj);
        };

        _proto3.numToGonum = function numToGonum(num) {
          return num;
        };

        _createClass(CardFlyItem, null, [{
          key: "me",
          get: function get() {
            if (!this._me) {
              this._me = new CardFlyItem();
            }

            return this._me;
          }
        }]);

        return CardFlyItem;
      }());
      CardFlyItem._me = void 0;
      var TreasureFlyItem = exports('TreasureFlyItem', /*#__PURE__*/function () {
        var _proto4 = TreasureFlyItem.prototype;

        _proto4.custom = function custom(scale, id) {
          this._scale = scale;
          this._id = id;
          return this;
        };

        function TreasureFlyItem() {
          this._pool = void 0;
          this._id = void 0;
          this._scale = void 0;
          this._pool = tc.s(FUISys).allocPool(tc.resUrl(UICfg.res.treasure));
        }

        _proto4.alloc = function alloc() {
          var obj = this._pool.get().asCom;

          var tplay = tc.p(TreasurePlay);
          var info = tplay.infoOf(this._id);
          var lod = obj.getChild("icon").asLoader;
          var counter = obj.getChild('title').asTextField;
          lod.url = tc.resUrl(info.skin);
          counter.visible = false;
          obj.setScale(this._scale, this._scale);
          return obj;
        };

        _proto4.free = function free(obj) {
          this._pool.ret(obj);
        };

        _proto4.numToGonum = function numToGonum(num) {
          return num;
        };

        _createClass(TreasureFlyItem, null, [{
          key: "me",
          get: function get() {
            if (!this._me) {
              this._me = new TreasureFlyItem();
            }

            return this._me;
          }
        }]);

        return TreasureFlyItem;
      }());
      TreasureFlyItem._me = void 0;

      var Spiral = /*#__PURE__*/function () {
        function Spiral(from, to, rad) {
          if (rad === void 0) {
            rad = Math.PI * 2;
          }

          this._dis = void 0;
          this._endRad = void 0;
          this.from = from;
          this.to = to;
          this.rad = rad;
          var dir = to.clone().subtract(from);
          this._endRad = dir.signAngle(new Vec2(0, 1));
          this._dis = dir.length();
        }

        var _proto5 = Spiral.prototype;

        _proto5.onProgress = function onProgress(ratio) {
          var curDis = this._dis * ratio;
          var rad = this._endRad + this.rad * ratio; // const rad = ratio * Math.PI * 2;
          // console.log("...curDis", curDis, "rad", rad);

          var radDir = new Vec2(Math.sin(rad), Math.cos(rad));
          return this.from.clone().add(radDir.multiplyScalar(curDis));
        };

        return Spiral;
      }();

      var ItemFly = exports('default', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(ItemFly, _DlgBase);

        function ItemFly() {
          return _DlgBase.apply(this, arguments) || this;
        }

        ItemFly.flyDiamond = function flyDiamond(diamondNum, from, to) {
          ItemFly.boomFly(diamondNum, DiamondFlyItem.me, 15, tc.s(FUISys).centerOfGlobal(from), to != null ? to : TopbarDlg.me.diamondTxt);
        };

        ItemFly.flyCoin = function flyCoin(coinNum, from, to) {
          ItemFly.boomFly(coinNum, CoinFlyItem.me, 15, tc.s(FUISys).centerOfGlobal(from), to != null ? to : TopbarDlg.me.coinTxt);
        };

        ItemFly.flyCard = function flyCard(delay, num, cardId, from, to, oriScale) {
          if (oriScale === void 0) {
            oriScale = 1;
          }

          ItemFly.me.addDelay(delay, function () {
            ItemFly.rotatingDirFly(num, CardFlyItem.me.custom(oriScale, cardId), tc.s(FUISys).centerOfGlobal(from), to != null ? to : TopbarDlg.me.deck, 0.7);
          });
        };

        ItemFly.flyTreasure = function flyTreasure(delay, num, tId, onEnd, from, to, oriScale) {
          if (oriScale === void 0) {
            oriScale = 1;
          }

          ItemFly.me.addDelay(delay, function () {
            ItemFly.rotatingDirFly(num, TreasureFlyItem.me.custom(oriScale, tId), tc.s(FUISys).centerOfGlobal(from), to != null ? to : TopbarDlg.me.lastTreasure, 0.7, onEnd, .8);
          });
        };

        ItemFly.directFly = function directFly(num, item, from, to) {
          var _ItemFly$_getPos = ItemFly._getPos(from, to),
              fromPos = _ItemFly$_getPos.fromPos,
              toPos = _ItemFly$_getPos.toPos;

          var gonum = item.numToGonum(num); // console.log("... fly from " + fromPos + " to " + toPos)

          var _loop = function _loop() {
            var obj = item.alloc();
            ItemFly.me.addChild(obj);
            obj.setPosition(fromPos.x, fromPos.y);
            obj.setScale(1, 1);
            tween(obj).to(1, {
              x: toPos.x,
              y: toPos.y,
              scaleX: 0,
              scaleY: 0
            }, {
              onComplete: function onComplete() {
                item.free(obj);
              }
            }).start();
          };

          for (var i = 0; i < gonum; i++) {
            _loop();
          }
        };

        ItemFly.rotaingFly = function rotaingFly(num, item, from, to) {
          var _ItemFly$_getPos2 = ItemFly._getPos(from, to),
              fromPos = _ItemFly$_getPos2.fromPos,
              toPos = _ItemFly$_getPos2.toPos; // console.log("... fly from " + fromPos + " to " + toPos)


          var _loop2 = function _loop2() {
            var obj = item.alloc();
            var move = new Spiral(fromPos, toPos);
            ItemFly.me.addChild(obj);
            obj.setPosition(fromPos.x, fromPos.y);
            tween(obj).to(1, {
              scaleX: 0,
              scaleY: 0
            }, {
              onUpdate: function onUpdate(target, ratio) {
                var pos = move.onProgress(ratio);
                obj.setPosition(pos.x, pos.y);
              },
              onComplete: function onComplete() {
                item.free(obj);
              }
            }).start();
          };

          for (var i = 0; i < num; i++) {
            _loop2();
          }
        };

        ItemFly.rotatingDirFly = function rotatingDirFly(num, item, from, to, rotateRadio, onEnd, endOnRatio) {
          if (rotateRadio === void 0) {
            rotateRadio = 1;
          }

          if (endOnRatio === void 0) {
            endOnRatio = 1;
          }

          var _ItemFly$_getPos3 = ItemFly._getPos(from, to),
              fromPos = _ItemFly$_getPos3.fromPos,
              toPos = _ItemFly$_getPos3.toPos; // console.log("... fly from " + fromPos + " to " + toPos)


          var _loop3 = function _loop3() {
            var obj = item.alloc();
            var move = new Spiral(fromPos, toPos.clone().subtract(fromPos).multiplyScalar(0.4).add(fromPos));
            var moveEnd = toPos.clone().subtract(fromPos).multiplyScalar(endOnRatio).add(fromPos);
            ItemFly.me.addChild(obj);
            var oriScaleX = obj.scaleX;
            var oriScaleY = obj.scaleY;
            obj.setPosition(fromPos.x, fromPos.y);
            tween(obj).to(0.5 * 0.8, {
              scaleX: oriScaleX * (1 - rotateRadio),
              scaleY: oriScaleY * (1 - rotateRadio)
            }, {
              onUpdate: function onUpdate(target, ratio) {
                ratio *= rotateRadio;
                var pos = move.onProgress(ratio);
                var dir = pos.clone().subtract(new Vec2(obj.x, obj.y));
                obj.setPosition(pos.x, pos.y);
                obj.rotation = -dir.signAngle(new Vec2(0, 1)) * 180 / Math.PI;
              }
            }).to(0.4 * 0.8, {
              scaleX: oriScaleX * 0.1,
              scaleY: oriScaleY * 0.1,
              x: moveEnd.x,
              y: moveEnd.y
            }).call(function () {
              item.free(obj);
              onEnd == null ? void 0 : onEnd();
            }).start();
          };

          for (var i = 0; i < num; i++) {
            _loop3();
          }
        };

        ItemFly.boomFly = function boomFly(num, item, boomStrength, from, to) {
          var boomMidDur = 0.4;
          var toMidDur = 0.6;
          var gonum = item.numToGonum(num);

          var _ItemFly$_getPos4 = ItemFly._getPos(from, to),
              fromPos = _ItemFly$_getPos4.fromPos,
              toPos = _ItemFly$_getPos4.toPos;

          boomStrength *= 10; // console.log("... fly from " + fromPos + " to " + toPos)

          var _loop4 = function _loop4() {
            var obj = item.alloc();
            var theFromPos = fromPos.clone().add2f(randomInt(-boomStrength, boomStrength), randomInt(-boomStrength, boomStrength));
            var boomDur = random(boomMidDur * 0.9, boomMidDur * 1.1);
            var toDur = random(toMidDur * 0.9, toMidDur * 1.1);
            ItemFly.me.addChild(obj);
            obj.setPosition(fromPos.x, fromPos.y);
            obj.setScale(1, 1);
            tween(obj).to(boomDur, {
              x: theFromPos.x,
              y: theFromPos.y
            }).delay(0.03).to(toDur, {
              x: toPos.x,
              y: toPos.y,
              scaleX: 0,
              scaleY: 0
            }, {
              onComplete: function onComplete() {
                item.free(obj);
              }
            }).start();
          };

          for (var i = 0; i < gonum; i++) {
            _loop4();
          }
        };

        ItemFly._getPos = function _getPos(from, to) {
          var fromPos = from instanceof Vec2 ? from : from.localToGlobal(0, 0);
          var toPos = to instanceof Vec2 ? to : to.localToGlobal(0, 0);
          return {
            fromPos: fromPos,
            toPos: toPos
          };
        };

        var _proto6 = ItemFly.prototype;

        _proto6.OnInit = function OnInit() {};

        _proto6.addChild = function addChild(fgo) {
          this.fgc.addChild(fgo);
        };

        _proto6.OnGetBgAlpha = function OnGetBgAlpha() {
          return 0;
        };

        _proto6.OnBgClickClose = function OnBgClickClose() {
          return false;
        };

        _createClass(ItemFly, [{
          key: "dlgRes",
          get: function get() {
            return "ItemFly";
          }
        }, {
          key: "dlgLayer",
          get: function get() {
            return DlgLayer.ItemFly;
          }
        }], [{
          key: "me",
          get: function get() {
            if (!this._me) {
              this._me = tc.k(DlgKit).fetchDlg(ItemFly);
            }

            return this._me;
          }
        }]);

        return ItemFly;
      }(DlgBase));
      ItemFly._me = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ITreasureEffectOption.ts", ['cc'], function () {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "dd6861EAyNOrZAfa83oQrVN", "ITreasureEffectOption", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/JianjiaoAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './BuffId.ts', './NpcPropFunc.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, BuffId, NpcPropFunc, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "00e1flrtCBF8KKBOpNnckjU", "JianjiaoAct", undefined);

      var JianjiaoAct = exports('JianjiaoAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(JianjiaoAct, _ActBase);

        function JianjiaoAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = JianjiaoAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          var _this$title;

          return {
            icon: IntensionCfg.res.tactics,
            iconTip: '',
            title: (_this$title = this.title) != null ? _this$title : "尖叫",
            content: "\u8FD9\u540D\u654C\u4EBA\u5C06\u8981\u8D4B\u4E88\u73A9\u5BB6\u8D1F\u9762\u6548\u679C\u3002"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.skill_act_byskill_over(function () {
            _this.target.buff.mod(BuffId.weak, _this.weak);

            _this.target.buff.mod(BuffId.Kongju, _this.kongju);
          }, onOver);
        };

        _createClass(JianjiaoAct, [{
          key: "kongju",
          get: function get() {
            return parseInt(this.getProp(NpcPropFunc.jianjiao).args[0]);
          }
        }, {
          key: "weak",
          get: function get() {
            return parseInt(this.getProp(NpcPropFunc.jianjiao).args[1]);
          }
        }, {
          key: "title",
          get: function get() {
            return this.getProp(NpcPropFunc.jianjiao).args[2];
          }
        }]);

        return JianjiaoAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/JianxiaoAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './BuffId.ts', './NpcPropFunc.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, BuffId, NpcPropFunc, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "167aaIwe+hFRLU78hKGRk6p", "JianxiaoAct", undefined);

      var JianxiaoAct = exports('JianxiaoAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(JianxiaoAct, _ActBase);

        function JianxiaoAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = JianxiaoAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          var _this$title;

          return {
            icon: IntensionCfg.res.tactics,
            iconTip: '',
            title: (_this$title = this.title) != null ? _this$title : "尖啸",
            content: "\u8FD9\u540D\u654C\u4EBA\u5C06\u8981\u8D4B\u4E88\u73A9\u5BB6\u8D1F\u9762\u6548\u679C\u3002"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.skill_act_byskill_over(function () {
            _this.target.buff.mod(BuffId.weak, _this._weakLayer);
          }, onOver);
        };

        _createClass(JianxiaoAct, [{
          key: "_weakLayer",
          get: function get() {
            return parseInt(this.getProp(NpcPropFunc.jianxiao).args[0]);
          }
        }, {
          key: "title",
          get: function get() {
            return this.getProp(NpcPropFunc.jianxiao).args[1];
          }
        }]);

        return JianxiaoAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/JiewangBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d0af4HZ81JDXKewSKL691Uu", "JiewangBuffCom", undefined);

      var JiewangBuffCom = exports('JiewangBuffCom', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(JiewangBuffCom, _ABuffCom);

        function JiewangBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = JiewangBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.Hit, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.Hit) {
            this.owner.buff.mod(BuffId.Wang, this.buff.num);
          }
        };

        return JiewangBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/JijiubBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2f5e8bK6EZM7JrqscsoVIoO", "JijiubBuff", undefined); // 战斗结束时生命值低于25%时，回复【num】点生命


      var JijiubBuff = exports('JijiubBuff', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(JijiubBuff, _ATreasureBuffCom);

        function JijiubBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = JijiubBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.LeaveFight, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.LeaveFight) {
            if (this.owner.buff.numOf(BuffId.hp) / this.owner.buff.numOf(BuffId.maxhp) < 0.25) {
              this.owner.recoverHp(this.buff.num, 'jijiub');
              this.popWrap();
            }
          }
        };

        _createClass(JijiubBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Jijiub;
          }
        }]);

        return JijiubBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/JueduifyBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './FightPlay.ts', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, tc, FightPlay, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      FightPlay = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "57422+Jf5xCk5KjirztttI1", "JueduifyBuff", undefined);

      var JueduifyBuff = exports('default', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(JueduifyBuff, _ATreasureBuffCom);

        function JueduifyBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = JueduifyBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.HandCardIn, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HandCardIn) {
            this.owner.buff.mod(BuffId.shiled, tc.p(FightPlay).calcShieldMod(99, this.owner));
            this.popWrap();
          }
        };

        _createClass(JueduifyBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Fangyusq;
          }
        }]);

        return JueduifyBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/JuejingCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BuffId.ts', './AFightCardCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, BuffId, AFightCardCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      AFightCardCom = module.AFightCardCom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9e3d147+JFLEZpfbkpMN9dJ", "JuejingCom", undefined);

      var JuejingCom = exports('default', /*#__PURE__*/function (_AFightCardCom) {
        _inheritsLoose(JuejingCom, _AFightCardCom);

        function JuejingCom() {
          return _AFightCardCom.apply(this, arguments) || this;
        }

        var _proto = JuejingCom.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnCast = function OnCast() {
          var buff = this.caster.buff;

          if (buff.isMorethan(BuffId.shiled, 0)) {
            buff.mod(BuffId.shiled, this.calcShield2Self(buff.numOf(BuffId.shiled)));
          }
        };

        return JuejingCom;
      }(AFightCardCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/JuheAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './BuffId.ts', './NpcPropFunc.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, BuffId, NpcPropFunc, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7aee6aLqwdLAYI+WG7mcwhy", "JuheAct", undefined);

      var JuheAct = exports('JuheAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(JuheAct, _ActBase);

        function JuheAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = JuheAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          var _this$intensionTitle;

          return {
            icon: IntensionCfg.res.attack_tactics,
            iconTip: '',
            title: (_this$intensionTitle = this.intensionTitle) != null ? _this$intensionTitle : "居合攻击",
            content: "\u8FD9\u540D\u654C\u4EBA\u5C06\u8981\u653B\u51FB\u9020\u6210" + this.actualdmg + "\u70B9\u4F24\u5BB3\uFF0C\u5E76\u8D4B\u4E88\u81EA\u8EAB" + this.shield + "\u5C42\u62A4\u7532\u3002"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.attack_act_byatk_over(function () {
            _this.target.getHit(_this.actualdmg, _this.actor, 'JuheAct');

            _this.actor.buff.mod(BuffId.shiled, _this.shield);
          }, onOver);
        };

        _createClass(JuheAct, [{
          key: "intensionTitle",
          get: function get() {
            return this.getProp(NpcPropFunc.juhe).args[2];
          }
        }, {
          key: "actualdmg",
          get: function get() {
            return this.calcDmg(parseInt(this.getProp(NpcPropFunc.juhe).args[0]));
          }
        }, {
          key: "shield",
          get: function get() {
            return this.calcShield2Self(parseInt(this.getProp(NpcPropFunc.juhe).args[1]));
          }
        }]);

        return JuheAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/JuxiongAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AttackAct.ts', './DalilAct.ts', './MengjiAct.ts', './NpcAIBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AttackAct, DalilAct, MengjiAct, NpcAIBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      DalilAct = module.DalilAct;
    }, function (module) {
      MengjiAct = module.MengjiAct;
    }, function (module) {
      NpcAIBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f1080sx5ylGO7ImzBEKetgY", "JuxiongAI", undefined);

      var JuxiongAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(JuxiongAI, _NpcAIBase);

        function JuxiongAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = JuxiongAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          if (actNum % 3 == 0) {
            return new DalilAct(this.npc);
          } else if (actNum % 3 == 1) {
            return new AttackAct(this.npc);
          } else {
            return new MengjiAct(this.npc);
          }
        };

        return JuxiongAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Kahe.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BrownButtonText.ts', './CardConfirmDlg.ts', './PlayerCardSetCom.ts', './ATreasureCom.ts', './TreasureEffectStage.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, BrownButtonText, CardConfirmDlg, PlayerCardSetCom, ATreasureCom, TreasureEffectStage;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BrownButtonText = module.BrownButtonText;
    }, function (module) {
      CardConfirmDlg = module.default;
    }, function (module) {
      PlayerCardSetCom = module.PlayerCardSetCom;
    }, function (module) {
      ATreasureCom = module.default;
    }, function (module) {
      TreasureEffectStage = module.TreasureEffectStage;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bbd430gyGNK37F2F3mb2zM3", "Kahe", undefined);

      var Kahe = exports('default', /*#__PURE__*/function (_ATreasureCom) {
        _inheritsLoose(Kahe, _ATreasureCom);

        function Kahe() {
          return _ATreasureCom.apply(this, arguments) || this;
        }

        var _proto = Kahe.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          var _this = this;

          if (stage == TreasureEffectStage.OnGet) {
            var nonfixedCards = this.owner.c.get(PlayerCardSetCom).nonfixedCards;

            if (nonfixedCards.length > 0) {
              CardConfirmDlg.pop(nonfixedCards, {
                title: '请选择一张卡牌固定到开局手牌',
                tipFormat: '确定固定 {cardname} 吗？',
                backVis: false,
                multi: false,
                confirmBtnText: BrownButtonText.guding_kapai,
                onConfirm: function onConfirm(cardid) {
                  _this.owner.c.get(PlayerCardSetCom).fixedCard(cardid);

                  _this.reviseLog("cardid", cardid.toString());
                }
              });
            }
          } else if (stage == TreasureEffectStage.OnRecover) {
            var logCardId = this.getLog("cardid");

            if (logCardId) {
              this.owner.c.get(PlayerCardSetCom).fixedCard(parseInt(logCardId));
            }
          } else if (stage == TreasureEffectStage.OnOut) {
            var _logCardId = this.getLog("cardid");

            this.owner.c.get(PlayerCardSetCom).unfixedCard(parseInt(_logCardId));
            this.reviseLog("cardid", null);
          }
        };

        return Kahe;
      }(ATreasureCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/KuloubAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AttackAct.ts', './NpcAIBase.ts', './TouduAct.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AttackAct, NpcAIBase, TouduAct;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      NpcAIBase = module.default;
    }, function (module) {
      TouduAct = module.TouduAct;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f86a3Lqy1xPKIvjoaXDuSJe", "KuloubAI", undefined);

      var KuloubAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(KuloubAI, _NpcAIBase);

        function KuloubAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = KuloubAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          if (actNum % 2 == 0) return new AttackAct(this.npc);
          return new TouduAct(this.npc);
        };

        return KuloubAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/KuloudbAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './JianxiaoAct.ts', './JuheAct.ts', './NpcAIBase.ts', './XinlingzsAct.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, JianxiaoAct, JuheAct, NpcAIBase, XinlingzsAct;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      JianxiaoAct = module.JianxiaoAct;
    }, function (module) {
      JuheAct = module.JuheAct;
    }, function (module) {
      NpcAIBase = module.default;
    }, function (module) {
      XinlingzsAct = module.XinlingzsAct;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8f43a1MgoFJ3apBAwoEB97h", "KuloudbAI", undefined);
      /**骷髅盾兵 */


      var KuloudbAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(KuloudbAI, _NpcAIBase);

        function KuloudbAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = KuloudbAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          var no = actNum % 4;
          if (no == 0) return new JianxiaoAct(this.npc);else if (no == 1 || no == 3) return new JuheAct(this.npc);else return new XinlingzsAct(this.npc);
        };

        return KuloudbAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/KulougjsAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AttackAct.ts', './LiliangACt.ts', './MengjiAct.ts', './NpcAIBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AttackAct, LiliangAct, MengjiAct, NpcAIBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      LiliangAct = module.LiliangAct;
    }, function (module) {
      MengjiAct = module.MengjiAct;
    }, function (module) {
      NpcAIBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7d9c8Ks+R9OeJN0AXIuRGRM", "KulougjsAI", undefined);
      /**骷髅弓箭手 */


      var KulougjsAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(KulougjsAI, _NpcAIBase);

        function KulougjsAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = KulougjsAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          var no = actNum % 4;
          if (no == 0) return new LiliangAct(this.npc);else if (no == 1 || no == 3) return new AttackAct(this.npc);else return new MengjiAct(this.npc);
        };

        return KulougjsAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/KuloujjAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AttackAct.ts', './JuheAct.ts', './MengjiAct.ts', './NpcAIBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AttackAct, JuheAct, MengjiAct, NpcAIBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      JuheAct = module.JuheAct;
    }, function (module) {
      MengjiAct = module.MengjiAct;
    }, function (module) {
      NpcAIBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "16300E2x6xKy5zPX1mDtcuO", "KuloujjAI", undefined);

      var KuloujjAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(KuloujjAI, _NpcAIBase);

        function KuloujjAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = KuloujjAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          var actType = this.loopAct(actNum, 3, MengjiAct, AttackAct, JuheAct);
          return new actType(this.npc);
        };

        return KuloujjAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/KuroujBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlayerFightCardCom.ts', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PlayerFightCardCom, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8e42ee/P8lJMKB5aZGWMW4T", "KuroujBuffCom", undefined);

      var KuroujBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(KuroujBuffCom, _ABuffCom);

        function KuroujBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = KuroujBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.Hurt, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.Hurt) {
            this.owner.c.get(PlayerFightCardCom).wrapdraw(this.buff.num);
          }
        };

        return KuroujBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LangwangAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BuffId.ts', './PlayerFightCardCom.ts', './AttackAct.ts', './LangwangzzAct.ts', './LangxiaoAct.ts', './MengjiAct.ts', './NpcAIBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, BuffId, PlayerFightCardCom, AttackAct, LangwangzzAct, LangxiaoAct, MengjiAct, NpcAIBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      LangwangzzAct = module.LangwangzzAct;
    }, function (module) {
      LangxiaoAct = module.LangxiaoAct;
    }, function (module) {
      MengjiAct = module.MengjiAct;
    }, function (module) {
      NpcAIBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b11c0Y9ljNLgba+k9meqrgt", "LangwangAI", undefined);

      var LangwangAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(LangwangAI, _NpcAIBase);

        function LangwangAI() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _NpcAIBase.call.apply(_NpcAIBase, [this].concat(args)) || this;
          _this._lastZZ = -1;
          _this._lastZZNum = 0;
          _this._lastZZHandCastNum = -1;
          _this._lastXiao = -1;
          return _this;
        }

        var _proto = LangwangAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          var _this$npc$info$getLiv, _this$npc$info$getLiv2; // Zhengzhao


          var buff = this.npc.buff;
          var isZZ = buff.isMorethan(BuffId.Zhengzhaobj, 0);
          var handcastNum = (_this$npc$info$getLiv = (_this$npc$info$getLiv2 = this.npc.info.getLiveEnemys()[0]) == null ? void 0 : _this$npc$info$getLiv2.c.get(PlayerFightCardCom).handcastLastRound.length) != null ? _this$npc$info$getLiv : 0;
          var justZZ = this._lastZZ == actNum - 1;

          if (isZZ) {
            var alreadyConfirm = this._lastZZ == actNum && handcastNum != this._lastZZHandCastNum;

            if (!alreadyConfirm) {
              this._lastZZ = actNum;
              this._lastZZHandCastNum = handcastNum;
              this._lastZZNum = buff.numOf(BuffId.Zhengzhaobj);
              console.log("already confirm");
            }

            console.log("LangwangzzAct", this._lastZZNum);
            return new LangwangzzAct(this.npc, this._lastZZNum);
          }

          if (justZZ) {
            this._lastZZ = -1;
            this._lastZZHandCastNum = -1;
            this._lastXiao = -1;
            console.log("justZZ", 'reset');
          } // Xiao


          if (this._lastXiao == -1) {
            this._lastXiao = actNum;
            console.log("langxiao");
            return new LangxiaoAct(this.npc);
          } // Loop Act 


          var no = (actNum - this._lastXiao) % 3;

          if (no == 0 || no == 1) {
            return new AttackAct(this.npc);
          } else {
            return new MengjiAct(this.npc);
          }
        };

        _proto.OnDispose = function OnDispose() {
          this._lastZZ = -1;
          this._lastZZNum = -1;
          this._lastZZHandCastNum = -1;
          this._lastXiao = -1;
        };

        return LangwangAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LangwangzzAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './BuffId.ts', './NpcFighter.ts', './NpcId.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, IntensionCfg, BuffId, NpcFighter, NpcId, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      NpcFighter = module.NpcFighter;
    }, function (module) {
      NpcId = module.NpcId;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5152alv4x1Jw6qGI3DcfBr8", "LangwangzzAct", undefined); // 狼王征召


      var LangwangzzAct = exports('LangwangzzAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(LangwangzzAct, _ActBase);

        var _proto = LangwangzzAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.tactics,
            iconTip: '',
            title: "征召",
            content: "\u72FC\u738B\u5C06\u5F81\u53EC" + this.num + "\u540D\u6076\u72FC\u52A0\u5165\u6218\u573A"
          };
        };

        function LangwangzzAct(npc, num) {
          var _this;

          _this = _ActBase.call(this, npc) || this;
          _this.num = void 0;
          _this.num = num;
          return _this;
        }

        _proto.OnDo = function OnDo(onOver) {
          var _this2 = this;

          this.skill_act_over(function () {
            while (_this2.num--) {
              _this2.actor.info.fight.addEnemy(new NpcFighter(NpcId.Elang));
            }

            _this2.actor.buff.rm(BuffId.Zhengzhaobj);
          }, onOver);
        };

        return LangwangzzAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LangxiaoAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './BuffId.ts', './NpcPropFunc.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, BuffId, NpcPropFunc, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "52c1an3y85IWKvm/pin4zGQ", "LangxiaoAct", undefined); // 狼啸


      var LangxiaoAct = exports('LangxiaoAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(LangxiaoAct, _ActBase);

        function LangxiaoAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = LangxiaoAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.tactics,
            iconTip: '',
            title: "狼啸",
            content: "\u8FD9\u540D\u654C\u4EBA\u5C06\u8981\u7ED9\u5176\u9635\u8425\u5168\u4F53\u8D4B\u4E88" + this.power + "\u5C42\u529B\u91CF"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.skill_act_over(function () {
            _this.teammates.forEach(function (npc) {
              if (!npc.isDead) npc.buff.mod(BuffId.power, _this.power);
            });
          }, onOver);
        };

        _createClass(LangxiaoAct, [{
          key: "power",
          get: function get() {
            return parseInt(this.getProp(NpcPropFunc.langxiao).args[0]);
          }
        }]);

        return LangxiaoAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LazhuBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0c655tegGhGGL707PfTqM8I", "LazhuBuff", undefined); // 每2个回合，多获得 num 点能量值


      var LazhuBuff = exports('LazhuBuff', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(LazhuBuff, _ATreasureBuffCom);

        function LazhuBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = LazhuBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.HandCardIn, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HandCardIn) {
            var counter = this.counterNum;
            counter++;

            if (counter % 2 == 0) {
              this.owner.buff.mod(BuffId.enegy, this.buff.num);
              this.popWrap();
              counter = 0;
            }

            this.reviseNum(counter);
          }
        };

        _createClass(LazhuBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Lazhu;
          }
        }]);

        return LazhuBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LiandaoBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ff6e1ThK9dMf4dn/IyPGfJD", "LiandaoBuffCom", undefined); // recover the same number of layers energy after any enemy dead


      var LiandaoBuffCom = exports('default', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(LiandaoBuffCom, _ATreasureBuffCom);

        function LiandaoBuffCom() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = LiandaoBuffCom.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.AnyEnemyDead, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.AnyEnemyDead) {
            this.owner.buff.mod(BuffId.enegy, 1);
            this.popWrap();
          }
        };

        _createClass(LiandaoBuffCom, [{
          key: "tid",
          get: function get() {
            return TreasureId.Liandao;
          }
        }]);

        return LiandaoBuffCom;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LianxieBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6312aNdDjNK4LyjKJPUd+QF", "LianxieBuffCom", undefined);

      var LianxieBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(LianxieBuffCom, _ABuffCom);

        function LianxieBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = LianxieBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.OnRemove, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.OnRemove) {
            var friends = this.owner.info.getTeammates();

            for (var index = 0; index < friends.length; index++) {
              var friend = friends[index];

              if (friend != this.owner && friend.buff.isMorethan(BuffId.Lianxie, 0)) {
                return;
              }
            }

            friends.forEach(function (friend) {
              if (friend.isDead && !friend.isTrueDead) {
                friend.info.fight.onFighterDead(friend);
              }
            });
          }
        };

        return LianxieBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LiliangACt.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './NpcPropFunc.ts', './DalilAct.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, NpcPropFunc, DalilAct;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      DalilAct = module.DalilAct;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2ae1aVrHWZOF5ncxcNfwEXS", "LiliangACt", undefined);

      var LiliangAct = exports('LiliangAct', /*#__PURE__*/function (_DalilAct) {
        _inheritsLoose(LiliangAct, _DalilAct);

        function LiliangAct() {
          return _DalilAct.apply(this, arguments) || this;
        }

        var _proto = LiliangAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          var rlt = _DalilAct.prototype.OnGetIntension.call(this);

          rlt.title = '力量';
          return rlt;
        };

        _createClass(LiliangAct, [{
          key: "power",
          get: function get() {
            return parseInt(this.getProp(NpcPropFunc.li).args[0]);
          }
        }]);

        return LiliangAct;
      }(DalilAct));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LingxiuBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './NpcAICom.ts', './NpcId.ts', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, NpcAICom, NpcId, ABuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      NpcAICom = module.default;
    }, function (module) {
      NpcId = module.NpcId;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b4b4ckk1x1H4azFQ0IFE3qh", "LingxiuBuffCom", undefined);

      var LingxiuBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(LingxiuBuffCom, _ABuffCom);

        function LingxiuBuffCom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ABuffCom.call.apply(_ABuffCom, [this].concat(args)) || this;
          _this._npcAICom = void 0;
          return _this;
        }

        var _proto = LingxiuBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this._npcAICom = this.owner.c.get(NpcAICom);
          this.setOrder(BuffNS.EffectStage.AnyTeammateTrueDead, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (!this._npcAICom) return;

          if (stage == BuffNS.EffectStage.AnyTeammateTrueDead) {
            // 在场上恶狼的数量小于2的时候发动征召
            var sum = this.owner.info.getLiveTeammates().reduce(function (sum, teammate) {
              if (teammate.info.npcInfo.id == NpcId.Elang) {
                sum += 1;
              }

              return sum;
            }, 0); // console.log("LingxiuBuffCom", sum, arg.log);

            if (sum < 2) {
              this.owner.buff.mod(BuffId.Zhengzhaobj, 3 - sum, {
                write: true
              });

              this._npcAICom.refreshAction();
            }
          }
        };

        return LingxiuBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ListItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIWrap.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, UIWrap;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIWrap = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d8e85jelLtIXo7drzRQK4NX", "ListItem", undefined);

      var ListItem = exports('default', /*#__PURE__*/function (_UIWrap) {
        _inheritsLoose(ListItem, _UIWrap);

        function ListItem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIWrap.call.apply(_UIWrap, [this].concat(args)) || this;
          _this.curData = void 0;
          _this._index = void 0;
          return _this;
        }

        var _proto = ListItem.prototype;

        _proto.refresh = function refresh(data, index) {
          this.curData = data;
          this._index = index;
          this.OnRefresh(this.curData, this._index);
        };

        _proto.internalRefresh = function internalRefresh() {
          this.OnRefresh(this.curData, this._index);
        };

        _createClass(ListItem, [{
          key: "index",
          get: function get() {
            return this._index;
          }
        }]);

        return ListItem;
      }(UIWrap));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ListWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIWrap.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, UIWrap;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIWrap = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "796fbB1eg9N35ZCB4svShd5", "ListWrap", undefined);

      var ListWrap = exports('default', /*#__PURE__*/function (_UIWrap) {
        _inheritsLoose(ListWrap, _UIWrap);

        function ListWrap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIWrap.call.apply(_UIWrap, [this].concat(args)) || this;
          _this._itemDict = void 0;
          _this._itemType = void 0;
          _this._sourceData = void 0;
          _this._list = void 0;
          return _this;
        }

        var _proto = ListWrap.prototype;

        _proto.OnInit = function OnInit() {
          this._list = this.fgc.asList;

          this._list.setVirtual();

          this._list.itemRenderer = this._renderListItem.bind(this);
        };

        _proto.initList = function initList(type, sourceData) {
          this._itemType = type;
          this._itemDict = new Map();
          this.SourceData = sourceData;
        };
        /**
         * 刷新对应数据位置的格子
         */


        _proto.refreshItemByIndex = function refreshItemByIndex(index) {
          this._itemDict.forEach(function (value) {
            if (value.index === index) {
              value.internalRefresh();
              return false;
            }
          });
        }
        /**刷新全部 */
        ;

        _proto.refreshAll = function refreshAll() {
          this._itemDict.forEach(function (value) {
            value.internalRefresh();
          });
        };

        _proto._renderListItem = function _renderListItem(index, obj) {
          var wrap;

          if (this._itemDict.has(obj.id)) {
            wrap = this._itemDict.get(obj.id);
          } else {
            wrap = this.wrap(this._itemType, obj);

            this._itemDict.set(obj.id, wrap);
          }

          wrap.refresh(this._sourceData[index], index);
        };

        _createClass(ListWrap, [{
          key: "SourceData",
          get: function get() {
            return this._sourceData;
          },
          set: function set(data) {
            this._sourceData = data;
            this._list.numItems = this._sourceData.length;
          }
        }, {
          key: "itemDict",
          get: function get() {
            return this._itemDict;
          }
        }]);

        return ListWrap;
      }(UIWrap));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LoadingDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DlgBase.ts', './DlgKit.ts', './tc.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, DlgBase, DlgKit, DlgLayer, tc;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgKit = module.DlgKit;
      DlgLayer = module.DlgLayer;
    }, function (module) {
      tc = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "53d64OqfYxHzrH4CwFKlWZa", "LoadingDlg", undefined);

      var LoadingDlg = exports('default', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(LoadingDlg, _DlgBase);

        function LoadingDlg() {
          return _DlgBase.apply(this, arguments) || this;
        }

        LoadingDlg.show = function show() {
          if (!this._dlg) {
            this._dlg = tc.k(DlgKit).fetchDlg(LoadingDlg);
          }

          this._dlg.show();
        };

        LoadingDlg.delay = function delay(dur, onEnd) {
          var _this = this;

          this.show();

          this._dlg.addDelay(dur, function () {
            _this.hide();

            onEnd == null ? void 0 : onEnd();
          });
        };

        LoadingDlg.hide = function hide() {
          var _this$_dlg;

          (_this$_dlg = this._dlg) == null ? void 0 : _this$_dlg.hide();
        };

        var _proto = LoadingDlg.prototype;

        _proto.OnInit = function OnInit() {
          if (LoadingDlg._dlg != null) this.close();
        };

        _proto.OnBgClickClose = function OnBgClickClose() {
          return false;
        };

        _createClass(LoadingDlg, [{
          key: "dlgRes",
          get: function get() {
            return "LoadingDlg";
          }
        }, {
          key: "dlgLayer",
          get: function get() {
            return DlgLayer.Topest;
          }
        }]);

        return LoadingDlg;
      }(DlgBase));
      LoadingDlg._dlg = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LuanwuCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlayerFightCardCom.ts', './CardItem.ts', './AFightCardCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PlayerFightCardCom, CardPropFunc, AFightCardCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      CardPropFunc = module.CardPropFunc;
    }, function (module) {
      AFightCardCom = module.AFightCardCom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "577bc1QloNCpZLf7w6LaWoY", "LuanwuCom", undefined);

      var LuanwuCom = exports('default', /*#__PURE__*/function (_AFightCardCom) {
        _inheritsLoose(LuanwuCom, _AFightCardCom);

        function LuanwuCom() {
          return _AFightCardCom.apply(this, arguments) || this;
        }

        var _proto = LuanwuCom.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnCast = function OnCast() {
          var fcc = this.caster.c.get(PlayerFightCardCom);
          var hit = this.fightcard.fightCardHandler.getPropDealerByFunc(CardPropFunc.hit)[0];
          var num = fcc.hand.length;
          fcc.costall();

          while (num--) {
            hit.castEffect();
          }
        };

        return LuanwuCom;
      }(AFightCardCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LueduoBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "be8d6PBGbBHAaCYh5/nzRLD", "LueduoBuff", undefined);

      var LueduoBuff = exports('LueduoBuff', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(LueduoBuff, _ATreasureBuffCom);

        function LueduoBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = LueduoBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.listenTo(BuffId.coin);
          this.setOrder(BuffNS.EffectStage.OnListenBuffMod, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.OnListenBuffMod) {
            if (arg.listenBuffId != BuffId.coin) return;
            var mod = arg.modnum;
            var log = arg.log;

            if (mod > 0 && log != 'lueduo') {
              var add = Math.floor(mod * this.buff.num / 100);

              if (add > 0) {
                this.owner.buff.mod(BuffId.coin, add, {
                  log: 'lueduo'
                });
                this.popWrap();
              }
            }
          }
        };

        _createClass(LueduoBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Lueduo;
          }
        }]);

        return LueduoBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LunpanBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BrownButtonText.ts', './CardConfirmDlg.ts', './tc.ts', './PlayerFightCardCom.ts', './PlayerPlay.ts', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, BrownButtonText, CardConfirmDlg, tc, PlayerFightCardCom, PlayerPlay, TreasureId, ATreasureBuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BrownButtonText = module.BrownButtonText;
    }, function (module) {
      CardConfirmDlg = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4c5c81X991MG4uPOXmS5F8S", "LunpanBuff", undefined);

      var LunpanBuff = exports('LunpanBuff', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(LunpanBuff, _ATreasureBuffCom);

        function LunpanBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = LunpanBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.HandCardIn, BuffNS.EffectOrder.last);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HandCardIn) {
            if (this.owner.actNum == 0) {
              var p = tc.p(PlayerPlay).player;
              var fcc = p.c.get(PlayerFightCardCom);
              var hands = fcc.hand;
              CardConfirmDlg.pop(hands.map(function (fc) {
                return fc.info.id;
              }), {
                title: '请选择要丢弃的卡牌',
                multi: true,
                backVis: false,
                confirmBtnText: BrownButtonText.diuqi_kapai,
                mustChoose: false,
                onConfirmMulti: function onConfirmMulti(_, idxArr) {
                  idxArr.map(function (idx) {
                    return hands.at(idx);
                  }).forEach(function (fc) {
                    fcc.discard(fc);
                  });
                  fcc.wrapdraw(idxArr.length);
                }
              });
            }
          }
        };

        _createClass(LunpanBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Lunpan;
          }
        }]);

        return LunpanBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./Config.ts', './ConfigTypeDefind.ts', './Xls.ts', './Plat.ts', './PlatAnd.ts', './PlatBase.ts', './PlatCfg.ts', './PlatIOS.ts', './PlatMi.ts', './PlatOPPO.ts', './PlatVIVO.ts', './PlatWX.ts', './PlatWeb.ts', './TocardGame.ts', './CardCfg.ts', './ExploreCfg.ts', './FightCfg.ts', './IntensionCfg.ts', './PlayerCfg.ts', './PreparCfg.ts', './ShopCfg.ts', './UICfg.ts', './AlertDlg.ts', './BgDlg.ts', './BookDlg.ts', './BrownButtonText.ts', './CardConfirmDlg.ts', './CardRwdDlg.ts', './CardSetDlg.ts', './CoinRwdDlg.ts', './EntryDlg.ts', './ExploreDlg.ts', './FightDlg.ts', './FightFailDlg.ts', './FightRwdChooseWrap.ts', './FightRwdDlg.ts', './FireDlg.ts', './GMCmd.ts', './GMDlg.ts', './GMDlgBase.ts', './GameGM.ts', './HeroChooseDlg.ts', './HoverTipDlg.ts', './LoadingDlg.ts', './PreparDlg.ts', './RewardChooseDlg.ts', './ShopDlg.ts', './TipDlg.ts', './TopbarDlg.ts', './TreasureBuyDlg.ts', './TreasureConfirmDlg.ts', './TreasureIntroDlg.ts', './TreasureRwdDlg.ts', './BoneAnim.ts', './DlgBase.ts', './DlgKit.ts', './ListItem.ts', './ListWrap.ts', './UIBase.ts', './UIDocker.ts', './UIWrap.ts', './ReslockKit.ts', './UserKit.ts', './XTween.ts', './FreeList.ts', './ILoopFunction.ts', './YTree.ts', './StageMachineBase.ts', './TCStageMachine.ts', './ArrayExtensions.mjs_cjs=&original=.js', './ComModule.ts', './ObjectExtensions.mjs_cjs=&original=.js', './PoolModule.ts', './StringExtensions.mjs_cjs=&original=.js', './TSDecorators.ts', './Util.ts', './EntryPlay.ts', './AdPlay.ts', './ABuffCom.ts', './ATreasureBuffCom.ts', './BaseFightBuffAdder.ts', './BeiShijianglBuffCom.ts', './BeiShufuBuffCom.ts', './Buff.ts', './BuffId.ts', './BuffNS.ts', './BuffPlay.ts', './ChaoqiangllBuff.ts', './ChuangshangBuffCom.ts', './ChujueCfq.ts', './ChunqiubBuff.ts', './CizhenBuffCom.ts', './ClearOnDead.ts', './ClearOnLeaveFight.ts', './ClearOnNumZero.ts', './ClearOnRoundStart.ts', './CoinBuff.ts', './CollecterBuff.ts', './DalianBuff.ts', './Debuff.ts', './DecOnRoundEnd.ts', './DecOnRoundStart.ts', './DuyaopZzBuff.ts', './DuyunBuff.ts', './EnergyCom.ts', './EnterFightFightBuffAdder.ts', './FanshangjBuffCom.ts', './FeixingBuffCom.ts', './FennuyjBuffCom.ts', './FuhuoBuffCom.ts', './GelieBuffCom.ts', './GelieFeatrueBuffCom.ts', './GrowCom.ts', './HuichunBuffCom.ts', './HuihenBuffCom.ts', './HundengBuff.ts', './HuoyanjBuff.ts', './JiewangBuffCom.ts', './JijiubBuff.ts', './JueduifyBuff.ts', './KuroujBuffCom.ts', './LazhuBuff.ts', './LiandaoBuffCom.ts', './LianxieBuffCom.ts', './LingxiuBuffCom.ts', './LueduoBuff.ts', './LunpanBuff.ts', './Maxhp.ts', './MeihuoBuffCom.ts', './MeihuoFeatureBuff.ts', './MiyaoZzBuff.ts', './NengliangyjBuff.ts', './PoisonCom.ts', './PojiadBuff.ts', './QiangtouBuff.ts', './QiangzhuangBuff.ts', './QiegqBuff.ts', './RongyankjBuffCom.ts', './ShaoweiBuff.ts', './ShiledCom.ts', './ShixueBuffCom.ts', './ShizijBuff.ts', './ShowNum.ts', './ShowOnStatuBuffCom.ts', './ShuangmianjBuff.ts', './ShuijingqBuff.ts', './TreasureFeixingBuffCom.ts', './TuduBuff.ts', './TuifeiBuffCom.ts', './WangzhezgBj.ts', './WuxianhfBuff.ts', './XiaoyuandBuff.ts', './XingfenjBuff.ts', './XipaiqBuff.ts', './XuanyunBuffCom.ts', './XuebaoBuff.ts', './YinrenBuffCom.ts', './YinshenyBuff.ts', './YishibBuff.ts', './YuanDunBuffCom.ts', './YuxueBuff.ts', './ZhihuanBuff.ts', './ZhuoshaoBuffCom.ts', './ZibaoBuffCom.ts', './ZimujBuff.ts', './CardEffecter.ts', './CardId.ts', './CardItem.ts', './CardPlay.ts', './CardRare.ts', './CardType.ts', './AFightCardCom.ts', './DutuCom.ts', './EnergyCostCom.ts', './FenliyjCom.ts', './FightCard.ts', './FightCardHandler.ts', './FightCardMsg.ts', './FightCardSeekLogic.ts', './JuejingCom.ts', './LuanwuCom.ts', './ManyCardsCom.ts', './NormalEffecterCom.ts', './RuodiangjCom.ts', './SeekLogicCom.ts', './SignNumCom.ts', './TunshiCom.ts', './AExploreNodeHandler.ts', './ExploreEvent.ts', './ExploreEventItem.ts', './ExploreNodeData.ts', './ExplorePlay.ts', './FightEvent.ts', './FireEvent.ts', './ShopEvent.ts', './UnknwonEvent.ts', './AFightCom.ts', './Fight.ts', './FightBuffCom.ts', './FightPlay.ts', './IFighterWrap.ts', './ANpcCom.ts', './INpc.ts', './NpcAICom.ts', './NpcBuffCom.ts', './NpcFighter.ts', './NpcId.ts', './NpcInfoCom.ts', './NpcItem.ts', './NpcPlay.ts', './NpcProp.ts', './NpcPropFunc.ts', './NpcUtilCom.ts', './PlayerCardSetCom.ts', './PlayerExploreCom.ts', './PlayerFightCardCom.ts', './PlayerPreparCom.ts', './PlayerSaveCom.ts', './PlayerSeedCom.ts', './PlayerTreasureCom.ts', './ActBase.ts', './ActHelper.ts', './AddTeamBuffAct.ts', './AddbuffAct.ts', './AnfuAct.ts', './AttackAct.ts', './BianfuAI.ts', './ChujueAct.ts', './DalilAct.ts', './ElangAI.ts', './EmoAI.ts', './FennuyjAct.ts', './FushiAct.ts', './GebulAI.ts', './GebulgsAI.ts', './GivebuffAct.ts', './GuanjiaAI.ts', './HuanmoAI.ts', './IAct.ts', './INpcAI.ts', './Intension.ts', './JianjiaoAct.ts', './JianxiaoAct.ts', './JuheAct.ts', './JuxiongAI.ts', './KuloubAI.ts', './KuloudbAI.ts', './KulougjsAI.ts', './KuloujjAI.ts', './LangwangAI.ts', './LangwangzzAct.ts', './LangxiaoAct.ts', './LiliangACt.ts', './MantuolAI.ts', './MeihuoAct.ts', './MeimoAI.ts', './MengjiAct.ts', './MengyanAI.ts', './MiaozhunAct.ts', './MulAttackAct.ts', './NpcAIBase.ts', './PreparReviveAct.ts', './QifeiAct.ts', './QishiAI.ts', './ReviveAct.ts', './RongyanAct.ts', './ShangkoudjAct.ts', './ShilaimAI.ts', './ShinvAI.ts', './ShirenhAI.ts', './ShishigAI.ts', './ShiweiAI.ts', './SiwanggszAI.ts', './TouduAct.ts', './XinlingzsAct.ts', './XuanyunAct.ts', './XuliAct.ts', './YemobfAI.ts', './YezhuAI.ts', './YoulingAI.ts', './YoulingzlAI.ts', './ZhizhuAI.ts', './ZibaoAct.ts', './ZibaogblAI.ts', './Player.ts', './PlayerBuff.ts', './PlayerBuffId.ts', './PlayerPlay.ts', './APlayerCom.ts', './PlayerBuffCom.ts', './ATreasureCom.ts', './ITreasureEffectOption.ts', './Kahe.ts', './NothingTreasureCom.ts', './Treasure.ts', './TreasureCounter.ts', './TreasureEffectOrder.ts', './TreasureEffectStage.ts', './TreasureId.ts', './TreasureItem.ts', './TreasurePlay.ts', './TreasurePropDelaer.ts', './TreasureRare.ts', './TrueEndPlay.ts', './ProcessSys.ts', './InputSys.ts', './StorageSys.ts', './TimeSys.ts', './FUISys.ts', './FgoPool.ts', './tc.ts', './BuffIconListWrap.ts', './CardBuyDlg.ts', './CardIntroDlg.ts', './CardListItem4SaleWrap.ts', './CardListItemWrap.ts', './FightBottomAreaWrap.ts', './HandCardWrap.ts', './HeroIntroWrap.ts', './ItemFly.ts', './MapStopWrap.ts', './MapWrap.ts', './NpcFighterWrap.ts', './OutlineBtnWrap.ts', './PlayerFighterWrap.ts', './PreparItem.ts', './PreparWrap.ts', './PreviewCardWrap.ts', './SeekLineWrap.ts', './TreasureItem4SellWrap.ts', './TreasureItemWrap.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/MantuolAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GivebuffAct.ts', './NpcAIBase.ts', './TouduAct.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, GivebuffAct, NpcAIBase, TouduAct;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GivebuffAct = module.GivebuffAct;
    }, function (module) {
      NpcAIBase = module.default;
    }, function (module) {
      TouduAct = module.TouduAct;
    }],
    execute: function () {
      cclegacy._RF.push({}, "27fbeNYSy9A7KK4ja9vfkgP", "MantuolAI", undefined);

      var MantuolAI = exports('MantuolAI', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(MantuolAI, _NpcAIBase);

        function MantuolAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = MantuolAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          if (actNum == 0) {
            return new GivebuffAct(this.npc);
          } else {
            return new TouduAct(this.npc);
          }
        };

        return MantuolAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ManyCardsCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Util.ts', './BuffId.ts', './NpcAICom.ts', './PlayerFightCardCom.ts', './CardEffecter.ts', './CardItem.ts', './AFightCardCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, randomInt, BuffId, NpcAICom, PlayerFightCardCom, CardHitEffect, CardPropFunc, AFightCardCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      randomInt = module.randomInt;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      NpcAICom = module.default;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      CardHitEffect = module.CardHitEffect;
    }, function (module) {
      CardPropFunc = module.CardPropFunc;
    }, function (module) {
      AFightCardCom = module.AFightCardCom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "cff9cJ4U4ND8LK490lUk4HM", "ManyCardsCom", undefined); // 偷袭


      var TouxiCom = exports('TouxiCom', /*#__PURE__*/function (_AFightCardCom) {
        _inheritsLoose(TouxiCom, _AFightCardCom);

        function TouxiCom() {
          return _AFightCardCom.apply(this, arguments) || this;
        }

        var _proto = TouxiCom.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnCast = function OnCast() {
          var hit = this.fightcard.fightCardHandler.getPropDealerByFunc(CardPropFunc.hit)[0];
          var eFragile = hit.choose.buff.isMorethan(BuffId.fragile, 0);
          hit.castEffect();

          if (eFragile) {
            var energy = this.fightcard.fightCardHandler.getPropDealerByFunc(CardPropFunc.energy)[0];
            energy.castEffect();
          }
        };

        return TouxiCom;
      }(AFightCardCom));
      var DunjiCom = exports('DunjiCom', /*#__PURE__*/function (_AFightCardCom2) {
        _inheritsLoose(DunjiCom, _AFightCardCom2);

        function DunjiCom() {
          return _AFightCardCom2.apply(this, arguments) || this;
        }

        var _proto2 = DunjiCom.prototype;

        _proto2.OnInit = function OnInit() {};

        _proto2.OnCast = function OnCast() {
          var selfShiled = this.caster.buff.numOf(BuffId.shiled);

          if (selfShiled > 0) {
            var hit = new CardHitEffect(this.fightcard, {
              rawprop: "",
              func: CardPropFunc.hit,
              args: ["" + selfShiled, "0"]
            });
            hit.castEffect();
          }
        };

        return DunjiCom;
      }(AFightCardCom));
      var FanzhaoCom = exports('FanzhaoCom', /*#__PURE__*/function (_AFightCardCom3) {
        _inheritsLoose(FanzhaoCom, _AFightCardCom3);

        function FanzhaoCom() {
          return _AFightCardCom3.apply(this, arguments) || this;
        }

        var _proto3 = FanzhaoCom.prototype;

        _proto3.OnInit = function OnInit() {};

        _proto3.OnCast = function OnCast() {
          var fcc = this.caster.c.get(PlayerFightCardCom);
          var num = fcc.hand.length;

          if (num > 0) {
            fcc.discard(fcc.hand.at(randomInt(0, num)));
          }

          var draw = this.fightcard.fightCardHandler.getPropDealerByFunc(CardPropFunc.draw);
          draw.forEach(function (e) {
            return e.castEffect();
          });
        };

        return FanzhaoCom;
      }(AFightCardCom)); // if enemy prepar to attack, gain 1 layer power-buff

      var DongchaCom = exports('DongchaCom', /*#__PURE__*/function (_AFightCardCom4) {
        _inheritsLoose(DongchaCom, _AFightCardCom4);

        function DongchaCom() {
          return _AFightCardCom4.apply(this, arguments) || this;
        }

        var _proto4 = DongchaCom.prototype;

        _proto4.OnInit = function OnInit() {};

        _proto4.OnCast = function OnCast() {
          var _choose$c$get;

          var choose = this.choose;

          if ((_choose$c$get = choose.c.get(NpcAICom)) != null && _choose$c$get.isAttackIntension()) {
            var power = this.fightcard.fightCardHandler.getPropDealerByFunc(CardPropFunc.power);
            power.forEach(function (e) {
              return e.castEffect();
            });
          }
        };

        return DongchaCom;
      }(AFightCardCom));
      var DuyaopCardEffect = exports('DuyaopCardEffect', /*#__PURE__*/function (_AFightCardCom5) {
        _inheritsLoose(DuyaopCardEffect, _AFightCardCom5);

        function DuyaopCardEffect() {
          return _AFightCardCom5.apply(this, arguments) || this;
        }

        var _proto5 = DuyaopCardEffect.prototype;

        _proto5.OnInit = function OnInit() {};

        _proto5.OnCast = function OnCast() {
          var poison = this.fightcard.fightCardHandler.getPropDealerByFunc(CardPropFunc.poison);
          var repeat = this.fightcard.fightCardHandler.getIntVal("repeat");

          while (repeat--) {
            poison.forEach(function ($) {
              return $.castEffect();
            });
          }
        };

        return DuyaopCardEffect;
      }(AFightCardCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MapStopWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui-ccc370.mjs', './GMDlg.ts', './DlgKit.ts', './UIWrap.ts', './ExplorePlay.ts', './tc.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, GTween, MapStopGMDlg, DlgKit, UIWrap, ExplorePlay, tc;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GTween = module.GTween;
    }, function (module) {
      MapStopGMDlg = module.MapStopGMDlg;
    }, function (module) {
      DlgKit = module.DlgKit;
    }, function (module) {
      UIWrap = module.default;
    }, function (module) {
      ExplorePlay = module.default;
    }, function (module) {
      tc = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f8233MgYAJLqKRghtVy891v", "MapStopWrap", undefined);

      var MapStopWrap = exports('MapStopWrap', /*#__PURE__*/function (_UIWrap) {
        _inheritsLoose(MapStopWrap, _UIWrap);

        function MapStopWrap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIWrap.call.apply(_UIWrap, [this].concat(args)) || this;
          _this._icon = void 0;
          _this._mark = void 0;
          _this._gm = void 0;
          _this._treenode = void 0;
          _this._typeCtrl = void 0;
          _this._scene = void 0;
          _this._state = void 0;
          return _this;
        }

        var _proto = MapStopWrap.prototype;

        _proto.OnInit = function OnInit() {
          this._icon = this.getLoader("icon");
          this._gm = this.getCom("gm").asBtn;
          this._mark = this.getCom("mark").asImage;
          this._typeCtrl = this.getController("type");
          this.state = 'idle';
          this.addBtnEvt("", this._clickStop, this);
          this.addBtnEvt(this._gm, this._clickGM);
        };

        _proto.refresh = function refresh(scene) {
          if (this._state == 'available') {
            if (scene == "view") {
              this.fgc.getTransition("waiting").stop(true);
            } else {
              this.fgc.getTransition("waiting").play(null, -1);
            }
          }

          this._scene = scene;
        };

        _proto._clickGM = function _clickGM(enableBtn) {
          var _this2 = this;

          if (this._scene == "view") {
            enableBtn();
            return;
          }

          tc.k(DlgKit).fetchDlg(MapStopGMDlg).setup(this.treenode, function () {
            _this2._clickStop(function () {}, true);
          });
          enableBtn();
        };

        _proto._clickStop = function _clickStop(enableBtn, force) {
          var _this3 = this;

          if (force === void 0) {
            force = false;
          }

          if (!force && this._state !== 'available' || this._scene == "view") {
            enableBtn();
            return;
          }

          GTween.to(0, 1, 0.4).setTarget(this._mark, "fillAmount").onComplete(function () {
            tc.p(ExplorePlay).enterNode(_this3._treenode.id);
            enableBtn();
          });
        };

        _proto.setTreeNode = function setTreeNode(node) {
          this._treenode = node;

          this._typeCtrl.setSelectedIndex(this._treenode.data.info.type);

          this._gm.text = this.info.name;
        };

        _createClass(MapStopWrap, [{
          key: "state",
          set: function set(value) {
            if (this._state === 'completed') return;

            if (this._state != value) {
              this._state = value;
              this.fgc.getTransition("waiting").stop(true);

              if (value == 'idle') {
                this._mark.visible = false;
                this._icon.alpha = 0.7;
                this.fgc.setScale(1, 1);
              } else if (value == 'available') {
                this._mark.visible = true;
                this._mark.fillAmount = 0;
                this.fgc.getTransition("waiting").play(null, -1);
              } else if (value == 'completed') {
                this._mark.visible = true;
                this._mark.fillAmount = 1;
                this._icon.alpha = 1;
                this.fgc.setScale(1, 1);
              }
            }
          }
        }, {
          key: "info",
          get: function get() {
            return this._treenode.data.info;
          }
        }, {
          key: "treenode",
          get: function get() {
            return this._treenode;
          }
        }]);

        return MapStopWrap;
      }(UIWrap));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MapWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ExploreCfg.ts', './UIWrap.ts', './Util.ts', './ExplorePlay.ts', './PlayerExploreCom.ts', './PlayerPlay.ts', './FUISys.ts', './tc.ts', './MapStopWrap.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, lerp, clamp01, ExploreCfg, UIWrap, randomInt, random, ExplorePlay, PlayerExploreCom, PlayerPlay, FUISys, tc, MapStopWrap;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      lerp = module.lerp;
      clamp01 = module.clamp01;
    }, function (module) {
      ExploreCfg = module.default;
    }, function (module) {
      UIWrap = module.default;
    }, function (module) {
      randomInt = module.randomInt;
      random = module.random;
    }, function (module) {
      ExplorePlay = module.default;
    }, function (module) {
      PlayerExploreCom = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      FUISys = module.FUISys;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      MapStopWrap = module.MapStopWrap;
    }],
    execute: function () {
      cclegacy._RF.push({}, "336eab6bqxCjZIu0T/5lABG", "MapWrap", undefined);

      var MapWrap = exports('MapWrap', /*#__PURE__*/function (_UIWrap) {
        _inheritsLoose(MapWrap, _UIWrap);

        function MapWrap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIWrap.call.apply(_UIWrap, [this].concat(args)) || this;
          _this._seed = void 0;
          _this._start = void 0;
          _this._end = void 0;
          _this._lines = void 0;
          _this._exploreCom = void 0;
          _this._mapstopMap = void 0;
          return _this;
        }

        var _proto = MapWrap.prototype;

        _proto.OnInit = function OnInit() {
          this._start = this.getChild("start");
          this._end = this.getChild("end");
          this._lines = this.getCom("lines");
          this._mapstopMap = new Map();
          this._exploreCom = tc.p(PlayerPlay).player.c.get(PlayerExploreCom);
          this._seed = tc.p(PlayerPlay).player.seed.mapSeed;

          this._paintTreeOnMap(tc.p(ExplorePlay).tree);

          this._onCurStopChg();

          this._scrollToViewCurStop();

          this.addEvt(this._exploreCom.e, PlayerExploreCom.Events.CUR_STOP_CHG, this._onCurStopChg);
        };

        _proto.refresh = function refresh(scene) {
          this._mapstopMap.forEach(function (wrap) {
            return wrap.refresh(scene);
          });
        };

        _proto._scrollToViewCurStop = function _scrollToViewCurStop() {
          var curStop = this._mapstopMap.get(this._exploreCom.curStopId);

          if (curStop) {
            var pre3Stop = curStop;
            var num = 3;

            while (pre3Stop.treenode.parents && pre3Stop.treenode.parents.length > 0 && num > 0) {
              pre3Stop = this._mapstopMap.get(pre3Stop.treenode.parents[0].id);
              num--;
            }

            this.fgc.scrollPane.scrollStep = 100;
            this.fgc.scrollPane.scrollToView(pre3Stop.fgc);
          }
        };

        _proto._onCurStopChg = function _onCurStopChg() {
          var _this2 = this;

          this._mapstopMap.forEach(function (wrap) {
            wrap.state = 'idle';
          });

          this._exploreCom.path.forEach(function (stopId) {
            _this2._mapstopMap.get(stopId).state = 'completed';
          }); // console.log('nextStops', this._exploreCom.nextStops);


          this._exploreCom.nextStops.forEach(function (stop) {
            _this2._mapstopMap.get(stop.id).state = 'available';
          });
        };

        _proto._paintTreeOnMap = function _paintTreeOnMap(tree) {
          var _this3 = this;

          var ySpace = ExploreCfg.ySpace;
          var width = this._end.x - this._start.x;
          var height = this._end.y - this._start.y;
          var sillWidth = width / tree.maxdepth;
          var sillHeight = height / tree.maxdepth;
          var seed = this._seed;

          this._mapstopMap.clear();

          tree.walkByMaxDepthOrder(function (n, dep, siblingNum, index) {
            var dotFgo = tc.s(FUISys).createObject(ExploreCfg.mapdotRes[0], ExploreCfg.mapdotRes[1]);

            var dotWrap = _this3.wrap(MapStopWrap, dotFgo);

            var thisSpace = randomInt(ySpace[0], ySpace[1], seed + dep * 3);
            var pos = [_this3._end.x - sillWidth * dep, _this3._end.y - sillHeight * dep];
            var posYStart = pos[1] - thisSpace / 2;

            if (siblingNum > 1) {
              var thisSpacePart = thisSpace / (siblingNum - 1);
              pos[1] = posYStart + thisSpacePart * index;
            }

            dotFgo.setPivot(0.5, 0.5, true);
            dotWrap.setTreeNode(n);
            dotFgo.setPosition(pos[0], pos[1]);

            _this3._mapstopMap.set(n.id, dotWrap);
          });

          this._mapstopMap.forEach(function (wrap) {
            wrap.treenode.parents.forEach(function (p) {
              _this3._paintLine(_this3._mapstopMap.get(p.id).fgc, wrap.fgc, {
                offsetStrength: 9,
                rotationStrength: 4,
                w2space: 2,
                cutLen: [30, 30]
              });
            });

            _this3.fgc.addChild(wrap.fgc);

            _this3.fgc.setChildIndex(wrap.fgc, _this3.fgc.numChildren - 3);
          });
        }
        /**
         *
         * @param from
         * @param to
         * @param option 配置项
         */
        ;

        _proto._paintLine = function _paintLine(from, to, option) {
          var _option$offsetStrengt, _option$rotationStren;

          var offsetStrength = (_option$offsetStrengt = option.offsetStrength) != null ? _option$offsetStrengt : 0;
          var rotationStrength = (_option$rotationStren = option.rotationStrength) != null ? _option$rotationStren : 0;
          var linedot = tc.s(FUISys).createObject(ExploreCfg.maplinedotRes[0], ExploreCfg.maplinedotRes[1]);
          var w = linedot.width;
          var xStart = from.x;
          var yStart = from.y;
          var xDir = to.x - from.x;
          var yDir = to.y - from.y;

          if (option.cut) {
            var cut = option.cut;
            xStart += xDir * cut[0];
            yStart += yDir * cut[0];
            xDir *= cut[1] - cut[0];
            yDir *= cut[1] - cut[0];
          } else if (option.cutLen) {
            var cutLen = option.cutLen;
            tc.tmpVec2.set(xDir, yDir).normalize().multiplyScalar(cutLen[0]);
            xStart += tc.tmpVec2.x;
            yStart += tc.tmpVec2.y;
            tc.tmpVec2.normalize().multiplyScalar(cutLen[1] + cutLen[0]);
            xDir -= tc.tmpVec2.x;
            yDir -= tc.tmpVec2.y;
          }

          tc.tmpVec2.set(xDir, yDir);
          tc.tmpVec22.set(100, 0);
          var d = tc.tmpVec2.length();
          var partLen = option.w2space ? w * option.w2space : lerp(w, d / 2, clamp01(option.density));
          var partNum = Math.floor(d / partLen) - 1;
          var xDirPart = xDir / (partNum + 1);
          var yDirPart = yDir / (partNum + 1);
          var rotation = -tc.tmpVec2.signAngle(tc.tmpVec22) * 180 / Math.PI;
          linedot.dispose();

          for (var i = 0; i < partNum; i++) {
            var _linedot = tc.s(FUISys).createObject(ExploreCfg.maplinedotRes[0], ExploreCfg.maplinedotRes[1]);

            _linedot.setPosition(xStart + xDirPart * (i + 1) + random(0, 1 * offsetStrength), yStart + yDirPart * (i + 1) + random(0, 1 * offsetStrength));

            _linedot.rotation = rotation + random(-0.5, 0.5) * rotationStrength * 4;
            _linedot.alpha = 0.7;

            this._lines.addChild(_linedot);
          }
        };

        return MapWrap;
      }(UIWrap));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Maxhp.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "72f49cOsmlH7K3Z9yZjpjf0", "Maxhp", undefined);

      var Maxhp = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(Maxhp, _ABuffCom);

        function Maxhp() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = Maxhp.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.OnRenew, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage === BuffNS.EffectStage.OnRenew) {
            if (arg.modnum < 0) {
              // 保证 hp 不超过 maxhp
              this.owner.buff.mod(BuffId.hp, Math.min(this.owner.buff.numOf(BuffId.hp), this.buff.num), {
                write: true
              });
            }
          }
        };

        return Maxhp;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MeihuoAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './CardId.ts', './NpcPropFunc.ts', './PlayerFightCardCom.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, CardId, NpcPropFunc, PlayerFightCardCom, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      CardId = module.CardId;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a746a1qHOdOJ6uNChbVR90c", "MeihuoAct", undefined);

      var MeihuoAct = exports('MeihuoAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(MeihuoAct, _ActBase);

        function MeihuoAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = MeihuoAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.tactics,
            iconTip: '',
            title: "魅惑",
            content: "\u5C06" + this.num + "\u5F20\"\u9B45\u60D1\"\u653E\u5165\u73A9\u5BB6\u62BD\u5361\u7EC4\u3002"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.skill_act_over(function () {
            var num = _this.num;

            while (num--) {
              _this.target.c.get(PlayerFightCardCom).addCard2Draw(CardId.Meihuo);
            }
          }, onOver);
        };

        _createClass(MeihuoAct, [{
          key: "num",
          get: function get() {
            return parseInt(this.getProp(NpcPropFunc.meihuo).args[0]);
          }
        }]);

        return MeihuoAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MeihuoBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CardId.ts', './PlayerFightCardCom.ts', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, CardId, PlayerFightCardCom, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      CardId = module.CardId;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6999dDv2JhFkZ1B6oU/bOZj", "MeihuoBuffCom", undefined);

      var MeihuoBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(MeihuoBuffCom, _ABuffCom);

        function MeihuoBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = MeihuoBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.AnyHandCardUsed, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.AnyHandCardUsed) {
            var fcc = this.owner.c.get(PlayerFightCardCom); // 释放魅惑

            var count = this.buff.num;

            while (count--) {
              var card = fcc.hand.findFirstIf(function (c) {
                return c.info.id == CardId.Meihuo;
              });

              if (card) {
                card.useAsHandCard();
              }
            }
          }
        };

        return MeihuoBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MeihuoFeatureBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CardId.ts', './PlayerFightCardCom.ts', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, CardId, PlayerFightCardCom, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      CardId = module.CardId;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "dc064Qzwf1EZbJEw50uQ01B", "MeihuoFeatureBuff", undefined);

      var MeihuoFeatureBuff = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(MeihuoFeatureBuff, _ABuffCom);

        function MeihuoFeatureBuff() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = MeihuoFeatureBuff.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.Hit, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.Hit) {
            var _arg$hitSource$c$get, _arg$hitSource$c$get2;

            (_arg$hitSource$c$get = arg.hitSource.c.get(PlayerFightCardCom)) == null ? void 0 : _arg$hitSource$c$get.addCard2Draw(CardId.Meihuo);
            (_arg$hitSource$c$get2 = arg.hitSource.c.get(PlayerFightCardCom)) == null ? void 0 : _arg$hitSource$c$get2.addCard2Draw(CardId.Meihuo);
          }
        };

        return MeihuoFeatureBuff;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MeimoAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AttackAct.ts', './JianxiaoAct.ts', './NpcAIBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AttackAct, JianxiaoAct, NpcAIBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      JianxiaoAct = module.JianxiaoAct;
    }, function (module) {
      NpcAIBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a5908dkTDtDC4kk+K6+oRNN", "MeimoAI", undefined);

      var MeimoAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(MeimoAI, _NpcAIBase);

        function MeimoAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = MeimoAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          if (actNum % 3 == 0) {
            return new JianxiaoAct(this.npc);
          } else {
            return new AttackAct(this.npc);
          }
        };

        return MeimoAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MengjiAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './BuffId.ts', './NpcPropFunc.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, BuffId, NpcPropFunc, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d1192SVKYlA6JvbjBJ7e4ha", "MengjiAct", undefined);

      var MengjiAct = exports('MengjiAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(MengjiAct, _ActBase);

        function MengjiAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = MengjiAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          var _this$title;

          return {
            icon: IntensionCfg.res.attack_tactics,
            iconTip: '' + this.actualdmg,
            title: (_this$title = this.title) != null ? _this$title : "猛击",
            content: "\u8FD9\u540D\u654C\u4EBA\u5C06\u8981\u653B\u51FB\u9020\u6210" + this.actualdmg + "\u70B9\u4F24\u5BB3\uFF0C\u5E76\u65BD\u52A0\u6613\u4F24\u3002"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.attack_act_byatk_over(function () {
            _this.target.getHit(_this.actualdmg, _this.actor, 'MengjiAct');

            _this.target.buff.mod(BuffId.fragile, _this.fragile);
          }, onOver);
        };

        _createClass(MengjiAct, [{
          key: "actualdmg",
          get: function get() {
            return this.calcDmg(parseInt(this.getProp(NpcPropFunc.mengji).args[0]));
          }
        }, {
          key: "fragile",
          get: function get() {
            return parseInt(this.getProp(NpcPropFunc.mengji).args[1]);
          }
        }, {
          key: "title",
          get: function get() {
            return this.getProp(NpcPropFunc.mengji).args[2];
          }
        }]);

        return MengjiAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MengyanAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AnfuAct.ts', './JianxiaoAct.ts', './NpcAIBase.ts', './TouduAct.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AnfuAct, JianxiaoAct, NpcAIBase, TouduAct;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AnfuAct = module.AnfuAct;
    }, function (module) {
      JianxiaoAct = module.JianxiaoAct;
    }, function (module) {
      NpcAIBase = module.default;
    }, function (module) {
      TouduAct = module.TouduAct;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4e0c4TURUdMIoW8LXZPCCR5", "MengyanAI", undefined);

      var MengyanAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(MengyanAI, _NpcAIBase);

        function MengyanAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = MengyanAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          return new (this.loopAct(actNum, 3, AnfuAct, JianxiaoAct, TouduAct))(this.npc);
        };

        return MengyanAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MiaozhunAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './BuffId.ts', './NpcPropFunc.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, BuffId, NpcPropFunc, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f891eBTqcdPzK704VGCH4xb", "MiaozhunAct", undefined);

      var MiaozhunAct = exports('MiaozhunAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(MiaozhunAct, _ActBase);

        function MiaozhunAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = MiaozhunAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.tactics,
            iconTip: '',
            title: "瞄准",
            content: "\u8FD9\u540D\u654C\u4EBA\u5C06\u8981\u65BD\u52A0\u8D1F\u9762\u72B6\u6001\u3002"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.skill_act_byskill_over(function () {
            _this.target.buff.mod(BuffId.fragile, _this.fragile);
          }, onOver);
        };

        _createClass(MiaozhunAct, [{
          key: "fragile",
          get: function get() {
            return parseInt(this.getProp(NpcPropFunc.miaozhun).args[0]);
          }
        }]);

        return MiaozhunAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MiyaoZzBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "42163s+dShEtZiYOVRDpGz1", "MiyaoZzBuff", undefined);

      var MiyaoZzBuff = exports('MiyaoZzBuff', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(MiyaoZzBuff, _ATreasureBuffCom);

        function MiyaoZzBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = MiyaoZzBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.listenTo(BuffId.weak);
          this.setOrder(BuffNS.EffectStage.OnListenBuffMod, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.OnListenBuffMod) {
            if (arg.listenBuffId != BuffId.weak) return;

            if (arg.modnum > 0) {
              this.owner.buff.mod(BuffId.fragile, this.buff.num * arg.modnum);
              this.popWrap();
            }
          }
        };

        _createClass(MiyaoZzBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Miyao;
          }
        }]);

        return MiyaoZzBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MulAttackAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs', './IntensionCfg.ts', './NpcPropFunc.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, AsyncTask, IntensionCfg, NpcPropFunc, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AsyncTask = module.AsyncTask;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b2696pscK9KhKnjPpBYKpzG", "MulAttackAct", undefined);

      var MulAttackAct = exports('default', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(MulAttackAct, _ActBase);

        function MulAttackAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = MulAttackAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          var _this$title;

          return {
            icon: IntensionCfg.res.attack,
            iconTip: '' + this.actualdmg + 'x' + this.time,
            title: (_this$title = this.title) != null ? _this$title : "攻势",
            content: "\u8FD9\u540D\u654C\u4EBA\u5C06\u8981\u653B\u51FB" + this.time + "\u6B21\uFF0C\u6BCF\u6B21\u9020\u6210" + this.actualdmg + "\u70B9\u4F24\u5BB3"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          var task = new AsyncTask();

          for (var i = 0; i < this.time; i++) {
            task.Then(function (c) {
              _this.attack_act_byatk_over(function () {
                _this.target.getHit(_this.actualdmg, _this.actor, "MulAttackAct");
              }, c);
            });
          }

          task.Start(onOver);
        };

        _createClass(MulAttackAct, [{
          key: "actualdmg",
          get: function get() {
            return this.calcDmg(parseInt(this.getProp(NpcPropFunc.mulattack).args[0]));
          }
        }, {
          key: "time",
          get: function get() {
            return parseInt(this.getProp(NpcPropFunc.mulattack).args[1]);
          }
        }, {
          key: "title",
          get: function get() {
            return this.getProp(NpcPropFunc.mulattack).args[2];
          }
        }]);

        return MulAttackAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NengliangyjBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4ce65r8syxAbYE1iYdu3j58", "NengliangyjBuff", undefined);

      var NengliangyjBuff = exports('default', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(NengliangyjBuff, _ATreasureBuffCom);

        function NengliangyjBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = NengliangyjBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.HandCardIn, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HandCardIn) {
            if (this.actNum == 0) {
              this.owner.buff.mod(BuffId.Tizhi, this.buff.num);
              this.popWrap();
            }
          }
        };

        _createClass(NengliangyjBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Nengliangyj;
          }
        }]);

        return NengliangyjBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NormalEffecterCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AFightCardCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AFightCardCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AFightCardCom = module.AFightCardCom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "293d7cwVyVPNr4HtnDNTILo", "NormalEffecterCom", undefined);

      var NormalEffecterCom = exports('default', /*#__PURE__*/function (_AFightCardCom) {
        _inheritsLoose(NormalEffecterCom, _AFightCardCom);

        function NormalEffecterCom() {
          return _AFightCardCom.apply(this, arguments) || this;
        }

        var _proto = NormalEffecterCom.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnCast = function OnCast() {
          this.fightcard.fightCardHandler.castEffect();
        };

        return NormalEffecterCom;
      }(AFightCardCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NothingTreasureCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ATreasureCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ATreasureCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ATreasureCom = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e91740+ObNJiq09lcwdB8+j", "NothingTreasureCom", undefined);
      /**一个啥也不做的遗物组件 */


      var UselessTreasureCom = exports('default', /*#__PURE__*/function (_ATreasureCom) {
        _inheritsLoose(UselessTreasureCom, _ATreasureCom);

        function UselessTreasureCom() {
          return _ATreasureCom.apply(this, arguments) || this;
        }

        var _proto = UselessTreasureCom.prototype;

        _proto.OnInit = function OnInit() {
          console.warn("there is a treasure with " + "\"NothingTreasureCom\"");
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {};

        return UselessTreasureCom;
      }(ATreasureCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NpcAIBase.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BuffId.ts', './NpcPropFunc.ts', './XuanyunAct.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, BuffId, NpcPropFunc, XuanyunAct;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      XuanyunAct = module.XuanyunAct;
    }],
    execute: function () {
      cclegacy._RF.push({}, "93e6dvI8HBKuJ5txv4i4Zt1", "NpcAIBase", undefined);

      var NpcAIBase = exports('default', /*#__PURE__*/function () {
        function NpcAIBase() {
          this._actNum = void 0;
          this._getUrgentAct = void 0;
          this.npc = void 0;
          this._nextAct = void 0;
          this.onActChg = void 0;
        }

        var _proto = NpcAIBase.prototype;

        _proto.init = function init(npc) {
          var _this = this;

          this._actNum = 0;
          this.npc = npc;
          this._getUrgentAct = null;
          this.npc.info.npcInfo.getProps(NpcPropFunc.enterbuff).forEach(function (prop) {
            _this.npc.buff.mod(parseInt(prop.args[1]), parseInt(prop.args[0]));
          });
          this._nextAct = this.OnNewNextAct(this._actNum);
        };

        _proto.Dispose = function Dispose() {
          var _this$_nextAct;

          (_this$_nextAct = this._nextAct) == null ? void 0 : _this$_nextAct.Dispose();
          this._getUrgentAct = null;
          this._actNum = null;
          this.npc = null;
          this._nextAct = null;
          this.OnDispose();
        };

        _proto.doAct = function doAct(onActOver) {
          var _this2 = this;

          this._nextAct["do"](function () {
            _this2._actNum++;

            if (_this2._nextAct instanceof XuanyunAct) {
              _this2._actNum--;
            } else if (_this2._getUrgentAct) {
              // 有紧急行动，不增加行动次数
              _this2._getUrgentAct = null;
              _this2._actNum--;
            }

            _this2.refreshAct();

            onActOver == null ? void 0 : onActOver();
          });
        };

        _proto.refreshAct = function refreshAct() {
          var _this$_nextAct2;

          (_this$_nextAct2 = this._nextAct) == null ? void 0 : _this$_nextAct2.Dispose();

          if (this.npc.buff.isMorethan(BuffId.Xuanyun, 0)) {
            this._nextAct = new XuanyunAct(this.npc);
          } else {
            if (this._getUrgentAct) {
              this._nextAct = this._getUrgentAct();
            } else {
              this._nextAct = this.OnNewNextAct(this._actNum);
            }
          }

          this.onActChg();
        };

        _proto.addUrgentAct = function addUrgentAct(getAct) {
          this._getUrgentAct = getAct;
        };

        _proto.loopAct = function loopAct(num, looplen) {
          var no = num % looplen;
          return no + 2 < 2 || arguments.length <= no + 2 ? undefined : arguments[no + 2];
        }
        /**
         * <to-override>
         * 销毁时调用
         */
        ;

        _proto.OnDispose = function OnDispose() {}
        /**
         * 根据当前行动字数返回新的行动
         * @param actNum 行动次数，从0开始
         */
        ;

        _createClass(NpcAIBase, [{
          key: "nextAct",
          get: function get() {
            return this._nextAct;
          }
        }]);

        return NpcAIBase;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NpcAICom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './tc.ts', './ANpcCom.ts', './NpcPlay.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, _assertThisInitialized, cclegacy, EventTarget, IntensionCfg, tc, ANpcCom, NpcPlay;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      ANpcCom = module.default;
    }, function (module) {
      NpcPlay = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9f74dv9cmZGq6XnOch6r1Gd", "NpcAICom", undefined);

      var NpcAICom = exports('default', /*#__PURE__*/function (_ANpcCom) {
        _inheritsLoose(NpcAICom, _ANpcCom);

        function NpcAICom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ANpcCom.call.apply(_ANpcCom, [this].concat(args)) || this;
          _this._ai = void 0;
          _this._e = void 0;

          _this.OnEnterFight = function (fight) {
            _this._ai = tc.p(NpcPlay).getAI(_this.npc.info.npcInfo.id);

            _this._ai.init(_this.npc);

            _this._ai.onActChg = _this._onActionChg.bind(_assertThisInitialized(_this));
          };

          return _this;
        }

        var _proto = NpcAICom.prototype;

        _proto.OnInit = function OnInit() {
          this._e = new EventTarget();
        };

        _proto._onActionChg = function _onActionChg() {
          this._e.emit(NpcAICom.Events.ACT_CHG);
        };

        _proto.OnDestory = function OnDestory() {
          this._ai.Dispose();

          this._ai = null;
          this._e = null;
        };

        _proto.doAction = function doAction(onActOver) {
          this._ai.doAct(onActOver);
        };

        _proto.refreshAction = function refreshAction() {
          this._ai.refreshAct();
        };

        _proto.addUrgentAction = function addUrgentAction(getUrgent) {
          this._ai.addUrgentAct(getUrgent);
        };

        _proto.getIntension = function getIntension() {
          var ret = this._ai.nextAct.intension;
          ret.icon = tc.resUrl(ret.icon);
          return ret;
        };

        _proto.isAttackIntension = function isAttackIntension() {
          var intension = this._ai.nextAct.intension;
          return intension.icon == IntensionCfg.res.attack || intension.icon == IntensionCfg.res.attack_tactics;
        };

        _createClass(NpcAICom, [{
          key: "e",
          get: function get() {
            return this._e;
          }
        }]);

        return NpcAICom;
      }(ANpcCom));
      NpcAICom.Events = {
        ACT_CHG: "ACT_CHG"
      };

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NpcBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FreeList.ts', './Util.ts', './Buff.ts', './BuffId.ts', './BuffNS.ts', './Debuff.ts', './ANpcCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, EventTarget, FreeList, isNull, notNull, Buff, BuffId, BuffNS, Debuff, ANpcCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }, function (module) {
      FreeList = module.FreeList;
    }, function (module) {
      isNull = module.isNull;
      notNull = module.notNull;
    }, function (module) {
      Buff = module.Buff;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }, function (module) {
      Debuff = module.Debuff;
    }, function (module) {
      ANpcCom = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2ef57VNhndAWa5r5P+hOYDN", "NpcBuffCom", undefined);

      var NpcBuffCom = exports('default', /*#__PURE__*/function (_ANpcCom) {
        _inheritsLoose(NpcBuffCom, _ANpcCom);

        function NpcBuffCom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ANpcCom.call.apply(_ANpcCom, [this].concat(args)) || this;
          _this._buffList = void 0;
          _this._e = void 0;
          _this._beforebaseComs = void 0;
          _this._baseComs = void 0;
          _this._latebaseComs = void 0;
          _this._lastComs = void 0;
          _this._listenList = void 0;

          _this.OnLateInit = function () {
            var info = _this.npc.info.npcInfo;

            _this.mod(BuffId.hp, info.baseHp, {
              write: true
            });

            _this.mod(BuffId.maxhp, info.baseHp, {
              write: true
            });
          };

          _this.OnEnterFight = function (fight) {
            var f = _this.npc;

            if (f.info.isPlayer) {
              f.buff.mod(BuffId.enegy, f.buff.numOf(BuffId.maxenegy), {
                write: true
              });
            }
          };

          _this.OnLeaveFight = function (fight) {
            _this.effect(BuffNS.EffectStage.LeaveFight, {
              log: "NpcBuffCom-LeaveFight"
            });
          };

          return _this;
        }

        var _proto = NpcBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this._buffList = new FreeList();
          this._e = new EventTarget();
          this._beforebaseComs = [];
          this._baseComs = [];
          this._latebaseComs = [];
          this._lastComs = [];
          this._listenList = [];
        };

        _proto.OnDestory = function OnDestory() {
          this._buffList.foreach_safe(function (b) {
            Buff.free(b);
            return true;
          });

          this._buffList = null;
          this._e = null;
          this._beforebaseComs = null;
          this._baseComs = null;
          this._latebaseComs = null;
          this._lastComs = null;
          this._listenList = null;
        };

        _proto.get = function get(buffId) {
          return this._buffList.findFirstIf(function (b) {
            return b.id == buffId;
          });
        };

        _proto.numOf = function numOf(buffId) {
          var _this$get$num, _this$get;

          return (_this$get$num = (_this$get = this.get(buffId)) == null ? void 0 : _this$get.num) != null ? _this$get$num : 0;
        };

        _proto.rm = function rm(buffId) {
          this._internal_rm(buffId, 'rm', true);
        };

        _proto.rmDebuff = function rmDebuff(log) {
          var _this2 = this;

          this._buffList.foreach_safe(function (b) {
            if (b.hasCom(Debuff)) {
              _this2._internal_rm(b, log, true);
            }

            return true;
          });
        };

        _proto.listenTo = function listenTo(BuffId) {
          var _this$_listenList$Buf;

          this._listenList[BuffId] = (_this$_listenList$Buf = this._listenList[BuffId]) != null ? _this$_listenList$Buf : 0;
          this._listenList[BuffId]++;
        };

        _proto.unlistenTo = function unlistenTo(BuffId) {
          if (isNull(this._listenList[BuffId]) || this._listenList[BuffId] < 1) throw "unlistenTo error";
          this._listenList[BuffId]--;

          if (this._listenList[BuffId] == 0) {
            delete this._listenList[BuffId];
          }
        };

        _proto.smartMod = function smartMod(buffid, num, option) {
          if (option != null && option.write) {
            return this.mod(buffid, num, option);
          }

          if (buffid == BuffId.hp) {
            if (num > 0) {
              this.npc.recoverHp(num, option.log);
            } else {
              console.error("should not use smartMod to cut hp");
            }
          } else {
            this.mod(buffid, num, option);
          }
        };

        _proto.mod = function mod(buffId, num, option) {
          var _option$log;

          if (num == 0) return;
          var existBuff = this.get(buffId);
          var log = (_option$log = option == null ? void 0 : option.log) != null ? _option$log : 'mod';

          if (!existBuff) {
            existBuff = Buff.alloc(buffId, num, this.npc);

            this._buffList.push(existBuff);

            existBuff.singleEffect(BuffNS.EffectStage.OnAdd, {
              log: log
            });
          } else {
            existBuff.modNum(num, option);
            existBuff.singleEffect(BuffNS.EffectStage.OnRenew, {
              log: log,
              modnum: num
            });
          }

          if (notNull(this._listenList[existBuff.id])) {
            this.effect(BuffNS.EffectStage.OnListenBuffMod, {
              listenBuffId: existBuff.id,
              modnum: num,
              log: log
            });
          } // console.log(existBuff.info.name, existBuff.id, existBuff.num);


          if (existBuff.num < 1 && existBuff.isClearOnNumZero && !existBuff.isSignNum) {
            this._internal_rm(existBuff, log, true);
          } else {
            this._e.emit(NpcBuffCom.Events.BUFF_CHG, buffId, existBuff.num);
          }
        };

        _proto._internal_rm = function _internal_rm(buff, log, dispatchBuffChgEvt) {
          if (typeof buff == 'number') {
            buff = this.get(buff);
          }

          if (buff) {
            buff.singleEffect(BuffNS.EffectStage.OnRemove, {
              log: log
            });

            this._buffList.remove(buff);

            Buff.free(buff);
            dispatchBuffChgEvt && this._e.emit(NpcBuffCom.Events.BUFF_CHG, buff.id, 0);
          }
        };

        _proto.isMorethan = function isMorethan(buffId, num) {
          var existBuff = this.get(buffId);
          return existBuff && existBuff.num > num;
        };

        _proto.effect = function effect(stage, arg) {
          var _this3 = this;

          this._buffList.foreach_safe(function (b) {
            b.preEffect(stage, arg, _this3._beforebaseComs, _this3._baseComs, _this3._latebaseComs, _this3._lastComs);
            return true;
          });

          this._beforebaseComs.forEach(function (b) {
            return b.effect(stage, arg);
          });

          this._baseComs.forEach(function (b) {
            return b.effect(stage, arg);
          });

          this._latebaseComs.forEach(function (b) {
            return b.effect(stage, arg);
          });

          this._lastComs.forEach(function (b) {
            return b.effect(stage, arg);
          });

          this._beforebaseComs.length = 0;
          this._baseComs.length = 0;
          this._latebaseComs.length = 0;
          this._lastComs.length = 0;
        };

        _proto.each = function each(walk) {
          this._buffList.foreach(walk);
        };

        _proto.map = function map(callbackfn) {
          return this._buffList.map(callbackfn);
        };

        _createClass(NpcBuffCom, [{
          key: "e",
          get: function get() {
            return this._e;
          }
        }]);

        return NpcBuffCom;
      }(ANpcCom));
      NpcBuffCom.Events = {
        BUFF_CHG: "BUFF_CHG"
      };

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NpcFighter.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ComModule.ts', './BuffId.ts', './BuffNS.ts', './NpcAICom.ts', './NpcBuffCom.ts', './NpcInfoCom.ts', './NpcUtilCom.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, ComModule, BuffId, BuffNS, NpcAICom, NpcBuffCom, NpcInfoCom, NpcUtilCom;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ComModule = module.ComModule;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }, function (module) {
      NpcAICom = module.default;
    }, function (module) {
      NpcBuffCom = module.default;
    }, function (module) {
      NpcInfoCom = module.default;
    }, function (module) {
      NpcUtilCom = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7c8baUt4LND1IF10Wi/wt4B", "NpcFighter", undefined);

      var NpcFighter = exports('NpcFighter', /*#__PURE__*/function () {
        function NpcFighter(npcId) {
          var _this = this;

          this._c = void 0;
          this._id = void 0;
          this._lastFight = void 0;
          this._id = npcId;
          this._c = new ComModule();

          this._c.add(NpcUtilCom);

          this._c.add(NpcInfoCom);

          this._c.add(NpcAICom);

          this._c.add(NpcBuffCom);

          this.c.each(function (com) {
            return com.init(_this);
          });
          this.c.each(function (com) {
            return com.lateinit();
          });
        }

        var _proto = NpcFighter.prototype;

        _proto.enterFight = function enterFight(fight) {
          if (this._lastFight) throw "npc already on fight";

          this._util.enterFight();

          this._lastFight = fight;
          this.c.each(function (com) {
            return com.onEnterFight(fight);
          });
        };

        _proto.leaveFight = function leaveFight(fight) {
          if (fight !== this._lastFight) throw "npc is not on this fight.";
          this.c.each(function (com) {
            return com.onLeaveFight(fight);
          });
          this.c.each(function (com) {
            return com.onLateLeaveFight(fight);
          });
          this._lastFight = null;

          this._util.leaveFight();
        };

        _proto.onRoundStart = function onRoundStart() {
          this._util.onRoundStart();

          this.buff.effect(BuffNS.EffectStage.RoundStart, {
            log: "Npc-RoundStart"
          });
        };

        _proto.getHit = function getHit(dmg, source, log) {
          this._c.get(NpcUtilCom).getHit(dmg, source, log);
        };

        _proto.cutHp = function cutHp(dmg, source, log) {
          this._c.get(NpcUtilCom).cutHp(dmg, source, log);
        };

        _proto.recoverHp = function recoverHp(add, log) {
          this._c.get(NpcUtilCom).recoverHp(add, log);
        };

        _proto.dead = function dead() {
          this.c.each(function (com) {
            return com.ondead();
          });
        };

        _proto.Dispose = function Dispose() {
          this.c.each(function (c) {
            return c.destory();
          });
          this._c = null;
        };

        _createClass(NpcFighter, [{
          key: "_util",
          get: function get() {
            return this._c.get(NpcUtilCom);
          }
        }, {
          key: "c",
          get: function get() {
            return this._c;
          }
        }, {
          key: "id",
          get: function get() {
            return this._id;
          }
        }, {
          key: "actNum",
          get: function get() {
            return this._util.actNum;
          }
        }, {
          key: "info",
          get: function get() {
            return this._c.get(NpcInfoCom);
          }
        }, {
          key: "buff",
          get: function get() {
            return this._c.get(NpcBuffCom);
          }
          /** Hp 小于 1 */

        }, {
          key: "isDead",
          get: function get() {
            return !this.buff.isMorethan(BuffId.hp, 0);
          }
        }, {
          key: "isTrueDead",
          get: function get() {
            return this.info.isDead;
          }
        }]);

        return NpcFighter;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NpcFighterWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui-ccc370.mjs', './GMDlg.ts', './HoverTipDlg.ts', './BoneAnim.ts', './UIWrap.ts', './BuffId.ts', './CardPlay.ts', './NpcAICom.ts', './NpcBuffCom.ts', './NpcInfoCom.ts', './tc.ts', './BuffIconListWrap.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, Color, tween, Event, NpcGMDlg, HoverTipDlg, BoneAnim, UIWrap, BuffId, CardPlay, NpcAICom, NpcBuffCom, NpcInfoCom, tc, BuffIconListWrap;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
      tween = module.tween;
    }, function (module) {
      Event = module.Event;
    }, function (module) {
      NpcGMDlg = module.NpcGMDlg;
    }, function (module) {
      HoverTipDlg = module.default;
    }, function (module) {
      BoneAnim = module.BoneAnim;
    }, function (module) {
      UIWrap = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      NpcAICom = module.default;
    }, function (module) {
      NpcBuffCom = module.default;
    }, function (module) {
      NpcInfoCom = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      BuffIconListWrap = module.BuffIconListWrap;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ac62dfjrmRDgZ4F/uoG9o/U", "NpcFighterWrap", undefined);

      var NpcFighterWrap = exports('NpcFighterWrap', /*#__PURE__*/function (_UIWrap) {
        _inheritsLoose(NpcFighterWrap, _UIWrap);

        function NpcFighterWrap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIWrap.call.apply(_UIWrap, [this].concat(args)) || this;
          _this._modelLod = void 0;
          _this._oriModelLodPosX = void 0;
          _this._oriModelLodPosY = void 0;
          _this._modelAnim = void 0;
          _this._intension = void 0;
          _this._hp = void 0;
          _this._fighter = void 0;
          _this._cardPlay = void 0;
          _this._buffIconList = void 0;
          return _this;
        }

        var _proto = NpcFighterWrap.prototype;

        _proto.OnInit = function OnInit() {
          this._modelLod = this.getLoader3D("model");
          this._intension = this.getBtn("intension");
          this._hp = this.getCom("hp").as();
          this._buffIconList = this.wrap(BuffIconListWrap, "bufficons");
          this._modelAnim = new BoneAnim(this._modelLod, this);
          this._cardPlay = tc.p(CardPlay);
          this._intension.visible = true;
          this._oriModelLodPosX = this._modelLod.x;
          this._oriModelLodPosY = this._modelLod.y;

          this._intension.on(Event.ROLL_OVER, this._onRollOverIntension, this);

          this._intension.on(Event.ROLL_OUT, HoverTipDlg.hide, HoverTipDlg);

          this.fgc.on(Event.ROLL_OVER, this._onRollOver, this);
          this.fgc.on(Event.ROLL_OUT, this._onRollOut, this);
          {
            this.getChild('gm').visible = true;
            this.addBtnEvt("gm", this._onGM);
          }
        };

        _proto.OnClose = function OnClose() {
          this._unbindEvents();
        };

        _proto.setFighter = function setFighter(f) {
          var _this2 = this;

          this._unbindEvents();

          var enemys = f.info.getEnemys();
          var fBuff = f.c.get(NpcBuffCom);
          var fAI = f.c.get(NpcAICom);
          var fInfo = f.c.get(NpcInfoCom);
          var _f$info$npcInfo = f.info.npcInfo,
              model = _f$info$npcInfo.model,
              modelScale = _f$info$npcInfo.modelScale,
              modelOffset = _f$info$npcInfo.modelOffset;
          this._fighter = f;
          f.info.setFighterWrap(this);
          this.getChild('gm').text = f.info.npcInfo.name + "[GM]";

          this._modelAnim.config({
            vAlign: "b",
            align: "c",
            idleAnim: "idle",
            model: model
          });

          this._modelLod.setPosition(this._oriModelLodPosX + modelOffset[0], this._oriModelLodPosY + modelOffset[1]);

          this._modelLod.setScale(modelScale[0], modelScale[1]);

          this._modelLod.setSize(f.info.npcInfo.touchBody[0], f.info.npcInfo.touchBody[1]);

          this._hp.width = f.info.npcInfo.hpWidth;
          this._hp.value = fBuff.numOf(BuffId.hp);
          this._hp.max = fBuff.numOf(BuffId.maxhp);

          this._refreshIntension();

          this._buffIconList.setFighter(f);

          enemys.forEach(function (enemy) {
            enemy.buff.e.on(NpcBuffCom.Events.BUFF_CHG, _this2._onEnemyBuffChange, _this2);
          });
          fInfo.e.on(NpcInfoCom.Events.TRUE_DEAD, this._OnTrueDead, this);
          fBuff.e.on(NpcBuffCom.Events.BUFF_CHG, this._onBuffChg, this);
          fAI.e.on(NpcAICom.Events.ACT_CHG, this._refreshIntension, this);
        };

        _proto._unbindEvents = function _unbindEvents() {
          var _this3 = this;

          if (this._fighter) {
            var f = this._fighter;
            var enemys = f.info.getEnemys();
            enemys.forEach(function (enemy) {
              enemy.buff.e.off(NpcBuffCom.Events.BUFF_CHG, _this3._onEnemyBuffChange, _this3);
            });
            f.c.get(NpcInfoCom).e.off(NpcInfoCom.Events.TRUE_DEAD, this._OnTrueDead, this);
            f.c.get(NpcBuffCom).e.off(NpcBuffCom.Events.BUFF_CHG, this._onBuffChg, this);
            f.c.get(NpcAICom).e.off(NpcAICom.Events.ACT_CHG, this._refreshIntension, this);
            this._fighter = null;
          }
        };

        _proto._onRollOut = function _onRollOut() {
          if (this._cardPlay.isChoosing) {
            this._cardPlay.choosingTarget = null;
          }

          this._modelLod.color = Color.WHITE;
        };

        _proto._onRollOver = function _onRollOver() {
          if (this._fighter.isDead) return;

          if (this._cardPlay.isChoosing) {
            this._cardPlay.choosingTarget = this._fighter;
            this._modelLod.color = new Color(150, 150, 150, 255);
          }
        };

        _proto._onRollOverIntension = function _onRollOverIntension() {
          var intension = this._fighter.c.get(NpcAICom).getIntension();

          HoverTipDlg.show(intension.title, intension.content);
        };

        _proto._onGM = function _onGM(enableBtn) {
          console.log("logstart");

          this._fighter.buff.each(function (b) {
            console.log(b.info.name, b.num);
            return true;
          });

          NpcGMDlg.pop(this._fighter);
          console.log("logend");
          enableBtn();
        };

        _proto._onEnemyBuffChange = function _onEnemyBuffChange(buffId) {
          if (buffId == BuffId.fragile) {
            this._refreshIntension();
          }
        };

        _proto._refreshIntension = function _refreshIntension() {
          var intension = this._fighter.c.get(NpcAICom).getIntension();

          this._intension.icon = intension.icon;
          this._intension.title = intension.iconTip;
        };

        _proto._onBuffChg = function _onBuffChg(buffId) {
          if (buffId == BuffId.weak || buffId == BuffId.Kongju || buffId == BuffId.power) {
            this._refreshIntension();
          }

          if (buffId == BuffId.hp || buffId == BuffId.maxhp) {
            var fBuff = this._fighter.c.get(NpcBuffCom);

            var hp = fBuff.numOf(BuffId.hp);
            this._hp.value = hp;
            this._hp.max = fBuff.numOf(BuffId.maxhp);
          }
        };

        _proto._OnTrueDead = function _OnTrueDead() {
          var _this4 = this;

          this.playDead(function () {
            _this4.hide();
          });
        };

        _proto.onRoundStart = function onRoundStart(onActOver) {
          this._fighter.c.get(NpcAICom).doAction(onActOver);
        };

        _proto.playAttack = function playAttack(onHit) {
          // this._modelAnim.playAnim("attack", false)
          // this.addDelay(0.3, onHit);
          tween(this._modelAnim.lod3d).by(0.2, {
            x: -40
          }).delay(0.04).call(onHit).by(0.05, {
            x: 40
          }).start();
        };

        _proto.playSkill = function playSkill(onSkill) {
          tween(this._modelAnim.lod3d).by(0.2, {
            y: -40
          }).by(0.2, {
            y: 40
          }).by(0.2, {
            y: -40
          }).delay(0.04).call(onSkill).by(0.2, {
            y: 40
          }).start();
        };

        _proto.playByskill = function playByskill(onEnd) {
          var oriScaleX = this._modelAnim.lod3d.scaleX;
          var oriScaleY = this._modelAnim.lod3d.scaleY;
          tween(this._modelAnim.lod3d).by(0.2, {
            scaleX: -oriScaleX * 0.3,
            scaleY: oriScaleY * 0.3
          }).delay(0.04).call(onEnd).by(0.1, {
            scaleX: oriScaleX * 0.3,
            scaleY: -oriScaleY * 0.3
          }).start();
        };

        _proto.playByatk = function playByatk(onEnd) {
          // this._modelAnim.playAnim("byatk", false, onEnd)
          // this.fgc.getTransition("shake").play(onEnd)
          var oriScaleX = this._modelAnim.lod3d.scaleX;
          var oriScaleY = this._modelAnim.lod3d.scaleY;
          tween(this._modelAnim.lod3d).by(0.1, {
            scaleX: -oriScaleX * 0.3,
            scaleY: -oriScaleY * 0.3
          }).delay(0.02).by(0.1, {
            scaleX: oriScaleX * 0.2,
            scaleY: oriScaleY * 0.2
          }).delay(0.02).by(0.1, {
            scaleX: -oriScaleX * 0.2,
            scaleY: -oriScaleY * 0.2
          }).call(onEnd).delay(0.02).by(0.05, {
            scaleX: oriScaleX * 0.3,
            scaleY: oriScaleY * 0.3
          }).start();
        };

        _proto.playDead = function playDead(onEnd) {
          this._modelAnim.playAnim("die", false, onEnd, null, {
            autoIdle: false
          }); // this.fgc.getTransition("dead").play(onEnd)

        };

        _proto.playRevive = function playRevive(onRevive) {
          var oriScaleX = this._modelAnim.lod3d.scaleX;
          var oriScaleY = this._modelAnim.lod3d.scaleY;
          tween(this._modelAnim.lod3d).by(0.1, {
            scaleX: -oriScaleX * 0.2,
            scaleY: -oriScaleY * 0.2
          }).delay(0.02).by(0.1, {
            scaleX: oriScaleX * 0.1,
            scaleY: oriScaleY * 0.1
          }).delay(0.02).by(0.1, {
            scaleX: -oriScaleX * 0.2,
            scaleY: -oriScaleY * 0.2
          }).call(onRevive).delay(0.02).by(0.05, {
            scaleX: oriScaleX * 0.3,
            scaleY: oriScaleY * 0.3
          }).start();
        };

        _proto.playFakeDead = function playFakeDead() {
          var oriScaleX = this._modelAnim.lod3d.scaleX;
          var oriScaleY = this._modelAnim.lod3d.scaleY;
          tween(this._modelAnim.lod3d).by(0.1, {
            scaleX: -oriScaleX * 0.1,
            scaleY: -oriScaleY * 0.1
          }).delay(0.02).by(0.1, {
            scaleX: oriScaleX * 0.1,
            scaleY: oriScaleY * 0.1
          }).delay(0.02).by(0.1, {
            scaleX: -oriScaleX * 0.1,
            scaleY: -oriScaleY * 0.1
          }).delay(0.02).by(0.05, {
            scaleX: oriScaleX * 0.1,
            scaleY: oriScaleY * 0.1
          }).start();
        };

        return NpcFighterWrap;
      }(UIWrap));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NpcId.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('NpcId', void 0);

      cclegacy._RF.push({}, "78945L0UgdKJpPyIOEST9Cc", "NpcId", undefined);

      var NpcId; // #endregion

      (function (NpcId) {
        NpcId[NpcId["C1"] = 0] = "C1";
        NpcId[NpcId["C2"] = 1] = "C2";
        NpcId[NpcId["C3"] = 2] = "C3";
        NpcId[NpcId["C4"] = 3] = "C4";
        NpcId[NpcId["Elang"] = 100] = "Elang";
        NpcId[NpcId["Shirenh"] = 101] = "Shirenh";
        NpcId[NpcId["Juxiong"] = 102] = "Juxiong";
        NpcId[NpcId["Bainfu"] = 103] = "Bainfu";
        NpcId[NpcId["Gebul"] = 104] = "Gebul";
        NpcId[NpcId["Yezhu"] = 105] = "Yezhu";
        NpcId[NpcId["Shilaim"] = 106] = "Shilaim";
        NpcId[NpcId["Zhizhu"] = 107] = "Zhizhu";
        NpcId[NpcId["Mantuol"] = 108] = "Mantuol";
        NpcId[NpcId["Kuloub"] = 200] = "Kuloub";
        NpcId[NpcId["Kuloudb"] = 201] = "Kuloudb";
        NpcId[NpcId["Kulougjs"] = 202] = "Kulougjs";
        NpcId[NpcId["Zibaogbl"] = 203] = "Zibaogbl";
        NpcId[NpcId["Gebulgs"] = 204] = "Gebulgs";
        NpcId[NpcId["Youlingzl"] = 205] = "Youlingzl";
        NpcId[NpcId["Yemobf"] = 206] = "Yemobf";
        NpcId[NpcId["Kuloujj"] = 209] = "Kuloujj";
        NpcId[NpcId["Shishig"] = 300] = "Shishig";
        NpcId[NpcId["Meimo"] = 301] = "Meimo";
        NpcId[NpcId["Huanmo"] = 302] = "Huanmo";
        NpcId[NpcId["Emo"] = 303] = "Emo";
        NpcId[NpcId["Youling"] = 304] = "Youling";
        NpcId[NpcId["Shiwei"] = 305] = "Shiwei";
        NpcId[NpcId["Shinv"] = 306] = "Shinv";
        NpcId[NpcId["Guanjia"] = 307] = "Guanjia";
        NpcId[NpcId["Mengyan"] = 308] = "Mengyan";
        NpcId[NpcId["Langwang"] = 400] = "Langwang";
        NpcId[NpcId["Qishi"] = 403] = "Qishi";
        NpcId[NpcId["Siwanggsz"] = 404] = "Siwanggsz";
      })(NpcId || (NpcId = exports('NpcId', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NpcInfoCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './Player.ts', './ANpcCom.ts', './NpcPlay.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, EventTarget, tc, Player, ANpcCom, NpcPlay;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      Player = module.default;
    }, function (module) {
      ANpcCom = module.default;
    }, function (module) {
      NpcPlay = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "95154OEypdIIaVEpANPJvls", "NpcInfoCom", undefined);

      var NpcInfoCom = exports('default', /*#__PURE__*/function (_ANpcCom) {
        _inheritsLoose(NpcInfoCom, _ANpcCom);

        function NpcInfoCom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ANpcCom.call.apply(_ANpcCom, [this].concat(args)) || this;
          _this._fight = void 0;
          _this._fighterWrap = void 0;
          _this._isDead = void 0;
          _this._e = void 0;

          _this.OnEnterFight = function (fight) {
            _this._fight = fight;
          };

          _this.OnLateLeaveFight = function (fight) {
            _this._fight = null;
            _this._fighterWrap = null;
          };

          _this.OnDead = function () {
            _this._isDead = true;

            _this._e.emit(NpcInfoCom.Events.TRUE_DEAD);
          };

          return _this;
        }

        var _proto = NpcInfoCom.prototype;

        _proto.OnInit = function OnInit() {
          this._e = new EventTarget();
          this._isDead = false;
        };

        _proto.OnDestory = function OnDestory() {
          this._e = null;
          this._fight = null;
          this._fighterWrap = null;
        };

        _proto.getEnemys = function getEnemys() {
          if (!this._fight) throw "fight is null";

          if (this.isPlayer) {
            return this._fight.enemys;
          } else {
            return this._fight.our;
          }
        };

        _proto.getTeammates = function getTeammates() {
          if (!this._fight) throw "fight is null";

          if (this.isPlayer) {
            return this._fight.our;
          } else {
            return this._fight.enemys;
          }
        };

        _proto.getLiveTeammates = function getLiveTeammates() {
          if (!this._fight) throw "fight is null";

          if (this.isPlayer) {
            return this._fight.our.filter(function (e) {
              return !e.isTrueDead;
            });
          } else {
            return this._fight.enemys.filter(function (e) {
              return !e.isTrueDead;
            });
          }
        };

        _proto.getLiveEnemys = function getLiveEnemys() {
          if (!this._fight) throw "fight is null";

          if (this.isPlayer) {
            return this._fight.liveEnemys;
          } else {
            return this._fight.our;
          }
        };

        _proto.setFighterWrap = function setFighterWrap(v) {
          this._fighterWrap = v;
        };

        _createClass(NpcInfoCom, [{
          key: "npcInfo",
          get: function get() {
            return tc.p(NpcPlay).infoOf(this.npc.id);
          }
        }, {
          key: "openingTreasureId",
          get: function get() {
            return parseInt(this.npcInfo.getVal('openTreasure'));
          }
        }, {
          key: "fight",
          get: function get() {
            return this._fight;
          }
        }, {
          key: "isPlayer",
          get: function get() {
            return this.npc instanceof Player;
          }
        }, {
          key: "fighterWrap",
          get: function get() {
            return this._fighterWrap;
          }
        }, {
          key: "isDead",
          get: function get() {
            return this._isDead;
          }
        }, {
          key: "e",
          get: function get() {
            return this._e;
          }
        }]);

        return NpcInfoCom;
      }(ANpcCom));
      NpcInfoCom.Events = {
        TRUE_DEAD: "TRUE_DEAD"
      };

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NpcItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './NpcPropFunc.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, NpcPropFunc;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ea09bJ79QFIu7gcIBkw3O3M", "NpcItem", undefined);

      var NpcItem = exports('default', /*#__PURE__*/function () {
        function NpcItem(_data) {
          var _this = this;

          this._props = void 0;
          this._propValDict = void 0;
          this._data = _data;
          this._props = [];
          this._propValDict = {};

          if (this.prop) {
            var raws = this.prop.match(/(?<=\【)(.+?)(?=\】)/g);

            if (raws) {
              raws.forEach(function (raw) {
                var _raw$split = raw.split("("),
                    func = _raw$split[0],
                    rawArgs = _raw$split[1];

                var args = rawArgs.replace(')', '').split(',');
                raw = "\u3010" + raw + "\u3011";

                _this._props.push({
                  func: func,
                  args: args,
                  raw: raw
                });

                if (func == NpcPropFunc.val) {
                  _this._propValDict[args[0]] = args[1];
                }
              });
            }
          }
        }

        var _proto = NpcItem.prototype;

        _proto.getProps = function getProps(func) {
          return this._props.filter(function (p) {
            return p.func === func;
          });
        };

        _proto.getVal = function getVal(key) {
          return this._propValDict[key];
        };

        _proto.getIntVal = function getIntVal(key) {
          return parseInt(this._propValDict[key]);
        };

        _createClass(NpcItem, [{
          key: "id",
          get: function get() {
            return this._data.id;
          }
        }, {
          key: "name",
          get: function get() {
            return this._data.name;
          }
        }, {
          key: "model",
          get: function get() {
            return this._data.model;
          }
        }, {
          key: "coin",
          get: function get() {
            return this._data.coin;
          }
        }, {
          key: "diamond",
          get: function get() {
            return this._data.diamond;
          }
        }, {
          key: "modelScale",
          get: function get() {
            return this._data.modelScale;
          }
        }, {
          key: "modelOffset",
          get: function get() {
            return this._data.modelOffset;
          }
        }, {
          key: "hpWidth",
          get: function get() {
            return this._data.hpWidth;
          }
        }, {
          key: "touchBody",
          get: function get() {
            return this._data.touchBody;
          }
        }, {
          key: "baseHp",
          get: function get() {
            return this._data.baseHp;
          }
        }, {
          key: "prop",
          get: function get() {
            return this._data.prop;
          }
        }, {
          key: "props",
          get: function get() {
            return this._props;
          }
        }]);

        return NpcItem;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NpcPlay.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs', './Xls.ts', './ElangAI.ts', './ShirenhAI.ts', './JuxiongAI.ts', './NpcId.ts', './NpcItem.ts', './BianfuAI.ts', './KuloubAI.ts', './KuloudbAI.ts', './KulougjsAI.ts', './YoulingAI.ts', './ShishigAI.ts', './MeimoAI.ts', './HuanmoAI.ts', './EmoAI.ts', './LangwangAI.ts', './GebulAI.ts', './YezhuAI.ts', './ShilaimAI.ts', './ZhizhuAI.ts', './ZibaogblAI.ts', './GebulgsAI.ts', './YoulingzlAI.ts', './YemobfAI.ts', './MantuolAI.ts', './KuloujjAI.ts', './ShiweiAI.ts', './ShinvAI.ts', './GuanjiaAI.ts', './MengyanAI.ts', './QishiAI.ts', './SiwanggszAI.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PlayBase, Xls, ElangAI, ShirenhAI, JuxiongAI, NpcId, NpcItem, BianfuAI, KuloubAI, KuloudbAI, KulougjsAI, YoulingAI, ShishigAI, MeimoAI, HuanmoAI, EmoAI, LangwangAI, GebulAI, YezhuAI, ShilaimAI, ZhizhuAI, ZibaogblAI, GebulgsAI, YoulingzlAI, YemobfAI, MantuolAI, KuloujjAI, ShiweiAI, ShinvAI, GuanjiaAI, MengyanAI, QishiAI, SiwanggszAI;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlayBase = module.PlayBase;
    }, function (module) {
      Xls = module.default;
    }, function (module) {
      ElangAI = module.default;
    }, function (module) {
      ShirenhAI = module.default;
    }, function (module) {
      JuxiongAI = module.default;
    }, function (module) {
      NpcId = module.NpcId;
    }, function (module) {
      NpcItem = module.default;
    }, function (module) {
      BianfuAI = module.default;
    }, function (module) {
      KuloubAI = module.default;
    }, function (module) {
      KuloudbAI = module.default;
    }, function (module) {
      KulougjsAI = module.default;
    }, function (module) {
      YoulingAI = module.default;
    }, function (module) {
      ShishigAI = module.default;
    }, function (module) {
      MeimoAI = module.default;
    }, function (module) {
      HuanmoAI = module.default;
    }, function (module) {
      EmoAI = module.default;
    }, function (module) {
      LangwangAI = module.default;
    }, function (module) {
      GebulAI = module.default;
    }, function (module) {
      YezhuAI = module.default;
    }, function (module) {
      ShilaimAI = module.default;
    }, function (module) {
      ZhizhuAI = module.default;
    }, function (module) {
      ZibaogblAI = module.default;
    }, function (module) {
      GebulgsAI = module.default;
    }, function (module) {
      YoulingzlAI = module.default;
    }, function (module) {
      YemobfAI = module.default;
    }, function (module) {
      MantuolAI = module.MantuolAI;
    }, function (module) {
      KuloujjAI = module.default;
    }, function (module) {
      ShiweiAI = module.default;
    }, function (module) {
      ShinvAI = module.default;
    }, function (module) {
      GuanjiaAI = module.default;
    }, function (module) {
      MengyanAI = module.default;
    }, function (module) {
      QishiAI = module.default;
    }, function (module) {
      SiwanggszAI = module.default;
    }],
    execute: function () {
      var _NpcPlay$_npcaiDict;

      cclegacy._RF.push({}, "a5b011ZtM5CW5rhe1jor2Ce", "NpcPlay", undefined);

      var NpcPlay = exports('default', /*#__PURE__*/function (_PlayBase) {
        _inheritsLoose(NpcPlay, _PlayBase);

        function NpcPlay() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _PlayBase.call.apply(_PlayBase, [this].concat(args)) || this;
          _this._npcItemCache = void 0;
          _this.playName = "NpcPlay";
          return _this;
        }

        var _proto = NpcPlay.prototype;

        _proto.OnInit = function OnInit(complete) {
          this._npcItemCache = new Map();
          complete();
        };

        _proto.OnLateInit = function OnLateInit(complete) {
          complete();
        };

        _proto.OnDispose = function OnDispose() {
          this._npcItemCache = null;
        };

        _proto.infoOf = function infoOf(id) {
          if (!this._npcItemCache) {
            this._npcItemCache = new Map();
          }

          if (!this._npcItemCache.has(id)) {
            this._npcItemCache.set(id, new NpcItem(Xls.npcDatasById[id]));
          }

          return this._npcItemCache.get(id);
        };

        _proto.getAI = function getAI(npcId) {
          if (NpcPlay._npcaiDict[npcId]) {
            return new NpcPlay._npcaiDict[npcId]();
          }

          console.error("No AI for " + npcId);
          return new ElangAI();
        };

        _proto.diamondOf = function diamondOf(npcs) {
          var _this2 = this;

          var diamond = 0;
          npcs.forEach(function (npcId) {
            diamond += _this2.infoOf(npcId).diamond;
          });
          return diamond;
        };

        _proto.coinOf = function coinOf(npcId) {
          var _this3 = this;

          var coin = 0;
          npcId.forEach(function (npcId) {
            coin += _this3.infoOf(npcId).coin;
          });
          return coin;
        };

        return NpcPlay;
      }(PlayBase));
      NpcPlay._npcaiDict = (_NpcPlay$_npcaiDict = {}, _NpcPlay$_npcaiDict[NpcId.Elang] = ElangAI, _NpcPlay$_npcaiDict[NpcId.Shirenh] = ShirenhAI, _NpcPlay$_npcaiDict[NpcId.Juxiong] = JuxiongAI, _NpcPlay$_npcaiDict[NpcId.Bainfu] = BianfuAI, _NpcPlay$_npcaiDict[NpcId.Gebul] = GebulAI, _NpcPlay$_npcaiDict[NpcId.Yezhu] = YezhuAI, _NpcPlay$_npcaiDict[NpcId.Shilaim] = ShilaimAI, _NpcPlay$_npcaiDict[NpcId.Zhizhu] = ZhizhuAI, _NpcPlay$_npcaiDict[NpcId.Mantuol] = MantuolAI, _NpcPlay$_npcaiDict[NpcId.Kuloub] = KuloubAI, _NpcPlay$_npcaiDict[NpcId.Kuloudb] = KuloudbAI, _NpcPlay$_npcaiDict[NpcId.Kulougjs] = KulougjsAI, _NpcPlay$_npcaiDict[NpcId.Youling] = YoulingAI, _NpcPlay$_npcaiDict[NpcId.Zibaogbl] = ZibaogblAI, _NpcPlay$_npcaiDict[NpcId.Gebulgs] = GebulgsAI, _NpcPlay$_npcaiDict[NpcId.Youlingzl] = YoulingzlAI, _NpcPlay$_npcaiDict[NpcId.Yemobf] = YemobfAI, _NpcPlay$_npcaiDict[NpcId.Kuloujj] = KuloujjAI, _NpcPlay$_npcaiDict[NpcId.Shishig] = ShishigAI, _NpcPlay$_npcaiDict[NpcId.Meimo] = MeimoAI, _NpcPlay$_npcaiDict[NpcId.Huanmo] = HuanmoAI, _NpcPlay$_npcaiDict[NpcId.Emo] = EmoAI, _NpcPlay$_npcaiDict[NpcId.Shiwei] = ShiweiAI, _NpcPlay$_npcaiDict[NpcId.Shinv] = ShinvAI, _NpcPlay$_npcaiDict[NpcId.Guanjia] = GuanjiaAI, _NpcPlay$_npcaiDict[NpcId.Mengyan] = MengyanAI, _NpcPlay$_npcaiDict[NpcId.Langwang] = LangwangAI, _NpcPlay$_npcaiDict[NpcId.Qishi] = QishiAI, _NpcPlay$_npcaiDict[NpcId.Siwanggsz] = SiwanggszAI, _NpcPlay$_npcaiDict);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NpcProp.ts", ['cc'], function () {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "84ad9RYIWRDdpdLTExJUU/5", "NpcProp", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NpcPropFunc.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('NpcPropFunc', void 0);

      cclegacy._RF.push({}, "ba16fMJXZpBF7/hG9o/0sLB", "NpcPropFunc", undefined);

      var NpcPropFunc;

      (function (NpcPropFunc) {
        NpcPropFunc["enterbuff"] = "enterbuff";
        NpcPropFunc["val"] = "val";
        NpcPropFunc["anfu"] = "anfu";
        NpcPropFunc["jianxiao"] = "jianxiao";
        NpcPropFunc["jianjiao"] = "jianjiao";
        NpcPropFunc["li"] = "li";
        NpcPropFunc["dali"] = "dali";
        NpcPropFunc["attack"] = "attack";
        NpcPropFunc["chujue"] = "chujue";
        NpcPropFunc["mulattack"] = "mulattack";
        NpcPropFunc["mengji"] = "mengji";
        NpcPropFunc["miaozhun"] = "miaozhun";
        NpcPropFunc["toudu"] = "toudu";
        NpcPropFunc["juhe"] = "juhe";
        NpcPropFunc["xinlingzs"] = "xinlingzs";
        NpcPropFunc["shangkoudj"] = "shangkoudj";
        NpcPropFunc["rongyan"] = "rongyan";
        NpcPropFunc["meihuo"] = "meihuo";
        NpcPropFunc["langxiao"] = "langxiao";
        NpcPropFunc["fushi"] = "fushi";
        NpcPropFunc["addbuff"] = "addbuff";
        NpcPropFunc["addteambuff"] = "addteambuff";
        NpcPropFunc["givebuff"] = "givebuff";
      })(NpcPropFunc || (NpcPropFunc = exports('NpcPropFunc', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NpcUtilCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ReslockKit.ts', './Util.ts', './tc.ts', './BuffId.ts', './BuffNS.ts', './ClearOnDead.ts', './TreasureId.ts', './TreasurePlay.ts', './ANpcCom.ts', './NpcAICom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, ReslockKit, ResName, notNull, tc, BuffId, BuffNS, ClearOnDead, TreasureId, TreasurePlay, ANpcCom, NpcAICom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ReslockKit = module.default;
      ResName = module.ResName;
    }, function (module) {
      notNull = module.notNull;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }, function (module) {
      ClearOnDead = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      TreasurePlay = module.default;
    }, function (module) {
      ANpcCom = module.default;
    }, function (module) {
      NpcAICom = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "26328A9QytHzoFw420UhMV5", "NpcUtilCom", undefined);

      var NpcUtilCom = exports('default', /*#__PURE__*/function (_ANpcCom) {
        _inheritsLoose(NpcUtilCom, _ANpcCom);

        function NpcUtilCom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ANpcCom.call.apply(_ANpcCom, [this].concat(args)) || this;
          _this._actNum = void 0;
          return _this;
        }

        var _proto = NpcUtilCom.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnDestory = function OnDestory() {};

        _proto.leaveFight = function leaveFight() {
          this._actNum = -1;
        };

        _proto.enterFight = function enterFight() {
          this._actNum = -1;
        };

        _proto.onRoundStart = function onRoundStart() {
          this._actNum++;
        };

        _proto.getHit = function getHit(dmg, source, log) {
          if (this.npc.isDead) return;
          if (dmg < 1) return;
          var self = this.npc;
          var selfBuff = self.buff;
          var selfShiledNum = selfBuff.numOf(BuffId.shiled);
          selfBuff.mod(BuffId.shiled, -dmg);
          dmg -= selfShiledNum;

          if (dmg > 0) {
            this.cutHp(dmg, source, log);
          }

          selfBuff.effect(BuffNS.EffectStage.Hit, {
            hitSource: source,
            log: 'target.getHit,' + log
          });

          if (source) {
            source.buff.effect(BuffNS.EffectStage.HitOther, {
              hitTarget: self,
              log: 'target.getHit,' + log
            });
          }
        };

        _proto.cutHp = function cutHp(dmg, source, log) {
          if (this.npc.isDead) return;
          if (dmg < 1) return;
          var self = this.npc;
          var selfBuff = this.npc.buff;

          if (dmg > 0) {
            var selfSuozij = selfBuff.numOf(BuffId.Suozij);

            if (dmg < selfSuozij) {
              dmg = 1;
              tc.p(TreasurePlay).pop(TreasureId.Suozij);
            }

            selfBuff.mod(BuffId.hp, -dmg);
            source == null ? void 0 : source.buff.effect(BuffNS.EffectStage.HurtOther, {
              hurt: dmg,
              hurtTarget: self,
              log: 'cutHp,' + log
            });
            selfBuff.effect(BuffNS.EffectStage.Hurt, {
              hurt: dmg,
              hurtSource: source,
              log: 'cutHp,' + log
            });

            if (this.npc.isDead) {
              self.info.getLiveEnemys().forEach(function (enemy) {
                enemy.buff.effect(BuffNS.EffectStage.AnyEnemyDead, {
                  log: 'cutHp,' + log
                });
              });

              this._dealDeadDuringCutHp(self);
            }
          }
        };

        _proto._dealDeadDuringCutHp = function _dealDeadDuringCutHp(self) {
          var _this2 = this;

          var reviveHp = null;
          var isLianxie = self.buff.isMorethan(BuffId.Lianxie, 0);
          this.npc.buff.each(function (buff) {
            if (buff.hasCom(ClearOnDead)) _this2.npc.buff.rm(buff.info.id);
            return true;
          });
          this.npc.buff.effect(BuffNS.EffectStage.OnTryRevive, {
            reviveCallback: function reviveCallback(hp) {
              if (notNull(reviveHp)) return false;
              reviveHp = hp;
              return true;
            },
            log: "cutHp-tryRevie"
          }); // console.log('dealDeadDuringCutHp', self.info.npcInfo.name, reviveHp);

          if (notNull(reviveHp)) {
            // console.log('dealDeadDuringCutHp revive');
            // 复活
            tc.k(ReslockKit).getLock(ResName.RoundAdvance, function () {
              self.info.fighterWrap.playRevive(function () {
                self.buff.mod(BuffId.hp, reviveHp, {
                  write: true
                });
                tc.k(ReslockKit).retLock(ResName.RoundAdvance);
              });
            });
          } else if (isLianxie) {
            // console.log('dealDeadDuringCutHp lianxie');
            // 连携
            self.buff.rm(BuffId.Lianxie);

            if (!self.isTrueDead) {
              self.c.get(NpcAICom).refreshAction();
              self.info.fighterWrap.playFakeDead();
            }
          } else {
            // console.log('dealDeadDuringCutHp dead');
            // 死亡
            self.info.fight.onFighterDead(self);
          }
        };

        _proto.recoverHp = function recoverHp(add, log) {
          if (this.npc.isDead) return;
          if (add < 1) return;
          var selfBuff = this.npc.buff;
          var selfMaxHp = selfBuff.numOf(BuffId.maxhp);
          var slefHp = selfBuff.numOf(BuffId.hp);
          add = Math.min(add, selfMaxHp - slefHp);

          if (add > 0) {
            selfBuff.mod(BuffId.hp, add);
          }
        };

        _createClass(NpcUtilCom, [{
          key: "actNum",
          get: function get() {
            return this._actNum;
          }
        }]);

        return NpcUtilCom;
      }(ANpcCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OutlineBtnWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIWrap.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, UIWrap;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIWrap = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c772cGQJ4JMyq+8RTbIQ2ap", "OutlineBtnWrap", undefined);

      var OutlineBtnWrap = exports('default', /*#__PURE__*/function (_UIWrap) {
        _inheritsLoose(OutlineBtnWrap, _UIWrap);

        function OutlineBtnWrap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIWrap.call.apply(_UIWrap, [this].concat(args)) || this;
          _this._ctrl = void 0;
          return _this;
        }

        var _proto = OutlineBtnWrap.prototype;

        _proto.OnInit = function OnInit() {
          this._ctrl = this.getController("active");
        };

        _proto.active = function active(b) {
          this._ctrl.setSelectedPage(b ? "on" : "off");
        };

        _proto.onClick = function onClick(listener, target) {
          this.fgc.asBtn.onClick(listener, target);
        };

        return OutlineBtnWrap;
      }(UIWrap));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Plat.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './env', './PlatAnd.ts', './PlatIOS.ts', './PlatMi.ts', './PlatOPPO.ts', './PlatVIVO.ts', './PlatWeb.ts', './PlatWX.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, NATIVE, XIAOMI, PlatWeb;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      NATIVE = module.NATIVE;
      XIAOMI = module.XIAOMI;
    }, null, null, null, null, null, function (module) {
      PlatWeb = module.default;
    }, null],
    execute: function () {
      cclegacy._RF.push({}, "1d19856ffVL47gu7peIcSZW", "Plat", undefined);

      var Plat = exports('default', /*#__PURE__*/function () {
        function Plat() {}

        _createClass(Plat, null, [{
          key: "inst",
          get: function get() {
            {
              return PlatWeb.getInstance();
            }
          }
        }, {
          key: "isAndroid",
          get: function get() {
            return NATIVE;
          }
        }, {
          key: "isIos",
          get: function get() {
            return NATIVE;
          }
        }, {
          key: "isMi",
          get: function get() {
            return XIAOMI;
          }
        }]);

        return Plat;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlatAnd.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlatBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PlatBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlatBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d93e1VbbzRF5K/9RAcg+wWg", "PlatAnd", undefined);

      var PlatAnd = exports('default', /*#__PURE__*/function (_PlatBase) {
        _inheritsLoose(PlatAnd, _PlatBase);

        PlatAnd.getInstance = function getInstance() {
          if (!this._instance) {
            this._instance = new PlatAnd();
          }

          return this._instance;
        };

        var _proto = PlatAnd.prototype;

        _proto.logCatch = function logCatch() {
          var _console;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          (_console = console).log.apply(_console, ["[JSB-CATCH]"].concat(args));
        };

        function PlatAnd() {
          var _this;

          _this = _PlatBase.call(this) || this;
          _this._onShowAdCallback = void 0;
          _this._onLoginCallback = void 0;
          _this._onCheckPlatReady = void 0;
          return _this;
        }

        _proto.login = function login(onLogin, uid) {
          {
            _PlatBase.prototype.login.call(this, onLogin, uid);
          }
        };

        _proto.showAD = function showAD(onSuc, onNotSupport) {
          if (this._onShowAdCallback) return;
          {
            _PlatBase.prototype.showAD.call(this, onSuc, onNotSupport);
          }
        };

        _proto.endGame = function endGame() {
          {
            _PlatBase.prototype.endGame.call(this);
          }
        };

        _proto.enterGameCenter = function enterGameCenter() {
          {
            _PlatBase.prototype.enterGameCenter.call(this);
          }
        };

        _proto.checkPlatReady = function checkPlatReady(onReady) {
          {
            _PlatBase.prototype.checkPlatReady.call(this, onReady);
          }
        };

        return PlatAnd;
      }(PlatBase));
      PlatAnd._instance = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlatBase.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _createClass, cclegacy, game;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      game = module.game;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b2885VPOBtDyrmv52kUOTrn", "PlatBase", undefined);

      var PlatBase = exports('default', /*#__PURE__*/function () {
        function PlatBase() {
          this.testShowADCount = 0;
          this._isInit = false;
          this.popTip = void 0;
        }

        var _proto = PlatBase.prototype;

        _proto.init = function init(popTip) {
          if (this._isInit) return;
          this.popTip = popTip;
          this._isInit = true;
        }
        /** 登录 */
        ;

        _proto.login = function login(onLogin, uid) {
          onLogin();
        }
        /**
         * 广告展示
         * @param {ADCallback} onSuc
         * @param {Function} onNotSupport 当前平台不支持广告展示时调用
         */
        ;

        _proto.showAD = function showAD(onSuc, onNotSupport) {
          this.testShowADCount++;

          if (this.testShowADCount == 1) {
            onNotSupport == null ? void 0 : onNotSupport();
          } else if (this.testShowADCount == 2) {
            onSuc == null ? void 0 : onSuc(false);
          } else {
            onSuc == null ? void 0 : onSuc(true);
            this.testShowADCount = 0;
          }
        };

        _proto.endGame = function endGame() {
          game.end();
        }
        /**
         * 进入游戏中心
         */
        ;

        _proto.enterGameCenter = function enterGameCenter() {
          console.log("enterGameCenter");
        }
        /**
         * 设置加载页进度
         * @param {number} pro - progress 0-99 当前进度
         */
        ;

        _proto.setLoadingProgress = function setLoadingProgress(pro) {
          console.log("setLoadingProgress " + pro);
        }
        /**
         * 隐藏游戏加载页面
         */
        ;

        _proto.loadingComplete = function loadingComplete() {
          console.log("loadingComplete");
        }
        /**
         * 确认平台准备完毕
         */
        ;

        _proto.checkPlatReady = function checkPlatReady(onReady) {
          onReady();
        };

        _createClass(PlatBase, [{
          key: "curTime",
          get: function get() {
            return Date.now();
          }
        }]);

        return PlatBase;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlatCfg.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('GameEnv', void 0);

      cclegacy._RF.push({}, "8f5a3/fcM5Iy6rzmG3/cOTO", "PlatCfg", undefined);

      var GameEnv;

      (function (GameEnv) {
        GameEnv["Default"] = "Default";
        GameEnv["Oppo"] = "Oppo";
        GameEnv["Vivo"] = "Vivo";
        GameEnv["Mi"] = "Mi";
      })(GameEnv || (GameEnv = exports('GameEnv', {})));

      var PlatCfg = exports('default', {
        env: GameEnv.Default
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlatIOS.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlatBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PlatBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlatBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ebdeaiOVLhEa69Om9mjpdio", "PlatIOS", undefined);

      var PlatIOS = exports('default', /*#__PURE__*/function (_PlatBase) {
        _inheritsLoose(PlatIOS, _PlatBase);

        PlatIOS.getInstance = function getInstance() {
          if (!this._instance) {
            this._instance = new PlatIOS();
          }

          return this._instance;
        };

        var _proto = PlatIOS.prototype;

        _proto.logCatch = function logCatch() {
          var _console;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          (_console = console).log.apply(_console, ["[JSB-IOS-CATCH]"].concat(args));
        };

        function PlatIOS() {
          var _this;

          _this = _PlatBase.call(this) || this;
          _this._onShowAdCallback = void 0;
          _this._onLoginCallback = void 0;
          _this._onCheckPlatReady = void 0;
          return _this;
        }

        _proto.login = function login(onLogin, uid) {
          onLogin();
          {
            _PlatBase.prototype.login.call(this, onLogin, uid);
          }
        };

        _proto.showAD = function showAD(onSuc, onNotSupport) {
          if (this._onShowAdCallback) return;
          {
            _PlatBase.prototype.showAD.call(this, onSuc, onNotSupport);
          }
        };

        _proto.checkPlatReady = function checkPlatReady(onReady) {
          onReady();
          {
            _PlatBase.prototype.checkPlatReady.call(this, onReady);
          }
        };

        return PlatIOS;
      }(PlatBase));
      PlatIOS._instance = null;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlatMi.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlatBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PlatBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlatBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "87070kod95G/JMGwZsNU0XK", "PlatMi", undefined);

      var PlatMi = exports('default', /*#__PURE__*/function (_PlatBase) {
        _inheritsLoose(PlatMi, _PlatBase);

        function PlatMi() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _PlatBase.call.apply(_PlatBase, [this].concat(args)) || this;
          _this._onRwdAdSuc = void 0;
          _this._rwdAd = void 0;
          _this._nextShowAd = 0;
          _this._rwdAdLoaded = false;
          return _this;
        }

        PlatMi.getInstance = function getInstance() {
          if (!this._instance) {
            this._instance = new PlatMi();
          }

          return this._instance;
        };

        var _proto = PlatMi.prototype;

        _proto.endGame = function endGame() {
          qg.exitApplication({});
        };

        _proto.showAD = function showAD(onSuc, onNotSupport) {
          if (this.curTime < this._nextShowAd) {
            onSuc == null ? void 0 : onSuc(false);
            this.popTip("广告拉取过于频繁");
            return;
          }

          this._nextShowAd = this.curTime + 3 * 1000;

          if (this._onRwdAdSuc != null) {
            onSuc == null ? void 0 : onSuc(false);
            console.log("showAD cancel, last call not end.");
            return;
          }

          this._onRwdAdSuc = onSuc;

          if (!this._rwdAd) {
            this._initRewardedAd();
          } else if (!this._rwdAdLoaded) {
            var _this$_onRwdAdSuc;

            this._rwdAd.load();

            (_this$_onRwdAdSuc = this._onRwdAdSuc) == null ? void 0 : _this$_onRwdAdSuc.call(this, false);
            this.popTip("广告拉取中");
            this._onRwdAdSuc = null;
          } else {
            this._rwdAd.show();
          }
        };

        _proto._initRewardedAd = function _initRewardedAd() {
          var _this2 = this;

          var rewardedAd = qg.createRewardedVideoAd({
            adUnitId: PlatMi.RWD_AD_ID
          });
          var count = 0;

          var once = function once() {
            if (count == 0) {
              _this2._rwdAd.show();

              count++;
            }
          };

          var rwdADWaiting = function rwdADWaiting() {
            _this2._onRwdAdSuc == null ? void 0 : _this2._onRwdAdSuc(false);

            _this2.popTip("广告拉取中");

            _this2._onRwdAdSuc = null;
          };

          var rwdAdFail = function rwdAdFail() {
            _this2._onRwdAdSuc == null ? void 0 : _this2._onRwdAdSuc(false);
            _this2._onRwdAdSuc = null;
          };

          var rwdAdSuc = function rwdAdSuc() {
            _this2._onRwdAdSuc == null ? void 0 : _this2._onRwdAdSuc(true);
            _this2._onRwdAdSuc = null;
          };

          rewardedAd.onError(function (errMsg, errCode) {
            console.log("激励视频广告加载失败 ", errCode, errMsg);
            rwdADWaiting();
          });
          rewardedAd.onLoad(function () {
            console.log('激励视频广告加载完成-onload触发');
            _this2._rwdAdLoaded = true;
            once();
          });
          rewardedAd.onClose(function (isEnded) {
            console.log('视频广告关闭回调');

            if (isEnded) {
              console.log("正常播放结束，可以下发游戏奖励");
              rwdAdSuc();
            } else {
              console.log("播放中途退出，不下发游戏奖励");
              rwdAdFail();
            }

            _this2._rwdAdLoaded = false; // 视频播放结束后会自动调 load
          });
          this._rwdAd = rewardedAd;
        };

        return PlatMi;
      }(PlatBase));
      PlatMi.RWD_AD_ID = "991bcc77a5341bc1449577955208e1c1";
      PlatMi._instance = null;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlatOPPO.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlatBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PlatBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlatBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4c243tRnEJPzIEDeCPv7lWu", "PlatOPPO", undefined);

      var PlatOPPO = exports('default', /*#__PURE__*/function (_PlatBase) {
        _inheritsLoose(PlatOPPO, _PlatBase);

        function PlatOPPO() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _PlatBase.call.apply(_PlatBase, [this].concat(args)) || this;
          _this._rwdAd = void 0;
          _this._onRwdAdSuc = void 0;
          _this._nextShowAd = 0;
          return _this;
        }

        PlatOPPO.getInstance = function getInstance() {
          if (!this._instance) {
            this._instance = new PlatOPPO();
          }

          return this._instance;
        };

        var _proto = PlatOPPO.prototype;

        _proto.showAD = function showAD(onSuc, onNotSupport) {
          if (this.curTime < this._nextShowAd) {
            onSuc == null ? void 0 : onSuc(false);
            this.popTip("广告拉取过于频繁");
            return;
          }

          this._nextShowAd = this.curTime + 3 * 1000;

          if (this._onRwdAdSuc != null) {
            onSuc == null ? void 0 : onSuc(false);
            console.log("showAD cancel, last call not end.");
            return;
          }

          this._onRwdAdSuc = onSuc;

          if (!this._rwdAd) {
            this._initRewardedAd();
          }

          this._rwdAd.load();
        };

        _proto.endGame = function endGame() {
          qg.exitApplication({});
        };

        _proto.setLoadingProgress = function setLoadingProgress(pro) {
          qg.setLoadingProgress({
            progress: pro
          });

          if (qg.getSystemInfoSync().platformVersionCode < 1076) {
            console.log("新的数据上报接口 API 仅支持平台版本号大于 1076 的快应用");
            return;
          }

          qg.reportMonitor("load_res_begin");
        };

        _proto.loadingComplete = function loadingComplete() {
          qg.loadingComplete({
            complete: function complete(res) {
              if (qg.getSystemInfoSync().platformVersionCode < 1076) {
                console.log("新的数据上报接口 API 仅支持平台版本号大于 1076 的快应用");
                return;
              }

              qg.reportMonitor("load_res_complete");
              qg.reportMonitor("game_scene");
            }
          });
        };

        _proto.checkPlatReady = function checkPlatReady(onReady) {
          onReady();
        };

        _proto._initRewardedAd = function _initRewardedAd() {
          var _this2 = this;

          var rewardedAd = qg.createRewardedVideoAd({
            adUnitId: PlatOPPO.RWD_AD_ID
          });

          var rwdADWaiting = function rwdADWaiting() {
            _this2._onRwdAdSuc == null ? void 0 : _this2._onRwdAdSuc(false);

            _this2.popTip("广告拉取中");

            _this2._onRwdAdSuc = null;
          };

          var rwdAdFail = function rwdAdFail() {
            _this2._onRwdAdSuc == null ? void 0 : _this2._onRwdAdSuc(false);
            _this2._onRwdAdSuc = null;
          };

          var rwdAdSuc = function rwdAdSuc() {
            _this2._onRwdAdSuc == null ? void 0 : _this2._onRwdAdSuc(true);
            _this2._onRwdAdSuc = null;
          };

          rewardedAd.onError(function (err) {
            console.log("激励视频广告加载失败", err);
            rwdADWaiting();
          });
          rewardedAd.onLoad(function () {
            console.log('激励视频广告加载完成-onload触发');
            rewardedAd.show();
          });
          rewardedAd.onClose(function (res) {
            console.log('视频广告关闭回调');

            if (res == undefined) {
              console.log("正常播放结束，可以下发游戏奖励");
              rwdAdSuc();
            } else {
              console.log('用户点击了关闭广告按钮');

              if (res.isEnded) {
                console.log('用户看完了');
                rwdAdSuc();
              } else {
                console.log("播放中途退出，不下发游戏奖励");
                rwdAdFail();
              }
            }
          });
          this._rwdAd = rewardedAd;
        };

        return PlatOPPO;
      }(PlatBase));
      PlatOPPO.RWD_AD_ID = "791152";
      PlatOPPO._instance = null;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlatVIVO.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlatBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PlatBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlatBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "260baqs/4NKqqPGnq1cS7hk", "PlatVIVO", undefined);

      var PlatVIVO = exports('default', /*#__PURE__*/function (_PlatBase) {
        _inheritsLoose(PlatVIVO, _PlatBase);

        function PlatVIVO() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _PlatBase.call.apply(_PlatBase, [this].concat(args)) || this;
          _this._rwdAd = void 0;
          _this._onRwdAdSuc = void 0;
          _this._nextShowAd = 0;
          return _this;
        }

        PlatVIVO.getInstance = function getInstance() {
          if (!this._instance) {
            this._instance = new PlatVIVO();
          }

          return this._instance;
        };

        var _proto = PlatVIVO.prototype;

        _proto.showAD = function showAD(onSuc, onNotSupport) {
          if (this.curTime < this._nextShowAd) {
            onSuc == null ? void 0 : onSuc(false);
            this.popTip("广告拉取过于频繁");
            return;
          }

          this._nextShowAd = this.curTime + 3 * 1000;

          if (this._onRwdAdSuc != null) {
            onSuc == null ? void 0 : onSuc(false);
            console.log("showAD cancel, last call not end.");
            return;
          }

          this._onRwdAdSuc = onSuc;

          if (this._rwdAd) {
            this._rwdAd.load();
          } else {
            this._initRewardedAd();
          }
        };

        _proto.endGame = function endGame() {
          qg.exitApplication();
        };

        _proto.checkPlatReady = function checkPlatReady(onReady) {
          onReady();
        };

        _proto._initRewardedAd = function _initRewardedAd() {
          var _this2 = this;

          var rewardedAd = qg.createRewardedVideoAd({
            posId: PlatVIVO.RWD_AD_ID
          });

          var rwdADWaiting = function rwdADWaiting() {
            _this2._onRwdAdSuc == null ? void 0 : _this2._onRwdAdSuc(false);

            _this2.popTip("广告拉取中");

            _this2._onRwdAdSuc = null;
          };

          var rwdAdFail = function rwdAdFail() {
            _this2._onRwdAdSuc == null ? void 0 : _this2._onRwdAdSuc(false);
            _this2._onRwdAdSuc = null;
          };

          var rwdAdSuc = function rwdAdSuc() {
            _this2._onRwdAdSuc == null ? void 0 : _this2._onRwdAdSuc(true);
            _this2._onRwdAdSuc = null;
          };

          rewardedAd.onError(function (err) {
            console.log("激励视频广告加载失败", err);
            rwdADWaiting();
          });
          rewardedAd.onLoad(function (res) {
            console.log('激励视频广告加载完成-onload触发', JSON.stringify(res));
            rewardedAd.show().then(function () {
              console.log('激励视频广告展示完成');
            })["catch"](function (err) {
              console.log('激励视频广告展示失败', JSON.stringify(err));
              rwdADWaiting();
            });
          });

          var func = function func(res) {
            console.log('视频广告关闭回调');

            if (res && res.isEnded) {
              console.log("正常播放结束，可以下发游戏奖励");
              rwdAdSuc();
            } else {
              console.log("播放中途退出，不下发游戏奖励");
              rwdAdFail();
            }
          };

          rewardedAd.onClose(func);
          this._rwdAd = rewardedAd;
        };

        return PlatVIVO;
      }(PlatBase));
      PlatVIVO.RWD_AD_ID = "065f1e0a4aef44cdb16b1427fb2499a5";
      PlatVIVO._instance = null;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlatWeb.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlatBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PlatBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlatBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "16d5c/k3fRC1ZG4hwBnfKt2", "PlatWeb", undefined);

      var PlatWeb = exports('default', /*#__PURE__*/function (_PlatBase) {
        _inheritsLoose(PlatWeb, _PlatBase);

        function PlatWeb() {
          return _PlatBase.apply(this, arguments) || this;
        }

        PlatWeb.getInstance = function getInstance() {
          if (!this._instance) {
            this._instance = new PlatWeb();
          }

          return this._instance;
        };

        return PlatWeb;
      }(PlatBase));
      PlatWeb._instance = null;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlatWX.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlatBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PlatBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlatBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a8a3c+zaoxI+ZC9l4pP8EwS", "PlatWX", undefined);

      var PlatWX = exports('default', /*#__PURE__*/function (_PlatBase) {
        _inheritsLoose(PlatWX, _PlatBase);

        function PlatWX() {
          return _PlatBase.apply(this, arguments) || this;
        }

        PlatWX.getInstance = function getInstance() {
          if (!this._instance) {
            this._instance = new PlatWX();
          }

          return this._instance;
        };

        var _proto = PlatWX.prototype;

        _proto.login = function login(call) {
          var sysInfo = wx.getSystemInfoSync(); // 获取微信界面大小

          var screenWidth = sysInfo.screenWidth;
          var screenHeight = sysInfo.screenHeight;
          wx.login({
            success: function success(res) {
              if (res.code) {
                var code = res.code;
                console.log("登陆成功,获取到code");
              }

              var button = wx.createUserInfoButton({
                type: 'text',
                text: '',
                style: {
                  left: 0,
                  top: 0,
                  width: screenWidth,
                  height: screenHeight,
                  lineHeight: 40,
                  backgroundColor: '#00000000',
                  color: '#ffffff',
                  textAlign: 'center'
                }
              });
              button.onTap(function (res) {
                if (res.errMsg == "getUserInfo:ok") {
                  console.log("授权用户信息"); //获取到用户信息
                  // let userInfo = res.userInfo
                  // self.wxLogin(userInfo);

                  wx.getUserInfo({
                    lang: "zh_CN",
                    success: function success(res) {
                      var userInfo = res.userInfo;
                      console.log(userInfo);
                    },
                    fail: function fail() {
                      console.log("获取失败");
                      return false;
                    }
                  }); //清除微信授权按钮

                  button.destroy();
                } else {
                  //清除微信授权按钮
                  button.destroy();
                  console.log("授权失败");
                }
              });
            }
          });
        };

        _proto.showAD = function showAD(callback) {
          callback && callback(0);
        };

        return PlatWX;
      }(PlatBase));
      PlatWX._instance = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Player.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ComModule.ts', './BuffId.ts', './BuffNS.ts', './NpcBuffCom.ts', './NpcInfoCom.ts', './NpcUtilCom.ts', './PlayerCardSetCom.ts', './PlayerExploreCom.ts', './PlayerFightCardCom.ts', './PlayerPreparCom.ts', './PlayerSaveCom.ts', './PlayerSeedCom.ts', './PlayerTreasureCom.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, ComModule, BuffId, BuffNS, NpcBuffCom, NpcInfoCom, NpcUtilCom, PlayerCardSetCom, PlayerExploreCom, PlayerFightCardCom, PlayerPreparCom, PlayerSaveCom, PlayerSeedCom, PlayerTreasureCom;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ComModule = module.ComModule;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }, function (module) {
      NpcBuffCom = module.default;
    }, function (module) {
      NpcInfoCom = module.default;
    }, function (module) {
      NpcUtilCom = module.default;
    }, function (module) {
      PlayerCardSetCom = module.PlayerCardSetCom;
    }, function (module) {
      PlayerExploreCom = module.default;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      PlayerPreparCom = module.PlayerPreparCom;
    }, function (module) {
      PlayerSaveCom = module.PlayerSaveCom;
    }, function (module) {
      PlayerSeedCom = module.default;
    }, function (module) {
      PlayerTreasureCom = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1ea12T+ODJImohWwgbd4+Vf", "Player", undefined);

      var Player = exports('default', /*#__PURE__*/function () {
        function Player(npcId) {
          var _this = this;

          this._id = void 0;
          this._c = void 0;
          this._lastFight = void 0;
          this._util = void 0;
          this._id = npcId;
          this._c = new ComModule();

          this._c.add(NpcUtilCom);

          this._c.add(NpcInfoCom);

          this._c.add(NpcBuffCom);

          this._c.add(PlayerPreparCom);

          this._c.add(PlayerExploreCom);

          this._c.add(PlayerTreasureCom);

          this._c.add(PlayerSeedCom);

          this._c.add(PlayerFightCardCom);

          this._c.add(PlayerCardSetCom);

          this._c.add(PlayerSaveCom);

          this._c.each(function (c) {
            return c.init(_this);
          });

          this._c.each(function (c) {
            return c.lateinit();
          });

          this.buff.mod(BuffId.draw, this.info.npcInfo.getIntVal('draw'), {
            write: true
          });
          this.buff.mod(BuffId.maxenegy, this.info.npcInfo.getIntVal('maxEnergy'), {
            write: true
          });
          this.buff.mod(BuffId.collecter, 1, {
            write: true
          });
          this._util = this._c.get(NpcUtilCom);
        }

        var _proto = Player.prototype;

        _proto.enterFight = function enterFight(fight) {
          if (this._lastFight) throw "npc already on fight";

          this._util.enterFight();

          this._lastFight = fight;

          this._c.each(function (c) {
            return c.onEnterFight(fight);
          });
        };

        _proto.leaveFight = function leaveFight(fight) {
          if (fight !== this._lastFight) throw "npc is not on this fight.";
          this.c.each(function (com) {
            return com.onLeaveFight(fight);
          });
          this.c.each(function (com) {
            return com.onLateLeaveFight(fight);
          });
          this._lastFight = null;

          this._util.leaveFight();
        };

        _proto.onRoundStart = function onRoundStart() {
          this._util.onRoundStart();

          this.c.get(PlayerFightCardCom).clearLastRoundHandcardCast();
          this.buff.effect(BuffNS.EffectStage.RoundStart, {
            log: "Player-RoundStart"
          });
        };

        _proto.getHit = function getHit(dmg, source, log) {
          this._util.getHit(dmg, source, log);

          console.log("player gethit", dmg, source, log);
        };

        _proto.cutHp = function cutHp(dmg, source, log) {
          this._util.cutHp(dmg, source, log);

          console.log("player gethurt", dmg, source, log);
        };

        _proto.recoverHp = function recoverHp(add, log) {
          this._util.recoverHp(add, log);

          console.log("player recoverHp", add, log);
        };

        _proto.dead = function dead() {
          this._c.each(function (c) {
            return c.ondead();
          });
        };

        _proto.Dispose = function Dispose() {
          this._c.each(function (c) {
            return c.destory();
          });

          this._c = null;
          this._lastFight = null;
        };

        _createClass(Player, [{
          key: "id",
          get: function get() {
            return this._id;
          }
        }, {
          key: "c",
          get: function get() {
            return this._c;
          }
        }, {
          key: "info",
          get: function get() {
            return this._c.get(NpcInfoCom);
          }
        }, {
          key: "buff",
          get: function get() {
            return this._c.get(NpcBuffCom);
          }
        }, {
          key: "seed",
          get: function get() {
            return this._c.get(PlayerSeedCom);
          }
        }, {
          key: "treasure",
          get: function get() {
            return this._c.get(PlayerTreasureCom);
          }
        }, {
          key: "save",
          get: function get() {
            return this._c.get(PlayerSaveCom);
          }
        }, {
          key: "actNum",
          get: function get() {
            return this._util.actNum;
          }
        }, {
          key: "isDead",
          get: function get() {
            return !this.buff.isMorethan(BuffId.hp, 0);
          }
        }, {
          key: "isTrueDead",
          get: function get() {
            return this.info.isDead;
          }
        }]);

        return Player;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PoolModule.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, PoolModule;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PoolModule = module.PoolModule;
    }],
    execute: function () {
      cclegacy._RF.push({}, "07a85zUGopAI7hq7EbwF6TB", "PlayerBuff", undefined);

      var PlayerBuff = exports('PlayerBuff', /*#__PURE__*/function () {
        PlayerBuff.alloc = function alloc(id, num) {
          var b = this._pool.alloc();

          b.reset(id, num);
          return b;
        };

        PlayerBuff.free = function free(buff) {
          this._pool.free(buff);
        };

        function PlayerBuff() {
          this._id = void 0;
          this._num = void 0;
        }

        var _proto = PlayerBuff.prototype;

        _proto.modNum = function modNum(num, option) {
          var _option$write;

          var write = (_option$write = option == null ? void 0 : option.write) != null ? _option$write : false;

          if (write) {
            this._num = num;
          } else {
            if (num > 0) {
              this._num += num;
            } else {
              this._num = Math.max(0, this._num - num);
            }
          }
        };

        _proto.reset = function reset(id, num) {
          this._id = id;
          this._num = num;
        };

        _createClass(PlayerBuff, [{
          key: "num",
          get: function get() {
            return this._num;
          }
        }, {
          key: "id",
          get: function get() {
            return this._id;
          }
        }]);

        return PlayerBuff;
      }());
      PlayerBuff._pool = new PoolModule(function () {
        return new PlayerBuff();
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlayerBuff.ts', './APlayerCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, EventTarget, PlayerBuff, APlayerCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }, function (module) {
      PlayerBuff = module.PlayerBuff;
    }, function (module) {
      APlayerCom = module.APlayerCom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a4febkYqZ9PKKd7ItxXMvnA", "PlayerBuffCom", undefined);

      var PlayerBuffCom = exports('default', /*#__PURE__*/function (_APlayerCom) {
        _inheritsLoose(PlayerBuffCom, _APlayerCom);

        function PlayerBuffCom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _APlayerCom.call.apply(_APlayerCom, [this].concat(args)) || this;
          _this._buffList = void 0;
          _this._e = void 0;
          return _this;
        }

        var _proto = PlayerBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this._buffList = [];
          this._e = new EventTarget();
        };

        _proto.OnDestory = function OnDestory() {
          this._buffList.forEach(function (b) {
            return PlayerBuff.free(b);
          });

          this._buffList = null;
        };

        _proto.get = function get(buffId) {
          return this._buffList.find(function (b) {
            return b.id == buffId;
          });
        };

        _proto.getNum = function getNum(buffId) {
          return this.get(buffId).num;
        };

        _proto.rm = function rm(buffId) {
          var index = this._buffList.findIndex(function (b) {
            return b.id == buffId;
          });

          if (index > -1) {
            this._buffList.splice(index, 1).forEach(function (b) {
              return PlayerBuff.free(b);
            });

            this._e.emit(PlayerBuffCom.Events.BUFF_CHG, buffId, 0);
          }
        };

        _proto.mod = function mod(buffId, num, option) {
          var existBuff = this.get(buffId);

          if (!existBuff) {
            existBuff = PlayerBuff.alloc(buffId, 0);

            this._buffList.push(existBuff);
          }

          existBuff.modNum(num, option);

          this._e.emit(PlayerBuffCom.Events.BUFF_CHG, buffId, existBuff.num);
        };

        _proto.isMorethan = function isMorethan(buffId, num) {
          var existBuff = this.get(buffId);
          return existBuff && existBuff.num > num;
        };

        _createClass(PlayerBuffCom, [{
          key: "e",
          get: function get() {
            return this._e;
          }
        }]);

        return PlayerBuffCom;
      }(APlayerCom));
      PlayerBuffCom.Events = {
        BUFF_CHG: "BUFF_CHG"
      };

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerBuffId.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('PlayerBuffId', void 0);

      cclegacy._RF.push({}, "3c5c0CofyNDa7d1XP6YfqQR", "PlayerBuffId", undefined);

      var PlayerBuffId;

      (function (PlayerBuffId) {
        PlayerBuffId[PlayerBuffId["hp"] = 0] = "hp";
        PlayerBuffId[PlayerBuffId["maxhp"] = 1] = "maxhp";
        PlayerBuffId[PlayerBuffId["XTxfg"] = 1001] = "XTxfg";
      })(PlayerBuffId || (PlayerBuffId = exports('PlayerBuffId', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerCardSetCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ANpcCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, EventTarget, ANpcCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }, function (module) {
      ANpcCom = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d3d9aN1jzVPpbHoohxTQxqI", "PlayerCardSetCom", undefined);
      /**卡组组件 */


      var PlayerCardSetCom = exports('PlayerCardSetCom', /*#__PURE__*/function (_ANpcCom) {
        _inheritsLoose(PlayerCardSetCom, _ANpcCom);

        function PlayerCardSetCom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ANpcCom.call.apply(_ANpcCom, [this].concat(args)) || this;
          _this._fixed = void 0;
          _this._cards = void 0;
          _this._e = void 0;
          return _this;
        }

        var _proto = PlayerCardSetCom.prototype;

        _proto.OnInit = function OnInit() {
          this._cards = [];
          this._fixed = [];
          this._e = new EventTarget();
        };

        _proto.OnDestory = function OnDestory() {
          this._cards = null;
          this._fixed = null;
          this._e = null;
        };

        _proto.setCards = function setCards(cards) {
          this._cards = cards;
        };

        _proto.rmCard = function rmCard(card) {
          console.log('移除卡牌 ' + card);

          this._cards.remove(card);

          this._e.emit(PlayerCardSetCom.Events.CARD_SET_CHG);
        };

        _proto.addCard = function addCard(card) {
          console.log("增加卡牌 " + card);

          this._cards.push(card);

          this._e.emit(PlayerCardSetCom.Events.CARD_SET_CHG);
        };

        _proto.fixedCard = function fixedCard(card) {
          console.log("固定卡牌 " + card);

          var index = this._cards.indexOf(card);

          if (index >= 0) {
            this._fixed.push(index);
          }
        };

        _proto.unfixedCard = function unfixedCard(card) {
          console.log("解除固定卡牌 " + card);

          for (var index = 0; index < this._fixed.length; index++) {
            var idx = this._fixed[index];

            if (this._cards[idx] == card) {
              this._fixed.remove(index);

              break;
            }
          }
        };

        _proto.sortAsFirstDrawpile = function sortAsFirstDrawpile() {
          var _this2 = this;

          if (this._fixed.length > 0) {
            var ret = this._cards.filter(function (_, i) {
              return !_this2._fixed.includes(i);
            }).sort(function () {
              return Math.random() - 0.5;
            });

            ret.unshift.apply(ret, this._cards.filter(function (_, i) {
              return _this2._fixed.includes(i);
            }));
            return ret;
          } else {
            return this._cards.sort(function () {
              return Math.random() - 0.5;
            });
          }
        };

        _createClass(PlayerCardSetCom, [{
          key: "e",
          get: function get() {
            return this._e;
          }
        }, {
          key: "cards",
          get: function get() {
            return this._cards;
          }
        }, {
          key: "nonfixedCards",
          get: function get() {
            var _this3 = this;

            return this._cards.filter(function (_, i) {
              return !_this3._fixed.includes(i);
            });
          }
        }]);

        return PlayerCardSetCom;
      }(ANpcCom));
      PlayerCardSetCom.Events = {
        /**卡组变化 */
        CARD_SET_CHG: 'CARD_SET_CHG'
      };

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerCfg.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8811bcT+H1AbJJkBt4vNfTx", "PlayerCfg", undefined);

      var PlayerCfg = exports('default', {
        openingCoin: 0,
        extraOpening: {
          coin: 100
        },
        openCharecter: [0],
        availableCharecter: [0, 1, 2, 3]
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerExploreCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './ExplorePlay.ts', './ANpcCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, EventTarget, tc, ExplorePlay, ANpcCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      ExplorePlay = module.default;
    }, function (module) {
      ANpcCom = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f9618IqMEBDUqc1tZc0eer1", "PlayerExploreCom", undefined);

      var PlayerExploreCom = exports('default', /*#__PURE__*/function (_ANpcCom) {
        _inheritsLoose(PlayerExploreCom, _ANpcCom);

        function PlayerExploreCom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ANpcCom.call.apply(_ANpcCom, [this].concat(args)) || this;
          _this._path = void 0;
          _this._e = void 0;
          _this._diamond = void 0;
          _this._maxCoin = void 0;
          _this._maxHurt = void 0;
          return _this;
        }

        var _proto = PlayerExploreCom.prototype;

        _proto.OnInit = function OnInit() {
          this._e = new EventTarget();
          this._path = [];
          this._diamond = 0;
          this._maxCoin = 0;
          this._maxHurt = 0;
        };

        _proto.load = function load(path, diamond, maxCoin, maxHurt) {
          this._path = path;
          this._diamond = diamond;
          this._maxCoin = maxCoin;
          this._maxHurt = maxHurt;
        };

        _proto.OnDestory = function OnDestory() {
          this._e = null;
          this._path = null;
        };

        _proto.moveTo = function moveTo(stopId) {
          console.log("PlayerExploreCom.moveTo", stopId);
          var lastStop = this.curStopId;

          this._path.push(stopId);

          this._e.emit(PlayerExploreCom.Events.CUR_STOP_CHG, lastStop, stopId);
        };

        _createClass(PlayerExploreCom, [{
          key: "maxCoin",
          get: function get() {
            return this._maxCoin;
          },
          set: function set(value) {
            this._maxCoin = value;
          }
        }, {
          key: "maxHurt",
          get: function get() {
            return this._maxHurt;
          },
          set: function set(value) {
            this._maxHurt = value;
          }
        }, {
          key: "diamond",
          get: function get() {
            return this._diamond;
          },
          set: function set(value) {
            this._diamond = value;
          }
        }, {
          key: "e",
          get: function get() {
            return this._e;
          }
        }, {
          key: "path",
          get: function get() {
            return this._path;
          }
        }, {
          key: "lastStopId",
          get: function get() {
            var _this$_path;

            return (_this$_path = this._path[this._path.length - 2]) != null ? _this$_path : -1;
          }
        }, {
          key: "curStopId",
          get: function get() {
            var _this$_path2;

            return (_this$_path2 = this._path[this._path.length - 1]) != null ? _this$_path2 : -1;
          }
        }, {
          key: "nextStops",
          get: function get() {
            var tree = tc.p(ExplorePlay).tree;

            if (this.curStopId == -1) {
              var maxDep = tree.maxdepth;
              var ret = [];
              tree.walkByMaxDepthOrder(function (n, dep) {
                if (dep === maxDep) {
                  ret.push(n);
                }
              });
              return ret;
            } else {
              return tree.getNode(this.curStopId).parents;
            }
          }
        }]);

        return PlayerExploreCom;
      }(ANpcCom));
      PlayerExploreCom.Events = {
        CUR_STOP_CHG: "CUR_STOP_CHG"
      };

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerFightCardCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FightCard.ts', './ANpcCom.ts', './NpcBuffCom.ts', './BuffId.ts', './PlayerCardSetCom.ts', './FreeList.ts', './Util.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, EventTarget, FightCard, ANpcCom, NpcBuffCom, BuffId, PlayerCardSetCom, FreeList, randomInt, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }, function (module) {
      FightCard = module.default;
    }, function (module) {
      ANpcCom = module.default;
    }, function (module) {
      NpcBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      PlayerCardSetCom = module.PlayerCardSetCom;
    }, function (module) {
      FreeList = module.FreeList;
    }, function (module) {
      randomInt = module.randomInt;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "605c73zbOJBt7NK8GVceK9p", "PlayerFightCardCom", undefined);
      /**组件-处理战斗过程中的卡牌逻辑 */


      var PlayerFightCardCom = exports('default', /*#__PURE__*/function (_ANpcCom) {
        _inheritsLoose(PlayerFightCardCom, _ANpcCom);

        function PlayerFightCardCom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ANpcCom.call.apply(_ANpcCom, [this].concat(args)) || this;
          _this._hand = void 0;
          _this._draw = void 0;
          _this._discard = void 0;
          _this._costed = void 0;
          _this._swallowed = void 0;
          _this._e = void 0;
          _this._handcastLastRound = void 0;

          _this.OnEnterFight = function (fight) {
            _this._initByCardSet();
          };

          _this.OnLeaveFight = function (fight) {
            [_this._hand, _this._draw, _this._discard, _this._costed, _this._swallowed].forEach(function (clist) {
              clist == null ? void 0 : clist.foreach_unsafe(function (c) {
                FightCard.free(c);
                return true;
              });
              clist == null ? void 0 : clist.clear();
            });
            _this._e = null;
          };

          return _this;
        }

        var _proto = PlayerFightCardCom.prototype;

        _proto.OnInit = function OnInit() {
          this._hand = new FreeList();
          this._draw = new FreeList();
          this._discard = new FreeList();
          this._costed = new FreeList();
          this._swallowed = new FreeList();
          this._handcastLastRound = new FreeList();
          this._e = null;
        };

        _proto.OnDestory = function OnDestory() {
          [this._hand, this._draw, this._discard, this._costed, this._swallowed].forEach(function (clist) {
            clist == null ? void 0 : clist.foreach_unsafe(function (c) {
              FightCard.free(c);
              return true;
            });
            clist == null ? void 0 : clist.clear();
          });
          this._hand = null;
          this._draw = null;
          this._discard = null;
          this._costed = null;
          this._swallowed = null;
          this._handcastLastRound = null;
        };

        _proto._initByCardSet = function _initByCardSet() {
          var _this2 = this;

          this._draw = new FreeList(this.npc.c.get(PlayerCardSetCom).sortAsFirstDrawpile().map(function (carId) {
            var card = FightCard.alloc(carId, _this2.npc);
            return card;
          }));
          this._e = new EventTarget();
        }
        /**
         * 抽牌
         * @returns 应抽未抽的牌的数量
         */
        ;

        _proto.draw = function draw(restDraw) {
          var _restDraw,
              _this3 = this;

          restDraw = (_restDraw = restDraw) != null ? _restDraw : this.npc.c.get(NpcBuffCom).numOf(BuffId.draw);

          if (this._draw.length > 0 && restDraw > 0) {
            var draws = this._draw.splice(0, restDraw);

            restDraw -= draws.length;
            draws.forEach(function (c) {
              _this3._hand.push(c);

              c.enterHand();
            });
          }

          this._e.emit(PlayerFightCardCom.Events.DRAW_UPT, this._draw);

          this.emitHandEvent();
          return restDraw;
        };

        _proto.wrapdraw = function wrapdraw(num) {
          this.npc.info.fighterWrap.draw(num);
        };

        _proto.discard = function discard(fightcards) {
          var _this4 = this;

          if (fightcards instanceof FightCard) fightcards = [fightcards];

          if (fightcards.length > 0) {
            fightcards.forEach(function (fc) {
              if (_this4._isInHand(fc)) {
                _this4._hand.remove(fc);

                fc.leaveHand();

                _this4._discard.push(fc);
              } else {
                console.warn(fc, "not in hand.");
              }
            });

            this._e.emit(PlayerFightCardCom.Events.DISCARD_UPT, this._discard);

            this.emitHandEvent();
          }
        };

        _proto.cost = function cost(fc) {
          if (this._isInHand(fc)) {
            this._hand.remove(fc);

            fc.leaveHand();

            this._costed.push(fc);

            this._e.emit(PlayerFightCardCom.Events.COST_UPT, this._costed);

            this.emitHandEvent();
          } else {
            console.warn(fc, "not in hand.");
          }
        }
        /**被吞掉的卡被人物消化 */
        ;

        _proto.swallow = function swallow(fc) {
          if (this._isInHand(fc)) {
            this._hand.remove(fc);

            fc.leaveHand();

            this._swallowed.push(fc);

            this.emitHandEvent();
          } else {
            console.warn(fc, "not in hand.");
          }
        };

        _proto.discardAll = function discardAll() {
          var _this5 = this;

          if (this._hand.length > 0) {
            this.hand.foreach_unsafe(function (c) {
              _this5._discard.push(c);

              c.leaveHand();
              return true;
            });
            this.hand.clear();

            this._e.emit(PlayerFightCardCom.Events.DISCARD_UPT, this._discard);

            this.emitHandEvent();
          }
        };

        _proto.costall = function costall() {
          var _this6 = this;

          if (this._hand.length > 0) {
            this.hand.foreach_unsafe(function (c) {
              _this6._costed.push(c);

              c.leaveHand();
              return true;
            });
            this.hand.clear();

            this._e.emit(PlayerFightCardCom.Events.COST_UPT, this._costed);

            this.emitHandEvent();
          }
        };

        _proto.discard2draw = function discard2draw() {
          this._draw = new FreeList(this._discard.map(function (c) {
            return c;
          }).sort(function () {
            return Math.random() - 0.5;
          }));

          this._discard.clear();

          this.npc.buff.effect(BuffNS.EffectStage.OnShuffle, {
            log: 'playShuffle'
          });

          this._e.emit(PlayerFightCardCom.Events.DRAW_UPT, this._draw);

          this._e.emit(PlayerFightCardCom.Events.DISCARD_UPT, this._discard);
        };

        _proto.addCard2Draw = function addCard2Draw(cardId) {
          var card = FightCard.alloc(cardId, this.npc);

          this._draw.insert(card, randomInt(0, this._draw.length));

          this._e.emit(PlayerFightCardCom.Events.DRAW_UPT, this._draw);
        };

        _proto._isInHand = function _isInHand(fc) {
          return this._hand.indexOf(fc) > -1;
        };

        _proto.emitHandEvent = function emitHandEvent() {
          this._e.emit(PlayerFightCardCom.Events.HAND_CHANGE, this._hand, this._discard, this._costed);
        };

        _proto.recordCardCast = function recordCardCast(id) {
          this._handcastLastRound.push(id);
        };

        _proto.clearLastRoundHandcardCast = function clearLastRoundHandcardCast() {
          this._handcastLastRound.clear();
        };

        _createClass(PlayerFightCardCom, [{
          key: "hand",
          get: function get() {
            return this._hand;
          }
        }, {
          key: "drawpile",
          get: function get() {
            return this._draw;
          }
        }, {
          key: "discardpile",
          get: function get() {
            return this._discard;
          }
        }, {
          key: "costpile",
          get: function get() {
            return this._costed;
          }
        }, {
          key: "handcastLastRound",
          get: function get() {
            return this._handcastLastRound;
          }
        }, {
          key: "e",
          get: function get() {
            return this._e;
          }
        }]);

        return PlayerFightCardCom;
      }(ANpcCom));
      PlayerFightCardCom.Events = {
        DRAW_UPT: "DRAW_UPT",
        DISCARD_UPT: "DISCARD_UPT",
        COST_UPT: "COST_UPT",
        HAND_CHANGE: "HAND_CHANGE"
      };

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerFighterWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GMDlg.ts', './BoneAnim.ts', './UIWrap.ts', './BuffId.ts', './NpcBuffCom.ts', './PlayerFightCardCom.ts', './BuffIconListWrap.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, tween, NpcGMDlg, BoneAnim, UIWrap, BuffId, NpcBuffCom, PlayerFightCardCom, BuffIconListWrap;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
    }, function (module) {
      NpcGMDlg = module.NpcGMDlg;
    }, function (module) {
      BoneAnim = module.BoneAnim;
    }, function (module) {
      UIWrap = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      NpcBuffCom = module.default;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      BuffIconListWrap = module.BuffIconListWrap;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6fe75WCfHxIkpvOUNHo8W+0", "PlayerFighterWrap", undefined);

      var PlayerFighterWrap = exports('PlayerFighterWrap', /*#__PURE__*/function (_UIWrap) {
        _inheritsLoose(PlayerFighterWrap, _UIWrap);

        function PlayerFighterWrap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIWrap.call.apply(_UIWrap, [this].concat(args)) || this;
          _this._modelLod = void 0;
          _this._modelAnim = void 0;
          _this._hp = void 0;
          _this._fighter = void 0;
          _this._dashboard = void 0;
          return _this;
        }

        var _proto = PlayerFighterWrap.prototype;

        _proto.OnInit = function OnInit() {
          this._modelLod = this.getLoader3D("model");
          this._hp = this.getCom("hp").as();
        };

        _proto.setData = function setData(f, dashboard) {
          var _this2 = this;

          var fBuff = f.c.get(NpcBuffCom);
          var _f$info$npcInfo = f.info.npcInfo,
              model = _f$info$npcInfo.model,
              modelScale = _f$info$npcInfo.modelScale,
              modelOffset = _f$info$npcInfo.modelOffset;
          this._fighter = f;
          f.info.setFighterWrap(this);
          this._dashboard = dashboard;
          this._modelAnim = new BoneAnim(this._modelLod, this);

          this._modelAnim.config({
            vAlign: "b",
            align: "c",
            idleAnim: "idle",
            model: model
          });

          this._modelLod.setPosition(this._modelLod.x + modelOffset[0], this._modelLod.y + modelOffset[1]);

          this._modelLod.setScale(modelScale[0], modelScale[1]);

          this._modelLod.setSize(f.info.npcInfo.touchBody[0], f.info.npcInfo.touchBody[1]);

          this._hp.width = f.info.npcInfo.hpWidth;
          this._hp.value = fBuff.numOf(BuffId.hp);
          this._hp.max = fBuff.numOf(BuffId.maxhp);
          this.wrap(BuffIconListWrap, "bufficons").setFighter(f);
          this.addEvt(fBuff.e, NpcBuffCom.Events.BUFF_CHG, this._onAnyBuffChg, this);
          {
            this.getChild('gm').visible = true;
            this.addBtnEvt("gm", function (enableBtn) {
              console.log("logstart");

              _this2._fighter.buff.each(function (b) {
                console.log(b.info.name, b.num);
                return true;
              });

              NpcGMDlg.pop(_this2._fighter);
              console.log("logend");
              enableBtn();
            });
          }
        };

        _proto._onAnyBuffChg = function _onAnyBuffChg(buffId) {
          if (buffId != BuffId.hp && buffId != BuffId.maxhp) return;

          var fBuff = this._fighter.c.get(NpcBuffCom);

          var hp = fBuff.numOf(BuffId.hp);
          this._hp.value = hp;
          this._hp.max = fBuff.numOf(BuffId.maxhp);
        };

        _proto.roundStartDraw = function roundStartDraw(onDrawed) {
          var _this3 = this;

          this._dashboard.onRoundStart();

          var fcc = this._fighter.c.get(PlayerFightCardCom);

          var restDraw = fcc.draw();
          var needReload = restDraw > 0 && fcc.discardpile.length > 0;

          this._dashboard.playHandsIn(fcc.hand, fcc.discardpile, fcc.costpile, function () {
            if (needReload) {
              _this3._dashboard.playShuffle(function () {
                fcc.discard2draw();
                fcc.draw(restDraw);

                _this3._dashboard.playHandsIn(fcc.hand, fcc.discardpile, fcc.costpile, onDrawed, false);
              });
            } else {
              onDrawed();
            }
          }, needReload);
        };

        _proto.draw = function draw(drawNum) {
          var fighterCardCom = this._fighter.c.get(PlayerFightCardCom);

          var restDraw = fighterCardCom.draw(drawNum);
          var needReload = restDraw > 0 && fighterCardCom.discardpile.length > 0;

          if (needReload) {
            this._dashboard.playShuffle(function () {
              fighterCardCom.discard2draw();
              fighterCardCom.draw(restDraw);
            });
          }
        };

        _proto.playAttack = function playAttack(onHit) {
          var scale = 0.1;
          tween(this._modelAnim.lod3d).by(0.1, {
            scaleX: scale,
            scaleY: scale
          }).delay(0.01).call(onHit).delay(0.02).by(0.05, {
            scaleX: -scale,
            scaleY: -scale
          }).start();
        };

        _proto.playSkill = function playSkill(onSkill) {
          tween(this._modelAnim.lod3d).by(0.2, {
            y: -40
          }).by(0.2, {
            y: 40
          }).by(0.2, {
            y: -40
          }).delay(0.04).call(onSkill).by(0.2, {
            y: 40
          }).start();
        };

        _proto.playByskill = function playByskill(onEnd) {
          var oriScaleX = this._modelAnim.lod3d.scaleX;
          var oriScaleY = this._modelAnim.lod3d.scaleY;
          tween(this._modelAnim.lod3d).by(0.2, {
            scaleX: -oriScaleX * 0.3,
            scaleY: oriScaleY * 0.3
          }).delay(0.04).call(onEnd).by(0.1, {
            scaleX: oriScaleX * 0.3,
            scaleY: -oriScaleY * 0.3
          }).start();
        };

        _proto.playByatk = function playByatk(onEnd) {
          if (this._fighter.isDead) return; // this._modelAnim.playAnim("byatk", false, onEnd)

          var oriScaleX = this._modelAnim.lod3d.scaleX;
          var oriScaleY = this._modelAnim.lod3d.scaleY;
          tween(this._modelAnim.lod3d).by(0.1, {
            scaleX: -oriScaleX * 0.3,
            scaleY: -oriScaleY * 0.3
          }).delay(0.02).by(0.1, {
            scaleX: oriScaleX * 0.2,
            scaleY: oriScaleY * 0.2
          }).delay(0.02).by(0.1, {
            scaleX: -oriScaleX * 0.2,
            scaleY: -oriScaleY * 0.2
          }).call(onEnd).delay(0.02).by(0.05, {
            scaleX: oriScaleX * 0.3,
            scaleY: oriScaleY * 0.3
          }).start();
        };

        _proto.playDead = function playDead(onEnd) {
          this._modelAnim.playAnim("die", false, onEnd, null, {
            autoIdle: false
          });
        };

        _proto.playRevive = function playRevive(onRevive) {
          var xSign = this._modelAnim.lod3d.scaleX > 0 ? 1 : -1;
          var ySign = this._modelAnim.lod3d.scaleY > 0 ? 1 : -1;
          var scale1 = -0.1;
          var sclae2 = 0.2;
          var scale3 = -0.1;
          tween(this._modelAnim.lod3d).by(0.1, {
            scaleX: scale1 * xSign,
            scaleY: scale1 * ySign
          }).delay(0.02).by(0.1, {
            scaleX: sclae2 * xSign,
            scaleY: sclae2 * ySign
          }).delay(0.02).by(0.1, {
            scaleX: scale3 * xSign,
            scaleY: scale3 * ySign
          }).call(onRevive).delay(0.02).start();
        };

        _proto.playFakeDead = function playFakeDead() {
          this._hp.visible = false;
          var oriScaleX = this._modelAnim.lod3d.scaleX;
          var oriScaleY = this._modelAnim.lod3d.scaleY;
          tween(this._modelAnim.lod3d).by(0.1, {
            scaleX: -oriScaleX * 0.1,
            scaleY: -oriScaleY * 0.1
          }).delay(0.02).by(0.1, {
            scaleX: oriScaleX * 0.1,
            scaleY: oriScaleY * 0.1
          }).delay(0.02).by(0.1, {
            scaleX: -oriScaleX * 0.1,
            scaleY: -oriScaleY * 0.1
          }).delay(0.02).by(0.05, {
            scaleX: oriScaleX * 0.1,
            scaleY: oriScaleY * 0.1
          }).start();
        };

        return PlayerFighterWrap;
      }(UIWrap));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerPlay.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs', './PlayerCfg.ts', './UserKit.ts', './tc.ts', './ExplorePlay.ts', './PlayerSaveCom.ts', './Player.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, PlayBase, PlayerCfg, UserKit, tc, ExplorePlay, PlayerSaveCom, Player;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlayBase = module.PlayBase;
    }, function (module) {
      PlayerCfg = module.default;
    }, function (module) {
      UserKit = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      ExplorePlay = module.default;
    }, function (module) {
      PlayerSaveCom = module.PlayerSaveCom;
    }, function (module) {
      Player = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3940cPPE65JxKMSsrTO/RWZ", "PlayerPlay", undefined);

      var PlayerPlay = exports('default', /*#__PURE__*/function (_PlayBase) {
        _inheritsLoose(PlayerPlay, _PlayBase);

        function PlayerPlay() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _PlayBase.call.apply(_PlayBase, [this].concat(args)) || this;
          _this.playName = "PlayerPlay";
          _this._player = null;
          return _this;
        }

        var _proto = PlayerPlay.prototype;

        _proto.OnInit = function OnInit(complete) {
          complete();
        };

        _proto.OnLateInit = function OnLateInit(complete) {
          complete();
        };

        _proto.OnDispose = function OnDispose() {
          var _this$_player;

          (_this$_player = this._player) == null ? void 0 : _this$_player.Dispose();
        };

        _proto.createPlayerFromUserdata = function createPlayerFromUserdata() {
          var p = this.createPlayer(tc.k(UserKit).playerSave.heroId);
          tc.p(PlayerPlay).player.c.get(PlayerSaveCom).load();
          tc.p(ExplorePlay).buildTree(this.player.seed.mapSeed);
          return p;
        };

        _proto.createPlayer = function createPlayer(playerNpcId) {
          this._player = new Player(playerNpcId);
          tc.p(ExplorePlay).buildTree(this.player.seed.mapSeed);
          return this._player;
        };

        _proto.disposePlayer = function disposePlayer() {
          this._player.Dispose();
        };

        _proto.checkHeroUnlock = function checkHeroUnlock(npcId) {
          return PlayerCfg.openCharecter.includes(npcId) || tc.k(UserKit).heroUnlock.includes(npcId);
        };

        _proto.unlockHero = function unlockHero(npcId) {
          var data = tc.k(UserKit).heroUnlock;
          data.push(npcId);
          tc.k(UserKit).heroUnlock = data;
        };

        _createClass(PlayerPlay, [{
          key: "player",
          get: function get() {
            return this._player;
          }
        }]);

        return PlayerPlay;
      }(PlayBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerPreparCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PlayerCfg.ts', './tc.ts', './BuffId.ts', './PlayerPlay.ts', './ANpcCom.ts', './PlayerCardSetCom.ts', './PlayerTreasureCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PlayerCfg, tc, BuffId, PlayerPlay, ANpcCom, PlayerCardSetCom, PlayerTreasureCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlayerCfg = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      ANpcCom = module.default;
    }, function (module) {
      PlayerCardSetCom = module.PlayerCardSetCom;
    }, function (module) {
      PlayerTreasureCom = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ccd1bvHUNBA/48T5VIGWdkR", "PlayerPreparCom", undefined);

      var PlayerPreparCom = exports('PlayerPreparCom', /*#__PURE__*/function (_ANpcCom) {
        _inheritsLoose(PlayerPreparCom, _ANpcCom);

        function PlayerPreparCom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ANpcCom.call.apply(_ANpcCom, [this].concat(args)) || this;
          _this._preparActived = void 0;

          _this.OnLateInit = function () {
            if (!_this.npc.info.isPlayer) throw "PlayerPreparCom need npc is a Player"; // const lastOpeningSet = this._lastUserOpeningSet = tc.k(UserKit).openingSet;
            // this._openingExtraCoin = lastOpeningSet.extracoin ?? false;
            // this._openingExtraTreasure = lastOpeningSet.extratreasure ?? false;

            _this._preparActived = false;
          };

          return _this;
        }

        var _proto = PlayerPreparCom.prototype; // private _lastUserOpeningSet: UserOpeningSet;
        // private _openingExtraCoin: boolean;
        // private _openingExtraTreasure: boolean;
        // public get openingExtraCoin(): boolean {
        //     return this._openingExtraCoin;
        // }
        // public get openingExtraTreasure(): boolean {
        //     return this._openingExtraTreasure;
        // }

        _proto.OnInit = function OnInit() {};

        _proto.OnDestory = function OnDestory() {} // public setOpeningExtraCoin(value: boolean) {
        //     this._openingExtraCoin = value;
        //     // this._lastUserOpeningSet.extracoin = value;
        //     // this._saveUserOpeningSet()
        // }
        // public setOpeningExtraTreasure(value: boolean) {
        //     this._openingExtraTreasure = value;
        //     // this._lastUserOpeningSet.extratreasure = value;
        //     // this._saveUserOpeningSet()
        // }
        // private _saveUserOpeningSet() {
        //     tc.k(UserKit).openingSet = this._lastUserOpeningSet;
        // }

        /**获取开局礼物 */
        ;

        _proto.claimOpenGift = function claimOpenGift() {
          if (this._preparActived) {
            console.error("already actived");
            return;
          }

          var player = tc.p(PlayerPlay).player;
          var coinNum = PlayerCfg.openingCoin;
          var cardSet = player.info.npcInfo.getVal("openCards").split("|").map(function (idStr) {
            return parseInt(idStr);
          });
          var treasures = [player.info.openingTreasureId]; // if (this._openingExtraCoin) coinNum += PlayerCfg.extraOpening.coin;
          // if (this._openingExtraTreasure) treasures.push(tc.p(TreasurePlay).randomNonOwnTreasure(1)[0]);

          player.c.get(PlayerCardSetCom).setCards(cardSet);
          player.buff.mod(BuffId.coin, coinNum, {
            write: true
          });
          treasures.forEach(function (t) {
            return player.c.get(PlayerTreasureCom).add(t);
          });
          this._preparActived = true;
        };

        return PlayerPreparCom;
      }(ANpcCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerSaveCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UserKit.ts', './tc.ts', './BuffId.ts', './ANpcCom.ts', './PlayerTreasureCom.ts', './PlayerCardSetCom.ts', './PlayerExploreCom.ts', './PlayerSeedCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, UserKit, tc, BuffId, ANpcCom, PlayerTreasureCom, PlayerCardSetCom, PlayerExploreCom, PlayerSeedCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UserKit = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      ANpcCom = module.default;
    }, function (module) {
      PlayerTreasureCom = module.default;
    }, function (module) {
      PlayerCardSetCom = module.PlayerCardSetCom;
    }, function (module) {
      PlayerExploreCom = module.default;
    }, function (module) {
      PlayerSeedCom = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4f792PPUzhLDKuuoILJME5W", "PlayerSaveCom", undefined);
      /**处理玩家数据存储的组件 */


      var PlayerSaveCom = exports('PlayerSaveCom', /*#__PURE__*/function (_ANpcCom) {
        _inheritsLoose(PlayerSaveCom, _ANpcCom);

        function PlayerSaveCom() {
          return _ANpcCom.apply(this, arguments) || this;
        }

        var _proto = PlayerSaveCom.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnDestory = function OnDestory() {};

        _proto.load = function load() {
          var playerSave = tc.k(UserKit).playerSave;
          this.npc.buff.mod(BuffId.coin, playerSave.coin, {
            write: true
          });
          this.npc.buff.mod(BuffId.hp, playerSave.hp, {
            write: true
          });
          this.npc.buff.mod(BuffId.maxhp, playerSave.maxhp, {
            write: true
          });
          this.npc.c.get(PlayerCardSetCom).setCards(playerSave.cardset);
          this.npc.c.get(PlayerTreasureCom).recover(playerSave.treasuersLog, playerSave.treasures);
          this.npc.c.get(PlayerExploreCom).load(playerSave.path, playerSave.diamond, playerSave.records.maxCoin, playerSave.records.maxHurt);
          this.npc.c.get(PlayerSeedCom).load(playerSave.mapSeed, playerSave.seedOffset);
        };

        _proto.save = function save() {
          var pExp = this.npc.c.get(PlayerExploreCom);
          tc.k(UserKit).playerSave = {
            heroId: this.npc.id,
            cardset: this.npc.c.get(PlayerCardSetCom).cards,
            treasures: this.npc.c.get(PlayerTreasureCom).treasures.map(function (t) {
              return t.id;
            }),
            treasuersLog: this.npc.c.get(PlayerTreasureCom).treasuresLog,
            coin: this.npc.buff.numOf(BuffId.coin),
            hp: this.npc.buff.numOf(BuffId.hp),
            maxhp: this.npc.buff.numOf(BuffId.maxhp),
            path: pExp.path,
            diamond: pExp.diamond,
            mapSeed: this.npc.c.get(PlayerSeedCom).mapSeed,
            seedOffset: this.npc.c.get(PlayerSeedCom).seedOffset,
            records: {
              maxCoin: pExp.maxCoin,
              maxHurt: pExp.maxHurt
            }
          };
        };

        return PlayerSaveCom;
      }(ANpcCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerSeedCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Util.ts', './ANpcCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, randomInt, ANpcCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      randomInt = module.randomInt;
    }, function (module) {
      ANpcCom = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5ad76LN9CRINbur0AC/nOhJ", "PlayerSeedCom", undefined);

      var PlayerSeedCom = exports('default', /*#__PURE__*/function (_ANpcCom) {
        _inheritsLoose(PlayerSeedCom, _ANpcCom);

        function PlayerSeedCom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ANpcCom.call.apply(_ANpcCom, [this].concat(args)) || this;
          _this._mapSeed = void 0;
          _this._seedOffset = void 0;
          return _this;
        }

        var _proto = PlayerSeedCom.prototype;

        _proto.load = function load(mapSeed, seedOffset) {
          this._mapSeed = mapSeed;
          this._seedOffset = seedOffset;
        };

        _proto.OnInit = function OnInit() {
          this._mapSeed = randomInt(900000, 9000000);
          this._seedOffset = 0;
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.step = function step() {
          this._seedOffset += randomInt(1, 30, this.seed);
        };

        _createClass(PlayerSeedCom, [{
          key: "seed",
          get: function get() {
            return this._mapSeed + this._seedOffset;
          }
        }, {
          key: "mapSeed",
          get: function get() {
            return this._mapSeed;
          }
        }, {
          key: "seedOffset",
          get: function get() {
            return this._seedOffset;
          }
        }]);

        return PlayerSeedCom;
      }(ANpcCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerTreasureCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Util.ts', './Treasure.ts', './TreasureEffectStage.ts', './ANpcCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, EventTarget, isNull, Treasure, TreasureEffectStage, ANpcCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }, function (module) {
      isNull = module.isNull;
    }, function (module) {
      Treasure = module.default;
    }, function (module) {
      TreasureEffectStage = module.TreasureEffectStage;
    }, function (module) {
      ANpcCom = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "17981o5emJAeLItw9YWlU58", "PlayerTreasureCom", undefined);

      var PlayerTreasureCom = exports('default', /*#__PURE__*/function (_ANpcCom) {
        _inheritsLoose(PlayerTreasureCom, _ANpcCom);

        function PlayerTreasureCom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ANpcCom.call.apply(_ANpcCom, [this].concat(args)) || this;
          _this._treasures = void 0;
          _this._treasuresLog = void 0;
          _this._e = void 0;
          return _this;
        }

        var _proto = PlayerTreasureCom.prototype;

        _proto.OnInit = function OnInit() {
          this._treasures = [];
          this._treasuresLog = {};
          this._e = new EventTarget();
        };

        _proto.OnDestory = function OnDestory() {
          this._treasures = null;
          this._treasuresLog = null;
          this._e = null;
        }
        /**
         * 增加宝物，如果已经存在则不会重复添加。
         */
        ;

        _proto.add = function add(tid) {
          if (this._treasures.find(function (t) {
            return t.id === tid;
          })) {
            console.warn("the treasure to add already exist");
            return;
          }

          var t = new Treasure(tid, this.npc);

          this._treasures.push(t);

          t.effect(TreasureEffectStage.OnGet);

          this._e.emit(PlayerTreasureCom.Events.TREASURE_CHG);
        };

        _proto.get = function get(tid) {
          return this._treasures.find(function (t) {
            return t.id === tid;
          });
        }
        /**恢复宝物 */
        ;

        _proto.recover = function recover(log, tidArr) {
          var _this2 = this;

          this._treasuresLog = log;
          tidArr.forEach(function (tid) {
            var t = new Treasure(tid, _this2.npc);

            _this2._treasures.push(t);

            t.effect(TreasureEffectStage.OnRecover);
          });

          this._e.emit(PlayerTreasureCom.Events.TREASURE_CHG);
        };

        _proto.out = function out(_out) {
          var toOutIdx = this._treasures.findIndex(function (t) {
            return t.id === _out.id;
          });

          if (toOutIdx < 0) {
            console.error("the treasure to out not exist");
            return;
          }

          this._treasures[toOutIdx].effect(TreasureEffectStage.OnOut);

          this._treasures.splice(toOutIdx, 1);

          delete this._treasuresLog[_out.id];
          console.log("失去遗物 " + _out + " " + _out.info.name);

          this._e.emit(PlayerTreasureCom.Events.TREASURE_CHG);
        };

        _proto.has = function has(tid) {
          return !!this._treasures.find(function (t) {
            return t.id == tid;
          });
        }
        /**宝物生效 */
        ;

        _proto.effect = function effect(stage, arg) {
          this._treasures.forEach(function (t) {
            return t.effect(stage, arg);
          });
        };

        _proto.reviseLog = function reviseLog(id, subkey, val) {
          this._treasuresLog[id] = this._treasuresLog[id] || {};

          if (isNull(val)) {
            delete this._treasuresLog[id][subkey];
            return;
          }

          this._treasuresLog[id][subkey] = val;
        };

        _proto.getLog = function getLog(id, subkey) {
          return this._treasuresLog[id] && this._treasuresLog[id][subkey];
        };

        _createClass(PlayerTreasureCom, [{
          key: "treasures",
          get: function get() {
            return this._treasures;
          } // help to recover treasuers effect after reload save.

        }, {
          key: "treasuresLog",
          get: function get() {
            return this._treasuresLog;
          }
        }, {
          key: "e",
          get: function get() {
            return this._e;
          }
        }]);

        return PlayerTreasureCom;
      }(ANpcCom));
      PlayerTreasureCom.Events = {
        TREASURE_CHG: "TREASURE_CHG"
      };

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PoisonCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './TreasureId.ts', './TreasurePlay.ts', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, tc, TreasureId, TreasurePlay, ABuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      TreasurePlay = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bdf96b3kNxGN6Uor2dr3g3V", "PoisonCom", undefined);

      var PoisonCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(PoisonCom, _ABuffCom);

        function PoisonCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = PoisonCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.RoundEnd, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.RoundEnd) {
            var num = this.buff.num;
            var owner = this.owner; // console.log("毒发 -" + this.buff.num);

            owner.cutHp(num, null, this.buff.info.name);

            if (owner.isTrueDead && owner.buff.isMorethan(BuffId.DunangZz, 0)) {
              var nextTeammate = owner.info.getLiveTeammates()[0];

              if (nextTeammate) {
                nextTeammate.buff.mod(BuffId.poison, num);
                tc.p(TreasurePlay).pop(TreasureId.Dunang);
              }
            }
          }
        };

        return PoisonCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PojiadBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f9043R6FmxPhbMgT/r7IJWw", "PojiadBuff", undefined); // 战斗开始时，所有敌方单位，获得【num】层易伤


      var PojiadBuff = exports('PojiadBuff', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(PojiadBuff, _ATreasureBuffCom);

        function PojiadBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = PojiadBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.RoundStart, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          var _this = this;

          if (stage == BuffNS.EffectStage.RoundStart) {
            if (this.owner.actNum == 0) {
              this.owner.info.getLiveEnemys().forEach(function (e) {
                e.buff.mod(BuffId.fragile, _this.buff.num);
              });
            }
          }
        };

        _createClass(PojiadBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Pojiad;
          }
        }]);

        return PojiadBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PoolModule.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c1581nowHZCHr6X81qNBjLc", "PoolModule", undefined);

      var PoolModule = exports('PoolModule', /*#__PURE__*/function () {
        function PoolModule(_ctor, _dtor) {
          this._pool = void 0;
          this._ctor = _ctor;
          this._dtor = _dtor;
          this._pool = [];
        }

        var _proto = PoolModule.prototype;

        _proto.alloc = function alloc() {
          if (this._pool.length > 0) {
            return this._pool.shift();
          } else {
            return this._ctor();
          }
        };

        _proto.free = function free(o) {
          var _this$_dtor;

          (_this$_dtor = this._dtor) == null ? void 0 : _this$_dtor.call(this, o);

          this._pool.push(o);
        };

        return PoolModule;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PreparCfg.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3270aKjPWFJEoAh5901OFh7", "PreparCfg", undefined);

      var PreparCfg = exports('default', {
        videoDiamond: 100,
        unlockTreasureCost: 50,
        unlockCardCost: 50,
        extraCoin: 100
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PreparDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PreparCfg.ts', './DlgBase.ts', './UserKit.ts', './AdPlay.ts', './tc.ts', './ItemFly.ts', './PreparItem.ts', './PreparWrap.ts', './BgDlg.ts', './BookDlg.ts', './ExploreDlg.ts', './TipDlg.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, PreparCfg, DlgBase, UserKit, AdPlay, tc, ItemFly, PreparItem, PreparWrap, Bg, BookDlg, ExploreDlg, TipDlg;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PreparCfg = module.default;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      UserKit = module.default;
    }, function (module) {
      AdPlay = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      ItemFly = module.default;
    }, function (module) {
      PreparItem = module.PreparItem;
    }, function (module) {
      PreparWrap = module.PreparWrap;
    }, function (module) {
      Bg = module.Bg;
    }, function (module) {
      BookDlg = module.BookDlg;
    }, function (module) {
      ExploreDlg = module.ExploreDlg;
    }, function (module) {
      TipDlg = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "776acdtqO9FKoYUPjnzsbAH", "PreparDlg", undefined);

      var PreparDlg = exports('PreparDlg', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(PreparDlg, _DlgBase);

        function PreparDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._addDiamond = void 0;
          _this._list = void 0;
          return _this;
        }

        var _proto = PreparDlg.prototype;

        _proto.OnInit = function OnInit() {
          var _this2 = this;

          Bg.me.onScene('fight');
          this._list = this.getList("list");
          this._addDiamond = this.getBtn("addDiamod");
          this.addBtnEvt(this._addDiamond, function (enableBtn) {
            tc.p(AdPlay).playAd({
              onAdRwd: function onAdRwd() {
                tc.k(UserKit).diamond += 100;
                ItemFly.flyDiamond(100, _this2._addDiamond);
                TipDlg.pop("\u5DF2\u83B7\u5F97" + PreparCfg.videoDiamond + "\u94BB\u77F3\uFF01");
                enableBtn();
              },
              onAdFail: enableBtn,
              onNotSupport: enableBtn
            });
          });
          this.addBtnEvt("start", function (enableBtn) {
            // tc.k(UserKit).gameState = UserGameState.Exploreing;
            // pplay.player.c.get(PlayerSaveCom).save();
            // this.dlgKit.fetchDlg(TopbarDlg);
            // this.close();
            ExploreDlg.show('open');
            enableBtn();
          }); // this.addBtnEvt("back", (enableBtn) => {
          //     AlertDlg.pop({
          //         tip: "放弃本局游戏并返回主界面？",
          //         onYes: () => {
          //             tc.k(UserKit).dropgame();
          //             pplay.disposePlayer();
          //             this.dlgKit.fetchDlg(EntryDlg);
          //             this.close();
          //         },
          //         yesText: "放弃",
          //         onNo: () => {
          //             enableBtn();
          //         },
          //         noText: "取消",
          //     })
          // })

          this.addBtnEvt("book", function (enableBtn) {
            _this2.dlgKit.fetchDlg(BookDlg);

            enableBtn();
          });

          for (var i = 0; i < 4; i++) {
            var preparItem = PreparItem.coin + i;
            var itemWrap = this.wrap(PreparWrap, this._list.addItemFromPool());
            itemWrap.refresh(preparItem);
          }
        };

        _proto.OnGetBgAlpha = function OnGetBgAlpha() {
          return 0;
        };

        _createClass(PreparDlg, [{
          key: "dlgRes",
          get: function get() {
            return "PreparDlg";
          }
        }]);

        return PreparDlg;
      }(DlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PreparItem.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('PreparItem', void 0);

      cclegacy._RF.push({}, "a2900TS+0lIFbqgr1NUQHfc", "PreparItem", undefined);

      var PreparItem;

      (function (PreparItem) {
        PreparItem[PreparItem["coin"] = 0] = "coin";
        PreparItem[PreparItem["treasure"] = 1] = "treasure";
        PreparItem[PreparItem["unlockCard"] = 2] = "unlockCard";
        PreparItem[PreparItem["unlockTreasure"] = 3] = "unlockTreasure";
      })(PreparItem || (PreparItem = exports('PreparItem', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PreparReviveAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, IntensionCfg, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1c5a7GKGzdPs6P13KSzQLRU", "PreparReviveAct", undefined); // @deprecated 目前不需要


      var PreparReviveAct = exports('PreparReviveAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(PreparReviveAct, _ActBase);

        function PreparReviveAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = PreparReviveAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.revive,
            iconTip: '',
            title: "连携",
            content: "\u5373\u5C06\u590D\u6D3B"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          this.skill_act_over(function () {}, onOver);
        };

        return PreparReviveAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PreparWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PreparCfg.ts', './UIWrap.ts', './UserKit.ts', './AdPlay.ts', './BuffId.ts', './CardPlay.ts', './PlayerPlay.ts', './TreasurePlay.ts', './tc.ts', './CardRwdDlg.ts', './LoadingDlg.ts', './TipDlg.ts', './TreasureRwdDlg.ts', './PreparItem.ts', './ItemFly.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PreparCfg, UIWrap, UserKit, AdPlay, BuffId, CardPlay, PlayerPlay, TreasurePlay, tc, CardRwdDlg, LoadingDlg, TipDlg, TreasureRwdDlg, PreparItem, ItemFly;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PreparCfg = module.default;
    }, function (module) {
      UIWrap = module.default;
    }, function (module) {
      UserKit = module.default;
    }, function (module) {
      AdPlay = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      TreasurePlay = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardRwdDlg = module.default;
    }, function (module) {
      LoadingDlg = module.default;
    }, function (module) {
      TipDlg = module.default;
    }, function (module) {
      TreasureRwdDlg = module.default;
    }, function (module) {
      PreparItem = module.PreparItem;
    }, function (module) {
      ItemFly = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "54551KIJ31F04c23KhcoLLH", "PreparWrap", undefined);

      var PreparWrap = exports('PreparWrap', /*#__PURE__*/function (_UIWrap) {
        _inheritsLoose(PreparWrap, _UIWrap);

        function PreparWrap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIWrap.call.apply(_UIWrap, [this].concat(args)) || this;
          _this._dcost = void 0;
          _this._claim = void 0;
          _this._rwdCtrl = void 0;
          return _this;
        }

        var _proto = PreparWrap.prototype;

        _proto.OnInit = function OnInit() {
          var _this2 = this;

          var cplay = tc.p(CardPlay);
          var tplay = tc.p(TreasurePlay);
          var pplay = tc.p(PlayerPlay);
          var player = pplay.player;
          var itemicon = this.getChild("itemicon");
          this._dcost = this.getChild("dcost").asTextField;
          this._claim = this.getChild("claim").asBtn;
          this._rwdCtrl = this.getController("rwd");
          this.addBtnEvt(this._claim, function (enableBtn) {
            var curItem = _this2._rwdCtrl.selectedIndex;

            if (curItem == PreparItem.unlockCard) {
              if (tc.k(UserKit).diamond < PreparCfg.unlockCardCost) {
                TipDlg.pop("钻石不足！");
                enableBtn();
                return;
              }

              tc.k(UserKit).diamond -= PreparCfg.unlockCardCost;

              if (cplay.lockingCardNum < 1) {
                TipDlg.pop("你已经解锁了全部卡牌！");
                enableBtn();
              } else {
                LoadingDlg.delay(1, function () {
                  CardRwdDlg.popView("解锁卡牌", cplay.unlockcard(3));
                  enableBtn();
                });
              }
            } else if (curItem == PreparItem.unlockTreasure) {
              if (tc.k(UserKit).diamond < PreparCfg.unlockCardCost) {
                TipDlg.pop("钻石不足！");
                enableBtn();
                return;
              }

              tc.k(UserKit).diamond -= PreparCfg.unlockTreasureCost;

              if (tplay.lockingNum < 1) {
                TipDlg.pop("你已经解锁了全部宝藏！");
                enableBtn();
              } else {
                LoadingDlg.delay(1, function () {
                  TreasureRwdDlg.pop(tplay.unlockTreasure(1)[0], "unlock", enableBtn);
                });
              }
            } else if (curItem == PreparItem.coin) {
              tc.p(AdPlay).playAd({
                onAdRwd: function onAdRwd() {
                  var coin = PreparCfg.extraCoin;
                  ItemFly.flyCoin(coin, itemicon);
                  TipDlg.pop("已获取金币");
                  player.buff.mod(BuffId.coin, coin);
                  _this2._claim.alpha = 0.5;
                },
                onAdFail: function onAdFail() {
                  enableBtn();
                }
              });
            } else if (curItem == PreparItem.treasure) {
              tc.p(AdPlay).playAd({
                onAdRwd: function onAdRwd() {
                  var tid = tplay.randomNonOwnTreasure(1)[0];
                  ItemFly.flyTreasure(0.1, 1, tid, function () {
                    player.treasure.add(tid);
                  }, itemicon);
                  _this2._claim.alpha = 0.5;
                },
                onAdFail: function onAdFail() {
                  enableBtn();
                }
              });
            }
          });
        };

        _proto.refresh = function refresh(i) {
          this._rwdCtrl.selectedIndex = i;
          if (i == PreparItem.unlockCard) this._dcost.text = PreparCfg.unlockCardCost.toString();else if (i == PreparItem.unlockTreasure) this._dcost.text = PreparCfg.unlockTreasureCost.toString();
        };

        return PreparWrap;
      }(UIWrap));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PreviewCardWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CardCfg.ts', './UIWrap.ts', './CardPlay.ts', './FightCard.ts', './tc.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, Color, CardCfg, UIWrap, CardPlay, FightCard, tc;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
    }, function (module) {
      CardCfg = module.default;
    }, function (module) {
      UIWrap = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      FightCard = module.default;
    }, function (module) {
      tc = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f441a06iC5CDpjXc4/eI/7K", "PreviewCardWrap", undefined);

      var PreviewCardWrap = exports('PreviewCardWrap', /*#__PURE__*/function (_UIWrap) {
        _inheritsLoose(PreviewCardWrap, _UIWrap);

        function PreviewCardWrap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIWrap.call.apply(_UIWrap, [this].concat(args)) || this;
          _this._counter = void 0;
          _this._nameText = void 0;
          _this._skinLoader = void 0;
          _this._descText = void 0;
          _this._costTxt = void 0;
          _this._lastFc = void 0;
          _this._isCost = void 0;
          _this._frame = void 0;
          return _this;
        }

        var _proto = PreviewCardWrap.prototype;

        _proto.OnInit = function OnInit() {
          this._counter = 0;
          this._nameText = this.getTxt("name");
          this._skinLoader = this.getLoader("skin");
          this._descText = this.getTxt('desc');
          this._costTxt = this.getTxt('cost');
          this._isCost = this.getChild("isCost");
          this._frame = this.getLoader("frame");
        };

        _proto.OnClose = function OnClose() {};

        _proto.showFightCard = function showFightCard(fc) {
          if (this._lastFc) {
            this._lastFc.e.off(FightCard.Events.CASTED, this._onCasted, this);

            this._lastFc.e.off(FightCard.Events.DESC_CHANGE, this._onDescChange, this);
          }

          this._nameText.text = fc.info.name;
          this._skinLoader.url = fc.info.skin;
          this._descText.text = fc.desc;
          this._costTxt.visible = !fc.info.cantUse;
          this._costTxt.text = fc.cost < 0 ? 'X' : '' + fc.cost;
          this._isCost.visible = fc.isCost;
          this._frame.color = new Color(CardCfg.color[fc.info.rare]);
          fc.e.on(FightCard.Events.CASTED, this._onCasted, this);
          fc.e.on(FightCard.Events.DESC_CHANGE, this._onDescChange, this);
          this._lastFc = fc;
          this.show();
          this._counter++;
        };

        _proto.showCard = function showCard(cardId, onClick) {
          var cardPlay = tc.p(CardPlay);
          var info = cardPlay.infoOf(cardId);
          this._nameText.text = info.name;
          this._skinLoader.url = info.skin;
          this._descText.text = info.desc.replace(/###.*/g, "");
          this._frame.color = new Color(CardCfg.color[info.rare]); // this._descText.text = info.desc.replace(/###.*/g, "") + (info.isCost ? FightCfg.cardCostTip : "");

          this._costTxt.text = info.cost < 0 ? 'X' : '' + info.cost;
          this._isCost.visible = info.isCost;
          this.addBtnEvt("", function (enableBtn) {
            onClick == null ? void 0 : onClick(cardId);
            enableBtn();
          });
        };

        _proto.hideWithCountCheck = function hideWithCountCheck() {
          this._counter--;
          if (this._counter < 1) this.hide();
        };

        _proto._onCasted = function _onCasted() {
          this._counter = 0;
          this.hide();
        };

        _proto._onDescChange = function _onDescChange(newDesc) {
          this._descText.text = newDesc;
        };

        return PreviewCardWrap;
      }(UIWrap));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ProcessSys.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, game, SysBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      game = module.game;
    }, function (module) {
      SysBase = module.SysBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d3b43m4fWpEPqCfRTfF5XXj", "ProcessSys", undefined);
      /**提供进程相关接口 */


      var ProcessSys = exports('default', /*#__PURE__*/function (_SysBase) {
        _inheritsLoose(ProcessSys, _SysBase);

        function ProcessSys() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _SysBase.call.apply(_SysBase, [this].concat(args)) || this;
          _this.sysName = "ProcessSys";
          return _this;
        }

        var _proto = ProcessSys.prototype;

        _proto.OnInit = function OnInit(complete) {
          complete();
        };

        _proto.OnLateInit = function OnLateInit(complete) {
          complete();
        };

        _proto.OnDispose = function OnDispose() {};

        _proto.exit = function exit() {
          game.end();
        };

        return ProcessSys;
      }(SysBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/QiangtouBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './CardPlay.ts', './TreasureId.ts', './ABuffCom.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, tc, CardPlay, TreasureId, ABuffCom, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "12cf9BnpdNN8LdyydyjnDJf", "QiangtouBuff", undefined); // 打出的第7张攻击牌，攻击值翻倍


      var QiangtouBuff = exports('QiangtouBuff', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(QiangtouBuff, _ATreasureBuffCom);

        function QiangtouBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = QiangtouBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.OnAdd, BuffNS.EffectOrder.base);
          this.setOrder(BuffNS.EffectStage.AnyHandCardUsed, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.AnyHandCardUsed) {
            if (tc.p(CardPlay).isAttack(arg.cardUsed)) {
              var newCounter = this.counterNum;
              newCounter += 1;

              if (newCounter == 6) {
                this.owner.buff.mod(BuffId.QiangtouZf, 1);
              }

              if (newCounter == 7) {
                this.popWrap();
                newCounter = 0;
              }

              this.reviseNum(newCounter);
            }
          } else if (stage == BuffNS.EffectStage.OnAdd) {
            if (this.counterNum == 6) {
              this.owner.buff.mod(BuffId.QiangtouZf, 1);
            }
          }
        };

        _createClass(QiangtouBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Qiangtou;
          }
        }]);

        return QiangtouBuff;
      }(ATreasureBuffCom)); // 下一张攻击牌伤害翻倍

      var QiangtouZfBuff = exports('QiangtouZfBuff', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(QiangtouZfBuff, _ABuffCom);

        function QiangtouZfBuff() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto2 = QiangtouZfBuff.prototype;

        _proto2.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.AnyHandCardUsed, BuffNS.EffectOrder.base);
        };

        _proto2.OnDestory = function OnDestory() {};

        _proto2.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.AnyHandCardUsed) {
            if (tc.p(CardPlay).infoOf(arg.cardUsed).isAttack) {
              this.owner.buff.rm(this.buff.id);
            }
          }
        };

        return QiangtouZfBuff;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/QiangzhuangBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './NpcBuffCom.ts', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, NpcBuffCom, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      NpcBuffCom = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "36d87lECC9KNr/vGliY/y3E", "QiangzhuangBuff", undefined);

      var QiangzhuangBuff = exports('default', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(QiangzhuangBuff, _ATreasureBuffCom);

        function QiangzhuangBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = QiangzhuangBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.HandCardIn, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HandCardIn) {
            if (this.actNum == 0) {
              this.buff.owner.c.get(NpcBuffCom).mod(BuffId.power, this.buff.num);
              this.popWrap();
            }
          }
        };

        _createClass(QiangzhuangBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Qiangzhuang;
          }
        }]);

        return QiangzhuangBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/QiegqBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ccbf6ruJmtEiJnTYrWSsdvs", "QiegqBuff", undefined);

      var QiegqBuff = exports('QiegqBuff', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(QiegqBuff, _ABuffCom);

        function QiegqBuff() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = QiegqBuff.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.AnyHandCardUsed, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          var _this = this;

          if (stage == BuffNS.EffectStage.AnyHandCardUsed) {
            this.owner.info.getLiveEnemys().forEach(function ($) {
              $.getHit(_this.buff.num, _this.owner, _this.buff.info.name);
            });
          }
        };

        return QiegqBuff;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/QifeiAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './tc.ts', './BuffId.ts', './BuffPlay.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, IntensionCfg, tc, BuffId, BuffPlay, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffPlay = module.default;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5b2433bux1GfrbSj4qB/T0K", "QifeiAct", undefined);

      var QifeiAct = exports('QifeiAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(QifeiAct, _ActBase);

        function QifeiAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = QifeiAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.tactics,
            iconTip: '',
            title: "起飞",
            content: "\u8FD9\u540D\u654C\u4EBA\u5C06\u91CD\u65B0\u8D77\u98DE"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.skill_act_over(function () {
            _this.actor.buff.mod(BuffId.Feixing, parseInt(tc.p(BuffPlay).propOf(BuffId.Feixing).times));
          }, onOver);
        };

        return QifeiAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/QishiAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BuffId.ts', './ChujueAct.ts', './JuheAct.ts', './MengjiAct.ts', './MulAttackAct.ts', './NpcAIBase.ts', './XuliAct.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, BuffId, ChujueAct, JuheAct, MengjiAct, MulAttackAct, NpcAIBase, XuliAct;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      ChujueAct = module.ChujueAct;
    }, function (module) {
      JuheAct = module.JuheAct;
    }, function (module) {
      MengjiAct = module.MengjiAct;
    }, function (module) {
      MulAttackAct = module.default;
    }, function (module) {
      NpcAIBase = module.default;
    }, function (module) {
      XuliAct = module.XuliAct;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b463af9eFRJDqpmV/6cjeWY", "QishiAI", undefined);

      var QishiAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(QishiAI, _NpcAIBase);

        function QishiAI() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _NpcAIBase.call.apply(_NpcAIBase, [this].concat(args)) || this;
          _this._justChujue = false;
          _this._act2no = 0;
          return _this;
        }

        var _proto = QishiAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          // Zhengzhao
          var loop = 3;
          var buff = this.npc.buff;
          var bjNum = buff.numOf(BuffId.ChujueBj);

          if (bjNum == 2) {
            return new XuliAct(this.npc);
          } else if (bjNum == 1) {
            this._justChujue = true;
            return new ChujueAct(this.npc);
          } else if (this._justChujue) {
            this._act2no += -2;
            this._justChujue = false;
          }

          var no = actNum + this._act2no;
          return new (this.loopAct(no, loop, MulAttackAct, MengjiAct, JuheAct))(this.npc);
        };

        return QishiAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ReslockKit.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, KitBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      KitBase = module.KitBase;
    }],
    execute: function () {
      exports('ResName', void 0);

      cclegacy._RF.push({}, "654a3p6InpLX6sDkFgYMPp1", "ReslockKit", undefined);

      var ResName;

      (function (ResName) {
        ResName[ResName["RoundAdvance"] = 0] = "RoundAdvance";
      })(ResName || (ResName = exports('ResName', {})));

      var ReslockKit = exports('default', /*#__PURE__*/function (_KitBase) {
        _inheritsLoose(ReslockKit, _KitBase);

        function ReslockKit() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _KitBase.call.apply(_KitBase, [this].concat(args)) || this;
          _this._lockHub = void 0;
          _this.kitName = "ReslockKit";
          return _this;
        }

        var _proto = ReslockKit.prototype;

        _proto.OnInit = function OnInit(complete) {
          this._lockHub = new Map();
          complete();
        };

        _proto.OnLateInit = function OnLateInit(complete) {
          complete();
        };

        _proto.OnDispose = function OnDispose() {
          this._lockHub.clear();

          this._lockHub = null;
        };

        _proto.getLock = function getLock(res, action) {
          var hub = this._lockHub.get(res);

          if (!hub) {
            hub = {
              lock: false,
              waiting: []
            };

            this._lockHub.set(res, hub);
          }

          if (hub.lock) {
            hub.waiting.push(action);
          } else {
            hub.lock = true;
            action();
          }
        };

        _proto.retLock = function retLock(res) {
          var hub = this._lockHub.get(res);

          if (!hub) throw "cant ret lock to a non-exist hub";

          if (hub.waiting.length > 0) {
            hub.waiting.shift()();
          } else {
            hub.lock = false;
          }
        };

        return ReslockKit;
      }(KitBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ReviveAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './BuffId.ts', './XuanyunAct.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, IntensionCfg, BuffId, XuanyunAct;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      XuanyunAct = module.XuanyunAct;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3295dnnhzRLfoqSPge1vFX/", "ReviveAct", undefined);

      var ReviveAct = exports('ReviveAct', /*#__PURE__*/function (_XuanyunAct) {
        _inheritsLoose(ReviveAct, _XuanyunAct);

        var _proto = ReviveAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.revive,
            iconTip: '',
            title: "复活",
            content: "\u8FD9\u4E2A\u602A\u7269\u5C06\u4EE550%\u7684\u6700\u5927\u751F\u547D\u590D\u6D3B"
          };
        };

        function ReviveAct(_actor, _onRevive) {
          var _this;

          _this = _XuanyunAct.call(this, _actor) || this;
          _this._onRevive = _onRevive;
          return _this;
        }

        _proto.OnDo = function OnDo(onOver) {
          var _this2 = this;

          this.skill_act_over(function () {
            _this2.actor.buff.mod(BuffId.hp, Math.floor(_this2.actor.buff.numOf(BuffId.maxhp) * 0.5), {
              write: true
            });

            _this2._onRevive();
          }, onOver);
        };

        return ReviveAct;
      }(XuanyunAct));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardChooseDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui-ccc370.mjs', './DlgBase.ts', './ItemFly.ts', './tc.ts', './PlayerPlay.ts', './BuffId.ts', './PlayerTreasureCom.ts', './TreasureId.ts', './TreasurePlay.ts', './HoverTipDlg.ts', './UIDocker.ts', './FightRwdChooseWrap.ts', './FightRwdDlg.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, Event, DlgBase, ItemFly, tc, PlayerPlay, BuffId, PlayerTreasureCom, TreasureId, TreasurePlay, HoverTipDlg, UIDocker, FightRwdChooseWrap, FightRwdDlg;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Event = module.Event;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      ItemFly = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      PlayerTreasureCom = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      TreasurePlay = module.default;
    }, function (module) {
      HoverTipDlg = module.default;
    }, function (module) {
      UIDocker = module.UIDocker;
    }, function (module) {
      FightRwdChooseWrap = module.FightRwdChooseWrap;
    }, function (module) {
      FightRwdDlg = module.FightRwdDlg;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d2ac7lPw81GGpKB7ZhWxCS1", "RewardChooseDlg", undefined);

      var RewardChooseDlg = exports('RewardChooseDlg', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(RewardChooseDlg, _DlgBase);

        function RewardChooseDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._player = void 0;
          _this._tplay = void 0;
          _this._btnList = void 0;
          _this._chooseList = void 0;
          _this._shzxBtn = void 0;
          _this._tgCoinBtn = void 0;
          _this._tgRecoverBtn = void 0;
          _this._yaogaoRecover = void 0;
          _this._onChoose = void 0;
          return _this;
        }

        var _proto = RewardChooseDlg.prototype;

        _proto.setupForCard = function setupForCard(option) {
          var _this2 = this;

          var pplay = tc.p(PlayerPlay);
          var player = pplay.player;
          var hasQiandai = player.c.get(PlayerTreasureCom).has(TreasureId.Qiandai);
          var hasYaogao = player.c.get(PlayerTreasureCom).has(TreasureId.Yaogao);

          var onChoose = function onChoose() {
            option.onChoose();

            _this2.close();
          };

          if (!hasQiandai) this._tgCoinBtn.dispose();
          if (!hasYaogao) this._tgRecoverBtn.dispose();
          option.cards.forEach(function (card, idx) {
            var wrap = _this2.wrap(FightRwdChooseWrap, _this2._chooseList.addItemFromPool());

            if (!FightRwdDlg.extraCard && idx == 2) {
              wrap.setupExtra({
                aim: "card",
                cardId: card,
                onExtra: function onExtra() {
                  FightRwdDlg.extraCard = true;
                },
                passonOnChoose: onChoose
              });
            } else {
              wrap.setupCard(card, onChoose);
            }
          });
          this.addDelay(.1, function () {
            _this2._btnList.visible = true;
          });
          this._onChoose = option.onChoose;
          return this;
        };

        _proto.setupForTreasure = function setupForTreasure(option) {
          var _this3 = this;

          var onChoose = function onChoose() {
            option.onChoose();

            _this3.close();
          };

          this._btnList.getChildAt(1).dispose();

          this._btnList.getChildAt(1).dispose();

          option.treas.forEach(function (trea, idx) {
            var wrap = _this3.wrap(FightRwdChooseWrap, _this3._chooseList.addItemFromPool());

            if (!FightRwdDlg.extraTrea && idx == 2) {
              wrap.setupExtra({
                aim: "trea",
                treaId: trea,
                onExtra: function onExtra() {
                  FightRwdDlg.extraTrea = true;
                },
                passonOnChoose: onChoose
              });
            } else {
              wrap.setupTrea(trea, onChoose);
            }
          });
          this.addDelay(.1, function () {
            _this3._btnList.visible = true;
          });
          return this;
        };

        _proto.OnInit = function OnInit() {
          var _this4 = this;

          this.dock(UIDocker.Dock.GhostUp);
          this._player = tc.p(PlayerPlay).player;
          this._tplay = tc.p(TreasurePlay);
          this._btnList = this.getList("btnList");
          this._chooseList = this.getList("chooseList");

          var tgRecoverBtn = this._tgRecoverBtn = this._btnList.getChild("tgRecover");

          var tgCoinBtn = this._tgCoinBtn = this._btnList.getChild("tgCoin");

          var shzxBtn = this._shzxBtn = this._btnList.getChild("shzx");

          var yaogao = this._tplay.infoOf(TreasureId.Yaogao);

          this._yaogaoRecover = yaogao.getIntVal('recover');
          this._btnList.visible = false;
          this.addBtnEvt(shzxBtn, this._shzx);
          this.addBtnEvt(tgCoinBtn, this._tgCoin);
          this.addBtnEvt(tgRecoverBtn, this._tgRecover);
          this.addFgoEvt(tgRecoverBtn, Event.ROLL_OVER, function () {
            HoverTipDlg.show("药膏", "\u5C06\u56DE\u590D " + _this4._yaogaoRecover + " \u70B9\u8840\u91CF");
          });
          this.addFgoEvt(tgRecoverBtn, Event.ROLL_OUT, function () {
            HoverTipDlg.hide();
          });
        };

        _proto.OnClose = function OnClose() {
          this._chooseList.removeChildrenToPool();
        };

        _proto._shzx = function _shzx() {
          this.close();
        };

        _proto._tgCoin = function _tgCoin() {
          var _this$_onChoose;

          var tplay = this._tplay;
          var qiandai = tplay.infoOf(TreasureId.Qiandai);
          var qiandaiCoin = qiandai.getIntVal('coin');
          tplay.pop(TreasureId.Qiandai);

          this._player.buff.mod(BuffId.coin, qiandaiCoin);

          ItemFly.flyCoin(qiandaiCoin, this._chooseList.getChild("tgCoin"));
          (_this$_onChoose = this._onChoose) == null ? void 0 : _this$_onChoose.call(this);
          this.close();
        };

        _proto._tgRecover = function _tgRecover() {
          var _this$_onChoose2;

          this._tplay.pop(TreasureId.Yaogao);

          this._player.recoverHp(this._yaogaoRecover, TreasureId.Yaogao.toString());

          (_this$_onChoose2 = this._onChoose) == null ? void 0 : _this$_onChoose2.call(this);
          this.close();
        };

        _createClass(RewardChooseDlg, [{
          key: "dlgRes",
          get: function get() {
            return "RewardChooseDlg";
          }
        }]);

        return RewardChooseDlg;
      }(DlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RongyanAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './CardId.ts', './NpcPropFunc.ts', './PlayerFightCardCom.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, CardId, NpcPropFunc, PlayerFightCardCom, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      CardId = module.CardId;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1e4e41bNyhMQqnKuWxkm62b", "RongyanAct", undefined);

      var RongyanAct = exports('RongyanAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(RongyanAct, _ActBase);

        function RongyanAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = RongyanAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.tactics,
            iconTip: '',
            title: "熔岩",
            content: "\u5C06" + this.num + "\u5F20\"\u707C\u70E7\"\u653E\u5165\u73A9\u5BB6\u62BD\u5361\u7EC4\u3002"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.skill_act_over(function () {
            var num = _this.num;

            while (num--) {
              _this.target.c.get(PlayerFightCardCom).addCard2Draw(CardId.Zhuoshao);
            }
          }, onOver);
        };

        _createClass(RongyanAct, [{
          key: "num",
          get: function get() {
            return parseInt(this.getProp(NpcPropFunc.rongyan).args[0]);
          }
        }]);

        return RongyanAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RongyankjBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CardId.ts', './PlayerFightCardCom.ts', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, CardId, PlayerFightCardCom, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      CardId = module.CardId;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "67bf3Kz/xNGG7pKQOGVOgem", "RongyankjBuffCom", undefined);

      var RongyankjBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(RongyankjBuffCom, _ABuffCom);

        function RongyankjBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = RongyankjBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.Hit, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.Hit) {
            var _arg$hitSource$c$get;

            (_arg$hitSource$c$get = arg.hitSource.c.get(PlayerFightCardCom)) == null ? void 0 : _arg$hitSource$c$get.addCard2Draw(CardId.Zhuoshao);
          }
        };

        return RongyankjBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RuodiangjCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BuffId.ts', './CardItem.ts', './AFightCardCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, BuffId, CardPropFunc, AFightCardCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      CardPropFunc = module.CardPropFunc;
    }, function (module) {
      AFightCardCom = module.AFightCardCom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "cee71NzSU9By7pe7g8KVAUK", "RuodiangjCom", undefined);

      var RuodiangjCom = exports('default', /*#__PURE__*/function (_AFightCardCom) {
        _inheritsLoose(RuodiangjCom, _AFightCardCom);

        function RuodiangjCom() {
          return _AFightCardCom.apply(this, arguments) || this;
        }

        var _proto = RuodiangjCom.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnCast = function OnCast() {
          var hit = this.fightcard.fightCardHandler.getPropDealerByFunc(CardPropFunc.hit)[0];
          var eWeak = hit.choose.buff.isMorethan(BuffId.weak, 0);
          hit.castEffect();

          if (eWeak) {
            var draw = this.fightcard.fightCardHandler.getPropDealerByFunc(CardPropFunc.draw)[0];
            draw.castEffect();
          }
        };

        return RuodiangjCom;
      }(AFightCardCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SeekLineWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './fairygui-ccc370.mjs', './UIWrap.ts', './Util.ts', './tc.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, Vec2, GRoot, UIWrap, cubicbezier, tc;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec2 = module.Vec2;
    }, function (module) {
      GRoot = module.GRoot;
    }, function (module) {
      UIWrap = module.default;
    }, function (module) {
      cubicbezier = module.cubicbezier;
    }, function (module) {
      tc = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1bf7aqeSG9NBI+Av19ZzxgE", "SeekLineWrap", undefined);

      var SeekLineWrap = exports('default', /*#__PURE__*/function (_UIWrap) {
        _inheritsLoose(SeekLineWrap, _UIWrap);

        function SeekLineWrap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIWrap.call.apply(_UIWrap, [this].concat(args)) || this;
          _this._arrow = void 0;
          _this._dots = void 0;
          _this._arrowHeight = void 0;
          _this._arrowBaseRotation = void 0;
          return _this;
        }

        var _proto = SeekLineWrap.prototype;

        _proto.OnInit = function OnInit() {
          var _this2 = this;

          this._dots = [];

          this.fgc._children.forEach(function (child) {
            if (child.name == "arrow") {
              _this2._arrow = child;
              _this2._arrowBaseRotation = _this2._arrow.rotation;
            } else {
              _this2._dots.push(child);
            }
          });
        };

        _proto.config = function config(arrowHeight) {
          this._arrowHeight = arrowHeight;
        };

        _proto.draw = function draw(fromX, fromY, toX, toY) {
          var _this3 = this;

          var dir = new Vec2(toX - fromX, toY - fromY);
          var theBezier = cubicbezier(0, 1.65, 1.0, 1.0 + (1 - toY / GRoot.inst.height) * 0.65, 1000);
          var dotsPos = [];

          this._dots.forEach(function (dot, index) {
            dotsPos.push([fromX + dir.x * index / _this3._dots.length, fromY + dir.y * theBezier(index / _this3._dots.length)]);
          });

          tc.tmpVec22.set(0, -100);

          this._dots.forEach(function (dot, index) {
            var pos = dotsPos[index];
            var nextPos = index == dotsPos.length - 1 ? [toX, toY] : dotsPos[index + 1];
            dot.rotation = -tc.tmpVec2.set(nextPos[0] - pos[0], nextPos[1] - pos[1]).signAngle(tc.tmpVec22) * 180 / Math.PI;
            tc.tmpVec2.set(_this3.fgc.globalToLocal(pos[0], pos[1]));
            dot.setPosition(tc.tmpVec2.x, tc.tmpVec2.y);
          });

          tc.tmpVec2 = this.fgc.globalToLocal(toX, toY);

          this._arrow.setPosition(tc.tmpVec2.x, tc.tmpVec2.y);

          this._arrow.rotation = this._dots[this._dots.length - 1].rotation + this._arrowBaseRotation;
        };

        return SeekLineWrap;
      }(UIWrap));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SeekLogicCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AFightCardCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AFightCardCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AFightCardCom = module.AFightCardCom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3f8b7OClwFBa4p9kM9sYoR4", "SeekLogicCom", undefined);

      var SeekSelf = exports('SeekSelf', /*#__PURE__*/function (_AFightCardCom) {
        _inheritsLoose(SeekSelf, _AFightCardCom);

        function SeekSelf() {
          return _AFightCardCom.apply(this, arguments) || this;
        }

        var _proto = SeekSelf.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnCast = function OnCast() {};

        return SeekSelf;
      }(AFightCardCom));
      var SeekChooseOne = exports('SeekChooseOne', /*#__PURE__*/function (_AFightCardCom2) {
        _inheritsLoose(SeekChooseOne, _AFightCardCom2);

        function SeekChooseOne() {
          return _AFightCardCom2.apply(this, arguments) || this;
        }

        var _proto2 = SeekChooseOne.prototype;

        _proto2.OnInit = function OnInit() {};

        _proto2.OnCast = function OnCast() {};

        return SeekChooseOne;
      }(AFightCardCom));
      var SeekEnemys = exports('SeekEnemys', /*#__PURE__*/function (_AFightCardCom3) {
        _inheritsLoose(SeekEnemys, _AFightCardCom3);

        function SeekEnemys() {
          return _AFightCardCom3.apply(this, arguments) || this;
        }

        var _proto3 = SeekEnemys.prototype;

        _proto3.OnInit = function OnInit() {};

        _proto3.OnCast = function OnCast() {};

        return SeekEnemys;
      }(AFightCardCom));
      var SeekRandomEnemy = exports('SeekRandomEnemy', /*#__PURE__*/function (_AFightCardCom4) {
        _inheritsLoose(SeekRandomEnemy, _AFightCardCom4);

        function SeekRandomEnemy() {
          return _AFightCardCom4.apply(this, arguments) || this;
        }

        var _proto4 = SeekRandomEnemy.prototype;

        _proto4.OnInit = function OnInit() {};

        _proto4.OnCast = function OnCast() {};

        return SeekRandomEnemy;
      }(AFightCardCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShangkoudjAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './CardId.ts', './NpcPropFunc.ts', './PlayerFightCardCom.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, CardId, NpcPropFunc, PlayerFightCardCom, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      CardId = module.CardId;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b6eae+yDcBDNLX4knzbqodC", "ShangkoudjAct", undefined);

      var ShangkoudjAct = exports('ShangkoudjAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(ShangkoudjAct, _ActBase);

        function ShangkoudjAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = ShangkoudjAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.attack_tactics,
            iconTip: '' + this.actualdmg,
            title: "伤口打击",
            content: "\u5C06\u9020\u6210" + this.actualdmg + "\u4F24\u5BB3\u5E76" + this.num + "\u5F20\u4F24\u53E3\u724C\u653E\u5165\u73A9\u5BB6\u62BD\u5361\u7EC4\u3002"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.attack_act_byatk_over(function () {
            var num = _this.num;

            while (num--) {
              _this.target.c.get(PlayerFightCardCom).addCard2Draw(CardId.Shangkou);
            }

            _this.target.getHit(_this.actualdmg, _this.actor, "ShangkoudjAct");
          }, onOver);
        };

        _createClass(ShangkoudjAct, [{
          key: "actualdmg",
          get: function get() {
            return this.calcDmg(parseInt(this.getProp(NpcPropFunc.shangkoudj).args[1]));
          }
        }, {
          key: "num",
          get: function get() {
            return parseInt(this.getProp(NpcPropFunc.shangkoudj).args[0]);
          }
        }]);

        return ShangkoudjAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShaoweiBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "34c05zsQ9JJ8I84e1+BsiTw", "ShaoweiBuff", undefined);

      var ShaoweiBuff = exports('ShaoweiBuff', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(ShaoweiBuff, _ABuffCom);

        function ShaoweiBuff() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = ShaoweiBuff.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.RoundEnd, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.RoundEnd) {
            this.owner.buff.mod(BuffId.shiled, this.buff.num);
          }
        };

        return ShaoweiBuff;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShilaimAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AttackAct.ts', './FushiAct.ts', './NpcAIBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AttackAct, FushiAct, NpcAIBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      FushiAct = module.FushiAct;
    }, function (module) {
      NpcAIBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "53925kiVGxBgp30TYxbzR8l", "ShilaimAI", undefined);

      var ShilaimAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(ShilaimAI, _NpcAIBase);

        function ShilaimAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = ShilaimAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          if (actNum % 2 == 0) {
            return new FushiAct(this.npc);
          } else {
            return new AttackAct(this.npc);
          }
        };

        return ShilaimAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShiledCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6f2ed2JaOlOb7ewtwjwHqxb", "ShiledCom", undefined);

      var ShiledCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(ShiledCom, _ABuffCom);

        function ShiledCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = ShiledCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.RoundStart, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.RoundStart) {
            this.buff.report();

            if (!this.owner.buff.isMorethan(BuffId.changcheng, 0)) {
              this.owner.buff.rm(this.buff.id);
            }
          }
        };

        return ShiledCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShinvAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AddTeamBuffAct.ts', './NpcAIBase.ts', './ShangkoudjAct.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AddTeamBuffAct, NpcAIBase, ShangkoudjAct;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AddTeamBuffAct = module.AddTeamBuffAct;
    }, function (module) {
      NpcAIBase = module.default;
    }, function (module) {
      ShangkoudjAct = module.ShangkoudjAct;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b6ee4o79S1LZ76QMVATD12t", "ShinvAI", undefined);

      var ShinvAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(ShinvAI, _NpcAIBase);

        function ShinvAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = ShinvAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          if (actNum % 3 == 0) {
            return new AddTeamBuffAct(this.npc);
          } else if (actNum % 3 == 1) {
            return new AddTeamBuffAct(this.npc, "B");
          } else {
            return new ShangkoudjAct(this.npc);
          }
        };

        return ShinvAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShirenhAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AttackAct.ts', './DalilAct.ts', './NpcAIBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AttackAct, DalilAct, NpcAIBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      DalilAct = module.DalilAct;
    }, function (module) {
      NpcAIBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "67cf3Kp/GZFTLL8mf7+FrZ9", "ShirenhAI", undefined);

      var ShirenhAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(ShirenhAI, _NpcAIBase);

        function ShirenhAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = ShirenhAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          if (actNum % 2 == 0) {
            return new DalilAct(this.npc);
          } else {
            return new AttackAct(this.npc);
          }
        };

        return ShirenhAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShishigAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AttackAct.ts', './NpcAIBase.ts', './ShangkoudjAct.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AttackAct, NpcAIBase, ShangkoudjAct;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      NpcAIBase = module.default;
    }, function (module) {
      ShangkoudjAct = module.ShangkoudjAct;
    }],
    execute: function () {
      cclegacy._RF.push({}, "78ca1YYMAlPpYu8pe1TVurQ", "ShishigAI", undefined);

      var ShishigAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(ShishigAI, _NpcAIBase);

        function ShishigAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = ShishigAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          if (actNum % 2 == 0) {
            return new ShangkoudjAct(this.npc);
          } else {
            return new AttackAct(this.npc);
          }
        };

        return ShishigAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShiweiAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AddTeamBuffAct.ts', './MengjiAct.ts', './MulAttackAct.ts', './NpcAIBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AddTeamBuffAct, MengjiAct, MulAttackAct, NpcAIBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AddTeamBuffAct = module.AddTeamBuffAct;
    }, function (module) {
      MengjiAct = module.MengjiAct;
    }, function (module) {
      MulAttackAct = module.default;
    }, function (module) {
      NpcAIBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "84797Pm19ZM+rCEOeQJ8nLn", "ShiweiAI", undefined);

      var ShiweiAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(ShiweiAI, _NpcAIBase);

        function ShiweiAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = ShiweiAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          return new (this.loopAct(actNum, 3, AddTeamBuffAct, MengjiAct, MulAttackAct))(this.npc);
        };

        return ShiweiAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShixueBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "80004f198lDnqf3ZeW5F8wA", "ShixueBuffCom", undefined);

      var ShixueBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(ShixueBuffCom, _ABuffCom);

        function ShixueBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = ShixueBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.HitOther, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HitOther) {
            this.owner.recoverHp(this.buff.num, arg.log + "," + this.buff.info.name);
          }
        };

        return ShixueBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShizijBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts', './BuffPlay.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, tc, TreasureId, ATreasureBuffCom, BuffId, BuffNS, BuffPlay;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }, function (module) {
      BuffPlay = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c69d0guaD1OALaW0627yPvs", "ShizijBuff", undefined); // 当遭到致命伤时，以【maxhp2hp】%生命复活，可生效【num】次


      var ShizijBuff = exports('ShizijBuff', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(ShizijBuff, _ATreasureBuffCom);

        function ShizijBuff() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ATreasureBuffCom.call.apply(_ATreasureBuffCom, [this].concat(args)) || this;
          _this._maxhp2hp = void 0;
          return _this;
        }

        var _proto = ShizijBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this._maxhp2hp = parseInt(tc.p(BuffPlay).propOf(this.buff.id).maxhp2hp);
          this.setOrder(BuffNS.EffectStage.OnTryRevive, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {
          this._maxhp2hp = null;
        };

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.OnTryRevive) {
            if (this.counterNum > 0) {
              var maxhp = this.owner.buff.numOf(BuffId.maxhp);

              if (arg.reviveCallback(Math.floor(maxhp * this._maxhp2hp / 100))) {
                this.popWrap();
                this.reviseNum(this.counterNum - 1);
              }
            }
          }
        };

        _createClass(ShizijBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Shizij;
          }
        }]);

        return ShizijBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShopCfg.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e1c47ye+TFMC6ukgvi9shDJ", "ShopCfg", undefined);

      var ShopCfg = exports('default', {
        // shopCardNum: 5,
        // shopTreasureNum: 3,
        price: {
          card: {
            "白板": 25,
            "绿色": 35,
            "蓝色": 55,
            "紫色": 100
          },
          treasure: {
            "普通": 50,
            "稀有": 100,
            "史诗": 150
          },
          // 石头价格
          shitouPrice: 10
        },
        salesStrategy: {
          10: {
            log: "1号商人",

            /**
             * [0] 未解锁蓝色卡牌或稀有宝物
             * [1] 已解锁蓝色卡牌或稀有宝物
             * [2] 已解锁紫色卡牌或史诗宝物
             * item [白卡数量，绿卡数量，蓝卡数量, 紫卡数量] */
            cards: [[4, 1, 0, 0], [3, 1, 1, 0], [1, 2, 2, 0]],

            /**
             * [0] 同上
             * [1] 同上
             * [2] 同上
             * item [普通宝物，稀有宝物，史诗宝物] */
            treasures: [[3, 0, 0], [2, 1, 0], [1, 2, 0]]
          },
          11: {
            log: "2号商人",
            cards: [[2, 3, 0, 0], [1, 2, 2, 0], [0, 2, 2, 1]],
            treasures: [[3, 0, 0], [1, 2, 0], [1, 1, 1]]
          },
          12: {
            log: "3号商人",
            cards: [[0, 5, 0, 0], [0, 1, 4, 0], [0, 1, 2, 2]],
            treasures: [[3, 0, 0], [0, 3, 0], [0, 1, 2]]
          },
          13: {
            log: "4号商人",
            cards: [[0, 5, 0, 0], [0, 0, 5, 0], [0, 0, 1, 4]],
            treasures: [[3, 0, 0], [0, 3, 0], [0, 0, 3]]
          }
        }
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShopDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ShopCfg.ts', './DlgBase.ts', './CardPlay.ts', './CardRare.ts', './ExplorePlay.ts', './PlayerTreasureCom.ts', './PlayerPlay.ts', './TreasureId.ts', './TreasurePlay.ts', './TreasureRare.ts', './tc.ts', './CardListItem4SaleWrap.ts', './TreasureItem4SellWrap.ts', './TopbarDlg.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, ShopCfg, DlgBase, CardPlay, CardRare, ExplorePlay, PlayerTreasureCom, PlayerPlay, TreasureId, TreasurePlay, TreasureRare, tc, CardListItem4SaleWrap, TreasureItem4SellWrap, TopbarDlg;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ShopCfg = module.default;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      CardRare = module.CardRare;
    }, function (module) {
      ExplorePlay = module.default;
    }, function (module) {
      PlayerTreasureCom = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      TreasurePlay = module.default;
    }, function (module) {
      TreasureRare = module.TreasureRare;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardListItem4SaleWrap = module.CardListItem4SaleWrap;
    }, function (module) {
      TreasureItem4SellWrap = module.TreasureItem4SellWrap;
    }, function (module) {
      TopbarDlg = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "80865X0UsVLR5d33VXJDCQH", "ShopDlg", undefined);

      var ShopDlg = exports('default', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(ShopDlg, _DlgBase);

        function ShopDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._cardList = void 0;
          _this._treasures = void 0;
          return _this;
        }

        var _proto = ShopDlg.prototype;

        _proto.setup = function setup(eventId) {
          var strategy = ShopCfg.salesStrategy[eventId];
          var cplay = tc.p(CardPlay);
          var tpaly = tc.p(TreasurePlay);
          var cardLockLevel = cplay.lockingCardNum == cplay.bluePoolSize + cplay.purplePoolSize ? 0 : cplay.lockingCardNum > cplay.purplePoolSize ? 1 : 2;
          var treasureLockLevel = tpaly.lockingNum == tpaly.rarePoolSize + tpaly.epicPoolSize ? 0 : tpaly.lockingNum > tpaly.epicPoolSize ? 1 : 2;

          this._preparCardGoods(strategy, cardLockLevel, cplay);

          this._preparTreasureGoods(strategy, treasureLockLevel, tpaly);

          return this;
        };

        _proto._preparTreasureGoods = function _preparTreasureGoods(strategy, treasureLockLevel, tpaly) {
          var _this2 = this;

          var remain = 0;
          strategy.treasures[treasureLockLevel].slice().reverse().forEach(function (tNum, idx) {
            tNum += remain;
            if (tNum < 1) return;
            var trare = idx == 0 ? TreasureRare.Epic : idx == 1 ? TreasureRare.Rare : TreasureRare.Common;
            var price = ShopCfg.price.treasure[trare];
            var rlt = tpaly.randomNonOwnTreasure(tNum, {
              limitRare: [trare]
            });
            rlt.forEach(function (tid) {
              _this2._appendTreasure(tid, price);
            });
            remain = tNum - rlt.length;
          });

          while (remain--) {
            this._appendTreasure(TreasureId.Shitou, ShopCfg.price.shitouPrice);
          }
        };

        _proto._preparCardGoods = function _preparCardGoods(strategy, cardLockLevel, cplay) {
          var _this3 = this;

          var cRemain = 0;
          strategy.cards[cardLockLevel].slice().reverse().forEach(function (cardNum, idx) {
            cardNum += cRemain;
            if (cardNum < 1) return;
            var cardrare = [CardRare.Purple, CardRare.Blue, CardRare.Green, CardRare.White][idx];
            var price = ShopCfg.price.card[cardrare];
            var rlt = cplay.randomCardsFromPool(cardNum, {
              limitRare: [cardrare]
            });
            rlt.forEach(function (cardId) {
              _this3._appendCard(cardId, price);
            });
            cRemain = cardNum - rlt.length;
          });
        };

        _proto._appendTreasure = function _appendTreasure(tid, price) {
          var treasures = this._treasures;
          var item = treasures.addItemFromPool();
          var itemwrap = this.wrap(TreasureItem4SellWrap, item);
          itemwrap.refresh({
            id: tid
          }, treasures.numChildren - 1);
          itemwrap.setCoin(price);
        };

        _proto._appendCard = function _appendCard(cid, price) {
          var cardList = this._cardList;
          var item = cardList.addItemFromPool();
          this.wrap(CardListItem4SaleWrap, item).refresh({
            id: cid,
            coin: price
          }, cardList.numChildren - 1);
        };

        _proto.OnInit = function OnInit() {
          var _this4 = this;

          var player = tc.p(PlayerPlay).player;
          var treasurePlay = tc.p(TreasurePlay);
          var treasureCom = player.c.get(PlayerTreasureCom);
          this._cardList = this.getList('cardList');
          this._treasures = this.getList('treasures');
          this.addDelay(0.33, function () {
            if (treasureCom.has(TreasureId.Zizhuc)) {
              var zizhuc = treasurePlay.infoOf(TreasureId.Zizhuc);

              var topbar = _this4.dlgKit.fetchDlg(TopbarDlg);

              topbar.popTreasure(TreasureId.Zizhuc);
              player.recoverHp(zizhuc.getIntVal('recover'), zizhuc.name);
            }

            _this4.addBtnEvt('continue', function () {
              _this4.close();

              tc.p(ExplorePlay).continueExplore();
            });
          });
        };

        _proto.OnGetBgAlpha = function OnGetBgAlpha() {
          return 0;
        };

        _createClass(ShopDlg, [{
          key: "dlgRes",
          get: function get() {
            return "ShopDlg";
          }
        }]);

        return ShopDlg;
      }(DlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShopEvent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ShopDlg.ts', './DlgKit.ts', './tc.ts', './AExploreNodeHandler.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ShopDlg, DlgKit, tc, AExploreNodeHandler;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ShopDlg = module.default;
    }, function (module) {
      DlgKit = module.DlgKit;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      AExploreNodeHandler = module.AExploreNodeHandler;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f64b10vHsNHzJXmZgLc5hxC", "ShopEvent", undefined);

      var ShopEvent = exports('ShopEvent', /*#__PURE__*/function (_AExploreNodeHandler) {
        _inheritsLoose(ShopEvent, _AExploreNodeHandler);

        function ShopEvent() {
          return _AExploreNodeHandler.apply(this, arguments) || this;
        }

        var _proto = ShopEvent.prototype;

        _proto.exec = function exec() {
          tc.k(DlgKit).fetchDlg(ShopDlg).setup(this.info.id);
        };

        return ShopEvent;
      }(AExploreNodeHandler));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShowNum.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "79d6e/8vg1Nd6O4yQQn5Zs5", "ShowNum", undefined);

      var ShowNum = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(ShowNum, _ABuffCom);

        function ShowNum() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = ShowNum.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {};

        return ShowNum;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShowOnStatuBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bde1chb499FY4YpudSoNf75", "ShowOnStatuBuffCom", undefined);
      /**拥有这个buffCom的buff会在状态栏中显示 */


      var ShowOnStatuBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(ShowOnStatuBuffCom, _ABuffCom);

        function ShowOnStatuBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = ShowOnStatuBuffCom.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {};

        return ShowOnStatuBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShuangmianjBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "175cbHKKJ5DQKYrlcoccGep", "ShuangmianjBuff", undefined);

      var ShuangmianjBuff = exports('ShuangmianjBuff', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(ShuangmianjBuff, _ABuffCom);

        function ShuangmianjBuff() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = ShuangmianjBuff.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.HandCardIn, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HandCardIn) {
            this.owner.buff.mod(BuffId.shiled, this.buff.num);
            this.owner.buff.rm(this.buff.id);
          }
        };

        return ShuangmianjBuff;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShuijingqBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './PlayerFightCardCom.ts', './PlayerPlay.ts', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, tc, PlayerFightCardCom, PlayerPlay, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "fba08ApjG5E8Z0t2YAFQCz3", "ShuijingqBuff", undefined); // 弃牌阶段，每一张手牌获得【num】点格挡


      var ShuijingqBuff = exports('ShuijingqBuff', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(ShuijingqBuff, _ATreasureBuffCom);

        function ShuijingqBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = ShuijingqBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.RoundEnd, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.RoundEnd) {
            var hands = tc.p(PlayerPlay).player.c.get(PlayerFightCardCom).hand;

            if (hands.length > 0) {
              this.owner.buff.mod(BuffId.shiled, this.buff.num * hands.length);
              this.popWrap();
            }
          }
        };

        _createClass(ShuijingqBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Shuijingq;
          }
        }]);

        return ShuijingqBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SignNumCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7724fmwqSBJEpjccTrSfryK", "SignNumCom", undefined);
      /**数量为负数 */


      var SignNumCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(SignNumCom, _ABuffCom);

        function SignNumCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = SignNumCom.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {};

        return SignNumCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SiwanggszAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AttackAct.ts', './JianjiaoAct.ts', './MeihuoAct.ts', './MulAttackAct.ts', './NpcAIBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AttackAct, JianjiaoAct, MeihuoAct, MulAttackAct, NpcAIBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      JianjiaoAct = module.JianjiaoAct;
    }, function (module) {
      MeihuoAct = module.MeihuoAct;
    }, function (module) {
      MulAttackAct = module.default;
    }, function (module) {
      NpcAIBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "77bedq6PH5Gka00nx+yswSd", "SiwanggszAI", undefined);

      var SiwanggszAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(SiwanggszAI, _NpcAIBase);

        function SiwanggszAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = SiwanggszAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          return new (this.loopAct(actNum, 4, MeihuoAct, AttackAct, JianjiaoAct, MulAttackAct))(this.npc);
        };

        return SiwanggszAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StageMachineBase.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bb7740cYSxEUbAvWsKau2Js", "StageMachineBase", undefined);

      var StageMachineBase = exports('default', /*#__PURE__*/function () {
        function StageMachineBase(_design) {
          this._dones = void 0;
          this._curIdx = void 0;
          this._design = _design;
          this._curIdx = 0;
          this._dones = new Set();
        }

        var _proto = StageMachineBase.prototype;

        _proto.done = function done(step) {
          var _this = this;

          if (this._isComplete) return;

          this._dones.add(step);

          while (!this._curNeed.find(function (step) {
            return !_this._dones.has(step);
          })) {
            this._curIdx++;

            if (this._isComplete) {
              break;
            }
          }
        };

        _proto.reset = function reset() {
          this._curIdx = 0;

          this._dones.clear();
        };

        _createClass(StageMachineBase, [{
          key: "cur",
          get: function get() {
            return this._design[this._curIdx].stage;
          }
        }, {
          key: "_curNeed",
          get: function get() {
            return this._design[this._curIdx + 1].need;
          }
        }, {
          key: "_isComplete",
          get: function get() {
            return this._curIdx === this._design.length - 1;
          }
        }]);

        return StageMachineBase;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StorageSys.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs', './Util.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, sys, SysBase, notNull;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
    }, function (module) {
      SysBase = module.SysBase;
    }, function (module) {
      notNull = module.notNull;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4813fqnYXFFr6WptAhUcV5p", "StorageSys", undefined);

      var StorageSys = exports('default', /*#__PURE__*/function (_SysBase) {
        _inheritsLoose(StorageSys, _SysBase);

        function StorageSys() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _SysBase.call.apply(_SysBase, [this].concat(args)) || this;
          _this.sysName = "StorageSys";
          return _this;
        }

        var _proto = StorageSys.prototype;

        _proto.OnInit = function OnInit(complete) {
          complete();
        };

        _proto.OnLateInit = function OnLateInit(complete) {
          complete();
        };

        _proto.OnDispose = function OnDispose() {};

        _proto.set = function set(key, val) {
          if (notNull(val)) {
            sys.localStorage.setItem(key, JSON.stringify(val));
          } else {
            sys.localStorage.removeItem(key);
          }
        };

        _proto.get = function get(key, def) {
          var $ = sys.localStorage.getItem(key);
          return notNull($) ? JSON.parse($) : def;
        };

        return StorageSys;
      }(SysBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/tc.ts", ['cc', './TocardGame.ts', './FUISys.ts'], function (exports) {
  'use strict';

  var cclegacy, Vec2, TocardGame, FUISys;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec2 = module.Vec2;
    }, function (module) {
      TocardGame = module.TocardGame;
    }, function (module) {
      FUISys = module.FUISys;
    }],
    execute: function () {
      cclegacy._RF.push({}, "10af3cBTppI1qK47gykCJjJ", "tc", undefined);

      var tc = exports('default', /*#__PURE__*/function () {
        function tc() {}
        /**预计在本游戏中不会出现游戏期间 Dispose s/k/p 的情况，因此加此缓存。 */


        tc.s = function s(type) {
          var key = 's' + type.name;

          if (!this._cache[key]) {
            this._cache[key] = TocardGame.me.sys(type);
          }

          return this._cache[key];
        };

        tc.k = function k(type) {
          var key = 'k' + type.name;

          if (!this._cache[key]) {
            this._cache[key] = TocardGame.me.kit(type);
          }

          return this._cache[key];
        };

        tc.p = function p(type) {
          var key = 'p' + type.name;

          if (!this._cache[key]) {
            this._cache[key] = TocardGame.me.play(type);
          }

          return this._cache[key];
        };

        tc.resUrl = function resUrl(res, pak) {
          if (pak === void 0) {
            pak = "Main";
          }

          return TocardGame.me.sys(FUISys).toUrl(pak, res);
        };

        return tc;
      }());
      tc._cache = {};
      tc.tmpArr = [];
      tc.tmpArr2 = [];
      tc.tmpVec2 = new Vec2(0, 0);
      tc.tmpVec22 = new Vec2(0, 0);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TCStageMachine.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './StageMachineBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, StageMachineBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      StageMachineBase = module.default;
    }],
    execute: function () {
      exports({
        TCStage: void 0,
        TCStep: void 0
      });

      cclegacy._RF.push({}, "8dca6u3zGhA9ao2zYmycckG", "TCStageMachine", undefined);

      var TCStage;

      (function (TCStage) {
        TCStage[TCStage["FIGHT__WAIT_START"] = 0] = "FIGHT__WAIT_START";
        TCStage[TCStage["FIGHT__FIGHTING"] = 1] = "FIGHT__FIGHTING";
        TCStage[TCStage["FIGHT__END"] = 2] = "FIGHT__END";
      })(TCStage || (TCStage = exports('TCStage', {})));

      var TCStep;

      (function (TCStep) {
        TCStep[TCStep["FIGHT__OPEN_ANIM"] = 0] = "FIGHT__OPEN_ANIM";
        TCStep[TCStep["FIGHT__END"] = 1] = "FIGHT__END";
      })(TCStep || (TCStep = exports('TCStep', {})));

      var TCStageMachine = exports('default', /*#__PURE__*/function (_StageMachineBase) {
        _inheritsLoose(TCStageMachine, _StageMachineBase);

        function TCStageMachine() {
          return _StageMachineBase.apply(this, arguments) || this;
        }

        return TCStageMachine;
      }(StageMachineBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TimeSys.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs', './Util.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, SysBase, notNull, isNull;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      SysBase = module.SysBase;
    }, function (module) {
      notNull = module.notNull;
      isNull = module.isNull;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b77d7rEBxZEhYBixdv5pf/z", "TimeSys", undefined);
      /**
       * 计时器句柄
       */


      var Private;

      (function (_Private) {
        var Timer = /*#__PURE__*/function () {
          function Timer() {
            this.id = void 0;
            this.intervalMS = void 0;
            this.loopLeft = void 0;
            this.latestTriggerTime = void 0;
            this.method = void 0;
            this.caller = void 0;
            this.args = void 0;
          }

          var _proto2 = Timer.prototype;

          _proto2.trigger = function trigger() {
            if (!this.args || this.args.length === 0) {
              this.args = [this.id];
            }

            this.method.apply(this.caller, this.args);
            return this;
          };

          _createClass(Timer, [{
            key: "interval",
            get: function get() {
              return this.intervalMS * 0.001;
            }
          }, {
            key: "complete",
            get: function get() {
              return this.loopLeft === 0;
            }
          }]);

          return Timer;
        }();

        _Private.Timer = Timer;
      })(Private || (Private = {}));
      /**
       * 定时器服务
       */


      var TimeSys = exports('default', /*#__PURE__*/function (_SysBase) {
        _inheritsLoose(TimeSys, _SysBase);

        function TimeSys() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _SysBase.call.apply(_SysBase, [this].concat(args)) || this;
          _this._timers = void 0;
          _this._pool = void 0;
          _this._nextGlobalID = void 0;
          _this.sysName = "TimeSys";
          return _this;
        }

        var _proto = TimeSys.prototype;

        _proto.OnInit = function OnInit(complete) {
          this._nextGlobalID = 1;
          this._pool = new Array();
          this._timers = [];
          complete();
        };

        _proto.OnLateInit = function OnLateInit(complete) {
          complete();
        };

        _proto.OnDispose = function OnDispose() {
          this._pool = null;
          this._timers = [];
        };

        _proto.update = function update(dt) {
          var _this2 = this;

          var curTime = Date.now();

          this._timers.removeAll(function (t) {
            if (t.loopLeft > 0) {
              if (t.latestTriggerTime + t.intervalMS <= curTime) {
                t.latestTriggerTime = curTime;
                --t.loopLeft;
                t.trigger();
              }
            } else {
              _this2._gabage(t);

              return true;
            }
          });
        }
        /**
         * 当前时间，秒
         */
        ;
        /**
         * 注册并开始一个定时器
         * @param interval 间隔时间，单位秒
         * @param loops 循环次数，小于0表示无限循环
         * @param caller 回调者（用于this, 可以为null）
         * @param func 回调函数
         * @param args 回调参数，选填
         */


        _proto.timer = function timer(interval, loops, func, caller) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 4 ? _len2 - 4 : 0), _key2 = 4; _key2 < _len2; _key2++) {
            args[_key2 - 4] = arguments[_key2];
          }

          return this._timer(interval, loops, func, caller, args);
        }
        /**
         * 延迟一定时间调用（一次）
         * @param interval 延迟多久执行，单位秒
         * @param func 
         * @param caller 
         * @param args 
         */
        ;

        _proto.delay = function delay(interval, func, caller) {
          for (var _len3 = arguments.length, args = new Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
            args[_key3 - 3] = arguments[_key3];
          }

          return this._timer(interval, 1, func, caller, args);
        }
        /**
         * 注册一个帧回调计时器
         * @param loops 回调次数，小于0表示无限循环
         * @param caller 
         * @param func 
         * @param args 
         */
        ;

        _proto.frame = function frame(loops, func, caller) {
          for (var _len4 = arguments.length, args = new Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
            args[_key4 - 3] = arguments[_key4];
          }

          return this._timer(0, loops, func, caller, args);
        }
        /**
         * 注册一个延迟一帧执行的计时器
         * @param caller 
         * @param func 
         * @param args 
         */
        ;

        _proto.nextFrame = function nextFrame(func, caller) {
          for (var _len5 = arguments.length, args = new Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
            args[_key5 - 2] = arguments[_key5];
          }

          return this._timer(0, 1, func, caller, args);
        }
        /**
         * 删除给定计时器
         * @param timerID 计时器id
         * @return undefined，方便链式表达
         */
        ;

        _proto["delete"] = function _delete(timerID) {
          if (notNull(timerID) && timerID > 0) {
            var t = this._timers.removeFirst(function (t) {
              return t.id === timerID;
            });

            if (t) {
              this._gabage(t);
            }
          }

          return undefined;
        };

        _proto.isTimerComplete = function isTimerComplete(timerID) {
          var t = this._getTimer(timerID);

          return t ? t.complete : true;
        };

        _proto.getTimerInterval = function getTimerInterval(timerID) {
          var t = this._getTimer(timerID);

          return t ? t.interval : -1;
        };

        _proto.getTimerCallback = function getTimerCallback(timerID) {
          var t = this._getTimer(timerID);

          return t ? t.method : undefined;
        };

        _proto.getTimerThisObj = function getTimerThisObj(timerID) {
          var t = this._getTimer(timerID);

          return t ? t.caller : undefined;
        };

        _proto.getTimerNextTriggerTime = function getTimerNextTriggerTime(timerID) {
          var t = this._getTimer(timerID);

          return t ? t.latestTriggerTime + t.interval : 0;
        };

        _proto.getTimerArgs = function getTimerArgs(timerID) {
          var t = this._getTimer(timerID);

          return t ? t.args : undefined;
        };

        _proto.triggerTimer = function triggerTimer(timerID) {
          var t = this._getTimer(timerID);

          if (t) {
            t.trigger();
          }

          return timerID;
        };

        _proto._getTimer = function _getTimer(timerID) {
          if (isNull(timerID) || timerID <= 0) {
            return undefined;
          }

          return this._timers.find(function (t) {
            return t.id === timerID;
          });
        };

        _proto._timer = function _timer(interval, loops, func, caller, args) {
          var t = this._pool.length > 0 ? this._pool.pop() : new Private.Timer();
          t.id = this._nextGlobalID++;
          t.intervalMS = interval * 1000;
          t.loopLeft = loops < 0 ? Number.MAX_VALUE : loops === 0 ? 1 : loops;
          t.latestTriggerTime = Date.now();

          if (args) {
            args.push(t.id);
          }

          t.method = func;
          t.caller = caller;
          t.args = args;

          this._timers.push(t);

          return t.id;
        };

        _proto._gabage = function _gabage(t) {
          t.method = undefined;
          t.caller = undefined;
          t.args = undefined;

          this._pool.push(t);
        };

        _createClass(TimeSys, [{
          key: "timerCount",
          get: function get() {
            return this._timers.length;
          }
        }], [{
          key: "seconds",
          get: function get() {
            return Date.now() * 0.001;
          }
        }]);

        return TimeSys;
      }(SysBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TipDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DlgBase.ts', './DlgKit.ts', './tc.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, DlgBase, DlgKit, DlgLayer, tc;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgKit = module.DlgKit;
      DlgLayer = module.DlgLayer;
    }, function (module) {
      tc = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6af0eZyI95MMbVKTSSYqBIY", "TipDlg", undefined);

      var TipDlg = exports('default', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(TipDlg, _DlgBase);

        function TipDlg() {
          return _DlgBase.apply(this, arguments) || this;
        }

        TipDlg.pop = function pop(tip) {
          var dlg = tc.k(DlgKit).fetchDlg(TipDlg);
          dlg.setTip(tip);
          dlg.moveToFront();
        };

        var _proto = TipDlg.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.setTip = function setTip(tip) {
          var _this = this;

          this.getTxt("tip").text = tip;
          setTimeout(function () {
            _this.close();
          }, 600);
        };

        _proto.OnGetBgAlpha = function OnGetBgAlpha() {
          return 0;
        };

        _createClass(TipDlg, [{
          key: "dlgRes",
          get: function get() {
            return "TipDlg";
          }
        }, {
          key: "dlgLayer",
          get: function get() {
            return DlgLayer.Front;
          }
        }]);

        return TipDlg;
      }(DlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TocardGame.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs', './fairygui-ccc370.mjs', './Xls.ts', './GameGM.ts', './GMCmd.ts', './DlgKit.ts', './ReslockKit.ts', './UserKit.ts', './AdPlay.ts', './BuffPlay.ts', './CardPlay.ts', './EntryPlay.ts', './ExplorePlay.ts', './FightPlay.ts', './NpcPlay.ts', './PlayerPlay.ts', './TreasurePlay.ts', './TrueEndPlay.ts', './InputSys.ts', './ProcessSys.ts', './StorageSys.ts', './TimeSys.ts', './FUISys.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, SKPGame, GTextField, Xls, GameGM, GMCmd, DlgKit, ReslockKit, UserKit, AdPlay, BuffPlay, CardPlay, EntryPlay, ExplorePlay, FightPlay, NpcPlay, PlayerPlay, TreasurePlay, TrueEndPlay, InputSys, ProcessSys, StorageSys, TimeSys, FUISys;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      SKPGame = module.SKPGame;
    }, function (module) {
      GTextField = module.GTextField;
    }, function (module) {
      Xls = module.default;
    }, function (module) {
      GameGM = module.default;
    }, function (module) {
      GMCmd = module.default;
    }, function (module) {
      DlgKit = module.DlgKit;
    }, function (module) {
      ReslockKit = module.default;
    }, function (module) {
      UserKit = module.default;
    }, function (module) {
      AdPlay = module.default;
    }, function (module) {
      BuffPlay = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      EntryPlay = module.EntryPlay;
    }, function (module) {
      ExplorePlay = module.default;
    }, function (module) {
      FightPlay = module.default;
    }, function (module) {
      NpcPlay = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      TreasurePlay = module.default;
    }, function (module) {
      TrueEndPlay = module.TrueEndPlay;
    }, function (module) {
      InputSys = module.default;
    }, function (module) {
      ProcessSys = module.default;
    }, function (module) {
      StorageSys = module.default;
    }, function (module) {
      TimeSys = module.default;
    }, function (module) {
      FUISys = module.FUISys;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "ce178aPjMxP47L0pp90Y8/0", "TocardGame", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var TocardGame = exports('TocardGame', (_dec = ccclass('TocardGame'), _dec(_class = /*#__PURE__*/function (_SKPGame) {
        _inheritsLoose(TocardGame, _SKPGame);

        function TocardGame() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _SKPGame.call.apply(_SKPGame, [this].concat(args)) || this;
          _this.gamename = "Tocard";
          return _this;
        }

        var _proto = TocardGame.prototype;

        _proto.OnAddSys = function OnAddSys(addSys) {
          GTextField.LineHeightAjuster = 19 / 6;
          GMCmd.setImpl(GameGM.handleGM);
          Xls.init();
          addSys(FUISys);
          addSys(TimeSys);
          addSys(StorageSys);
          addSys(ProcessSys);
          addSys(InputSys);
        };

        _proto.OnAddKit = function OnAddKit(addKit) {
          addKit(DlgKit);
          addKit(UserKit);
          addKit(ReslockKit);
        };

        _proto.OnAddPlay = function OnAddPlay(addPlay) {
          addPlay(NpcPlay);
          addPlay(PlayerPlay);
          addPlay(CardPlay);
          addPlay(FightPlay);
          addPlay(EntryPlay);
          addPlay(TreasurePlay);
          addPlay(BuffPlay);
          addPlay(ExplorePlay);
          addPlay(AdPlay);
          addPlay(TrueEndPlay);
        };

        _proto.OnEnter = function OnEnter() {
          this.play(EntryPlay).play();
        };

        return TocardGame;
      }(SKPGame)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TopbarDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DlgBase.ts', './DlgKit.ts', './UserKit.ts', './Util.ts', './BuffId.ts', './NpcBuffCom.ts', './PlayerCardSetCom.ts', './PlayerTreasureCom.ts', './PlayerPlay.ts', './tc.ts', './TreasureItemWrap.ts', './CardSetDlg.ts', './GMDlg.ts', './ExploreDlg.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, Tween, tween, DlgBase, DlgKit, DlgLayer, UserKit, isNull, BuffId, NpcBuffCom, PlayerCardSetCom, PlayerTreasureCom, PlayerPlay, tc, TreasureItemWrap, CardSetDlg, TreasureGMDlg, ExploreDlg;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      Tween = module.Tween;
      tween = module.tween;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgKit = module.DlgKit;
      DlgLayer = module.DlgLayer;
    }, function (module) {
      UserKit = module.default;
    }, function (module) {
      isNull = module.isNull;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      NpcBuffCom = module.default;
    }, function (module) {
      PlayerCardSetCom = module.PlayerCardSetCom;
    }, function (module) {
      PlayerTreasureCom = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      TreasureItemWrap = module.default;
    }, function (module) {
      CardSetDlg = module.default;
    }, function (module) {
      TreasureGMDlg = module.TreasureGMDlg;
    }, function (module) {
      ExploreDlg = module.ExploreDlg;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d8d63f7lBBNqbB74CchSlcJ", "TopbarDlg", undefined);

      var TopbarDlg = exports('default', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(TopbarDlg, _DlgBase);

        function TopbarDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._player = void 0;
          _this._hpTxt = void 0;
          _this._coinTxt = void 0;
          _this._diamondTxt = void 0;
          _this._treasureList = void 0;
          _this._deck = void 0;
          _this._treasureWrapDict = void 0;
          _this._playerCardSetCom = void 0;
          _this._playerTreasureCom = void 0;
          _this._sceneCtrl = void 0;
          return _this;
        }

        var _proto = TopbarDlg.prototype;

        _proto.OnInit = function OnInit() {
          var _this2 = this;

          var player = this._player = tc.p(PlayerPlay).player;

          var pcs = this._playerCardSetCom = this._player.c.get(PlayerCardSetCom);

          var pt = this._playerTreasureCom = this._player.c.get(PlayerTreasureCom);

          this._hpTxt = this.getTxt("hpTxt");
          this._coinTxt = this.getTxt("coinTxt");
          this._diamondTxt = this.getTxt('curDiamond');
          this._treasureList = this.getList("treasures");
          this._deck = this.getBtn("deck");
          this._sceneCtrl = this.getController("scene");
          this._treasureWrapDict = {};
          this.getTxt("name").text = player.info.npcInfo.name;

          this._syncTreasures();

          this._syncHp();

          this._syncCoin();

          this._syncDiamond();

          this._initGMBtn();

          this._syncCardSetNum();

          this.onScene("prepar");
          this.addBtnEvt(this._deck, function (enableBtn) {
            CardSetDlg.popWithGM(_this2._playerCardSetCom.cards);
            enableBtn();
          });
          this.addBtnEvt("map", function (enableBtn) {
            ExploreDlg.show("view");
            enableBtn();
          });
          this.addEvt(pcs.e, PlayerCardSetCom.Events.CARD_SET_CHG, this._syncCardSetNum);
          this.addEvt(player.c.get(NpcBuffCom).e, NpcBuffCom.Events.BUFF_CHG, function (bid, num) {
            if (bid == BuffId.hp || bid == BuffId.maxhp) {
              _this2._syncHp();
            } else if (bid == BuffId.coin) {
              _this2._syncCoin();
            }
          });
          this.addEvt(pt.e, PlayerTreasureCom.Events.TREASURE_CHG, this._syncTreasures);
          this.addEvt(tc.k(UserKit).e, UserKit.Events.DIAMOND_CHG, this._syncDiamond);
        };

        _proto._initGMBtn = function _initGMBtn() {
          this.addBtnEvt("gm0", function (enableBtn) {
            var p = tc.p(PlayerPlay).player;
            p.recoverHp(Math.max(p.buff.numOf(BuffId.maxhp) - p.buff.numOf(BuffId.hp), 0), "GM-recover");
            enableBtn();
          });
          this.addBtnEvt("gm1", function (enableBtn) {
            var p = tc.p(PlayerPlay).player;
            p.cutHp(Math.max(0, p.buff.numOf(BuffId.hp) - 1), null, "GM-cut");
            enableBtn();
          }); // add coin

          this.addBtnEvt("gm2", function (enableBtn) {
            var p = tc.p(PlayerPlay).player;
            p.buff.mod(BuffId.coin, 100);
            enableBtn();
          }); // add treasure

          this.addBtnEvt("gm3", function (enableBtn) {
            TreasureGMDlg.pop();
            enableBtn();
          });
        };

        _proto._syncCardSetNum = function _syncCardSetNum() {
          this._deck.text = "" + this._playerCardSetCom.cards.length;
        };

        _proto._syncTreasures = function _syncTreasures() {
          var _this3 = this; // curTreasures[]


          var treasures = this._playerTreasureCom.treasures; // outTreasures[]

          tc.tmpArr = Object.keys(this._treasureWrapDict).map(function (idStr) {
            return parseInt(idStr);
          }).filter(function (id) {
            return !treasures.find(function (t) {
              return t.id == id;
            });
          }); // deal out

          tc.tmpArr.forEach(function (t) {
            // console.log("_syncTreasures out, id, ", id);
            _this3._treasureWrapDict[t.id].fgc.dispose();

            _this3._treasureWrapDict[t.id].close();

            _this3._treasureWrapDict[t.id] = null;
          }); // newTreasures[]

          tc.tmpArr = treasures.filter(function (t) {
            return isNull(_this3._treasureWrapDict[t.id]);
          }); // deal add

          tc.tmpArr.forEach(function (t, index) {
            // console.log("_syncTreasures add, id, ", id);
            var item = _this3._treasureList.addItem().asBtn;

            var wrap = _this3._treasureWrapDict[t.id] = _this3.wrap(TreasureItemWrap, item);

            wrap.refresh({
              t: t
            }, index);
            Tween.stopAllByTarget(item);
            item.setScale(0, 0);
            tween(item).to(0.4, {
              scaleX: 1,
              scaleY: 1
            }).start();
          });
        };

        _proto._syncHp = function _syncHp() {
          this._hpTxt.setVar("cur", "" + this._player.c.get(NpcBuffCom).numOf(BuffId.hp)).setVar("max", "" + this._player.c.get(NpcBuffCom).numOf(BuffId.maxhp)).flushVars();
        };

        _proto._syncCoin = function _syncCoin() {
          this._coinTxt.text = '' + this._player.buff.numOf(BuffId.coin);
        };

        _proto._syncDiamond = function _syncDiamond() {
          this._diamondTxt.text = '' + tc.k(UserKit).diamond;
        }
        /**让对应的圣物图标弹跳一下 */
        ;

        _proto.popTreasure = function popTreasure(id) {
          var _this$_treasureWrapDi;

          (_this$_treasureWrapDi = this._treasureWrapDict[id]) == null ? void 0 : _this$_treasureWrapDi.pop();
        };

        _proto.onScene = function onScene(scene) {
          this._sceneCtrl.selectedPage = scene;
        };

        _proto.OnGetBgAlpha = function OnGetBgAlpha() {
          return 0;
        };

        _proto.OnClose = function OnClose() {
          TopbarDlg._me = null;
        };

        _createClass(TopbarDlg, [{
          key: "hpTxt",
          get: function get() {
            return this._hpTxt;
          }
        }, {
          key: "coinTxt",
          get: function get() {
            return this._coinTxt;
          }
        }, {
          key: "diamondTxt",
          get: function get() {
            return this._diamondTxt;
          }
        }, {
          key: "lastTreasure",
          get: function get() {
            var _this$_treasureList$g;

            return (_this$_treasureList$g = this._treasureList.getChildAt(this._treasureList.numChildren - 1)) != null ? _this$_treasureList$g : this._treasureList;
          }
        }, {
          key: "dlgRes",
          get: function get() {
            return "TopbarDlg";
          }
        }, {
          key: "dlgLayer",
          get: function get() {
            return DlgLayer.Front;
          }
        }, {
          key: "deck",
          get: function get() {
            return this._deck;
          }
        }], [{
          key: "me",
          get: function get() {
            if (!this._me) {
              this._me = tc.k(DlgKit).fetchDlg(TopbarDlg);
            }

            return this._me;
          }
        }]);

        return TopbarDlg;
      }(DlgBase));
      TopbarDlg._me = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TouduAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './BuffId.ts', './NpcPropFunc.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, BuffId, NpcPropFunc, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2dbd2YDwtpMD65LMjH4cYeW", "TouduAct", undefined);

      var TouduAct = exports('TouduAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(TouduAct, _ActBase);

        function TouduAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = TouduAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.tactics,
            iconTip: this.time > 1 ? "" + this.time : "",
            title: "投毒",
            content: "\u8FD9\u540D\u654C\u4EBA\u5C06\u8981\u8D4B\u4E88\u73A9\u5BB6" + this.poison + "\u5C42\u4E2D\u6BD2" + (this.time > 1 ? "\uFF0C" + this.time + "\u6B21\uFF01" : "")
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.skill_act_byskill_over(function () {
            var time = _this.time;

            while (time--) {
              _this.target.buff.mod(BuffId.poison, _this.poison);
            }
          }, onOver);
        };

        _createClass(TouduAct, [{
          key: "poison",
          get: function get() {
            return parseInt(this.getProp(NpcPropFunc.toudu).args[0]);
          }
        }, {
          key: "time",
          get: function get() {
            var _this$getProp$args$;

            return parseInt((_this$getProp$args$ = this.getProp(NpcPropFunc.toudu).args[1]) != null ? _this$getProp$args$ : "1");
          }
        }]);

        return TouduAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Treasure.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ComModule.ts', './tc.ts', './TreasureCounter.ts', './TreasureItem.ts', './TreasurePlay.ts', './TreasurePropDelaer.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, ComModule, tc, TreasureCounter, TreasuerPropFunc, TreasurePlay, TreasurePropDelaer;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ComModule = module.ComModule;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      TreasureCounter = module.TreasureCounter;
    }, function (module) {
      TreasuerPropFunc = module.TreasuerPropFunc;
    }, function (module) {
      TreasurePlay = module.default;
    }, function (module) {
      TreasurePropDelaer = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "16c9f2EXbdE+JP7RQdevXUq", "Treasure", undefined);

      var Treasure = exports('default', /*#__PURE__*/function () {
        function Treasure(id, owner) {
          var _this = this;

          this._owner = void 0;
          this._id = void 0;
          this._c = void 0;
          var comOfThisTreasure = tc.p(TreasurePlay).getTreasureEffectCom(id);
          var logHandle = tc.p(TreasurePlay).getTreasureLogHandle(id);
          this._id = id;
          this._owner = owner;
          this._c = new ComModule();

          this._c.add(TreasurePropDelaer);

          if (this.info.getProp(TreasuerPropFunc.counter)) this._c.add(TreasureCounter);
          comOfThisTreasure && this._c.add(comOfThisTreasure);

          this._c.each(function (c) {
            return c.init(_this, logHandle);
          });
        }

        var _proto = Treasure.prototype;

        _proto.effect = function effect(stage, arg) {
          tc.tmpArr.length = 0;

          this._c.each(function (c) {
            return tc.tmpArr.push(c);
          });

          tc.tmpArr.sort(function (a, b) {
            return a.getEffectOrder(stage) - b.getEffectOrder(stage);
          });
          tc.tmpArr.forEach(function (c) {
            return c.effect(stage, arg);
          });
        };

        _proto.Dispose = function Dispose() {
          this._c.each(function (c) {
            return c.Dispose();
          });

          this._c = null;
        };

        _createClass(Treasure, [{
          key: "id",
          get: function get() {
            return this._id;
          }
        }, {
          key: "c",
          get: function get() {
            return this._c;
          }
        }, {
          key: "counter",
          get: function get() {
            return this.c.get(TreasureCounter);
          }
        }, {
          key: "owner",
          get: function get() {
            return this._owner;
          }
        }, {
          key: "info",
          get: function get() {
            return tc.p(TreasurePlay).infoOf(this._id);
          }
        }]);

        return Treasure;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TreasureBuyDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIDocker.ts', './BuffId.ts', './PlayerPlay.ts', './tc.ts', './TipDlg.ts', './TreasureIntroDlg.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, UIDocker, BuffId, PlayerPlay, tc, TipDlg, TreasureIntroDlg;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIDocker = module.UIDocker;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      TipDlg = module.default;
    }, function (module) {
      TreasureIntroDlg = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f2214mgBfhJX7jzyQ6tyaoR", "TreasureBuyDlg", undefined);

      var TreasureBuyDlg = exports('default', /*#__PURE__*/function (_TreasureIntroDlg) {
        _inheritsLoose(TreasureBuyDlg, _TreasureIntroDlg);

        function TreasureBuyDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _TreasureIntroDlg.call.apply(_TreasureIntroDlg, [this].concat(args)) || this;
          _this._price = void 0;
          _this._onSold = void 0;
          return _this;
        }

        var _proto = TreasureBuyDlg.prototype;

        _proto.setup = function setup(id, price, onSold) {
          this.setId(id);

          this._setPrice(price);

          this._onSold = onSold;
          return this;
        };

        _proto.OnInit = function OnInit() {
          this.dock(UIDocker.Dock.GhostUp);

          _TreasureIntroDlg.prototype.OnInit.call(this);

          this.getController("salemode").selectedIndex = 1;
          this.addBtnEvt("buy", this._buy);
          this.addBtnEvt("close", this.close);
        };

        _proto._setPrice = function _setPrice(coin) {
          this._price = coin;
          this.getTxt("coin").text = '' + coin;
        };

        _proto._buy = function _buy(e) {
          var price = this._price;
          var player = tc.p(PlayerPlay).player;
          var playerCoin = player.buff.numOf(BuffId.coin);

          if (playerCoin < price) {
            TipDlg.pop("金币不足");
            e();
          } else {
            player.buff.mod(BuffId.coin, -price);
            this.close();

            this._onSold();
          }
        };

        return TreasureBuyDlg;
      }(TreasureIntroDlg));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TreasureConfirmDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIDocker.ts', './TreasureIntroDlg.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, UIDocker, TreasureIntroDlg;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIDocker = module.UIDocker;
    }, function (module) {
      TreasureIntroDlg = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a36e4xam+dM75oORQXhpa/c", "TreasureConfirmDlg", undefined);

      var TreasureConfirmDlg = exports('TreasureConfirmDlg', /*#__PURE__*/function (_TreasureIntroDlg) {
        _inheritsLoose(TreasureConfirmDlg, _TreasureIntroDlg);

        function TreasureConfirmDlg() {
          return _TreasureIntroDlg.apply(this, arguments) || this;
        }

        var _proto = TreasureConfirmDlg.prototype;

        _proto.setup = function setup(id, onConfirm) {
          var _this = this;

          this.setId(id);
          this.addBtnEvt("confirm", function () {
            onConfirm == null ? void 0 : onConfirm(id);

            _this.close();
          });
          return this;
        };

        _proto.OnInit = function OnInit() {
          this.dock(UIDocker.Dock.GhostUp);

          _TreasureIntroDlg.prototype.OnInit.call(this);

          this.getController("salemode").selectedIndex = 2;
        };

        return TreasureConfirmDlg;
      }(TreasureIntroDlg));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TreasureCounter.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ATreasureCom.ts', './TreasureEffectStage.ts', './TreasureItem.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, EventTarget, ATreasureCom, TreasureEffectStage, TreasuerPropFunc;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }, function (module) {
      ATreasureCom = module.default;
    }, function (module) {
      TreasureEffectStage = module.TreasureEffectStage;
    }, function (module) {
      TreasuerPropFunc = module.TreasuerPropFunc;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e23d9FXgoRKQJa4xnmRi94u", "TreasureCounter", undefined);

      var TreasureCounter = exports('TreasureCounter', /*#__PURE__*/function (_ATreasureCom) {
        _inheritsLoose(TreasureCounter, _ATreasureCom);

        function TreasureCounter() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ATreasureCom.call.apply(_ATreasureCom, [this].concat(args)) || this;
          _this._e = void 0;
          return _this;
        }

        var _proto = TreasureCounter.prototype;

        _proto.OnInit = function OnInit() {
          this._e = new EventTarget();
        };

        _proto.OnDestory = function OnDestory() {
          this._e = null;
        };

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == TreasureEffectStage.OnGet) {
            this.counter = parseInt(this.treasure.info.getProp(TreasuerPropFunc.counter).args[0]);
          } else if (stage == TreasureEffectStage.OnOut) {
            this.clearLog("counter");
          }
        };

        _proto.revise = function revise(num, log) {
          this.counter = num;
        };

        _createClass(TreasureCounter, [{
          key: "e",
          get: function get() {
            return this._e;
          }
        }, {
          key: "counter",
          get: function get() {
            return parseInt(this.getLog('counter'));
          },
          set: function set(v) {
            if (v == this.counter) return;
            this.reviseLog("counter", v.toString());

            this._e.emit(TreasureCounter.Events.COUNTER_CHANGE, v);
          }
        }]);

        return TreasureCounter;
      }(ATreasureCom));
      TreasureCounter.Events = {
        COUNTER_CHANGE: "COUNTER_CHANGE"
      };

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TreasureEffectOrder.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('TreasureEffectOrder', void 0);

      cclegacy._RF.push({}, "81539RldylBK6nL7HI4bdds", "TreasureEffectOrder", undefined);

      var TreasureEffectOrder;

      (function (TreasureEffectOrder) {
        TreasureEffectOrder[TreasureEffectOrder["first"] = 0] = "first";
        TreasureEffectOrder[TreasureEffectOrder["beforebase"] = 1] = "beforebase";
        TreasureEffectOrder[TreasureEffectOrder["base"] = 2] = "base";
        TreasureEffectOrder[TreasureEffectOrder["latebase"] = 3] = "latebase";
        TreasureEffectOrder[TreasureEffectOrder["last"] = 4] = "last";
      })(TreasureEffectOrder || (TreasureEffectOrder = exports('TreasureEffectOrder', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TreasureEffectStage.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('TreasureEffectStage', void 0);

      cclegacy._RF.push({}, "7f2547qx59GpJLkXW1oCxnc", "TreasureEffectStage", undefined);

      var TreasureEffectStage;

      (function (TreasureEffectStage) {
        TreasureEffectStage[TreasureEffectStage["OnGet"] = 0] = "OnGet";
        TreasureEffectStage[TreasureEffectStage["OnRecover"] = 1] = "OnRecover";
        TreasureEffectStage[TreasureEffectStage["OnOut"] = 2] = "OnOut";
      })(TreasureEffectStage || (TreasureEffectStage = exports('TreasureEffectStage', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TreasureFeixingBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Util.ts', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, randomInt, TreasureId, ATreasureBuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      randomInt = module.randomInt;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "86acbX8msdIs704Li1X9UdA", "TreasureFeixingBuffCom", undefined);

      var TreasureFeixingBuffCom = exports('default', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(TreasureFeixingBuffCom, _ATreasureBuffCom);

        function TreasureFeixingBuffCom() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = TreasureFeixingBuffCom.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.HandCardIn, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          var _this = this;

          if (stage == BuffNS.EffectStage.HandCardIn) {
            var lives = this.owner.info.getLiveEnemys();

            if (lives.length > 0) {
              var target = lives[randomInt(0, lives.length)];
              target.info.fighterWrap.playByatk(function () {
                target.cutHp(_this.buff.num, null, _this.buff.info.name);
              });
              this.popWrap();
            }
          }
        };

        _createClass(TreasureFeixingBuffCom, [{
          key: "tid",
          get: function get() {
            return TreasureId.Feixing;
          }
        }]);

        return TreasureFeixingBuffCom;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TreasureId.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('TreasureId', void 0);

      cclegacy._RF.push({}, "5990emhdZJOELorQptnizUy", "TreasureId", undefined);

      var TreasureId;

      (function (TreasureId) {
        TreasureId[TreasureId["Qiangzhuang"] = 0] = "Qiangzhuang";
        TreasureId[TreasureId["Beibao"] = 1] = "Beibao";
        TreasureId[TreasureId["Lazhu"] = 2] = "Lazhu";
        TreasureId[TreasureId["Lueduo"] = 3] = "Lueduo";
        TreasureId[TreasureId["Baozhen"] = 1000] = "Baozhen";
        TreasureId[TreasureId["Shoutao"] = 1001] = "Shoutao";
        TreasureId[TreasureId["Nengliangyj"] = 1002] = "Nengliangyj";
        TreasureId[TreasureId["Xuebao"] = 1003] = "Xuebao";
        TreasureId[TreasureId["Pingguo"] = 1004] = "Pingguo";
        TreasureId[TreasureId["Yinsheny"] = 1005] = "Yinsheny";
        TreasureId[TreasureId["Jijiub"] = 1006] = "Jijiub";
        TreasureId[TreasureId["Duyaop"] = 1007] = "Duyaop";
        TreasureId[TreasureId["Pojiad"] = 1008] = "Pojiad";
        TreasureId[TreasureId["Shoulian"] = 1009] = "Shoulian";
        TreasureId[TreasureId["Miyao"] = 1010] = "Miyao";
        TreasureId[TreasureId["Xiaoyuand"] = 2000] = "Xiaoyuand";
        TreasureId[TreasureId["Zimuj"] = 2001] = "Zimuj";
        TreasureId[TreasureId["Feixing"] = 2002] = "Feixing";
        TreasureId[TreasureId["Kahe"] = 2003] = "Kahe";
        TreasureId[TreasureId["Liandao"] = 2004] = "Liandao";
        TreasureId[TreasureId["Mangguo"] = 2005] = "Mangguo";
        TreasureId[TreasureId["Yuandun"] = 2006] = "Yuandun";
        TreasureId[TreasureId["Hundeng"] = 2007] = "Hundeng";
        TreasureId[TreasureId["Qiangtou"] = 2008] = "Qiangtou";
        TreasureId[TreasureId["Qiandai"] = 2009] = "Qiandai";
        TreasureId[TreasureId["Yaogao"] = 2010] = "Yaogao";
        TreasureId[TreasureId["Yishib"] = 2011] = "Yishib";
        TreasureId[TreasureId["Xingfenj"] = 2012] = "Xingfenj";
        TreasureId[TreasureId["Shizij"] = 2013] = "Shizij";
        TreasureId[TreasureId["Suozij"] = 2014] = "Suozij";
        TreasureId[TreasureId["Dalian"] = 2015] = "Dalian";
        TreasureId[TreasureId["Dunang"] = 2016] = "Dunang";
        TreasureId[TreasureId["Shuijingq"] = 2017] = "Shuijingq";
        TreasureId[TreasureId["Cizhen"] = 3000] = "Cizhen";
        TreasureId[TreasureId["Keji"] = 3001] = "Keji";
        TreasureId[TreasureId["Lunpan"] = 3002] = "Lunpan";
        TreasureId[TreasureId["Xipaiq"] = 3003] = "Xipaiq";
        TreasureId[TreasureId["Zizhuc"] = 3004] = "Zizhuc";
        TreasureId[TreasureId["Chunqiub"] = 3005] = "Chunqiub";
        TreasureId[TreasureId["Liliangsq"] = 10000] = "Liliangsq";
        TreasureId[TreasureId["Fangyusq"] = 10001] = "Fangyusq";
        TreasureId[TreasureId["Huifusq"] = 10002] = "Huifusq";
        TreasureId[TreasureId["Shitou"] = 10003] = "Shitou";
      })(TreasureId || (TreasureId = exports('TreasureId', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TreasureIntroDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DlgBase.ts', './DlgKit.ts', './TreasurePlay.ts', './tc.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, DlgBase, DlgKit, DlgLayer, TreasurePlay, tc;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgKit = module.DlgKit;
      DlgLayer = module.DlgLayer;
    }, function (module) {
      TreasurePlay = module.default;
    }, function (module) {
      tc = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "30d2cgBqyJOdK6knuQD0RE/", "TreasureIntroDlg", undefined);

      var TreasureIntroDlg = exports('default', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(TreasureIntroDlg, _DlgBase);

        function TreasureIntroDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._title = void 0;
          _this._content = void 0;
          _this._treasure = void 0;
          _this.tid = void 0;
          return _this;
        }

        TreasureIntroDlg.pop = function pop(id) {
          tc.k(DlgKit).fetchDlg(TreasureIntroDlg).setId(id);
        };

        var _proto = TreasureIntroDlg.prototype;

        _proto.OnInit = function OnInit() {
          this._title = this.getTxt("title");
          this._content = this.getTxt("content");
          this._treasure = this.getLoader("treasure");
        };

        _proto.setId = function setId(id) {
          this.tid = id;
          var info = tc.p(TreasurePlay).infoOf(id);
          this._title.text = info.name;
          this._content.text = info.desc;
          this._treasure.url = tc.resUrl(info.skin);
        };

        _createClass(TreasureIntroDlg, [{
          key: "dlgRes",
          get: function get() {
            return "TreasureIntroDlg";
          }
        }, {
          key: "dlgLayer",
          get: function get() {
            return DlgLayer.Front;
          }
        }]);

        return TreasureIntroDlg;
      }(DlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TreasureItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('TreasuerPropFunc', void 0);

      cclegacy._RF.push({}, "06ec3PnwYZFPYyAKMGhq79a", "TreasureItem", undefined);

      var TreasuerPropFunc;

      (function (TreasuerPropFunc) {
        TreasuerPropFunc["getbuff"] = "getbuff";
        TreasuerPropFunc["counter"] = "counter";
        TreasuerPropFunc["val"] = "val";
      })(TreasuerPropFunc || (TreasuerPropFunc = exports('TreasuerPropFunc', {})));

      var TreasureItem = exports('default', /*#__PURE__*/function () {
        function TreasureItem(_data) {
          var _this = this;

          this._props = void 0;
          this._propValDict = void 0;
          this._desc = void 0;
          this._data = _data;
          this._props = [];
          this._propValDict = {};

          if (this.prop) {
            var raws = this.prop.match(/(?<=\【)(.+?)(?=\】)/g);

            if (raws) {
              raws.forEach(function (raw) {
                var _raw$split = raw.split("("),
                    func = _raw$split[0],
                    rawArgs = _raw$split[1];

                var args = rawArgs.replace(')', '').split(',');
                raw = "\u3010" + raw + "\u3011";

                _this._props.push({
                  func: func,
                  args: args,
                  raw: raw
                });

                if (func == TreasuerPropFunc.val) {
                  _this._propValDict[args[0]] = args[1];
                }
              });
            }
          }

          var desc = this.rawdesc;
          Object.keys(this._propValDict).forEach(function (key) {
            desc = desc.replaceAll("\u3010" + key + "\u3011", _this._propValDict[key]);
          });
          this._desc = desc;
        }

        var _proto = TreasureItem.prototype;

        _proto.getProp = function getProp(func) {
          return this._props.filter(function (p) {
            return p.func === func;
          })[0];
        };

        _proto.getProps = function getProps(func) {
          return this._props.filter(function (p) {
            return p.func === func;
          });
        };

        _proto.getVal = function getVal(key) {
          return this._propValDict[key];
        };

        _proto.getIntVal = function getIntVal(key) {
          return parseInt(this._propValDict[key]);
        };

        _createClass(TreasureItem, [{
          key: "id",
          get: function get() {
            return this._data.id;
          }
        }, {
          key: "name",
          get: function get() {
            return this._data.name;
          }
        }, {
          key: "rare",
          get: function get() {
            return this._data.rare;
          }
        }, {
          key: "rareEnum",
          get: function get() {
            return this._data.rare;
          }
        }, {
          key: "rawdesc",
          get: function get() {
            return this._data.desc;
          }
        }, {
          key: "desc",
          get: function get() {
            return this._desc;
          }
        }, {
          key: "skin",
          get: function get() {
            return this._data.skin;
          }
        }, {
          key: "prop",
          get: function get() {
            return this._data.prop;
          }
        }, {
          key: "props",
          get: function get() {
            return this._props;
          }
        }]);

        return TreasureItem;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TreasureItem4SellWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TreasureBuyDlg.ts', './TreasureIntroDlg.ts', './DlgKit.ts', './tc.ts', './TreasureItemWrap.ts', './PlayerPlay.ts', './PlayerTreasureCom.ts', './ItemFly.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, TreasureBuyDlg, TreasureIntroDlg, DlgKit, tc, TreasureItemWrap, PlayerPlay, PlayerTreasureCom, ItemFly;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TreasureBuyDlg = module.default;
    }, function (module) {
      TreasureIntroDlg = module.default;
    }, function (module) {
      DlgKit = module.DlgKit;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      TreasureItemWrap = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      PlayerTreasureCom = module.default;
    }, function (module) {
      ItemFly = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3e9d07HnsFCd6up8MPyKJdf", "TreasureItem4SellWrap", undefined);

      var TreasureItem4SellWrap = exports('TreasureItem4SellWrap', /*#__PURE__*/function (_TreasureItemWrap) {
        _inheritsLoose(TreasureItem4SellWrap, _TreasureItemWrap);

        function TreasureItem4SellWrap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _TreasureItemWrap.call.apply(_TreasureItemWrap, [this].concat(args)) || this;
          _this._coin = void 0;
          _this._coinTxt = void 0;
          _this._buyBtn = void 0;
          _this._salemodeCtrl = void 0;
          return _this;
        }

        var _proto = TreasureItem4SellWrap.prototype;

        _proto.OnInit = function OnInit() {
          _TreasureItemWrap.prototype.OnInit.call(this);

          this._salemodeCtrl = this.getController("salemode");
          this._coinTxt = this.getTxt("coinTxt");
          this._buyBtn = this.getBtn("buy");
          this._salemodeCtrl.selectedIndex = 1;
          this.addBtnEvt(this._buyBtn, this._dealBuy);
        };

        _proto._dealBuy = function _dealBuy(enbaleBtn) {
          if (this._salemodeCtrl.selectedIndex == 1) {
            tc.k(DlgKit).fetchDlg(TreasureBuyDlg).setup(this.tid, this._coin, this._onSold.bind(this));
          } else {
            TreasureIntroDlg.pop(this.tid);
          }

          enbaleBtn(); // const coin = this._coin;
          // const playerCoin = player.buff.numOf(BuffId.coin);
          // if (playerCoin > coin) {
          //     player.buff.mod(BuffId.coin, -coin);
          //     player.c.get(PlayerTreasureCom).add(this.tid);
          //     HoverTipDlg.hide();
          //     this.hide();
          // } else {
          //     TipDlg.pop("金币不足");
          //     // this._buyBtn.enabled = true;
          // }
        };

        _proto._onSold = function _onSold() {
          var _this2 = this;

          this._salemodeCtrl.selectedIndex = 2;
          ItemFly.flyTreasure(0, 1, this.tid, function () {
            var player = tc.p(PlayerPlay).player;
            player.c.get(PlayerTreasureCom).add(_this2.tid);
          }, this.fgc);
        };

        _proto.setCoin = function setCoin(coin) {
          this._coin = coin;
          this._coinTxt.text = coin + ''; // this._buyBtn.text = coin + '金币';
        };

        return TreasureItem4SellWrap;
      }(TreasureItemWrap));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TreasureItemWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TreasureIntroDlg.ts', './TreasurePlay.ts', './TreasureCounter.ts', './tc.ts', './ListItem.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, TreasureIntroDlg, TreasurePlay, TreasureCounter, tc, ListItem;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TreasureIntroDlg = module.default;
    }, function (module) {
      TreasurePlay = module.default;
    }, function (module) {
      TreasureCounter = module.TreasureCounter;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      ListItem = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c4ddeZBU3RGM4C8pOpyxQr1", "TreasureItemWrap", undefined);

      var TreasureItemWrap = exports('default', /*#__PURE__*/function (_ListItem) {
        _inheritsLoose(TreasureItemWrap, _ListItem);

        function TreasureItemWrap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ListItem.call.apply(_ListItem, [this].concat(args)) || this;
          _this._onFire = void 0;
          _this._lod = void 0;
          _this._counter = void 0;
          _this._iconPopIntro = void 0;
          _this.tid = void 0;
          return _this;
        }

        var _proto = TreasureItemWrap.prototype;

        _proto.OnInit = function OnInit() {
          var _this2 = this;

          this._lod = this.getLoader("icon");
          this._counter = this.getTxt('title');
          this._onFire = false;
          this.addBtnEvt('icon', function (enbaleBtn) {
            if (_this2._iconPopIntro) {
              TreasureIntroDlg.pop(_this2.tid);
            }

            enbaleBtn();
          });
        };

        _proto.OnRefresh = function OnRefresh(data, index) {
          var _data$iconPopIntro;

          this._iconPopIntro = (_data$iconPopIntro = data.iconPopIntro) != null ? _data$iconPopIntro : true;

          if (data.t) {
            this._showTreasure(data.t);
          } else {
            this._showTreasureInfo(data.id);
          }
        };

        _proto._showTreasureInfo = function _showTreasureInfo(tid) {
          if (this._onFire) return;
          this.tid = tid;
          var info = tc.p(TreasurePlay).infoOf(tid);
          this._lod.url = tc.resUrl(info.skin);
          this._counter.visible = false;
        };

        _proto._showTreasure = function _showTreasure(t) {
          var _this3 = this;

          if (this._onFire) return;
          this._onFire = true;
          this.tid = t.id;
          var info = t.info;
          var counterCom = t.counter;
          this._lod.url = tc.resUrl(info.skin);

          if (counterCom) {
            this._counter.visible = true;
            this._counter.text = '' + counterCom.counter;
            this.addEvt(counterCom.e, TreasureCounter.Events.COUNTER_CHANGE, function () {
              _this3._counter.text = '' + counterCom.counter;
            });
          } else {
            this._counter.visible = false;
          }
        };

        _proto.pop = function pop() {
          this.fgc.getTransition("pop").play();
        };

        return TreasureItemWrap;
      }(ListItem));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TreasurePlay.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs', './Xls.ts', './TopbarDlg.ts', './DlgKit.ts', './UserKit.ts', './Util.ts', './tc.ts', './PlayerTreasureCom.ts', './PlayerPlay.ts', './Kahe.ts', './TreasureId.ts', './TreasureItem.ts', './TreasureRare.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, PlayBase, Xls, TopbarDlg, DlgKit, UserKit, enumValues, pick, randomInt, tc, PlayerTreasureCom, PlayerPlay, Kahe, TreasureId, TreasureItem, TreasureRare;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlayBase = module.PlayBase;
    }, function (module) {
      Xls = module.default;
    }, function (module) {
      TopbarDlg = module.default;
    }, function (module) {
      DlgKit = module.DlgKit;
    }, function (module) {
      UserKit = module.default;
    }, function (module) {
      enumValues = module.enumValues;
      pick = module.pick;
      randomInt = module.randomInt;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      PlayerTreasureCom = module.default;
    }, function (module) {
      PlayerPlay = module.default;
    }, function (module) {
      Kahe = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      TreasureItem = module.default;
    }, function (module) {
      TreasureRare = module.TreasureRare;
    }],
    execute: function () {
      var _TreasurePlay$_treasu;

      cclegacy._RF.push({}, "f138emNzTFPuJzH6OMBH8Sx", "TreasurePlay", undefined);

      var TreasurePlay = exports('default', /*#__PURE__*/function (_PlayBase) {
        _inheritsLoose(TreasurePlay, _PlayBase);

        function TreasurePlay() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _PlayBase.call.apply(_PlayBase, [this].concat(args)) || this;
          _this.playName = "TreasurePlay";
          _this._treasureItemCache = void 0;
          _this._treasuerPool = void 0;
          _this._exclusivePool = void 0;
          _this._rarePool = void 0;
          _this._epicPool = void 0;
          _this._tmpArr = void 0;
          return _this;
        }

        var _proto = TreasurePlay.prototype;

        _proto.OnInit = function OnInit(complete) {
          var _this2 = this;

          this._tmpArr = [];
          this._treasureItemCache = new Map();
          this._treasuerPool = [];
          this._rarePool = [];
          this._epicPool = [];
          this._exclusivePool = [];
          enumValues(TreasureId, "number").forEach(function (id) {
            var rare = Xls.treasureDatasById[id].rare;

            switch (rare) {
              case TreasureRare.Common:
                _this2._treasuerPool.push(id);

                break;

              case TreasureRare.Rare:
                _this2._rarePool.push(id);

                break;

              case TreasureRare.Epic:
                _this2._epicPool.push(id);

                break;

              case TreasureRare.Exclusive:
                _this2._exclusivePool.push(id);

                break;
            }
          });
          complete();
        };

        _proto.OnLateInit = function OnLateInit(complete) {
          complete();
        };

        _proto.OnDispose = function OnDispose() {
          this._tmpArr = null;
          this._treasureItemCache = null;
          this._treasuerPool = null;
          this._rarePool = null;
          this._epicPool = null;
        };

        _proto.loadUserdata = function loadUserdata() {
          var _this3 = this;

          var treasureUnlock = tc.k(UserKit).treasureUnlock;
          this._treasuerPool = this._treasuerPool.concat(treasureUnlock);
          this._treasuerPool = this._treasuerPool.filter(function (id, idx) {
            return _this3._treasuerPool.indexOf(id) === idx;
          });
        }
        /**解锁宝物，优先随机解锁Rare，其次Epic */
        ;

        _proto.unlockTreasure = function unlockTreasure(num) {
          var _this$_treasuerPool;

          var rlt = [];
          var curSaveUnlock = tc.k(UserKit).treasureUnlock;

          var lockingRare = this._rarePool.filter(function (c) {
            return !curSaveUnlock.includes(c);
          });

          var lockingEpic = this._epicPool.filter(function (c) {
            return !curSaveUnlock.includes(c);
          });

          console.log("lockingRare", lockingRare);
          console.log("lockingEpic", lockingEpic);

          for (var i = 0; i < num; i++) {
            if (lockingRare.length > 0) {
              var t = pick(lockingRare);
              lockingRare.remove(t);
              rlt.push(t);
            } else if (lockingEpic.length > 0) {
              var _t = pick(lockingEpic);

              lockingEpic.remove(_t);
              rlt.push(_t);
            }
          }

          (_this$_treasuerPool = this._treasuerPool).push.apply(_this$_treasuerPool, rlt);

          curSaveUnlock.push.apply(curSaveUnlock, rlt);
          tc.k(UserKit).treasureUnlock = curSaveUnlock;
          return rlt;
        };

        _proto.rawInfoOf = function rawInfoOf(id) {
          return Xls.treasureDatasById[id];
        };

        _proto.infoOf = function infoOf(id) {
          if (!this._treasureItemCache) {
            this._treasureItemCache = new Map();
          }

          if (!this._treasureItemCache.has(id)) {
            this._treasureItemCache.set(id, new TreasureItem(Xls.treasureDatasById[id]));
          }

          return this._treasureItemCache.get(id);
        };

        _proto.pop = function pop(tid) {
          tc.k(DlgKit).fetchDlg(TopbarDlg).popTreasure(tid);
        };

        _proto.getTreasureEffectCom = function getTreasureEffectCom(id) {
          return TreasurePlay._treasuerDict[id];
        };

        _proto.getTreasureLogHandle = function getTreasureLogHandle(id) {
          var player = tc.p(PlayerPlay).player;
          var treasuerCom = player.c.get(PlayerTreasureCom);
          return {
            reviseLog: function reviseLog(subkey, value) {
              treasuerCom.reviseLog(id, subkey, value);
            },
            getLog: function getLog(subkey) {
              return treasuerCom.getLog(id, subkey);
            }
          };
        };

        _proto.randomNonOwnTreasure = function randomNonOwnTreasure(num, option) {
          var _option$downpick;

          if (num < 1) return;
          var limitRare = option == null ? void 0 : option.limitRare;
          var downpick = (_option$downpick = option == null ? void 0 : option.downpick) != null ? _option$downpick : false;
          this._tmpArr = this._treasuerPool.filter(function (id) {
            return !tc.p(PlayerPlay).player.c.get(PlayerTreasureCom).has(id);
          });

          if (limitRare) {
            this._tmpArr = this._tmpArr.filter(function (id) {
              return limitRare.includes(Xls.treasureDatasById[id].rare);
            });

            if (downpick && this._tmpArr.length < num) {
              var downRare = [TreasureRare.Epic, TreasureRare.Rare, TreasureRare.Common].filter(function (t) {
                return !limitRare.includes(t);
              });

              if (downRare[0]) {
                limitRare.push(downRare[0]);
                return this.randomNonOwnTreasure(num, option);
              }
            }
          }

          var ret = [];

          while (ret.length < num && this._tmpArr.length > 0) {
            var idx = randomInt(0, this._tmpArr.length);
            ret.push(this._tmpArr[idx]);

            this._tmpArr.splice(idx, 1);
          }

          return ret;
        };

        _createClass(TreasurePlay, [{
          key: "treasuerPool",
          get: function get() {
            return this._treasuerPool.slice();
          }
        }, {
          key: "lockingNum",
          get: function get() {
            return this._rarePool.length + this._epicPool.length - tc.k(UserKit).treasureUnlock.length;
          }
        }, {
          key: "exclusivePool",
          get: function get() {
            return this._exclusivePool;
          }
        }, {
          key: "rarePoolSize",
          get: function get() {
            return this._rarePool.length;
          }
        }, {
          key: "epicPoolSize",
          get: function get() {
            return this._epicPool.length;
          }
        }]);

        return TreasurePlay;
      }(PlayBase));
      TreasurePlay._treasuerDict = (_TreasurePlay$_treasu = {}, _TreasurePlay$_treasu[TreasureId.Kahe] = Kahe, _TreasurePlay$_treasu);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TreasurePropDelaer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BuffId.ts', './ATreasureCom.ts', './TreasureEffectStage.ts', './TreasureItem.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, BuffId, ATreasureCom, TreasureEffectStage, TreasuerPropFunc;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      ATreasureCom = module.default;
    }, function (module) {
      TreasureEffectStage = module.TreasureEffectStage;
    }, function (module) {
      TreasuerPropFunc = module.TreasuerPropFunc;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e555dpTBStN26F37HYPVg2F", "TreasurePropDelaer", undefined);

      var TreasurePropDelaer = exports('default', /*#__PURE__*/function (_ATreasureCom) {
        _inheritsLoose(TreasurePropDelaer, _ATreasureCom);

        function TreasurePropDelaer() {
          return _ATreasureCom.apply(this, arguments) || this;
        }

        var _proto = TreasurePropDelaer.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          var _this = this;

          if (stage == TreasureEffectStage.OnGet || stage == TreasureEffectStage.OnRecover) {
            this.treasure.info.getProps(TreasuerPropFunc.getbuff).forEach(function (prop) {
              var num = parseInt(prop.args[0]);
              var buffid = parseInt(prop.args[1]);
              if (stage == TreasureEffectStage.OnRecover && (buffid == BuffId.hp || buffid == BuffId.maxhp)) ;else {
                _this.owner.buff.mod(buffid, num);
              }
            });
          }

          if (stage == TreasureEffectStage.OnOut) {
            this.treasure.info.getProps(TreasuerPropFunc.getbuff).forEach(function (prop) {
              var num = parseInt(prop.args[0]);
              var buffid = parseInt(prop.args[1]);

              if (buffid != BuffId.hp) {
                _this.owner.buff.mod(buffid, -num);
              }
            });
          }
        };

        return TreasurePropDelaer;
      }(ATreasureCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TreasureRare.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('TreasureRare', void 0);

      cclegacy._RF.push({}, "468c0gTgQBLR4WNEuaPS0fc", "TreasureRare", undefined);

      var TreasureRare;

      (function (TreasureRare) {
        TreasureRare["Exclusive"] = "\u4E13\u5C5E";
        TreasureRare["Common"] = "\u666E\u901A";
        TreasureRare["Rare"] = "\u7A00\u6709";
        TreasureRare["Epic"] = "\u53F2\u8BD7";
        TreasureRare["System"] = "\u7CFB\u7EDF";
      })(TreasureRare || (TreasureRare = exports('TreasureRare', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TreasureRwdDlg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DlgBase.ts', './DlgKit.ts', './UIDocker.ts', './TreasurePlay.ts', './tc.ts', './TreasureItemWrap.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, tween, DlgBase, DlgKit, UIDocker, TreasurePlay, tc, TreasureItemWrap;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
    }, function (module) {
      DlgBase = module.DlgBase;
    }, function (module) {
      DlgKit = module.DlgKit;
    }, function (module) {
      UIDocker = module.UIDocker;
    }, function (module) {
      TreasurePlay = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      TreasureItemWrap = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e8745O4u/FP+oD2UfHU/QhM", "TreasureRwdDlg", undefined);

      var TreasureRwdDlg = exports('default', /*#__PURE__*/function (_DlgBase) {
        _inheritsLoose(TreasureRwdDlg, _DlgBase);

        function TreasureRwdDlg() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _DlgBase.call.apply(_DlgBase, [this].concat(args)) || this;
          _this._tid = void 0;
          _this._step = void 0;
          _this._scene = void 0;
          _this._box = void 0;
          _this._treasure = void 0;
          _this._name = void 0;
          _this._onOver = void 0;
          return _this;
        }

        TreasureRwdDlg.pop = function pop(id, scene, onOver) {
          return tc.k(DlgKit).fetchDlg(TreasureRwdDlg).setup(id, scene, onOver);
        };

        var _proto = TreasureRwdDlg.prototype;

        _proto.setup = function setup(id, scene, onOver) {
          this._setTreasure(id);

          this._scene.setSelectedPage(scene);

          this._setOnOver(onOver);

          return this;
        };

        _proto.OnInit = function OnInit() {
          var _this2 = this;

          this.dock(UIDocker.Dock.Bubble);
          this._step = this.getController("step");
          this._scene = this.getController("scene");
          this._treasure = this.wrap(TreasureItemWrap, "treasure");
          this._name = this.getTxt("name");
          this._box = this.getCom("box");
          this.addBtnEvt("box", function (enableBtn) {
            var oriScale = _this2._box.scaleX;
            tween(_this2._box).to(0.2, {
              scaleX: oriScale * 0.7,
              scaleY: oriScale * 0.7
            }).to(0.3, {
              scaleX: oriScale * 0.6,
              scaleY: oriScale * 0.6
            }).delay(0.2).to(0.1, {
              scaleX: oriScale * 1.3,
              scaleY: oriScale * 1.3
            }).delay(0.2).call(function () {
              _this2._step.setSelectedIndex(1);
            }).start();
          });
          this.addBtnEvt('confirm', function () {
            _this2._onOver == null ? void 0 : _this2._onOver();

            _this2.close();
          });
        };

        _proto._setTreasure = function _setTreasure(id) {
          var info = tc.p(TreasurePlay).infoOf(id);
          this._tid = id;

          this._treasure.refresh({
            id: info.id
          }, 0);

          this._name.text = info.name;
        };

        _proto._setOnOver = function _setOnOver(onOver) {
          this._onOver = onOver;
        };

        _proto.OnBgClickClose = function OnBgClickClose() {
          return false;
        };

        _createClass(TreasureRwdDlg, [{
          key: "dlgRes",
          get: function get() {
            return "TreasureRwdDlg";
          }
        }]);

        return TreasureRwdDlg;
      }(DlgBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TrueEndPlay.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs', './UserKit.ts', './tc.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, PlayBase, UserKit, tc;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PlayBase = module.PlayBase;
    }, function (module) {
      UserKit = module.default;
    }, function (module) {
      tc = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4178d9dSahJsJcomettGlUO", "TrueEndPlay", undefined);
      /**真结局玩法 */


      var TrueEndPlay = exports('TrueEndPlay', /*#__PURE__*/function (_PlayBase) {
        _inheritsLoose(TrueEndPlay, _PlayBase);

        function TrueEndPlay() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _PlayBase.call.apply(_PlayBase, [this].concat(args)) || this;
          _this.playName = "TrueEndPlay";
          return _this;
        }

        var _proto = TrueEndPlay.prototype;

        _proto.OnInit = function OnInit(complete) {
          complete();
        };

        _proto.OnLateInit = function OnLateInit(complete) {
          complete();
        };

        _proto.OnDispose = function OnDispose() {};

        _proto.isTrueEndAvailable = function isTrueEndAvailable() {
          return tc.k(UserKit).trueEndRecord.passArea3Boss > 1;
        };

        _proto.onPassArea3Boss = function onPassArea3Boss() {
          var data = tc.k(UserKit).trueEndRecord;
          data.passArea3Boss++;
          tc.k(UserKit).trueEndRecord = data;
        };

        return TrueEndPlay;
      }(PlayBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TSDecorators.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        __any_to_str: __any_to_str,
        logMethod: logMethod
      });

      cclegacy._RF.push({}, "b1b24sknkVB0oXZiQMq7pAW", "TSDecorators", undefined);
      /**
       * TS装饰器
       * 文档：https://www.tslang.cn/docs/handbook/decorators.html
       **/


      function __any_to_str(val) {
        if (val === undefined) {
          return 'undefined';
        }

        if (val === null) {
          return 'null';
        }

        if (val === true) {
          return 'true';
        }

        if (val === false) {
          return 'false';
        }

        if (typeof val === 'string') {
          return val;
        }

        if (typeof val === 'function') {
          return 'function';
        }

        return JSON.stringify(val);
      }
      /**装饰某个方法，当方法调用时，打印调用参数和返回参数 */


      function logMethod(mark) {
        return function (target, propertyKey, descriptor) {
          // (1)保存当前的方法
          var old = descriptor.value; // (2)改写方法

          descriptor.value = function () {
            console.info("/* --------------------------------- " + mark + " \u5F00\u59CB --------------------------------- */");
            console.info(propertyKey + '(),params:');

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            args.forEach(function (arg) {
              try {
                console.info(__any_to_str(arg));
              } catch (err) {
                console.info(arg);
              }
            });
            var ret = old.apply(this, args);
            console.info('result:');

            try {
              console.info(__any_to_str(ret));
            } catch (err) {
              console.error(ret);
            }

            console.info("/* --------------------------------- " + mark + " \u7ED3\u675F --------------------------------- */");
            return ret;
          };
        };
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TuduBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './CardPlay.ts', './FightCardSeekLogic.ts', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, tc, CardPlay, FightCardSeekLogic, ABuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      FightCardSeekLogic = module.FightCardSeekLogic;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "77e1886aKdDfI37igG1KaWU", "TuduBuff", undefined);

      var TuduBuff = exports('TuduBuff', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(TuduBuff, _ABuffCom);

        function TuduBuff() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = TuduBuff.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.AnyHandCardUsed, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          var _this = this;

          if (stage == BuffNS.EffectStage.AnyHandCardUsed) {
            if (arg.cardUsedSeeklogic == FightCardSeekLogic.ChooseOne || arg.cardUsedSeeklogic == FightCardSeekLogic.Enemys) {
              if (tc.p(CardPlay).infoOf(arg.cardUsed).isAttack) {
                var to = arg.cardUsedSeeklogic == FightCardSeekLogic.ChooseOne ? [tc.p(CardPlay).choosingTarget] : this.owner.info.getLiveEnemys();
                to.forEach(function ($) {
                  $.buff.mod(BuffId.poison, _this.buff.num);
                });
              }
            }
          }
        };

        return TuduBuff;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TuifeiBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5980azMb5pPd6+ibuZqJNHn", "TuifeiBuffCom", undefined);

      var TuifeiBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(TuifeiBuffCom, _ABuffCom);

        function TuifeiBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = TuifeiBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.RoundEnd, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.RoundEnd) {
            this.owner.buff.mod(BuffId.weak, this.buff.num);
          }
        };

        return TuifeiBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TunshiCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CardItem.ts', './AFightCardCom.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, CardPropFunc, AFightCardCom;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      CardPropFunc = module.CardPropFunc;
    }, function (module) {
      AFightCardCom = module.AFightCardCom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ecb38ilaCBDgKlUpg6++oaV", "TunshiCom", undefined);

      var TunshiCom = exports('default', /*#__PURE__*/function (_AFightCardCom) {
        _inheritsLoose(TunshiCom, _AFightCardCom);

        function TunshiCom() {
          return _AFightCardCom.apply(this, arguments) || this;
        }

        var _proto = TunshiCom.prototype;

        _proto.OnInit = function OnInit() {};

        _proto.OnCast = function OnCast() {
          var hit = this.fightcard.fightCardHandler.getPropDealerByFunc(CardPropFunc.hit)[0];
          hit.castEffect();

          if (hit.choose.isDead) {
            var recover = this.fightcard.fightCardHandler.getPropDealerByFunc(CardPropFunc.recover)[0];
            recover.castEffect();
          }
        };

        return TunshiCom;
      }(AFightCardCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIBase.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TimeSys.ts', './tc.ts'], function (exports) {
  'use strict';

  var _createClass, cclegacy, TimeSys, tc;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TimeSys = module.default;
    }, function (module) {
      tc = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "52775gBTapA5pp1kFpJqXaX", "UIBase", undefined);

      var UIBase = exports('default', /*#__PURE__*/function () {
        function UIBase() {
          this._isClosed = false;
          this._fgo = null;
          this._node = null;
          this._wrapList = null;
          this._everOnClickObj = null;
          this._everEvtListens = null;
          this._everFgoListens = null;
          this._everTimers = null;
        }

        var _proto = UIBase.prototype;

        _proto.init = function init(fgo) {
          if (this._fgo != null) return;
          this._fgo = fgo;
          this._node = fgo.node;
        };

        _proto.show = function show() {
          if (this.isClosed) return;
          this._fgo.visible = true;
        };

        _proto.hide = function hide() {
          if (this.isClosed) return;
          this._fgo.visible = false;
        }
        /**
         * 提到最上层
         */
        ;

        _proto.moveToFront = function moveToFront() {
          this._fgo.parent.setChildIndex(this._fgo, this._fgo.parent.numChildren - 1);
        };

        _proto.close = function close() {
          var _this$_everEvtListens, _this$_everFgoListens, _this$_everOnClickObj, _this$_wrapList, _this$_everTimers;

          if (this.isClosed) return;
          (_this$_everEvtListens = this._everEvtListens) == null ? void 0 : _this$_everEvtListens.forEach(function (_ref) {
            var e = _ref[0],
                event = _ref[1],
                listener = _ref[2],
                thisArg = _ref[3];
            e == null ? void 0 : e.off(event, listener, thisArg);
          });
          this._everEvtListens = null;
          (_this$_everFgoListens = this._everFgoListens) == null ? void 0 : _this$_everFgoListens.forEach(function (_ref2) {
            var fgo = _ref2[0],
                event = _ref2[1],
                listener = _ref2[2],
                thisArg = _ref2[3];
            fgo && !fgo.isDisposed && fgo.off(event, listener, thisArg);
          });
          this._everFgoListens = null;
          (_this$_everOnClickObj = this._everOnClickObj) == null ? void 0 : _this$_everOnClickObj.forEach(function (obj) {
            if (obj && !obj.isDisposed) {
              obj.clearClick();
            }
          });
          this._everOnClickObj = null;
          (_this$_wrapList = this._wrapList) == null ? void 0 : _this$_wrapList.forEach(function (w) {
            if (!w.isClosed) {
              w.close();
            }
          });
          this._wrapList = null;
          (_this$_everTimers = this._everTimers) == null ? void 0 : _this$_everTimers.forEach(function (tid) {
            tc.s(TimeSys)["delete"](tid);
          });
          this._everTimers = null;
          this.OnDisposeSelfFgo(this._fgo);
          this._fgo = null;
          this._node = null;
          this._isClosed = true;
        };

        _proto.wrap = function wrap(type, fgo) {
          if (typeof fgo == "string") {
            fgo = this.getChild(fgo);
          }

          if (!this._wrapList) {
            this._wrapList = [];
          }

          var wrap = new type();
          wrap.init(fgo);

          this._wrapList.push(wrap);

          return wrap;
        };

        _proto.unwrap = function unwrap(wrap) {
          if (!this._wrapList) return;

          var idx = this._wrapList.indexOf(wrap);

          if (idx > -1) {
            this._wrapList.splice(idx, 1);

            wrap.close();
            console.log("unwrap suc " + wrap);
          } else {
            console.error("this wrap not in list");
          }
        };

        _proto.getWrap = function getWrap(type) {
          if (!this._wrapList) return null;

          this._wrapList.removeAll(function (wrap) {
            return wrap.isClosed;
          });

          for (var index = 0; index < this._wrapList.length; index++) {
            var wrap = this._wrapList[index];
            if (wrap instanceof type) return wrap;
          }

          return null;
        };

        _proto.getWraps = function getWraps(type) {
          if (!this._wrapList) return [];

          this._wrapList.removeAll(function (wrap) {
            return wrap.isClosed;
          });

          return this._wrapList.filter(function (wrap) {
            return wrap instanceof type;
          });
        };

        _proto.getChild = function getChild(childName) {
          if (childName == "") return this.fgc;else return this.fgc.getChild(childName);
        };

        _proto.getChildInGroup = function getChildInGroup(childName, groupName) {
          return this.fgc.getChildInGroup(childName, this.getGroup(groupName));
        } //#region getter for child
        ;

        _proto.getCom = function getCom(childName) {
          return this.getChild(childName).asCom;
        };

        _proto.getBtn = function getBtn(childName) {
          return this.getChild(childName).asBtn;
        };

        _proto.getGraph = function getGraph(childName) {
          return this.getChild(childName).asGraph;
        };

        _proto.getLoader = function getLoader(childName) {
          return this.getChild(childName).asLoader;
        };

        _proto.getLoader3D = function getLoader3D(childName) {
          return this.getChild(childName).asLoader3D;
        };

        _proto.getTxt = function getTxt(childName) {
          return this.getChild(childName).asTextField;
        };

        _proto.getLabel = function getLabel(childName) {
          return this.getChild(childName).asLabel;
        };

        _proto.getList = function getList(childName) {
          return this.getChild(childName).asList;
        };

        _proto.getGroup = function getGroup(childName) {
          return this.getChild(childName).asGroup;
        };

        _proto.getTransition = function getTransition(name) {
          return this.fgc.getTransition(name);
        };

        _proto.getController = function getController(name) {
          return this.fgc.getController(name);
        } //#endregion
        //#region addXXX

        /**
         * 添加自释放的按钮绑定
         * @param objName 节点名称。为空表示当前节点本身 | 节点
         * @param listener 
         */
        ;

        _proto.addBtnEvt = function addBtnEvt(objName, listener, thisArg) {
          var _this = this;

          if (this._everOnClickObj == null) {
            this._everOnClickObj = new Set();
          }

          if (typeof objName == "string") {
            objName = this.getChild(objName);
          }

          var btn = objName;
          btn.onClick(function () {
            btn.enabled = false;
            btn.grayed = false;
            listener.call(_this, function () {
              btn.enabled = true;
            });
          }, this);

          this._everOnClickObj.add(btn);
        };

        _proto.addEvt = function addEvt(e, event, listener, thisArg) {
          var _thisArg2;

          if (!e) return;

          if (this._everEvtListens == null) {
            this._everEvtListens = [];
          }

          (_thisArg2 = thisArg) != null ? _thisArg2 : thisArg = this;
          e.on(event, listener, thisArg);

          this._everEvtListens.push([e, event, listener, thisArg]);
        };

        _proto.addFgoEvt = function addFgoEvt(fgo, event, listener, thisArg) {
          var _thisArg3;

          if (!fgo) return;

          if (this._everFgoListens == null) {
            this._everFgoListens = [];
          }

          (_thisArg3 = thisArg) != null ? _thisArg3 : thisArg = this;
          fgo.on(event, listener, thisArg);

          this._everFgoListens.push([fgo, event, listener, thisArg]);
        };

        _proto.addDelay = function addDelay(delay, func, caller) {
          var _caller;

          (_caller = caller) != null ? _caller : caller = this;

          for (var _len = arguments.length, arg = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
            arg[_key - 3] = arguments[_key];
          }

          return this._addTimer.apply(this, [delay, 1, func, caller].concat(arg));
        };

        _proto.addNextFrame = function addNextFrame(func, caller) {
          var _caller2;

          (_caller2 = caller) != null ? _caller2 : caller = this;

          for (var _len2 = arguments.length, arg = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            arg[_key2 - 2] = arguments[_key2];
          }

          return this._addTimer.apply(this, [0, 1, func, caller].concat(arg));
        };

        _proto.addInterval = function addInterval(interval, loop, func, caller) {
          var _caller3;

          (_caller3 = caller) != null ? _caller3 : caller = this;

          for (var _len3 = arguments.length, arg = new Array(_len3 > 4 ? _len3 - 4 : 0), _key3 = 4; _key3 < _len3; _key3++) {
            arg[_key3 - 4] = arguments[_key3];
          }

          return this._addTimer.apply(this, [interval, loop, func, caller].concat(arg));
        };

        _proto.delTimer = function delTimer(timerId) {
          tc.s(TimeSys)["delete"](timerId);
        };

        _proto._addTimer = function _addTimer(interval, loops, func, caller) {
          var _tc$s;

          for (var _len4 = arguments.length, arg = new Array(_len4 > 4 ? _len4 - 4 : 0), _key4 = 4; _key4 < _len4; _key4++) {
            arg[_key4 - 4] = arguments[_key4];
          }

          var t = (_tc$s = tc.s(TimeSys)).timer.apply(_tc$s, [interval, loops, func, caller].concat(arg));

          if (!this._everTimers) {
            this._everTimers = [];
          }

          this._everTimers.push(t);

          return t;
        } //#endregion

        /**
         * <can-override>
         * 在销毁 Fgo 时被调用
         */
        ;

        _proto.OnDisposeSelfFgo = function OnDisposeSelfFgo(selfFgo) {
          selfFgo.dispose();
        };

        _createClass(UIBase, [{
          key: "isClosed",
          get: function get() {
            return this._isClosed;
          }
        }, {
          key: "fgc",
          get: function get() {
            return this._fgo.asCom;
          }
        }, {
          key: "node",
          get: function get() {
            return this._node;
          }
        }]);

        return UIBase;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UICfg.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6a5fa+eNeNMSr0HboUtwv9T", "UICfg", undefined);

      var UICfg = exports('default', {
        hoverTipSafeArea: {
          x: (1920 - 650) / 2,
          y: (1080 - 270) / 2,
          w: 650,
          h: 270
        },
        midX: 1920 / 2,
        res: {
          coin: "game_gold",
          diamond: "hero_jhdia",
          card: "Card",
          treasure: "Treasure"
        } // fly: {
        //     dur: [1, 2],
        //     rotate: [0, 360],
        //     speed: [1, 2],
        //     fScale: [1, 1],
        //     tScale: [0, 0],
        //     // 提前 X% 的时间结束
        //     early: [10, 20],
        // },

      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIDocker.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Util.ts'], function (exports) {
  'use strict';

  var _createForOfIteratorHelperLoose, cclegacy, tween, deepClone, isNull, notNull, removeNullKeys;

  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
    }, function (module) {
      deepClone = module.deepClone;
      isNull = module.isNull;
      notNull = module.notNull;
      removeNullKeys = module.removeNullKeys;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5f4d8LNdyxL3YPpXxGLwA+J", "UIDocker", undefined);

      var UIDocker = exports('UIDocker', /*#__PURE__*/function () {
        /**
         * 几种基本停靠类型
         */

        /**
         * 创建一个docker但是不执行
         * @param target docker目标对象
         * @param dockPars docker参数
         * @param complete docker结束之后的回调，可选
         * @return UIDocker实例
         */
        UIDocker.create = function create(target, dockPars) {
          var docker = UIDocker._pool && UIDocker._pool.length > 0 ? this._pool.pop() : new UIDocker();

          docker._reset(target, dockPars);

          return docker;
        }
        /**
         * 销毁docker
         * @param docker 被销毁的docker，可以传null
         * @return undefined
         */
        ;

        UIDocker.destroy = function destroy(docker) {
          if (docker) {
            docker._destroy();

            if (!this._pool) {
              this._pool = [];
            }

            this._pool.push(docker);
          }

          return undefined;
        };

        function UIDocker() {
          this._target = void 0;
          this._outProps = void 0;
          this._backProps = void 0;
          this._outEase = void 0;
          this._backEase = void 0;
          this._outDur = void 0;
          this._backDur = void 0;
          this._tween = void 0;
          this._reversing = void 0;
          this._takens = void 0;
        }

        var _proto = UIDocker.prototype;

        _proto._reset = function _reset(target, dockPars) {
          this._reversing = undefined;
          this._target = target;
          this._outEase = dockPars.out_ease || "quadOut";
          this._backEase = dockPars.back_ease || "quadIn";
          this._outDur = dockPars.out_dur || 0.4;
          this._backDur = dockPars.back_dur || 0.4;

          var out = this._parseProps(target, dockPars.out);

          var back = this._parseProps(target, dockPars.back);

          var props = out || back;

          if (out && back) {
            props = deepClone(props);

            for (var _k in back) {
              props[_k] = 0;
            }
          }

          this._outProps = this._getProps(target, props);
          this._backProps = back;

          if (out) {
            this._setProps(target, out);
          }
        }
        /**
         * 停靠出来（展示出来）
         */
        ;

        _proto.dockOut = function dockOut(cb) {
          this._internal_dock(true, cb);
        }
        /**
         * 停靠回去（隐藏）
         */
        ;

        _proto.dockBack = function dockBack(cb) {
          this._internal_dock(false, cb);
        }
        /**
        * 停靠
        * @param dockOut 是否停靠出来（显示）
        */
        ;

        _proto._internal_dock = function _internal_dock(dockOut, cb) {
          if (this._takens) {
            for (var _iterator = _createForOfIteratorHelperLoose(this._takens), _step; !(_step = _iterator()).done;) {
              var t = _step.value;

              t._internal_dock(dockOut);
            }
          }

          if (this._reversing === !dockOut) {
            cb == null ? void 0 : cb();
            return;
          }

          this._clearTween();

          this._reversing = !dockOut;

          if (dockOut) {
            if (this._outProps) {
              this._tween = tween(this._target).to(this._outDur, this._outProps, {
                easing: this._outEase,
                onComplete: this._handleTweenComplete.bind(this, cb)
              }).start();
            } else {
              this._handleTweenComplete(cb);
            }
          } else {
            if (this._backProps) {
              this._tween = tween(this._target).to(this._backDur, this._backProps, {
                easing: this._backEase,
                onComplete: this._handleTweenComplete.bind(this, cb)
              }).start();
            } else {
              this._handleTweenComplete(cb);
            }
          }
        }
        /**
         * 顺带一个docker，跟自己绑定
         * @param docker
         * @return this
         */
        ;

        _proto.take = function take(docker) {
          if (!docker) {
            return this;
          }

          if (!this._takens) {
            this._takens = new Array();
          }

          this._takens.push(docker);

          return this;
        }
        /**
         * 删除
         */
        ;

        _proto._destroy = function _destroy() {
          if (this._takens) {
            for (var _iterator2 = _createForOfIteratorHelperLoose(this._takens), _step2; !(_step2 = _iterator2()).done;) {
              var t = _step2.value;
              UIDocker.destroy(t);
            }

            this._takens = undefined;
          }

          this._clearTween();

          this._target = undefined;
          this._reversing = undefined;
          this._outEase = undefined;
          this._backEase = undefined;
        };

        _proto._handleTweenComplete = function _handleTweenComplete(cb) {
          this._clearTween();

          cb == null ? void 0 : cb();
        };

        _proto._clearTween = function _clearTween() {
          if (this._tween) {
            this._tween.stop();

            this._tween = undefined;
          }
        };

        _proto._getProps = function _getProps(target, props) {
          if (isNull(props)) {
            return undefined;
          }

          var current = {};

          this._notNullAndSet(current, props, target, "x");

          this._notNullAndSet(current, props, target, "y");

          this._notNullAndSet(current, props, target, "alpha");

          this._notNullAndSet(current, props, target, "scaleX");

          this._notNullAndSet(current, props, target, "scaleY");

          return current;
        };

        _proto._setProps = function _setProps(target, props) {
          this._notNullAndSet(target, props, props, "x");

          this._notNullAndSet(target, props, props, "y");

          this._notNullAndSet(target, props, props, "alpha");

          this._notNullAndSet(target, props, props, "scaleX");

          this._notNullAndSet(target, props, props, "scaleY");
        };

        _proto._notNullAndSet = function _notNullAndSet(target, props, valSource, propName) {
          if (notNull(props[propName])) {
            target[propName] = valSource[propName];
          }
        };

        _proto._parseProps = function _parseProps(target, mod) {
          if (isNull(mod)) return undefined;
          return removeNullKeys({
            x: this._dealPropOfMod(target, mod, "x"),
            y: this._dealPropOfMod(target, mod, "y"),
            alpha: this._dealPropOfMod(target, mod, "alpha"),
            scaleX: this._dealPropOfMod(target, mod, "scaleX"),
            scaleY: this._dealPropOfMod(target, mod, "scaleY")
          });
        };

        _proto._dealPropOfMod = function _dealPropOfMod(target, mod, propName) {
          var base = mod[propName];
          var rMod = mod["r" + propName];
          var sMod = mod["s" + propName];

          if (rMod || sMod) {
            var _base;

            (_base = base) != null ? _base : base = 0;
            if (rMod) base += target[propName] + rMod;
            if (sMod) base += target[propName == "x" ? "width" : propName == "y" ? "width" : propName] * sMod;
          }

          return base;
        };

        return UIDocker;
      }());
      UIDocker.Dock = {
        /**
         * 左侧停靠
         */
        Left: {
          out: {
            rx: -120
          },
          back: {
            x: -4,
            sx: -1
          },
          out_ease: "backOut",
          back_ease: "backIn"
        },

        /**
         * 左侧停靠
         */
        LeftInRightOut: {
          out: {
            rx: -120
          },
          back: {
            rx: 4,
            sx: 1
          },
          out_ease: "backOut",
          back_ease: "backIn"
        },

        /**
         * 右侧停靠
         */
        Right: {
          out: {
            rx: 100
          },
          back: {
            rx: 4,
            sx: 1
          },
          out_ease: "backOut",
          back_ease: "backIn"
        },

        /**
         * 顶部停靠
         */
        Top: {
          out: {
            ry: -120
          },
          back: {
            ry: -3,
            sy: -1
          },
          out_ease: "backOut",
          back_ease: "backIn"
        },

        /**
         * 底部停靠
         */
        Bottom: {
          out: {
            ry: 70
          },
          back: {
            ry: 4,
            sy: 1
          },
          out_ease: "backOut",
          back_ease: "backIn"
        },

        /**
         * 渐显
         */
        Fade: {
          out: {
            alpha: 0
          },
          back: {
            alpha: 0
          },
          out_ease: "quadOut",
          back_ease: "quadIn"
        },

        /**
         * 从中间像气泡一样冒出来
         */
        Bubble: {
          out: {
            sscaleX: 0.7,
            sscaleY: 0.7,
            alpha: 0
          },
          back: {
            scaleX: 0.0,
            scaleY: 0.0,
            alpha: 0
          },
          out_ease: "elasticOut",
          back_ease: "backIn",
          out_dur: 0.6,
          back_dur: 0.6,
          pivotX: 0.5,
          pivotY: 0.5
        },

        /**
         * 像幽灵一样浮上来
         */
        GhostUp: {
          out: {
            sscaleX: 0.9,
            sscaleY: 0.9,
            alpha: 0.8,
            ry: 10
          },
          back: {
            alpha: 0,
            sscaleX: 0.9,
            sscaleY: 0.9,
            ry: 0
          },
          out_ease: "backOut",
          back_ease: "backIn",
          out_dur: 0.3,
          back_dur: 0.3,
          pivotX: 0.5,
          pivotY: 0.5
        }
      };
      UIDocker._pool = void 0;
      UIDocker.fade_ease = "quadOut";

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIWrap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, UIBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4eb91RtmoRBvYwAx7teZbC/", "UIWrap", undefined);

      var UIWrap = exports('default', /*#__PURE__*/function (_UIBase) {
        _inheritsLoose(UIWrap, _UIBase);

        function UIWrap() {
          return _UIBase.apply(this, arguments) || this;
        }

        var _proto = UIWrap.prototype;

        _proto.init = function init(fgo) {
          _UIBase.prototype.init.call(this, fgo);

          this.OnInit();
        };

        _proto.close = function close() {
          if (this.isClosed) {
            console.error("dlg alredy closed.");
            return;
          }

          this.OnClose();

          _UIBase.prototype.close.call(this);
        };

        _proto.OnDisposeSelfFgo = function OnDisposeSelfFgo(selfFgo) {// wrap 默认不销毁自身节点，而是随着父节点销毁而销毁
        }
        /**
         * <To-Override>
         * 装饰关闭时调用
         */
        ;

        _proto.OnClose = function OnClose() {};

        return UIWrap;
      }(UIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UnknwonEvent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AExploreNodeHandler.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AExploreNodeHandler;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AExploreNodeHandler = module.AExploreNodeHandler;
    }],
    execute: function () {
      cclegacy._RF.push({}, "cdd06m8ddpHap6lXy/b4jSd", "UnknwonEvent", undefined);

      var UnknwonEvent = exports('UnknwonEvent', /*#__PURE__*/function (_AExploreNodeHandler) {
        _inheritsLoose(UnknwonEvent, _AExploreNodeHandler);

        function UnknwonEvent() {
          return _AExploreNodeHandler.apply(this, arguments) || this;
        }

        var _proto = UnknwonEvent.prototype;

        _proto.exec = function exec() {};

        return UnknwonEvent;
      }(AExploreNodeHandler));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UserKit.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './coolgame-cc.mjs', './Util.ts', './StorageSys.ts', './TimeSys.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, EventTarget, KitBase, randomInt, StorageSys, TimeSys;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }, function (module) {
      KitBase = module.KitBase;
    }, function (module) {
      randomInt = module.randomInt;
    }, function (module) {
      StorageSys = module.default;
    }, function (module) {
      TimeSys = module.default;
    }],
    execute: function () {
      exports({
        UserDataKey: void 0,
        UserGameState: void 0
      });

      cclegacy._RF.push({}, "c3570oj4UREB6SpeZgXze+W", "UserKit", undefined);

      var UserDataKey;

      (function (UserDataKey) {
        UserDataKey["GameState"] = "GameState";
        UserDataKey["PlayerSave"] = "PlayerSave";
        UserDataKey["Diamond"] = "Diamond";
        UserDataKey["CodeVersionWhenUserCreated"] = "CodeVersionWhenUserCreated";
        UserDataKey["CodeVersion"] = "CodeVersion";
        UserDataKey["CardUnlock"] = "CardUnlock";
        UserDataKey["TreasureUnlock"] = "TreasureUnlock";
        UserDataKey["HeroUnlock"] = "HeroUnlock";
        UserDataKey["TrueEndRecord"] = "TrueEndRecord";
      })(UserDataKey || (UserDataKey = exports('UserDataKey', {})));
      /**
       * -1 未开始
       * 0 准备中
       * 1 地图探索中
       * 2 事件激活中
       */


      var UserGameState;

      (function (UserGameState) {
        UserGameState[UserGameState["NotStart"] = -1] = "NotStart";
        UserGameState[UserGameState["FightReawrding"] = 1] = "FightReawrding";
        UserGameState[UserGameState["Countering"] = 2] = "Countering";
      })(UserGameState || (UserGameState = exports('UserGameState', {})));

      var UserKit = exports('default', /*#__PURE__*/function (_KitBase) {
        _inheritsLoose(UserKit, _KitBase);

        function UserKit() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _KitBase.call.apply(_KitBase, [this].concat(args)) || this;
          _this._curUser = void 0;
          _this._storage = void 0;
          _this._timeSys = void 0;
          _this._metaUserInfo = void 0;
          _this._userData = void 0;
          _this._isDirty = void 0;
          _this._isLock = void 0;
          _this._saveTimer = void 0;
          _this._e = void 0;
          _this.kitName = 'UserKit';
          return _this;
        }

        var _proto = UserKit.prototype;

        _proto.OnInit = function OnInit(complete) {
          this._curUser = null;
          this._storage = this.sys(StorageSys);
          this._timeSys = this.sys(TimeSys);
          this._metaUserInfo = this._storage.get(UserKit.META_USER_KEY, {});
          console.log("metaUserInfo", this._metaUserInfo);
          this._userData = null;
          this._isLock = false;
          this._isDirty = false;
          this._e = new EventTarget();
          complete();
        };

        _proto.OnLateInit = function OnLateInit(complete) {
          this.autologin();
          complete();
        };

        _proto.OnDispose = function OnDispose() {}
        /**
         * 比对代码版本号，更新用户数据。
         */
        ;

        _proto._updateUserData = function _updateUserData() {
          // 0->1->2->3->5
          if (this._userData[UserDataKey.CodeVersion] < 8) {
            this._userData[UserDataKey.GameState] = null;
            this._userData[UserDataKey.PlayerSave] = null;
            this._userData[UserDataKey.HeroUnlock] = null;
            this._userData[UserDataKey.CardUnlock] = null;
            this._userData[UserDataKey.TreasureUnlock] = null;
            this._userData[UserDataKey.Diamond] = null;
            this._userData[UserDataKey.TrueEndRecord] = null;
            this._userData[UserDataKey.CodeVersion] = 8;
          }
        };

        _proto.autologin = function autologin() {
          var _this$_metaUserInfo$l;

          var username = (_this$_metaUserInfo$l = this._metaUserInfo.lastLoginUser) != null ? _this$_metaUserInfo$l : "guest-" + Date.now() + "-" + randomInt(0, 9999);
          this.login(username);
        };

        _proto.login = function login(username) {
          var _this$_storage$get;

          if (this._curUser) {
            console.error("请先登出 " + this._curUser);
            return;
          }

          this._curUser = username;
          this._userData = this._storage.get(username, (_this$_storage$get = {}, _this$_storage$get[UserDataKey.CodeVersionWhenUserCreated] = UserKit.CUR_CODE_VERSION, _this$_storage$get[UserDataKey.CodeVersion] = UserKit.CUR_CODE_VERSION, _this$_storage$get));
          console.log("loginSuc", this._userData);

          this._updateUserData();

          if (this._metaUserInfo.lastLoginUser != username) {
            this._metaUserInfo.lastLoginUser = username;

            this._saveMetaUserInfo();
          }
        };

        _proto.getVal = function getVal(key, def) {
          var _this$_userData$key;

          return (_this$_userData$key = this._userData[key]) != null ? _this$_userData$key : def;
        };

        _proto.setVal = function setVal(key, v, imme) {
          if (imme === void 0) {
            imme = false;
          }

          this._userData[key] = v;
          this._isDirty = true;

          if (imme) {
            this._save();
          } else if (!this._saveTimer) {
            this._saveTimer = this._timeSys.delay(1, this._save, this);
          }
        };

        _proto.clear = function clear() {
          this._userData = null;
          this._isDirty = true;

          this._save();
        };

        _proto.lock = function lock() {
          this._isLock = true;
        };

        _proto.save = function save() {
          this._save();
        };

        _proto._save = function _save() {
          if (this._isLock) return;

          if (this._isDirty) {
            console.log("用户数据更新 " + Date.now());

            this._storage.set(this._curUser, this._userData);

            this._isDirty = false;
          }

          if (this._saveTimer) {
            this._saveTimer = this._timeSys["delete"](this._saveTimer);
          }
        };

        _proto._saveMetaUserInfo = function _saveMetaUserInfo() {
          console.log("元用户数据更新 " + Date.now());

          this._storage.set(UserKit.META_USER_KEY, this._metaUserInfo);
        }
        /**放弃当前游戏 */
        ;

        _proto.dropgame = function dropgame() {
          this.gameState = null; // this.openingSet = null;
        };

        _createClass(UserKit, [{
          key: "gameState",
          get: function get() {
            return this.getVal(UserDataKey.GameState, UserGameState.NotStart);
          },
          set: function set(v) {
            this.setVal(UserDataKey.GameState, v);
          }
        }, {
          key: "playerSave",
          get: function get() {
            return this.getVal(UserDataKey.PlayerSave, null);
          },
          set: function set(v) {
            this.setVal(UserDataKey.PlayerSave, v);
          }
        }, {
          key: "trueEndRecord",
          get: function get() {
            return this.getVal(UserDataKey.TrueEndRecord, {
              passArea3Boss: 0
            });
          },
          set: function set(v) {
            this.setVal(UserDataKey.TrueEndRecord, v);
          }
        }, {
          key: "diamond",
          get: function get() {
            return this.getVal(UserDataKey.Diamond, 0);
          },
          set: function set(v) {
            this.setVal(UserDataKey.Diamond, v);

            this._e.emit(UserKit.Events.DIAMOND_CHG);
          }
        }, {
          key: "cardUnlock",
          get: function get() {
            return this.getVal(UserDataKey.CardUnlock, []);
          },
          set: function set(v) {
            this.setVal(UserDataKey.CardUnlock, v);
          }
        }, {
          key: "treasureUnlock",
          get: function get() {
            return this.getVal(UserDataKey.TreasureUnlock, []);
          },
          set: function set(v) {
            this.setVal(UserDataKey.TreasureUnlock, v);
          }
        }, {
          key: "heroUnlock",
          get: function get() {
            return this.getVal(UserDataKey.HeroUnlock, []);
          },
          set: function set(v) {
            this.setVal(UserDataKey.HeroUnlock, v);
          }
        }, {
          key: "e",
          get: function get() {
            return this._e;
          }
        }]);

        return UserKit;
      }(KitBase));
      UserKit.Events = {
        DIAMOND_CHG: 'DIAMOND_CHG'
      };
      UserKit.META_USER_KEY = "_sys_meta_user_info_";
      UserKit.CUR_CODE_VERSION = 8;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Util.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _createForOfIteratorHelperLoose, cclegacy;

  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        cubicbezier: cubicbezier,
        deepClone: deepClone,
        emptyString: emptyString,
        enumKeys: enumKeys,
        enumValues: enumValues,
        floorToZero: floorToZero,
        getEnumName: getEnumName,
        isNull: isNull,
        isNumber: isNumber,
        notNull: notNull,
        pick: pick,
        pickWeights: pickWeights,
        pickWeightsBy: pickWeightsBy,
        random: random,
        randomInt: randomInt,
        randomIntArr: randomIntArr,
        removeNullKeys: removeNullKeys,
        toNumber: toNumber
      });

      cclegacy._RF.push({}, "b322cjdNeFBuIOma3fenDxY", "Util", undefined); // [0, 1)


      function _randomWithSeed(seed) {
        seed = Math.pow(seed, 2) * 0.001;
        return toNumber('0.' + Math.sin(seed).toString().slice(6)) * 0.9999;
      }
      /**
       * 在给定范围内随机 [lowerBound, upperBound)，结果是个伪随机，受seed影响
       * @param lowerBound 随机侧1
       * @param upperBound 随机侧2
       * @return 范围随机值
       */


      function random(lowerBound, upperBound, seed) {
        return lowerBound + (seed ? _randomWithSeed(seed) : Math.random()) * (upperBound - lowerBound);
      }

      function randomInt(lowerBound, upperBound, seed) {
        return Math.floor(random(lowerBound, upperBound, seed));
      }

      function randomIntArr(low_up, seed) {
        return randomInt(low_up[0], low_up[1], seed);
      }

      function pick(arr, seed) {
        return arr[randomInt(0, arr.length, seed)];
      }

      function pickWeights(weights, seed) {
        var total_weight = 0;

        for (var _iterator = _createForOfIteratorHelperLoose(weights), _step; !(_step = _iterator()).done;) {
          var _weight = _step.value;
          total_weight += _weight;
        }

        var rand = randomInt(0, total_weight, seed);
        var acc_weight = 0;
        var rand_idx = -1;

        for (var i = 0; i < weights.length; i++) {
          var weight = weights[i];
          acc_weight += weight;

          if (rand <= acc_weight) {
            rand_idx = i;
            break;
          }
        }

        return rand_idx;
      }
      /**
       * 在给定数组中按权重随机一个元素
       * @param arys 数组
       * @param option 可选
       *   seed   伪随机种子
       *   fieldName 代表权重的字段名，不填表示数组元素本身就是作为权重的number
       * @return 随机到的数组元素索引，如果数组为空，返回-1
       */


      function pickWeightsBy(arys, option) {
        var seed = option && option.seed;
        var fieldName = option && option.fieldName;

        if (!arys || arys.length === 0) {
          return -1;
        }

        if (isNull(fieldName)) {
          return pickWeights(arys, seed);
        }

        var total_weight = 0;

        for (var _iterator2 = _createForOfIteratorHelperLoose(arys), _step2; !(_step2 = _iterator2()).done;) {
          var _e = _step2.value;
          var w = _e[fieldName];

          if (isNull(w)) {
            w = 1;
          }

          total_weight += w;
        }

        var rand = randomInt(0, total_weight, seed);
        var acc_weight = 0;
        var rand_idx = arys.length - 1;

        for (var i = 0; i < arys.length; i++) {
          var e = arys[i];
          acc_weight += e[fieldName];

          if (rand <= acc_weight) {
            rand_idx = i;
            break;
          }
        }

        return rand_idx;
      }
      /**
       * 任何值转换为number值
       * @param v 任何值，包括undefined和null
       * @param defVal v无效（null或者undefined）的时候的默认值，不填表示NaN
       * @return number
       */


      function toNumber(v, defVal) {
        if (isNull(v)) {
          return isNull(defVal) ? NaN : defVal;
        }

        return Number(v);
      }
      /**
       * check if the given v is null or undefined
       * @param v value to be checked
       */


      function isNull(v) {
        return v === null || v === undefined;
      }
      /**
       * 判断给定的数值是有效的number
       * @param v 
       */


      function isNumber(v) {
        return notNull(v) && !isNaN(v);
      }
      /**
       * check if the given v is not null nor undefined
       * @param v value to be checked
       */


      function notNull(v) {
        return v !== null && v !== undefined;
      }

      function deepClone(data) {
        if (isNull(data)) {
          return data;
        }

        var toString = Object.prototype.toString;
        var t = toString.call(data),
            o,
            i,
            ni;

        if (t === '[object Array]') {
          o = [];
        } else if (t === '[object Object]') {
          o = {};
        } else {
          return data;
        }

        if (t === '[object Array]') {
          for (i = 0, ni = data.length; i < ni; i++) {
            o.push(deepClone(data[i]));
          }

          return o;
        } else if (t === '[object Object]') {
          for (i in data) {
            o[i] = deepClone(data[i]);
          }

          return o;
        }
      }

      function getEnumName(enumType, enumVal) {
        return Object.keys(enumType).find(function (key) {
          return enumType[key] == enumVal;
        });
      }

      function enumValues(enumType, valType) {
        if (valType == "string") {
          return Object.values(enumType);
        } else {
          return Object.values(enumType).filter(function (v) {
            return typeof v == "number";
          });
        }
      }

      function enumKeys(enumType, valType) {
        if (valType == "string") {
          return Object.keys(enumType);
        }

        return Object.keys(enumType).filter(function (key) {
          return typeof enumType[key] == "number";
        });
      }

      function cubicbezier(x1, y1, x2, y2, epsilon) {
        var curveX = function curveX(t) {
          var v = 1 - t;
          return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
        };

        var curveY = function curveY(t) {
          var v = 1 - t;
          return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
        };

        var derivativeCurveX = function derivativeCurveX(t) {
          var v = 1 - t;
          return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (-t * t * t + 2 * v * t) * x2;
        };

        return function (t) {
          var x = t,
              t0,
              t1,
              t2,
              x2,
              d2,
              i; // First try a few iterations of Newton's method -- normally very fast.

          for (t2 = x, i = 0; i < 8; i++) {
            x2 = curveX(t2) - x;
            if (Math.abs(x2) < epsilon) return curveY(t2);
            d2 = derivativeCurveX(t2);
            if (Math.abs(d2) < 1e-6) break;
            t2 = t2 - x2 / d2;
          }

          t0 = 0, t1 = 1, t2 = x;
          if (t2 < t0) return curveY(t0);
          if (t2 > t1) return curveY(t1); // Fallback to the bisection method for reliability.

          while (t0 < t1) {
            x2 = curveX(t2);
            if (Math.abs(x2 - x) < epsilon) return curveY(t2);
            if (x > x2) t0 = t2;else t1 = t2;
            t2 = (t1 - t0) * .5 + t0;
          } // Failure


          return curveY(t2);
        };
      }
      /**
       * 判断给定字符串是否是空字符串
       * @param str 
       */


      function emptyString(str) {
        return isNull(str) || str === '';
      }
      /**
       * 向零取整
       */


      function floorToZero(v) {
        return v > 0 ? Math.floor(v) : Math.ceil(v);
      }

      function removeNullKeys(obj) {
        var newObj = {};

        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            var value = obj[key];

            if (notNull(value)) {
              newObj[key] = value;
            }
          }
        }

        return newObj;
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/WangzhezgBj.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './CardPlay.ts', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, tc, CardPlay, ABuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a3543uCF0dMEqcShboV5QUB", "WangzhezgBj", undefined);

      var WangzhezgBj = exports('WangzhezgBj', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(WangzhezgBj, _ABuffCom);

        function WangzhezgBj() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = WangzhezgBj.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.AnyHandCardUsed, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.AnyHandCardUsed) {
            if (tc.p(CardPlay).isAttack(arg.cardUsed)) {
              this.owner.info.getLiveEnemys().forEach(function (e) {
                e.buff.mod(BuffId.power, 1);
              });
            }
          }
        };

        return WangzhezgBj;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/WuxianhfBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, TreasureId, ATreasureBuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a8975/EcqZF5rCu7n7dWavA", "WuxianhfBuff", undefined);

      var WuxianhfBuff = exports('default', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(WuxianhfBuff, _ATreasureBuffCom);

        function WuxianhfBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = WuxianhfBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.HandCardIn, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HandCardIn) {
            this.owner.recoverHp(99, this.buff.info.name);
            this.popWrap();
          }
        };

        _createClass(WuxianhfBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Huifusq;
          }
        }]);

        return WuxianhfBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/XiaoyuandBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './FightPlay.ts', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, tc, FightPlay, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      FightPlay = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "380a2ZHWRRMkJV0odLpbxAK", "XiaoyuandBuff", undefined);

      var XiaoyuandBuff = exports('default', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(XiaoyuandBuff, _ATreasureBuffCom);

        function XiaoyuandBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = XiaoyuandBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.HandCardIn, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HandCardIn) {
            this.owner.buff.mod(BuffId.shiled, tc.p(FightPlay).calcShieldMod(this.buff.num, this.owner));
            this.popWrap();
          }
        };

        _createClass(XiaoyuandBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Xiaoyuand;
          }
        }]);

        return XiaoyuandBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/XingfenjBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './CardPlay.ts', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, tc, CardPlay, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b0c3f8nfAtLHa3C39ueSs0o", "XingfenjBuff", undefined); // 1个回合内，打出3张防御牌，体质+【num】


      var XingfenjBuff = exports('XingfenjBuff', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(XingfenjBuff, _ATreasureBuffCom);

        function XingfenjBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = XingfenjBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.LeaveFight, BuffNS.EffectOrder.base);
          this.setOrder(BuffNS.EffectStage.RoundEnd, BuffNS.EffectOrder.base);
          this.setOrder(BuffNS.EffectStage.AnyHandCardUsed, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          var newCounter = this.counterNum;

          if (stage == BuffNS.EffectStage.RoundEnd || stage == BuffNS.EffectStage.LeaveFight) {
            newCounter = 0;
          } else if (stage == BuffNS.EffectStage.AnyHandCardUsed) {
            if (tc.p(CardPlay).isDefend(arg.cardUsed)) {
              newCounter++;

              if (newCounter == 3) {
                this.owner.buff.mod(BuffId.Tizhi, this.buff.num);
                this.popWrap();
                newCounter = 0;
              }
            }
          }

          this.reviseNum(newCounter);
        };

        _createClass(XingfenjBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Xingfenj;
          }
        }]);

        return XingfenjBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/XinlingzsAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './BuffId.ts', './NpcPropFunc.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, BuffId, NpcPropFunc, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      NpcPropFunc = module.NpcPropFunc;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e842er1LFlN85z6FCzTVxsV", "XinlingzsAct", undefined);

      var XinlingzsAct = exports('XinlingzsAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(XinlingzsAct, _ActBase);

        function XinlingzsAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = XinlingzsAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.tactics,
            iconTip: '',
            title: "心灵震慑",
            content: "\u8FD9\u540D\u654C\u4EBA\u5C06\u8981\u8D4B\u4E88\u73A9\u5BB6" + this.fear + "\u5C42\u6050\u60E7\u3002"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.skill_act_byskill_over(function () {
            _this.target.buff.mod(BuffId.Kongju, _this.fear);
          }, onOver);
        };

        _createClass(XinlingzsAct, [{
          key: "fear",
          get: function get() {
            return parseInt(this.getProp(NpcPropFunc.xinlingzs).args[0]);
          }
        }]);

        return XinlingzsAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/XipaiqBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5592bszRNxG17n94T113Uy+", "XipaiqBuff", undefined); // 洗牌后增加对应层数能量


      var XipaiqBuff = exports('XipaiqBuff', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(XipaiqBuff, _ATreasureBuffCom);

        function XipaiqBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = XipaiqBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.OnShuffle, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.OnShuffle) {
            this.owner.buff.mod(BuffId.enegy, this.buff.num);
            this.popWrap();
          }
        };

        _createClass(XipaiqBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Xipaiq;
          }
        }]);

        return XipaiqBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Xls.ts", ['cc', './Config.ts'], function (exports) {
  'use strict';

  var cclegacy, datas;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      datas = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9c3d0vfYV1Ao6qXEkxPCMcR", "Xls", undefined);

      var Xls = exports('default', /*#__PURE__*/function () {
        function Xls() {}

        Xls.init = function init() {
          this.buffDatasArray = this._arrayData("buff", datas);
          this.buffDatasById = datas["buff"];
          this.cardDatasArray = this._arrayData("card", datas);
          this.cardDatasById = datas["card"];
          this.eventDatasArray = this._arrayData("event", datas);
          this.eventDatasById = datas["event"];
          this.npcDatasArray = this._arrayData("npc", datas);
          this.npcDatasById = datas["npc"];
          this.treasureDatasArray = this._arrayData("treasure", datas);
          this.treasureDatasById = datas["treasure"];
        };

        Xls._arrayData = function _arrayData(key, datas) {
          var values = [];
          var items = datas[key];

          for (var key1 in items) {
            values.push(items[key1]);
          }

          return values;
        };

        return Xls;
      }());
      Xls.buffDatasArray = void 0;
      Xls.buffDatasById = void 0;
      Xls.cardDatasArray = void 0;
      Xls.cardDatasById = void 0;
      Xls.eventDatasArray = void 0;
      Xls.eventDatasById = void 0;
      Xls.npcDatasArray = void 0;
      Xls.npcDatasById = void 0;
      Xls.treasureDatasArray = void 0;
      Xls.treasureDatasById = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/XTween.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, Tween;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Tween = module.Tween;
    }],
    execute: function () {
      cclegacy._RF.push({}, "54712gga5pO0YMONHO99acx", "XTween", undefined);

      var XTween = exports('default', /*#__PURE__*/function (_Tween) {
        _inheritsLoose(XTween, _Tween);

        function XTween() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Tween.call.apply(_Tween, [this].concat(args)) || this;
          _this._onCompleteNow = void 0;
          return _this;
        }

        var _proto = XTween.prototype;

        _proto.onCompleteNow = function onCompleteNow(func) {
          this._onCompleteNow = func;
          return this;
        }
        /**
         * 迅速结束
         */
        ;

        _proto.completeNow = function completeNow() {
          this.stop();

          if (this._onCompleteNow) {
            this._onCompleteNow();

            this._onCompleteNow = null;
          } else {
            console.error("u are not sign 'onQuickEnd'");
          }
        };

        return XTween;
      }(Tween));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/XuanyunAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './BuffId.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, IntensionCfg, BuffId, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a0c58n9yaJEb4mixdEz6guz", "XuanyunAct", undefined);

      var XuanyunAct = exports('XuanyunAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(XuanyunAct, _ActBase);

        function XuanyunAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = XuanyunAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.xuanyun,
            iconTip: '',
            title: "眩晕",
            content: "\u65E0\u6CD5\u884C\u52A8"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.skill_act_over(function () {
            _this.actor.buff.mod(BuffId.Xuanyun, -1);
          }, onOver);
        };

        return XuanyunAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/XuanyunBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './NpcAICom.ts', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, NpcAICom, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      NpcAICom = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f7ee9cgQ5hJcZ0xKqjGbPtE", "XuanyunBuffCom", undefined);

      var XuanyunBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(XuanyunBuffCom, _ABuffCom);

        function XuanyunBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = XuanyunBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.OnAdd, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.OnAdd) {
            var _this$owner$c$get;

            (_this$owner$c$get = this.owner.c.get(NpcAICom)) == null ? void 0 : _this$owner$c$get.refreshAction();
          }
        };

        return XuanyunBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/XuebaoBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, TreasureId, ATreasureBuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "cbbfdvrnWxLx4cyosn6Gn7Y", "XuebaoBuff", undefined);

      var XuebaoBuff = exports('default', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(XuebaoBuff, _ATreasureBuffCom);

        function XuebaoBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = XuebaoBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.HandCardIn, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HandCardIn) {
            if (this.actNum == 0) {
              this.owner.recoverHp(this.buff.num, this.buff.info.name);
              this.popWrap();
            }
          }
        };

        _createClass(XuebaoBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Xuebao;
          }
        }]);

        return XuebaoBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/XuliAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './BuffId.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, IntensionCfg, BuffId, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ef95c4ZeUlDr4rmB0UgkmMt", "XuliAct", undefined);

      var XuliAct = exports('XuliAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(XuliAct, _ActBase);

        function XuliAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = XuliAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.tactics,
            iconTip: '',
            title: "蓄力",
            content: ""
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.skill_act_over(function () {
            _this.actor.buff.mod(BuffId.ChujueBj, 1, {
              write: true
            });
          }, onOver);
        };

        return XuliAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/YemobfAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AddbuffAct.ts', './BianfuAI.ts', './MulAttackAct.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, AddbuffAct, BianfuAI, MulAttackAct;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AddbuffAct = module.AddbuffAct;
    }, function (module) {
      BianfuAI = module.default;
    }, function (module) {
      MulAttackAct = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "11b69zBWRxDoY9e3ulfy6LF", "YemobfAI", undefined);

      var YemobfAI = exports('default', /*#__PURE__*/function (_BianfuAI) {
        _inheritsLoose(YemobfAI, _BianfuAI);

        function YemobfAI() {
          return _BianfuAI.apply(this, arguments) || this;
        }

        _createClass(YemobfAI, [{
          key: "actArr",
          get: function get() {
            return [AddbuffAct, MulAttackAct];
          }
        }]);

        return YemobfAI;
      }(BianfuAI));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/YezhuAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AttackAct.ts', './JuheAct.ts', './NpcAIBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AttackAct, JuheAct, NpcAIBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      JuheAct = module.JuheAct;
    }, function (module) {
      NpcAIBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "56d7etCRiRGWqEdu6v6koCh", "YezhuAI", undefined);

      var YezhuAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(YezhuAI, _NpcAIBase);

        function YezhuAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = YezhuAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          if (actNum % 2 == 0) {
            return new AttackAct(this.npc);
          } else {
            return new JuheAct(this.npc);
          }
        };

        return YezhuAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/YinrenBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "51a61UOsaZBVaFjEtCSAAox", "YinrenBuffCom", undefined);

      var YinrenBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(YinrenBuffCom, _ABuffCom);

        function YinrenBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = YinrenBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.HandCardIn, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HandCardIn) {
            this.owner.buff.mod(BuffId.enegy, this.buff.num);
            this.owner.buff.rm(this.buff.id);
          }
        };

        return YinrenBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/YinshenyBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './CardPlay.ts', './PlayerFightCardCom.ts', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, tc, CardPlay, PlayerFightCardCom, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "fc944AZ+JdE1b9Zra2QDnYQ", "YinshenyBuff", undefined);

      var YinshenyBuff = exports('default', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(YinshenyBuff, _ATreasureBuffCom);

        function YinshenyBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = YinshenyBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.RoundEnd, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.RoundEnd) {
            var everDefend = false;
            this.owner.c.get(PlayerFightCardCom).handcastLastRound.foreach_unsafe(function (id) {
              if (tc.p(CardPlay).infoOf(id).isDefend) {
                everDefend = true;
                return false;
              }

              return true;
            });

            if (!everDefend) {
              this.owner.buff.mod(BuffId.shiled, this.buff.num);
              this.popWrap();
            }
          }
        };

        _createClass(YinshenyBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Yinsheny;
          }
        }]);

        return YinshenyBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/YishibBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './CardPlay.ts', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, tc, CardPlay, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d59d5aInEdPuJpNpHycqlyR", "YishibBuff", undefined); // 一个回合内，打出3张攻击牌，力量+【num】


      var YishibBuff = exports('YishibBuff', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(YishibBuff, _ATreasureBuffCom);

        function YishibBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = YishibBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.LeaveFight, BuffNS.EffectOrder.base);
          this.setOrder(BuffNS.EffectStage.RoundEnd, BuffNS.EffectOrder.base);
          this.setOrder(BuffNS.EffectStage.AnyHandCardUsed, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          var newCounter = this.counterNum;

          if (stage == BuffNS.EffectStage.RoundEnd || stage == BuffNS.EffectStage.LeaveFight) {
            console.log("Yishibuff counter clear");
            newCounter = 0;
          } else if (stage == BuffNS.EffectStage.AnyHandCardUsed) {
            console.log("Yishibuff AnyHandCardUsed");

            if (tc.p(CardPlay).isAttack(arg.cardUsed)) {
              newCounter++;

              if (newCounter == 3) {
                this.owner.buff.mod(BuffId.power, this.buff.num);
                this.popWrap();
                newCounter = 0;
              }
            }
          }

          this.reviseNum(newCounter);
        };

        _createClass(YishibBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Yishib;
          }
        }]);

        return YishibBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/YoulingAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AttackAct.ts', './NpcAIBase.ts', './TouduAct.ts', './XinlingzsAct.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AttackAct, NpcAIBase, TouduAct, XinlingzsAct;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      NpcAIBase = module.default;
    }, function (module) {
      TouduAct = module.TouduAct;
    }, function (module) {
      XinlingzsAct = module.XinlingzsAct;
    }],
    execute: function () {
      cclegacy._RF.push({}, "60013Xub1RI3IZqUHG+tach", "YoulingAI", undefined);

      var YoulingAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(YoulingAI, _NpcAIBase);

        function YoulingAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = YoulingAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          if (actNum == 0) return new XinlingzsAct(this.npc);
          var no = (actNum - 1) % 2;
          if (no == 0) return new AttackAct(this.npc);
          return new TouduAct(this.npc);
        };

        return YoulingAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/YoulingzlAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DalilAct.ts', './JuheAct.ts', './MengjiAct.ts', './NpcAIBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, DalilAct, JuheAct, MengjiAct, NpcAIBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DalilAct = module.DalilAct;
    }, function (module) {
      JuheAct = module.JuheAct;
    }, function (module) {
      MengjiAct = module.MengjiAct;
    }, function (module) {
      NpcAIBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0133fpYqzdCvIpHiA5uV1PF", "YoulingzlAI", undefined);

      var YoulingzlAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(YoulingzlAI, _NpcAIBase);

        function YoulingzlAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = YoulingzlAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          if (actNum == 0) {
            return new DalilAct(this.npc);
          }

          var no = (actNum - 1) % 2;

          if (no % 2 == 0) {
            return new MengjiAct(this.npc);
          } else {
            return new JuheAct(this.npc);
          }
        };

        return YoulingzlAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/YTree.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "07f97ly1PVPGZRd+bW9hDvY", "YTree", undefined);

      var YTreeNode = exports('YTreeNode', /*#__PURE__*/function () {
        function YTreeNode(id, data) {
          this._id = void 0;
          this._parents = void 0;
          this._children = void 0;
          this._data = void 0;
          this._id = id;
          this._data = data;
          this._parents = [];
          this._children = [];
        }

        var _proto = YTreeNode.prototype;

        _proto.addChild = function addChild(node) {
          if (this._children.indexOf(node) > -1) return;

          this._children.push(node);

          node.addParent(this);
        };

        _proto.addParent = function addParent(node) {
          if (this._parents.indexOf(node) > -1) return;

          this._parents.push(node);

          node.addChild(this);
        };

        _createClass(YTreeNode, [{
          key: "id",
          get: function get() {
            return this._id;
          }
        }, {
          key: "data",
          get: function get() {
            return this._data;
          }
        }, {
          key: "minDepth",
          get: function get() {
            if (this._parents.length < 1) return 0;
            return this._parents.reduce(function (pre, node) {
              return Math.min(pre, node.minDepth);
            }, Number.MAX_VALUE) + 1;
          }
        }, {
          key: "maxDepth",
          get: function get() {
            if (this._parents.length < 1) return 0;
            return this._parents.reduce(function (pre, node) {
              return Math.max(pre, node.maxDepth);
            }, 0) + 1;
          }
        }, {
          key: "children",
          get: function get() {
            return this._children;
          }
        }, {
          key: "parents",
          get: function get() {
            return this._parents;
          }
        }]);

        return YTreeNode;
      }());
      /**支持节点有两个父节点的树 */

      var YTree = exports('YTree', /*#__PURE__*/function () {
        function YTree(root) {
          this._root = void 0;
          this._root = root;
        }

        var _proto2 = YTree.prototype;

        _proto2.getNode = function getNode(id) {
          var ret;
          this.walkByMinDepthOrder(function (n) {
            if (n.id === id) ret = n;
          });
          return ret;
        };

        _proto2.walkByMinDepthOrder = function walkByMinDepthOrder(walk) {
          var cur = [this._root];
          var next = [];
          walk(this._root, this._root.minDepth, 1, 0);

          while (cur.length > 0) {
            cur.forEach(function ($) {
              return $.children.forEach(function (child) {
                if (child.minDepth == $.minDepth + 1 && next.findIndex(function (n$) {
                  return n$.id == child.id;
                }) < 0) {
                  next.push(child);
                }
              });
            });
            next.forEach(function ($, i) {
              return walk($, $.minDepth, next.length, i);
            });
            cur = next;
            next = [];
          }
        };

        _proto2.walkByMaxDepthOrder = function walkByMaxDepthOrder(walk) {
          var cur = [this._root];
          var next = [];
          walk(this._root, this._root.minDepth, 1, 0);

          while (cur.length > 0) {
            cur.forEach(function ($) {
              return $.children.forEach(function (child) {
                if (child.maxDepth == $.maxDepth + 1 && next.findIndex(function (n$) {
                  return n$.id == child.id;
                }) < 0) {
                  next.push(child);
                }
              });
            });
            next.forEach(function ($, i) {
              return walk($, $.maxDepth, next.length, i);
            });
            cur = next;
            next = [];
          }
        };

        _createClass(YTree, [{
          key: "mindepth",
          get: function get() {
            if (!this._root) return -1;
            var ret = 0;
            this.walkByMinDepthOrder(function (n, dep) {
              return ret = Math.max(ret, dep);
            });
            return ret;
          }
        }, {
          key: "maxdepth",
          get: function get() {
            if (!this._root) return -1;
            var ret = 0;
            this.walkByMaxDepthOrder(function (n, dep) {
              return ret = Math.max(ret, dep);
            });
            return ret;
          }
        }]);

        return YTree;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/YuanDunBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, TreasureId, ATreasureBuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "dde51Xl7zlPm4xd5uxepiTi", "YuanDunBuffCom", undefined); // gain the same number of layers shiled  on fight start


      var YuanDunBuffCom = exports('default', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(YuanDunBuffCom, _ATreasureBuffCom);

        function YuanDunBuffCom() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = YuanDunBuffCom.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.HandCardIn, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.HandCardIn) {
            if (this.actNum == 0) {
              this.owner.buff.mod(BuffId.shiled, this.buff.num);
              this.popWrap();
            }
          }
        };

        _createClass(YuanDunBuffCom, [{
          key: "tid",
          get: function get() {
            return TreasureId.Yuandun;
          }
        }]);

        return YuanDunBuffCom;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/YuxueBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffId.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffId, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d4b6dpoLehD+b2tYSRFgT7l", "YuxueBuff", undefined);

      var YuxueBuff = exports('YuxueBuff', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(YuxueBuff, _ABuffCom);

        function YuxueBuff() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = YuxueBuff.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.Hurt, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.Hurt) {
            this.owner.buff.mod(BuffId.power, this.buff.num);
          }
        };

        return YuxueBuff;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ZhihuanBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FightCardMsg.ts', './PlayerFightCardCom.ts', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, FightCardMsg, PlayerFightCardCom, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FightCardMsg = module.FightCardMsg;
    }, function (module) {
      PlayerFightCardCom = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "22e529BpqxAlIFKb/aymZJH", "ZhihuanBuff", undefined);

      var ZhihuanBuff = exports('ZhihuanBuff', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(ZhihuanBuff, _ABuffCom);

        function ZhihuanBuff() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = ZhihuanBuff.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.OnAdd, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.OnAdd) {
            this.owner.c.get(PlayerFightCardCom).hand.foreach_unsafe(function ($) {
              $.c.each(function ($) {
                return $.onMsg(FightCardMsg.Zhihuan);
              });
              return true;
            });
          }
        };

        return ZhihuanBuff;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ZhizhuAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AttackAct.ts', './JianxiaoAct.ts', './NpcAIBase.ts', './TouduAct.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AttackAct, JianxiaoAct, NpcAIBase, TouduAct;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      JianxiaoAct = module.JianxiaoAct;
    }, function (module) {
      NpcAIBase = module.default;
    }, function (module) {
      TouduAct = module.TouduAct;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a462fQQQudCbJqqRPv5RrfF", "ZhizhuAI", undefined);

      var ZhizhuAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(ZhizhuAI, _NpcAIBase);

        function ZhizhuAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = ZhizhuAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          if (actNum % 3 == 0) {
            return new JianxiaoAct(this.npc);
          } else if (actNum % 3 == 1) {
            return new AttackAct(this.npc);
          } else {
            return new TouduAct(this.npc);
          }
        };

        return ZhizhuAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ZhuoshaoBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f2f54TjicZMP5p6VuHLZifR", "ZhuoshaoBuffCom", undefined);

      var ZhuoshaoBuffCom = exports('default', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(ZhuoshaoBuffCom, _ABuffCom);

        function ZhuoshaoBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = ZhuoshaoBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.RoundEnd, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          if (stage == BuffNS.EffectStage.RoundEnd) {
            this.owner.cutHp(this.buff.num, null, this.buff.info.name);
          }
        };

        return ZhuoshaoBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ZibaoAct.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './IntensionCfg.ts', './tc.ts', './BuffId.ts', './BuffPlay.ts', './ActBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, IntensionCfg, tc, BuffId, BuffPlay, ActBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      IntensionCfg = module.default;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      BuffId = module.BuffId;
    }, function (module) {
      BuffPlay = module.default;
    }, function (module) {
      ActBase = module.ActBase;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1564atBlpBDab/VpbcF5WaD", "ZibaoAct", undefined);

      var ZibaoAct = exports('ZibaoAct', /*#__PURE__*/function (_ActBase) {
        _inheritsLoose(ZibaoAct, _ActBase);

        function ZibaoAct() {
          return _ActBase.apply(this, arguments) || this;
        }

        var _proto = ZibaoAct.prototype;

        _proto.OnGetIntension = function OnGetIntension() {
          return {
            icon: IntensionCfg.res.attack,
            iconTip: '' + this.actualdmg,
            title: "自爆",
            content: "\u8FD9\u540D\u654C\u4EBA\u5373\u5C06\u81EA\u7206\u5E76\u9020\u6210" + this.actualdmg + "\u70B9\u4F24\u5BB3"
          };
        };

        _proto.OnDo = function OnDo(onOver) {
          var _this = this;

          this.attack_act_byatk_over(function () {
            _this.actor.info.getLiveEnemys().forEach(function (e) {
              return e.getHit(_this.actualdmg, _this.actor, "ZibaoAct");
            });

            _this.actor.cutHp(_this.actor.buff.numOf(BuffId.maxhp), null, "ZibaoAct");
          }, onOver);
        };

        _createClass(ZibaoAct, [{
          key: "actualdmg",
          get: function get() {
            return this.calcDmg(parseInt(tc.p(BuffPlay).propOf(BuffId.Zibao).dmg));
          }
        }]);

        return ZibaoAct;
      }(ActBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ZibaoBuffCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ZibaoAct.ts', './NpcAICom.ts', './ABuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, ZibaoAct, NpcAICom, ABuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ZibaoAct = module.ZibaoAct;
    }, function (module) {
      NpcAICom = module.default;
    }, function (module) {
      ABuffCom = module.ABuffCom;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "82a87v9Uz1CBJV0GOJiXdVV", "ZibaoBuffCom", undefined);

      var ZibaoBuffCom = exports('ZibaoBuffCom', /*#__PURE__*/function (_ABuffCom) {
        _inheritsLoose(ZibaoBuffCom, _ABuffCom);

        function ZibaoBuffCom() {
          return _ABuffCom.apply(this, arguments) || this;
        }

        var _proto = ZibaoBuffCom.prototype;

        _proto.OnInit = function OnInit() {
          this.setOrder(BuffNS.EffectStage.HandCardIn, BuffNS.EffectOrder.base);
          this.setOrder(BuffNS.EffectStage.RoundEnd, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          var _this = this;

          if (stage == BuffNS.EffectStage.HandCardIn) {
            this.modSelfNum(-1);
          } else if (stage == BuffNS.EffectStage.RoundEnd) {
            if (this.buff.num === 1) {
              var npcAI = this.owner.c.get(NpcAICom);
              npcAI.addUrgentAction(function () {
                return new ZibaoAct(_this.owner);
              });
              npcAI.refreshAction();
            }
          }
        };

        return ZibaoBuffCom;
      }(ABuffCom));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ZibaogblAI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AttackAct.ts', './NpcAIBase.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, AttackAct, NpcAIBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AttackAct = module.AttackAct;
    }, function (module) {
      NpcAIBase = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e744djuwAtOqIXDtE6sNPmO", "ZibaogblAI", undefined);

      var ZibaogblAI = exports('default', /*#__PURE__*/function (_NpcAIBase) {
        _inheritsLoose(ZibaogblAI, _NpcAIBase);

        function ZibaogblAI() {
          return _NpcAIBase.apply(this, arguments) || this;
        }

        var _proto = ZibaogblAI.prototype;

        _proto.OnNewNextAct = function OnNewNextAct(actNum) {
          return new AttackAct(this.npc);
        };

        return ZibaogblAI;
      }(NpcAIBase));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ZimujBuff.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './tc.ts', './CardPlay.ts', './TreasureId.ts', './ATreasureBuffCom.ts', './BuffNS.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createClass, cclegacy, tc, CardPlay, TreasureId, ATreasureBuffCom, BuffNS;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      tc = module.default;
    }, function (module) {
      CardPlay = module.default;
    }, function (module) {
      TreasureId = module.TreasureId;
    }, function (module) {
      ATreasureBuffCom = module.default;
    }, function (module) {
      BuffNS = module.BuffNS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "81c12CUwKlD5JKbi64IbhQC", "ZimujBuff", undefined);

      var ZimujBuff = exports('default', /*#__PURE__*/function (_ATreasureBuffCom) {
        _inheritsLoose(ZimujBuff, _ATreasureBuffCom);

        function ZimujBuff() {
          return _ATreasureBuffCom.apply(this, arguments) || this;
        }

        var _proto = ZimujBuff.prototype;

        _proto.OnOnInit = function OnOnInit() {
          this.setOrder(BuffNS.EffectStage.AnyHandCardUsed, BuffNS.EffectOrder.base);
          this.setOrder(BuffNS.EffectStage.RoundEnd, BuffNS.EffectOrder.base);
          this.setOrder(BuffNS.EffectStage.LeaveFight, BuffNS.EffectOrder.base);
        };

        _proto.OnDestory = function OnDestory() {};

        _proto.OnEffect = function OnEffect(stage, arg) {
          var counter = this.counterNum;

          if (stage == BuffNS.EffectStage.AnyHandCardUsed) {
            if (tc.p(CardPlay).isAttack(arg.cardUsed)) {
              counter++;

              if (counter > 2) {
                this.hurtAllEnemys(this.buff.num);
                counter = 0;
                this.popWrap();
              }
            }
          } else if (stage == BuffNS.EffectStage.RoundEnd || stage == BuffNS.EffectStage.LeaveFight) {
            counter = 0;
          }

          this.reviseNum(counter);
        };

        _createClass(ZimujBuff, [{
          key: "tid",
          get: function get() {
            return TreasureId.Zimuj;
          }
        }]);

        return ZimujBuff;
      }(ATreasureBuffCom));

      cclegacy._RF.pop();
    }
  };
});
