<?php

/** PHPExcel */
require_once 'Classes/PHPExcel.php';

/** PHPExcel_IOFactory - Reader */
include 'Classes/PHPExcel/IOFactory.php';

$inputFileName = "vocab/".$_POST['src'];  
$inputFileType = PHPExcel_IOFactory::identify($inputFileName);  
$objReader = PHPExcel_IOFactory::createReader($inputFileType);  
$objReader->setReadDataOnly(true);  
$objPHPExcel = $objReader->load($inputFileName);  

$maxEx = 10;
/*
// for No header
$objWorksheet = $objPHPExcel->setActiveSheetIndex(0);
$highestRow = $objWorksheet->getHighestRow();
$highestColumn = $objWorksheet->getHighestColumn();

$r = -1;
$namedDataArray = array();
for ($row = 1; $row <= $highestRow; ++$row) {
    $dataRow = $objWorksheet->rangeToArray('A'.$row.':'.$highestColumn.$row,null, true, true, true);
    if ((isset($dataRow[$row]['A'])) && ($dataRow[$row]['A'] > '')) {
        ++$r;
        $namedDataArray[$r] = $dataRow[$row];
    }
}
*/

$objWorksheet = $objPHPExcel->setActiveSheetIndex(0);
$highestRow = $objWorksheet->getHighestRow();
$highestColumn = $objWorksheet->getHighestColumn();

$headingsArray = $objWorksheet->rangeToArray('A1:'.$highestColumn.'1',null, true, true, true);
$headingsArray = $headingsArray[1];

$r = -1;
$namedDataArray = array();
for ($row = 2; $row <= $highestRow; ++$row) {
    $dataRow = $objWorksheet->rangeToArray('A'.$row.':'.$highestColumn.$row,null, true, true, true);
    if ((isset($dataRow[$row]['A'])) && ($dataRow[$row]['A'] > '')) {
        ++$r;
        foreach($headingsArray as $columnKey => $columnHeading) {
            $namedDataArray[$r][$columnHeading] = $dataRow[$row][$columnKey];
        }
    }
}

// echo '<pre>';
// var_dump($namedDataArray);
// echo '</pre><hr />';
$a = array();
$b = array();
// echo "<table>";
foreach ($namedDataArray as $result) {
// 	$c1 = $result["vocab"];
// 	$c2 = $result["translate"];
	$c1 = $result["vocab"];
	$c2 = $result["translate"];
	if($c1 !="" || $c2!=""){
		array_push($a,$c1);
		array_push($b,$c2);
		echo "<tr><td>".$c1."</td><td> ".$c2."</td></tr>";
	}
}
// echo "</table>";
$tmpA = $a;
$tmpB = $b;
// echo '<pre>';
// var_dump($a);
// echo '</pre><br />';
// echo '<pre>';
// var_dump($b);
// echo '</pre><br />';

echo "<script>jsonData = {vocablistlength:".count($a).",length:".$maxEx.",";
for ($i=0;$i<$maxEx;$i++){ 
	$random_Vocab = array_rand($tmpA);
	unset($tmpB[$random_Vocab]);
	$random_Tran=array_rand($tmpB,3);
	$choiceArray = array("a","b","c","d");
	echo $i." : {";
	echo "vocab : '".strtoupper($tmpA[$random_Vocab])."',";
	echo "tran : '".$b[$random_Vocab]."',";
	$random_choice = array_rand($choiceArray);
	echo "choice : {".$choiceArray[$random_choice].":'".$b[array_search($tmpA[$random_Vocab],$a)]."',";
	unset($choiceArray[$random_choice]);
	$random_choice = array_rand($choiceArray,3);
	echo $choiceArray[$random_choice[0]].": '".$tmpB[$random_Tran[0]]."' , ".$choiceArray[$random_choice[1]].": '".$tmpB[$random_Tran[1]]."' , ".$choiceArray[$random_choice[2]].": '".$tmpB[$random_Tran[2]]."'}}";
	unset($tmpA[$random_Vocab]);
	array_push($tmpB,$b[$random_Vocab]);
	if($i<$maxEx-1)
		echo ",";
	else 
		echo "}"; 
	
}
echo "</script>";

?>
