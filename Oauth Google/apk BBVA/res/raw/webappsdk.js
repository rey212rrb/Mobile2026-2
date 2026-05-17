
var jsFidoSdk;
if ((typeof fido !== "undefined") && fido && fido.ready && (!window.hasOwnProperty('injectedfidojs'))) {
    JSFIDOSDK = function () { }
    jsFidoSdk = new JSFIDOSDK();
}

if ((typeof jsFidoSdk !== "undefined") && jsFidoSdk) {
    jsFidoSdk.createInstance = function (protocol) {
		console.log('jsFidoSdk.createInstance of IAppSDK for the '+protocol+' protocol');

		WebAppSdkInterface.createInstance(protocol);
	}
	
	jsFidoSdk.process = function (fidoIn, onReply) {
		var strFidoIn = this.util.serializeObject(fidoIn);
		console.log('jsFidoSdk.process strFidoIn = : '+strFidoIn);

		WebAppSdkInterface.process(
			strFidoIn,
			this.util.serializeFunction(onReply));

	}

	jsFidoSdk.util = new UtilImpl();
	function UtilImpl () {
	
		this.serializeObject = function (obj) {
		    return ( (typeof (obj) === "undefined") || (obj == null) )? null: JSON.stringify(obj);
		}

		this.serializeFunction = function (func) {
			this.OnReply = ( (typeof (func) === "function")? (func) : (function (){}) );
			return "jsFidoSdk.util.OnReply";
		}
    };
}
