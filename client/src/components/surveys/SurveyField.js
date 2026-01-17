import React from "react";

/**
 * SurveyField
 *
 * A small presentational wrapper used by `redux-form`'s `<Field />`.
 * It renders a label, an input element linked to the field's `input`
 * props, and a validation message when the field has been touched.
 *
 * Props (provided by redux-form):
 * @param {Object} input - input helpers/props from redux-form (onChange, value, etc.)
 * @param {string} label - human-friendly label for the field
 * @param {Object} meta - redux-form meta object
 * @param {string|undefined} meta.error - validation error message, if any
 * @param {boolean} meta.touched - whether the field has been visited/touched
 *
 * Example usage:
 * <Field name="title" component={SurveyField} label="Survey Title" />
 */
const SurveyField = ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      <div className="red-text" style={{ marginBottom: "5px" }}>
        {touched && error}
      </div>
    </div>
  )
};

export default SurveyField;