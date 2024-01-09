import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import getAllPlatformCategories from "../popclub/presentation/slices/get-all-platform-categories.slice";
import getDeals from "../popclub/presentation/slices/get-deals.slice";
import getPopClubData from "../popclub/presentation/slices/get-popclub-data.slice";
import setPopClubData from "../popclub/presentation/slices/set-popclub-data.slice";
import getSession from "../shared/presentation/slices/get-session.slice";
import setSession from "../shared/presentation/slices/set-session.slice";
import getAllAvailableStores from "../popclub/presentation/slices/get-all-available-stores.slice";
import getDeal from "../popclub/presentation/slices/get-deal.slice";
import getDealProductVariants from "../popclub/presentation/slices/get-deal-product-variants.slice";
import redeemDeal from "../popclub/presentation/slices/redeem-deal.slice";
import getRedeems from "../popclub/presentation/slices/get-redeems.slice";
import getRedeem from "../popclub/presentation/slices/get-redeem.slice";
import getLatestUnexpiredRedeem from "../popclub/presentation/slices/get-latest-unexpired-redeem.slice";
import getCategoryProducts from "../shop/presentation/slices/get-category-products.slice";
import getProductDetails from "../shop/presentation/slices/get-product-details.slice";
import addToCartShop from "../shop/presentation/slices/add-to-cart-shop.slice";
import checkoutOrders from "../shop/presentation/slices/checkout-orders.slice";
import getOrders from "../shop/presentation/slices/get-orders.slice";
import getSnackShopOrderHistory from "../profile/presentation/slices/get-snackshop-order-history.slice";
import getCateringBookingHistory from "../profile/presentation/slices/get-catering-booking-history.slice";
import facebookLogin from "../shared/presentation/slices/facebook-login.slice";
import facebookLoginPoint from "../shared/presentation/slices/facebook-login-point.slice";
import facebookLogout from "../shared/presentation/slices/facebook-logout.slice";
import storeReset from "../shared/presentation/slices/store-reset.slice";
import getCateringCategoryPackages from "../catering/presentation/slices/get-catering-category-packages.slice";
import getProductSku from "../shop/presentation/slices/get-product-sku.slice";
import removeItemFromCartShop from "../shop/presentation/slices/remove-item-from-cart-shop.slice";
import uploadProofOfPayment from "../shared/presentation/slices/upload-proof-of-payment.slice";
import addContact from "../shared/presentation/slices/add-contact.slice";
import deleteContact from "../shared/presentation/slices/delete-contact.slice";
import updateContact from "../shared/presentation/slices/update-contact.slice";
import getContacts from "../shared/presentation/slices/get-contacts.slice";
import getStoresAvailableSnackshop from "../shop/presentation/slices/get-stores-available-snackshop.slice";
import getStoresAvailableCatering from "../catering/presentation/slices/get-stores-available-catering.slice";
import getStoresAvailableBranches from "../branches/presentation/slices/get-stores-available-branches.slice";
import getCateringPackageDetails from "../catering/presentation/slices/get-catering-package-details.slice";
import getSnacksDeliveredAvailableStores from "../popclub/presentation/slices/get-snacks-delivered-available-stores.slice";
import getCartItem from "features/shop/presentation/slices/get-cart-item.slice";
import editCartItem from "features/shop/presentation/slices/edit-cart-item.slice";
import addToCartCatering from "../catering/presentation/slices/add-to-cart-catering.slice";
import removeItemFromCartCatering from "../catering/presentation/slices/remove-item-from-cart-catering.slice";
import popSnackBar from "../shared/presentation/slices/pop-snackbar.slice";
import cateringCheckoutOrders from "../catering/presentation/slices/catering-checkout-orders.slice";
import cateringHomePage from "../catering/presentation/slices/catering-home-page.slice";
import shopHomePage from "../shop/presentation/slices/shop-home-page.slice";
import snacksDeliveredStoreChooserModal from "../popclub/presentation/slices/snacks-delivered-store-chooser-modal.slice";
import getCateringOrders from "../catering/presentation/slices/get-catering-orders.slice";
import uploadContract from "../catering/presentation/slices/upload-contract.slice";
import cateringUploadProofOfPayment from "../catering/presentation/slices/catering-upload-proof-of-payment.slice";
import signInMobileUser from "../shared/presentation/slices/sign-in-mobile-user.slice";
import setSnacksDeliveredStoreAndAddress from "../popclub/presentation/slices/set-snacks-delivered-store-and-address.slice";
import setStoreVisitStoreAndAddress from "../popclub/presentation/slices/set-store-visit-store-and-address.slice";
import addToCartCheckoutShop from "../shop/presentation/slices/add-to-cart-checkout-shop.slice";
import signUpMobileUser from "../shared/presentation/slices/sign-up-mobile-user.slice";
import changeForgotPasswordStatus from "../shared/presentation/slices/change-forgot-password-status.slice";
import forgotPasswordGenerateOTP from "../shared/presentation/slices/forgot-password-generate-otp.slice";
import forgotPasswordValidateOTP from "../shared/presentation/slices/forgot-password-validate-otp.slice";
import forgotPasswordNewPassword from "../shared/presentation/slices/forgot-password-new-password-otp.slice";
import loginAdmin from "features/admin/presentation/slices/login-admin.slice";
import getAdminSession from "features/admin/presentation/slices/get-admin-session.slice";
import logoutAdmin from "features/admin/presentation/slices/logout-admin.slice";
import forfeitRedeem from "features/popclub/presentation/slices/forfeit-redeem.slice";
import adminSideBar from "features/admin/presentation/slices/admin-sidebar.slice";
import getAdminShopOrders from "features/admin/presentation/slices/get-admin-shop-orders.slice";
import getAdminShopOrder from "features/admin/presentation/slices/get-admin-shop-order.slice";
import getAdminPopclubRedeems from "features/admin/presentation/slices/get-admin-popclub-redeems.slice";
import getAdminPopclubRedeem from "features/admin/presentation/slices/get-admin-popclub-redeem.slice";
import adminCompleteRedeem from "features/admin/presentation/slices/admin-complete-redeem.slice";
import storeVisitStoreChooserModal from "features/popclub/presentation/slices/store-visit-store-chooser-modal.slice";
import getStoreVisitAvailableStore from "features/popclub/presentation/slices/get-store-visit-available-stores.slice";
import getAdminUsers from "features/admin/presentation/slices/get-admin-users.slice";
import createAdminUser from "features/admin/presentation/slices/create-admin-user.slice";
import getAdminUser from "features/admin/presentation/slices/get-admin-user.slice";
import getAdminGroups from "features/admin/presentation/slices/get-admin-groups.slice";
import editAdminUser from "features/admin/presentation/slices/edit-admin-user.slice";
import getAdminSettingUserStore from "features/admin/presentation/slices/get-admin-setting-user-store.slice";
import getAdminSettingUserStores from "features/admin/presentation/slices/get-admin-setting-user-stores.slice";
import updateAdminSettingUserStores from "features/admin/presentation/slices/update-admin-setting-user-stores.slice";
import createAdminGroup from "features/admin/presentation/slices/create-admin-group.slice";
import uploadProofOfPaymentAdmin from "features/admin/presentation/slices/upload-proof-of-payment-admin.slice";
import validateReferenceNumberAdmin from "features/admin/presentation/slices/validate-reference-number.slice";
import adminShopOrderUpdateStatus from "features/admin/presentation/slices/admin-shop-order-update-status.slice";
import adminPrivilege from "features/admin/presentation/slices/admin-privilege.slice";
import getAdminCateringBookings from "features/admin/presentation/slices/get-admin-catering-bookings.slice";
import getAdminCateringBooking from "features/admin/presentation/slices/get-admin-catering-booking.slice";
import adminCateringBookingUpdateStatus from "features/admin/presentation/slices/admin-catering-booking-update-status.slice";
import getPopclubRedeemsHistory from "features/profile/presentation/slices/get-popclub-redeems-history.slice";
import redeemValidators from "features/popclub/presentation/slices/redeem-validators.slice";
import getAdminStoreDeals from "features/admin/presentation/slices/get-admin-stores-deals.slice";
import updateStoreDeal from "features/admin/presentation/slices/update-store-deal.slice";
import getAdminStoreProducts from "features/admin/presentation/slices/get-admin-stores-products.slice";
import getAdminProductCategories from "features/admin/presentation/slices/get-admin-product-categories.slice";
import updateStoreProduct from "features/admin/presentation/slices/update-store-product.slice";
import getAdminSettingStores from "features/admin/presentation/slices/get-admin-setting-stores.slice";
import adminDeclineRedeem from "features/admin/presentation/slices/admin-decline-redeem.slice";
import getCatersPackageCategories from "features/admin/presentation/slices/get-caters-package-categories.slice";
import getAdminStoreCatersPackages from "features/admin/presentation/slices/get-admin-stores-caters-packages.slice";
import updateStoreCatersPackage from "features/admin/presentation/slices/update-store-caters-packages.slice";
import getDealCategories from "features/admin/presentation/slices/get-deal-categories.slice";
import getAdminStoreCatersPackageAddons from "features/admin/presentation/slices/get-admin-stores-caters-package-addons.slice";
import updateStoreCatersPackageAddon from "features/admin/presentation/slices/update-store-caters-package-addons.slice";
import getAdminStoreCatersProductAddons from "features/admin/presentation/slices/get-admin-stores-caters-product-addons.slice";
import updateStoreCatersProductAddon from "features/admin/presentation/slices/update-store-caters-product-addons.slice";
import getShopTransactionLogs from "features/admin/presentation/slices/get-shop-transaction-logs.slice";
import adminCateringPrivilege from "features/admin/presentation/slices/admin-catering-privilege.slice";
import getCateringTransactionLogs from "features/admin/presentation/slices/get-catering-transaction-logs.slice";
import getAdminNotifications from "features/admin/presentation/slices/get-admin-notifications.slice";
import updateAdminNotificationDateSeen from "features/admin/presentation/slices/update-admin-notification-dateseen.slice";
import discountRegistration from "features/profile/presentation/slices/discount-registration.slice";
import getDealOrder from "features/popclub/presentation/slices/get-deal-order.slice";
import getAdminUserDiscounts from "features/admin/presentation/slices/get-admin-user-discounts.slice";
import getAdminUserDiscount from "features/admin/presentation/slices/get-admin-discount-verification.slice";
import applyUserDiscount from "features/profile/presentation/slices/apply-user-discount.slice";
import getUserDiscount from "features/profile/presentation/slices/get-user-discount.slice";
import BSCSideBar from "features/bsc/presentation/slices/bsc-sidebar.slice";
import adminUserDiscountChangeStatus from "features/admin/presentation/slices/admin-user-discount-change-status.slice";
import updateUserDiscount from "features/profile/presentation/slices/update-user-discount.slice";
import loginBsc from "features/bsc/presentation/slices/login-bsc.slice";
import getBscSession from "features/bsc/presentation/slices/get-bsc-session.slice";
import logoutBsc from "features/bsc/presentation/slices/logout-bsc.slice";
import getAvailableUserDiscount from "features/shared/presentation/slices/get-available-user-discount.slice";
import getAllStores from "features/shared/presentation/slices/get-all-stores.slice";
import getAllCompanies from "features/shared/presentation/slices/get-all-companies.slice";
import createBscUser from "features/bsc/presentation/slices/create-bsc-user.slice";
import getBscUsers from "features/bsc/presentation/slices/get-bsc-users.slice";
import getBscUser from "features/bsc/presentation/slices/get-bsc-user.slice";
import getBscUserStores from "features/bsc/presentation/slices/get-bsc-user-stores.slice";
import getBscStores from "features/bsc/presentation/slices/get-bsc-stores.slice";
import updateBscUserStores from "features/bsc/presentation/slices/bsc-update-user-stores.slice";
import updateBscUser from "features/bsc/presentation/slices/bsc-update-user.slice";
import getBscGroups from "features/bsc/presentation/slices/get-bsc-groups.slice";
import createBscGroup from "features/bsc/presentation/slices/bsc-create-group.slice";
import updateBscUserStatus from "features/bsc/presentation/slices/update-bsc-user-status.slice";
import getAdminSurveyVerification from "features/admin/presentation/slices/get-admin-survey-verification.slice";
import getAdminSurveyVerifications from "features/admin/presentation/slices/get-admin-survey-verifications.slice";
import adminSurveyVerificationChangeStatus from "features/admin/presentation/slices/admin-survey-verification-change-status.slice";
import getNotifications from "features/shared/presentation/slices/get-notifications.slice";
import seenNotification from "features/shared/presentation/slices/seen-notification.slice";
import shopStoreChooserModal from "features/shop/presentation/slices/shop-store-chooser-modal.slice";
import getStoresAvailableSnackshopModal from "features/shop/presentation/slices/get-stores-available-snackshop-modal.slice";
import getStoresAvailableCateringModal from "features/catering/presentation/slices/get-stores-available-catering-modal.slice";
import getSurvey from "features/survey/presentation/slices/get-survey.slice";
import insertCustomerSurveyResponse from "features/survey/presentation/slices/insert-customer-survey-response.slice";
import getCustomerSurveyResponse from "features/survey/presentation/slices/get-customer-survey-response.slice";
import getAdminSettingShopProducts from "features/admin/presentation/slices/get-admin-setting-shop-products.slice";
import createAdminSettingShopProduct from "features/admin/presentation/slices/create-admin-setting-shop-product.slice";
import getAdminSettingShopProduct from "features/admin/presentation/slices/get-admin-setting-shop-product.slice";
import editAdminSettingShopProduct from "features/admin/presentation/slices/edit-admin-setting-shop-product.slice";
import deleteAdminSettingShopProduct from "features/admin/presentation/slices/delete-admin-setting-shop-product.slice";
import updateAdminSettingShopProductStatus from "features/admin/presentation/slices/update-admin-setting-shop-product-status.slice";
import getAdminProducts from "features/admin/presentation/slices/get-admin-products.slice";
import addToCartCateringProduct from "features/catering/presentation/slices/add-to-cart-catering-products.slice";
import getCateringCategoryProducts from "features/catering/presentation/slices/get-catering-category-products.slice";
import getAdminStoreCateringProducts from "features/admin/presentation/slices/get-admin-stores-catering-products.slice";
import updateStoreCateringProduct from "features/admin/presentation/slices/update-store-catering-product.slice";
import updateAdminCateringOrderItemRemarks from "features/admin/presentation/slices/update-admin-catering-order-item-remarks.slice";
import getAdminCateringPackageFlavors from "features/admin/presentation/slices/get-admin-catering-package-flavors.slice";
import getAdminDashboardShopSalesHistory from "features/admin/presentation/slices/get-admin-dashboard-shop-sales-history.slice";
import getAdminStoreMenus from "features/admin/presentation/slices/get-admin-store-menus.slice";
import createAdminSettingStore from "features/admin/presentation/slices/create-admin-setting-store.slice";
import getAdminRegionStoreCombinations from "features/admin/presentation/slices/get-admin-region-store-combinations.slice";
import getAdminStoreLocales from "features/admin/presentation/slices/get-admin-store-locales.slice";
import getAdminPackages from "features/admin/presentation/slices/get-admin-packages.slice";
import getAdminDeals from "features/admin/presentation/slices/get-admin-deals.slice";
import snacksDeliveredDealStoreChooserModal from "features/popclub/presentation/slices/snacks-delivered-deal-store-chooser-modal.slice";
import getSnacksDeliveredDealAvailableStores from "features/popclub/presentation/slices/get-snacks-delivered-deal-available-stores.slice";
import setSnacksDeliveredDealStoreAndAddress from "features/popclub/presentation/slices/set-snacks-delivered-deal-store-and-address.slice";
import storeVisitDealStoreChooserModal from "features/popclub/presentation/slices/store-visit-deal-store-chooser-modal.slice";
import getStoreVisitDealAvailableStore from "features/popclub/presentation/slices/get-store-visit-deal-available-stores.slice";
import setStoreVisitDealStoreAndAddress from "features/popclub/presentation/slices/set-store-visit-deal-store-and-address.slice";
import setSnackshopStoreAndAddress from "features/shop/presentation/slices/set-snackshop-store-and-address.slice";
import setCateringStoreAndAddress from "features/catering/presentation/slices/set-catering-store-and-address.slice";
import setCateringPackageStoreAndAddress from "features/catering/presentation/slices/set-catering-package-store-and-address.slice";
import getSnackshopDeals from "features/shop/presentation/slices/get-snackshop-deals.slice";
import getCustomerSurveyResponseInOrderService from "features/shared/presentation/slices/get-customer-survey-response-in-order-service.slice";
import getInbox from "features/profile/presentation/slices/get-inbox.slice";
import getAdminSettingStore from "features/admin/presentation/slices/get-admin-setting-store.slice";
import editAdminSettingStore from "features/admin/presentation/slices/edit-admin-setting-store.slice";
import loginChooserModal from "features/shared/presentation/slices/login-chooser-modal.slice";
import messageModal from "features/shared/presentation/slices/message-modal.slice";
import getAdminSnackshopStores from "features/admin/presentation/slices/get-admin-snackshop-stores.slice";
import getAdminCateringStores from "features/admin/presentation/slices/get-admin-catering-stores.slice";
import getCustomerSurveyResponseLogs from "features/admin/presentation/slices/get-customer-survey-response-logs.slice";
import copyAdminSettingShopProduct from "features/admin/presentation/slices/copy-admin-setting-shop-product.slice";
import getAdminSettingCateringPackages from "features/admin/presentation/slices/get-admin-setting-catering-packages.slice";
import getAdminPackageCategories from "features/admin/presentation/slices/get-admin-package-categories.slice";
import createAdminSettingCateringPackage from "features/admin/presentation/slices/create-admin-setting-catering-package.slice";
import getAdminSettingCateringPackage from "features/admin/presentation/slices/get-admin-setting-catering-package.slice";
import editAdminSettingCateringPackage from "features/admin/presentation/slices/edit-admin-setting-catering-package.slice";
import copyAdminSettingCateringPackage from "features/admin/presentation/slices/copy-admin-setting-catering-package.slice";
import updateAdminSettingCateringPackageStatus from "features/admin/presentation/slices/update-admin-setting-catering-package-status.slice";
import getAdminSettingPopclubDeals from "features/admin/presentation/slices/get-admin-setting-popclub-deals.slice";
import getAdminPopclubCategories from "features/admin/presentation/slices/get-admin-popclub-categories.slice";
import getAdminSettingDealProducts from "features/admin/presentation/slices/get-admin-setting-deal-products.slice";
import getAdminPopclubStores from "features/admin/presentation/slices/get-admin-popclub-stores.slice";
import createAdminSettingPopclubDeal from "features/admin/presentation/slices/create-admin-setting-popclub-deal.slice";
import getAdminSettingPopclubDeal from "features/admin/presentation/slices/get-admin-setting-popclub-deal.slice";
import applyInfluencer from "features/profile/presentation/slices/apply-influencer.slice";
import getInfluencer from "features/profile/presentation/slices/get-influencer.slice";
import updateInfluencer from "features/profile/presentation/slices/update-influencer.slice";
import getAdminInfluencerApplications from "features/admin/presentation/slices/get-admin-influencer-applications.slice";
import getAdminInfluencerApplication from "features/admin/presentation/slices/get-admin-influencer-application.slice";
import adminInfluencerApplicationChangeStatus from "features/admin/presentation/slices/admin-influencer-application-change-status.slice";
import editAdminSettingPopclubDeal from "features/admin/presentation/slices/edit-admin-setting-popclub-deal.slice";
import updateAdminSettingPopclubDealStatus from "features/admin/presentation/slices/update-admin-setting-popclub-deal-status.slice";
import getInfluencerDealRedeems from "features/profile/presentation/slices/get-influencer-referees.slice";
import getSnackshopInfluencerPromo from "features/shop/presentation/slices/get-snackshop-influencer-promo.slice";
import getInfluencerReferees from "features/profile/presentation/slices/get-influencer-referees.slice";
import uploadContractInfluencer from "features/profile/presentation/slices/upload-contract-influencer.slice";
import getAdminInfluencerPromos from "features/admin/presentation/slices/get-admin-influencer-promos.slice";
import getAdminInfluencers from "features/admin/presentation/slices/get-admin-influencers.slice";
import createAdminInfluencerPromo from "features/admin/presentation/slices/create-admin-influencer-promo.slice";
import influencerCashout from "features/profile/presentation/slices/influencer-cashout.slice";
import getAdminInfluencerCashouts from "features/admin/presentation/slices/get-admin-influencer-cashouts.slice";
import getAdminInfluencerCashout from "features/admin/presentation/slices/get-admin-influencer-cashout.slice";
import adminInfluencerCashoutChangeStatus from "features/admin/presentation/slices/admin-influencer-cashout-change-status.slice";
import getInfluencerCashouts from "features/profile/presentation/slices/get-influencer-cashouts.slice";
import validatePartnerCompanyEmployeeIdNumberAdmin from "features/admin/presentation/slices/validate-partner-company-employee-id-number.slice";
import auditSideBar from "features/audit/presentation/slices/audit-sidebar-slice";
import loginAudit from "features/audit/presentation/slices/login-audit.slice";
import logoutAudit from "features/audit/presentation/slices/logout-audit.slice";
import getAuditSettingQuestions from "features/audit/presentation/slices/get-audit-setting-questions.slice";
import updateAuditSettingsQuestion from "features/audit/presentation/slices/update-admin-settings-questions.slice";
import getStores from "features/audit/presentation/slices/get-stores.slice";
import getAuditEvaluationFormQuestion from "features/audit/presentation/slices/get-audit-evaluation-form_questions.slice";
import AuditSection from "features/audit/presentation/slices/audit-section.slice";
import insertAuditResponse from "features/audit/presentation/slices/insert-audit-response.slice";
import getAuditResponse from "features/audit/presentation/slices/get-audit-response.slice";
import getAuditResponseInformationQualityAuditInformation from "features/audit/presentation/slices/get-audit-response-quality-audit-information.slice";
import getAdminDashboardShopTransactionTotal from "features/admin/presentation/slices/get-admin-dashboard-shop-transaction-total.slice";
import getAdminDashboardShopCompletedTransactionTotal from "features/admin/presentation/slices/get-admin-dashboard-shop-completed-transaction-total.slice";
import insertShopProductViewLog from "features/shop/presentation/slices/insert-shop-product-view-log.slice";
import insertShopInitialCheckoutLog from "features/shop/presentation/slices/insert-shop-initial-checkout-log.slice";
import getAdminDashboardShopAddToCartTotal from "features/admin/presentation/slices/get-admin-dashboard-shop-add-to-cart-total.slice";
import getAdminDashboardShopProductViewTotal from "features/admin/presentation/slices/get-admin-dashboard-shop-product-view-total.slice";
import getAdminDashboardShopInitialCheckoutTotal from "features/admin/presentation/slices/get-admin-dashboard-shop-initial-checkout-total.slice";
import getAdminDashboardShopUsersTotal from "features/admin/presentation/slices/get-admin-dashboard-shop-users-total.slice";
import getAdminDashboardShopFeaturedProducts from "features/admin/presentation/slices/get-admin-dashboard-shop-featured-products.slice";
import getAdminDashboardCustomerFeedbackRatings from "features/admin/presentation/slices/get-admin-dashboard-customer-feedback-ratings.slice";
import getAuditStoreResult from "features/audit/presentation/slices/audit-store-result";
import getAuditAcknowledge from "features/audit/presentation/slices/audit-acknowledge.slice";
import stockOrderSideBar from "features/stock-ordering/presentation/slices/stock-order.slice";
import getStockOrderStores from "features/stock-ordering/presentation/slices/get-store.slice";
import insertNewOrder from "features/stock-ordering/presentation/slices/insert-new-order.slice";
import confirmNewOrder from "features/stock-ordering/presentation/slices/confirm-new-order.slice";
import getStockOrderProducts from "features/stock-ordering/presentation/slices/get-products.slice";
import getStockOrders from "features/stock-ordering/presentation/slices/get-stock-orders.slice";
import getProductData from "features/stock-ordering/presentation/slices/get-product-data.slice";
import updateNewOrders from "features/stock-ordering/presentation/slices/update-new-order.slice";
import updateReviewOrders from "features/stock-ordering/presentation/slices/update-review-order.slice";
import updateConfirmOrders from "features/stock-ordering/presentation/slices/update-confirm-order.slice";
import updateDispatchOrders from "features/stock-ordering/presentation/slices/update-dispatch-order.slice";
import updateReceiveOrders from "features/stock-ordering/presentation/slices/update-receive-order.slice";
import updateBillingOrders from "features/stock-ordering/presentation/slices/update-billing-order.slice";
import updatePayBillingOrders from "features/stock-ordering/presentation/slices/update-pay-billing.slice";
import updateConfirmPayment from "features/stock-ordering/presentation/slices/update-confirm-payment.slice";
import updateDeliveryReceiveApprovalOrders from "features/stock-ordering/presentation/slices/update-delivery-receive-approval.slice";
import updateOrderCancelled from "features/stock-ordering/presentation/slices/update-order-cancelled.slice";
import getPayBillingSi from "features/stock-ordering/presentation/slices/get-pay-billing-si.slice";
import changePassword from "features/admin/presentation/slices/change-password.slice";
import getDeliverySchedule from "features/stock-ordering/presentation/slices/get-delivery-schedule.slice";
import updateOrderItems from "features/stock-ordering/presentation/slices/update-order-items.slice";
import popupScroll from "features/stock-ordering/presentation/slices/popup-scroll.slice";
import getOverdueTask from "features/stock-ordering/presentation/slices/get-overdue-task.slice";
import getHrSession from "features/hr/presentation/slices/get-hr-session.slice";
import loginHr from "features/hr/presentation/slices/login-hr.slice";
import logoutHr from "features/hr/presentation/slices/logout-hr.slice";
import getHrPerformanceCriteria from "features/hr/presentation/slices/get-hr-performance-criteria.slice";
import getHrRatingScale from "features/hr/presentation/slices/get-hr-rating-scale.slice";
import getHrKraKpiGrade from "features/hr/presentation/slices/get-hr-kra-kpi-grade.slice";
import getHrCoreCompetencyGrade from "features/hr/presentation/slices/get-hr-core-competency-grade.slice";
import getHrFunctionalCompetencyAndPunctualityGrade from "features/hr/presentation/slices/get-hr-functional-competency-and-punctuality-grade.slice";
import getHrAttendanceAndPunctualityGrade from "features/hr/presentation/slices/get-hr-attendance-and-punctuality-grade.slice";
import getHrComments from "features/hr/presentation/slices/get-hr-comments.slice";
import submitAssessment from "features/hr/presentation/slices/submit-assessment";
import submitKra from "features/hr/presentation/slices/submit-kra";
import getHrKras from "features/hr/presentation/slices/get-hr-kras.slice";
import updateActionItem from "features/hr/presentation/slices/update-action-item";
import getHrActionItems from "features/hr/presentation/slices/get-hr-action-items.slice";
import updateKra from "features/hr/presentation/slices/update-kra";
import getHrDirectReportStaffActionItems from "features/hr/presentation/slices/get-hr-direct-report-staff-action-items.slice";
import getHrDirectReportStaffKras from "features/hr/presentation/slices/get-hr-direct-report-staff-kras.slice";
import salesSideBar from "features/sales/presentation/slices/sales-sidebar.slice";
import getHrAppraisalResponse from "features/hr/presentation/slices/get-hr-appraisal-response.slice";
import getHrAppraisalDirectReportStaff from "features/hr/presentation/slices/get-hr-appraisal-direct-report-staff.slice";
import getEmployees from "features/hr/presentation/slices/get-employees.slice";
import getDepartments from "features/hr/presentation/slices/get-departments.slice";
import getUserEmployees from "features/hr/presentation/slices/get-user-employees.slice";
import getEmployeeInfo from "features/hr/presentation/slices/get-employee-info.slice";
import getHrAppraisalSummary from "features/hr/presentation/slices/get-hr-appraisal-summary.slice";
import hrImportUsers from "features/hr/presentation/slices/hr-import-users.slice";

