To implement your validation requirements for the OEE Entry form:

1. Ensure autocomplete="off" is set for the form and all input fields.
2. Validate availability, performance, and oee fields to be between 0-100.
3. Validate giveaway to be between 25.100 and 25.115 (inclusive).
4. For remarks, ensure no remark row is empty or null; if any are, prevent submit.