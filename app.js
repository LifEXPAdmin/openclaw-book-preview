document.querySelectorAll('button.copy').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const text = btn.getAttribute('data-copy') || '';
    try {
      await navigator.clipboard.writeText(text);
      const prev = btn.textContent;
      btn.textContent = 'Copied ✓';
      btn.classList.add('done');
      setTimeout(() => {
        btn.textContent = prev;
        btn.classList.remove('done');
      }, 1200);
    } catch {
      alert('Copy failed. Select text manually and copy.');
    }
  });
});