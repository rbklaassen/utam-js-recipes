import WallToWall from '../../pageObjects/wallToWallTheme.js';
import HomePage from '../../pageObjects/obs_homePage.js';
import AddCommunity from 'salesforce-pageobjects/playgroundapp/pageObjects/authentication/addCommunity';
import Eula from 'salesforce-pageobjects/playgroundapp/pageObjects/authentication/eula';

/**
 * @param {string} communityURL
 */
async function updateCommunity(communityURL) {
    const prefix = 'https://';
    const addCommunity = await utam.load(AddCommunity);
    await addCommunity.toggleSlashS();
    await addCommunity.addCommunityUrl(browser.isAndroid ? communityURL : prefix.concat(communityURL));
    const continueButton = await addCommunity.getContinueButton();
    await continueButton.click();
}

const SAMPLE_COMMUNITY = 'novonordiskhealthcloud--qdkldev.sandbox.my.site.com/ObesityPSS/';

describe('Test Community Playground App', () => {
    it('testNavigation', async () => {
        // Accept Eula
        const eula = await utam.load(Eula);
        await eula.accept();
        // Setup community
        await updateCommunity(SAMPLE_COMMUNITY);

        utam.setBridgeAppTitle('Home');
        const wallToWall = await utam.load(WallToWall);
        const homePage = await wallToWall.getWallToWallContainer(HomePage);

        /*
        const root = await browser.$("c-wall-to-wall-theme");  
        console.log(root);
        const container = await root.$("slot > *"); 
        console.log(container);
        const button = await container.$(".createAccountButton");
        console.log(button);
        */

        console.log(wallToWall);
        console.log(homePage);

        const button = await homePage.getButton();
        await button.click();
    });
});
