<?php if (theme_get_setting('scrolltop_display')): ?>
<div id="toTop"><span class="glyphicon glyphicon-chevron-up"></span></div>
<?php endif; ?>

<?php if ($page['pre_header_first'] || $page['pre_header_second'] || $page['pre_header_third']) :?>
<!-- #pre-header -->
<div id="pre-header" class="clearfix">
    <div class="container">

        <!-- #pre-header-inside -->
        <div id="pre-header-inside" class="clearfix">
            <div class="row">
                <div class="col-md-4">
                    <?php if ($page['pre_header_first']):?>
                    <div class="pre-header-area">
                    <?php print render($page['pre_header_first']); ?>
                    </div>
                    <?php endif; ?>
                </div>

                <div class="col-md-4">
                    <?php if ($page['pre_header_second']):?>
                    <div class="pre-header-area">
                    <?php print render($page['pre_header_second']); ?>
                    </div>
                    <?php endif; ?>
                </div>

                <div class="col-md-4">
                    <?php if ($page['pre_header_third']):?>
                    <div class="pre-header-area">
                    <?php print render($page['pre_header_third']); ?>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        <!-- EOF: #pre-header-inside -->

    </div>
    <div class="toggle-control"><a href="javascript:showPreHeader()"><span class="glyphicon glyphicon-plus"></span></a></div>
</div>
<!-- EOF: #pre-header -->
<?php endif; ?>


<?php if ($page['header_top_left'] || $page['header_top_right']) :?>
<!-- #header-top -->
<div id="header-top" class="clearfix">
    <div class="container">

        <!-- #header-top-inside -->
        <div id="header-top-inside" class="clearfix">
            <div class="row">

            <?php if ($page['header_top_left']) :?>
            <div class="<?php print $header_top_left_grid_class; ?>">
                <!-- #header-top-left -->
                <div id="header-top-left" class="clearfix">
                    <?php print render($page['header_top_left']); ?>
                </div>
                <!-- EOF:#header-top-left -->
            </div>
            <?php endif; ?>

            <?php if ($page['header_top_right']) :?>
            <div class="<?php print $header_top_right_grid_class; ?>">
                <!-- #header-top-right -->
                <div id="header-top-right" class="clearfix">
                    <?php print render($page['header_top_right']); ?>
                </div>
                <!-- EOF:#header-top-right -->
            </div>
            <?php endif; ?>

            </div>
        </div>
        <!-- EOF: #header-top-inside -->

    </div>
</div>
<!-- EOF: #header-top -->
<?php endif; ?>

<!-- header -->
<header id="header" role="banner" class="clearfix">


        <!-- #header-inside -->
        <div id="header-inside" class="clearfix">
            <div class="row">


                <?php if ($logo):?>
                <div id="logo">
                <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"> <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" /> </a>
                </div>
                <?php endif; ?>

                <?php if ($site_name):?>
                <div id="site-name">
                <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>"><?php print $site_name; ?></a>
                </div>
                <?php endif; ?>

                <?php if ($site_slogan):?>
                <div id="site-slogan">
                <?php print $site_slogan; ?>
                </div>
                <?php endif; ?>

                <?php if ($page['header']) :?>
                <?php print render($page['header']); ?>
                <?php endif; ?>


                </div>
            </div>

        <!-- EOF: #header-inside -->
    <div class="container">
        <div id="layout-header"><img alt="European Commission logo" src="/sites/all/themes/bootstrap_business/logo_ec.png" />
        <div id="headerlinks">
        <ul>
        <li><a href="https://ec.europa.eu/jrc/en/privacy-statement" target="_blank">Privacy statement</a></li>
        <li><a href="http://ec.europa.eu/geninfo/legal_notices_en.htm" target="_blank">Legal notice</a></li>
        <li><a href="https://ec.europa.eu/jrc/en/privacy-statement" target="_blank">Cookies</a></li>
        <li><a href="http://ec.europa.eu/geninfo/query/search_en.html" target="_blank">Search</a></li>
        </ul>
        </div>

        <div id="main-title">European Commission - Joint Research Centre</div>

        <div id="sub-title1">
        <p>Africa Platform</p></div>
    </div>
      </div>

        <div class="clearfix">
          <div id="sub-title"></div>
        </div>
        <div class="clearfix">
        <?php if ($breadcrumb && theme_get_setting('breadcrumb_display')):?>
        <!-- #breadcrumb -->
        <div id="breadcrumb" class="clearfix">
            <!-- #breadcrumb-inside -->
            <div id="breadcrumb-inside" class="container">
            <?php print $breadcrumb; ?>
            </div>
            <!-- EOF: #breadcrumb-inside -->
        </div>
        <!-- EOF: #breadcrumb -->

        <?php if ($page['promoted']):?>
        <!-- #promoted -->
            <div id="promoted" class="clearfix">
                <div id="promoted-inside" class="clearfix">
                <?php print render($page['promoted']); ?>
                </div>
            </div>
        <!-- EOF: #promoted -->
        <?php endif; ?>
        </div>
