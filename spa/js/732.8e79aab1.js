"use strict";(self["webpackChunkHeyler777"]=self["webpackChunkHeyler777"]||[]).push([[732],{85732:function(e,t,n){n.r(t),n.d(t,{default:function(){return j}});var r=n(84640),u=n.n(r),l=n(16664),a=n.n(l),i=(n(10040),n(21856),n(83712),n(83196),n(50296),n(53620),n(1304),n(92444)),c=n(75836),s=n(74044),o=n(7936),v=n(91416),d=n(75736),f=n(98920),p=n(71788),Q=n(74396),m=n(43288),h=n(25528),g=n(85876),D=function(e){return(0,i.ED)("data-v-0432e43c"),e=e(),(0,i.ii)(),e},E={class:"header"},b={class:"box box_two"},P={class:"active"},y={class:"content"},q={class:"q-pa-md scroll-y hide-scrollbar"},_={key:0,class:"No_data"},K=D((function(){return(0,i.QD)("p",null," ",-1)})),W={class:"mid"},k={class:"top"},w={key:0,class:"percent"},A={class:"title"},I=["onClick"],L=["innerHTML"],T={class:"down"},V={class:"right"},C={class:"bonus"},R={class:"row justify-center q-my-md"},N={__name:"PeriodicQuestList",setup:function(e){var t=(0,p.g)(),n=(0,Q.Y)(),r=(0,o.KX)(),l=r.replace,D=r.go,N=(0,f.useI18n)(),x=N.t,M=(0,v.c)(),z=(0,d.UL)(m.M.listActivedQuestRecords,{variables:{},fetchPolicy:"network-only"}),G=z.result,H=z.loading,O=z.refetch,B=(0,i.S6)((function(){var e,t=[],n=null===(e=G.value)||void 0===e?void 0:e.listActivedQuestRecords;if(!n)return t;for(var r=n.configs,u=n.periodics,l=0;l<r.length;l++){var a=(0,c.IL)({counters:0,curLevel:0,status:"RUNNING",curPercent:0,bonus:0}),i=r[l];for(var s in i)a.value[s]=i[s];if(a.value.bonus=F(a.value),"PERIODIC"==i.kind){for(var o=0;o<u.length;o++){var v=u[o];if(v.questId==i.id){a.value.counters=v.counters,a.value.curLevel=v.curLevel,a.value.status=v.status,a.value.bonus=F(a.value),a.value.curPercent=S(a.value);break}}t.push(a)}}return t})),Y=function(e){var t=e.curLevel,n=e.counters,r=0;switch(t>=e.levels.length?(r=e.levels[e.levels.length-1].request,n=r):r=e.levels[t].request,n=Math.min(n,r),e.conditionType){case"PROMOTION":return"".concat(n," / ").concat(r);case"BETTING":return"".concat(n/100," / ").concat(r/100);case"RECHARGE":return"".concat(n/100," / ").concat(r/100);default:return""}},S=function(e){var t=e.curLevel;if(t>=e.levels.length)return 100;var n=e.levels[t],r=+(e.counters/n.request*100).toFixed(2);return Math.min(100,r)},F=function(e){var t=e.curLevel;if(t>=e.levels.length)return 0;var n=e.levels[t];return n.bonus},U=function(e){var t=e.includeGameIds.map((function(e){var t=n.games[e];return t?t.name:""}));M.dialog({title:x("common.game"),message:"".concat(x("common.game"),": ").concat(t.join(",")),persistent:!0})},j=function(){var e=a()(u()().mark((function e(n){var r,l,a,i;return u()().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(n.value.curPercent<100||"RECEIVED"==n.value.status)){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,h.E.mutate({mutation:m.e.redeemPeriodicQuestBonus,variables:{attrs:{quest_id:n.value.id,level:n.value.curLevel}},fetchPolicy:"network-only"});case 5:r=e.sent,l=r.data.redeemPeriodicQuestBonus,a=l.user,i=l.record,n.value.status=i.status,n.value.curLevel=i.curLevel,n.value.curPercent=S(n.value),t.user.balance=a.balance,t.user.withdrawPoint=a.withdrawPoint,t.user.effectiveWithdrawPoint=a.effectiveWithdrawPoint,t.user.requiredWithdrawPoint=a.requiredWithdrawPoint,t.user.requiredWithdrawPointFix=a.requiredWithdrawPointFix,"RECEIVED"==i.status&&O(),M.notify({message:x("quest.message.receive_success"),timeout:1e3,icon:"mdi-information",position:"top",type:"positive"}),e.next=24;break;case 21:e.prev=21,e.t0=e["catch"](2),console.log("error:",e.t0);case 24:case"end":return e.stop()}}),e,null,[[2,21]])})));return function(t){return e.apply(this,arguments)}}();return B.value.length>0&&O(),function(e,t){var r=(0,i.E1)("q-btn"),u=(0,i.E1)("q-toolbar-title"),a=(0,i.E1)("q-toolbar"),o=(0,i.E1)("q-header"),v=(0,i.E1)("router-link"),d=(0,i.E1)("q-spinner-dots"),f=(0,i.E1)("q-infinite-scroll"),p=(0,i.E1)("q-page");return(0,i.Wz)(),(0,i.An)(i.ae,null,[(0,i.K2)(o,null,{default:(0,i.Ql)((function(){return[(0,i.K2)(a,null,{default:(0,i.Ql)((function(){return[(0,i.K2)(r,{flat:"",round:"",dense:"",onClick:t[0]||(t[0]=function(){return(0,c.KV)(n).prevRoute?(0,c.KV)(D)(-1):(0,c.KV)(l)({name:"UserCenter"})}),class:"icon_left"}),(0,i.K2)(u,null,{default:(0,i.Ql)((function(){return[(0,i.mY)((0,s.WA)(e.$t("routes.title.PeriodicQuestList")),1)]})),_:1})]})),_:1})]})),_:1}),(0,i.K2)(p,{class:"Sys_page"},{default:(0,i.Ql)((function(){return[(0,i.QD)("div",E,[(0,i.QD)("div",b,[(0,i.QD)("p",null,[(0,i.K2)(v,{to:{name:"DailyQuestList"},replace:""},{default:(0,i.Ql)((function(){return[(0,i.mY)((0,s.WA)((0,c.KV)(x)("quest.title.dailyQuests")),1)]})),_:1})]),(0,i.QD)("p",P,[(0,i.K2)(v,{to:{name:"PeriodicQuestList"},replace:""},{default:(0,i.Ql)((function(){return[(0,i.mY)((0,s.WA)((0,c.KV)(x)("quest.title.periodicQuests")),1)]})),_:1})])])]),(0,i.QD)("div",y,[(0,i.QD)("div",q,[(0,i.K2)(f,{class:"list"},(0,i.QP)({default:(0,i.Ql)((function(){return[(0,c.KV)(H)||0!=B.value.length?(0,i.g1)("",!0):((0,i.Wz)(),(0,i.An)("div",_,[K,(0,i.mY)(" "+(0,s.WA)((0,c.KV)(x)("common.noData")),1)])),((0,i.Wz)(!0),(0,i.An)(i.ae,null,(0,i.mi)(B.value,(function(e){return(0,i.Wz)(),(0,i.An)("div",{key:e.id,class:"record"},[(0,i.QD)("div",{class:(0,s.WN)({icon_promotion:"PROMOTION"==e.value.conditionType,icon_betting:"BETTING"==e.value.conditionType,icon_recharge:"RECHARGE"==e.value.conditionType})},null,2),(0,i.QD)("div",W,[(0,i.QD)("div",k,[e.value.levels.length>1?((0,i.Wz)(),(0,i.An)("p",w,"("+(0,s.WA)("".concat(Math.min(e.value.curLevel+1,e.value.levels.length),"/").concat(e.value.levels.length))+")",1)):(0,i.g1)("",!0),(0,i.QD)("p",A,(0,s.WA)(e.value.title),1),"BETTING"==e.value.conditionType?((0,i.Wz)(),(0,i.An)("div",{key:1,class:"info",onClick:function(t){return U(e.value)}},null,8,I)):(0,i.g1)("",!0)]),(0,i.QD)("div",null,[(0,i.QD)("div",{innerHTML:e.value.description},null,8,L)]),(0,i.QD)("div",T,[(0,i.QD)("span",null,(0,s.WA)(Y(e.value)),1),(0,i.QD)("p",null,[(0,i.QD)("i",{style:(0,s.MN)("width: ".concat(e.value.curPercent,"%"))},null,4)])])]),(0,i.QD)("div",V,[(0,i.QD)("div",C,[(0,i.QD)("p",null,(0,s.WA)((0,c.KV)(x)("quest.title.bonus")),1),(0,i.QD)("p",null,(0,s.WA)(" ".concat((0,c.KV)(g.op)).concat(e.value.bonus/100)),1)]),(0,i.K2)(r,{class:(0,s.WN)({btn_receive:e.value.curPercent<100,btn_receive_active:e.value.curPercent>=100&&"RECEIVED"!=e.value.status,btn_received:"RECEIVED"==e.value.status}),onClick:function(t){return j(e)}},{default:(0,i.Ql)((function(){return[(0,i.QD)("p",null,(0,s.WA)("RECEIVED"==e.value.status?(0,c.KV)(x)("quest.title.received"):e.value.curPercent>=100?(0,c.KV)(x)("quest.title.receive"):(0,c.KV)(x)("quest.title.unfinish")),1)]})),_:2},1032,["class","onClick"])])])})),128))]})),_:2},[(0,c.KV)(H)?{name:"loading",fn:(0,i.Ql)((function(){return[(0,i.QD)("div",R,[(0,i.K2)(d,{color:"primary",size:"40px"})])]})),key:"0"}:void 0]),1024)])])]})),_:1})],64)}}},x=n(68716),M=n(88936),z=n(6536),G=n(99140),H=n(36524),O=n(9440),B=n(75960),Y=n(76800),S=n(95252),F=n.n(S);const U=(0,x.c)(N,[["__scopeId","data-v-0432e43c"]]);var j=U;F()(N,"components",{QHeader:M.c,QToolbar:z.c,QBtn:G.c,QToolbarTitle:H.c,QPage:O.c,QInfiniteScroll:B.c,QSpinnerDots:Y.c})}}]);