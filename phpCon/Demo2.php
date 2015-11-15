<?php
	
	$a = $_FILES['userFile'];
	$b = $_FILES['userFile2'];
	
	//echo $a['name'];
	var_dump($a['tmp_name']);
	var_dump($a['name']);
	
	move_uploaded_file($a['tmp_name'], $a['name']);
	move_uploaded_file($b['tmp_name'], $b['name']);
	
	//print_r($a);
	//print_r($a);
	//echo $a;
	
?>	