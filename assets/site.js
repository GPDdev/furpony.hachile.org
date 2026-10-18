document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = button.dataset.copied;
      setTimeout(() => { button.textContent = original; }, 2000);
    } catch {
      button.textContent = `${button.dataset.copy} (${button.dataset.manual})`;
    }
  });
});
