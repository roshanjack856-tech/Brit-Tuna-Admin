/* ==========================================================
   config.js — Brit.Tuna Admin Portal Configuration

   IMPORTANT SECURITY:
   ----------------------------------------------------------
   Frontend must use ONLY:
   - Supabase Publishable Key
   OR
   - Legacy anon public key

   NEVER put:
   - sb_secret_ key
   - service_role key
   - database password
   - Razorpay secret

   Admin permission is controlled by:
   profiles.role = 'admin'
   + Supabase RLS / secure RPC functions.
   ========================================================== */


window.BT_ADMIN_CONFIG = {

  /* --------------------------------------------------------
     BRAND
  --------------------------------------------------------- */

  brandName: 'Brit.Tuna',

  portalName: 'Admin Portal',


  /* --------------------------------------------------------
     CURRENCY
  --------------------------------------------------------- */

  currency: 'INR',

  currencySymbol: '₹',

  locale: 'en-IN',


  /* --------------------------------------------------------
     SUPABASE

     Replace ONLY these two values.

     Example URL:
     https://xxxxxxxx.supabase.co

     Publishable key normally starts with:
     sb_publishable_

     NEVER use sb_secret_ here.
  --------------------------------------------------------- */

  supabase: {

    url: 'https://wrzxlmviwpeiggzgycpl.supabase.co',

    publishableKey: 'sb_publishable_js68PKxlcJMbq_BqBRHrpQ_cgCig1es'

  },


  /* --------------------------------------------------------
     MAIN CUSTOMER WEBSITE
  --------------------------------------------------------- */

  customerWebsite: 'https://brit-tuna.vercel.app',


  /* --------------------------------------------------------
     SELLER PORTAL

     Change this later if your final seller Vercel domain
     is different.
  --------------------------------------------------------- */

  sellerPortal: 'https://brit-tuna-seller.vercel.app'

};


/* ==========================================================
   ADMIN UTILITY FUNCTIONS
========================================================== */

window.BTAdminUtil = (function () {

  'use strict';


  var config =
    window.BT_ADMIN_CONFIG;


  /* --------------------------------------------------------
     FORMAT INR

     Example:
     1200 -> ₹1,200.00
  --------------------------------------------------------- */

  function formatINR(value) {

    var number =
      Number(value) || 0;


    try {

      return new Intl.NumberFormat(

        config.locale,

        {

          style: 'currency',

          currency:
            config.currency

        }

      ).format(number);

    }

    catch (error) {

      return (
        config.currencySymbol +
        number.toFixed(2)
      );

    }

  }


  /* --------------------------------------------------------
     ESCAPE HTML

     Helps prevent product/customer/user text from being
     inserted as executable HTML.
  --------------------------------------------------------- */

  function escapeHtml(value) {

    return String(
      value == null
        ? ''
        : value
    )

      .replace(
        /&/g,
        '&amp;'
      )

      .replace(
        /</g,
        '&lt;'
      )

      .replace(
        />/g,
        '&gt;'
      )

      .replace(
        /"/g,
        '&quot;'
      )

      .replace(
        /'/g,
        '&#39;'
      );

  }


  /* --------------------------------------------------------
     FORMAT DATE
  --------------------------------------------------------- */

  function formatDate(value) {

    if (!value) {

      return '-';

    }


    var date =
      new Date(value);


    if (
      Number.isNaN(
        date.getTime()
      )
    ) {

      return '-';

    }


    try {

      return date.toLocaleString(

        config.locale,

        {

          dateStyle: 'medium',

          timeStyle: 'short'

        }

      );

    }

    catch (error) {

      return date.toLocaleString();

    }

  }


  /* --------------------------------------------------------
     GET URL PARAMETER

     Example:
     products.html?id=10

     getParam('id')
     -> "10"
  --------------------------------------------------------- */

  function getParam(name) {

    return new URLSearchParams(
      window.location.search
    ).get(name);

  }


  /* --------------------------------------------------------
     DIGITS ONLY
  --------------------------------------------------------- */

  function digits(value) {

    return String(
      value || ''
    ).replace(
      /\D/g,
      ''
    );

  }


  /* --------------------------------------------------------
     STATUS TEXT
  --------------------------------------------------------- */

  function normaliseStatus(value) {

    return String(
      value || ''
    )
      .trim()
      .toLowerCase();

  }


  /* --------------------------------------------------------
     PUBLIC FUNCTIONS
  --------------------------------------------------------- */

  return {

    formatINR:
      formatINR,

    escapeHtml:
      escapeHtml,

    formatDate:
      formatDate,

    getParam:
      getParam,

    digits:
      digits,

    normaliseStatus:
      normaliseStatus

  };


})();
