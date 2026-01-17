/**
 * Validate a comma-separated list of email addresses.
 *
 * Splits the provided string on commas, trims whitespace from each entry,
 * then tests each email against a regular expression. If any invalid
 * addresses are found, returns a human-readable error string listing
 * them. Otherwise returns `undefined`.
 *
 * @param {string} emailList - Comma-separated emails (e.g. "a@x.com, b@y.com").
 * @returns {string|undefined} Error message listing invalid emails, or
 *   `undefined` when all emails are valid or the list is empty.
 *
 * Example:
 *   validateEmail('good@example.com, bad-email')
 *   // => 'These emails are invalid: bad-email'
 */
export default function validateEmail(emailList) {
    // Defensive: ensure we always operate on a string
    const invalidEmails = (emailList || '')
        .split(',')
        .map(email => email.trim())
        .filter(email => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return !re.test(email);
        });
    
    if (invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails.join(', ')}`;
    }
    
    return;
}