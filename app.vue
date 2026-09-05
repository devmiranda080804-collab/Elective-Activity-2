<template>
  <div class="font-body text-ink antialiased">
    <!-- WCAG 2.4.1 Bypass Blocks: lets keyboard/screen-reader users skip
         the header nav and jump straight to page content. -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-sea focus:px-4 focus:py-2 focus:text-sand"
    >
      Skip to main content
    </a>
    <HeaderNavigation />
    <main id="main-content">
      <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
    </main>
    <SiteFooter />
    <BackToTop />
  </div>
</template>
