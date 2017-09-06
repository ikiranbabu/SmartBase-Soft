package com.smartsoft.payment;

import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipaySystemOauthTokenRequest;
import com.alipay.api.request.AlipayTradePrecreateRequest;
import com.alipay.api.response.AlipaySystemOauthTokenResponse;
import com.alipay.api.response.AlipayTradePrecreateResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping("/alipay")
public class AlipayController {

    private final Logger log = LoggerFactory.getLogger(AlipayController.class);

    public static final String CHARSET = "utf-8";
    public static final String APP_ID = "2016080200148907";
    public static final String APP_PRIVATE_KEY = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCKYiSdAaSgVlYYsGxzfXwCORFq2zzEvAsVATMzeDTfX/fbRtSd0QT5BJaKkdmhR9FwDscw3NbrH5g3oe73vroXxQq2Xn669kvtkzxWtTOeffcDyEFlPq/s3J+ERJYZrG0g924vLYYL/JvMy62BBLnfGcAiL4qY/dhB6QZ6nIxdo9A4P0d/Tnjrczo9xmLahP0pyYYgYE0KencwKKnO8Ui6g6rwaCjfMJMZqyXfqouQ3coSZddAyQ2gr4Pdq3IpHwfKLPxfkEUPeTekFhgY89EP9CsEJiDK7ecDjOjJHmGdevAmcga3ff/5lsU0q+dRT/5l95f1wBIbL24xpYKe/J1vAgMBAAECggEAQVFt4sYhxKS74s9zgVfbrtjtBbkSB/KScImudz7oBf+waEoYlZ1RcZDe1e1eAih6DSCMmN3EfBrfqHLA7yORhyK0mbwkqW8UC8GRm4PQJ6FhdOGTLIzYUT8Z9D7Dcr7Wi9b+pTohqYrEp3gEH3/xlAL9k6VJEEnRR9sL+dfm0VOJCpXI98IhQIXFvf+4+7N/ItzU0cENV0KJL9aECTNtog3rJRbvz3S6TA+EQnN/xuCXxkH0NLW0660EyRZ0DOxLYh3MZRclQd8QA+wcmA3jLwrJmxceHdrXeKIjX3WDZRc0Jp42rRHLfT1TdcaexEKrXS8jY7k7vyrEkt5Kw5PxYQKBgQDrjJ/WMnFmg5zR/BFWOKvCBxZCYp97VM3V5G2yVjCopOo+niNIXvEJavcB5w2WFHow2u7ad0OCyWzoykT2xWlThwqRiwZf78klcgLW8ae0xxs8vtNSHAZ/T2/O+qnUfnuTcPnObBWn4s83HxP0WLeADT04kdFlQcgvyE6VyufaWQKBgQCWZeKUIMtz7/sIgkdOPyHZ+d5IxJtFiJbk+KUadrAd4QkvQUljVhZgadGEO/IyU1rrkbi+AJr2fv4DWThkwJwYvgCEEE83sKzT9E3w/m2RLd5v3nefyP9cSZehakdxE/xjoPnbJj7xywAnp8ZJ14fcznQoLzYIU0iGz2eYauQtBwKBgQCc4XcfUU9n6KaM0Ka3V11GCDRSGJ+Bo/THzbEmAvO7jsMY23hCXkGJdT14fev1lkPfwCEvThmfxQoNbZJLDSZeZGWsk/y17t14XBv6Ds8Uvzur1KioWlQVfNHJ9/ceuPMTOz6VtjUiMRSz8LX4mxH0blzlDXF6UDrFYFK+v3p2WQKBgAn3cH9ueO0S7yjOMVl/F4gxZcietsdx2MYNsCtDyEICorAt/GYH023KNWc07cTl/zVzL7HvqlVBbyXbqMAMf4uoM7KMviMroxhcrTmWMr6XMpFpRbYiBMIh4lmBCID22RflGAmszCkL0dPO63YDQW6hg9MR5dvBYSIF5pCULNDLAoGAKCCWRl+XVOInihva7t0FC0StTD9/dqDmqBm1cyVcMW6nYf6uiQICeQHrU2XoAiCFzUEsSC6D0Mv3hkddSloPv5anhRFyCWUIi1TujnGVlg1mAK/bPOgacY/GoAM0OnTsKu5YNIeZbsONaL/Eg8H4aGz308LJbA2/TSx01GuhKsU=";
    public static final String ALIPAY_PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyNAdsfpP1blFk+Qs9HYyuNACKfjUTZ3Tw6tamndLMnQ2/KRTPO5bTauSpuRBXWtwMSoECabGOdMKdOM8aDo4wMkJnshLa5/l4iDJYP9RcGFqMis8f7/l13fHdHHC7j9PNkboLF5J3iE/8PW2yyuc+hDYqlrU9xYrRAn125nyJJJlDiCd/zlT2TDYsiGQvExqFFOzdJ+vL31DvzR1zbhf6GOV9UaF9UVbX5YcqP5u+aK5FRaq09EnUuVmwPbQZubdByrm07peaA1fBrPcRIbhbPVksHX9n7p1n3g+EuIPMsPAbyz6nvxdv1dJnAq5WlrwqLZ7jTEB43dAquhUgT2JDwIDAQAB";
    public static final String REDIRECT_URL = "http://test.yovole.heidongtech.com/alipay/prepay";

    @GetMapping("/authorize")
    public void authorize(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        // 账号信息
        try {
            String openidUrl = "https://openauth.alipaydev.com/oauth2/publicAppAuthorize.htm?app_id=" + APP_ID + "&scope=auth_base&redirect_uri=" + REDIRECT_URL;

            log.debug(openidUrl);

            httpResponse.setContentType("text/html;charset=utf-8");
            httpResponse.sendRedirect(openidUrl);
        } catch (Exception e) {
            log.error("authrozation error", e);
        }
    }

    @GetMapping("/prepay")
    public void pay(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        try {
            AlipayClient alipayClient = new
                DefaultAlipayClient("https://openapi.alipaydev.com/gateway.do", APP_ID, APP_PRIVATE_KEY, "json", "utf-8",
                ALIPAY_PUBLIC_KEY, "RSA2");

            AlipaySystemOauthTokenRequest oauthTokenRequestrequest = new AlipaySystemOauthTokenRequest();
            oauthTokenRequestrequest.setCode(httpRequest.getParameter("auth_code"));
            oauthTokenRequestrequest.setGrantType("authorization_code");
            AlipaySystemOauthTokenResponse oauthTokenResponse = alipayClient.execute(oauthTokenRequestrequest);

            log.debug("Alipay OpenID: " + oauthTokenResponse.getUserId());
            //TODO: if cannot get openid, redirect to wrong page

            AlipayTradePrecreateRequest request = new AlipayTradePrecreateRequest();//创建API对应的request类
            Date nowTime = new Date();
            SimpleDateFormat time = new SimpleDateFormat("yyyyMMddHHmmss");

            request.setBizContent("{" +
                "    \"out_trade_no\":\"" + time.format(nowTime) + "\"," +
                "    \"total_amount\":\"88.88\"," +
                "    \"subject\":\"Iphone6 16G\"," +
                "    \"store_id\":\"NJ_001\"," +
                "    \"timeout_express\":\"90m\"}");//设置业务参数
            AlipayTradePrecreateResponse response = null;
            try {
                response = alipayClient.execute(request);
            } catch (AlipayApiException e) {
                e.printStackTrace();
            }
            System.out.print(response.getBody());
            httpResponse.setContentType("text/html;charset=" + CHARSET);
            httpResponse.sendRedirect(response.getQrCode());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
