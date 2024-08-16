// const { ROLES } = require("../models");

module.exports = {
	targets: [
		0, //everyone
		1, //female
		2 //male
	],
	// ROLE_SUPERADMIN: ROLES[0],
	// ROLE_SUBADMIN: ROLES[1],
	// ROLE_USER: ROLES[2],
	ORDER_TYPE_ORDER: 0,
	ORDER_TYPE_SALE: 1,
	STOCK_ACTION_ORDER: 0,
	STOCK_ACTION_ADJUST: 2,
	TRX_TYPE_PRODUCT: 0,
	TRX_TYPE_SERVICE: 1,
	TRX_TYPE_MEMBERSHIP: 2,
	TRX_TYPE_VOUCHER: 3,
	TOKEN_TYPE_EMAIL: "email",
	TOKEN_TYPE_SMS: "sms",
	RES_STATUS_SUCCESS: 1,
	RES_STATUS_FAIL: 0,
	RES_MSG_SAVE_SUCCESS: "Data is saved successfuly",
	RES_MSG_SAVE_FAIL: "Data saving is fail",
	RES_MSG_UPDATE_SUCCESS: "Data is updated successfuly",
	RES_MSG_UPDATE_FAIL: "Data updating is fail",
	RES_MSG_DELETE_SUCCESS: "Data is deleted successfuly",
	RES_MSG_DELETE_FAIL: "Data deletion is fail",
	RES_MSG_DATA_NOT_FOUND: "Data is not found",
	RES_MSG_DATA_FOUND: "Data is found",
	RES_MSG_SUCESS: "Success",
	RES_MSG_FAIL: "Failure",
	RES_MSG_INVALID_REQUEST: "Invalid request",
}