import { LightningElement, api } from 'lwc';
import registerUser from '@salesforce/apex/obs_CommunitiesSelfRegConfirmController.registerUser';
import BackgroundImg from '@salesforce/resourceUrl/homePageImage';

export default class obs_homePage extends LightningElement {
    @api welcomeScreenTitle;
    @api welcomeMessage;
    userEmail;
    firstName;
    userPassword;
    showHomePage = true;
    showRegistrationProcess = false;
    showEmail = false;
    showPassword = false;
    showVerificationCode = false;
    showNextBtn = false;
    showFirstNameNextBtn = false;
    showConfirmationScrean = false;
    showFirstName = false;
    showFirstNameConfirmation = false;
    showpassword = false;
    validEmail = false;
    validPassword = false;
    //Buttontrue = true;
    //classCSS = "slds-button slds-button_brand btnNextCustomDisabled";

    get passwordIcon() {
        return this.showpassword ? 'utility:hide' : 'utility:preview';
    }
    get passwordType() {
        return this.showpassword ? 'text' : 'password';
    }
    passwordHandler() {
        this.showpassword = !this.showpassword;
    }

    imageUrl = BackgroundImg;

    get getBackgroundImage() {
        console.log('HomeImage' + this.imageUrl);
        return ` background-image:  url("${this.imageUrl}")`;
    }

    showRegistration() {
        console.log('Home');
        this.showRegistrationProcess = true;
        this.showHomePage = false;
        this.showEmail = false;
        this.showPassword = false;
        this.showVerificationCode = false;
        this.showConfirmationScrean = false;
        this.showFirstName = false;
    }
    get options() {
        return [
            { label: 'Wegovy® (semaglutide) injection 2.4 mg', value: 'Wegovy_semaglutide_injection_2.4 mg' },
            { label: 'FinishedWegovy® (semaglutide) ', value: 'Wegovy_semaglutide_tablets' },
            { label: 'Other', value: 'Other' },
        ];
    }
    showEmailInput() {
        console.log('showEmailInput');
        this.showEmail = true;
        this.showRegistrationProcess = false;
        this.showHomePage = false;
        this.showPassword = false;
        this.showVerificationCode = false;
        this.showNextBtn = false;
        this.showConfirmationScrean = false;
        this.showFirstName = false;
        this.showFirstNameConfirmation = false;
    }

    showFirstNameInput() {
        console.log('showFirstNameInput');
        this.showFirstName = true;
        this.showEmail = false;
        this.showRegistrationProcess = false;
        this.showHomePage = false;
        this.showPassword = false;
        this.showVerificationCode = false;
        this.showNextBtn = false;
        this.showConfirmationScrean = false;
        this.showFirstNameConfirmation = false;
    }
    showFirstNameConfirmationInput() {
        console.log('start - showFirstNameConfirmationInput');

        registerUser({ userEmail: this.userEmail, firstName: this.firstName, userPassword: this.userPassword })
            .then((result) => {
                console.log('1');
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
                console.log('21');
            });
        this.showFirstNameConfirmation = true;
        this.showFirstName = false;
        this.showEmail = false;
        this.showRegistrationProcess = false;
        this.showHomePage = false;
        this.showPassword = false;
        this.showVerificationCode = false;
        this.showNextBtn = false;
        this.showConfirmationScrean = false;
    }

    /*
showLastNameInput(){
    this.showFirstName = false;
    this.showEmail = false;
    this.showRegistrationProcess = false;
    this.showHomePage = false;
    this.showPassword = false;
    this.showVerificationCode = false;
    this.showNextBtn = false;
    this.showConfirmationScrean = false;
}
*/
    showPasswordInput() {
        console.log('showPasswordInput');
        this.showPassword = true;
        this.showEmail = false;
        this.showRegistrationProcess = false;
        this.showHomePage = false;
        this.showVerificationCode = false;
        this.showNextBtn = false;
        this.showConfirmationScrean = false;
        this.showFirstName = false;
        this.showFirstNameConfirmation = false;
    }
    showVerificationCodeInput() {
        console.log('showVerificationCodeInput');
        this.showVerificationCode = true;
        this.showPassword = false;
        this.showEmail = false;
        this.showRegistrationProcess = false;
        this.showHomePage = false;
        this.showNextBtn = false;
        this.showConfirmationScrean = false;
        this.showFirstName = false;
        this.showFirstNameConfirmation = false;
    }
    showConfirmation() {
        console.log('showConfirmation');
        this.showConfirmationScrean = true;
        this.showVerificationCode = false;
        this.showPassword = false;
        this.showEmail = false;
        this.showRegistrationProcess = false;
        this.showHomePage = false;
        this.showNextBtn = false;
        this.showFirstName = false;
        this.showFirstNameConfirmation = false;
    }

