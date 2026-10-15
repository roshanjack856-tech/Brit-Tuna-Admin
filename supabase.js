/* ==========================================================
   supabase.js — Brit.Tuna Admin Portal Supabase Connection

   LOAD ORDER:
   1. Supabase JavaScript CDN
   2. config.js
   3. supabase.js
   4. script.js

   SECURITY:
   Frontend must use ONLY the Supabase Publishable Key.

   NEVER use:
   - sb_secret_
   - service_role
   - database password
   ========================================================== */

(function () {

  'use strict';


  /* ========================================================
     CHECK SUPABASE LIBRARY
  ======================================================== */

  if (!window.supabase) {

    console.error(
      'Brit.Tuna Admin: Supabase JavaScript library is not loaded.'
    );

    return;

  }


  /* ========================================================
     CHECK ADMIN CONFIG
  ======================================================== */

  if (!window.BT_ADMIN_CONFIG) {

    console.error(
      'Brit.Tuna Admin: BT_ADMIN_CONFIG was not found. Check config.js.'
    );

    return;

  }


  if (!window.BT_ADMIN_CONFIG.supabase) {

    console.error(
      'Brit.Tuna Admin: Supabase configuration was not found.'
    );

    return;

  }


  /* ========================================================
     GET CONFIG VALUES
  ======================================================== */

  var supabaseUrl =
    window.BT_ADMIN_CONFIG.supabase.url;


  var supabaseKey =
    window.BT_ADMIN_CONFIG.supabase.publishableKey;


  /* ========================================================
     VALIDATE PROJECT URL
  ======================================================== */

  if (
    !supabaseUrl ||
    typeof supabaseUrl !== 'string' ||
    supabaseUrl.trim() === ''
  ) {

    console.error(
      'Brit.Tuna Admin: Supabase Project URL is missing.'
    );

    return;

  }


  if (
    supabaseUrl.includes(
      'YOUR_SUPABASE'
    )
  ) {

    console.error(
      'Brit.Tuna Admin: Replace the Supabase URL placeholder in config.js.'
    );

    return;

  }


  if (
    !supabaseUrl.startsWith(
      'https://'
    )
  ) {

    console.error(
      'Brit.Tuna Admin: Supabase Project URL is invalid.'
    );

    return;

  }


  /* ========================================================
     VALIDATE KEY
  ======================================================== */

  if (
    !supabaseKey ||
    typeof supabaseKey !== 'string' ||
    supabaseKey.trim() === ''
  ) {

    console.error(
      'Brit.Tuna Admin: Supabase Publishable Key is missing.'
    );

    return;

  }


  if (
    supabaseKey.includes(
      'YOUR_SUPABASE'
    ) ||
    supabaseKey.includes(
      'PASTE_YOUR'
    )
  ) {

    console.error(
      'Brit.Tuna Admin: Replace the Supabase key placeholder in config.js.'
    );

    return;

  }


  /* ========================================================
     BLOCK SECRET KEY
  ======================================================== */

  if (
    supabaseKey.startsWith(
      'sb_secret_'
    )
  ) {

    console.error(
      'SECURITY ERROR: Never use a Supabase secret key in frontend code.'
    );

    return;

  }


  /* ========================================================
     BLOCK SERVICE ROLE
  ======================================================== */

  if (
    supabaseKey
      .toLowerCase()
      .includes(
        'service_role'
      )
  ) {

    console.error(
      'SECURITY ERROR: Never use the Supabase service_role key in frontend code.'
    );

    return;

  }


  /* ========================================================
     CREATE SUPABASE CLIENT
  ======================================================== */

  try {

    window.supabaseClient =
      window.supabase.createClient(

        supabaseUrl.trim(),

        supabaseKey.trim(),

        {

          auth: {

            persistSession: true,

            autoRefreshToken: true,

            detectSessionInUrl: true

          }

        }

      );


    console.log(
      'Brit.Tuna Admin: Supabase connected successfully.'
    );

  }

  catch (error) {

    console.error(
      'Brit.Tuna Admin: Failed to create Supabase client:',
      error
    );

  }


})();
