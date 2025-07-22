package com.Reihan.EvaluationService.security;

import Reihan.net.exceptionhandler.Exception.GeneralException;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;


public class JAVAXCryptoUtils {

    private static final String ALGORITHM = "AES";
    private static final byte[] KEY = "PUNISHMENTSECRET".getBytes();

    public static String encrypt(String data) throws Exception {
        try {
            SecretKey secretKey = new SecretKeySpec(KEY, ALGORITHM);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] encryptedBytes = cipher.doFinal(data.getBytes());
            return Base64.getEncoder().encodeToString(encryptedBytes);
        }catch (Exception e){
            throw  new GeneralException("مشکلی در ساخت کلید رول پیش آمده است");
        }
    }

    public static String decrypt(String encryptedData) throws Exception {
        try {
        SecretKey secretKey = new SecretKeySpec(KEY, ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        byte[] decodedBytes = Base64.getDecoder().decode(encryptedData);
        byte[] decryptedBytes = cipher.doFinal(decodedBytes);
        return new String(decryptedBytes);
    }catch (Exception e){
        throw  new GeneralException("مشکلی در ساخت کلید رول پیش آمده است");
    }
    }
}
