import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import { Button } from 'reactstrap'
import { renderField } from 'utils'
import { Form } from 'components'

const TicketForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="summary" component={renderField} type="text" label="Summary" />
    <Field name="description" component={renderField} type="textarea" label="Description" />
    <Button>Submit</Button>
  </Form>
)

export default reduxForm({
  form: 'ticket',
})(TicketForm)