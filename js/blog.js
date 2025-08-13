
  document.querySelectorAll('.view-images').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const expandable = this.closest('.card').querySelector('.expandable-images');
      const isExpanded = this.getAttribute('data-expanded') === 'true';
      expandable.style.maxHeight = isExpanded ? '250px' : '600px';
      this.textContent = isExpanded ? 'View Full Images' : 'Collapse Images';
      this.setAttribute('data-expanded', !isExpanded);
    });
  });

