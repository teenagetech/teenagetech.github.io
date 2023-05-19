<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get the form data
  $email = $_POST['email'];
  $question = $_POST['question'];

  // Set the email subject and body
  $subject = 'Question - teenage.technology';
  $message = "Email: $email\n\nQuestion: $question";

  // Set the recipient email address
  $to = 'ovsquared@icloud.com';

  // Set additional headers
  $headers = "From: $email\r\n";
  $headers .= "Reply-To: $email\r\n";

  // Send the email
  $success = mail($to, $subject, $message, $headers);

  // Check if the email was sent successfully
  if ($success) {
    echo 'Email sent successfully.';
  } else {
    echo 'Error sending email.';
  }
}
?>
