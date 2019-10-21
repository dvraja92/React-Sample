import React from 'react';
import ReactDOM from 'react-dom'
import AsyncComponent from './common/AsyncComponent'
import classNames from 'classnames';
import { IndexRoute, Route, Router, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

import { withRouter } from 'react-router';
import authService from "redux/services/AuthService"

/* Common Components */

import Sidebar from './common/sidebar';
import IdleTimer from './common/IdleTimer';
import Header from './common/header';
import Footer from './common/footer';

/* Pages */

//import Dashboard from './views/dashboard/Dashboard';

const Dashboard = () => <AsyncComponent load={import('./views/dashboard/Dashboard')} />

//import HeadsetDashboard from './views/headset/HeadsetDashboard';
const HeadsetDashboard = () => <AsyncComponent load={import('./views/headset/HeadsetDashboard')} />

/*POS*/
//const POSContainer = () => <AsyncComponent load={import('./views/pos/PosContainer')} />
const ClockInPOS = () => <AsyncComponent load={import('./views/pos/ClockInPOS')} />
const TerminalSetup = () => <AsyncComponent load={import('./views/pos/TerminalSetup')} />
const ShopSetup = () => <AsyncComponent load={import('./views/pos/ShopSetup')} />
const POS = () => <AsyncComponent load={import('./views/pos/Pos')} />
const ProductList = () => <AsyncComponent load={import('./views/pos/ProductList')} />
const Checkout = () => <AsyncComponent load={import('./views/pos/Checkout')} />
const Payment = () => <AsyncComponent load={import('./views/pos/Payment')} />
const Profiles = () => <AsyncComponent load={import('./views/pos/Hypur/Profiles')} />
const Pac = () => <AsyncComponent load={import('./views/pos/Hypur/Pac')} />
const Messaging = () => <AsyncComponent load={import('./views/pos/Messaging')} />
const Fulfillment = () => <AsyncComponent load={import('./views/pos/Fulfillment')} />
import POSContainer from './views/pos/PosContainer';
//import ClockInPOS from './views/pos/ClockInPOS';
//import TerminalSetup from './views/pos/TerminalSetup';
//import ShopSetup from './views/pos/ShopSetup';
//import POS from './views/pos/Pos';
//import ProductList from './views/pos/ProductList';
//import Checkout from './views/pos/Checkout';
/*import Payment from './views/pos/Payment';
import Profiles from './views/pos/Hypur/Profiles';
import Pac from './views/pos/Hypur/Pac';
import Messaging from './views/pos/Messaging';
import Fulfillment from './views/pos/Fulfillment';
*/

//Promotions
const Promotions = () => <AsyncComponent load={import('./views/promotions/Promotions')} />
const PromotionDetail = () => <AsyncComponent load={import('./views/promotions/PromotionDetail')} />
//import Promotions from './views/promotions/Promotions'
//import PromotionDetail from './views/promotions/PromotionDetail'

//Loyalty
const Loyalties = () => <AsyncComponent load={import('./views/loyalty/Loyalties')} />
const Reward = () => <AsyncComponent load={import('./views/loyalty/Reward')} />
//import Loyalties from './views/loyalty/Loyalties';
//import Reward from './views/loyalty/Reward';

const Delivery = () => <AsyncComponent load={import('./views/delivery/Delivery')} />
const NewDelivery = () => <AsyncComponent load={import('./views/delivery/NewDelivery')} />
const DeliverySettings = () => <AsyncComponent load={import('./views/delivery/DeliverySettings')} />
const Marketing = () => <AsyncComponent load={import('./views/marketing/Marketing')} />
const SendMessage = () => <AsyncComponent load={import('./views/marketing/SendMessage')} />
const EditSms = () => <AsyncComponent load={import('./views/marketing/EditSms')} />
//import Delivery from './views/delivery/Delivery';
//import NewDelivery from './views/delivery/NewDelivery';
//import DeliverySettings from './views/delivery/DeliverySettings';
//import Marketing from './views/marketing/Marketing';
//import SendMessage from './views/marketing/SendMessage';
//import EditSms from './views/marketing/EditSms';

/*cash drawer*/
const StartCashDrawer = () => <AsyncComponent load={import('./views/cash_drawer/StartCashDrawer')} />
const CashDrawer = () => <AsyncComponent load={import('./views/cash_drawer/CashDrawer')} />
//import StartCashDrawer from './views/cash_drawer/StartCashDrawer'
//import CashDrawer from './views/cash_drawer/CashDrawer'

//Inventory
const AllProducts = () => <AsyncComponent load={import('./views/inventory/AllProducts')} />
const ProductDetail = () => <AsyncComponent load={import('./views/inventory/ProductDetail')} />
const AddProduct = () => <AsyncComponent load={import('./views/inventory/AddProduct')} />
const InventoryTransferContainer = () => <AsyncComponent load={import('./views/inventory/InventoryTransferContainer')} />
const InventoryTransfer = () => <AsyncComponent load={import('./views/inventory/InventoryTransfer')} />
const ManageCategories = () => <AsyncComponent load={import('./views/inventory/ManageCategories')} />
const PrintLabels = () => <AsyncComponent load={import('./views/inventory/PrintLabels')} />
const ImportExport = () => <AsyncComponent load={import('./views/inventory/ImportExport')} />
const InventoryReconcilitaion = () => <AsyncComponent load={import('./views/inventory/InventoryReconciliation')} />
const InventoryReconcilitaionHistoryDetail = () => <AsyncComponent load={import('./views/inventory/InventoryReconcilitaionHistoryDetail')} />
const PurchaseOrder = () => <AsyncComponent load={import('./views/inventory/PurchaseOrder')} />
const CreatePurchaseOrder = () => <AsyncComponent load={import('./views/inventory/CreatePurchaseOrder')} />
const PurchaseOrderDetail = () => <AsyncComponent load={import('./views/inventory/PurchaseOrderDetail')} />
/*import AllProducts from './views/inventory/AllProducts';
import ProductDetail from './views/inventory/ProductDetail';
import AddProduct from './views/inventory/AddProduct';
import InventoryTransfer from './views/inventory/InventoryTransfer';
import ManageCategories from './views/inventory/ManageCategories';
import PrintLabels from './views/inventory/PrintLabels';
import InventoryReconcilitaion from './views/inventory/InventoryReconciliation';
import PurchaseOrder from './views/inventory/PurchaseOrder';
import CreatePurchaseOrder from './views/inventory/CreatePurchaseOrder';
import PurchaseOrderDetail from './views/inventory/PurchaseOrderDetail';*/

const Shipment = () => <AsyncComponent load={import('./views/inventory/po/Shipment')} />
const ShipmentBill = () => <AsyncComponent load={import('./views/inventory/po/ShipmentBill')} />
const ShipmentReceipt = () => <AsyncComponent load={import('./views/inventory/po/ShipmentReceipt')} />
const ArchivedPo = () => <AsyncComponent load={import('./views/inventory/po/ArchivedPo')} />
/*import Shipment from 'views/inventory/po/Shipment';
import ShipmentBill from 'views/inventory/po/ShipmentBill';
import ShipmentReceipt from 'views/inventory/po/ShipmentReceipt';
import ArchivedPo from 'views/inventory/po/ArchivedPo';*/

//member
const AllMembers = () => <AsyncComponent load={import('./views/members/AllMembers')} />
const AddMember = () => <AsyncComponent load={import('./views/members/AddMember')} />
const MemberProfile = () => <AsyncComponent load={import('./views/members/MemberProfile')} />
//import AllMembers from './views/members/AllMembers';
//import AddMember from './views/members/AddMember';
//import MemberProfile from './views/members/MemberProfile';

//Caregivers
const AllCaregivers = () => <AsyncComponent load={import('./views/caregivers/AllCaregivers')} />
const AddCaregivers = () => <AsyncComponent load={import('./views/caregivers/AddCaregivers')} />
const CaregiverDetail = () => <AsyncComponent load={import('./views/caregivers/CaregiverDetail')} />

// Physicians
const AllPhysicians = () => <AsyncComponent load={import('./views/physicians/AllPhysicians')} />
const PhysicianDetail = () => <AsyncComponent load={import('./views/physicians/PhysicianDetail')} />
const AddPhysician = () => <AsyncComponent load={import('./views/physicians/AddPhysician')} />
//import AllPhysicians from './views/physicians/AllPhysicians';
//import PhysicianDetail from './views/physicians/PhysicianDetail';
//import AddPhysician from './views/physicians/AddPhysician';

// Transactions
const AllTransactions = () => <AsyncComponent load={import('./views/transactions/AllTransactions')} />
const TransactionDetail = () => <AsyncComponent load={import('./views/transactions/TransactionDetail')} />
//import AllTransactions from './views/transactions/AllTransactions';
//import TransactionDetail from './views/transactions/TransactionDetail';

//TV Displays
const TVDisplays = () => <AsyncComponent load={import('./views/tvdisplay/TVDisplays')} />
const EditDisplay = () => <AsyncComponent load={import('./views/tvdisplay/EditDisplay')} />
//import TVDisplays from './views/tvdisplay/TVDisplays';
//import EditDisplay from './views/tvdisplay/EditDisplay';

//Brands
const Brands = () => <AsyncComponent load={import('./views/brands/Brands')} />

// Vendors
const AllVendors = () => <AsyncComponent load={import('./views/vendors/AllVendors')} />
const VendorDetail = () => <AsyncComponent load={import('./views/vendors/VendorDetail')} />
const AddVendor = () => <AsyncComponent load={import('./views/vendors/AddVendor')} />
/*import AllVendors from './views/vendors/AllVendors';
import VendorDetail from './views/vendors/VendorDetail';
import AddVendor from './views/vendors/AddVendor';
*/

// Administrative
const AllEmployees = () => <AsyncComponent load={import('./views/employees/AllEmployees')} />
const EmployeeProfile = () => <AsyncComponent load={import('./views/employees/EmployeeProfile')} />
const AddEmployee = () => <AsyncComponent load={import('./views/employees/AddEmployee')} />
const AllInviteEmployees = () => <AsyncComponent load={import('./views/employees/AllInviteEmployees')} />
const AddInviteEmployee = () => <AsyncComponent load={import('./views/employees/AddInviteEmployee')} />
const InviteEmployeeProfile = () => <AsyncComponent load={import('./views/employees/InviteEmployeeProfile')} />
const MyProfile = () => <AsyncComponent load={import('./views/me/MyProfile')} />
/*import AllEmployees from './views/employees/AllEmployees';
import EmployeeProfile from './views/employees/EmployeeProfile';
import AddEmployee from './views/employees/AddEmployee';
import AllInviteEmployees from './views/employees/AllInviteEmployees';
import AddInviteEmployee from './views/employees/AddInviteEmployee';
import InviteEmployeeProfile from './views/employees/InviteEmployeeProfile';
import MyProfile from './views/me/MyProfile';*/

const TimeCards = () => <AsyncComponent load={import('./views/employees/TimeCards')} />
//import TimeCards from './views/employees/TimeCards'

const AllReports = () => <AsyncComponent load={import('./views/reports/AllReports')} />
const ReportsDetail = () => <AsyncComponent load={import('./views/reports/ReportsDetail')} />
const FrequentReports = () => <AsyncComponent load={import('./views/reports/FrequentReports')}/>
const FrequentReportDetail = () => <AsyncComponent load={import('./views/reports/FrequentReportDetail')}/>

//import AllReports from './views/reports/AllReports';
//import ReportsDetail from './views/reports/ReportsDetail';


const Settings = () => <AsyncComponent load={import('./views/settings/Settings')} />
const ShopSetting = () => <AsyncComponent load={import('./views/settings/ShopSetting')} />
const IntegrationSetting = () => <AsyncComponent load={import('./views/settings/IntegrationSetting')} />
const PluginOptions = () => <AsyncComponent load={import('./views/settings/PluginOptions')} />
//import Settings from './views/settings/Settings';
//import ShopSetting from './views/settings/ShopSetting';
//import IntegrationSetting from './views/settings/IntegrationSetting';
//import PluginOptions from './views/settings/PluginOptions'

const CompanySetup = () => <AsyncComponent load={import('./views/setup/CompanySetup')} />
//import CompanySetup from './views/setup/CompanySetup';

const Support = () => <AsyncComponent load={import('./views/support/Support')} />
const supportSuccess = () => <AsyncComponent load={import('./views/support/supportSuccess')} />
//import Support from './views/support/Support';
//import supportSuccess from './views/support/supportSuccess';

// Public
import Error404 from './views/errors/Error404';
import Login from './views/auth/Login';
import AuthContainer from 'components/containers/AuthContainer'
import Terms from 'views/terms/Terms'


const ForgotPassword = () => <AsyncComponent load={import('./views/forgot/ForgotPassword')} />
const UpdatePassword = () => <AsyncComponent load={import('./views/forgot/UpdatePassword')} />
//import ForgotPassword from './views/forgot/ForgotPassword';
//import UpdatePassword from './views/forgot/UpdatePassword';

const InvitationVerification = () => <AsyncComponent load={import('./views/InvitationVerification/InvitationVerification')} />
const Thanks = () => <AsyncComponent load={import('./views/InvitationVerification/ThankYou')} />
//import InvitationVerification from './views/InvitationVerification/InvitationVerification';
//import Thanks from './views/InvitationVerification/ThankYou';

import actions from 'redux/actions';
import {actions as authActions} from 'redux/actions/auth'

import {IntlProvider} from 'react-intl';


import config from 'config/config'
var ReactGA = require('react-ga');

function logPageView() {
  if (typeof window !== 'undefined') {
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);

 }
}

