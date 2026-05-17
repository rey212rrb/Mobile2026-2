console.log("Defining NokNok");

NokNok = {AppSDK2: {}, AppSDK: {}}

/**
* NokNok.AppSDK2
*/
NokNok.AppSDK2.operation_REG = 'REG';
NokNok.AppSDK2.operation_AUTH = 'AUTH';
NokNok.AppSDK2.operation_OOB_AUTH = 'OOB_AUTH';
NokNok.AppSDK2.operation_DELETE_REG = 'DELETE_REG';

 /**
 * Initialize the App SDK for a particular operation.
 *
 * @param op The operation for which the initialization should be done.
 * @param rpData The information which should be provided by RP.
 *
 * @return ResponseData with initialization response
 */
NokNok.AppSDK2.initOperation = function (operation, rpData, onReply) {
    var strRpData = NokNok.serializeObject(rpData);
    console.log('NokNok.AppSDK2.initOperation = : ' +operation);

    NNLAppSdk.initOperation(
        operation,
        strRpData,
        NokNok.serializeFunction(onReply));
}

/**
* 
* Asynchronous function for processing request from server.
*
* @param rpData A pointer of RPData class instance with request parameters provided by RP.
* @param serverMessage The base64url encoded message from server.
*/
NokNok.AppSDK2.process = function (rpData, serverMessage, onReply) {
	console.log('NokNok.AppSDK2.process serverMessage = : '+ serverMessage);
	var strRpData = NokNok.serializeObject(rpData);
	NNLAppSdk.process(
		strRpData,
		serverMessage,
		NokNok.serializeFunction(onReply));
}

/**
 * Deletes the sessionID cookie.
 */
NokNok.AppSDK2.deleteSession = function() {
    NNLAppSdk.deleteSession();
}

NokNok.AppSDK2.getErrorText = function (status) {
	return NNLAppSdk.getResultType(status);
}

/**
* NokNok.AppSDK
*/
	NokNok.AppSDK.process = function (uafRequest, onReply) {
		var strFidoIn = NokNok.serializeObject({"uafIntent":"UAF_OPERATION","fidoRequest":uafRequest});
		console.log('NokNok.AppSDK.process fidoIn = : '+strFidoIn);

		NNLAppSdk.process(
			strFidoIn,
			NokNok.serializeFunction(onReply));

	}

/**
* NokNok
*/
NokNok.serializeObject = function (obj) {
	return ( (typeof (obj) === "undefined") || (obj == null) )? null: JSON.stringify(obj);
}

NokNok.serializeFunction = function (func) {
	NokNok.OnReply = ( (typeof (func) === "function")? (func) : (function (){}) );
	return "NokNok.OnReply";
}
