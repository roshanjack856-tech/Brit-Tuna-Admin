/* ==========================================================
   script.js — Brit.Tuna Admin Portal
   Common UI + Authentication + Admin Access Control
   ========================================================== */

(function () {

  'use strict';


  /* ========================================================
     STATE
  ======================================================== */

  var currentUser = null;
  var currentProfile = null;


  /* ========================================================
     GET CURRENT PAGE
  ======================================================== */

  function getCurrentPage() {

    var path = window.location.pathname;

    var page = path.split('/').pop();

    if (!page || page === '') {
      return 'index.html';
    }

    return page;
  }


  /* ========================================================
     ACTIVE NAV CLASS
  ======================================================== */

  function activeClass(pageName) {

    return getCurrentPage() === pageName
      ? 'active'
      : '';
  }


  /* ========================================================
     ESCAPE HTML
  ======================================================== */

  function escapeHtml(value) {

    if (
      window.BTAdminUtil &&
      typeof window.BTAdminUtil.escapeHtml === 'function'
    ) {
      return window.BTAdminUtil.escapeHtml(value);
    }

    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }


  /* ========================================================
     CREATE HEADER
  ======================================================== */

  function createHeader() {

    var headerContainer =
      document.getElementById('site-header');

    if (!headerContainer) {
      return;
    }


    headerContainer.innerHTML = `

      <header class="admin-header">

        <div class="container admin-header-inner">

          <a
            href="admin-dashboard.html"
            class="admin-logo"
            aria-label="Brit.Tuna Admin Dashboard"
          >

            <span class="admin-logo-mark">
              B
            </span>

            <span class="admin-logo-text">

              <strong>
                Brit.Tuna
              </strong>

              <small>
                Admin Portal
              </small>

            </span>

          </a>


          <nav
            class="admin-nav"
            aria-label="Admin navigation"
          >

            <a
              href="admin-dashboard.html"
              class="${activeClass('admin-dashboard.html')}"
            >
              Dashboard
            </a>

            <a
              href="seller-applications.html"
              class="${activeClass('seller-applications.html')}"
            >
              Applications
            </a>

            <a
              href="sellers.html"
              class="${activeClass('sellers.html')}"
            >
              Sellers
            </a>

            <a
              href="products.html"
              class="${activeClass('products.html')}"
            >
              Products
            </a>

            <a
              href="orders.html"
              class="${activeClass('orders.html')}"
            >
              Orders
            </a>

          </nav>


          <div class="header-actions">

            <span
              id="admin-user-name"
              class="admin-user-name"
            >
              Admin
            </span>

            <button
              id="admin-logout-button"
              class="btn btn-outline btn-small"
              type="button"
            >
              Logout
            </button>

          </div>


          <button
            id="mobile-menu-button"
            class="mobile-menu-button"
            type="button"
            aria-label="Open admin menu"
            aria-controls="mobile-admin-drawer"
            aria-expanded="false"
          >
            ☰
          </button>

        </div>

      </header>


      <div
        id="mobile-backdrop"
        class="mobile-backdrop"
        aria-hidden="true"
      ></div>


      <aside
        id="mobile-admin-drawer"
        class="mobile-drawer"
        aria-label="Mobile admin navigation"
        aria-hidden="true"
      >

        <div class="mobile-drawer-header">

          <a
            href="admin-dashboard.html"
            class="admin-logo mobile-menu-link"
          >

            <span class="admin-logo-mark">
              B
            </span>

            <span class="admin-logo-text">

              <strong>
                Brit.Tuna
              </strong>

              <small>
                Admin Portal
              </small>

            </span>

          </a>


          <button
            id="mobile-close-button"
            class="mobile-close"
            type="button"
            aria-label="Close admin menu"
          >
            ×
          </button>

        </div>


        <nav
          class="mobile-nav"
          aria-label="Mobile admin navigation"
        >

          <a
            href="admin-dashboard.html"
            class="mobile-menu-link ${activeClass('admin-dashboard.html')}"
          >
            Dashboard
          </a>

          <a
            href="seller-applications.html"
            class="mobile-menu-link ${activeClass('seller-applications.html')}"
          >
            Seller Applications
          </a>

          <a
            href="sellers.html"
            class="mobile-menu-link ${activeClass('sellers.html')}"
          >
            Sellers
          </a>

          <a
            href="products.html"
            class="mobile-menu-link ${activeClass('products.html')}"
          >
            Products
          </a>

          <a
            href="orders.html"
            class="mobile-menu-link ${activeClass('orders.html')}"
          >
            Orders
          </a>


          <div class="mobile-nav-divider"></div>


          <a
            href="${escapeHtml(
              window.BT_ADMIN_CONFIG
                ? window.BT_ADMIN_CONFIG.customerWebsite
                : '#'
            )}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Customer Website
          </a>


          <a
            href="${escapeHtml(
              window.BT_ADMIN_CONFIG
                ? window.BT_ADMIN_CONFIG.sellerPortal
                : '#'
            )}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Seller Portal
          </a>


          <div class="mobile-nav-divider"></div>


          <button
            id="mobile-logout-button"
            type="button"
          >
            Logout
          </button>

        </nav>

      </aside>

    `;


    setupHeaderEvents();
  }


  /* ========================================================
     CREATE FOOTER
  ======================================================== */

  function createFooter() {

    var footerContainer =
      document.getElementById('site-footer');

    if (!footerContainer) {
      return;
    }


    var year =
      new Date().getFullYear();


    footerContainer.innerHTML = `

      <footer class="admin-footer">

        <div class="container admin-footer-inner">

          <div>
            © ${year} Brit.Tuna Admin Portal
          </div>

          <div class="admin-footer-links">

            <a
              href="${
                window.BT_ADMIN_CONFIG
                  ? escapeHtml(
                      window.BT_ADMIN_CONFIG.customerWebsite
                    )
                  : '#'
              }"
              target="_blank"
              rel="noopener noreferrer"
            >
              Customer Website
            </a>

            <a
              href="${
                window.BT_ADMIN_CONFIG
                  ? escapeHtml(
                      window.BT_ADMIN_CONFIG.sellerPortal
                    )
                  : '#'
              }"
              target="_blank"
              rel="noopener noreferrer"
            >
              Seller Portal
            </a>

          </div>

        </div>

      </footer>

    `;
  }


  /* ========================================================
     HEADER EVENTS
  ======================================================== */

  function setupHeaderEvents() {

    var menuButton =
      document.getElementById(
        'mobile-menu-button'
      );

    var closeButton =
      document.getElementById(
        'mobile-close-button'
      );

    var backdrop =
      document.getElementById(
        'mobile-backdrop'
      );

    var logoutButton =
      document.getElementById(
        'admin-logout-button'
      );

    var mobileLogoutButton =
      document.getElementById(
        'mobile-logout-button'
      );


    if (menuButton) {

      menuButton.addEventListener(
        'click',
        openMobileMenu
      );

    }


    if (closeButton) {

      closeButton.addEventListener(
        'click',
        closeMobileMenu
      );

    }


    if (backdrop) {

      backdrop.addEventListener(
        'click',
        closeMobileMenu
      );

    }


    if (logoutButton) {

      logoutButton.addEventListener(
        'click',
        logout
      );

    }


    if (mobileLogoutButton) {

      mobileLogoutButton.addEventListener(
        'click',
        logout
      );

    }


    var menuLinks =
      document.querySelectorAll(
        '.mobile-menu-link'
      );


    menuLinks.forEach(
      function (link) {

        link.addEventListener(
          'click',
          closeMobileMenu
        );

      }
    );

  }


  /* ========================================================
     OPEN MOBILE MENU
  ======================================================== */

  function openMobileMenu() {

    var drawer =
      document.getElementById(
        'mobile-admin-drawer'
      );

    var backdrop =
      document.getElementById(
        'mobile-backdrop'
      );

    var menuButton =
      document.getElementById(
        'mobile-menu-button'
      );


    if (!drawer || !backdrop) {
      return;
    }


    drawer.classList.add('open');

    backdrop.classList.add('open');

    document.body.classList.add(
      'menu-open'
    );


    drawer.setAttribute(
      'aria-hidden',
      'false'
    );


    backdrop.setAttribute(
      'aria-hidden',
      'false'
    );


    if (menuButton) {

      menuButton.setAttribute(
        'aria-expanded',
        'true'
      );

    }

  }


  /* ========================================================
     CLOSE MOBILE MENU
  ======================================================== */

  function closeMobileMenu() {

    var drawer =
      document.getElementById(
        'mobile-admin-drawer'
      );

    var backdrop =
      document.getElementById(
        'mobile-backdrop'
      );

    var menuButton =
      document.getElementById(
        'mobile-menu-button'
      );


    if (drawer) {

      drawer.classList.remove(
        'open'
      );

      drawer.setAttribute(
        'aria-hidden',
        'true'
      );

    }


    if (backdrop) {

      backdrop.classList.remove(
        'open'
      );

      backdrop.setAttribute(
        'aria-hidden',
        'true'
      );

    }


    document.body.classList.remove(
      'menu-open'
    );


    if (menuButton) {

      menuButton.setAttribute(
        'aria-expanded',
        'false'
      );

    }

  }


  /* ========================================================
     ESC KEY
  ======================================================== */

  document.addEventListener(
    'keydown',
    function (event) {

      if (event.key === 'Escape') {

        closeMobileMenu();

      }

    }
  );


  /* ========================================================
     GET PROFILE
  ======================================================== */

  async function getProfile(userId) {

    if (
      !window.supabaseClient ||
      !userId
    ) {

      return null;

    }


    try {

      var result =
        await window.supabaseClient

          .from('profiles')

          .select(
            'id, full_name, phone, role, created_at, updated_at'
          )

          .eq(
            'id',
            userId
          )

          .maybeSingle();


      if (result.error) {

        console.error(
          'Brit.Tuna Admin: Failed to load profile:',
          result.error
        );

        return null;

      }


      return result.data || null;

    }

    catch (error) {

      console.error(
        'Brit.Tuna Admin: Profile error:',
        error
      );

      return null;

    }

  }


  /* ========================================================
     UPDATE AUTH UI
  ======================================================== */

  function updateAuthUI(
    user,
    profile
  ) {

    var nameElement =
      document.getElementById(
        'admin-user-name'
      );


    if (!nameElement) {
      return;
    }


    if (!user) {

      nameElement.textContent =
        'Not signed in';

      return;

    }


    if (
      profile &&
      profile.full_name
    ) {

      nameElement.textContent =
        profile.full_name;

      return;

    }


    if (user.email) {

      nameElement.textContent =
        user.email;

      return;

    }


    nameElement.textContent =
      'Admin';

  }


  /* ========================================================
     LOAD CURRENT SESSION
  ======================================================== */

  async function loadSession() {

    if (!window.supabaseClient) {

      console.error(
        'Brit.Tuna Admin: Supabase client is unavailable.'
      );

      return {
        user: null,
        profile: null
      };

    }


    try {

      var sessionResult =
        await window.supabaseClient
          .auth
          .getSession();


      if (sessionResult.error) {

        console.error(
          'Brit.Tuna Admin: Session error:',
          sessionResult.error
        );

        currentUser = null;
        currentProfile = null;

        updateAuthUI(
          null,
          null
        );


        return {
          user: null,
          profile: null
        };

      }


      var session =
        sessionResult.data
          ? sessionResult.data.session
          : null;


      currentUser =
        session
          ? session.user
          : null;


      if (currentUser) {

        currentProfile =
          await getProfile(
            currentUser.id
          );

      }

      else {

        currentProfile = null;

      }


      updateAuthUI(
        currentUser,
        currentProfile
      );


      return {
        user: currentUser,
        profile: currentProfile
      };

    }

    catch (error) {

      console.error(
        'Brit.Tuna Admin: Unable to load session:',
        error
      );


      currentUser = null;
      currentProfile = null;


      return {
        user: null,
        profile: null
      };

    }

  }


  /* ========================================================
     REQUIRE LOGIN
  ======================================================== */

  async function requireLogin() {

    var session =
      await loadSession();


    if (!session.user) {

      var currentPage =
        getCurrentPage();


      if (
        currentPage !== 'index.html'
      ) {

        sessionStorage.setItem(
          'britTunaAdminReturnTo',
          currentPage
        );

      }


      window.location.replace(
        'index.html'
      );


      return null;

    }


    return session;

  }


  /* ========================================================
     REQUIRE ADMIN

     IMPORTANT:
     This frontend check is only for UI/navigation.

     Real database security must still be protected by
     Supabase RLS and secure database functions.
  ======================================================== */

  async function requireAdmin() {

    var session =
      await requireLogin();


    if (!session) {

      return null;

    }


    if (
      !session.profile ||
      session.profile.role !== 'admin'
    ) {

      showAccessDenied(
        session.profile
      );


      return null;

    }


    return session;

  }


  /* ========================================================
     ACCESS DENIED UI
  ======================================================== */

  function showAccessDenied(profile) {

    var main =
      document.querySelector(
        'main'
      );


    if (!main) {

      return;

    }


    var role =
      profile && profile.role
        ? escapeHtml(profile.role)
        : 'unknown';


    main.innerHTML = `

      <div class="container">

        <section class="access-denied">

          <h1>
            Admin Access Required
          </h1>

          <p>
            This account does not have permission
            to open the Brit.Tuna Admin Portal.
          </p>

          <div class="notice notice-warning">

            Current role:
            <strong>
              ${role}
            </strong>

          </div>

          <p class="muted">
            Admin access is controlled by the
            protected profile role and Supabase
            database security policies.
          </p>

          <button
            id="access-denied-logout"
            class="btn btn-danger"
            type="button"
          >
            Logout
          </button>

        </section>

      </div>

    `;


    var button =
      document.getElementById(
        'access-denied-logout'
      );


    if (button) {

      button.addEventListener(
        'click',
        logout
      );

    }

  }


  /* ========================================================
     LOGOUT
  ======================================================== */

  async function logout() {

    closeMobileMenu();


    if (!window.supabaseClient) {

      window.location.replace(
        'index.html'
      );

      return;

    }


    try {

      var result =
        await window.supabaseClient
          .auth
          .signOut();


      if (result.error) {

        console.error(
          'Brit.Tuna Admin: Logout error:',
          result.error
        );

      }

    }

    catch (error) {

      console.error(
        'Brit.Tuna Admin: Logout failed:',
        error
      );

    }


    currentUser = null;
    currentProfile = null;


    sessionStorage.removeItem(
      'britTunaAdminReturnTo'
    );


    window.location.replace(
      'index.html'
    );

  }


  /* ========================================================
     AUTH STATE LISTENER
  ======================================================== */

  function setupAuthListener() {

    if (!window.supabaseClient) {
      return;
    }


    window.supabaseClient
      .auth
      .onAuthStateChange(

        function (
          event,
          session
        ) {

          if (
            event === 'SIGNED_OUT'
          ) {

            currentUser = null;
            currentProfile = null;

            updateAuthUI(
              null,
              null
            );

          }


          if (
            event === 'SIGNED_IN' &&
            session &&
            session.user
          ) {

            currentUser =
              session.user;

          }

        }

      );

  }


  /* ========================================================
     GETTERS
  ======================================================== */

  function getCurrentUser() {

    return currentUser;

  }


  function getCurrentProfile() {

    return currentProfile;

  }


  function isAdmin() {

    return Boolean(
      currentProfile &&
      currentProfile.role === 'admin'
    );

  }


  /* ========================================================
     EXPOSE ADMIN FUNCTIONS
  ======================================================== */

  window.BTAdmin = {

    loadSession:
      loadSession,

    requireLogin:
      requireLogin,

    requireAdmin:
      requireAdmin,

    getProfile:
      getProfile,

    logout:
      logout,

    getCurrentUser:
      getCurrentUser,

    getCurrentProfile:
      getCurrentProfile,

    getCurrentPage:
      getCurrentPage,

    isAdmin:
      isAdmin,

    openMobileMenu:
      openMobileMenu,

    closeMobileMenu:
      closeMobileMenu

  };


  /* ========================================================
     INITIALIZE
  ======================================================== */

  document.addEventListener(
    'DOMContentLoaded',
    function () {

      createHeader();

      createFooter();

      setupAuthListener();

    }
  );


})();