function onNewPageLoad() {
  if (typeof window !== 'undefined') {
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
    if (window.Appcues) {
      //window.Appcues.start();
    }
 }
}

@withRouter
@connect((state) => state)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={element:null}
    ReactGA.initialize(config.gaID);
    ReactGA.pageview(window.location.pathname);
  }
  componentDidMount(){
    Messenger.options = {
        theme: 'flat'
      };
    let element = ReactDOM.findDOMNode(this.authContainer);
    if(element){
      this.setState({element})
    }
  }
  componentDidUpdate() {
    if(window) {
      // window.scrollTo(0,0);
    }
    logPageView()
  }


  render() {

    return (
    <IntlProvider locale="en">
      <AuthContainer ref={(c) =>this.authContainer = c}>
        <IdleTimer element={this.state.element} />
        <MainContainer {...this.props}>
          <Sidebar />
          <Header />
          <div id='body'>
            <Grid>
              <Row>
                <Col xs={12}>
                  {this.props.children}
                </Col>
              </Row>
            </Grid>
          </div>
          <Footer />
        </MainContainer>
      </AuthContainer>
      </IntlProvider>
    );
  }
}

@withRouter
class PublicApp extends React.Component {
   componentDidMount(){
    Messenger.options = {
        theme: 'flat'
      };

    ReactGA.initialize(config.gaID);
    logPageView()
  }

