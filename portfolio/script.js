document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = this.querySelector('input[type=text]').value.trim();
  const email = this.querySelector('input[type=email]').value.trim();
  const msg = this.querySelector('textarea').value.trim();
  if (!name || !email || !msg) {
    alert('Please fill in all fields!');
    return;
  }
  this.reset();
  alert('Thank you for reaching out! I will get back to you soon.');
});
