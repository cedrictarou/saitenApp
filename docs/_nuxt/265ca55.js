(window.webpackJsonp=window.webpackJsonp||[]).push([[11,9],{449:function(t,e,n){"use strict";n.r(e);var r={},o=n(89),c=n(133),l=n.n(c),d=n(225),f=n(471),v=n(446),h=n(586),_=n(52),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-dialog",{attrs:{transition:"dialog-top-transition","max-width":"600"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,o=e.attrs;return[n("v-btn",t._g(t._b({attrs:{color:"grey",outlined:""}},"v-btn",o,!1),r),[t._v("操作説明")])]}},{key:"default",fn:function(dialog){return[n("v-card",[n("v-toolbar",{attrs:{color:"primary",dark:""}},[t._v("操作説明")]),t._v(" "),n("v-card-text",{staticClass:"px-5 pt-5 text-body-1"},[t._t("default")],2),t._v(" "),n("v-card-actions",{staticClass:"justify-end"},[n("v-btn",{attrs:{text:""},on:{click:function(t){dialog.value=!1}}},[t._v("Close")])],1)],1)]}}],null,!0)})}),[],!1,null,"5c4b5663",null);e.default=component.exports;l()(component,{VBtn:d.a,VCard:f.a,VCardActions:v.a,VCardText:v.b,VDialog:h.a,VToolbar:_.a})},590:function(t,e,n){"use strict";n.r(e);var r=n(8),o=(n(67),n(25),n(12),n(3),n(9),n(29),{components:{Description:n(449).default},middleware:"check-excisting-data",data:function(){var t=this;return{isValidated:!1,score:{chishiki:0,shiko:0},target:0,studentNum:0,items:["No.","正解数","配点","小計","配分","観点"],correctNumber:null,maxPoint:10,minPoint:0,isLessThanHundred:!1,rules:[function(t){return null!==t||"値を入力してください。"},function(e){return e>=t.minPoint||"".concat(t.minPoint,"以上の値を入力してください")},function(e){return e<=t.maxPoint||"".concat(t.maxPoint,"以下の値を入力してください")},function(t){return/[0-9]/.test(t)||"半角英数字を入力してください"}]}},computed:{questions:function(){return this.$store.getters["questions/questions"]},students:function(){return this.$store.getters["students/students"].filter((function(s){return!0===s.isAttending}))},totalScore:function(){var t=this.shikoTotal+this.chishikiTotal;return this.alertOverHundred(t),t},shikoTotal:function(){var t=this.questions.filter((function(t){return"思考・表現・判断"===t.kanten})),e=0;return t.forEach((function(t){e+=t.correctNumber*t.point})),e},chishikiTotal:function(){var t=this.questions.filter((function(t){return"知識・技能"===t.kanten})),e=0;return t.forEach((function(t){e+=t.correctNumber*t.point})),e}},mounted:function(){this.$refs.focusThis[0].focus()},methods:{alertOverHundred:function(t){t>100?(this.isLessThanHundred=!0,alert("Stop!! The score is more than 100!!!")):this.isLessThanHundred=!1},getMaxPoint:function(t){this.maxPoint=t},changeCorrectNumber:function(t,e){this.$store.dispatch("questions/changeCorrectNumber",{id:t,value:e})},shortCutKeyForNextStudent:function(t){(t.ctrlKey||t.metaKey)&&this.nextStudent()},nextStudent:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.totalScore>100||!1===t.isValidated)){e.next=4;break}t.alertOverHundred(t.totalScore),e.next=8;break;case 4:return n={id:t.students[t.studentNum].id,chishiki:t.chishikiTotal,shiko:t.shikoTotal},e.next=7,t.$store.dispatch("students/addScoreToStudent",n);case 7:t.studentNum===t.students.length-1?(alert("結果を表示します"),t.$router.push("/result"),t.reset(),t.studentNum=0):(t.studentNum++,t.reset(),t.focusInput(0));case 8:case"end":return e.stop()}}),e)})))()},focusInput:function(t){this.$refs.focusThis[t].focus()},moveNext:function(t){var e=this.$refs.focusThis.length;t>=0&&t<e-1&&this.focusInput(Number(t+1))},movePrev:function(t){var e=this.$refs.focusThis.length;t>=1&&t<e&&this.focusInput(Number(t-1))},reset:function(){this.isValidated=!1,this.$refs.form.reset(),this.focusInput(0)}}}),c=n(89),l=n(133),d=n.n(l),f=n(225),v=n(593),h=n(2),_=(n(55),n(72),n(222),n(64),n(168),n(13),n(10),n(16),n(17),n(14)),m=n(104),y=n(156);function k(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function x(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?k(Object(source),!0).forEach((function(e){Object(h.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):k(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var w=Object(_.a)(m.a,Object(y.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},n={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=input.$watch("shouldValidate",(function(r){r&&(t.errorBag.hasOwnProperty(input._uid)||(n.valid=e(input)))})):n.valid=e(input),n},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:x({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}}),C=n(190),O=n(529),V=n(452),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.students&&0===t.students.length||t.questions&&0===t.questions.length?n("div",[n("nuxt-link",{attrs:{to:"/settings"}},[t._v(" 設定画面へ ")])],1):n("v-container",[n("div",[n("h2",{staticClass:"text-center"},[t._v("採点ページ")]),t._v(" "),n("div",{staticClass:"d-flex justify-end mr-5"},[n("Description",{scopedSlots:t._u([{key:"default",fn:function(){return[n("p",[t._v("採点を行うページです。")]),t._v(" "),n("p",[t._v("\n              各問いの正当数を入力して自動でそれぞれの観点別と合計を計算します。\n            ")]),t._v(" "),n("p",[t._v("\n              入力フォームの移動は矢印キーやエンターキーで行うことができます。\n            ")]),t._v(" "),n("p",[n("v-btn",{attrs:{small:"",color:"success"}},[t._v("Next")]),t._v("をクリック、または"),n("span",{staticClass:"font-weight-bold"},[t._v("\n                Ctrl + Enter")]),t._v("を押すことで次の生徒の採点を行うことができます。\n            ")],1),t._v(" "),n("p",[t._v("\n              採点中の入力を消すときは\n              "),n("v-btn",{attrs:{small:"",color:"error"}},[t._v("Clear")]),t._v("を押してくください。\n            ")],1),t._v(" "),n("p",[t._v("\n              値が入力されていなかったり、指定された値以上の数値が入力されているとエラーが出ます。\n            ")])]},proxy:!0}])})],1),t._v(" "),n("div",{staticClass:"\n          status-bar\n          blue\n          lighten-5\n          rounded\n          mt-5\n          mx-2\n          pa-5\n          text-md-h5\n          font-weight-bold\n          d-flex\n          flex-column flex-sm-row\n          justify-space-between\n          flex-wrap\n        "},[n("div",{staticClass:"mr-auto d-flex"},[n("div",{staticClass:"mr-2"},[t._v("No.")]),t._v(" "),n("div",{staticClass:"mr-2"},[t._v(t._s(t.students[t.studentNum].id))]),t._v(" "),n("div",[t._v(t._s(t.students[t.studentNum].name))])]),t._v(" "),n("div",{staticClass:"d-flex mt-5 mt-sm-0 justify-space-between"},[n("div",{staticClass:"mr-2"},[t._v("\n            知識・技能: "),n("span",{staticClass:"mr-2"},[t._v(t._s(t.chishikiTotal))])]),t._v(" "),n("div",{staticClass:"mr-2"},[t._v("\n            思考・表現・判断: "),n("span",{staticClass:"mr-2"},[t._v(t._s(t.shikoTotal))])]),t._v(" "),n("div",[t._v("\n            合計:\n            "),n("span",{class:{"pink--text":t.isLessThanHundred}},[t._v(t._s(t.totalScore))])])])]),t._v(" "),n("div",{staticClass:"d-flex justify-end ma-5"},[n("v-btn",{staticClass:"mr-4",attrs:{disabled:!t.isValidated,color:"success"},on:{click:function(e){return t.nextStudent()}}},[n("v-icon",[t._v("mdi-arrow-right-thick")]),t._v("\n          Next")],1),t._v(" "),n("v-btn",{attrs:{color:"error"},on:{click:t.reset}},[n("v-icon",[t._v("mdi-trash-can-outline")]),t._v("Clear")],1)],1)]),t._v(" "),n("v-form",{ref:"form",model:{value:t.isValidated,callback:function(e){t.isValidated=e},expression:"isValidated"}},[n("v-simple-table",{attrs:{"fixed-header":"",height:"500px"},scopedSlots:t._u([{key:"default",fn:function(){return[n("thead",[n("tr",t._l(t.items,(function(e,r){return n("th",{key:r,staticClass:"text-left"},[n("span",[t._v(t._s(e))])])})),0)]),t._v(" "),n("tbody",t._l(t.questions,(function(e,r){return n("tr",{key:e.id},[n("td",[t._v(t._s(r+1))]),t._v(" "),n("td",[n("v-text-field",{ref:"focusThis",refInFor:!0,attrs:{rules:t.rules,value:t.correctNumber,type:"number",required:""},on:{input:function(n){t.changeCorrectNumber(e.id,n),t.getMaxPoint(e.setNumber)},keydown:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"tab",9,e.key,"Tab")?null:(e.preventDefault(),e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:t.moveNext(r))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"tab",9,e.key,"Tab")?null:(e.preventDefault(),e.shiftKey?t.movePrev(r):null)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:(e.preventDefault(),t.moveNext(r))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?null:(e.preventDefault(),t.movePrev(r))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:(e.preventDefault(),t.moveNext(r))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:e.metaKey?e.ctrlKey||e.shiftKey||e.altKey?null:t.nextStudent():null}]}})],1),t._v(" "),n("td",[n("span",[t._v("x")]),t._v(t._s(e.point))]),t._v(" "),n("td",[t._v(t._s(t.correctNumber*e.point))]),t._v(" "),n("td",[t._v(t._s(e.subtotal))]),t._v(" "),n("td",[t._v("\n                "+t._s(e.kanten)+"\n              ")])])})),0)]},proxy:!0}])})],1)],1)],1)}),[],!1,null,"1df0da6c",null);e.default=component.exports;d()(component,{VBtn:f.a,VContainer:v.a,VForm:w,VIcon:C.a,VSimpleTable:O.a,VTextField:V.a})}}]);