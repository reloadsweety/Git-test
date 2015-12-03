<?php 

// $value = json_decode("{x:2,y:3}");
// $dir="vocab";
// if (is_dir($dir)) {
//     if ($dh = opendir($dir)) {
//         while (($file = readdir($dh)) !== false) {
//         	if (strpos($file,'.xls'))
//             echo "filename: .".$file."<br />";
//         }
//         closedir($dh);
//     }
// }


// foreach (glob("*.xls*") as $filename) {
// 	echo $filename."<br />";
// }

///////////////////////         Connect and Query Database ////////////////////////////

$servername = "localhost";
$username = "username";
$password = "";
$dbname = "test";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
$username = "123";

$sql = "SELECT * FROM user where id= $username ";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	// output data of each row
	/*while($row = $result->fetch_assoc()) {
		echo "id: " . $row["ID"]. " - password: " . $row["PASSWORD"]. " - name : " . $row["NAME"].  " - type : " . $row["TYPE"]. "<br>";
	}*/
	echo "true";
} else {
	echo "0 results";
}
$conn->close();

//////////////////////////////////////////////////////////////////////////////////////


?>