document.getElementById('submit-button').addEventListener('click', function () {
  const name = encodeURIComponent(document.getElementById('name').value);
  const email = encodeURIComponent(document.getElementById('email').value);
  const question = encodeURIComponent(document.getElementById('question').value);
  
  const subject = encodeURIComponent('Question from your website');
  const body = encodeURIComponent(`name: ${name}%0Aemail: ${email}%0Aquestion: ${question}`);
  
  const mailtoLink = `mailto:ovsquared@icloud.com?subject=${subject}&body=${body}`;
  
  window.location.href = mailtoLink;
});