  componentDidUpdate() {
    logPageView()
  }
  render() {
    return (
      <div>
        <div id='body'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const routes = (
  <Route path='/' component={App} onUpdate={logPageView}>
    <IndexRoute component={Dashboard} />
    <Route path='/headset' component={HeadsetDashboard} />
    <Route path="/pos" component={POSContainer}>
      <IndexRoute component={POS} />
      <Route path=':id/products' component={ProductList} />
      <Route path=':id/checkout' component={Checkout} />
      <Route path=':id/payment' component={Payment} />
      <Route path=':id/hypur/profiles' component={Profiles} />
      <Route path=':id/hypur/pac' component={Pac} />
      <Route path=':id/transaction/messaging' component={Messaging}/>
      <Route path=':id/fulfillment' component={Fulfillment}/>
    </Route>
    <Route path='/cashdrawer' component={StartCashDrawer} />
    <Route path='/cashdrawer/:id' component={CashDrawer} />
    <Route path='/promotions' component={Promotions} />
    <Route path='/promotions/:id' component={PromotionDetail} />
    <Route path='/rewards' component={Loyalties} />
    <Route path='/rewards/:id' component={Reward} />
    <Route path='/members' component={AllMembers} />
    <Route path='/members/add' component={AddMember} />
    <Route path='/members/:id' component={MemberProfile} />
    <Route path='/transactions' component={AllTransactions} />
    <Route path='/transactions/:id' component={TransactionDetail} />
    <Route path='/transactions/:no/detail' component={TransactionDetail} />
    <Route path='/inventory/reconciliation' component={InventoryReconcilitaion}/>
    <Route path='/inventory/reconciliation/:id' component={InventoryReconcilitaionHistoryDetail}/>
    <Route path='/inventory/po' component={PurchaseOrder}/>
    <Route path='/inventory/po/create' component={CreatePurchaseOrder}/>
    <Route path='/inventory/po/:id' component={PurchaseOrderDetail}/>
    <Route path="/inventory/poarchived" component={ArchivedPo}/>
    <Route path='/inventory/po/:id/shipment' component={Shipment}/>
    <Route path='/inventory/po/shipment/:id' component={ShipmentBill}/>
    <Route path='/inventory/po/shipment/:id/receipt' component={ShipmentReceipt}/>
    <Route path='/inventory/transfer' component={InventoryTransferContainer} />
    <Route path='/inventory/transfer/:id' component={InventoryTransfer} />
    <Route path='/inventory/manage-categories' component={ManageCategories} />
    <Route path='/inventory/category/:categoryId' component={AllProducts} />
    <Route path='/inventory/product/add/:categoryId' component={AddProduct} />
    <Route path='/inventory/product/:id' component={ProductDetail} />
    <Route path='/inventory/printlabels' component={PrintLabels} />
    <Route path='/inventory/import-export' component={ImportExport} />
    <Route path='/delivery' component={NewDelivery} />
    <Route path='/settings/delivery' component={DeliverySettings} />
    <Route path='/marketing' component={Marketing} />
    <Route path='/marketing/edit/:id' component={EditSms} />
    <Route path='/marketing/sendMessage' component={SendMessage} />
    <Route path='/employees' component={AllEmployees} />
    <Route path='/employees/add' component={AddEmployee} />
    <Route path='/employees/:id' component={EmployeeProfile} />
    <Route path='/timecards' component={TimeCards} />
    <Route path='/inviteemployees' component={AllInviteEmployees}/>
    <Route path='/inviteemployees/invite' component={AddInviteEmployee}/>
    <Route path='/inviteemployees/:id' component={InviteEmployeeProfile} />
    <Route path='/me' component={MyProfile}/>
    <Route path='/vendors' component={AllVendors} />
    <Route path='/vendors/add' component={AddVendor} />
    <Route path='/vendors/:id' component={VendorDetail} />
    <Route path='/physicians' component={AllPhysicians} />
    <Route path='/physicians/add' component={AddPhysician} />
    <Route path='/physicians/:id' component={PhysicianDetail} />
    <Route path='/reports' component={AllReports} />
    <Route path='/frequentReports' component={FrequentReports}/>
    <Route path='/frequentReports/details' component={FrequentReportDetail}/>
    <Route path='/reports/details' component={ReportsDetail} />
    <Route path='/settings' component={Settings} />
    <Route path='/settings/shop' component={ShopSetting} />
    <Route path='/settings/integration' component={IntegrationSetting} />
    <Route path='/settings/plugins' component={PluginOptions}/>
    <Route path='/support' component={Support} />
    <Route path='/support/success' component={supportSuccess} />
    <Route path='/setup' component={CompanySetup} />
    <Route path='/tvdisplay' component={TVDisplays} />
    <Route path='/tvdisplay/edit/:id' component={EditDisplay} />
    <Route path='/caregivers' component={AllCaregivers} />
    <Route path='/caregivers/add' component={AddCaregivers} />
    <Route path='/caregivers/:id' component={CaregiverDetail} />
    <Route path='/brands' component={Brands} />

    //Old
  </Route>
);

/**
 * No Sidebar, Header or Footer. Only the Body is rendered.
 */
const basicRoutes = (
  <Route component={PublicApp}>
    <Route path='/login' component={Login} />
    <Route path='/employeesignup' component={InvitationVerification} />
    <Route path='/thankyou' component={Thanks} />
    <Route path='/reset' component={ForgotPassword} />
    <Route path='/password/recovery' component={UpdatePassword} />
    <Route path='/password/update' component={UpdatePassword}/>
    <Route path='/404' component={Error404}/>
    <Route path='/terms' component={Terms}/>
    <Redirect from='*' to='/404'/>
  </Route>
);


const combinedRoutes = (
  <Router onChange={onNewPageLoad}>
    <Route>
      {routes}
    </Route>
    <Route>
      {basicRoutes}
    </Route>
    <Redirect from='*' to='/404'/>
  </Router>
);

export default combinedRoutes
