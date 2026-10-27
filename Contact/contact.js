const copyButton = document.getElementById('copy-email');
if (copyButton) copyButton.addEventListener('click', async () => {
  const feedback = document.getElementById('copy-feedback');
  try {
    await navigator.clipboard.writeText(window.SITE_CONFIG.email);
    feedback.textContent = window.siteT('contact.copied');
  } catch (error) {
    // Clipboard access may be blocked on non-HTTPS pages; show the address as a fallback.
    feedback.textContent = window.SITE_CONFIG.email;
  }
});
const emailButton = document.querySelector('[data-email-button]');
if (emailButton) emailButton.href = `mailto:${window.SITE_CONFIG.email}`;
