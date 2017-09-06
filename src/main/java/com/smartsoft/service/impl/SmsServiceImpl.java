package com.smartsoft.service.impl;

import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import com.aliyuncs.sms.model.v20160927.SingleSendSmsRequest;
import com.aliyuncs.sms.model.v20160927.SingleSendSmsResponse;
import com.smartsoft.service.SmsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service()
@Profile("prod")
public class SmsServiceImpl implements SmsService{
    private final Logger log = LoggerFactory.getLogger(SmsServiceImpl.class);

    @Override
	public void sendRegisterSms(String code, String mobile) {

        try {
            IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou", "LTAI27oR6zqe4Taz", "MjoJxoq4X13qFXSs6yMWKZoaNfRCQh");
            DefaultProfile.addEndpoint("cn-hangzhou", "cn-hangzhou", "Sms",  "sms.aliyuncs.com");
            IAcsClient client = new DefaultAcsClient(profile);
            SingleSendSmsRequest request = new SingleSendSmsRequest();
            request.setSignName("黑洞网络");//控制台创建的签名名称
            request.setTemplateCode("SMS_54280007");//控制台创建的模板CODE
            request.setParamString("{\"code\":\""+ code +"\",\"product\":\"智软科创\"}");//短信模板中的变量；数字需要转换为字符串；个人用户每个变量长度必须小于15个字符。"
            //request.setParamString("{}");
            request.setRecNum(mobile);//接收号码
            SingleSendSmsResponse httpResponse = client.getAcsResponse(request);
        } catch (Exception e) {
            log.error("sms send faild to " + mobile, e);
        }
   }

}
