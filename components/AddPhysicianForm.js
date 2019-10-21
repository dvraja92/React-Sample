import React from 'react';
import ReactDOM from 'react-dom';
import {
  Row,
  Col,
  Nav,
  Grid,
  Form,
  Panel,
  Button,
  ButtonToolbar,
  PanelBody,
  FormGroup,
  PanelHeader,
  FormControl,
  ControlLabel,
  PanelContainer,
} from '@sketchpixy/rubix';
import {allStates, statesLookup} from 'components/utils/list'
import InputMask from 'react-input-mask'


export default class AddPhysicianForm extends React.Component {
  render() {
    return (
          <Form id='newPhysicianForm' className="generalForm">
            <div>
              <Grid>
                <Row>
                  <h4>Physician Info</h4>
                  <Col sm={6} xs={12}>
                    <FormGroup controlId='firstName'>
                      <ControlLabel>First Name *</ControlLabel>
                      <FormControl type='text' name="firstName" className='required'/>
                    </FormGroup>
                  </Col>
                  <Col sm={6} xs={12}>
                    <FormGroup controlId='lastName'>
                      <ControlLabel>Last Name *</ControlLabel>
                      <FormControl type='text' name="lastName" className='required' />
                    </FormGroup>
                  </Col>

                  <Col sm={6} xs={12}>
                    <FormGroup controlId='license'>
                      <ControlLabel>License *</ControlLabel>
                      <FormControl type='text' name="license" className="required"  />
                    </FormGroup>
                  </Col>
                  <Col sm={6} xs={12}>
                    <div className="active">
                    <FormGroup controlId='active'>
                      <ControlLabel>Status</ControlLabel>
                      <FormControl name="active" defaultValue={true} componentClass="select" onChange={this.props.onMediclChange}>
                        <option value='true'>Active</option>
                        <option value='false'>Inactive</option>
                      </FormControl>
                    </FormGroup>
                    </div>
                  </Col>

                  <Col sm={6} xs={12}>
                    <FormGroup controlId='phone'>
                      <ControlLabel>Phone</ControlLabel>
                      <InputMask mask="(999) 999-9999" maskChar=" " className="form-control" placeholder={'Phone Number'} type={'tel'} name="phoneNumber" />
                      {/* <FormControl type='text' name="phoneNumber"/> */}
                    </FormGroup>
                  </Col>
                  <Col sm={6} xs={12}>
                    <FormGroup controlId='email'>
                      <ControlLabel>Email Address</ControlLabel>
                      <FormControl type='email' name="email"/>
                    </FormGroup>
                  </Col>
                  <Col sm={6} xs={12}>
                    <FormGroup controlId='website'>
                      <ControlLabel>Website</ControlLabel>
                      <FormControl type='text' name="website"/>
                    </FormGroup>
                  </Col>
                </Row>



                <Row>
                  <h4>Address</h4>
                  <Col sm={6} xs={12}>
                    <FormGroup controlId='physicianAddress'>
                      <ControlLabel>Address</ControlLabel>
                      <FormControl type='text' name="physicianAddress"/>
                    </FormGroup>
                  </Col>
                  <Col sm={6} xs={12}>
                    <FormGroup controlId='physicianCity'>
                      <ControlLabel>City </ControlLabel>
                      <FormControl type='text' name="physicianCity"/>
                    </FormGroup>
                  </Col>
                  <Col sm={6} xs={12}>
                    <FormGroup controlId='physicianZipCode'>
                      <ControlLabel>Postal Code</ControlLabel>
                      <FormControl type='text' name="physicianZipCode"/>
                    </FormGroup>
                  </Col>
                  <Col sm={6} xs={12}>
                    <FormGroup controlId='physicianState'>
                      <ControlLabel>State</ControlLabel>
                      <FormControl componentClass="select"  name="physicianState">
                        <option value="">Select State</option>
                      {allStates.map((state, index) =>
                         (<option key={`state-${state}-${index}`} value={state}>{statesLookup[state]}</option>))}

                    </FormControl>
                    </FormGroup>
                  </Col>
                </Row>
              </Grid>
            </div>
        </Form>
        );
    }

}
