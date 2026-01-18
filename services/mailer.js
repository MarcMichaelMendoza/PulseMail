const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/key');

/**
 * Mailer class wraps SendGrid helper.Mail to build and send survey emails.
 *
 * Usage:
 *   const mailer = new Mailer(survey, htmlContent);
 *   await mailer.send();
 *
 * @extends helper.Mail
 */
class Mailer extends helper.Mail {
    /**
     * Create a Mailer instance.
     *
     * @param {{recipients: Array<{email:string}>, subject: string}} survey - Survey metadata
     * @param {string} content - HTML content for the email body
     */
    constructor({recipients, subject}, content) {
        super();

        // Initialize SendGrid client with API key
        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('mmarcmichael@gmail.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        // Add content and tracking to the email
        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    /**
     * @private
     * @param {import('../types').Recipient[]} recipients
     * @returns {helper.Email[]}
     */
    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }
    
    /** @private */
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    /** @private */
    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    /**
     * Send email via SendGrid API.
     * 
     * @returns {Promise<object>} SendGrid response
     * @throws {Error} SendGrid API error
     */
    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        })

        const response = await this.sgApi.API(request);
        return response;
    }
}   

module.exports = Mailer;