// FULL AUTOS SAS – interacción básica
(function(){
  const splash = document.getElementById('splash');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hideSplash = () => splash && (splash.style.display = 'none');

  // Mostrar splash por ~1s, salvo que el usuario prefiera menos movimiento
  if(splash){
    if(prefersReducedMotion){ hideSplash(); }
    else { setTimeout(hideSplash, 900); }
  }

  // Pequeña interacción en clic
  document.querySelectorAll('.btn.role').forEach(btn => {
    btn.addEventListener('click', () => {
      if(prefersReducedMotion) return;
      btn.style.opacity = '.85';
      setTimeout(() => btn.style.opacity = '1', 180);
    });
  });
})();