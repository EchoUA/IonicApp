describe('Clicking on the register button', function() {

    beforeEach(function() {
        browser.get('/#/app/login');
    });

    it('should go register page and successful register new user', function() {

        element(by.id('sign')).click();
        expect(browser.getCurrentUrl()).toEqual("http://localhost:8100/#/app/registration");

        element(by.id('first_name')).sendKeys('test');
        browser.driver.sleep(200);
        element(by.id('last_name')).sendKeys('user');
        browser.driver.sleep(200);
        element(by.model('vm.formdata.country')).$('[value="Croatia"]').click();
        browser.driver.sleep(200);
        element(by.model('vm.formdata.email')).sendKeys('testnew@email.com');
        browser.driver.sleep(200);
        element(by.model('vm.formdata.password')).sendKeys('parol123');
        browser.driver.sleep(200);
        element(by.model('vm.formdata.password2')).sendKeys('parol123');
        browser.driver.sleep(200);

        element(by.id('create-user')).click().then(function(response) {

            browser.driver.sleep(4000);
            expect(browser.getCurrentUrl()).toEqual("http://localhost:8100/#/app/news");

        });

        // browser.pause();

    });

});
