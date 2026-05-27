// Scroll animations: triggers once when element enters viewport
(function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px 0px 0px'
  });

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.fade-slide-in, .slide-in-left, .slide-in-right, .fade-up').forEach(function(el) {
      observer.observe(el);
    });
  });
})();
