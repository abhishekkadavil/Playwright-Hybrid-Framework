import { Page, BrowserContext } from "playwright";

import BillingAddressPage from "../pages/BillingAddressPage";
import CheckoutPage from "../pages/CheckoutPage";
import HomePage from "../pages/HomePage";
import { InteractionHelper } from "./InteractionHelper";
import ItemPage from "../pages/ItemPage";
import LoginPage from "../pages/LoginPage";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";
import OrderHistoryPage from "../pages/OrderHistoryPage";
import PaymentMethodPage from "../pages/PaymentMethodPage";
import RegisterUserPage from "../pages/RegisterUserPage";
import ShippingAddressPage from "../pages/ShippingAddressPage";
import ShippingMethodPage from "../pages/ShippingMethodPage";

import { ScenarioContext } from "@utils/scenarioContext";

export class AllPageObjects {
  billingAddressPage: BillingAddressPage;
  checkoutPage: CheckoutPage;
  homePage: HomePage;
  interactionHelper: InteractionHelper;
  itemPage: ItemPage;
  loginPage: LoginPage;
  orderConfirmationPage: OrderConfirmationPage;
  orderHistoryPage: OrderHistoryPage;
  paymentMethodPage: PaymentMethodPage;
  registerUserPage: RegisterUserPage;
  shippingAddressPage: ShippingAddressPage;
  shippingMethodPage: ShippingMethodPage;

  constructor(public page: Page, public scenarioContext: ScenarioContext) {
    this.billingAddressPage = new BillingAddressPage(page,scenarioContext);
    this.checkoutPage = new CheckoutPage(page,scenarioContext);
    this.homePage = new HomePage(page,scenarioContext);
    this.interactionHelper = new InteractionHelper(page,scenarioContext);
    this.itemPage = new ItemPage(page,scenarioContext);
    this.loginPage = new LoginPage(page,scenarioContext);
    this.orderConfirmationPage = new OrderConfirmationPage(page,scenarioContext);
    this.orderHistoryPage = new OrderHistoryPage(page,scenarioContext);
    this.paymentMethodPage = new PaymentMethodPage(page,scenarioContext);
    this.registerUserPage = new RegisterUserPage(page,scenarioContext);
    this.shippingAddressPage = new ShippingAddressPage(page,scenarioContext);
    this.shippingMethodPage = new ShippingMethodPage(page,scenarioContext);
  }
}
