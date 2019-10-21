import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import SentHistory from 'components/marketing/SentHistory';
import PendingMessages from 'components/marketing/PendingMessages';
import BuySms from 'components/marketing/BuySms';
import {showMessanger} from 'api/api-utils';
import {numberLocale} from 'components/utils/validations';

import actions from '../../redux/actions';
import BSModal from 'components/modals/BSModal';
import * as qs from 'query-string';

import {
  Row,
  Col,
  Grid,
  Alert,
  Panel,
  PanelBody,
  PanelHeader,
  PanelContainer,
  Breadcrumb,
  Table,
  Well,
  Button,
  ButtonGroup,
  Checkbox,
  PanelTabContainer,
  Nav,
  NavItem,
  Tab,
  Icon,
  Modal
} from '@sketchpixy/rubix';


@connect((state) => state)
export default class Marketing extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      selected: {},
      pendingSelected: {}
    };
  }

  onBreadcrumbClick(e) {
    let path = e.nativeEvent.target.title
    this.props.router.push(`/${path}`);
  }

  addSMS() {
    this.props.router.push('/marketing/sendMessage');
  }

  loadIntial () {
    this.props.dispatch(actions.getSentSms());
    this.props.dispatch(actions.getPendingSms());
    this.props.dispatch(actions.getCredits());
    this.props.dispatch(actions.getCreditsRemaining());
  }

  componentWillMount() {

    const parsed = qs.parse(location.search);
    ///console.log('parsed', parsed);
    if (parsed.pstatus && parsed.pstatus === 'success'){
        showMessanger('success', 'Your payment is successful')
    } else if(parsed.pstatus && parsed.pstatus === 'error'){
        showMessanger('error', 'Your payment does not succeed')
    }

    const data = {
      start: 0,
      limit: 10
    };

    ::this.loadIntial();
  }

  onView (id) {
    
    const selected = this.props.marketing.sentSMS.values.find(message => message.id == id);

    if(selected) {
      this.setState({
        selected
      })

      this.showModal();
    } else {
      return showMessanger('error',"Message doesn't exist");
    }
  }

  showModal () {
    this.setState({
      showModal: true
    })
  }

  closeModal () {
    this.setState({
      showModal: false
    })
  }

  openDeleteModal (id) {
    const pending = this.props.marketing.pendingSMS && this.props.marketing.pendingSMS.values || [];
    const pendingSelected = pending.find(message => message.id == id);

    if(pendingSelected) {
      this.setState({
        pendingSelected
      })

      this.deleteModal.open();
    } else {
      return showMessanger('error',"Message doesn't exist");
    }
  }

  onDeleteJob () {
    this.props.dispatch(actions.deleteSMS(this.state.pendingSelected.id))
      .then(res => {
        showMessanger('success', 'Successfully deleted sms')
        this.props.dispatch(actions.getPendingSms());
        this.deleteModal.close();
      })
  }

  render() {

    let smsCredits = this.props.marketing.credits.values && this.props.marketing.credits.values.filter(credit => credit.creditType == 'SMS');
    let smsCount = this.props.marketing.creditsRemaining && this.props.marketing.creditsRemaining.smsCredits || 0;

    const pending = this.props.marketing.pendingSMS && this.props.marketing.pendingSMS.values || [];
    const sent = this.props.marketing.sentSMS && this.props.marketing.sentSMS.values || [];

    return   (
      <div>
        <Row>
          <Col xs={12}>
            <Breadcrumb>
              <Breadcrumb.Item title="" onClick={::this.onBreadcrumbClick}>
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item active>
                Marketing
              </Breadcrumb.Item>  
            </Breadcrumb>
          </Col>
        </Row>
        
        <Row>
          <Col xs={12} className="marketing">
            <PanelTabContainer controls={false} id='panel-body-header-tab-footer' defaultActiveKey="sentHistory">
            <Panel>
              <PanelHeader className='bg-darkgrayishblue fg-white'>
              <Grid>
                <Row>
                <Col xs={6}>
                  <h4>SMS Marketing</h4>
                </Col>
                <Col xs={6} className="text-right">
                  <p className="title">SMS Remaining: {numberLocale(smsCount)}</p>
                  <Button 
                    bsStyle="success" 
                    className="pull-right" 
                    style={{marginTop: '10px'}} 
                    inverse
                    onClick={::this.addSMS}
                  >Create SMS</Button>
                </Col>
                </Row>
              </Grid>
              <div className="clearfix"></div>
              </PanelHeader>
              <PanelBody>
              <Grid>
                <Row>
                <Col sm={3}>
                <Nav bsStyle="pills" stacked className='tab-success side-bar'>
                <NavItem eventKey="sentHistory">
                  <Icon bundle='fontello' glyph='clock-7'/> Sent History
                </NavItem>
                <NavItem eventKey="pendingMessages">
                  <Icon bundle='fontello' glyph='chat-2'/> Pending Messages
                </NavItem>
                <NavItem eventKey="buySms">
                  <Icon bundle='outlined' glyph='shopping-cart'/> Buy SMS
                </NavItem> 
              </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content animation={false}>
                  <Tab.Pane eventKey="sentHistory">
                      <SentHistory
                        onView={::this.onView}
                        messages={sent}
                      />
                  </Tab.Pane>
                  <Tab.Pane eventKey="pendingMessages">
                      <PendingMessages
                        onEdit={(id) => this.props.router.push(`/marketing/edit/${id}`)}
                        onDelete={::this.openDeleteModal}
                        messages={pending}
                      />
                  </Tab.Pane>
                  <Tab.Pane eventKey="buySms">
                      <BuySms smsCredits={smsCredits} onCreditUpdate={::this.loadIntial} />
                  </Tab.Pane>
                  </Tab.Content>
                </Col>
                </Row>
              </Grid>
              </PanelBody>
            </Panel>
            </PanelTabContainer>
        </Col>
        
        <Modal show={this.state.showModal} onHide={::this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Message</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>{this.state.selected.message}</p>
          </Modal.Body>
        </Modal>
        <BSModal
          ref={(c)=> this.deleteModal = c}
          title="Delete Pending Job"
          size="md"
          confirmText='Delete'
          cancelText='Cancel'
          onConfirm={::this.onDeleteJob}
          >
          <p>Are you sure you want to delete this marketing job?</p>
        </BSModal>

      </Row>
    </div>
    );
  }
}