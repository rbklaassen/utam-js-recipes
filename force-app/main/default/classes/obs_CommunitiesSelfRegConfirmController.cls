public without sharing  class obs_CommunitiesSelfRegConfirmController {
    /*public nni_CommunitiesSelfRegConfirmController() {

    }*/
    @AuraEnabled(cacheable=false)
    public static String  registerUser(String userEmail, String firstName, String userPassword) {
        //Id pId = profileId ('NNI BSP Customer Community Plus Login User');       
        //String profileId =  '00e4x0000016za0AAA';//profileId ('NNI BSP Customer Community Plus Login User'); //'00e4x0000016za0AAA';//null; // To be filled in by customer.
        String accountId = idNewAccount(userEmail, firstName); //newPersonAccount.id;//'0017i00001TMB24AAH'; // To be filled in by customer.
        //String email = 'akramzouggari@gmail.com ';
        String lastName = 'test';
        String password = 'Abcdef124323456@';
        //String userName = email;
        //System.debug('1234userName'+userName);
        User u = new User();
        u.Username = firstName + lastName + 'novo';
        u.Email = userEmail;//email;
        u.FirstName = firstName;
        u.LastName = lastName;
        u.ContactId =  idNewAccount(userEmail, firstName);//newPersonAccount.id;//con.id;
        u.CommunityNickname = lastName + firstName + 'test';
		u.ProfileId = profileId ('NNI BSP Customer Community Plus Login User');//'00e4x0000016za0AAA'; //profileId;
		//System.debug('1234con.id'+con.id);
        //System.debug('1234User u'+u);
        String userId;        
        try {
            userId = Site.createExternalUser(u, accountId, userPassword, true);
            System.debug('***userId'+userId);
            return userId;
        } catch(Site.ExternalUserCreateException ex) {
            List<String> errors = ex.getDisplayMessages();           
            for (String error : errors)  {
                //ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, error));  
                return error;
            }
            System.debug(ex.getMessage());
        } 
        return '***There is error with the creation of new user';
    }
    
    @AuraEnabled(cacheable=false)
    public static String registerUserWithVerifyCode(String userEmail, String firstName) {
        String accountId = idNewAccount(userEmail, firstName);
        String lastName = 'test';
        User u = new User();
        u.Username = firstName + lastName + 'novo';
        u.Email = userEmail;//email;
        u.FirstName = firstName;
        u.LastName = lastName;
        u.ContactId =  idNewAccount(userEmail, firstName);//newPersonAccount.id;//con.id;
        u.CommunityNickname = lastName + firstName + 'test';
		u.ProfileId = profileId ('NNI BSP Customer Community Plus Login User');//'00e4x0000016za0AAA'; //profileId;
		//System.debug('1234con.id'+con.id);
        //System.debug('1234User u'+u);
        String userId;        
        try {
            userId = Site.createExternalUser(u, accountId, null, true);
            System.debug('userId'+userId);
            return userId;
        } catch(Site.ExternalUserCreateException ex) {
            List<String> errors = ex.getDisplayMessages();           
            for (String error : errors)  {
                //ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, error));  
                return error;
            }
            System.debug(ex.getMessage());
        } 
        return 'There is error with the creation of new user';

    }
    @AuraEnabled(cacheable=false)
    public static String  loginUser(String userEmail,String password ){
        System.debug('***userEmail'+userEmail);
        System.debug('***password'+password);
        String pw = password;//'Abc123456';//password;//password;//
        String uEmail= userEmail;//'azouggari@salesforce.com';
        String userName = userName (uEmail);//'akram22334testnovo@0db7i000000gpim.bdgldev.force.com'; //userName (uEmail);//'akram22334testnovo@0db7i000000gpim.bdgldev.force.com';//userName (uEmail);//'akram0111testnovo@0db7i000000gpim.bdgldev.force.com';//userName (uEmail);
        System.debug('***userName'+userName);
        //String startUrl = 'https://novonordiskhealthcloud--bdgldev.sandbox.my.site.com/NovoV1/mobilehomepage';//'https://novonordiskhealthcloud--bdgldev.sandbox.my.site.com/NovoV1/mobilehomepage';//System.currentPageReference().getParameters().get('startURL');;
        //String startUrl = System.currentPageReference().getParameters().get('startURL');
        //Pagereference pf = Site.login(userName, pw, startUrl);
        PageReference pRef = new PageReference('https://novonordiskhealthcloud--bdgldev.sandbox.my.site.com/NovoV1/mobilehomepage');
        String startUrl = pRef.getUrl();//EncodingUtil.urlEncode( pRef.getUrl(), 'UTF-8');

        try {
        System.debug('*** start login the user ');
        System.PageReference pageRef = Site.login(userName, pw, startUrl);
        System.debug('***pageRef'+pageRef);
                if(pageRef != null) {
                    final Id userId = UserInfo.getUserId();                    
                    System.debug('***userId'+userId);
                    System.debug('***pageRef.getUrl()'+pageRef.getUrl());
                    
                return pageRef.getUrl();
                //return u.Id;
            } 
            else {
            //    throw new CalloutException();
            return '***null';
            }
            
        } catch (Exception e) {
            system.debug('e.getMessagelogin+   '+e.getMessage());
            //throw new AuraHandledException(e.getMessage());
            return '***'+e.getMessage();
        }        

    }


    // create person account
    public static String  idNewAccount(String userEmail, String firstName) {
        try {
            Id personAccountRecordTypeId =  Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('PersonAccount').getRecordTypeId();
            Account newPersonAccount = new Account();
            newPersonAccount.FirstName = firstName;
            newPersonAccount.LastName = 'Smith';
            newPersonAccount.RecordTypeId = personAccountRecordTypeId;
            insert newPersonAccount;  
            return newPersonAccount.Id;
        } catch(DmlException e) {
            System.debug('The following exception has occurred: ' + e.getMessage());
            return e.getMessage();
        }
    }

    // get Progfile Id
    public static String profileId (String profileName){
        try {
            Profile rcdProfile = [SELECT id from Profile where name = :profileName limit 1];
            return rcdProfile.id;
        }catch(DmlException e) {
            System.debug('The following exception has occurred: ' + e.getMessage());
            return e.getMessage();
        }

    }
    // get User by email
    public static String userName (String userEmail){
        try {
            User rcdUser = [SELECT id, username from User where email = :userEmail  order by CreatedDate desc limit 1];
            return rcdUser.username;
        }catch(DmlException e) {
            System.debug('The following exception has occurred: ' + e.getMessage());
            return e.getMessage();
        }

    }


}