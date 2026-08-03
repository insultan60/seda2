/* Alexandra Kerr — subpage interactions
   Portfolio tabs + light-form validation (frontend-only mockups). */

(() => {
  /* ---------- Tabs (portfolio) ---------- */
  const tablist = document.querySelector('.tabs');
  if (tablist) {
    const tabs = [...tablist.querySelectorAll('.tabs__btn')];
    const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t, j) => {
          t.setAttribute('aria-selected', String(i === j));
          panels[j].hidden = i !== j;
        });
      });
    });
  }

  /* ---------- Light forms: contact / home valuation ----------
     Error copy per content guide: "Enter valid name" / "Enter valid email" /
     "Enter valid phone" / "Enter message". */
  document.querySelectorAll('form[data-validate]').forEach((form) => {
    const validators = {
      name:    (v) => v.trim().length >= 2 || 'Enter valid name',
      email:   (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter valid email',
      phone:   (v) => v.trim() === '' || /^[\d\s()+.-]{7,}$/.test(v.trim()) || 'Enter valid phone',
      message: (v) => v.trim().length > 0 || 'Enter message',
      address: (v) => v.trim().length > 3 || 'Enter valid address',
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let firstBad = null;

      form.querySelectorAll('[data-check]').forEach((input) => {
        const rule = validators[input.dataset.check];
        const wrap = input.closest('.field');
        const errEl = wrap.querySelector('.field__error');
        const result = rule ? rule(input.value) : true;
        const ok = result === true;
        wrap.classList.toggle('is-error', !ok);
        if (errEl) {
          errEl.hidden = ok;
          if (!ok) errEl.textContent = result;
        }
        if (!ok && !firstBad) firstBad = input;
      });

      if (firstBad) { firstBad.focus(); return; }

      form.querySelectorAll('.field, .form-light__submit').forEach((el) => { el.hidden = true; });
      const success = form.querySelector('.form-light__success');
      if (success) success.hidden = false;
    });
  });
})();
