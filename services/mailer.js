const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/key');

class Mailer extends helper.Mail {
    // Initialize Mailer with survey details and content
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
    // Format recipient email addresses
    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    } 
    
    addClickTracking() {
        // Enable click tracking for the email
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        // Set click tracking settings
        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        // Add each recipient to the email
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        // Send the email using SendGrid API
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