# 智软科创简单项目快速框架
# Smartsoft
This application was generated using JHipster 4.3.0, you can find documentation and help at [https://jhipster.github.io/documentation-archive/v4.3.0](https://jhipster.github.io/documentation-archive/v4.3.0).

该框架是对简单项目的快速开发框架, 框架基于[Jhipster搭建](https://jhipster.github.io), 可快速生成前后端基本代码.
##主要技术
Bootstrap 4

primeng (PrimeNG is a collection of rich UI components for Angular 2 https://www.primefaces.org/primeng/#/)

Angular 2

Spring Boot

## 浏览器及移动端支持
该框架可支持以下浏览器及移动端系统:

IE 10+, Chrome 45+, Firefox: 40+ ,Sarari 7+

Android: 4.1+, IPhone 7.1 +

## 开发指南
###前置需求
1. Java 8
2. 安装[Git](https://git-scm.com)
3. 安装[Node.js](http://nodejs.org), 请安装LTS版本
4. 更新npm: npm install -g npm
5. 安装Yeoman: npm install -g yo
6. 安装JHipster: npm install -g generator-jhipster

###Team Leader
1. git clone ssh://git@106.14.2.18/opt/git/smartsoft-base.git
2. 修改pom.xml中项目基本信息如下:
    ```
    <project.name>Smartsoft</project.name>//修改项目名称
    <project.artifactId>smartsoft</project.artifactId>//修改artifactId
    <project.version>1.0</project.version>//修改项目版本
    //当使用mvn liquibase:diff来比较项目和数据库的差异时需用到以下:
    <liquibase.url>jdbc:mysql://localhost:3306/smartsoft</liquibase.url>//数据库链接
    <liquibase.username>root</liquibase.username>//用户名
    <liquibase.password>123456</liquibase.password>//密码
    ```  
4. 修改.yo-rc.json baseName 为新项目的名字
5. 修改SmartsoftApp.java 的类名为baseName+App
4. 修改application-dev.yml和application-prod.yml中的数据库信息
3. 运行./lib/install-external-lib.sh
5. 在IDE或者命令行输入以下, 会自动创建数据库初始脚本
    ```
    mvn clean spring-boot:run -Pdev
    npm start
    浏览器输入: http://localhost:9000
    ```
6. 运行以下命令生成新的项目版本库:
    ```
    git rm -rf .git
    git init
    git add .
    git commit -m "init"
    ```
7. 运行以下命令, 目的是不提交liquibase目录下的文件
    ````
    git update-index --assume-unchanged ./src/main/resources/config/liquibase/changelog/*
    git update-index --assume-unchanged ./src/main/resources/config/liquibase/*.*
    ````

8. 上传新项目到git版本库

###Developer
1. git clone 项目
2. 运行以下命令,目的是不提交liquibase目录下的文件
   ```
    git update-index --assume-unchanged ./src/main/resources/config/liquibase/changelog/*
    git update-index --assume-unchanged ./src/main/resources/config/liquibase/*.*
   ```
3. 运行./lib/install-external-lib.sh
4. 前端开发:
    ```
    a. 运行: npm start
    b. http://localhost:9000
    ```
5. 后端开发:
    ```
    a. mvn clean spring-boot:run -Pdev
    b. http://localhost:8080
    ```

###一些说明
1. liqubase里面的文件不要提交到git
2. 短信发送在非prod的profile下只会打印出来, 并不会真正发送


###Git使用规范
根据该简单项目特性, 为保证快速开发, 我们定义master为主开发分支, 所有提交都是基于master.

为保证Git仓库历史记录清晰, 我们使用rebase的方式来提交代码

```
本地修改文件,并提交到自己的本地版本库
1. git add . 或 git add <FILE>
2. git commit ...

3. 通过以下命令来拿代码
   git pull --rebase （它会将你的版本加在最新的代码节点后面）
4. 如果有冲突，会提示你, 请打开冲突的文件，手动编辑文件到可用的版本。然后运行:
   git rebase --continue
5. 重复4直到所有的都solve
6. git push origin master
```


##生产环境部署:
1. 运行: mvn clean package -Pprod -Dmaven.test.skip
2. copy target/www里的所有文件到nginx
3. nginx.conf配置后端转发
4. nohup xx.war > /dev/null 2>&1 &

Note: there are still few other things remaining to do for Leaflet that we won't detail here.

For further instructions on how to develop with JHipster, have a look at [Using JHipster in development][].

### Using angular-cli

You can also use [Angular CLI][] to generate some custom client code.

For example, the following command:

    ng generate component my-component

will generate few files:

    create src/main/webapp/app/my-component/my-component.component.html
    create src/main/webapp/app/my-component/my-component.component.ts
    update src/main/webapp/app/app.module.ts

## Building for production

To optimize the Smartsoft application for production, run:

    ./mvnw -Pprod clean package

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

    java -jar target/*.war

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

Refer to [Using JHipster in production][] for more details.

## Testing

To launch your application's tests, run:

    ./mvnw clean test

### Client tests

Unit tests are run by [Karma][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

    yarn test



For more information, refer to the [Running tests page][].

## Using Docker to simplify development (optional)

You can use Docker to improve your JHipster development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.
For example, to start a mysql database in a docker container, run:

    docker-compose -f src/main/docker/mysql.yml up -d

To stop it and remove the container, run:

    docker-compose -f src/main/docker/mysql.yml down

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

    ./mvnw package -Pprod docker:build

Then run:

    docker-compose -f src/main/docker/app.yml up -d

For more information refer to [Using Docker and Docker-Compose][], this page also contains information on the docker-compose sub-generator (`jhipster docker-compose`), which is able to generate docker configurations for one or several JHipster applications.

## Continuous Integration (optional)

To configure CI for your project, run the ci-cd sub-generator (`jhipster ci-cd`), this will let you generate configuration files for a number of Continuous Integration systems. Consult the [Setting up Continuous Integration][] page for more information.

[JHipster Homepage and latest documentation]: https://jhipster.github.io
[JHipster 4.6.2 archive]: https://jhipster.github.io/documentation-archive/v4.6.2

[Using JHipster in development]: https://jhipster.github.io/documentation-archive/v4.6.2/development/
[Using Docker and Docker-Compose]: https://jhipster.github.io/documentation-archive/v4.6.2/docker-compose
[Using JHipster in production]: https://jhipster.github.io/documentation-archive/v4.6.2/production/
[Running tests page]: https://jhipster.github.io/documentation-archive/v4.6.2/running-tests/
[Setting up Continuous Integration]: https://jhipster.github.io/documentation-archive/v4.6.2/setting-up-ci/


[Node.js]: https://nodejs.org/
[Yarn]: https://yarnpkg.org/
[Webpack]: https://webpack.github.io/
[Angular CLI]: https://cli.angular.io/
[BrowserSync]: http://www.browsersync.io/
[Karma]: http://karma-runner.github.io/
[Jasmine]: http://jasmine.github.io/2.0/introduction.html
[Protractor]: https://angular.github.io/protractor/
[Leaflet]: http://leafletjs.com/
[DefinitelyTyped]: http://definitelytyped.org/
# SmartBase-Soft
