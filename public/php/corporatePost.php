<?php

	$to = "cdavis@transtechsys.com"; 
	$subject = "TransTech Systems Corporate Contact";

	$name = $_POST['name'];
	$sanName = filter_var($name, FILTER_SANITIZE_STRING);

	$email = $_POST['email'];
	$sanEmail = filter_var($email, FILTER_SANITIZE_EMAIL);

	$message = $_POST['message'];
	$sanMessage = filter_var($message, FILTER_SANITIZE_STRING);

	$address = $_POST['address'];

	

	if($address != ""){
		echo "You are a bot!";
		return false;
	}else {
		$headers = "From: $sanEmail";
		$body = "From: $sanName\n Email: $sanEmail\n\n Message:\n $sanMessage";
		mail($to, $subject, $body, $headers);
	}


?>