<?php 

$dir="vocab";
if (is_dir($dir)) {
	if ($dh = opendir($dir)) {
		while (($file = readdir($dh)) !== false) {
			if (strpos($file,'.xls'))
				echo "<div class='mode' fullname='".$file."'>".substr($file,0,strrpos($file, "."))."</div>";
		}
		closedir($dh);
	}
}

?>