export const store = configureStore({
  reducer: {
    getAllPlatformCategories,
    getDeals,
    setPopClubData,
    getPopClubData,
    getStoresAvailableSnackshop,
    getStoresAvailableCatering,
    getStoresAvailableBranches,
    getSnacksDeliveredAvailableStores,
    getSession,
    setSession,
    getAllAvailableStores,
    getDeal,
    getDealProductVariants,
    redeemDeal,
    getRedeems,
    getRedeem,
    getLatestUnexpiredRedeem,
    getCategoryProducts,
    getProductDetails,
    getCartItem,
    editCartItem,
    addToCartShop,
    addToCartCheckoutShop,
    checkoutOrders,
    getOrders,
    getSnackShopOrderHistory,
    getCateringBookingHistory,
    facebookLogin,
    facebookLoginPoint,
    facebookLogout,
    storeReset,
    getCateringCategoryPackages,
    getProductSku,
    removeItemFromCartShop,
    uploadProofOfPayment,
    addContact,
    updateContact,
    deleteContact,
    getContacts,
    getCateringPackageDetails,
    addToCartCatering,
    removeItemFromCartCatering,
    popSnackBar,
    cateringCheckoutOrders,
    cateringHomePage,
    shopHomePage,
    snacksDeliveredStoreChooserModal,
    getCateringOrders,
    uploadContract,
    cateringUploadProofOfPayment,
    signInMobileUser,
    setSnacksDeliveredStoreAndAddress,
    setStoreVisitStoreAndAddress,
    signUpMobileUser,
    changeForgotPasswordStatus,
    forgotPasswordGenerateOTP,
    forgotPasswordValidateOTP,
    forgotPasswordNewPassword,
    forfeitRedeem,
    loginAdmin,
    logoutAdmin,
    getAdminSession,
    adminSideBar,
    getAdminShopOrders,
    getAdminShopOrder,
    getAdminPopclubRedeems,
    getAdminPopclubRedeem,
    adminCompleteRedeem,
    storeVisitStoreChooserModal,
    getStoreVisitAvailableStore,
    getAdminUsers,
    createAdminUser,
    getAdminUser,
    getAdminGroups,
    editAdminUser,
    getAdminSettingUserStore,
    getAdminSettingUserStores,
    updateAdminSettingUserStores,
    createAdminGroup,
    uploadProofOfPaymentAdmin,
    validateReferenceNumberAdmin,
    adminShopOrderUpdateStatus,
    adminPrivilege,
    getAdminCateringBookings,
    getAdminCateringBooking,
    adminCateringBookingUpdateStatus,
    getPopclubRedeemsHistory,
    redeemValidators,
    getAdminStoreDeals,
    updateStoreDeal,
    getAdminStoreProducts,
    getAdminProductCategories,
    updateStoreProduct,
    getAdminSettingStores,
    adminDeclineRedeem,
    getCatersPackageCategories,
    getAdminStoreCatersPackages,
    updateStoreCatersPackage,
    getDealCategories,
    getAdminStoreCatersPackageAddons,
    updateStoreCatersPackageAddon,
    getAdminStoreCatersProductAddons,
    updateStoreCatersProductAddon,
    getShopTransactionLogs,
    adminCateringPrivilege,
    getCateringTransactionLogs,
    getAdminNotifications,
    updateAdminNotificationDateSeen,
    discountRegistration,
    getDealOrder,
    getAdminUserDiscounts,
    getAdminUserDiscount,
    applyUserDiscount,
    getUserDiscount,
    BSCSideBar,
    adminUserDiscountChangeStatus,
    updateUserDiscount,
    loginBsc,
    getBscSession,
    logoutBsc,
    getAvailableUserDiscount,
    getAllStores,
    getAllCompanies,
    createBscUser,
    getBscUsers,
    getBscUser,
    getBscUserStores,
    getBscStores,
    updateBscUserStores,
    updateBscUser,
    getBscGroups,
    createBscGroup,
    updateBscUserStatus,
    getAdminSurveyVerification,
    getAdminSurveyVerifications,
    adminSurveyVerificationChangeStatus,
    getNotifications,
    seenNotification,
    shopStoreChooserModal,
    getStoresAvailableSnackshopModal,
    getStoresAvailableCateringModal,
    getSurvey,
    insertCustomerSurveyResponse,
    getCustomerSurveyResponse,
    getAdminSettingShopProducts,
    createAdminSettingShopProduct,
    getAdminSettingShopProduct,
    editAdminSettingShopProduct,
    deleteAdminSettingShopProduct,
    updateAdminSettingShopProductStatus,
    getAdminProducts,
    addToCartCateringProduct,
    getCateringCategoryProducts,
    getAdminStoreCateringProducts,
    updateStoreCateringProduct,
    updateAdminCateringOrderItemRemarks,
    getAdminCateringPackageFlavors,
    getAdminDashboardShopSalesHistory,
    getAdminStoreMenus,
    createAdminSettingStore,
    getAdminRegionStoreCombinations,
    getAdminStoreLocales,
    getAdminPackages,
    getAdminDeals,
    snacksDeliveredDealStoreChooserModal,
    getSnacksDeliveredDealAvailableStores,
    setSnacksDeliveredDealStoreAndAddress,
    storeVisitDealStoreChooserModal,
    getStoreVisitDealAvailableStore,
    setStoreVisitDealStoreAndAddress,
    setSnackshopStoreAndAddress,
    setCateringStoreAndAddress,
    setCateringPackageStoreAndAddress,
    getSnackshopDeals,
    getCustomerSurveyResponseInOrderService,
    getInbox,
    getAdminSettingStore,
    editAdminSettingStore,
    loginChooserModal,
    messageModal,
    getAdminSnackshopStores,
    getAdminCateringStores,
    getCustomerSurveyResponseLogs,
    copyAdminSettingShopProduct,
    getAdminSettingCateringPackages,
    getAdminPackageCategories,
    createAdminSettingCateringPackage,
    getAdminSettingCateringPackage,
    editAdminSettingCateringPackage,
    copyAdminSettingCateringPackage,
    updateAdminSettingCateringPackageStatus,
    getAdminSettingPopclubDeals,
    getAdminPopclubCategories,
    getAdminSettingDealProducts,
    getAdminPopclubStores,
    createAdminSettingPopclubDeal,
    getAdminSettingPopclubDeal,
    applyInfluencer,
    getInfluencer,
    updateInfluencer,
    getAdminInfluencerApplications,
    getAdminInfluencerApplication,
    adminInfluencerApplicationChangeStatus,
    editAdminSettingPopclubDeal,
    updateAdminSettingPopclubDealStatus,
    getInfluencerDealRedeems,
    getSnackshopInfluencerPromo,
    getInfluencerReferees,
    uploadContractInfluencer,
    getAdminInfluencerPromos,
    getAdminInfluencers,
    createAdminInfluencerPromo,
    influencerCashout,
    getAdminInfluencerCashouts,
    getAdminInfluencerCashout,
    adminInfluencerCashoutChangeStatus,
    getInfluencerCashouts,
    validatePartnerCompanyEmployeeIdNumberAdmin,
    auditSideBar,
    loginAudit,
    logoutAudit,
    getAuditSettingQuestions,
    updateAuditSettingsQuestion,
    getStores,
    getAuditEvaluationFormQuestion,
    AuditSection,
    insertAuditResponse,
    getAuditResponse,
    getAuditResponseInformationQualityAuditInformation,
    getAdminDashboardShopTransactionTotal,
    getAdminDashboardShopCompletedTransactionTotal,
    insertShopProductViewLog,
    insertShopInitialCheckoutLog,
    getAdminDashboardShopAddToCartTotal,
    getAdminDashboardShopProductViewTotal,
    getAdminDashboardShopInitialCheckoutTotal,
    getAdminDashboardShopUsersTotal,
    getAdminDashboardShopFeaturedProducts,
    getAdminDashboardCustomerFeedbackRatings,
    getAuditStoreResult,
    getAuditAcknowledge,
    stockOrderSideBar,
    getStockOrderStores,
    insertNewOrder,
    confirmNewOrder,
    getStockOrderProducts,
    getStockOrders,
    getProductData,
    updateNewOrders,
    updateReviewOrders,
    updateConfirmOrders,
    updateDispatchOrders,
    updateReceiveOrders,
    updateBillingOrders,
    updatePayBillingOrders,
    updateConfirmPayment,
    updateDeliveryReceiveApprovalOrders,
    updateOrderCancelled,
    getPayBillingSi,
    changePassword,
    getDeliverySchedule,
    updateOrderItems,
    popupScroll,
    getOverdueTask,
    getHrSession,
    loginHr,
    logoutHr,
    getHrPerformanceCriteria,
    getHrRatingScale,
    getHrKraKpiGrade,
    getHrCoreCompetencyGrade,
    getHrFunctionalCompetencyAndPunctualityGrade,
    getHrAttendanceAndPunctualityGrade,
    getHrComments,
    submitAssessment,
    submitKra,
    getHrKras,
    updateActionItem,
    getHrActionItems,
    updateKra,
    getHrDirectReportStaffActionItems,
    getHrDirectReportStaffKras,
    salesSideBar,
    getHrAppraisalResponse,
    getHrAppraisalDirectReportStaff,
    getEmployees,
    getDepartments,
    getUserEmployees,
    getEmployeeInfo,
    getHrAppraisalSummary,
    hrImportUsers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
