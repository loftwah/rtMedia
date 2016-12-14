<?php

/**
* Scenario : To Allow the user to comment on uploaded media.
*/
    use Page\Login as LoginPage;
    use Page\UploadMedia as UploadMediaPage;
    use Page\DashboardSettings as DashboardSettingsPage;
    use Page\Constants as ConstantsPage;

    $commentStr = 'test comment';

    $I = new AcceptanceTester($scenario);
    $I->wantTo('To check if the user is allowed to comment on uploaded media');

    $loginPage = new LoginPage($I);
    $loginPage->loginAsAdmin(ConstantsPage::$userName,ConstantsPage::$password);

    $settings = new DashboardSettingsPage($I);
    $settings->enableSetting($I,ConstantsPage::$strCommentCheckboxLabel,ConstantsPage::$commentCheckbox);

    $uploadmedia = new UploadMediaPage($I);
    $uploadmedia->uploadMediaUsingStartUploadButton(ConstantsPage::$userName);

    $I->reloadPage();
    $I->wait(7);

    $uploadmedia->fisrtThumbnailMedia($I);

    $I->seeElement(UploadMediaPage::$commentTextArea);
    $I->fillfield(UploadMediaPage::$commentTextArea,$commentStr);
    $I->click(UploadMediaPage::$commentSubmitButton);
    $I->wait(5);
    $I->see($commentStr);

    $I->reloadPage();
    $I->wait(5);

?>
