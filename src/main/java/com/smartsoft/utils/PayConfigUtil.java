package com.smartsoft.utils;

/**
 * Created by gengjun on 17/4/26.
 */
public class PayConfigUtil {
    public static String APP_ID = "wx3e866128ae788d7a";

    public static String MCH_ID = "1466197902";
    public static String API_KEY = "GHJHHTGIUGDRFFLLSOOSOSOSSOOOS787";
    public static String CREATE_IP = "";
    public static String APPSECRET = "c22abc8c9007eaaed47568d752d6c708";
    public static String UFDODER_URL = "https://api.mch.weixin.qq.com/pay/unifiedorder";
    public static String NOTIFY_URL = "http://test.yovole.heidongtech.com/wxpay/notify";//回调地址。测试回调必须保证外网能访问到此地址
    public static String REDIRECT_URI = "http://test.yovole.heidongtech.com/wxpay/prepay";//授权之后访问的URL, 在此方法内拿到openid, 预下单
}
