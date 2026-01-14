const keys = require('../../config/key');

module.exports = survey => {
    return `
        <html>
            <body>
                <div style="text-align: center;">
                    <h3>We value your feedback!</h3>
                    <p>Please take a moment to answer the following question:</p>
                    <p>${survey.body}<p>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/thanks" style="margin: 0 10px; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">Yes</a>
                        <a href="${keys.redirectDomain}" style="margin: 0 10px; padding: 10px 20px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px;">No</a>
                    </div>
                    <p>Thank you for your time!</p>
                </div>
            </body>
        </html>
    `;  
}