    showNextButton(event) {
        console.log(event.detail.value);
        if (event.detail.value) {
            this.showNextBtn = true;
        }
    }
    showNextButtonFirstName(event) {
        console.log(event.detail.value);
        if (event.detail.value.length > 2) {
            console.log(event.detail.value.length);
            this.firstName = event.detail.value;
            console.log(this.showNextBtn);
            this.showNextBtn = true;
            console.log(this.showNextBtn);
        }
    }

    emailValidation(event) {
        console.log(event.detail.value);
        //var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //if (event.detail.value.match(mailformat)){
        //  console.log('Valide email');
        this.validEmail = true;
        //  this.userEmail = event.detail.value;
        //} else{
        //    this.validEmail = false;
        // }
        this.showNextBtnCreateLogin(this.validEmail, this.validPassword);
    }
    showNextButtonPassword(event) {
        // Validate lowercase letters
        let passwordValue = event.detail.value;
        console.log('Valide email' + passwordValue);
        //var lowerCaseLetters = /[a-z]/g;
        //if (passwordValue.match(lowerCaseLetters)) {
        this.template.querySelector('[data-id="letter"]').classList.remove('invalid');
        this.template.querySelector('[data-id="letter"]').classList.add('valid');
        /*} else {
      this.template
        .querySelector('[data-id="letter"]')
        .classList.remove("valid");
      this.template
        .querySelector('[data-id="letter"]')
        .classList.add("invalid");
    }*/

        // Validate capital letters
        //var upperCaseLetters = /[A-Z]/g;
        //if (passwordValue.match(upperCaseLetters)) {
        this.template.querySelector('[data-id="capital"]').classList.remove('invalid');
        this.template.querySelector('[data-id="capital"]').classList.add('valid');
        /*} else {
      this.template
        .querySelector('[data-id="capital"]')
        .classList.remove("valid");
      this.template
        .querySelector('[data-id="capital"]')
        .classList.add("invalid");
    }*/

        // Validate numbers
        //var numbers = /[0-9]/g;
        //if (passwordValue.match(numbers)) {
        this.template.querySelector('[data-id="number"]').classList.remove('invalid');
        this.template.querySelector('[data-id="number"]').classList.add('valid');
        /*} else {
      this.template
        .querySelector('[data-id="number"]')
        .classList.remove("valid");
      this.template
        .querySelector('[data-id="number"]')
        .classList.add("invalid");
    }*/

        // Validate length
        if (passwordValue.length >= 8) {
            this.template.querySelector('[data-id="length"]').classList.remove('invalid');
            this.template.querySelector('[data-id="length"]').classList.add('valid');
        } else {
            this.template.querySelector('[data-id="length"]').classList.remove('valid');
            this.template.querySelector('[data-id="length"]').classList.add('invalid');
        }

        console.log(event.detail.value);
        //if (passwordValue.match(numbers) && passwordValue.match(lowerCaseLetters) && passwordValue.length >= 8 && passwordValue.match(upperCaseLetters) ){
        console.log('Valide Password');
        this.validPassword = true;
        //} else {
        //    this.validPassword = false;
        //}
        this.showNextBtnCreateLogin(this.validEmail, this.validPassword);
    }
    showNextBtnCreateLogin(vEmail, vPassword) {
        if (vEmail && vPassword) {
            console.log('showNextBtn');
            //this.classCSS = "slds-button slds-button_brand btnNextCustom";
            this.showNextBtn = true;
            //this.Buttontrue = false;
        } else {
            this.showNextBtn = false;
            //this.Buttontrue = true;
            //this.classCSS = "slds-button slds-button_brand btnNextCustom";
            console.log('no showNextBtn');
        }
    }
}
