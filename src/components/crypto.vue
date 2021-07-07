<template>
  <div>
    <el-input
      v-model="clearText"
      placeholder=""
      size="normal"
      clearable
      style="width: 300px"
    ></el-input>
    <el-button type="primary" size="default" @click="md5">MD5</el-button>
    <el-button type="primary" size="default" @click="encrypto"
      >AES加密</el-button
    >
    <el-button type="primary" size="default" @click="decrypto"
      >AES解密</el-button
    >
    <p>密文：{{ cipherText }}</p>
    <p>明文：{{ clearTextOrigin }}</p>
  </div>
</template>

<script>
import CryptoJs from "crypto-js";
const KEY = "123456789abcdefg";
const IV = "abcdefg123456789";
export default {
  data() {
    return {
      clearText: "",
      cipherText: "",
      clearTextOrigin: "",
    };
  },
  methods: {
    // md5加密  
    md5() {
      this.cipherText = CryptoJs.MD5(this.clearText).toString();
    },

    /**
     * AES  加密 -CBC
     * ECB：是一种基础的加密方式，密文被分割成分组长度相等的块（不足补齐），
     *      然后单独一个个加密，一个个输出组成密文。
     * CBC：是一种循环模式，前一个分组的密文和当前分组的明文异或或操作后再加密，
     *      这样做的目的是增强破解难度。
     */
    encrypto() {
      var word = this.clearText;
      var key = CryptoJs.enc.Utf8.parse(KEY);
      var iv = CryptoJs.enc.Utf8.parse(IV);
      var encrypted = "";
      if (typeof word == "string") {
        var srcs = CryptoJs.enc.Utf8.parse(word);
        encrypted = CryptoJs.AES.encrypt(srcs, key, {
          iv: iv,
          mode: CryptoJs.mode.CBC,
          padding: CryptoJs.pad.Pkcs7,
        });
      } else if (typeof word == "object") {
        var data = JSON.stringify(word);
        var srcs = CryptoJs.enc.Utf8.parse(data);
        encrypted = CryptoJs.AES.encrypt(srcs, key, {
          iv: iv,
          mode: CryptoJs.mode.CBC,
          padding: CryptoJs.pad.Pkcs7,
        });
      }
      this.cipherText = encrypted.ciphertext.toString();
      return encrypted.ciphertext.toString();
    },

    // AES 解密 -CBC
    decrypto() {
      var word = this.cipherText.toString();
      var key = CryptoJs.enc.Utf8.parse(KEY);
      var iv = CryptoJs.enc.Utf8.parse(IV);
      var encryptedHexStr = CryptoJs.enc.Hex.parse(word);
      var srcs = CryptoJs.enc.Base64.stringify(encryptedHexStr);
      var decrypt = CryptoJs.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJs.mode.CBC,
        padding: CryptoJs.pad.Pkcs7,
      });
      var decryptedStr = decrypt.toString(CryptoJs.enc.Utf8);
      this.clearTextOrigin = decryptedStr.toString();
      return decryptedStr.toString();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>