</header>
<!-- EOF: #header -->

<!-- #main-navigation -->
<div id="main-navigation" class="clearfix">
    <div class="container">

        <!-- #main-navigation-inside -->
        <div id="main-navigation-inside" class="clearfix">
            <div class="row">
                <div class="col-md-12">
                    <nav role="navigation">
                        <?php if ($page['navigation']) :?>
                        <?php print drupal_render($page['navigation']); ?>
                        <?php else : ?>

                        <?php print theme('links__system_main_menu', array('links' => $main_menu, 'attributes' => array('class' => array('main-menu', 'menu'), ), 'heading' => array('text' => t('Main menu'), 'level' => 'h2', 'class' => array('element-invisible'), ), )); ?>

                        <?php endif; ?>
                    </nav>
                </div>
            </div>
        </div>
        <!-- EOF: #main-navigation-inside -->

    </div>
</div>
<!-- EOF: #main-navigation -->
<?php endif; ?>
<?php if ($page['highlighted']):?>
<!-- #top-content -->


            <div class="row">
                <div class="col-md-12">
                <?php print render($page['highlighted']); ?>
                </div>
            </div>

        <!-- EOF:#top-content-inside -->



<!-- EOF: #top-content -->
<?php endif; ?>
<?php if ($page['banner']) : ?>
<!-- #banner -->
<div id="banner" class="clearfix">
    <div class="container">

        <!-- #banner-inside -->
        <div id="banner-inside" class="clearfix">
            <div class="row">
                <div class="col-md-12">
                <?php print render($page['banner']); ?>
                </div>
            </div>
        </div>
        <!-- EOF: #banner-inside -->

    </div>
</div>
<!-- EOF:#banner -->
<?php endif; ?>

