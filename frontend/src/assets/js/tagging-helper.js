/*
 * Analytics tagging is disabled in this template.
 * Kept as a local no-op so existing Helper.trackGaPageView/trackGaAction
 * calls in the register/booking/survey/summary flows don't throw —
 * no data is sent anywhere.
 */
window.ga = window.ga || function () {
  (window.ga.q = window.ga.q || []).push(arguments);
};
