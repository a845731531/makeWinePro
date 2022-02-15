const Fs = require("fire-fs"),
FsExtra = require("fs-extra"),
Path = require("fire-path"),
Electron = require("electron"),
CfgUtil = Editor.require("packages://hot-update-tools/core/CfgUtil.js"),
OSS = Editor.require("packages://hot-update-tools/node_modules/ali-oss"),
GoogleAnalytics = Editor.require("packages://hot-update-tools/core/GoogleAnalytics.js"),
OutPut = Editor.require("packages://hot-update-tools/core/OutPut.js"),
Msg = Editor.require("packages://hot-update-tools/panel/msg.js");
Editor.require("packages://hot-update-tools/panel/env-project.js"),
Editor.require("packages://hot-update-tools/panel/env-test.js"),
Editor.require("packages://hot-update-tools/panel/manifest-gen.js"),
Editor.Panel.extend({
	style: Fs.readFileSync(Editor.url("packages://hot-update-tools/panel/index.css"), "utf8"),
	template: Fs.readFileSync(Editor.url("packages://hot-update-tools/panel/index.html"), "utf8"),
	ready() {
		GoogleAnalytics.init(),
		GoogleAnalytics.eventOpen(),
		this.plugin = new window.Vue({
			el: this.shadowRoot,
			created() {
				CfgUtil.initCfg(),
				this.$root.$on(Msg.Log, e = >{
					let t = new Date;
					this.logView += ` [$ {
						t.toLocaleString()
					}] : $ {
						e
					}\n`,
					this.$nextTick(() = >{
						let e = this.$els.log;
						e.scrollTop = e.scrollHeight
					})
				})
			},
			data: {
				logView: ""
			},
			computed: {},
			methods: {
				onStopTouchEvent(e) {
					e.preventDefault(),
					e.stopPropagation()
				},
				onBuildFinished(e) {},
				onTestSelect() {
					let e = 100 * Math.random();
					this.hotAddressArray.push(e.toFixed(2));
					let t = this.hotAddressArray.length - 1;
					this.$nextTick(() = >{
						this.$els.address.selectedIndex = t
					})
				}
			}
		})
	},
	messages: {
		"hot-update-tools:onBuildFinished" (e, t) {
			this.plugin.onBuildFinished(t)
		}
	}
});