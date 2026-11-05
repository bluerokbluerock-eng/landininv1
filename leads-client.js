(() => {
  'use strict';
  const pending = new WeakMap();
  window.LandingLeads = Object.freeze({
    async submit(form, endpoint) {
      const fields = Object.fromEntries(new FormData(form));
      const signature = JSON.stringify(fields);
      let entry = pending.get(form);
      if (!entry || entry.signature !== signature) {
        entry = { signature, requestId: crypto.randomUUID() };
        pending.set(form, entry);
      }
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, requestId: entry.requestId, pageUrl: location.origin + location.pathname }),
        signal: AbortSignal.timeout(30000),
      });
      const result = response.ok ? await response.json() : null;
      if (!result || result.ok !== true || result.id !== entry.requestId) throw new Error('No se pudo confirmar el registro');
      pending.delete(form);
      return response;
    },
  });
})();
