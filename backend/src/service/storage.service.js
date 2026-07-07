const imageKit = require("imagekit")

let storageInstance = new imageKit({
    publicKey:process.env.PUBLICKEY,
    privateKey:process.env.PRIVATEKEY,
    urlEndpoint:process.env.URLENDPOINT
})

let sendToImage = async(file , fileName)=>{
  let option={
    file,
    fileName
  }

  return await storageInstance.upload(option)
}

module.exports = sendToImage