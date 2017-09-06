#!/bin/bash

#sms
mvn install:install-file -Dfile=./aliyun-java-sdk-core-2.4.2.jar -DgroupId=com.aliyun -DartifactId=aliyun-java-sdk-core -Dversion=2.4.2 -Dpackaging=jar
mvn install:install-file -Dfile=./aliyun-java-sdk-sms-3.0.0-rc1.jar -DgroupId=com.aliyun -DartifactId=aliyun-java-sdk-sms -Dversion=3.0.0-rc1 -Dpackaging=jar
mvn install:install-file -Dfile=./alipay-sdk-java20170411150054.jar -DgroupId=com.alipay -DartifactId=alipay-sdk -Dversion=20170411150054 -Dpackaging=jar
