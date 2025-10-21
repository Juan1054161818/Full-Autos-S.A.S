// FULL AUTOS SAS – Validación del formulario Hoja de Vida
(function(){
  const form = document.getElementById('resumeForm') || document.querySelector('form.form');
  if(!form) return;

  const get = id => document.getElementById(id);
  const err = id => document.getElementById('error-' + id);

  const clearError = (id) => {
    const input = get(id);
    const errorEl = err(id);
    if(input){ input.classList.remove('input-error'); }
    if(errorEl){ errorEl.textContent = ''; }
  };

  const setError = (id, message) => {
    const input = get(id);
    const errorEl = err(id);
    if(input){ input.classList.add('input-error'); }
    if(errorEl){ errorEl.textContent = message; }
  };

  const validateName = () => {
    const v = (get('fullName')?.value || '').trim();
    if(!v) { setError('fullName','El nombre es obligatorio.'); return false; }
    if(v.length < 3) { setError('fullName','Debe tener al menos 3 caracteres.'); return false; }
    clearError('fullName');
    return true;
  };

  const validateEmail = () => {
    const v = (get('email')?.value || '').trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!v) { setError('email','El correo es obligatorio.'); return false; }
    if(!re.test(v)) { setError('email','Ingrese un correo válido.'); return false; }
    clearError('email');
    return true;
  };

  const validatePhone = () => {
    const v = (get('phone')?.value || '').trim();
    const re = /^\+?\d{7,15}$/;
    if(!v) { setError('phone','El teléfono es obligatorio.'); return false; }
    if(!re.test(v)) { setError('phone','Use solo números, 7–15 dígitos (ej: 3210000000).'); return false; }
    clearError('phone');
    return true;
  };

  const validateExperience = () => {
    const el = get('experience');
    if(!el) return true; // opcional
    const v = (el.value || '').trim();
    if(!v){ clearError('experience'); return true; }
    const num = Number(v);
    if(Number.isNaN(num) || num < 0 || num > 60){ setError('experience','Ingresa un número entre 0 y 60.'); return false; }
    clearError('experience');
    return true;
  };

  const validateResumeFile = () => {
    const el = get('resumeFile');
    if(!el) return true;
    const f = el.files && el.files[0];
    if(!f){ setError('resumeFile','Adjunta tu hoja de vida.'); return false; }
    const okTypes = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const extOk = okTypes.includes(f.type) || /\.(pdf|doc|docx)$/i.test(f.name);
    if(!extOk){ setError('resumeFile','Solo PDF, DOC o DOCX.'); return false; }
    const maxBytes = 5 * 1024 * 1024; // 5MB
    if(f.size > maxBytes){ setError('resumeFile','El archivo debe ser menor a 5MB.'); return false; }
    clearError('resumeFile');
    return true;
  };

  // Revalidación por campo
  ['fullName','email','phone','experience','specialties','resumeFile'].forEach(id => {
    const el = get(id);
    if(!el) return;
    const evt = id === 'resumeFile' ? 'change' : 'input';
    el.addEventListener(evt, () => {
      switch(id){
        case 'fullName': validateName(); break;
        case 'email': validateEmail(); break;
        case 'phone': validatePhone(); break;
        case 'experience': validateExperience(); break;
        case 'resumeFile': validateResumeFile(); break;
        default:
          // specialties no es obligatorio, solo limpiar si hay texto
          const v = (el.value || '').trim();
          if(v.length > 0) clearError('specialties');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    const ok = [validateName(), validateEmail(), validatePhone(), validateExperience(), validateResumeFile()].every(Boolean);
    if(!ok){
      e.preventDefault();
      const firstErr = document.querySelector('.input.input-error');
      if(firstErr){ firstErr.scrollIntoView({behavior:'smooth', block:'center'}); }
      return;
    }
    // Feedback simple de envío (simulado)
    e.preventDefault();
    alert('Solicitud enviada correctamente. ¡Gracias por aplicar!');
    form.reset();
    ['fullName','email','phone','experience','specialties','resumeFile'].forEach(clearError);
  });
})();