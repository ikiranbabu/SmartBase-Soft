package com.smartsoft.service.mock;

import com.smartsoft.service.SmsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service()
@Profile("!prod")
public class SmsServiceMock implements SmsService{
    private final Logger log = LoggerFactory.getLogger(SmsServiceMock.class);

    @Override
	public void sendRegisterSms(String code, String mobile) {
	    log.info("测试验证码是: " + mobile + ", " + code);

   }
}
