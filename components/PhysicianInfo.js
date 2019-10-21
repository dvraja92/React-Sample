import React from 'react';
import ReactDOM from 'react-dom';
import {allStates, statesLookup} from '../utils/list';
import { checkEmail, checkEmpty } from '../utils/validations';
import {showMessanger} from 'api/api-utils';
import {
  Row,
  Col,
  Grid,
  Panel,
  PanelBody,
  PanelContainer,
  PanelHeader,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Image,
  ListGroup,
  FormControl,
  ListGroupItem
} from '@sketchpixy/rubix';
import ViewableInput from '../viewableinput/ViewableInput'
import ViewableImage from '../viewableimage/ViewableImage'
import Vendor from 'models'
import InputMask from 'react-input-mask';
import ConfirmationModal from 'components/modals/ConfirmationModal'
import Permissions from 'components/common/Permissions';

export default class PhysicianInfo extends React.Component {
  static defaultProps = {
    physician: {}
  }
  constructor(props){
    super(props);
    this.state ={edit_mode:false, physician:this.props.physician}
    self = this;
  }
  componentDidMount() {
    checkEmail();
    checkEmpty();
    $("#physicianInfo").validate({
      rules: {
        email: {
          email: true,
          validEmail: true
        },
        firstName: {
          validEmpty: true,
          required: true
        },
        lastName: {
          validEmpty: true,
          required: true
        },
        license: {
          validEmpty: true,
          required: true
        },
        active: {
          required: true
        }
      },
      messages: {
        active: 'Please select a status'
      }
    });
  }
  componentWillReceiveProps(nextProps){
    if(this.state.physician !== nextProps.physician){
      this.setState({physician:nextProps.physician})
    }
  }

