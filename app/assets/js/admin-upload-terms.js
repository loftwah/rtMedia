/**
 * Created by Jignesh Nakrani on 18/8/15,
 * Updated By Yahil Madakiya on 26/9/16,
 * Moved to rtMedia core by Malav Vasita on 30/05/2018.
 */

/**
 * Add Validation For Extra New Field
 * Remove Functionality And Create Function For Decrease Code. :)
 * By: Yahil and Malav
 */
jQuery( document ).ready( function ( $ ) {
    var general_enable_upload_terms               = $( 'input[name^="rtmedia-options[general_enable_upload_terms]"]' );
    var activity_enable_upload_terms              = $( 'input[name^="rtmedia-options[activity_enable_upload_terms]"]' );
    var general_upload_terms_page_link            = $( 'input[name^="rtmedia-options[general_upload_terms_page_link]"]' );
    var general_upload_terms_message              = $( 'input[name^="rtmedia-options[general_upload_terms_message]"]' );
    var general_upload_terms_error_message        = $( 'input[name^="rtmedia-options[general_upload_terms_error_message]"]' );
    var general_upload_terms_show_pricacy_message = $( 'input[name^="rtmedia-options[general_upload_terms_show_pricacy_message]"]' );
    var general_upload_terms_privacy_message      = $( 'textarea[name^="rtmedia-options[general_upload_terms_privacy_message]"]' );

    rtp_terms_option_toggle();
    $( 'input[name^="rtmedia-options[general_enable_upload_terms]"], input[name^="rtmedia-options[activity_enable_upload_terms]"], input[name^="rtmedia-options[general_upload_terms_show_pricacy_message]"]' ).change( function(){
        rtp_terms_option_toggle();
    } );
    $( '#bp-media-settings-boxes' ).on( 'submit', '#bp_media_settings_form, .rtmedia-settings-submit', function (e) {
        var return_code = true;

        if (return_code && general_enable_upload_terms.length > 0 && 'undefined' !== typeof general_enable_upload_terms ||
            return_code && activity_enable_upload_terms.length > 0 && typeof 'undefined' !== activity_enable_upload_terms ) {
            var error_msg = "";
            if ( general_enable_upload_terms.prop( 'checked' ) || activity_enable_upload_terms.prop( 'checked' ) ) {
                $( '.error_msg' ).remove();
                $( '.rtm-form-text' ).css( 'border-color', '#ddd' );
                if ( !/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test( general_upload_terms_page_link.val() ) ) {
                    error_msg += rtm_upload_terms_error_msgs.valid_url;
                    if( 0 < general_enable_upload_terms.parents( '.rtm-content' ).attr( 'id' ).length ) {
                        // navigate the admin to this location, so he can know about this error.
                        $( '#tab-' + general_enable_upload_terms.parents( '.rtm-content' ).attr( 'id' ) ).click();
                    }

                    return rtp_show_error_message ( general_upload_terms_page_link, error_msg );
                }

                /* Check "Terms of Service Message" Emply Or Not */
                if ( '' === general_upload_terms_message.val().trim() ) {
                    error_msg += rtm_upload_terms_error_msgs.terms_msg;
                    if( 0 < general_upload_terms_message.parents( '.rtm-content' ).attr( 'id' ).length ) {
                        // navigate the admin to this location, so he can know about this error.
                        $( '#tab-' + general_upload_terms_message.parents( '.rtm-content' ).attr( 'id' ) ).click();
                    }

                    return rtp_show_error_message ( general_upload_terms_message, error_msg );
                }

                /* Check "Error Message" Emply Or Not */
                if (  '' === general_upload_terms_error_message.val().trim() ) {
                    error_msg += rtm_upload_terms_error_msgs.error_msg;
                    if( 0 < general_upload_terms_error_message.parents( '.rtm-content' ).attr( 'id' ).length ) {
                        // navigate the admin to this location, so he can know about this error.
                        $( '#tab-' + general_upload_terms_error_message.parents( '.rtm-content' ).attr( 'id' ) ).click();
                    }

                    return rtp_show_error_message ( general_upload_terms_error_message, error_msg );
                }
            }
        }
        if ( return_code && general_upload_terms_show_pricacy_message.length > 0 && 'undefined' !== typeof general_upload_terms_show_pricacy_message ) {
            var error_msg = "";
            if ( general_upload_terms_show_pricacy_message.prop( 'checked' ) ) {
                $( '.error_msg' ).remove();

                /* Check "Terms of Service Message" Emply Or Not */
                if ( '' === general_upload_terms_privacy_message.val().trim() ) {
                    error_msg += rtm_upload_terms_error_msgs.privacy_msg;
                    if( 0 < general_upload_terms_privacy_message.parents( '.rtm-content' ).attr( 'id' ).length ) {
                        // navigate the admin to this location, so he can know about this error.
                        $( '#tab-' + general_upload_terms_privacy_message.parents( '.rtm-content' ).attr( 'id' ) ).click();
                    }

                    return rtp_show_error_message ( general_upload_terms_privacy_message, error_msg );
                }
            }
        }
    } );

    /**
	 * This appends the error message to the received selector, showing that the validation has failed.
	 *
	 * @param selector
	 * @param error_msg
	 * @returns {boolean}
	 */
    function rtp_show_error_message( selector, error_msg ) {
        var elm_selector = $( selector );
        elm_selector.focus();
        elm_selector.css( 'border-color', 'red' );
        var elm_selector_parent = elm_selector.parent();
        if ( elm_selector_parent.length > 0 && 'error_msg' !== elm_selector_parent.attr( 'class' ) ) {
            var invalid_error_msg = $( "<span />" ).attr( 'style', 'display:block' ).addClass( 'error_msg' ).html( error_msg );
            elm_selector.after( invalid_error_msg );
        }
        return_code = false;

        return false;
    }

    /**
     * Show/Hide InputBox
     * If Terms of Service Off For "Upload Screen" And "Activity Screen" Then Hide InputBox
     * By: Yahil And Malav
     */
    function rtp_terms_option_toggle() {
         if ( general_enable_upload_terms.prop( 'checked' ) || activity_enable_upload_terms.prop( 'checked' ) ) {
             general_upload_terms_page_link.closest( '.form-table' ).slideDown();
             general_upload_terms_message.closest( '.form-table' ).slideDown();
             general_upload_terms_error_message.closest( '.form-table' ).slideDown();
         } else {
             general_upload_terms_page_link.closest( '.form-table' ).slideUp();
             general_upload_terms_message.closest( '.form-table' ).slideUp();
             general_upload_terms_error_message.closest( '.form-table' ).slideUp();
         }

         // Show privacy message
         if( general_upload_terms_show_pricacy_message.prop( 'checked' ) ) {
            general_upload_terms_privacy_message.closest( '.form-table' ).slideDown();
         } else {
            general_upload_terms_privacy_message.closest( '.form-table' ).slideUp();
         }
    }
});
