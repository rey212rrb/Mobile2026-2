
var jsNNLSdk;
if ((typeof fido !== "undefined") && fido && fido.ready && (!window.hasOwnProperty('injectedfidojs'))) {
    JSNNLSDK = function () { }
    jsNNLSdk = new JSNNLSDK();
}

if ((typeof jsNNLSdk !== "undefined") && jsNNLSdk) {

	jsNNLSdk.process = function (operation, rpData, serverMessage, onReply) {
		var strRpData = this.util.serializeObject(rpData);
		console.log('jsNNLSdk.process operation:'+operation+' rpData:'+strRpData+' serverMessage:'+serverMessage);

		WebNNLSdkInterface.process(
			operation,
			strRpData,
			serverMessage,
			this.util.serializeFunction(onReply));

	}

	jsNNLSdk.util = new UtilImpl();
	function UtilImpl () {
	
		this.serializeObject = function (obj) {
		    return ( (typeof (obj) === "undefined") || (obj == null) )? null: JSON.stringify(obj);
		}

		this.serializeFunction = function (func) {
			this.OnReply = ( (typeof (func) === "function")? (func) : (function (){}) );
			return "jsNNLSdk.util.OnReply";
		}
    };
}