  EnableEdit(){
    this.setState({edit_mode:true});
  }
  DisableEdit(){
   this.setState({edit_mode:false});
   this.props.onCancel();
  }
  onChange(key,e){
    let physician = this.props.physician;

    physician = {
      ...physician,
      [key]: e.target.value
    }
    this.setState({physician})

    this.props.onChange(this.state.physician)
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.physician.id != this.state.physician.id){
      $('#physicianInfo').valid()
    }
  }

  onChangeChild(key,ckey,e){
    let physician = this.props.physician;
      physician = {
      ...physician,
      [key]: {
        ...physician[key],
        [ckey]: e.target.value
      }
    }
    this.setState({physician})
    this.props.onChange(this.state.physician)
  }

  onSave(){
      if($("#physicianInfo").valid()){
        let physician = this.state.physician;

        if(physician.active === "") {
          return showMessanger('error', 'Please choose a Status');
        }

        this.props.onSave(physician);
        this.setState({ edit_mode:false });
      }
  }
  onDeletePressed() {
    this.confirmDeleteModal.open();
  }
  onConfirmDelete() {
    if (this.props.onDeletePhysician) {
      this.props.onDeletePhysician(this.state.physician)
    }
  }
    render() {
      const physician = this.state.physician
      const edit_mode = this.state.edit_mode;
      return (
          <PanelContainer controls={false}>
          <form id="physicianInfo">
            <Panel>
              <PanelHeader className='bg-darkgrayishblue'>
              <Grid>
                <Row>
                <Col xs={12} className='fg-white'>
                  <h4 className="pull-left">{physician.firstName} {physician.lastName}</h4>

                  <div className="pull-right" style={{marginTop:6}}>
                    {this.state.edit_mode ? <ButtonGroup>
                      <Button bsStyle="success" inverse onClick={::this.onSave}>Save</Button>
                      <Button bsStyle="danger"inverse onClick={::this.DisableEdit}>Cancel</Button>
                    </ButtonGroup>
                    :
                    <Permissions access_condition="WebPhysiciansManage">
                      <ButtonToolbar>
                        <Button bsStyle="success" inverse onClick={::this.EnableEdit}>Edit Physician</Button>
                        <Button bsStyle="danger" onClick={::this.onDeletePressed}>Delete</Button>
                      </ButtonToolbar>
                    </Permissions>
                  }

                  <ConfirmationModal ref={(c) => this.confirmDeleteModal = c} title="Warning" body={`Are you sure you want to delete '${physician.firstName} ${physician.lastName}'?`} onConfirm={::this.onConfirmDelete}/>

                  </div>
                </Col>
                </Row>
              </Grid>
              </PanelHeader>
              <PanelBody>

              <Grid>

                <Row>
                <Col xs={12}>
                  <div>
                    <ListGroup>

                    <ListGroup>
                      <ListGroupItem>
                        <Row>
                          <Col sm={3}>First Name</Col>
                          <Col sm={9}>
                            <ViewableInput name="firstName" value={physician.firstName} placeholder={'First Name'} editmode={edit_mode} type={'text'} onChange={this.onChange.bind(this,'firstName')}/>
                          </Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Row>
                          <Col sm={3}>Last Name</Col>
                          <Col sm={9}>
                            <ViewableInput name="lastName" value={physician.lastName} placeholder={'Last Name'} editmode={edit_mode} type={'text'} onChange={this.onChange.bind(this,'lastName')}/>
                          </Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Row>
                          <Col sm={3}>License Number</Col>
                          <Col sm={9}>
                            <ViewableInput name="license" value={physician.license} placeholder={'License Number'} editmode={edit_mode} type={'text'} onChange={this.onChange.bind(this,'license')}/>
                          </Col>
                        </Row>
                      </ListGroupItem>

                    <ListGroupItem>
                      <Row>
                        <Col sm={3}>Status</Col>
                        <Col sm={9}>
                          {this.state.edit_mode ?
                          <FormControl
                            name="active"
                            componentClass="select"
                            placeholder="select"
                            defaultValue={physician.active}
                            onChange={this.onChange.bind(this,'active')}>
                            <option value="">Select</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                          </FormControl>
                        : <span>{physician.active ? "Active" : "Inactive"}</span>}
                        </Col>
                      </Row>
                    </ListGroupItem>
                    </ListGroup>



                      <ListGroupItem>
                        <Row>
                          <Col sm={3}>Phone</Col>
                          <Col sm={9}>
                            {!edit_mode ? physician.phoneNumber || '' : 
                              <InputMask mask="(999) 999-9999" maskChar=" " className="form-control" type="tel" value={physician.phoneNumber} placeholder={'Phone Number'} type={'tel'} onChange={this.onChange.bind(this,'phoneNumber')} />
                            }
                            {/* <ViewableInput value={physician.phoneNumber} placeholder={'Phone Number'} editmode={edit_mode} type={'tel'} onChange={this.onChange.bind(this,'phoneNumber')}/> */}
                          </Col>
                        </Row>
                      </ListGroupItem>

                      <ListGroupItem>
                        <Row>
                          <Col sm={3}>Email</Col>
                          <Col sm={9}>
                            <ViewableInput value={physician.email} placeholder={'Email'} editmode={edit_mode} type={'text'} onChange={this.onChange.bind(this,'email')} name="email" />
                          </Col>
                        </Row>
                      </ListGroupItem>

                      <ListGroupItem>
                        <Row>
                          <Col sm={3}>Website</Col>
                          <Col sm={9}>
                            <ViewableInput value={physician.website} placeholder={'website'} editmode={edit_mode} type={'text'} onChange={this.onChange.bind(this,'website')}/>
                          </Col>
                        </Row>
                      </ListGroupItem>
                      </ListGroup>


                        <ListGroup>
                      <ListGroupItem>
                        <Row>
                          <Col sm={3}>Address</Col>
                          <Col sm={9}>
                            <ViewableInput value={physician.address ? physician.address.address : null} placeholder={'Address'} editmode={this.state.edit_mode} type={'text'} onChange={this.onChangeChild.bind(this,'address', 'address')}/>
                          </Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Row>
                          <Col sm={3}>City</Col>
                          <Col sm={9}>
                            <ViewableInput value={physician.address ? physician.address.city : null} placeholder={'City'} editmode={this.state.edit_mode} type={'text'} onChange={this.onChangeChild.bind(this,'address', 'city')}/>
                          </Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Row>
                          <Col sm={3}>Zip Code</Col>
                          <Col sm={9}>
                            <ViewableInput value={physician.address ? physician.address.zipCode : null} placeholder={'Zip Code'} editmode={this.state.edit_mode} type={'text'} onChange={this.onChangeChild.bind(this,'address','zipCode')}/>
                          </Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Row>
                          <Col sm={3}>State</Col>
                          <Col sm={9}>
                            {this.state.edit_mode ?
                            <FormControl componentClass="select" value={physician.address ? physician.address.state : null} placeholder={'State'} type={'text'} onChange={this.onChangeChild.bind(this,'address','state')}>
                                  <option value="">Select State</option>
                                {allStates.map((state, index) =>
                                   (<option key={`state-${state}-${index}`} value={state}>{statesLookup[state]}</option>))}

                            </FormControl>
                            :<span>{physician.address ? statesLookup[physician.address.state] : null}</span>}
                          </Col>
                        </Row>
                      </ListGroupItem>
                      </ListGroup>
                    </div>
                </Col>
                </Row>
              </Grid>
              </PanelBody>
            </Panel>
            </form>
          </PanelContainer>
            );
    }

}
