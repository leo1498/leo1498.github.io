<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="icon" href="favicon.png">
	<title><?= isset($PageTitle) ? $PageTitle : 'Valentyn Sukhomud - Portfolio'?></title>
	<link rel="stylesheet" href="dist/css/style.css" type="text/css">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">
</head>
<body>
	<div class="__app" id="__app">
		<?php include_once('_parts/header.php'); ?>
		<div class="wrapper">
			<?php include_once('_parts/home.php'); ?>
			<?php include_once('_parts/works.php'); ?>
			<?php include_once('_parts/about.php'); ?>
			<?php include_once('_parts/contact.php'); ?>
			<div class="circle"></div>
			<div class="stars"></div>
			<div class="preloader" id="preloader">
				<div class="loader">
					<span>Valentyn Sukhomud</span>
					<div class="loadingbar"></div>
				</div>
			</div>
		</div>
	</div>
	
	<script src="dist/js/main.js"></script>
</body>
</html>