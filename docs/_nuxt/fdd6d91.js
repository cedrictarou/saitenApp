(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{483:function(t,e,n){var content=n(587);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(23).default)("31a70bfc",content,!0,{sourceMap:!1})},586:function(t,e,n){"use strict";n(483)},587:function(t,e,n){var r=n(22)(!1);r.push([t.i,"",""]),t.exports=r},593:function(t,e,n){"use strict";n.r(e);n(25),n(12),n(3),n(9),n(29);var r={middleware:"check-excisting-data",data:function(){var t=this;return{isValidated:!1,score:{chishiki:0,shiko:0},target:0,studentNum:0,selectedByDefault:"知識・技能",items:["No.","正解数","配点","小計","配分","観点"],correctNumber:null,maxPoint:10,minPoint:0,isLessThanHundred:!1,rules:[function(t){return null!==t||"値を入力してください。"},function(e){return e>=t.minPoint||"".concat(t.minPoint,"以上の値を入力してください")},function(e){return e<=t.maxPoint||"".concat(t.maxPoint,"以下の値を入力してください")},function(t){return/[0-9]/.test(t)||"半角英数字を入力してください"}]}},computed:{questions:function(){return this.$store.getters["questions/questions"]},students:function(){return this.$store.getters["students/students"]},totalScore:function(){var t=this.shikoTotal+this.chishikiTotal;return this.alertOverHundred(t),t},shikoTotal:function(){var t=this.questions.filter((function(t){return"思考・表現・判断"===t.kanten})),e=0;return t.forEach((function(t){e+=t.correctNumber*t.point})),e},chishikiTotal:function(){var t=this.questions.filter((function(t){return"知識・技能"===t.kanten})),e=0;return t.forEach((function(t){e+=t.correctNumber*t.point})),e}},mounted:function(){this.$refs.focusThis[0].focus()},methods:{alertOverHundred:function(t){t>100?(this.isLessThanHundred=!0,alert("Stop!! The score is more than 100!!!")):this.isLessThanHundred=!1},getMaxPoint:function(t){this.maxPoint=t},changeCorrectNumber:function(t,e){this.$store.dispatch("questions/changeCorrectNumber",{id:t,value:e})},shortCutKeyForNextStudent:function(t){(t.ctrlKey||t.metaKey)&&this.nextStudent()},nextStudent:function(){if(this.totalScore>100||!1===this.isValidated)this.alertOverHundred(this.totalScore);else{this.studentNum++;var t={id:this.studentNum,chishiki:this.chishikiTotal,shiko:this.shikoTotal};this.$store.dispatch("students/addScoreToStudent",t),this.reset(),this.focusInput(0),this.studentNum>this.students.length-1&&(alert("結果を表示します"),this.$router.push("/result"),this.studentNum=0)}},focusInput:function(t){this.$refs.focusThis[t].focus()},moveNext:function(t){var e=this.$refs.focusThis.length;t>=0&&t<e-1&&this.focusInput(Number(t+1))},movePrev:function(t){var e=this.$refs.focusThis.length;t>=1&&t<e&&this.focusInput(Number(t-1))},reset:function(){this.isValidated=!1,this.$refs.form.reset(),this.focusInput(0)}}},o=(n(586),n(90)),c=n(133),l=n.n(c),d=n(225),f=n(595),h=n(2),v=(n(55),n(72),n(223),n(64),n(168),n(13),n(10),n(16),n(17),n(14)),m=n(104),_=n(157);function y(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function k(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(e){Object(h.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var x=Object(v.a)(m.a,Object(_.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},n={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=input.$watch("shouldValidate",(function(r){r&&(t.errorBag.hasOwnProperty(input._uid)||(n.valid=e(input)))})):n.valid=e(input),n},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:k({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}}),O=n(191),w=n(127),N=n(82),T=n(534),V=n(452),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.students&&0===t.students.length||t.questions&&0===t.questions.length?n("div",[n("nuxt-link",{attrs:{to:"/settings"}},[t._v(" 設定画面へ ")])],1):n("v-container",{staticClass:"status-info"},[n("div",[n("h1",[t._v("採点ページ")]),t._v(" "),n("v-list",{staticClass:"d-flex justify-space-between align-center ma-5"},[n("v-list-item",[n("v-list-item-content",[n("span",[t._v("No.")]),t._v(t._s(t.students[t.studentNum].id)+"\n          ")])],1),t._v(" "),n("v-list-item",[n("v-list-item-content",[n("span",[t._v("名前:")]),t._v(t._s(t.students[t.studentNum].name)+"\n          ")])],1),t._v(" "),n("v-list-item",[n("v-list-item-content",[n("span",[t._v("知識・技能:")]),t._v(t._s(t.chishikiTotal)+"\n          ")])],1),t._v(" "),n("v-list-item",[n("v-list-item-content",[n("span",[t._v("思考・表現・判断:")]),t._v(t._s(t.shikoTotal)+"\n          ")])],1),t._v(" "),n("v-list-item",[n("v-list-item-content",[n("h3",[t._v("\n              合計\n              "),n("span",{class:{"pink--text text-h5":t.isLessThanHundred}},[t._v(t._s(t.totalScore))]),t._v("/100\n            ")])])],1)],1),t._v(" "),n("div",{staticClass:"d-flex justify-end ma-5"},[n("v-btn",{staticClass:"mr-4",attrs:{disabled:!t.isValidated,color:"success"},on:{click:function(e){return t.nextStudent()}}},[t._v("Next")]),t._v(" "),n("v-btn",{staticClass:"mr-4",attrs:{color:"error"},on:{click:t.reset}},[t._v("Clear")])],1)],1),t._v(" "),n("v-form",{ref:"form",model:{value:t.isValidated,callback:function(e){t.isValidated=e},expression:"isValidated"}},[n("v-simple-table",{attrs:{"fixed-header":"",height:"600px"},scopedSlots:t._u([{key:"default",fn:function(){return[n("thead",[n("tr",t._l(t.items,(function(e,r){return n("th",{key:r,staticClass:"text-left"},[n("span",[t._v(t._s(e))])])})),0)]),t._v(" "),n("tbody",t._l(t.questions,(function(e,r){return n("tr",{key:e.id},[n("td",[t._v(t._s(r+1))]),t._v(" "),n("td",[n("v-text-field",{ref:"focusThis",refInFor:!0,attrs:{rules:t.rules,value:t.correctNumber,type:"number",required:""},on:{input:function(n){t.changeCorrectNumber(e.id,n),t.getMaxPoint(e.setNumber)},keydown:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"tab",9,e.key,"Tab")?null:(e.preventDefault(),e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:t.moveNext(r))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"tab",9,e.key,"Tab")?null:(e.preventDefault(),e.shiftKey?t.movePrev(r):null)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:(e.preventDefault(),t.moveNext(r))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?null:(e.preventDefault(),t.movePrev(r))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:(e.preventDefault(),t.moveNext(r))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:e.metaKey?e.ctrlKey||e.shiftKey||e.altKey?null:t.nextStudent():null}]}})],1),t._v(" "),n("td",[n("span",[t._v("x")]),t._v(t._s(e.point))]),t._v(" "),n("td",[t._v(t._s(t.correctNumber*e.point))]),t._v(" "),n("td",[t._v(t._s(e.subtotal))]),t._v(" "),n("td",[t._v("\n                "+t._s(e.kanten)+"\n              ")])])})),0)]},proxy:!0}])})],1)],1)],1)}),[],!1,null,"6c988778",null);e.default=component.exports;l()(component,{VBtn:d.a,VContainer:f.a,VForm:x,VList:O.a,VListItem:w.a,VListItemContent:N.a,VSimpleTable:T.a,VTextField:V.a})}}]);