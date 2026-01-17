/**
 * formFields
 *
 * Describes the survey fields used by the form and review components.
 * Each entry contains a human-friendly `label` and a `name` which
 * corresponds to the form value key stored in redux-form.
 *
 * @type {Array<{label: string, name: string}>}
 * @example
 *   formFields[0] // => { label: "Survey Title", name: "surveyTitle" }
 */
const formFields = [
    { label: "Survey Title", name: "surveyTitle" },
    { label: "Subject Line", name: "subjectLine" },
    { label: "Email Body", name: "emailBody" },
    { label: "Recipient List", name: "recipientList" }
]

export default formFields;