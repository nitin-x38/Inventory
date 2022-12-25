

'use strict';



const encryptor = require('../../common/encrypt.js');



var authServices = {



    generateUserLoginToken: async function (userId, deviceId) {



        let userToken = "NA";



        try {



            let accessCode = Math.random().toString(36).substr(2);

            let currentTime = parseInt(Date.now() / 1000);



            let tokenData = {

                success: 1,

                time: currentTime,

                accessCode: accessCode,

                deviceId: deviceId,

                userId: userId

            }

            console.log(tokenData);

            let tokenString = JSON.stringify(tokenData);

            userToken = encryptor.encrypt(tokenString);



        } catch (e) {



            console.log(e);



        }



        return userToken;

    },



    verifyUserLoginToken: async function (loginToken, deviceId) {



        let data = {

            success: 0,

            userId: "NA",

            deviceId: "NA",

            message: "something went wrong"

        }



        try {



            let dataString = encryptor.decrypt(loginToken);

            let dataTemp = JSON.parse(dataString);



            console.log(dataTemp);



            if (dataTemp.deviceId == deviceId) {



                data.success = 1;

                data.deviceId = dataTemp.deviceId;

                data.userId = dataTemp.userId;

                data.message = "Verified";



            } else {



                data.success = 0;

                data.deviceId = "NA",

                    data.message = "Device verification failed",

                    data.userId = "NA"

            }



        } catch (e) {

            console.log(e);

        }



        return data;

    }

};



module.exports = authServices;

