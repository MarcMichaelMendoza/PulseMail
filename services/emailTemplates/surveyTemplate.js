/**
 * @fileoverview HTML email template for survey invitations.
 * @module services/emailTemplates/surveyTemplate
 */

const keys = require('../../config/key');

module.exports = survey => {
    return `
        <html>
            <body style="margin:0;padding:0;background-color:#0d1117;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans',Helvetica,Arial,sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d1117;padding:40px 0;">
                    <tr>
                        <td align="center">
                            <table width="560" cellpadding="0" cellspacing="0" style="background-color:#161b22;border:1px solid #30363d;border-radius:8px;overflow:hidden;">
                                <tr>
                                    <td style="padding:24px 32px;border-bottom:1px solid #30363d;background-color:#010409;">
                                        <span style="font-size:18px;font-weight:700;color:#e6edf3;">PulseMail</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:32px;">
                                        <h2 style="margin:0 0 8px;font-size:20px;font-weight:600;color:#e6edf3;">We value your feedback!</h2>
                                        <p style="margin:0 0 24px;font-size:14px;color:#8b949e;line-height:1.5;">Please take a moment to answer the following question:</p>
                                        <div style="padding:16px;background-color:#0d1117;border:1px solid #30363d;border-radius:6px;margin-bottom:24px;">
                                            <p style="margin:0;font-size:16px;color:#e6edf3;line-height:1.5;">${survey.body}</p>
                                        </div>
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="50%" style="padding-right:6px;">
                                                    <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes" style="display:block;padding:12px;background-color:#238636;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;text-align:center;">Yes</a>
                                                </td>
                                                <td width="50%" style="padding-left:6px;">
                                                    <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no" style="display:block;padding:12px;background-color:#21262d;color:#e6edf3;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;text-align:center;border:1px solid #30363d;">No</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:16px 32px;border-top:1px solid #30363d;">
                                        <p style="margin:0;font-size:12px;color:#6e7681;text-align:center;">Sent via PulseMail &mdash; Email survey platform</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    `;
}