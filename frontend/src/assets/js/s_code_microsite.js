/*
 * Adobe Analytics (Omniture) tagging is disabled in this template.
 * Kept as local no-ops so existing s_control_click(...) calls and the
 * `s` object writes in the register/booking/survey/summary/thankyou
 * flows don't throw — no data is sent anywhere.
 */
var s = {
  t: function () { return ''; },
  tl: function () {}
};

function s_control_click() {
  return null;
}