<!-- #page -->
<div id="page" class="clearfix">



    <!-- #main-content -->
    <div id="main-content">
        <div class="container">

            <!-- #messages-console -->
            <?php if ($messages):?>
            <div id="messages-console" class="clearfix">
                <div class="row">
                    <div class="col-md-12">
                    <?php print $messages; ?>
                    </div>
                </div>
            </div>
            <?php endif; ?>
            <!-- EOF: #messages-console -->

            <div class="row">

                <?php if ($page['sidebar_first']):?>
                <aside class="<?php print $sidebar_grid_class; ?>">
                    <!--#sidebar-first-->
                    <section id="sidebar-first" class="sidebar clearfix">
                    <?php print render($page['sidebar_first']); ?>
                    </section>
                    <!--EOF:#sidebar-first-->
                </aside>
                <?php endif; ?>


                <section class="<?php print $main_grid_class; ?>">

                    <!-- #main -->
                    <div id="main" class="clearfix">



                        <!-- EOF:#content-wrapper -->
                        <div id="content-wrapper">

                            <?php print render($title_prefix); ?>
                            <?php if ($title):?>
                            <h1 class="page-title"><?php print $title; ?></h1>
                            <?php endif; ?>
                            <?php print render($title_suffix); ?>

                            <?php print render($page['help']); ?>

                            <!-- #tabs -->
                            <?php if ($tabs):?>
                                <div class="tabs">
                                <?php print render($tabs); ?>
                                </div>
                            <?php endif; ?>
                            <!-- EOF: #tabs -->

                            <!-- #action links -->
                            <?php if ($action_links):?>
                                <ul class="action-links">
                                <?php print render($action_links); ?>
                                </ul>
                            <?php endif; ?>
                            <!-- EOF: #action links -->

                            <?php print render($page['content']); ?>
                            <?php print $feed_icons; ?>

                        </div>
                        <!-- EOF:#content-wrapper -->

                    </div>
                    <!-- EOF:#main -->

                </section>

                <?php if ($page['sidebar_second']):?>
                <aside class="<?php print $sidebar_grid_class; ?>">
                    <!--#sidebar-second-->
                    <section id="sidebar-second" class="sidebar clearfix">
                    <?php print render($page['sidebar_second']); ?>
                    </section>
                    <!--EOF:#sidebar-second-->
                </aside>
                <?php endif; ?>

            </div>

        </div>
    </div>
    <!-- EOF:#main-content -->

    <?php if ($page['bottom_content_tit']):?>
    <!-- #bottom-content -->
    <div id="bottom-content_tit" class="clearfix">
        <div class="clearfix">

            <!-- #bottom-content-inside -->
            <div id="bottom-content_tit-inside" class="clearfix">
                <div class="row">
                    <div class="clearfix">
                    <?php print render($page['bottom_content_tit']); ?>
                    </div>
                </div>
            </div>
            <!-- EOF:#bottom-content-inside -->

        </div>
    </div>
    <!-- EOF: #bottom-content -->
    <?php endif; ?>

    <?php if ($page['bottom_content']):?>
    <!-- #bottom-content -->
    <div id="bottom-content" class="clearfix">
        <div class="clearfix">

            <!-- #bottom-content-inside -->
            <div id="bottom-content-inside" class="clearfix">
                <div class="row">
                    <div class="clearfix">
                    <?php print render($page['bottom_content']); ?>
                    </div>
                </div>
            </div>
            <!-- EOF:#bottom-content-inside -->

        </div>
    </div>
    <!-- EOF: #bottom-content -->
    <?php endif; ?>

    <?php if ($page['bottom_content_sdg_tit']):?>
    <!-- #bottom-content -->
    <div id="bottom-content_sdg_tit" class="clearfix">
        <div class="clearfix">

            <!-- #bottom-content-inside -->
            <div id="bottom-content_sdg_tit-inside" class="clearfix">
                <div class="row">
                    <div class="clearfix">
                    <?php print render($page['bottom_content_sdg_tit']); ?>
                    </div>
                </div>
            </div>
            <!-- EOF:#bottom-content-inside -->

        </div>
    </div>
    <!-- EOF: #bottom-content -->
    <?php endif; ?>

    <?php if ($page['bottom_content_sdg']):?>
    <!-- #bottom-content -->
    <div id="bottom-content_sdg" class="clearfix">
        <div class="clearfix">

            <!-- #bottom-content-inside -->
            <div id="bottom-content_sdg-inside" class="clearfix">
                <div class="row">
                    <div class="clearfix">
                    <?php print render($page['bottom_content_sdg']); ?>
                    </div>
                </div>
            </div>
            <!-- EOF:#bottom-content-inside -->

        </div>
    </div>
    <!-- EOF: #bottom-content -->
    <?php endif; ?>

</div>
<!-- EOF:#page -->

<?php if ($page['footer_first'] || $page['footer_second'] || $page['footer_third'] || $page['footer_fourth']):?>
<!-- #footer -->
<footer id="footer" class="clearfix">
    <div class="clearfix">

        <!-- #footer-inside -->
        <div id="footer-inside" class="clearfix">
            <div class="row">
                <div class="col-md-3">
                    <?php if ($page['footer_first']):?>
                    <div class="footer-area">
                    <?php print render($page['footer_first']); ?>
                    </div>
                    <?php endif; ?>
                </div>

                <div class="col-md-3">
                    <?php if ($page['footer_second']):?>
                    <div class="footer-area">
                    <?php print render($page['footer_second']); ?>
                    </div>
                    <?php endif; ?>
                </div>

                <div class="col-md-3">
                    <?php if ($page['footer_third']):?>
                    <div class="footer-area">
                    <?php print render($page['footer_third']); ?>
                    </div>
                    <?php endif; ?>
                </div>

                <div class="col-md-3">
                    <?php if ($page['footer_fourth']):?>
                    <div class="footer-area">
                    <?php print render($page['footer_fourth']); ?>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        <!-- EOF: #footer-inside -->

    </div>
</footer>
<!-- EOF #footer -->
<?php endif; ?>

<footer id="subfooter" class="clearfix">
    <div class="container">

        <!-- #subfooter-inside -->
        <div id="subfooter-inside" class="clearfix">
            <div class="row">
                <div class="col-md-12">
                    <!-- #subfooter-left -->
                    <div class="subfooter-area">
                    <?php print theme('links__system_secondary_menu', array('links' => $secondary_menu, 'attributes' => array('class' => array('menu', 'secondary-menu', 'links', 'clearfix')))); ?>

                    <?php if ($page['footer']):?>
                    <?php print render($page['footer']); ?>
                    <?php endif; ?>

                    </div>
                    <!-- EOF: #subfooter-left -->
                </div>
            </div>
        </div>
        <!-- EOF: #subfooter-inside -->

    </div>
</footer>
<!-- EOF:#subfooter -->
