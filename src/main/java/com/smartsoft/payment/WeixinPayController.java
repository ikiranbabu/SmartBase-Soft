package com.smartsoft.payment;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartsoft.utils.*;
import com.smartsoft.utils.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/wxpay")
public class WeixinPayController {

    private final Logger log = LoggerFactory.getLogger(WeixinPayController.class);

    @GetMapping("/authorize")
    public void authorize(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        // 账号信息
        try {
            String openidUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + PayConfigUtil.APP_ID + "&redirect_uri=" + PayConfigUtil.REDIRECT_URI + "&response_type=code&scope=snsapi_base&state=smartsorf168#wechat_redirect";

            log.debug(openidUrl);

            httpResponse.setContentType("text/html;charset=utf-8");
            httpResponse.sendRedirect(openidUrl);
        } catch (Exception e) {
            log.error("authrozation error", e);
        }
    }

    @GetMapping("/prepay")
    public ModelAndView openid(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        SortedMap<Object, Object> payMap = new TreeMap<Object, Object>();
        try {
            String code = httpRequest.getParameter("code");
            String openId = getOpenId(code);

            String out_trade_no = getTradeNo();
            SortedMap<Object, Object> paraMap = new TreeMap<Object, Object>();
            paraMap.put("appid", PayConfigUtil.APP_ID);
            paraMap.put("attach", "测试");
            paraMap.put("body", "测试购买支付");
            paraMap.put("mch_id", PayConfigUtil.MCH_ID);
            paraMap.put("nonce_str", PayCommonUtil.create_nonce_str());
            paraMap.put("openid", openId);
            paraMap.put("out_trade_no", out_trade_no);
            paraMap.put("spbill_create_ip", PayCommonUtil.getAddrIp(httpRequest));
            paraMap.put("total_fee", "1");
            paraMap.put("trade_type", "JSAPI");
            paraMap.put("notify_url", PayConfigUtil.NOTIFY_URL);
            String sign = PayCommonUtil.createSign("UTF-8", paraMap, PayConfigUtil.API_KEY);
            paraMap.put("sign", sign);

            // 统一下单 https://api.mch.weixin.qq.com/pay/unifiedorder
            String url = "https://api.mch.weixin.qq.com/pay/unifiedorder";

            String xml = XMLUtil.ArrayToXml(paraMap);

            String xmlStr = HttpUtil.postData(url, xml);

            log.debug(xmlStr);
            // 预付商品id
            String prepay_id = "";

            if (xmlStr.indexOf("SUCCESS") != -1) {
                Map<String, String> map = XMLUtil.doXMLParse(xmlStr);
                prepay_id = (String) map.get("prepay_id");
            }

            log.debug(prepay_id);
            payMap.put("appId", PayConfigUtil.APP_ID);
            payMap.put("timeStamp", PayCommonUtil.create_timestamp());
            payMap.put("nonceStr", PayCommonUtil.create_nonce_str());
            payMap.put("signType", "MD5");
            payMap.put("package", "prepay_id=" + prepay_id);
            String paySign = PayCommonUtil.createSign("UTF-8", payMap, PayConfigUtil.API_KEY);

            payMap.put("pg", prepay_id);
            payMap.put("paySign", paySign);

        } catch (Exception e) {
            log.error("prepay error", e);
        }
        return new ModelAndView("wxpay/pay", "payMap", payMap);
    }

    private String getOpenId(String code) throws Exception {
        String url = "https://api.weixin.qq.com/sns/oauth2/access_token?"
            + "appid=" + PayConfigUtil.APP_ID
            + "&secret=" + PayConfigUtil.APPSECRET + "&code="
            + code + "&grant_type=authorization_code";
        String returnData = HttpUtil.getData(url);
        log.debug(returnData);
        ObjectMapper mapper = new ObjectMapper();
        OpenIdClass openIdClass = mapper.readValue(returnData, OpenIdClass.class);
        if (openIdClass.getOpenid() != null) {
            return openIdClass.getOpenid();
        }
        return "";
    }

    private String getTradeNo() {
        Date nowTime = new Date();
        SimpleDateFormat time = new SimpleDateFormat("yyyyMMddHHmmss");
        return "SMART" + time.format(nowTime);
    }

}
