import WallToWall from '../../pageObjects/wallToWallTheme.js';
import HomePage from '../../pageObjects/obs_homePage.js';

describe('Test Experience Site', () => {
    beforeEach(async () => {
        await browser.navigateTo('https://novonordiskhealthcloud--qdkldev.sandbox.my.site.com/ObesityPSS/');
    });

    it('testNavigation', async () => {
        console.log('Load Home Page');
        const wallToWall = await utam.load(WallToWall);
        const homePage = await wallToWall.getWallToWallContainer(HomePage);

        // get the create account button
        const button = await homePage.getButton();
        //await browser.pause(5000);

        // click the create account button
        await button.click();
        //await browser.pause(5000);

        // get the elements on the second page
        const p1 = await homePage.getPContent1();
        const p2 = await homePage.getPContent2();
        const p3 = await homePage.getPContent3();
        const p4 = await homePage.getPContent4();
        var p1class = await p1.getClassAttribute();
        var p2class = await p2.getClassAttribute();
        var p3class = await p3.getClassAttribute();
        var p4class = await p4.getClassAttribute();

        // test if all password prerequisites have the invalid class name
        expect(p1class).toContain('invalid');
        expect(p2class).toContain('invalid');
        expect(p3class).toContain('invalid');
        expect(p4class).toContain('invalid');

        // set the text for the input fields, so that p1 should become valid
        const username = await homePage.getInput();
        await username.setText('name@password-test.com');
        const password = await homePage.getInput1();
        await password.setText('test');
        //await browser.pause(5000);

        // test if the p1 element now contains the valid class name
        p1class = await p1.getClassAttribute();
        expect(p1class).toContain('valid');
        expect(p1class).not.toContain('invalid');

        // set the text for the input fields, so that also p2 should become valid
        await username.setText('name@password-Test.com');
        await password.setText('Test');
        //await browser.pause(5000);

        // test if the p2 element now contains the valid class name
        p2class = await p2.getClassAttribute();
        expect(p2class).toContain('valid');
        expect(p2class).not.toContain('invalid');

        // set the text for the input fields, so that also p3 should become valid
        await username.setText('name@password-Test12.com');
        await password.setText('Test12');
        //await browser.pause(5000);

        // test if the p3 element now contains the valid class name
        p3class = await p3.getClassAttribute();
        expect(p3class).toContain('valid');
        expect(p3class).not.toContain('invalid');

        // set the text for the input fields, so that also p4 should become valid
        await username.setText('name@password-Test1234.com');
        await password.setText('Test1234');
        //await browser.pause(5000);

        // test if the p4 element now contains the valid class name
        p4class = await p4.getClassAttribute();
        expect(p4class).toContain('valid');
        expect(p4class).not.toContain('invalid');
        //await browser.pause(5000);

        // get the next button
        const nextButton = await homePage.getButton1();
        // click the next button
        await nextButton.click();

        //await browser.pause(10000);
    });
});
