<?php
	
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Authorization, Content-Type');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Headers: Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, Accept');
header('Access-Control-Allow-Methods: OPTIONS, GET, PUT, POST, DELETE, PATCH');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 1728000');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && (   
       $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'POST' || 
       $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'DELETE' || 
       $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'PUT' )) {
             header('Access-Control-Allow-Origin: *');
             header("Access-Control-Allow-Credentials: true"); 
             header('Access-Control-Allow-Headers: X-Requested-With');
             header('Access-Control-Allow-Headers: Content-Type');
             header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT'); // http://stackoverflow.com/a/7605119/578667
             header('Access-Control-Max-Age: 86400'); 
      }
	 exit;
}


// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);
 
 
// connect to the mysql database
$link = mysqli_connect('', '', '', '');
mysqli_set_charset($link,'utf8');
 
 
// retrieve the table and key from the path
$table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request)+0;
 
 
// escape the columns and values from the input object
$columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
$values = array_map(function ($value) use ($link) {
  if ($value===null) return null;
  	return mysqli_real_escape_string($link,(string)$value);
}, array_values($input));
 
 
// build the SET part of the SQL command
$set = '';
for ($i=0; $i < count($columns); $i++) {
  $set.=($i > 0 ? ',' : '').'`'.$columns[$i].'`=';
  $set.=($values[$i] === null ? 'NULL' : '"'.$values[$i].'"');
}
 
 
// create SQL based on HTTP method
switch ($method) {
  case 'GET':
    $sql = "select * from `$table`".($key?" WHERE id=$key":''); break;
  case 'PUT':
    $sql = "update `$table` set $set where id=$key"; break;
  case 'POST':
    $sql = "insert into `$table` set $set"; break;
  case 'DELETE':
    $sql = "delete from contacts where id=$key"; break;
}
 
 
// excecute SQL statement
$result = mysqli_query($link,$sql);
 
 
// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error());
}

 
// print results, insert id or affected row count
if ($method == 'GET') {
  if (!$key) echo '[';
  for ($i=0; $i<mysqli_num_rows($result); $i++) {
    echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
  }
  if (!$key) echo ']';
} elseif ($method == 'POST') {
  echo mysqli_insert_id($link);
} else {
  echo mysqli_affected_rows($link);
}





 
// close mysql connection
mysqli_close($link);